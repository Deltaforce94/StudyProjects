let countyURL = "https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/counties.json";
let educationURL = "https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/for_user_education.json";

let countyData;
let educationData;

let canvas = d3.select("#canvas");

let drawMap = () => {

    let tooltip = d3.select("body")
        .append("div")
        .attr("id", "tooltip")
        .style("opacity", 0)
        .style("position", "absolute")
        .style("background-color", "wheat")
        .style("padding", "5px")
        .style("border-radius", "5px")

    canvas.selectAll('path')
        .data(countyData.features)
        .enter()
        .append('path')
        .attr('d', d3.geoPath())
        .attr('class', 'county')
        .attr("fill", (d) => {
            let county = educationData.find((item) => item.fips === d.id);
            let percentage = county.bachelorsOrHigher;
            if(percentage < 15){
                return "#062007";
            }else if(percentage < 30){
                return "#0d400f";
            }else if(percentage < 45){
                return "#1a801d";
            }else if(percentage < 60){
                return "#26bf2c";
            }else if(percentage < 75){
                return "#2ddf34";
            }else{
                return "#33ff3b";
            }
        })
        .attr('data-fips', (d) => d.id)
        .attr('data-education', (d) => {
            let county = educationData.find((item) => item.fips === d.id);
            return county.bachelorsOrHigher;
        })
        .on("mouseover", (d) => {
            tooltip.transition()
                    .duration(200)
                    .style("opacity", 0.9)
            tooltip.html(() => {
                let county = educationData.find((item) => item.fips === d.id);
                return county.area_name + ", " + county.state + ": " + county.bachelorsOrHigher + "%";
            })
            .attr("data-education", () => {
                let county = educationData.find((item) => item.fips === d.id);
                return county.bachelorsOrHigher;
            })
            .style("left", (d3.event.pageX + 10) + "px")
            .style("top", (d3.event.pageY - 28) + "px");

        })
        .on("mouseout", (d) => {
            tooltip.transition()
                    .duration(100)
                    .style("opacity", 0)
        });


};

let drawLegend = () => {
    let legend = d3.select("#legend");

    legend.selectAll('rect')
        .data([0, 15, 30, 45, 60, 75])
        .enter()
        .append('rect')
        .attr('x', (d, i) => i * 30)
        .attr('y', 0)
        .attr('width', 30)
        .attr('height', 30)
        .attr('fill', (d) => {
            if(d < 15){
                return "#062007";
            }else if(d < 30){
                return "#0d400f";
            }else if(d < 45){
                return "#1a801d";
            }else if(d < 60){
                return "#26bf2c";
            }else if(d < 75){
                return "#2ddf34";
            }else{
                return "#33ff3b";
            }
        });
    
    legend.selectAll('text')
        .data([0, 15, 30, 45, 60, 75])
        .enter()
        .append('text')
        .attr('x', (d, i) => i * 30)
        .attr('y', 40)
        .text((d) => d + "%")
        .attr("font-size", "12px");
       
};

d3.json(countyURL).then(
    (data, error) => {
        if(error){
            console.log(log);
        }else{
            countyData = topojson.feature(data, data.objects.counties);
            d3.json(educationURL).then(
                (data, error) => {
                    if(error){
                        console.log(log);
                    }else{
                        educationData = data;
                        drawMap();
                        drawLegend();
                    }
                }
            )
        }
    }
);