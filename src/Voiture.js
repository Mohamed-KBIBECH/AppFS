import React, { Component } from 'react';
import { Card, Form, Button, Col, Row } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import MyToast from './MyToast';
import { faPlusSquare, faSave, faUndo, faCar, faPalette, faCalendar, faDollarSign, faIdCard } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

class Voiture extends Component {
  constructor(props) {
    super(props);

    this.initialState = {
      id: '',
      marque: '',
      modele: '',
      couleur: '',
      immatricule: '',
      prix: '',
      annee: ''
    };

    this.state = {
      ...this.initialState,
      showToast: false,
      toastMessage: ''
    };

    // Liaison des méthodes
    this.voitureChange = this.voitureChange.bind(this);
    this.submitVoiture = this.submitVoiture.bind(this);
    this.resetVoiture = this.resetVoiture.bind(this);
  }

  componentDidMount() {
    const { id } = this.props.params;
    if (id) {
      this.findVoitureById(id);
    }
  }

  // Méthode pour trouver une voiture par ID
  findVoitureById = (voitureId) => {
    const basicAuth = 'Basic ' + btoa('admin:admin1234');

    axios.get(`http://localhost:8090/voitures/${voitureId}`, {
      headers: {
        'Authorization': basicAuth,
        'Content-Type': 'application/json'
      },
      withCredentials: true
    })
    .then(response => {
      if (response.data) {
        this.setState({
          id: response.data.id,
          marque: response.data.marque,
          modele: response.data.modele,
          couleur: response.data.couleur,
          immatricule: response.data.immatricule,
          annee: response.data.annee,
          prix: response.data.prix
        });
      }
    })
    .catch(error => {
      console.error("Erreur lors de la récupération de la voiture :", error);
    });
  };

  // Méthode pour soumettre ou mettre à jour les données du formulaire
  submitVoiture = (event) => {
    event.preventDefault();

    const voiture = {
      id: this.state.id,
      marque: this.state.marque,
      modele: this.state.modele,
      couleur: this.state.couleur,
      immatricule: this.state.immatricule,
      annee: this.state.annee,
      prix: this.state.prix
    };

    const basicAuth = 'Basic ' + btoa('admin:admin1234');
    const url = voiture.id ? `http://localhost:8090/voitures/${voiture.id}` : 'http://localhost:8090/voitures';
    const method = voiture.id ? 'put' : 'post';

    axios({
      method: method,
      url: url,
      data: voiture,
      headers: {
        'Authorization': basicAuth,
        'Content-Type': 'application/json'
      },
      withCredentials: true
    })
    .then(response => {
      if (response.data != null) {
        this.setState(this.initialState); // Réinitialise le formulaire
        this.showToast(voiture.id ? "Voiture mise à jour avec succès" : "Voiture enregistrée avec succès");
        setTimeout(() => this.props.navigate('/list'), 3000); // Redirection vers la liste
      }
    })
    .catch(error => {
      console.error("Erreur lors de la soumission de la voiture :", error);
    });
  };

  resetVoiture = () => {
    this.setState(() => this.initialState);
  };

  voitureChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  showToast = (message) => {
    this.setState({
      showToast: true,
      toastMessage: message
    });
  };

  render() {
    const { marque, modele, couleur, immatricule, prix, annee, showToast, toastMessage } = this.state;
    const isEdit = this.state.id !== '';

    return (
      <div>
        <div style={{ display: showToast ? "block" : "none" }}>
          <MyToast show={showToast} message={toastMessage} />
        </div>

        <Card className="border border-dark bg-dark text-white">
          <Card.Header>
            <FontAwesomeIcon icon={faPlusSquare} /> {isEdit ? "Modifier une Voiture" : "Ajouter une Voiture"}
          </Card.Header>
          <Form onReset={this.resetVoiture} onSubmit={this.submitVoiture} id="VoitureFormId">
            <Card.Body>
              <Row>
                <Form.Group as={Col} controlId="formGridMarque">
                  <Form.Label><FontAwesomeIcon icon={faCar} /> Marque</Form.Label>
                  <Form.Control
                    required
                    name="marque"
                    type="text"
                    value={marque}
                    autoComplete="off"
                    onChange={this.voitureChange}
                    className="bg-dark text-white"
                    placeholder="Entrez Marque Voiture"
                  />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridModele">
                  <Form.Label><FontAwesomeIcon icon={faCar} /> Modèle</Form.Label>
                  <Form.Control
                    required
                    name="modele"
                    type="text"
                    value={modele}
                    autoComplete="off"
                    onChange={this.voitureChange}
                    className="bg-dark text-white"
                    placeholder="Entrez Modèle Voiture"
                  />
                </Form.Group>
              </Row>

              <Row>
                <Form.Group as={Col} controlId="formGridCouleur">
                  <Form.Label><FontAwesomeIcon icon={faPalette} /> Couleur</Form.Label>
                  <Form.Control
                    required
                    name="couleur"
                    type="text"
                    value={couleur}
                    autoComplete="off"
                    onChange={this.voitureChange}
                    className="bg-dark text-white"
                    placeholder="Entrez Couleur Voiture"
                  />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridImmatricule">
                  <Form.Label><FontAwesomeIcon icon={faIdCard} /> Immatriculation</Form.Label>
                  <Form.Control
                    required
                    name="immatricule"
                    type="text"
                    value={immatricule}
                    autoComplete="off"
                    onChange={this.voitureChange}
                    className="bg-dark text-white"
                    placeholder="Entrez Immatriculation"
                  />
                </Form.Group>
              </Row>

              <Row>
                <Form.Group as={Col} controlId="formGridAnnee">
                  <Form.Label><FontAwesomeIcon icon={faCalendar} /> Année</Form.Label>
                  <Form.Control
                    required
                    name="annee"
                    type="number"
                    value={annee}
                    autoComplete="off"
                    onChange={this.voitureChange}
                    className="bg-dark text-white"
                    placeholder="Entrez Année"
                  />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridPrix">
                  <Form.Label><FontAwesomeIcon icon={faDollarSign} /> Prix</Form.Label>
                  <Form.Control
                    required
                    name="prix"
                    type="number"
                    value={prix}
                    autoComplete="off"
                    onChange={this.voitureChange}
                    className="bg-dark text-white"
                    placeholder="Entrez Prix"
                  />
                </Form.Group>
              </Row>
            </Card.Body>

            <Card.Footer style={{ textAlign: "right" }}>
              <Button size="sm" variant="success" type="submit">
                <FontAwesomeIcon icon={faSave} /> {isEdit ? "Mettre à jour" : "Enregistrer"}
              </Button>{' '}
              <Button size="sm" variant="info" type="reset">
                <FontAwesomeIcon icon={faUndo} /> Réinitialiser
              </Button>
            </Card.Footer>
          </Form>
        </Card>
      </div>
    );
  }
}

// Utilisation de `useParams` et `useNavigate` pour remplacer `withRouter`
export default function VoitureWrapper(props) {
  const params = useParams();
  const navigate = useNavigate();
  return <Voiture {...props} params={params} navigate={navigate} />;
}
