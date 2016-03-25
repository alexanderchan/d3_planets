import d3 from 'd3'
import React from 'react'

require('./Maddie Wan Wan.m4a')
require('./blahblah.m4a')

const R = 695.7

var planets = [
  {
    name: 'The Moon',
    radius: 1.737,
    color: 'grey'
  },
]

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
    radius: R,
    color: 'rgba(247, 251, 35, 1)',
    textColor: 'black'
  },

  {
    name: 'Sirius A',
    radius: 1.711 * R,
    color: '#eeeeff',
    textColor: 'black'
  },
  {
    name: 'Pollux',
    radius: 8.8 * R,
    color: '#FFA349'
  },
  {
    name: 'Arcturus (Orange Giant)',
    radius: 25.4 * R,
    color: '#DFE1E3',
    textColor: 'black'
  },
  {
    name: 'Aldebaran (Orange Giant)',
    radius: 44.2 * R,
    color: '#FD3200',
  },
  {
    name: 'Rigel (Blue Supergiant)',
    radius: 78 * R,
    color: '#89D5F0'
  },
  {
    name: 'Pistol Star (Blue Hypergiant)',
    radius: 306 * R,
    color: '#39DBF2'
  },
  {
    name: 'Antares A (Red Supergiant)',
    radius: 883 * R,
    color: '#FEAF39'
  },
  // {
  //   name: 'Mu Cephei  (red supergiant)',
  //   radius: 1000 * R,
  //   color: '#BA0000'
  // },
  {
    name: 'VY Canis Majoris (Red Hypergiant)',
    radius: 1420 * R,
    color: '#F4E4CB',
    textColor: 'black'
  },
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

    this.globalOnKeyDown = (event) => {
      switch (event.code) {
        case 'ArrowLeft':
          this.addPlanet()
          break
        case 'ArrowRight':
            this.addPlanet()
            break
        default:
          return
      }
    }

    }

    this.addPlanet = () => {
      if (this.state.growing === true) {
        if (this.state.extraPlanets[0]) {
        this.setState({
          planets: [...this.state.planets, this.state.extraPlanets[0] ],
          extraPlanets: this.state.extraPlanets.slice(1),
        })

        // if (this.state.planets.length % 2 == 0) {
        //   this.elliott.pause()
        //   this.audio.play()
        // } else {
        //   this.audio.pause()
        //   this.elliott.play()
        // }

      }
    }
    if (this.state.extraPlanets.length === 0) {
      this.setState({
        planets: planets,
        extraPlanets: extraPlanets
      })
    }

      // else {
      //   var newExtraPlanets = [...this.state.extraPlanets, this.state.planets[this.state.planets.length - 1]]
      //   var newPlanets = this.state.planets.slice(0, this.state.planets.length - 1)
      //   this.setState({
      //     planets: this.state.planets.slice(0, this.state.planets.length - 1),
      //     extraPlanets: newExtraPlanets,
      //   })
      // }



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
      <div className="content">
        <audio ref={audio => this.audio = audio}>
          <source src="./src/Maddie Wan Wan.m4a" type="audio/mpeg"/>
        </audio>
        <audio ref={elliott => this.elliott = elliott}>
          <source src="./src/blahblah.m4a" type="audio/mpeg"/>
        </audio>
        <div style={{color: 'white',
        fontSize: '2em'}}>
        Does size end? Click to see how big some stars and planets are...
        </div>
        <svg style={SVG_STYLE} onClick={this.addPlanet} width={width} height={height} ref={c => this.chart = c}>
        </svg>
        <div>Based on <a href="https://www.youtube.com/watch?v=b-OHs70hZsM">this youtube vid</a> and some data from Wikipedia</div>
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

    window.addEventListener('keydown', this.globalOnKeyDown, true)
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.globalOnKeyDown)
  }

  d3render() {

    // var item = d3.select(this.chart).selectAll('.stars')
    //   .data(this.state.items, function(d) { return d.key })
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

    var ent = planet.enter()
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
      .attr({fill: planet => planet.color})
      .transition().duration(700).ease('bounce')
      .attr('transform', (planet, index) => {
        // Set d.x and d.y here so that other elements can use it. d is
        // expected to be an object here.
        planet.x = width - xPlanets(this.planetStart(index))
        planet.y = height - 20 - xPlanets(planet.radius)
        return 'translate(' + planet.x + ',' + planet.y + ')'
      })
      .selectAll('circle')
            .attr({

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
       d3.select(this.chart).filter(':not(.exiting)').select('.x.axis')
                .transition().duration(500)
                .call(xAxisPlanets)

  }
  componentDidUpdate() {
    this.d3render()
  }
}
