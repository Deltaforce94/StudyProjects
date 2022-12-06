let url = "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json";
let req = new XMLHttpRequest();

let data;
let values;

let heightScale;
let xScale;
let xAxisScale;
let yAxisScale;

let width = 800;
let height = 600;
let padding = 40;

let svg = d3.select("svg")

let drawCanvas = () => {
    svg.attr("width", width)
        .attr("height", height);

}

let generateScales = () => {
    heightScale = d3.scaleLinear()
        .domain([0, d3.max(values, (d) => d[1])])
        .range([0, height - padding * 2]);
    
    xScale = d3.scaleLinear()
        .domain([0, values.length -1])
        .range([padding, width - padding]);

    let dates = values.map((d) => new Date(d[0]));

    xAxisScale = d3.scaleTime()
                    .domain([d3.min(dates), d3.max(dates)])
                    .range([padding, width - padding]);
    
    yAxisScale = d3.scaleLinear()
                    .domain([0, d3.max(values, (d) => d[1])])
                    .range([height - padding, padding]);
}

let drawBars = () => {

    let tooltip = d3.select("body")
                    .append("div")
                    .attr("id", "tooltip")
                    .style("opacity", 0)
                    .style("position", "absolute")
                    .style("background-color", "white")

    svg.selectAll("rect")
        .data(values)
        .enter()
        .append("rect")
        .attr("class", "bar")
        .attr("color", "blue")
        .attr("width", (width - padding * 2) / values.length)
        .attr("data-date", (d) => d[0])
        .attr("data-gdp", (d) => d[1])
        .attr("height", (d) => heightScale(d[1]))
        .attr("transform", (d, i) => "translate(" + xScale(i) + ", " + (height - padding - heightScale(d[1])) + ")")
        .on("mouseover", (d) => {
            tooltip.transition()
                    .duration(200)
                    .style("opacity", 0.6)
            tooltip.html("Date: "+d[0] + "<br> GDP: " + d[1])
                    .attr("data-date", d[0])
                    .style("left", (d3.event.pageX + 10) + "px")
                    .style("top", (d3.event.pageY - 28) + "px")
        })
        .on("mouseout", (d) => {
            tooltip.transition()
                    .duration(500)
                    .style("opacity", 0)
        });

}

let drawAxes = () => {
    
    let xAxis = d3.axisBottom(xAxisScale);

    svg.append("g")
        .call(xAxis)
        .attr("id", "x-axis")
        .attr("transform", "translate(0, " + (height - padding) + ")");

    let yAxis = d3.axisLeft(yAxisScale);
    
    svg.append("g")
        .call(yAxis)
        .attr("id", "y-axis")
        .attr("transform", "translate(" + padding + ", 0)");

}



req.open("GET", url, true);
req.onload = () => {
    data = JSON.parse(req.responseText);
    values = data.data;
    drawCanvas();
    generateScales();
    drawBars();
    drawAxes();
}
req.send();