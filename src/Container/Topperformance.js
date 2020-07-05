import React, { Component } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { CSVLink } from "react-csv";

import axios from "axios";
const headers = [
  { label: "Prix", key: "prix" },
  { label: "SubCategorie", key: "titre" },
];
const subcategorie = {
  multimedia: [
    "telephone",
    "tablette",
    "ordinateur",
    "television",
    "son, photo & image",
    "jeux video",
    "accessoire et gadget",
    "reseau",
  ],
  vehicule: ["voiture", "moto", "velo", "bateau", "accessoire pour vehicule"],
  homme: [
    "haut",
    "pontalon",
    "costume",
    "chaussure",
    "sac",
    "manteau",
    "sous vetement",
    "accessoire",
  ],

  femme: [
    "haut",
    "pontalon",
    "costume",
    "chaussure",
    "sac",
    "manteau",
    "sous vetement",
    "accessoire",
  ],
  maison: [
    "chanbre a coucher",
    "salon",
    "cuisine",
    "salle de bain",
    "espace exterieur",
    "bagagerie",
    "animalerie",
    "bricolage",
  ],
  beaute: [
    "maquillage",
    "parfum",
    "cheveux",
    "corps et douche",
    "peau",
    "accessoire",
  ],
  enfant: [
    "equipement bebe",
    "vetement garcon",
    "vetement fille",
    "jouet",
    "accessoire",
  ],
  loisir: [
    "sport",
    "livre DVD magasine",
    "instrument de musique",
    "billet et ticket",
  ],
};
const categorie = [
  "",
  "multimedia",
  "vehicule",
  "homme",
  "femme",
  "maison",
  "beaute",
  "enfant",
  "loisir",
];
class Topperformance extends Component {
  constructor() {
    super();
    this.state = {
      produits: [],
      startDate: "",
      endDate: "",
      selon: "nbVues",
      categorie: "",
      subcategorie: "",
      nbafficher: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onChangestartDate = this.onChangestartDate.bind(this);
    this.onChangeProduits = this.onChangeProduits.bind(this);
    this.onChangeendDate = this.onChangeendDate.bind(this);
    this.onChangeCategorie = this.onChangeCategorie.bind(this);
    this.onChangeSubCategorie = this.onChangeSubCategorie.bind(this);
    this.onchangecheck = this.onchangecheck.bind(this);
    this.onchangeNbafficher = this.onchangeNbafficher.bind(this);
  }
  onChangestartDate(date) {
    this.setState({
      startDate: date,
    });
  }
  onChangeendDate(date) {
    this.setState({
      endDate: date,
    });
  }
  onChangeProduits(event) {
    this.setState({
      produits: event.target.value,
    });
  }
  onChangeCategorie(event) {
    this.setState({
      categorie: event.target.value,
      subcategorie: subcategorie[event.target.value][0],
    });
  }

  onChangeSubCategorie(event) {
    this.setState({
      subcategorie: event.target.value,
    });
  }
  onchangeNbafficher(event) {
    this.setState({
      nbafficher: event.target.value,
    });
  }
  onchangecheck(event) {
    this.setState({
      selon: event.target.name,
    });
  }
  handleSubmit(event) {
    event.preventDefault();
    // const fournisseur = {
    //   startDate: this.state.startDate,
    //   endDate: this.state.endDate,
    //   selon: this.state.selon,
    //   categorie: this.state.categorie,
    //   subcategorie: this.state.subcategorie,
    //   nbafficher: this.state.nbafficher,
    // };
    const token = window.localStorage.getItem("token");
    axios
      .get(
        `http://localhost:5000/api/show/all/produit-babaliste/${this.state.categorie}/${this.state.subcategorie}/${this.state.nbafficher}/${this.state.startDate}/${this.state.endDate}/${this.state.selon}`,
        //`http://localhost:5000/api/show/all/produit-babaliste/${this.state.categorie}/telephone/3/2020-06-01/2020-06-29/nbMessages`,

        {
          headers: {
            Authorization: `${token}`,
          },
        }
      )
      .then((response) => {
        this.setState({ produits: response.data });
        console.log(this.state.produits);
      });
    // console.log(this.state.categorie);
    // console.log(this.state.subcategorie);
    // console.log(this.state.nbafficher);
    // console.log(this.state.selon);
    // console.log(this.state.startDate);
    // console.log(this.state.endDate);
  }
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="form-group">
          <label>from :</label>
          <DatePicker
            placeholderText="Click to select start date"
            className="form-control"
            selected={this.state.startDate}
            onChange={this.onChangestartDate}
            dateFormat={"yyyy-MM-dd"}
          />
        </div>
        <div className="form-group">
          to :
          <DatePicker
            placeholderText="Click to select end date"
            className="form-control"
            selected={this.state.endDate}
            onChange={this.onChangeendDate}
            dateFormat={"yyyy-MM-dd"}
          />
        </div>
        <div className="form-group">
          nombre de produit aficher :
          <input
            type="number"
            className="form-control"
            onChange={this.onchangeNbafficher}
            value={this.state.nbafficher}
          />
        </div>
        <div className="form-group">
          <label> Categorie</label>
          <select
            className="form-control"
            value={this.state.categorie}
            onChange={this.onChangeCategorie}
            id="input"
          >
            {categorie.map((categorie, index) => {
              return (
                <option key={index} value={categorie}>
                  {categorie}
                </option>
              );
            })}
          </select>
          Sous categorie{" "}
          <div className="form-group">
            <select
              className="form-control"
              onChange={this.onChangeSubCategorie}
              value={this.state.subcategorie}
              disabled={!this.state.categorie ? true : false}
            >
              {subcategorie[this.state.categorie]?.map((item, index) => (
                <option key={index} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="form-group">
          vues{" "}
          <input
            type="checkbox"
            name="nbVues"
            className="form-control"
            checked={this.state.selon === "nbVues"}
            onChange={this.onchangecheck}
          />
          messages{" "}
          <input
            type="checkbox"
            name="nbMessages"
            checked={this.state.selon === "nbMessages"}
            onChange={this.onchangecheck}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <button type="submit" className="form-control">
            recherche
          </button>
        </div>
        <CSVLink
          data={this.state.produits}
          headers={headers}
          separator={"                 "}
        >
          Export to csv
        </CSVLink>
      </form>
    );
  }
}

export default Topperformance;
