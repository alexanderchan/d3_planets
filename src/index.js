import React from 'react'
import ReactDOM from 'react-dom'
// import App from './app'
import Maddie from './Maddie'
import './style.scss'
// ReactDom.render(
//   <App />,
//   document.getElementById('app')
// )
//
var data = [getRandomData(), getRandomData(), getRandomData()]
function render() {
  ReactDOM.render(
    React.createElement(Maddie, {items: data}),
    document.getElementById('app')
  )
}

function getRandomData() {
  return {key: Date.now(), x: Math.random(), y: Math.random(), r: Math.random()}
}
render()

// var circlesCreated = 0;
//
 function add() {
  // data = [...data, getRandomData(), getRandomData(), getRandomData(), getRandomData()]

  render()
//   setTimeout(data.length < 100 ? add : remove, 5);
}
//
// add()
// add()
//
// function remove() {
//   data = data.slice(1);
//   render();
//   if (++circlesCreated === 1000) console.timeEnd('1000 circles');
//   setTimeout(data.length > 0 ? remove : add, 5);
// }
//
// console.time('1000 circles');
// add();
