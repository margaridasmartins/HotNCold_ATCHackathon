
import * as d3 from "d3"
import "src/utils/resizeListener"

export function mountChart(id, data) {
    var parent = d3.select(`#${id}`);
    if (parent.empty()) throw new Error(`Element with ID ${id} not found`);

    parent.select(`svg.${id}`).remove()
    var parent = parent
        .append("svg")
        .attr("class", `${id} h-100 w-100`)

    // Define margins
    var margin = { top: 20, right: 20, bottom: 30, left: 50 },
        width = parseInt(parent.style("width")) - margin.left - margin.right,
        height = parseInt(parent.style("height")) - margin.top - margin.bottom;

    // Define date parser
    var parseDate = d3.timeParse("%Y-%m-%d %H:%M:%S");

    // Define svg canvas
    var svg = parent
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // Define scales
    var xScale = d3.scaleTime().range([0, width]);
    var yScale = d3.scaleLinear().range([height, 0]);
    var color = d3.scaleOrdinal().range(["#8c510a", "#dfc27d", "#35978f"]);

    // Define axes
    var xAxis = d3.axisBottom(xScale);
    var yAxis = d3.axisLeft(yScale);

    // Define lines
    var line = d3.line()
        .x(function (d) { return xScale(d["date"]); })
        .y(function (d) { return yScale(d["concentration"]); })
        .curve(d3.curveBasis);

    // Set the color domain equal to the three product categories
    var productCategories = Object.keys(data[0])
        .filter(function (key) { return (key !== "Order Month") && (key !== "metric") })
    color.domain(productCategories);

    // console.log(JSON.stringify(data, null, 2)) // to view the structure

    // Format the data field
    data.forEach(function (d) {
        const parsed = parseDate(d["Order Month"]);
        if (parsed) d["Order Month"] = parsed
    });

    // Filter the data to only include a single metric
    var subset = data.filter(function (el) { return el.metric === "Quantity" });
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
    // console.log(JSON.stringify(concentrations, null, 2)) // to view the structure

    // Set the domain of the axes
    xScale.domain(d3.extent(subset, function (d) { return d["Order Month"]; }));
    yScale.domain([0.25, 0.5]);

    // Place the axes on the chart
    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis)
        .append("text")
        .attr("class", "label")
        .attr("y", 6)
        .attr("dy", ".71em")
        .attr("dx", ".71em")
        .style("text-anchor", "beginning")
        .text("Product Concentration");

    var products = svg.selectAll(".category")
        .data(concentrations)
        .enter().append("g")
        .attr("class", "category");

    console.log(concentrations[0].datapoints)
    console.log(line(concentrations[0].datapoints))

    // console.log(line(d.datapoints))
    products.append("path")
        .attr("fill", "none")
        .attr("class", "line")
        .attr("d", function (d) { return line(d.datapoints); })
        .style("stroke", function (d) { return color(d.category); })
        .style("stroke-width", 2);

    // console.log(JSON.stringify(d3.values(concentrations), null, 2)) // to view the structure
    // console.log(Object.values(concentrations)); // to view the structure
    // console.log(concentrations);
    // console.log(concentrations.map(function()))

    // Define responsive behavior
    function resize() {
        var width = parseInt(parent.style("width")) - margin.left - margin.right,
            height = parseInt(parent.style("height")) - margin.top - margin.bottom;

        // Update the range of the scale with new width/height
        xScale.range([0, width]);
        yScale.range([height, 0]);

        parent
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)

        // Update the axis and text with the new scale
        svg.select('.x.axis')
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis);

        svg.select('.y.axis')
            .call(yAxis);

        // Force D3 to recalculate and update the line
        svg.selectAll('.line')
            .attr("d", function (d) { return line(d.datapoints); });

        // Update the tick marks
        xAxis.ticks(Math.max(width / 75, 2));
        yAxis.ticks(Math.max(height / 50, 2));

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