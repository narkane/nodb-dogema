import React, { Component } from "react";
import axios from "axios";
import Tile from "./Tile.js";
import logo from "./logo.png";
import navlogo from "./nav-logo.png";
import catholic from "./cat-holic.png";
import ringleft from "./ringlef.png";
import HUD from "./hudo.png";
import "./App.css";
import Create from "./Create.js";
//audio imports
import music from "./audio/music.mp3";
import sbuz from "./audio/buzz-s.wav";
import mbuz from "./audio/dbuz-m.wav";
import whip from "./audio/whip-s.wav";
import dink from "./audio/dink-s.wav";
import lwow from "./audio/wow-l.wav";

class App extends Component {
  constructor() {
    super();

    this.state = {
      begin: false,
      cats: [],
      mode: "",
      sDir: ""
    };

    this.getCat = this.getCat.bind(this);
    this.newHand = this.newHand.bind(this);
    this.deleteCat = this.deleteCat.bind(this);
    this.postCat = this.postCat.bind(this);
    this.playA = this.playA.bind(this);
  }

  playA(audio, volume) {
    // var audio = document.getElementById(audio);
    // audio.play();
    //Set the current time for the audio file to the beginning

    //Create the audio tag
    var soundFile = document.createElement("audio");
    soundFile.preload = "auto";

    //Load the sound file (using a source element for expandability)
    var src = document.createElement("source");
    src.src = audio;
    soundFile.appendChild(src);

    //Load the audio tag
    //It auto plays as a fallback
    soundFile.load();
    soundFile.volume = 0.0;
    soundFile.play();
    if (audio == music) {
      soundFile.loop = true;
    }
    soundFile.currentTime = 0.01;
    soundFile.volume = volume;

    //Due to a bug in Firefox, the audio needs to be played after a delay
    setTimeout(function() {
      soundFile.play();
    }, 1);
  }

  showDeck() {
    console.log(this.state.cats);
    return this.state.cats.map(cat => {
      console.log("showdeck a 'new' cat " + cat.id);
      return (
        <Tile
          className="Card"
          cat={cat}
          onClick={catID => this.selectCat(catID)}
          onMouseEnter={catID => this.catScroll(catID)}
          scroll={this.state.sDir}
        />
      );
    });
  }

  selectCat(catID) {
    if (this.state.mode == "purrge") {
      this.deleteCat(catID);
      this.playA(dink, 1);
    } else if (this.state.mode == "mewtate") {
      this.putCat(catID);
      this.playA(lwow, 1);
    }
  }

  //GET
  getCat() {
    axios.get(`/api/cats/1`).then(response => {
      // console.log(typeof response.data);
      this.setState({ cats: response.data });
      console.log("componentDidMount() GET: " + response.data[0]);
    });
  }
  //GET
  newHand(amount) {
    axios.get(`/api/cats/${amount}`).then(response => {
      // console.log(typeof response.data);
      this.setState({ cats: response.data });
      console.log("componentDidMount() GET: " + response.data[0]);
    });
  }
  //DELETE
  deleteCat(catID) {
    console.log(catID);
    this.setState({ cats: [] });
    axios.delete(`/api/cats/${catID}`).then(response => {
      this.setState({ cats: response.data });
      console.log("DELETE: " + this.state.cats);
      // console.log("state: " + this.state.cats[catLocalID].url);
    });
  }
  //PUT
  putCat(catID) {
    this.setState({ cats: [] });
    axios.put(`/api/cats/${catID}`).then(response => {
      this.setState({ cats: response.data });
      console.log("put: " + this.state.cats);
      // console.log("state: " + this.state.cats[catLocalID].url);
    });
    // this.showDeck();
  }
  //POST
  postCat(newCatURL, newCatID) {
    let cat = {
      url: newCatURL,
      id: newCatID,
      atk: "#",
      def: "#"
    };
    axios.post(`/api/cats`, cat).then(response => {
      // console.log(typeof response.data);
      this.setState({ cats: response.data });
      console.log("componentDidMount() GET: " + response.data[0]);
    });
  }

  catScroll(catID) {
    console.log("FSDAGBRGAERGSD");
    let localCID = this.state.cats.findIndex(cat => catID == cat.id);
    if (localCID == 0) {
      console.log(" RIGHT CAT!");
      this.setState({ sDir: "L" });
    } else if (localCID == this.state.cats.length - 1) {
      console.log(" LEFT CAT!");
      this.setState({ sDir: "R" });
    } else {
      console.log(localCID + "CAAAAAAT!");
    }
  }

  componentDidMount() {
    this.newHand(3);
    // new Audio({ music }).play();
  }

  render() {
    if (this.state.begin == false) {
      return (
        <div className="App">
          <header className="App-welcome">
            <img
              onClick={() => {
                this.setState({ begin: true });
                this.playA(music, 1);
              }}
              src={logo}
              className="App-logo"
              alt="logo"
            />
            <br />
            = CAT-HOLIC =
            <br />
            <small>- BATTLE FOR THE SOULS OF THE BLESSED -</small>
          </header>
        </div>
      );
    } else {
      return (
        <div className="App">
          <div className="catholic" />
          <div className="App-battle">
            <img src={HUD} className="HUD" />
            <div className="Nav-bar">
              <div className="Nav-logo" />
              <div className="c-nav">
                <Create
                  postCat={this.postCat}
                  onClick={() => this.playA(sbuz, 1)}
                />

                <div className="button-nav">
                  <button
                    className="select-buttons mewtate"
                    onClick={() => {
                      this.setState({ mode: "mewtate" });
                    }}
                  >
                    <audio id="music" src={music} />
                    <audio id="whip" src={whip} />
                    <audio id="dink" src={dink} />
                    <audio id="sbuz" src={sbuz} />
                    <audio id="mbuz" src={mbuz} />
                    <audio id="lwow" src={lwow} />
                    MEW-tate
                  </button>
                  <button
                    className="catch-button"
                    onClick={() => {
                      this.getCat();
                      this.playA(mbuz, 1);
                    }}
                  >
                    CAT-ch
                  </button>
                  <button
                    className="select-buttons purrge"
                    onClick={() => this.setState({ mode: "purrge" })}
                  >
                    PURR-ge
                  </button>
                </div>
              </div>
              <div className="Nav-logo">{/* <img src={navlogo} /> */}</div>
            </div>
            {/* <div className="spacer" /> */}
            <div className="cat-ring">
              <div className="cat-ring-l" />
              <div className="cat-ring-m" />
              <div className="cat-ring-r" />
            </div>
            <div className="Deck">
              {/* {this.state.cats.map(cat => {
                return this.showDeck(cat);
              })} */
              this.showDeck()}
            </div>
            {/*  */}
          </div>
        </div>
      );
    }
  }
}

export default App;
