import React, { Component } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { CSVLink } from "react-csv";
import "./toperformance.css";
import back from "../assets/images/back.png";
import Resulttop from "./Resultattop";

import axios from "axios";
const headers = [
  { label: "Price", key: "prix" },
  { label: "Tile", key: "titre" },
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
      show: false,
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
    const token = window.localStorage.getItem("token");
    axios
      .get(
        `http://localhost:5000/api/show/all/produit-babaliste/${this.state.categorie}/${this.state.subcategorie}/${this.state.nbafficher}/${this.state.startDate}/${this.state.endDate}/${this.state.selon}`,

        {
          headers: {
            Authorization: `${token}`,
          },
        }
      )
      .then((response) => {
        this.setState({ produits: response.data });
      });
    this.setState({ show: true });
  }
  render() {
    return (
      <div className="formTop">
        {!this.state.show && (
          <form className="form1" onSubmit={this.handleSubmit}>
            <div className="form-group">
              <span className="label">From </span>
              <DatePicker
                placeholderText="Click to select start date"
                className="form-control"
                selected={this.state.startDate}
                onChange={this.onChangestartDate}
                dateFormat={"yyyy-MM-dd"}
              />
            </div>
            <div className="form-group">
              <span className="label">To </span>
              <DatePicker
                placeholderText="Click to select end date"
                className="form-control"
                selected={this.state.endDate}
                onChange={this.onChangeendDate}
                dateFormat={"yyyy-MM-dd"}
              />
            </div>
            <div className="form-group">
              <span className="label">Nombre de produit a aficher :</span>
              <input
                placeholder="number of product to show"
                type="number"
                className="limit"
                onChange={this.onchangeNbafficher}
                value={this.state.nbafficher}
              />
            </div>

            <div className="form-group">
              <span className="label">Categorie</span>
              <select
                className="limit"
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
              <span className="label">Sous categorie</span>{" "}
              <div className="form-group">
                <select
                  className="limit"
                  //className="form-control"
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
            <div className="groupbox">
              <div className="spanbox">
                <span className="labell"> Viwes</span>{" "}
                <input
                  type="checkbox"
                  name="nbVues"
                  //className="form-control"
                  className="box"
                  checked={this.state.selon === "nbVues"}
                  onChange={this.onchangecheck}
                />
              </div>
              <div className="spanbox">
                <span className="labell">Messages</span>{" "}
                <input
                  type="checkbox"
                  name="nbMessages"
                  checked={this.state.selon === "nbMessages"}
                  onChange={this.onchangecheck}
                  className="box"
                />
              </div>
            </div>
            <div className="showallBouton">
              <button type="submit" className="Boutonshowall">
                <span className="showallboutontext">Search</span>
              </button>
            </div>
          </form>
        )}
        {this.state.show && (
          <div className="daberassek">
            <div className="entete">
              <button
                className="boutonIcon"
                onClick={() => this.setState({ show: false })}
              >
                <img src={back} alt="logo" className="logouticon"></img>
              </button>
              <CSVLink
                data={this.state.produits}
                headers={headers}
                separator={"                 "}
              >
                Export to csv
              </CSVLink>
            </div>
            <Resulttop results={this.state.produits}></Resulttop>
          </div>
        )}
      </div>
    );
  }
}

export default Topperformance;
