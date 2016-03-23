import d3 from 'd3'
import React from 'react'

var planets = [
  { name: 'Moon',
    radius: '1737',
    color: 'grey'
  },
  { name: 'Mercury',
    radius: '2440',
    color: '#444'
  }
]

var width = 1200,
    height = 500

var x = d3.scale.linear()
  .domain([0, 1])
  .range([0, width])

var y = d3.scale.linear()
  .domain([0, 1])
  .range([150, height - 150])

var r = d3.scale.sqrt()
  .domain([0, 1])
  .range([0, 30])

var SVG_STYLE = {
  border: '1px solid black'
}
export default class Maddie extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      items: []
    }

    const MAX_LENGTH = 5
    this.addData = () => {
      let newItems = [{key: Date.now(), x: Math.random(), y: Math.random(), r: Math.random()}, ...this.state.items]
      if (newItems.length > MAX_LENGTH) {
        newItems = []
      }
      this.setState({
        items: newItems
      })
    }
  }

  render() {
    return (
      <div>
        {/* <a href="#" onClick={this.addData}>Click here</a>*/}
        <svg
            style={SVG_STYLE}
        onClick={this.addData} width={width} height={height} ref={ c => this.chart = c}/>
      </div>

        )

  }

  componentDidUpdate() {
    var item = d3.select(this.chart).selectAll('circle')
      .data(this.state.items, function(d) { return d.key })

    item.enter().append('circle')
      .attr('class', 'item')
      .attr('r', function(d) { return r(d.r) })
      .attr('cx', function(d) { return x(d.x) })
      .attr('cy', 0)
      .style('fill', function() {
          return 'hsl(' + Math.random() * 360 + ',100%,50%)'
        })
      // .style('stroke', '#3E6E9C')
      .on('click', () => console.log('caught me'))
    .transition().duration(1000)
      .attr('cy', function(d) { return y(d.y) })
      // .style('stroke', '#81E797')

    item.exit().filter(':not(.exiting)') // Don't select already exiting nodes
      .classed('exiting', true)
    .transition().duration(1000).ease('bounce')
      .attr('cx', function() {
          return x(Math.random())
      })
      .attr('cy', () => Math.random() > 0.5 ? height : 0 )
      // .style('stroke', 'red')
      .style('fill', 'black')
      .remove()
  }
}
