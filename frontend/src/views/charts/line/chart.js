
import * as d3 from "d3"
import "src/utils/resizeListener"

export function mountChart(id, data) {

    var parent = d3.select(`#${id}`);
    if (parent.empty()) throw new Error(`Element with ID ${id} not found`);

    parent.select(`svg.${id}`).remove()
    var parent = parent
        .append("svg")
        .attr("class", `${id} h-100 w-100`)
        .style("-webkit-tap-highlight-color", "transparent")
        .on("pointerenter", pointerentered)
        .on("pointermove", pointermoved)
        .on("pointerleave", pointerleft)
        .on("click", click)
        .on("touchstart", event => event.preventDefault());

    // Define margins
    var margin = { top: 20, right: 20, bottom: 30, left: 50 },
        width = parseInt(parent.style("width")) - margin.left - margin.right,
        height = parseInt(parent.style("height")) - margin.top - margin.bottom;

    // Define date parser
    var parseDate = d3.timeParse("%Y-%m-%d %H:%M:%S");
    // Format the data field
    data.forEach(function (d) {
        const parsed = parseDate(d["Order Month"]);
        if (parsed) d["Order Month"] = parsed
    });

    // Define svg canvas
    var svg = parent
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // Set the color domain equal to the three product categories
    var productCategories = Object.keys(data[0])
        .filter(function (key) { return (key !== "Order Month") && (key !== "metric") });

    // Define scales
    var xScale = d3.scaleTime().range([0, width]);
    var yScale = productCategories.reduce((acc, key) => (
        acc[key] = d3.scaleLinear().range([height, 0]), acc), {})
    var color = d3.scaleOrdinal().range(["#8c510a", "#dfc27d", "#35978f"]);

    // Define axes
    var xAxis = d3.axisBottom(xScale);
    var yAxis = productCategories.reduce((acc, key) => (
        acc[key] = d3.axisLeft(yScale[key]), acc), {})

    var currCategory = productCategories[0];
    var hoverCategory;

    // Define lines
    var line = productCategories.reduce((acc, key) => (
        acc[key] = d3.line()
            .x(function (d) { return xScale(d["date"]); })
            .y(function (d) { return yScale[key](d["concentration"]); })
            .curve(d3.curveBasis), acc), {})



    // console.log(JSON.stringify(data, null, 2)) // to view the structure



    // Filter the data to only include a single metric
    var subset = data.filter(function (el) { return el.metric === "Cost" });
    // console.log(JSON.stringify(subset, null, 2))

    // Reformat data to make it more copasetic for d3
    // data = An array of objects
    // concentrations = An array of three objects, each of which contains an array of objects
    var concentrations = productCategories.map(function (category) {
        return {
            category: category,
            datapoints: subset.map(function (d) {
                return { date: d["Order Month"], concentration: +d[category] }
            })
        }
    })
    console.log(JSON.stringify(concentrations, null, 2)) // to view the structure

    // Set the domain of the axes
    xScale.domain(d3.extent(subset, function (d) { return d["Order Month"]; }));
    Object.values(yScale).forEach((scale, index) =>
        scale.domain([0, d3.max(concentrations[index].datapoints, d => d.concentration)])); TODO:

    Object.values(yScale).forEach((scale, index) => console.log([0, d3.max(concentrations[index].datapoints, d => d.concentration)])); TODO:
    color.domain(productCategories);

    // var zDomain = new d3.InternSet(d3.map(subset, d => d.metric));
    // console.log(zDomain)

    // Place the axes on the chart
    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

    productCategories.forEach(d =>
        svg.append("g")
            .attr("class", `y axis ${d}`)
            .style("opacity", d === currCategory ? 0 : 0)
            .call(yAxis[d])
    )
    // .append("text")
    // .attr("class", "label")
    // .attr("y", 6)
    // .attr("dy", ".71em")
    // .attr("dx", ".71em")
    // .style("text-anchor", "beginning")
    // .text("Product Concentration");

    var products = svg.selectAll(".category")
        .data(concentrations)
        .enter().append("g")
        .attr("class", d => `category ${d.category}`);


    products.append("path")
        .attr("fill", "none")
        .attr("class", "line")
        .attr("d", function (d) { return line[d.category](d.datapoints); })
        .style("stroke", function (d) { return color(d.category); })
        .style("stroke-dasharray", d => d.category === currCategory ? null : "5,5")
        .style("stroke-width", 2)

    // console.log(JSON.stringify(d3.values(concentrations), null, 2)) // to view the structure
    // console.log(Object.values(concentrations)); // to view the structure
    // console.log(concentrations);
    // console.log(concentrations.map(function()))

    function click(event) {
        currCategory = hoverCategory;
        resize()
    }


    function pointermoved(event) {
        let [xm, ym] = d3.pointer(event);
        [xm, ym] = [xm - margin.left, ym - margin.top]

        // console.log(xm, ym, xScale(lixo), yScale(0.30555555555555536))

        const c = d3.map(concentrations, ({ category, datapoints }) => ({
            category,
            least: d3.least(datapoints, x => Math.hypot(xScale(x.date) - xm, yScale[category](x.concentration) - ym))
        }))
        // console.log(c)
        const cc = d3.least(c, ({ category, least }) => Math.hypot(xScale(least.date) - xm, yScale[category](least.concentration) - ym))

        hoverCategory = cc.category;

        products
            .style("opacity", d => d.category === hoverCategory ? 1 : 0.5)
            .filter(d => d.category === hoverCategory)
            .raise();

        // path.style("stroke", ([z]) => Z[i] === z ? null : "#ddd").filter(([z]) => Z[i] === z).raise();
        // dot.attr("transform", `translate(${xScale(X[i])},${yScale(Y[i])})`);
        // if (T) dot.select("text").text(T[i]);
        // svg.property("value", O[i]).dispatch("input", { bubbles: true });
    }

    function pointerentered() {
        // path.style("mix-blend-mode", null).style("stroke", "#ddd");
        // dot.attr("display", null);
    }

    function pointerleft() {
        products
            .style("opacity", d => d.category === currCategory ? 1 : 0.5)
            .filter(d => d.category === currCategory)
            .raise();

        // path.style("mix-blend-mode", mixBlendMode).style("stroke", null);
        // dot.attr("display", "none");
        // svg.node().value = null;
        // svg.dispatch("input", { bubbles: true });
    }



    // Define responsive behavior
    function resize() {
        var width = parseInt(parent.style("width")) - margin.left - margin.right,
            height = parseInt(parent.style("height")) - margin.top - margin.bottom;

        // Update the range of the scale with new width/height
        xScale.range([0, width]);
        Object.values(yScale).forEach(scale => scale.range([height, 0]))

        parent
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)

        // Update the axis and text with the new scale
        svg.select('.x.axis')
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis);

        productCategories.forEach(d =>
            svg.select(`.y.axis.${d}`)
                .style("opacity", d === currCategory ? 1 : 0)
                .call(yAxis[d])
        )

        // Force D3 to recalculate and update the line
        svg.selectAll('.line')
            .style("stroke-dasharray", d => d.category === currCategory ? null : "5,5")
            .attr("d", function (d) { return line[d.category](d.datapoints); });

        // Update the tick marks
        xAxis.ticks(Math.max(width / 75, 2));
        Object.values(yAxis).forEach(axis => axis.ticks(Math.max(height / 50, 2)))
    };

    const el = document.getElementById(id);

    // Call the resize function whenever a resize event occurs
    addResizeListener(el, resize)

    // Call the resize function
    resize()

    return (function () {
        // Remove the listener
        removeResizeListener(el, resize)
    })
}