import React, { Component } from "react";
import axios from "axios";
import { CSVLink } from "react-csv";
import back from "../assets/images/back.png";
import Resultatcom from "./Resultatcom";
const websites = ["", "Etam", "LcWaikiki"];
const headers = [
  { label: "Titre            ", key: "titre" },
  { label: "Prix", key: "prix" },
];
class Competitors extends Component {
  constructor() {
    super();
    this.state = {
      produits: [],
      website: "",
      searchitem: "",
      show: false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onChangeWebsite = this.onChangeWebsite.bind(this);
    this.onChangeSearchitem = this.onChangeSearchitem.bind(this);
    this.onChangeProduits = this.onChangeProduits.bind(this);
  }
  handleSubmit(event) {
    event.preventDefault();
    axios
      .get(
        `http://localhost:5000/${this.state.website}/${this.state.searchitem}`
      )
      .then((response) => {
        this.setState({ produits: response.data });
        console.log("resultat", this.state.produits);
      })
      .catch((error) => console.log("erreur :", error));
    this.setState({ show: true });
  }

  onChangeWebsite(event) {
    this.setState({
      website: event.target.value,
    });
  }
  onChangeProduits(event) {
    this.setState({
      produits: event.target.value,
    });
  }
  onChangeSearchitem(event) {
    this.setState({
      searchitem: event.target.value,
    });
  }

  render() {
    return (
      <div className="formCom">
        {!this.state.show && (
          <form className="form2" onSubmit={this.handleSubmit}>
            <div className="form-group">
              <span className="label">Web Site </span>
              <select
                placeholder="Choose the website to scrape"
                className="limit"
                value={this.state.website}
                onChange={this.onChangeWebsite}
              >
                {websites.map((website, index) => {
                  return (
                    <option key={index} value={website}>
                      {website}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="form-group">
              <span className="label">Searching for </span>
              <input
                className="limit"
                type="text"
                name="searchitem"
                value={this.state.keyword}
                onChange={this.onChangeSearchitem}
                required
              />
            </div>
            <div className="showallBouton">
              <button type="submit" className="Boutonshowall">
                <span className="showallboutontext">Search</span>
              </button>
            </div>
          </form>
        )}
        {this.state.show && (
          <div className="daberassekk">
            <div>
              <button
                className="boutonIcon"
                onClick={() => this.setState({ show: false })}
              >
                <img src={back} alt="logo" className="logouticon"></img>
                <CSVLink
                  data={this.state.produits}
                  headers={headers}
                  separator={"    "}
                >
                  Export to csv
                </CSVLink>
              </button>
            </div>
            <Resultatcom results={this.state.produits}></Resultatcom>
          </div>
        )}
      </div>
    );
  }
}

export default Competitors;
