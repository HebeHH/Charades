import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Radium, { StyleRoot } from 'radium';
import {
    merge,
    rotateOutUpLeft,
    rotateOutUpRight,
    rotateOutDownLeft,
    slideOutLeft,
    rotateOutDownRight,
    slideOutRight
} from 'react-animations';



// Animation for card leaving on keypress
const leaveLeft = merge(slideOutLeft, rotateOutDownRight);
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


// Get data and randomize, to make the game replayable
var data = require('./words.json');

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

data = [...new Set([...new Set(data)].flat())]
shuffle(data)


// Central card with the current word on it
class Card extends React.Component {

    render() {
        return (
            <StyleRoot className="styleroot">
      <div
      className="wordcard"
      style={this.props.style}
      >
      <div className="word" >
      {this.props.words[this.props.pos]}
      </div>
      </div>
      </StyleRoot>
        );
    }
}


// Past words
class Note extends React.Component {

    render() {
        return (
            <div className="note">
        {this.props.word}
        </div>
        )
    }
}


// Count how many words have been succeeded/failed
class Report extends React.Component {
    render() {
        return (
            <div className="report">
          {this.props.count} words {this.props.name}!
          </div>
        )
    }
}


// Contain the words that have already been completed.
// One each for failed and succeeded words.
// Includes the list of words, and the total count
class Tracker extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            stylem: (this.props.side === "right") ? {
                backgroundColor: this.props.bc,
                paddingLeft: "25%",
                right: 0,
                textAlign: "right"
            } : {
                backgroundColor: this.props.bc,
                paddingRight: "25%",
                left: 0
            },
        };
    };

    render() {
        return (
            <div className="tracker" style={this.state.stylem}>
            <div className="finishedwords">
            {this.props.words.map((word) => {
              return <Note word={word} key={word}></Note>
            })}
            </div>
            <Report name={this.props.name} count={this.props.words.length} />
            </div>
        )
    }
}


// Final report on score
class EndCard extends React.Component {
    render() {
        return (
            <div 
              className="wordcard"
              style={{
                backgroundColor:"black",
                color: "white",
                borderColor: "black"
              }}
              >
              <p>
              You got {this.props.count} points in {this.props.time} seconds.
              </p>
              
              <p>
              That's {Math.round(this.props.count/(this.props.time/60))} words per minute!
              </p>
              
              <button onClick={this.props.onClick}>Restart</button>
              </div>
        )
    }
}


class Game extends React.Component {

    // Central tracking of list of words, position, and current scoring
    // Works by having a list of words, and going through them with an 
    // index 'pos'
    constructor(props) {
        super(props)

        this.state = {
            words: data,
            cardstyle: {},
            resetting: false,
            pos: 0,
            failed: [],
            succeeded: [],
            overflow: false,
            start: new Date().getTime(),
        };
    };

    // End the game when the list of completed words overflow off the screen
    getOverflow() {
        const element = this.element
        if (!element) {
            return false
        }
        return [...element.getElementsByClassName('finishedwords')].some((e) => e.offsetHeight < e.scrollHeight)
    }

    // requestWords(i) {
    //     fetch("https://random-word-api.herokuapp.com/word?number=10")
    //         .then(res => res.json())
    //         .then(
    //             (result) => {
    //                 this.setState({ words: result })
    //             },
    //             (error) => console.log(error));
    // }

    componentDidMount() {
        // this.requestWords(10)
        document.addEventListener("keydown", this.handleKeyPress, false);
    }

    // Increase position in words list
    incPos() {
        this.setState({ pos: this.state.pos + 1 })
    }

    // New game, restart counter.
    // Note that we keep the old `pos` in the list - this is so that we 
    // don't need to reshuffle, or accidentially use old words.
    restart() {
        setTimeout(function() {
            this.setState({ succeeded: [] })
            this.setState({ failed: [] })
            this.render()
        }.bind(this), 0)
    }

    // On user key input, mark word as succeeded or failed
    // and process.
    // Needs a bit of fancy work to handle the buffer overflow thing.
    handleKeyPress = (event) => {
        console.log(event.key)
        console.log(this.resetting)
        console.log(this.getOverflow())
        if (!this.resetting && !this.getOverflow() &&
            (event.keyCode === 37 || event.keyCode === 39)
        ) {
            this.resetting = true
            console.log("yes")

            if (event.keyCode === 37) {
                this.setState({ cardstyle: styles.leaveLeft })
                this.state.failed.push(this.state.words[this.state.pos])
            }
            if (event.keyCode === 39) {
                this.setState({ cardstyle: styles.leaveRight })
                this.state.succeeded.push(this.state.words[this.state.pos])
            }

            setTimeout(function() {
                this.setState({ cardstyle: {} })
                this.incPos()
                this.resetting = false
            }.bind(this), 700);
        }
    }

    // Put it all together
    render() {
        let card;
        if (this.getOverflow()) {
            card = <EndCard count={this.state.succeeded.length} onClick={() => this.restart()} time={(new Date().getTime() - this.state.start)/1000}/>
        }
        if (!this.getOverflow()) {
            card = <Card pos={this.state.pos} words={this.state.words} style={this.state.cardstyle}/>
        }
        console.log(card)
        return (
            <div className="game" ref={(el) => {this.element = el}}>
                  <Tracker bc="#ff0000" name="Failed" words={this.state.failed} side="left"/>
                  {card}
                  <Tracker bc="#72e205" name="Succeeded" words={this.state.succeeded} side="right"/>
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