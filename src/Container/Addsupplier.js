import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import swal from "sweetalert";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

const sous_categorie = {
  electronic: ["telephone", "laptop", "tablette"],
  vetement: ["pull", "tee-shirt", "pontalon"],
  beaute: ["creme", "pomade", "gel-douche"],
};
const categories = ["", "electronic", "beaute", "vetement"];

class Addsupplier extends Component {
  constructor() {
    super();
    this.state = {
      nom: "",
      url: "",
      categorie: "",
      sous_categorie: "",
      taux_reponse: "",
      taux_livraison: "",
      note_moyenne: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onChangeNom = this.onChangeNom.bind(this);
    this.onChangeUrl = this.onChangeUrl.bind(this);
    this.onChangeCategorie = this.onChangeCategorie.bind(this);
    this.onChangeSous_categorie = this.onChangeSous_categorie.bind(this);
    this.onChangeTaux_reponse = this.onChangeTaux_reponse.bind(this);
    this.onChangeTaux_livraison = this.onChangeTaux_livraison.bind(this);
    this.onChangeNote_moyenne = this.onChangeNote_moyenne.bind(this);
  }
  handleSubmit(event) {
    event.preventDefault();
    const fournisseur = {
      nom: this.state.nom,
      url: this.state.url,
      categorie: this.state.categorie,
      sous_categorie: this.state.sous_categorie,
      taux_reponse: this.state.taux_reponse,
      taux_livraison: this.state.taux_livraison,
      note_moyenne: this.state.note_moyenne,
    };
    const token = window.localStorage.getItem("token");
    axios
      .post("http://localhost:5000/api/add/fournisseur", fournisseur, {
        headers: {
          Authorization: `${token}`,
        },
      })
      .then((res) => console.log(res.data))
      .catch((error) => console.log("erreur :", error));
    swal({
      title: "Fournisseur created successfuly",
      icon: "success",
      button: "Ok",
    });
    this.props.history.push("/home/Productsourcing/Showall");
  }
  onChangeNom(event) {
    this.setState({
      nom: event.target.value,
    });
  }
  onChangeUrl(event) {
    this.setState({
      url: event.target.value,
    });
  }
  onChangeCategorie(event) {
    this.setState({
      categorie: event.target.value,
      sous_categorie: sous_categorie[event.target.value][0],
    });
  }
  onChangeSous_categorie(event) {
    this.setState({
      sous_categorie: event.target.value,
    });
  }
  onChangeTaux_livraison(event) {
    this.setState({
      taux_livraison: event.target.value,
    });
  }
  onChangeTaux_reponse(event) {
    this.setState({
      taux_reponse: event.target.value,
    });
  }
  onChangeNote_moyenne(event) {
    this.setState({
      note_moyenne: event.target.value,
    });
  }

  render() {
    return (
      <div className="formTop">
        <form className="form1" onSubmit={this.handleSubmit}>
          <div className="form-group">
            <span className="label">Name :</span>
            <input
              className="limit"
              type="firstname"
              name="firstname"
              value={this.state.nom}
              onChange={this.onChangeNom}
              required
            />
          </div>
          <div className="form-group">
            <span className="label">Url :</span>
            <input
              className="limit"
              type="lastname"
              name="lastname"
              value={this.state.url}
              onChange={this.onChangeUrl}
              required
            />
          </div>
          <div className="form-group">
            <span className="label">Categorie :</span>
            <select
              className="limit"
              value={this.state.categorie}
              onChange={this.onChangeCategorie}
              id="input"
            >
              {categories.map((categorie, index) => {
                return (
                  <option key={index} value={categorie}>
                    {categorie}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="form-group">
            <span className="label">Sub Categorie</span>
            <select
              className="limit"
              onChange={this.onChangeSous_categorie}
              value={this.state.sous_categorie}
              disabled={!this.state.categorie ? true : false}
            >
              {sous_categorie[this.state.categorie]?.map((item) => (
                <option value={item}>{item}</option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <span className="label"> Delivery rate :</span>
            <input
              className="limit"
              type="Number"
              name="taux_livraison"
              value={this.state.taux_livraison}
              onChange={this.onChangeTaux_livraison}
              required
            />
          </div>
          <div className="form-group">
            <span className="label"> Response rate :</span>
            <input
              className="limit"
              type="Number"
              name="taux_reponse"
              value={this.state.taux_reponse}
              onChange={this.onChangeTaux_reponse}
              required
            />
          </div>
          <div className="form-group">
            <span className="label"> Average rating :</span>
            <input
              className="limit"
              type="Number"
              name="note_moyenne"
              value={this.state.note_moyenne}
              onChange={this.onChangeNote_moyenne}
              required
            />
          </div>
          <div className="showallBouton">
            <button type="submit" className="Boutonshowall">
              <span className="showallboutontext">Create new supplier</span>
            </button>
          </div>
        </form>
      </div>
    );
  }
}
export default Addsupplier;
