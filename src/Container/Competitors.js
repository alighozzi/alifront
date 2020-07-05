import React, { Component } from "react";
import axios from "axios";
import { CSVLink } from "react-csv";
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
        console.log(this.state.produits);
      })
      .catch((error) => console.log("erreur :", error));
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
      <div>
        <div className="containerr">
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label>Web Site :</label>
              <select
                className="form-control"
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
              <label>searching for :</label>
              <input
                className="form-control"
                type="text"
                name="searchitem"
                value={this.state.keyword}
                onChange={this.onChangeSearchitem}
                required
              />
            </div>
            <div className="form-group">
              <button type="submit" className="btn btn-primary">
                search{" "}
              </button>
            </div>
            <CSVLink
              data={this.state.produits}
              headers={headers}
              separator={"    "}
            >
              Export to csv
            </CSVLink>
          </form>
        </div>
      </div>
    );
  }
}

export default Competitors;
