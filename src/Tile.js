import React, { Component } from "react";
import "./Tile.css";
import zing from "./images/zing.png";

class Tile extends Component {
  // constructor(props) {
  //   super(props);

  //   this.state = {
  //     cat: props.cat
  //     //localID: props.localID
  //   };
  // }
  render() {
    return (
      <div
        className="tile"
        onClick={() => this.props.onClick(this.props.cat.id)}
        onMouseEnter={() => this.props.onMouseEnter(this.props.cat.id)}
      >
        <img className="zing" src={zing} />
        <div className="pic-area">
          <div className="namebar">Cat of Doom</div>
          <img className="pic" src={this.props.cat.url} />
        </div>
        <div className="info">Monster - Cat</div>
        <div className="text">(O} - Cat of Doom is invincibile</div>
        <div className="quote">
          "meow meow meow mew mew meow meow meow mew" ----- cat
          <div className="power">
            {this.props.cat.atk}/{this.props.cat.def}
          </div>
        </div>
      </div>
    );
  }
}

export default Tile;
