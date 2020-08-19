import React, { Component } from "react";
import swal from "sweetalert";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

const tailles = ["", "S", "M", "L", "XL"];

class Addproduct extends Component {
  constructor() {
    super();
    this.state = {
      titre: "",
      url: "",
      prix_unitaire: "",
      prix_vente_potentiel: "",
      frais_port: "",
      taille: "",
      //photo: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onChangeTitre = this.onChangeTitre.bind(this);
    this.onChangeUrl = this.onChangeUrl.bind(this);
    this.onChangePrix_unitaire = this.onChangePrix_unitaire.bind(this);
    this.onChangePrix_vente_potentiel = this.onChangePrix_vente_potentiel.bind(
      this
    );
    this.onChangeFrais_port = this.onChangeFrais_port.bind(this);
    this.onChangeTaille = this.onChangeTaille.bind(this);
    //this.onChangeImage = this.onChangeImage.bind(this);
  }
  handleSubmit(event) {
    event.preventDefault();
    const produit = {
      titre: this.state.titre,
      url: this.state.url,
      prix_unitaire: this.state.prix_unitaire,
      prix_vente_potentiel: this.state.prix_vente_potentiel,
      frais_port: this.state.frais_port,
      //taille: this.state.taille,
    };
    const token = window.localStorage.getItem("token");
    axios
      .post(
        "http://localhost:5000/api/add/produit/" + this.props.match.params.id,
        produit,
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      )
      .then((res) => console.log(res.data))
      .catch((error) => console.log("erreur :", error));
    swal({
      title: "Product created successfuly",
      icon: "success",
      button: "Ok",
    });
    this.props.history.push(
      "/home/Productsourcing/Showall/product/" + this.props.match.params.id
    );
  }
  onChangeTitre(event) {
    this.setState({
      titre: event.target.value,
    });
  }
  onChangeUrl(event) {
    this.setState({
      url: event.target.value,
    });
  }
  onChangePrix_unitaire(event) {
    this.setState({
      prix_unitaire: event.target.value,
    });
  }
  onChangePrix_vente_potentiel(event) {
    this.setState({
      prix_vente_potentiel: event.target.value,
    });
  }
  onChangeFrais_port(event) {
    this.setState({
      frais_port: event.target.value,
    });
  }
  onChangeTaille(event) {
    this.setState({
      taille: event.target.value,
    });
  }
  // onChangeImage(event) {}

  render() {
    return (
      <div className="formTop">
        <form className="form1" onSubmit={this.handleSubmit}>
          <div className="form-group">
            <span className="label">titre :</span>
            <input
              className="limit"
              type="text"
              name="titre"
              value={this.state.titre}
              onChange={this.onChangeTitre}
              required
            />
          </div>
          <div className="form-group">
            <span className="label">Url :</span>
            <input
              className="limit"
              type="text"
              name="url"
              value={this.state.url}
              onChange={this.onChangeUrl}
              required
            />
          </div>
          <div className="form-group">
            <span className="label">Unit price :</span>
            <input
              className="limit"
              type="Number"
              name="url"
              value={this.state.prix_unitaire}
              onChange={this.onChangePrix_unitaire}
              required
            />
          </div>
          <div className="form-group">
            <span className="label">Potentiel sales price :</span>
            <input
              className="limit"
              type="Number"
              name="url"
              value={this.state.prix_vente_potentiel}
              onChange={this.onChangePrix_vente_potentiel}
              required
            />
          </div>
          <div className="form-group">
            <span className="label">Shipping fees:</span>
            <input
              className="limit"
              type="Number"
              name="url"
              value={this.state.frais_port}
              onChange={this.onChangeFrais_port}
              required
            />
          </div>
          <div className="form-group">
            <span className="label">Size :</span>
            <select
              className="limit"
              value={this.state.taille}
              onChange={this.onChangeTaille}
            >
              {tailles.map((taille, index) => {
                return (
                  <option key={index} value={taille}>
                    {taille}
                  </option>
                );
              })}
            </select>
          </div>
          {/* <div className="form-group">
            <span className="label">Upload image:</span>
            <input
              className="limit"
              type="file"
              name="image"
              value={this.state.photo}
              size="10"
              onChange={this.onChangeImage}
            />
          </div> */}

          <div className="showallBouton">
            <button type="submit" className="Boutonshowall">
              <span className="showallboutontext">Create new product</span>
            </button>
          </div>
        </form>
      </div>
    );
  }
}
export default Addproduct;
