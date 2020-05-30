import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Radium, { StyleRoot } from 'radium';
import {
  merge, rotateOutUpLeft, rotateOutUpRight,
  rotateOutDownLeft, slideOutLeft, rotateOutDownRight, slideOutRight
} from 'react-animations';
const leaveLeft = merge(slideOutLeft, rotateOutDownRight);
// const leaveRight = merge(slideOutRight, rotateOutDownRight);
const leaveRight = merge(slideOutRight, rotateOutDownLeft);

const styles = {
  leaveLeft: {
    animation: 'x 1s',
    animationName: Radium.keyframes(leaveLeft, 'leaveLeft')
  },
  leaveRight: {
    animation: 'x 1s',
    animationName: Radium.keyframes(leaveRight, 'leaveRight')
  }
}


class Card extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      words: ["Hello", "World"],
      style: {},
      resetting: false,
      pos: 0
    };
  };

  handleClick(i) {
  }

  requestWords(i) {
    fetch("https://random-word-api.herokuapp.com/word?number=10")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({ words: result })
        },
        (error) => console.log(error));
  }

  componentDidMount() {
    this.requestWords(10)
    document.addEventListener("keydown", this.handleKeyPress, false);
  }

  incPos() {
    if (this.state.pos === 9) {
      this.setState({ pos: 0 })
    } else {
      this.setState({ pos: this.state.pos + 1 })
    }
  }

  handleKeyPress = (event) => {
    console.log('key')
    if (!this.resetting) {
      this.resetting = true

      if (this.state.pos > 8) {
        this.requestWords(10)
      }

      if (event.keyCode === 37) {
        this.setState({ style: styles.leaveLeft })
      }
      if (event.keyCode === 39) {
        this.setState({ style: styles.leaveRight })
      }

      if (event.keyCode === 37 || event.keyCode === 39) {
        setTimeout(function () {
          this.setState({ style: {} })
          console.log(this.state.pos)
          this.incPos()
          this.resetting = false
        }.bind(this), 700);
      }
    }
  }

  render() {
    // console.log(this.state.words)
    return (
      <StyleRoot className="styleroot">
        <div
          className="wordcard"
          style={this.state.style}
          onKeyDown={() => this.handleKeyPress}
        >
          <div className="word" >
            {this.state.words[this.state.pos]}
          </div>
        </div>
      </StyleRoot>
    );
  }
}

class Note extends React.Component {

  render() {
    return (
      <div className="note">
        {this.props.word}
      </div>
    )
  }
}

class Tracker extends React.Component {
  constructor(props) {
    super(props)
  
    this.state = {
       count:0,
    };
  };
  
  render() {
    return ("hi")
  }
}

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="tmp"></div>

        <Card />
        <div className="tmp"></div>
      </div>
    );
  }
}


// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
