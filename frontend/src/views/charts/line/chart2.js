import * as d3 from "d3"
import { useStore } from "src/store/useStore";
import "src/utils/resizeListener"



var svg, parent, concentrations, productCategories;
var xScale, tempScale, yScale, xAxis, tempAxis, yAxis;
var width, height;
var currCategory = useStore.getState().currCategory, hoverCategory;
var line, tempLine;

const margin = { top: 20, right: 70, bottom: 60, left: 70 };

export function mount(id, data) {
    const unsub = useStore.subscribe(
        (s) => {
            currCategory = s.currCategory;
            resize(id, data)
        },
        (state) => state.currCategory,
    )

    parent = d3.select(`#${id}`);
    if (parent.empty()) throw new Error(`Element with ID ${id} not found`);

    parent.select(`svg.${id}`).remove()
    parent = parent
        .append("svg")
        .attr("class", `${id} h-100 w-100`)
        .style("-webkit-tap-highlight-color", "transparent")
        .on("pointerenter", pointerentered)
        .on("pointermove", pointermoved)
        .on("pointerleave", pointerleft)
        .on("click", click)
        .on("touchstart", event => event.preventDefault());

    // Define margins
    // console.log(parent, parent.style("width"))
    // width = parseInt(parent.style("width")) - margin.left - margin.right;
    // height = parseInt(parent.style("height")) - margin.top - margin.bottom;

    const pel = document.getElementById(id) // FIXME: pel is null
    width = parseInt(pel.offsetWidth) - margin.left - margin.right;
    height = parseInt(pel.offsetHeight) - margin.top - margin.bottom;

    // Add clip
    parent.append("defs").append("clipPath")
        .attr("id", "clip")
        .append("rect")
        .attr("width", width)
        .attr("height", height)

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


    function click(event) {
        useStore.getState().setCurrCategory(hoverCategory);
    }


    function pointermoved(event) {
        let [xm, ym] = d3.pointer(event);
        [xm, ym] = [xm - margin.left, ym - margin.top]

        const c = d3.map(concentrations.filter(({ category }) => category !== currCategory), ({ category, datapoints }) => ({
            category,
            least: d3.least(datapoints, x => Math.hypot(xScale(x.time) - xm, yScale[category](x.concentration) - ym))
        }))
        const cc = d3.least(c, ({ category, least }) => Math.hypot(xScale(least.time) - xm, yScale[category](least.concentration) - ym))

        hoverCategory = cc.category;

        d3.selectAll(".category")
            .style("opacity", d => [currCategory, hoverCategory].includes(d.category) ? 1 : 0.4)
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
        d3.selectAll(".category")
            .style("opacity", d => d.category === currCategory ? 1 : 0.3)
            .filter(d => d.category === currCategory)
            .raise();

        // path.style("mix-blend-mode", mixBlendMode).style("stroke", null);
        // dot.attr("display", "none");
        // svg.node().value = null;
        // svg.dispatch("input", { bubbles: true });
    }

    const el = document.getElementById(id);

    // Call the resize function whenever a resize event occurs
    addResizeListener(el, resize)

    return (function () {
        // Remove the listener
        removeResizeListener(el, resize)
    })
}

// Define responsive behavior
function resize(id, data) {
    const pel = document.getElementById(id)
    if (!pel) return;
    width = parseInt(pel.offsetWidth) - margin.left - margin.right;
    height = parseInt(pel.offsetHeight) - margin.top - margin.bottom;

    // Update the range of the scale with new width/height
    xScale.range([0, width]);
    tempScale.range([height, 0])
    Object.values(yScale).forEach(scale => scale.range([height, 0]))

    parent.select("defs").select("clipPath")
        .select("rect")
        .attr("width", width)
        .attr("height", height)

    parent
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)

    // Update the axis and text with the new scale
    svg.select('.x.axis')
        .attr("transform", `translate(0, ${height})`)
        .call(xAxis);

    productCategories.forEach(d => {
        svg.select(`.y.axis.${d}`)
            .attr("transform", `translate(${width}, 0)`)
            .style("opacity", () => { return d === currCategory ? 1 : 0 })
            .call(yAxis[d])
    })

    // Force D3 to recalculate and update the line
    svg.selectAll('.line')
        .style("stroke-dasharray", d => d.category === currCategory ? null : "3,3")
        .attr("d", d => line[d.category](d.datapoints));

    svg.select('.notline')
        .attr("d", tempLine(data));

    // Update the tick marks
    xAxis.ticks(Math.max(width / 75, 2));
    tempAxis.ticks(Math.max(height / 50, 2));
    Object.values(yAxis).forEach(axis => axis.ticks(Math.max(height / 50, 2)))
};

var prevData = [],
    prevConcentrations = [];

