import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// class CartridgeShell extends React.Component {

//    // Similar to componentDidMount and componentDidUpdate:
// //   useEffect(() => {
// //    // Update the document title using the browser API
// //    document.addEventListener("keydown", () => alert('hi'), false);
// //    // document.title = `You clicked ${count} times`;
// //    // alert(`You clicked ${count} times`)
// //  });


 

//   constructor(props) {
//      super(props);
//      this.state = {value:''}

//   };

//   handleClick(e) {
//      console.log(e)
//      if (e.keyCode === 13) {
//         console.log("enter")
//      }
//   }

//   componentDidMount() {
//    document.addEventListener("keydown", this.handleClick, false);
//  }


//   render(){
//      return(
//         <input value={this.state.value} onKeyDown={this.keyPress} onChange={this.handleChange} fullWidth={true} />
//      )
//    }
// }

// ReactDOM.render(<CartridgeShell/>, document.getElementById('root'))

import Radium, {StyleRoot} from 'radium';
import { merge, rotateOutDownLeft, slideOutLeft,rotateOutDownRight, slideOutRight } from 'react-animations';
const leaveLeft = merge(rotateOutDownLeft, slideOutLeft);
const leaveRight = merge(rotateOutDownRight, slideOutRight);

const styles = {
   leaveLeft: {
     animation: 'x 3s',
     animationName: Radium.keyframes(leaveLeft, 'leaveLeft')
   },
   leaveRight: {
     animation: 'x 3s',
     animationName: Radium.keyframes(leaveRight, 'leaveRight')
   }
}


function Square(props) {

  return (
    <button className="square" onClick={() =>  props.onClick() } >
      {props.value}
    </button>
  );
  
}

class Board extends React.Component {


  constructor(props) {
    super(props)
  
    this.state = {
      squares: Array(9).fill(null),
      xIsNext: true,
      style:{},
      resetting:false,
    };
  };

  handleClick(i) {
    const squares = this.state.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({squares: squares,
      xIsNext: !this.state.xIsNext});
  }

  renderSquare(i) {
    return <Square value={this.state.squares[i]} onClick={() => this.handleClick(i)}/>;
  }

  componentDidMount() {
   document.addEventListener("keydown", this.handleKeyPress, false);
 }

  handleKeyPress = (event) => {
    console.log('key')
    if(event.keyCode === 37){
      console.log('enter')
      this.setState({style:styles.leaveLeft})
    }
    if(event.keyCode === 39){
      console.log('enter')
      this.setState({style:styles.leaveRight})
    }
   if (!this.resetting) {
      this.resetting = true
      setTimeout(function() {
         console.log("reset attempt")
         this.setState({style:{}})
         this.resetting = false
      }.bind(this), 1500);
   }
   
  }
  render() {
    
    const winner = calculateWinner(this.state.squares);
    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    return (
      <div>
        <input type="text" id="one" onKeyDown={this.handleKeyPress} />
     </div>,
      <StyleRoot>
      <div  >
        <div 
        className="status" 
        style={this.state.style}
        onKeyDown={() => this.handleKeyPress}
        >{status}</div>
        <div className="board-row" style={{}}>
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
      </StyleRoot>
    );
  }
}

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}


// ========================================

ReactDOM.render(
  <Game />,
  // <Test />,
  document.getElementById('root')
);

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}