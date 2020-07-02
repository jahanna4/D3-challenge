// @TODO: YOUR CODE HERE!
var svgheight = 700;
var svgwidth = 1100;

var margin = {
    top: 10,
    bottom: 70,
    left: 70,
    right: 20
};

var height = svgheight-margin.top-margin.bottom;
var width = svgwidth-margin.left-margin.right;

var svg = d3.select("#scatter").append("svg").attr("width", svgwidth).attr("height", svgheight);
var chartgp = svg.append("g").attr("transform", `translate(${margin.left}, ${margin.top})`);

d3.csv("assets/data/data.csv").then(function(statedata) {

    statedata.forEach(function(data) {
        data.income = +data.income;
        data.obesity = +data.obesity;
    });
    // console.log(statedata);

    var xscale = d3.scaleLinear().domain([d3.min(statedata, d=> d.obesity)*.9, d3.max(statedata, d=> d.obesity)*1.05]).range([0,width]);
    var yscale = d3.scaleLinear().domain([d3.min(statedata, d=>d.income)*.9, d3.max(statedata, d=>d.income)*1.025]).range([height,0]);
    var axisbottom = d3.axisBottom(xscale).ticks(15);
    var axisleft = d3.axisLeft(yscale).ticks(18);

    chartgp.append("g").attr("transform", `translate(0, ${height})`).call(axisbottom);
    chartgp.append("g").call(axisleft);
    chartgp.append("text").attr("transform", "rotate(-90)").attr("y", 0-margin.left).attr("x", 0-(height/2)).attr("dy","1em").attr("class", "axisText").text("Income");
    chartgp.append("text").attr("transform", `translate(${width/2}, ${height + margin.top + 35})`).attr("class", "axisText").text("Obesity");

    chartgp.selectAll("circle").data(statedata).enter().append("circle").attr("cx", d =>xscale(d.obesity)).attr("cy", d=>yscale(d.income)).attr("r", "10").attr("fill", "blue").attr("opacity", ".75");

});