import d3 from 'd3'
import React from 'react'

const R = 695.7

var planets = [
  {
    name: 'The Moon',
    radius: 1.737,
    color: 'grey'
  },
]
// pollux, arcturus(red giant), Aldebaran (red giant), Rigel (Blue Supergiant), Pistol Star (Blue Hypergiant)
// Antares A (Red Supergiant), Mu Cephei  (red supergiant), VY Canis Majoris (Red Hypergiant)

var extraPlanets = [
  {
    name: 'Mercury',
    radius: 2.440,
    color: 'rebeccapurple'
  },
  {
    name: 'Venus',
    radius: 6.052,
    color: 'rgba(226, 60, 170, 1)'
  },
  {
    name: 'Earth (Home)',
    radius: 6.371,
    color: 'blue'
  },
  {
    name: 'Mars',
    radius: 3.390,
    color: '#B52305'
  },
  {
    name: 'Neptune',
    radius: 24.764,
    color: '#456BFC'
  },
  {
    name: 'Saturn',
    radius: 60.268,
    color: '#BCAF81'
  },
  {
    name: 'Jupiter',
    radius: 69.911,
    color: '#F28211'
  },
  {
    name: 'Sun',
    radius: 696.300,
    color: 'rgba(247, 251, 35, 1)',
    textColor: 'black'
  },

  {
    name: 'Sirius A',
    radius: 1.711 * R,
    color: '#eeeeff',
    textColor: 'black'
  }
]

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
          .range([0, height])

var xPlanets = d3.scale.linear()
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
      planets: planets,
      extraPlanets,
      growing: true
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

    this.addPlanet = () => {
      if (this.state.growing === true) {
        if (this.state.extraPlanets[0]) {
        this.setState({
          planets: [...this.state.planets, this.state.extraPlanets[0] ],
          extraPlanets: this.state.extraPlanets.slice(1),
        })
      }
      }
      else {
        var newExtraPlanets = [...this.state.extraPlanets, this.state.planets[this.state.planets.length - 1]]
        var newPlanets = this.state.planets.slice(0, this.state.planets.length - 1)
        this.setState({
          planets: this.state.planets.slice(0, this.state.planets.length - 1),
          extraPlanets: newExtraPlanets,
        })
      }



    }
  }
  planetStart(currentIndex) {
    return this.state.planets.reduce( (acc, planet, i) => {
        if (currentIndex >= i ) {
          return acc
        } else {
          return acc + planet.radius * 2
        }
      }
    , 0 ) + this.state.planets[currentIndex].radius
  }
  render() {

    return (
      <div>
        <div style={{color: 'white',
                     fontSize: '2em'}}>
          {this.state.planets[this.state.planets.length - 1].name}
        </div>
        <svg style={SVG_STYLE} onClick={this.addPlanet} onTouchEnd={this.addPlanet} width={width} height={height} ref={c => this.chart = c}>
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
    this.d3render()
  }

  d3render() {

    var item = d3.select(this.chart).selectAll('.stars')
      .data(this.state.items, function(d) { return d.key })
    //
    // item.enter().append('circle')
    //   .attr('class', 'item')
    //   .attr('class', 'stars')
    //   .attr('r', function(d) { return r(d.r) })
    //   .attr('cx', function(d) { return x(d.x) })
    //   .attr('cy', 0)
    //   .style('fill', function() {
    //       return 'hsl(' + Math.random() * 360 + ',100%,50%)'
    //     })
    //   .on('click', () => console.log('caught me'))
    // .transition().duration(1000)
    //   .attr('cy', function(d) { return y(d.y) })
    //
    // item.exit().filter(':not(.exiting)') // Don't select already exiting nodes
    //   .classed('exiting', true)
    // .transition().duration(1000).ease('bounce')
    //   .attr('cy', height)
    //   .style('opacity', 0.3)
    //   .remove()


      var totalLength = this.state.planets.reduce( (acc, planet) => acc + planet.radius * 2, 0)

      rPlanets.domain([0, d3.max(this.state.planets, planet => planet.radius * 2 )])
      xPlanets.domain([0, totalLength])

      var planet = d3.select(this.chart).selectAll('.planet')
                    .data(this.state.planets, p => p.name )

    var ent =  planet.enter()
              .append('g')
              .attr('transform', (planet, index) => {
                // Set d.x and d.y here so that other elements can use it. d is
                // expected to be an object here.
                planet.x = width - xPlanets(this.planetStart(index))
                return 'translate(' + planet.x + ',' + 0 + ')'
              })
              .attr('class', 'planet')

    ent.append('circle')
    ent.append('text')



      planet
      .transition().duration(800)
      .attr('transform', (planet, index) => {
        // Set d.x and d.y here so that other elements can use it. d is
        // expected to be an object here.
        planet.x = width - xPlanets(this.planetStart(index))
        planet.y = height - 20 - xPlanets(planet.radius)
        return 'translate(' + planet.x + ',' + planet.y + ')'
      })
      .selectAll('circle')
            .attr({
            fill: planet => planet.color,
            r: planet => xPlanets(planet.radius),
            // cy: planet => height - 20 - xPlanets(planet.radius),
            // cx: (planet, index) => width - xPlanets(this.planetStart(index))
          })

      planet
      .selectAll('text')
        .attr('class', 'planet-desc')
        .attr('text-anchor', 'middle')
        .style('fill', planet => planet.textColor)
        .text( planet => planet.name )

      planet.exit().transition().duration(500).ease('bounce')
              .style('opacity', 0.1)
              .remove()

      // var planetText = d3.select(this.chart).selectAll('.planet-text')
      //                   .data(this.state.planets, p => p.name )
      //
      //  planetText.enter().append('text')
      //           .attr('.planet-text')
      //
      // planetText.transition().duration(800).attr({
      //             fill: 'white',
      //             cy: planet => height - 20 - xPlanets(planet.radius),
      //             cx: (planet, index) => width - xPlanets(this.planetStart(index))
      //           })
      //
       d3.select(this.chart).select('.x.axis')
                .transition().duration(500)
                .call(xAxisPlanets)

  }
  componentDidUpdate() {
    this.d3render()
  }
}
