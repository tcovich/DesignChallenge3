// set the dimensions and margins of the graph
var margin = {top: 30, right: 30, bottom: 70, left: 60},
width = 2000,
height = 300

// append the svg object to the body of the page
var svg = d3.select("#barplot")
.append("svg")
.attr("width", width + margin.left + margin.right)
.attr("height", height + margin.top + margin.bottom)
.append("g")
.attr("transform", `translate(${margin.left},${margin.top})`);

// Initialize the Y axis
var y = d3.scaleLinear()
.range([ height, 0]);
var yAxis = svg.append("g")


// A function that create / update the plot for a given variable:
function update(buttonVar) {

    // Parse the Data
    d3.csv("KSEA.csv").then( function(data) {
        var x = d3.scaleBand()
        .range([ 0, width ])
        .domain(data.map(function(d) { 
            // parseTime = d3.timeParse("%Y")
            // // parseDate = d3.time.format("%Y-%m-%d").parse()
            // formatDate = d3.time.format("%b-%Y")
            // done = formatDate(parseDate(parseTime(d.date)))
            return d.date; }))
        .padding(0.2);
        svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x))
        .selectAll("text")
            .attr("transform", "translate(-10,10)rotate(-90)")
            .style("text-anchor", "end")
            .style("font-size", 5);


        // Add Y axis
        y.domain([0, d3.max(data, d => +d[buttonVar]) ]);
        yAxis.transition().duration(1000).call(d3.axisLeft(y));

        // map to rects
        var rects = svg.selectAll("rect")
        .data(data)
        .join("rect")
        .transition()
        .duration(1000)
            .attr("x", d => x(d.date))
            .attr("y", d => y(d[buttonVar]))
            .attr("width", x.bandwidth())
            .attr("height", d => height - y(d[buttonVar]))
            .attr("fill", function() {
                if (buttonVar == "actual_mean_temp") {
                    return "#DC7E2B"
                }
                else {
                    return "#2BD4DC"
                }
            })
    })

}

// Initialize plot
update('actual_mean_temp')
