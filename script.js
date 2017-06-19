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
  .attr('margin-left', marginLeft)
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

  const xScale = d3.scaleLinear()
  .domain([0, data.length])
  .range([0, width])

  const xAxis = d3.axisBottom().scale(xScale).ticks(data.length)
  var yAxis = d3.axisRight().scale(yScale).ticks(d3.max(data));

  svg.selectAll('rect')
  .data(data)
  .enter()
  .append('rect')
  .attr('fill', 'teal')
  .attr('x', (d, i)=>{ return i*17})
  .attr('y', (d, i)=>{ return height - yScale(d)})
  .attr('width', 15)
  .attr('height', (d)=>{return yScale(d)})

  svg.append('g')
  .call(xAxis);
  svg.append('g')
  .call(yAxis);

}

reload()
