let url = 'https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json';
let req = new XMLHttpRequest();

let values;

let xScale;
let yScale;

let xAxis;
let yAxis;

let width = 800;
let height = 600;
let padding = 40;

let svg = d3.select('svg');
let tooltip = d3.select('#tooltip');

let generateScales = () => {
    
    xScale = d3.scaleLinear()
                        .domain([d3.min(values, (d) => {
                            return d['Year']
                        }) - 1 , d3.max(values, (d) => {
                            return d['Year']
                        }) + 1])
                        .range([padding, width-padding])

    yScale = d3.scaleTime()
                        .domain([d3.min(values, (d) => {
                            return new Date(d['Seconds'] * 1000)
                        }), d3.max(values, (d) => {
                            return new Date(d['Seconds'] * 1000)
                        })])
                        .range([padding, height-padding])

}

let drawCanvas = () => {
    svg.attr('width', width)
    svg.attr('height', height)
}

let drawPoints = () => {

    let tooltip = d3.select("body")
    .append("div")
    .attr("id", "tooltip")
    .style("opacity", 0)
    .style("position", "absolute")
    .style("background-color", "white")

    svg.selectAll('circle')
            .data(values)
            .enter()
            .append('circle')
            .attr('class', 'dot')
            .attr('r', '5')
            .attr('data-xvalue', (d) => {
                return d['Year']
            })
            .attr('data-yvalue', (d) => {
                return new Date(d['Seconds'] * 1000)
            })
          .attr('cx', (d) => {
              return xScale(d['Year'])
          })         
            .attr('cy', (d) => {
                return yScale(new Date(d['Seconds'] * 1000))
            })
            .attr('fill', (d) => {
                if(d['URL'] === ""){
                    return 'lightgreen'
                }else{
                    return 'red'
                }
            })
            .on('mouseover', (d) => {
                tooltip.transition()
                        .duration(0)
                        .style("opacity", 0.7)
                        .style("left", (d3.event.pageX + 10) + "px")
                        .style("top", (d3.event.pageY - 28) + "px")
                
                if(d['Doping'] != ""){
                    tooltip.text(d['Year'] + ' - ' + d['Name'] + ' - ' + d['Time'] + ' - ' + d['Doping'])
                }else{
                    tooltip.text(d['Year'] + ' - ' + d['Name'] + ' - ' + d['Time'] + ' - ' + 'No Allegations')
                }
                
                tooltip.attr('data-year', d['Year'])
            })
            .on('mouseout', (d) => {
                tooltip.transition()
                        .duration(500)
                        .style("opacity", 0)
            })
}

let generateAxes = () => {

    xAxis = d3.axisBottom(xScale)
                .tickFormat(d3.format('d'))
                

    yAxis = d3.axisLeft(yScale)
                .tickFormat(d3.timeFormat('%M:%S'))


    svg.append('g')
        .call(xAxis)
        .attr('id', 'x-axis')
        .attr('transform', 'translate(0, ' + (height-padding) +')')

    svg.append('g')
        .call(yAxis)
        .attr('id', 'y-axis')
        .attr('transform','translate(' + padding + ', 0)')
}


req.open('GET', url, true)
req.onload = () => {
    values = JSON.parse(req.responseText)
    console.log(values)
    drawCanvas()
    generateScales()
    drawPoints()
    generateAxes()
}
req.send()