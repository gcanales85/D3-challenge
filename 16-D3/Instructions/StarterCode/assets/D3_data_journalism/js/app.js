// @TODO: YOUR CODE HERE!
// Define SVG area dimensions
function makeResponsive() {

var svgWidth = 960;
var svgHeight = 500;

// Define the chart's margins as an object
var chartMargin = {
  top: 50,
  right: 50,
  bottom: 50,
  left: 50
};
// Define dimensions of the chart area
var chartWidth = svgWidth - chartMargin.left - chartMargin.right;
var chartHeight = svgHeight - chartMargin.top - chartMargin.bottom;

// create svg container
var svg = d3.select(".chart")
.append("svg")
.attr("width", svgWidth)
.attr("height", svgHeight);

// shift everything over by the margins
var chartGroup = svg.append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

//Import data 
d3.csv("assets/data/data.csv").then(function(Datasets) {
    
//Format the data: Step 1: Parse Data/Case as numbers
Datasets.forEach(function(data) {
    data.poverty = +data.poverty;
    data.healthcare = +data.healthcare;
    data.age = +data.age;
    data.smokers = +data.smokers;
});

//Step 2: Create scaling functions
var xLinearScale = d3.scaleLinear()
.domain([20, d3.max(Datasets, d => d.poverty)])
.range([0, chartWidth]);

var yLinearScale = d3.scaleLinear()
.domain([0, d3.max(Datasets, d => d.healthcare)])
.range([chartHeight, 0]);

//Step 3: Create axis functions
var bottomAxis = d3.axisBottom(xLinearScale);
var leftAxis = d3.axisLeft(yLinearScale);

//Step 4: Append Axes to the chart
chartGroup.append("g")
.attr("transform", `translate(0, ${chartHeight})`)
.call(bottomAxis);

chartGroup.append("g")
.call(leftAxis);

//Step 5: Create circles
var circlesGroup = chartGroup.selectAll("circle")
.data(Datasets)
.enter()
.append("circle")
.attr("cx", d => xLinearScale(d.poverty))
.attr("cy", d => yLinearScale(d.healthcare))
.attr("r", "10")
.attr("fill", "lightgray")
.attr("opacity", ".5")
.attr("stroke-width","2")
.attr("stroke","darkgray");

console.log(Datasets);

//Step 6: Initialize tool tip
    // ==============================
    var toolTip = d3.tip()
      .attr("class", "tooltip")
      .offset([80, -60])
      .html(function(d) {
        return (`${d.data}<br>poverty: ${d.poverty}<br>Healthcare: ${d.healthcare}`);
      });
  // Step 7: Create tooltip in the chart
    // ==============================
    chartGroup.call(toolTip);

    // Step 8: Create event listeners to display and hide the tooltip
    // ==============================
    circlesGroup.on("click", function(data) {
      toolTip.show(data, this);
    })
      // onmouseout event
      .on("mouseout", function(data, index) {
        toolTip.hide(data);
      });

    // Create axes labels
    chartGroup.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left + 40)
      .attr("x", 0 - (chartHeight / 2))
      .attr("dy", "1em")
      .attr("class", "axisText")
      .text("Correlations discovered");

    chartGroup.append("text")
      .attr("transform", `translate(${chartWidth / 2}, ${chartHeight + margin.top + 30})`)
      .attr("class", "axisText")
      .text("Healthcare");
  }).catch(function(error) {
    console.log(error);
  });
  function makeResponsive();
    