import d3 from 'd3'
import React from 'react'

const R = 695.7

var planets = [
  {
    name: 'Moon',
    radius: 1.737,
    color: 'grey'
  },
  {
    name: 'Mercury',
    radius: 2.440,
    color: 'rebeccapurple'
  },
  {
    name: 'Earth',
    radius: 6.371,
    color: 'blue'
  },
  {
    name: 'Mars',
    radius: 3.390,
    color: '#B52305'
  },
  {
    name: 'Venus',
    radius: 6.052,
    color: 'rgba(226, 60, 170, 1)'
  },
  {
    name: 'Neptune',
    radius: 24.764,
    color: '#456BFC'
  },
  // {
  //   name: 'Jupiter',
  //   radius: 69.911,
  //   color: '#F28211'
  // },

  // {
  //   name: 'Sun',
  //   radius: 696.300,
  //   color: 'rgba(247, 251, 35, 1)'
  // },
  // {
  //   name: 'Sirius A',
  //   radius: 1.711 * R,
  //   color: '#eeeeff',
  // }
]
// Neptune, saturn, jupiter, sun, sirius a, pollux, arcturus(red giant), Aldebaran (red giant), Rigel (Blue Supergiant), Pistol Star (Blue Hypergiant)
// Antares A (Red Supergiant), Mu Cephei  (red supergiant), VY Canis Majoris (Red Hypergiant)
var totalLength = planets.reduce( (acc, planet) => acc + planet.radius * 2, 0)

var width = 1200
var height = 700

var x = d3.scale.linear()
  .domain([0, 1])
  .range([0, width])

var y = d3.scale.linear()
  .domain([0, 1])
  .range([150, height - 150])

var r = d3.scale.sqrt()
  .domain([0, 1])
  .range([0, 30])


var rPlanets = d3.scale.linear()
          .domain([0, d3.max(planets, planet => planet.radius * 2 )])
          .range([0, height])

var xPlanets = d3.scale.linear()
                .domain([0, totalLength])
                .range([0, width])

var xAxisPlanets = d3.svg.axis()
                  .orient('bottom')
                  .scale(xPlanets)

var SVG_STYLE = {
  border: '1px solid black'
}
export default class Maddie extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      items: [],
      planets: planets
    }

    const MAX_LENGTH = 30
    this.addData = () => {
      let newItems = [{key: Date.now(), x: Math.random(), y: Math.random(), r: Math.random()}, ...this.state.items]
      if (newItems.length > MAX_LENGTH) {
        newItems = newItems.slice(0, MAX_LENGTH / 2)
      }
      this.setState({
        items: newItems
      })
    }
  }
  planetStart(currentIndex) {
    return planets.reduce( (acc, planet, i) => {
        if (currentIndex >= i ) {
          return acc
        } else {
          return acc + planet.radius * 2
        }
      }
    , 0 ) + planets[currentIndex].radius
  }
  render() {

    return (
      <div>
        <svg style={SVG_STYLE} onClick={this.addData} width={width} height={height} ref={c => this.chart = c}>

          {/* <circle className="item" fill={planets[0].color} r={xPlanets(planets[0].radius)} cx={xPlanets(planets[0].radius)} cy={height - xPlanets(planets[0].radius)}/>
          <circle className="item" fill={planets[1].color} r={xPlanets(planets[1].radius)} cx={xPlanets(planets[0].radius * 2 + planets[1].radius)} cy={height - xPlanets(planets[1].radius)}/>
          <circle className="item" fill={planets[2].color} r={xPlanets(planets[2].radius)} cx={xPlanets(planets[0].radius * 2 + planets[1].radius * 2 + planets[2].radius)} cy={height - xPlanets(planets[2].radius)}/>*/}

        </svg>

      </div>

        )

  }

  alwaysAdd = () => {

    setTimeout(() => {
      this.addData()
      this.alwaysAdd()
    }, 30)
  }
  componentDidMount() {
    d3.select(this.chart).append('g')
    .attr('class', 'x axis')
    .attr('transform', 'translate(0,' + (height - 20) + ')')


    // this.alwaysAdd()
    this.d3render();
  }

  d3render() {

    var item = d3.select(this.chart).selectAll('.stars')
      .data(this.state.items, function(d) { return d.key })

    item.enter().append('circle')
      .attr('class', 'item')
      .attr('class', 'stars')
      .attr('r', function(d) { return r(d.r) })
      .attr('cx', function(d) { return x(d.x) })
      .attr('cy', 0)
      .style('fill', function() {
          return 'hsl(' + Math.random() * 360 + ',100%,50%)'
        })
      .on('click', () => console.log('caught me'))
    .transition().duration(1000)
      .attr('cy', function(d) { return y(d.y) })

    item.exit().filter(':not(.exiting)') // Don't select already exiting nodes
      .classed('exiting', true)
    .transition().duration(1000).ease('bounce')
      .attr('cy', height)
      .style('opacity', 0.3)
      .remove()

      var planet = d3.select(this.chart).selectAll('.planet')
                    .data(this.state.planets, p => p.name )

      planet.enter().append('circle')
              .attr('class', 'planet')

              // fill={planet.color}
              // r={xPlanets(planet.radius)}
              // cy={height - xPlanets(planet.radius)}
              // cx={width-xPlanets(this.planetStart(index))}
      planet.attr({
        fill: planet => planet.color,
        r: planet => xPlanets(planet.radius),
        cy: planet => height - 20 - xPlanets(planet.radius),
        cx: (planet, index) => width - xPlanets(this.planetStart(index))
      })

      planet.exit().transition().duration(500).ease('bounce')
              .style('opacity', 0.1)
              .remove()

       d3.select(this.chart).select('.x.axis')
                .transition().duration(500)
                .call(xAxisPlanets)

  }
  componentDidUpdate() {
    this.d3render();
  }
}