// Create a function that takes a dataset as input and update the plot:
export function update(id, data, cumulative) {

    let mounted = false;
    if (data && data.length === 0) return;
    if (d3.select(`svg.${id}`).empty()) {
        mount(id, data);
        mounted = true;
    }

    function lixo(a, s) {
        let temp = [];
        if (a.length <= s)
            return a;
        for (let i = 0; i < a.length; i += (a.length / s)) {
            temp.push(a[parseInt(i)])
        }
        return temp
    }
    data = lixo(data, 50)

    if (cumulative) {
        data = [...data]

        // Format the data field
        for (let i = 1; i < data.length; i++) {
            data[i] = { ...data[i] }
            data[i]['c_score'] += data[i - 1]['c_score']
            data[i]['kwh'] += data[i - 1]['kwh']
            data[i]['cost'] += data[i - 1]['cost']
        }
    }


    // Format the data field
    data.forEach(function (d) {
        const parsed = d3.isoParse(d["time"]);
        if (parsed) d["time"] = parsed
    });

    data.sort((a, b) => {
        return a.time - b.time
    })

    // Reformat data to make it more copasetic for d3
    // data = An array of objects
    // concentrations = An array of three objects, each of which contains an array of objects
    concentrations = productCategories.map(category => ({
        category: category,
        datapoints: data.map(function (d) {
            return { time: d["time"], concentration: +d[category] }
        })
    }))

    if (true) {
        // Update line before domain update
        svg.selectAll(".category")
            .data(concentrations)
            .select('path')
            .attr("d", d => line[d.category](d.datapoints))

        svg.select(".notcategory")
            .select('path')
            .attr("d", tempLine(data))
    }

    // Set the domain of the axes
    xScale.domain(d3.extent(data, d => d["time"]));
    tempScale.domain(d3.extent(data, d => d["temperature"]));
    Object.values(yScale).forEach((scale, index) =>

        scale.domain([0, d3.max(concentrations[index].datapoints, d => d.concentration) * 1.1]));

    // Place the axes on the chart
    let xAxisNode = svg.select(".x.axis")
    if (xAxisNode.empty()) {
        xAxisNode = svg.append("g")
            .attr("class", "x axis")
            .attr("transform", `translate(0, ${height})`)

        xAxisNode.append("text")
            .attr("class", "label")
            .attr("y", 45)
            .attr("x", width / 2)
            .style("text-anchor", "beginning")
            .style("font-size", 15)
            .text("Time");
    }
    xAxisNode.transition()
        .duration(800)
        .call(xAxis);

    let tAxisNode = svg.select(".t.axis")
    if (tAxisNode.empty()) {
        tAxisNode = svg.append("g")
            .attr("class", "t axis")

        tAxisNode.append("text")
            .attr("class", "label")
            .attr("y", - 45)
            .attr("x", - height / 2 + 45)
            .attr("transform", "rotate(-90)")
            .style("text-anchor", "beginning")
            .style("font-size", 15)
            .text("Temperature");
    }
    tAxisNode.transition()
        .duration(800)
        .call(tempAxis);


    productCategories.forEach(d => {
        let yAxisNode = svg.select(`.y.axis.${d}`)

        const meta = {
            'c_score': { title: "Confort Score", pad: -50 },
            'kwh': { title: "Energy", pad: -30 },
            'cost': { title: "Custo", pad: -30 },
        }

        if (yAxisNode.empty()) {
            yAxisNode = svg.append("g")
                .attr("class", `y axis ${d}`)
                .attr("transform", `translate(${width}, 0)`)
            // .style("opacity", d === currCategory ? 1 : 0)
            yAxisNode.append("text")
                .attr("class", "label")
                .attr("y", -45)
                .attr("x", height / 2 + meta[d].pad)
                .attr("transform", "rotate(90)")
                .style("text-anchor", "beginning")
                .style("font-size", 15)
                .text(meta[d].title);
        }
        yAxisNode.transition()
            .duration(800)
            .call(yAxis[d])
    })

    // Place the lines
    let tempLineNode = svg.select(".notcategory")
    if (tempLineNode.empty()) {
        svg.append("g")
            .attr("class", "notcategory temperature")
            .append("path")
            .attr("clip-path", "url(#clip)")
            .attr("d", tempLine(data))
            .attr("fill", "none")
            .attr("class", "notline")
            .attr("stroke", "var(--normal-color)")
            .style("stroke-width", 2)
    } else {
        tempLineNode
            .select('path')
            .transition()
            .duration(800)
            .attr("d", tempLine(data))
    }

    let products = svg.selectAll(".category")
        .data(concentrations)

    products
        .attr("class", d => `category ${d.category}`)
        .select('path')
        .transition()
        .duration(800)
        .attr("d", d => {
            return line[d.category](d.datapoints)
        });

    products
        .enter().append("g")
        .attr("class", d => `category ${d.category}`)
        .append("path")
        .attr("clip-path", "url(#clip)")
        .attr("fill", "none")
        .attr("class", "line")
        .style("stroke-width", 2)
        // .merge(products)
        .transition()
        .duration(800)
        .attr("d", d => {
            return line[d.category](d.datapoints)
        });


    prevData = data;
    prevConcentrations = concentrations;


    // Call the resize function
    if (mounted)
        resize(id, data)
    // pointerleft();
}
