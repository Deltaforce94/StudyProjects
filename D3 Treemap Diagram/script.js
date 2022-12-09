let url = "https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/video-game-sales-data.json";

let movieData;

let canvas = d3.select("#canvas");

let drawTreeMap = () => {

    let tooltip = d3.select("body")
    .append("div")
    .attr("id", "tooltip")
    .style("opacity", 0)
    .style("position", "absolute")
    .style("background-color", "wheat")
    .style("padding", "5px")
    .style("border-radius", "5px")
    .attr("pointer-events", "none");

    let hierarchy = d3.hierarchy(movieData, (d) => {
        return d.children;
    }).sum((d) => {
        return d.value;
    }).sort((d1, d2) => {
        return d2.value - d1.value;
    });

    let treeMap = d3.treemap()
        .size([1000, 600]);
    
    treeMap(hierarchy);

    let movieTiles = hierarchy.leaves();

    let block = canvas.selectAll("g")
        .data(movieTiles)
        .enter()
        .append("g");

    block.append("rect")
        .attr("class", "tile")
        .attr("fill", (game) => {
            let category = game.data.category;
            if(category == "Wii"){
                return "red";
            } else if(category == "NES"){
                return "blue";
            } else if(category == "GB"){
                return "green";
            } else if(category == "DS"){
                return "yellow";
            } else if(category == "X360"){
                return "purple";
            } else if(category == "PS3"){
                return "orange";
            } else if(category == "PS2"){
                return "pink";
            } else if(category == "SNES"){
                return "brown";
            } else if(category == "GBA"){
                return "black";
            } else if(category == "PS4"){
                return "grey";
            } else if(category == "3DS"){
                return "cyan";
            } else if(category == "N64"){
                return "magenta";
            } else if(category == "PS"){
                return "lime";
            } else if(category == "XB"){
                return "maroon";
            } else if(category == "PSP"){
                return "olive";
            } else if(category == "PC"){
                return "navy";
            } else if(category == "2600"){
                return "teal";
            } else if(category == "XOne"){
                return "silver";
            } else if(category == "WiiU"){
                return "aqua";
            } else if(category == "GC"){
                return "fuchsia";
            } else if(category == "GEN"){
                return "crimson";
            } else if(category == "DC"){
                return "indigo";
            } else if(category == "PSV"){
                return "coral";
            } else if(category == "SAT"){
                return "khaki";
            } else if(category == "SCD"){
                return "orchid";
            } else if(category == "WS"){
                return "plum";
            } else if(category == "NG"){
                return "salmon";
            } else if(category == "TG16"){
                return "tan";
            } else if(category == "3DO"){
                return "violet";
            } else if(category == "GG"){
                return "wheat";
            } else if(category == "PCFX"){
                return "azure";
            }
        }).attr("data-name", (game) => {
            return game.data.name;
        }).attr("data-category", (game) => {
            return game.data.category;
        }).attr("data-value", (game) => {
            return game.data.value;
        }).attr("x", (game) => {
            return game.x0;
        }).attr("y", (game) => {
            return game.y0;
        }).attr("width", (game) => {
            return game.x1 - game.x0;
        }).attr("height", (game) => {
            return game.y1 - game.y0;
        }).on("mouseover", (game) => {
            tooltip.transition()
                .duration(200)
                .style("opacity", 0.9)
            tooltip.html("Name: " + game.data.name + "<br>Category: " + game.data.category + "<br>Value: " + game.data.value)
                .attr("data-value", game.data.value)
                .style("left", (d3.event.pageX + 50) + "px")
                .style("top", (d3.event.pageY - 50) + "px")
        }).on("mouseout", (game) => {
            tooltip.transition()
                .duration(20)
                .style("opacity", 0)
        });

    block.append("text")
        .text((game) => {
            return game.data.name 
        }).attr("x", (game) => {
            return game.x0 + 5;
        }).attr("y", (game) => {
            return game.y0 + 20;
        }).attr("font-size", "10px")
        .attr("fill", "white")
        .attr("font-family", "sans-serif")
        .attr("font-weight", "bold")
        .attr("pointer-events", "none");
}

let drawLegend = () => {

    let legend = d3.select("#legend");

    legend.selectAll("rect")
        .data(["Wii", "NES", "GB", "DS", "X360", "PS3", "PS2", "SNES", "GBA", "PS4", "3DS", "N64", "PS", "XB", "PSP", "PC", "2600", "XOne", "WiiU", "GC", "GEN", "DC", "PSV", "SAT", "SCD", "WS", "NG", "TG16", "3DO", "GG", "PCFX"])
        .enter()
        .append("rect")
        .attr("class", "legend-item")
        .attr("fill", (category) => {
            if(category == "Wii"){
                return "red";
            } else if(category == "NES"){
                return "blue";
            } else if(category == "GB"){
                return "green";
            } else if(category == "DS"){
                return "yellow";
            } else if(category == "X360"){
                return "purple";
            } else if(category == "PS3"){
                return "orange";
            } else if(category == "PS2"){
                return "pink";
            } else if(category == "SNES"){
                return "brown";
            } else if(category == "GBA"){
                return "black";
            } else if(category == "PS4"){
                return "grey";
            } else if(category == "3DS"){
                return "cyan";
            } else if(category == "N64"){
                return "magenta";
            } else if(category == "PS"){
                return "lime";
            } else if(category == "XB"){
                return "maroon";
            } else if(category == "PSP"){
                return "olive";
            } else if(category == "PC"){
                return "navy";
            } else if(category == "2600"){
                return "teal";
            } else if(category == "XOne"){
                return "silver";
            } else if(category == "WiiU"){
                return "aqua";
            } else if(category == "GC"){
                return "fuchsia";
            } else if(category == "GEN"){
                return "crimson";
            } else if(category == "DC"){
                return "indigo";
            } else if(category == "PSV"){
                return "coral";
            } else if(category == "SAT"){
                return "khaki";
            } else if(category == "SCD"){
                return "orchid";
            } else if(category == "WS"){
                return "plum";
            } else if(category == "NG"){
                return "salmon";
            } else if(category == "TG16"){
                return "tan";
            } else if(category == "3DO"){
                return "violet";
            } else if(category == "GG"){
                return "wheat";
            } else if(category == "PCFX"){
                return "azure";
            }
        }).attr("x", (category, index) => {
            return index * 40;
        }).attr("y", 0).attr("width", 20).attr("height", 20);

    legend.selectAll("text")
        .data(["Wii", "NES", "GB", "DS", "X360", "PS3", "PS2", "SNES", "GBA", "PS4", "3DS", "N64", "PS", "XB", "PSP", "PC", "2600", "XOne", "WiiU", "GC", "GEN", "DC", "PSV", "SAT", "SCD", "WS", "NG", "TG16", "3DO", "GG", "PCFX"])
        .enter()
        .append("text")
        .attr("x", (category, index) => {
            return index * 40;
        }).attr("y", 30).text((category) => {
            return category;
        }).attr("text-align", "center")
        .attr("font-size", "10px");


}

d3.json(url).then((data, error) => {
  if(error){
    console.log(error);
  } else {
    movieData = data;
    console.log(movieData);
    drawTreeMap();
    drawLegend();
  }
});