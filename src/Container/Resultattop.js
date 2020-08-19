import React, { Component } from "react";
class Resultattop extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: [],
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (prevState.show.length === 0) {
      console.log("coucou", nextProps.results);
      const tab = [];
      nextProps.results.forEach(() => {
        tab.push(false);
      });
      return { show: tab };
    }
    // return { show: prevState };
  }
  handleshow = (index) => {
    console.log("hedha el index", index);
    const stateCloned = this.state.show.map((el, i) => false);
    console.log("state cloned", stateCloned);
    // stateCloned = stateCloned.map((el, i) => false);

    stateCloned[index] = !this.state.show[index];
    console.log("hedha el state cloned", stateCloned);
    this.setState({ show: stateCloned }, () => {
      console.log("el show chnowa feha ", this.state.show);
    });
  };
  render() {
    console.log("the state", this.state.show);
    console.log("hedhou el chabeb", this.state.show);
    return (
      <div className="litlemlkol">
        {this.props.results.map((result, index) => {
          return (
            <div key={index} className="resultContainer">
              <div className="imageContainer">
                <img
                  className="imageimage"
                  src={`http://localhost:5000/${result.images[0].images.substring(
                    16
                  )}`}
                  alt="product"
                />
              </div>
              <div className="infoConatiner">
                <span>Title : {result.titre}</span>
                <span>Price : {result.prix} MAD</span>
              </div>
              {this.state.show[index] && (
                <div className="infoDetails">
                  <span>Categorie : {result.categorie}</span>
                  <span>Sub categorie : {result.sous_categorie}</span>
                  <span>Seller name : {result.nomVendeur}</span>
                  <span>Seller number : {result.numeroVendeur}</span>
                  <span>Seller type : {result.typeVendeur}</span>
                  <span>Views : {result.nbVues}</span>
                  <span>Messages : {result.nbMessages}</span>
                </div>
              )}
              <button
                className="btn btn-primary"
                onClick={() => this.handleshow(index)}
              >
                {this.state.show[index] ? "Less" : "More"}
              </button>
            </div>
          );
        })}
      </div>
    );
  }
}

export default Resultattop;
