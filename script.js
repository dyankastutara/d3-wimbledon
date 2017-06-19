/* global d3 */

// Our canvas
const width = 750,
height = 300,
margin = 20,
marginLeft = 40

// Drawing area

let svg = d3.select('#results')
.append('svg')
.attr('width', width)
.attr('height', height)
// Data reloading
let reload = () => {
  // Your data parsing here..
  d3.tsv("afcw-results.tsv", function(error, data){
    if(error) console.log(error);

    var arrGoal = []
    data.map(function(d){
      d.GoalsScored = +d.GoalsScored
      arrGoal.push(d.GoalsScored)
    })
    redraw(arrGoal)
  })

}

// redraw function
let redraw = (data) => {
  // Your data to graph here
  console.log(data);

  const yScale = d3.scaleLinear()
  .domain([0, d3.max(data)])
  .range([0, height])

  const colorScale = d3.scaleLinear()
    .domain([0, d3.max(data)])
    .range(['peru', 'teal'])

  var xscale = d3.scaleLinear()
  .domain([0, data.length])
  .range([0, width - 100]);

  var yscale = d3.scaleLinear()
  .domain([0, d3.max(data)])
  .range([height, 0]);

  var x_axis = d3.axisBottom()
  .scale(xscale);

  var y_axis = d3.axisLeft()
  .scale(yscale);

  svg.append("g")
  .attr("transform", "translate(50, 10)")
  .call(y_axis);

  svg.append("g")
  .attr("transform", "translate(50,0)")
  .call(x_axis)

  svg.selectAll('rect')
  .data(data)
  .enter()
  .append('rect')
  .attr('fill', 'teal')
  .attr("transform", "translate(50, 10)")

  .attr('x', (d, i)=>{ return i*14})
  .attr('y', (d, i)=>{ return height - yScale(d)})
  .attr('width', 13)
  .attr('height', (d)=>{return yScale(d)})
  .on('mouseover', function (d, index) {
    d3.select(this).style('fill', '#000000')
  })
  .on('mouseout', function (d, index) {
    d3.select(this).style('fill', 'teal')
  })

}

reload()
