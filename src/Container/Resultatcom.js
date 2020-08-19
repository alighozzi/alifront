import React, { Component } from "react";
class Resultatcom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
    };
  }

  render() {
    return (
      <div className="litlemlkol">
        {this.props.results.map((result, index) => {
          return (
            <div key={index} className="resultContainerCom">
              <div className="imageContainerCom">
                <img
                  className="imageContainerComImg"
                  src={result.image_src}
                  alt="product"
                />
              </div>
              <div className="infoConatinerCom">
                <span> Title : {result.titre}</span>
                <span>Price : {result.prix}</span>

                <a href={result.link}>Link</a>
              </div>
            </div>
          );
        })}
        {/* {this.props.results.length !== 0 && (
          <div className="resultContainerCom">
            <div className="imageContainerCom">
              <img
                className="imageContainerComImg"
                src={this.props.results[0].image_src}
                alt="product"
              />
            </div>
            <div className="infoConatinerCom">
              <span> Title : {this.props.results[0].titre}</span>
              <span>Price : {this.props.results[0].prix}</span>

              <a href={this.props.results[0].link}>Link</a>
            </div>
          </div>
        )} */}
      </div>
    );
  }
}

export default Resultatcom;
