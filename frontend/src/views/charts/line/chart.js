
import * as d3 from "d3"
import "src/utils/resizeListener"


var svg, concentrations, products, productCategories;
var xScale, tempScale, yScale, xAxis, tempAxis, yAxis;
var width, height;
var currCategory, hoverCategory;
var line, tempLine;

export function mount(id, data) {

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
    const margin = { top: 20, right: 50, bottom: 30, left: 50 };
    width = parseInt(parent.style("width")) - margin.left - margin.right;
    height = parseInt(parent.style("height")) - margin.top - margin.bottom;

    // Format the data field
    data.forEach(function (d) {
        const parsed = d3.isoParse(d["time"]);
        if (parsed) d["time"] = parsed
    });

    // Define svg canvas
    svg = parent
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // Set the color domain equal to the three product categories
    productCategories = Object.keys(data[0])
        .filter(function (key) { return (key !== "time") && (key !== "temperature") && (key !== "mode") });

    // Define scales
    xScale = d3.scaleTime().range([0, width]);
    tempScale = d3.scaleLinear().range([height, 0]);
    yScale = productCategories.reduce((acc, key) => (
        acc[key] = d3.scaleLinear().range([height, 0]), acc), {})

    // Define axes
    xAxis = d3.axisBottom(xScale);
    tempAxis = d3.axisLeft(tempScale);
    yAxis = productCategories.reduce((acc, key) => (
        acc[key] = d3.axisRight(yScale[key]), acc), {})

    currCategory = productCategories[0];

    // Define lines

    tempLine = d3.line()
        .x(function (d) { return xScale(d["time"]); })
        .y(function (d) { return tempScale(d["temperature"]); })
        .curve(d3.curveBasis)

    line = productCategories.reduce((acc, key) => (
        acc[key] = d3.line()
            .x(function (d) { return xScale(d["time"]); })
            .y(function (d) { return yScale[key](d["concentration"]); })
            .curve(d3.curveBasis), acc), {})



    // console.log(JSON.stringify(data, null, 2)) // to view the structure

    update(data);

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
            least: d3.least(datapoints, x => Math.hypot(xScale(x.time) - xm, yScale[category](x.concentration) - ym))
        }))
        // console.log(c)
        const cc = d3.least(c, ({ category, least }) => Math.hypot(xScale(least.time) - xm, yScale[category](least.concentration) - ym))

        hoverCategory = cc.category;

        products
            .style("opacity", d => [currCategory, hoverCategory].includes(d.category) ? 1 : 0.5)
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
        width = parseInt(parent.style("width")) - margin.left - margin.right;
        height = parseInt(parent.style("height")) - margin.top - margin.bottom;

        // Update the range of the scale with new width/height
        xScale.range([0, width]);
        tempScale.range([height, 0])
        Object.values(yScale).forEach(scale => scale.range([height, 0]))

        parent
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)

        // Update the axis and text with the new scale
        svg.select('.x.axis')
            .attr("transform", `translate(0, ${height})`)
            .call(xAxis);

        productCategories.forEach(d =>
            svg.select(`.y.axis.${d}`)
                .attr("transform", `translate(${width}, 0)`)
                .style("opacity", d === currCategory ? 1 : 0)
                .call(yAxis[d])
        )

        // Force D3 to recalculate and update the line
        svg.selectAll('.line')
            .style("stroke-dasharray", d => d.category === currCategory ? null : "3,3")
            .attr("d", d => line[d.category](d.datapoints));

        svg.selectAll('.notline')
            .attr("d", d => tempLine(data));

        // Update the tick marks
        xAxis.ticks(Math.max(width / 75, 2));
        tempAxis.ticks(Math.max(height / 50, 2));
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



// Create a function that takes a dataset as input and update the plot:
export function update(data) {
    console.log("lkjd")

    // Reformat data to make it more copasetic for d3
    // data = An array of objects
    // concentrations = An array of three objects, each of which contains an array of objects
    concentrations = productCategories.map(category => ({
        category: category,
        datapoints: data.map(function (d) {
            return { time: d["time"], concentration: +d[category] }
        })
    }))
    console.log(JSON.stringify(concentrations, null, 2)) // to view the structure

    // Set the domain of the axes
    xScale.domain(d3.extent(data, d => d["time"]));
    tempScale.domain(d3.extent(data, d => d["temperature"]));
    Object.values(yScale).forEach((scale, index) =>
        scale.domain([0, d3.max(concentrations[index].datapoints, d => d.concentration)]));

    // Place the axes on the chart
    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", `translate(0, ${height})`)
        .call(xAxis);

    svg.append("g")
        .attr("class", "t axis")
        .call(tempAxis);

    productCategories.forEach(d =>
        svg.append("g")
            .attr("class", `y axis ${d}`)
            .attr("transform", `translate(${width}, 0)`)
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

    // Place the lines
    svg.append("g")
        .attr("class", "notcategory temperature")
        .append("path")
        .attr("d", tempLine(data))
        .attr("fill", "none")
        .attr("class", "notline")
        .attr("stroke", "#99999966")
        .style("stroke-width", 2)

    products = svg.selectAll(".category")
        .data(concentrations)
        .enter().append("g")
        .attr("class", d => `category ${d.category}`);

    products.append("path")
        .attr("fill", "none")
        .attr("class", "line")
        .style("stroke-width", 2)

    // // create the Y axis
    // y.domain([0, d3.max(data, function (d) { return d.ser2 })]);
    // svg.selectAll(".y.axis")
    //     .transition()
    //     .duration(2000)
    //     .call(yAxis);

    // // Create a update selection: bind to the new data
    // var u = svg.selectAll(".lineTest")
    //     .data([data], function (d) { return d.ser1 });

    // // Updata the line
    // u
    //     .enter()
    //     .append("path")
    //     .attr("class", "lineTest")
    //     .merge(u)
    //     .transition()
    //     .duration(2000)
    //     .attr("d", d3.line()
    //         .x(function (d) { return x(d.ser1); })
    //         .y(function (d) { return y(d.ser2); }))
    //     .attr("fill", "none")
    //     .attr("stroke-width", 2.5)
}
