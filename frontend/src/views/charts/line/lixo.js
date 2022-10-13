import * as d3 from "d3"

// set the dimensions and margins of the graph
const margin = { top: 10, right: 100, bottom: 30, left: 30 },
    width = 460 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;


export function build() {

    // append the svg object to the body of the page
    var svg = d3.select("#my_dataviz");
    svg.selectAll("*").remove();
    svg = svg.append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

    // var data = {
    //     time: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    //     valueA: [2, 3, 1, 7, 8, 8, 5, 4, 9, 11],
    //     valueB: [5, 4, 4, 4, 8, 13, 15, 17, 18, 13],
    //     valueC: [5, 4, 4, 4, 8, 13, 15, 17, 18, 13,]
    // }

    var data = [{ time: "1", valueA: "2", valueB: "5", valueC: "13" },
    { time: "2", valueA: "3", valueB: "4", valueC: "14" },
    { time: "3", valueA: "1", valueB: "4", valueC: "16" },
    { time: "4", valueA: "7", valueB: "4", valueC: "12" },
    { time: "5", valueA: "8", valueB: "8", valueC: "7" },
    { time: "6", valueA: "8", valueB: "13", valueC: "9" },
    { time: "7", valueA: "5", valueB: "15", valueC: "3" },
    { time: "8", valueA: "4", valueB: "17", valueC: "2" },
    { time: "9", valueA: "9", valueB: "18", valueC: "1" },
    { time: "10", valueA: "11", valueB: "13", valueC: "1" }]

    //Read the data
    console.log("lixo")

    // List of groups (here I have one group per column)
    const allGroup = ["valueA", "valueB", "valueC"]

    // add the options to the button
    d3.select("#selectButton")
        .selectAll('myOptions')
        .data(allGroup)
        .enter()
        .append('option')
        .text(d => d) // text showed in the menu
        .attr("value", d => d) // corresponding value returned by the button

    // Add X axis --> it is a date format
    const x = d3.scaleLinear()
        .domain([0, 10])
        .range([0, width]);
    svg.append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(d3.axisBottom(x));

    // Add Y axis
    const y = d3.scaleLinear()
        .domain([0, 20])
        .range([height, 0]);
    svg.append("g")
        .call(d3.axisLeft(y));

    // Initialize line with group a
    const line = svg
        .append('g')
        .append("path")
        .datum(data)
        .attr("d", d3.line()
            .x(d => x(+d.time))
            .y(d => y(+d.valueA))
        )
        .attr("stroke", "black")
        .style("stroke-width", 4)
        .style("fill", "none")

    // Initialize dots with group a
    const dot = svg
        .selectAll('circle')
        .data(data)
        .join('circle')
        .attr("cx", d => x(+d.time))
        .attr("cy", d => y(+d.valueA))
        .attr("r", 7)
        .style("fill", "#69b3a2")


    // A function that update the chart
    function update(selectedGroup) {

        // Create new data with the selection?
        const dataFilter = data.map(function (d) { return { time: d.time, value: d[selectedGroup] } })

        // Give these new data to update line
        line
            .datum(dataFilter)
            .transition()
            .duration(1000)
            .attr("d", d3.line()
                .x(d => x(+d.time))
                .y(d => y(+d.value))
            )
        dot
            .data(dataFilter)
            .transition()
            .duration(1000)
            .attr("cx", d => x(+d.time))
            .attr("cy", d => y(+d.value))
    }

    // When the button is changed, run the updateChart function
    d3.select("#selectButton").on("change", function (event, d) {
        // recover the option that has been chosen
        let selectedOption = d3.select(this).property("value")
        // run the updateChart function with this selected option
        update(selectedOption)
    })
}