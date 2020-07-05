import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
import swal from "sweetalert";

const Fournisseur = (props) => (
  <tr>
    <td>{props.fournisseur.nom}</td>
    <td>{props.fournisseur.url}</td>
    <td>{props.fournisseur.categorie}</td>
    <td>{props.fournisseur.sous_categorie}</td>
    <td>{props.fournisseur.taux_reponse}</td>
    <td>{props.fournisseur.taux_livraison}</td>
    <td>{props.fournisseur.note_moyenne}</td>
    <td>
      <Link
        to={
          "/home/Productsourcing/Showall/updatesupplier/" +
          props.fournisseur._id
        }
      >
        Edit
      </Link>{" "}
      |
      <a
        href="#"
        onClick={() => {
          swal({
            title: "Are you sure?",
            text: "this action is permanent",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          }).then((willDelete) => {
            if (willDelete) {
              props.deleteFournisseur(props.fournisseur._id);
              swal("Supplier deleted!", {
                icon: "success",
              });
            } else {
              swal("Supplier safe");
            }
          });
        }}
      >
        Delete
      </a>
      |
      <Link
        to={"/home/Productsourcing/Showall/product/" + props.fournisseur._id}
      >
        Products
      </Link>{" "}
    </td>
  </tr>
);

class Showall extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fournisseurs: [],
      errors: {},
    };
    this.deleteFournisseur = this.deleteFournisseur.bind(this);
  }
  componentDidMount() {
    const token = window.localStorage.getItem("token");

    axios
      .get("http://localhost:5000/api/show/all/fournisseur", {
        headers: {
          Authorization: `${token}`,
        },
      })
      .then((response) => {
        this.setState({ fournisseurs: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }
  deleteFournisseur(id) {
    const token = window.localStorage.getItem("token");
    axios
      .delete("http://localhost:5000/api/delete/fournisseur/" + id, {
        headers: {
          Authorization: `${token}`,
        },
      })
      .then((res) => console.log(res.data));
    this.setState({
      fournisseurs: this.state.fournisseurs.filter((el) => el._id !== id),
    });
  }
  FournisseurList() {
    return this.state.fournisseurs.map((currentfournisseur) => {
      return (
        <Fournisseur
          fournisseur={currentfournisseur}
          deleteFournisseur={this.deleteFournisseur}
          key={currentfournisseur._id}
        />
      );
    });
  }
  render() {
    return (
      <div>
        <h1>Supplier Lists </h1>
        <button
          className="bouton"
          onClick={() => {
            this.props.history.push("/home/Productsourcing/Showall/add");
          }}
        >
          + Create new Supplier
        </button>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Nom</th>
              <th>Url</th>
              <th>Categorie</th>
              <th>Sous_categorie</th>
              <th>taux reponse</th>
              <th>taux livraison</th>
              <th>note moyenne</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>{this.FournisseurList()}</tbody>
        </table>
      </div>
    );
  }
}

export default withRouter(Showall);
