import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
import swal from "sweetalert";

const Produit = (props) => (
  <tr>
    <td>{props.produit.titre}</td>
    <td>{props.produit.url}</td>
    <td>{props.produit.prix_unitaire}</td>
    <td>{props.produit.prix_vente_potentiel}</td>
    <td>{props.produit.frais_port}</td>
    <td>{props.produit.taille}</td>
    <td>{props.produit.couleur}</td>
    <td>
      <Link
        to={"/home/Productsourcing/Showall/product/Edit/" + props.produit._id}
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
        Delete
      </a>
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
      <div>
        <h1>Product Lists </h1>
        <button
          className="bouton"
          onClick={() => {
            this.props.history.push(
              "/home/Productsourcing/Showall/product/Add/" +
                this.props.match.params.id
            );
          }}
        >
          + Create new Product
        </button>
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
    );
  }
}

export default withRouter(Product);
