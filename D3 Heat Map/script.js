let url = "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/global-temperature.json";
let req = new XMLHttpRequest();

let baseTemp;
let values;

let xScale;
let yScale;

let minYear;
let maxYear;

let width = 1200;
let height = 600;
let padding = 60;

let canvas = d3.select("#canvas");


let drawCanvas = () => {
    canvas.attr("width", width);
    canvas.attr("height", height);
};

let generateScales = () => {
     minYear = d3.min(values, (d) => d.year);
     maxYear = d3.max(values, (d) => d.year);


    xScale = d3.scaleLinear()
        .range([padding, width - padding])
        .domain([minYear, maxYear + 1]);

    yScale = d3.scaleTime()
        .range([padding, height - padding])
        .domain([new Date(0, 0, 0, 0, 0, 0, 0), new Date(0, 12, 0, 0, 0, 0, 0)]);
};

let drawCells = () => {

    let tooltip = d3.select("body")
                    .append("div")
                    .attr("id", "tooltip")
                    .style("opacity", 0)
                    .style("position", "absolute")
                    .style("background-color", "white");

    canvas.selectAll("rect")
        .data(values)
        .enter()
        .append("rect")
        .attr("class", "cell")
        .attr("fill", (d) => {
            let temp = baseTemp + d.variance;
            if (temp < 2.8) {
                return "#1a9850";
            } else if (temp < 3.9) {
                return "#91cf60";
            } else if (temp < 5) {
                return "#d9ef8b";
            } else if (temp < 6.1) {
                return "#fee08b";
            } else if (temp < 7.2) {
                return "#fc8d59";
            } else if (temp < 8.3) {
                return "#d73027";
            } else {
                return "#7f0000";
            }
        })
        .attr("data-month", (d) => d.month - 1)
        .attr("data-year", (d) => d.year)
        .attr("data-temp", (d) => baseTemp + d.variance)
        .attr("height", (height - (2 * padding)) / 12)
        .attr("y", (d) => yScale(new Date(0, d.month-1, 0, 0, 0, 0, 0)))
        .attr("width", (width - (2 * padding)) / (maxYear - minYear))
        .attr("x", (d) => xScale(d.year))
        .on("mouseover", (d) => {
            tooltip.transition()
                    .duration(200)
                    .style("opacity", 0.9)
            tooltip.html("Year: "+ d.year + "<br> Month: " + d.month + "<br> Temp: " + (baseTemp + d.variance).toFixed(2))
                    .attr("data-year", d.year)
                    .style("left", (d3.event.pageX + 10) + "px")
                    .style("top", (d3.event.pageY - 28) + "px")
        })
        .on("mouseout", (d) => {
            tooltip.transition()
                    .duration(500)
                    .style("opacity", 0)
        });

};

let drawLegend = () => {
    let legend = d3.select("#legend");

    legend.selectAll("rect")
        .data([2.8, 3.9, 5, 6.1, 7.2, 8.3])
        .enter()
        .append("rect")
        .attr("class", "legend-item")
        .attr("height", 20)
        .attr("width", 40)
        .attr("x", (d, i) => i * 40)
        .attr("y", 0)
        .attr("fill", (d) => {
            if (d < 2.8) {
                return "#1a9850";
            } else if (d < 3.9) {
                return "#91cf60";
            } else if (d < 5) {
                return "#d9ef8b";
            } else if (d < 6.1) {
                return "#fee08b";
            } else if (d < 7.2) {
                return "#fc8d59";
            } else if (d < 8.3) {
                return "#d73027";
            } else {
                return "#7f0000";
            }
        });

    legend.selectAll("text")
        .data([2.8, 3.9, 5, 6.1, 7.2, 8.3])
        .enter()
        .append("text")
        .attr("class", "legend-text")
        .attr("x", (d, i) => i * 40)
        .attr("y", 40)
        .text((d) => d+"°C");

};

let drawAxes = () => {

    let xAxis = d3.axisBottom(xScale)
                    .tickFormat(d3.format("d"));

    let yAxis = d3.axisLeft(yScale)
                    .tickFormat(d3.timeFormat("%B"));

    canvas.append("g")
        .call(xAxis)
        .attr("id", "x-axis")
        .attr("transform", "translate(0," + (height - padding) + ")");
    
    canvas.append("g")
            .call(yAxis)
            .attr("id", "y-axis")
            .attr("transform", "translate(" + padding + ",0)");

};

req.open("GET", url, true);
req.onload = () => {
    let data = JSON.parse(req.responseText);
    baseTemp = data.baseTemperature;
    values = data.monthlyVariance;
    drawCanvas();
    generateScales();
    drawCells();
    drawLegend();
    drawAxes();
};
req.send();