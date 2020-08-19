import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
import swal from "sweetalert";
import trashicon from "../assets/images/trash.png";
import editicon from "../assets/images/edit.png";
const Produit = (props) => (
  <tr>
    <td>{props.produit.titre}</td>
    <td>{props.produit.url}</td>
    <td>{props.produit.prix_unitaire}</td>
    <td>{props.produit.prix_vente_potentiel}</td>
    <td>{props.produit.frais_port}</td>
    <td>{props.produit.taille}</td>
    <td>{props.produit.couleurs[0].couleur}</td>
    <td>
      <Link
        to={"/home/Productsourcing/Showall/product/Edit/" + props.produit._id}
      >
        <img src={editicon} alt="logo" className="logouticon"></img>
      </Link>{" "}
      |
      <button
        className="boutonIcon"
        onClick={() => {
          swal({
            title: "Are you sure?",
            text: "this action is permanent",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          }).then((willDelete) => {
            if (willDelete) {
              props.deleteProduit(props.produit._id);
              swal("Product deleted!", {
                icon: "success",
              });
            } else {
              swal("Product safe");
            }
          });
        }}
      >
        <img src={trashicon} alt="logo" className="logouticon"></img>
      </button>
    </td>
  </tr>
);

class Product extends Component {
  constructor() {
    super();
    this.state = {
      produits: [],
      erreur: "",
    };
    this.deleteProduit = this.deleteProduit.bind(this);
  }
  componentDidMount() {
    const token = window.localStorage.getItem("token");

    axios
      .get(
        "http://localhost:5000/api/show/produit/" + this.props.match.params.id,
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      )
      .then((response) => {
        this.setState({ produits: response.data });
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

  deleteProduit(id) {
    const token = window.localStorage.getItem("token");
    axios
      .delete("http://localhost:5000/api/delete/produit/" + id, {
        headers: {
          Authorization: `${token}`,
        },
      })
      .then((res) => console.log(res.data));
    this.setState({
      produits: this.state.produits.filter((el) => el._id !== id),
    });
  }
  ProductList() {
    return this.state.produits.map((currentproduit) => {
      return (
        <Produit
          produit={currentproduit}
          deleteProduit={this.deleteProduit}
          key={currentproduit._id}
        />
      );
    });
  }
  render() {
    return (
      <div className="showallWraper">
        <div className="showallTitle">
          <span>Product Lists </span>
        </div>
        <div className="showallBouton">
          <button
            className="Boutonshowall"
            onClick={() => {
              this.props.history.push(
                "/home/Productsourcing/Showall/product/Add/" +
                  this.props.match.params.id
              );
            }}
          >
            <span className="showallboutontext">+ Create new Product </span>
          </button>
        </div>
        <div className="showallTab">
          <table className="table">
            <thead className="thead-light">
              <tr>
                <th>Title</th>
                <th>Url</th>
                <th>Unit price</th>
                <th>potentiel sales price</th>
                <th>shipping fees</th>
                <th>sizes</th>
                <th>colors</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>{this.ProductList()}</tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default withRouter(Product);
