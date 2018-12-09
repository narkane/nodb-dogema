import React, { Component } from "react";
import "./Create.css";

class Create extends Component {
  constructor(props) {
    super(props);

    this.state = {
      newCatURL: "",
      newCatID: ""
    };
  }
  render() {
    return (
      <div className="create">
        <div className="c-text">
          Url:
          <br />
          Id:
        </div>
        <div className="c-area">
          <input
            placeholder="https://vetstreet.brightspotcdn.com/dims4/default/0f42b23/2147483647/crop/0x0%2B0%2B0/resize/645x380/quality/90/?url=https%3A%2F%2Fvetstreet-brightspot.s3.amazonaws.com%2F05%2Fae6220a81c11e0a0d50050568d634f%2Ffile%2FShiba-Inu-5-645mk070111.jpg"
            onChange={e => {
              this.setState({
                newCatURL: e.target.value
              });
            }}
          />
          <input
            placeholder="xxx"
            onChange={e => {
              this.setState({
                newCatID: e.target.value
              });
            }}
          />
        </div>
        <button
          className="c-button"
          onClick={() => {
            this.props.postCat(this.state.newCatURL, this.state.newCatID);
            this.props.onClick();
          }}
        >
          Create
        </button>
      </div>
    );
  }
}

export default Create;
