import React, { Component } from 'react';
import { Card, Table, Button, ButtonGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import MyToast from './MyToast';
import { Link } from 'react-router-dom';

export default class VoitureListe extends Component {
  constructor(props) {
    super(props);
    this.state = {
      voitures: [],
      show: false
    };
  }

  componentDidMount() {
    this.findAllVoitures();
  }

  // Méthode pour récupérer la liste de toutes les voitures
  findAllVoitures() {
    const basicAuth = 'Basic ' + btoa('admin:admin1234');

    axios.get('http://localhost:8090/voitures', {
      headers: {
        'Authorization': basicAuth,
        'Content-Type': 'application/json'
      },
      withCredentials: true
    })
    .then(response => {
      this.setState({ voitures: response.data });
    })
    .catch(error => {
      console.error("Erreur lors de la récupération des voitures :", error);
    });
  }

  // Méthode pour supprimer une voiture
  deleteVoiture = (voitureId) => {
    const basicAuth = 'Basic ' + btoa('admin:admin1234');

    axios.delete(`http://localhost:8090/voitures/${voitureId}`, {
      headers: {
        'Authorization': basicAuth,
        'Content-Type': 'application/json'
      },
      withCredentials: true
    })
    .then(response => {
      if (response.data != null) {
        this.setState({
          voitures: this.state.voitures.filter(voiture => voiture.id !== voitureId),
          show: true
        });

        setTimeout(() => this.setState({ show: false }), 3000);
      }
    })
    .catch(error => {
      console.error("Erreur lors de la suppression de la voiture :", error);
    });
  };

  render() {
    const { voitures, show } = this.state;

    return (
      <div>
        <div style={{ "display": show ? "block" : "none" }}>
          <MyToast show={show} message="Voiture supprimée avec succès." />
        </div>

        <Card className="border border-dark bg-dark text-white">
          <Card.Header>Liste Voitures</Card.Header>
          <Card.Body>
            <Table bordered hover striped variant="dark" responsive>
              <thead>
                <tr>
                  <th>Marque</th>
                  <th>Modèle</th>
                  <th>Couleur</th>
                  <th>Année</th>
                  <th>Prix</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {voitures.length === 0 ? (
                  <tr align="center">
                    <td colSpan="6">Aucune Voiture n'est disponible</td>
                  </tr>
                ) : (
                  voitures.map((voiture) => (
                    <tr key={voiture.id}>
                      <td>{voiture.marque}</td>
                      <td>{voiture.modele}</td>
                      <td>{voiture.couleur}</td>
                      <td>{voiture.annee}</td>
                      <td>{voiture.prix}</td>
                      <td>
                        <ButtonGroup>
                          <Link to={"edit/" + voiture.id} className="btn btn-sm btn-outline-primary">
                            <FontAwesomeIcon icon={faEdit} />
                          </Link>{' '}
                          <Button size="sm" variant="outline-danger" onClick={() => this.deleteVoiture(voiture.id)}>
                            <FontAwesomeIcon icon={faTrash} />
                          </Button>
                        </ButtonGroup>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      </div>
    );
  }
}
