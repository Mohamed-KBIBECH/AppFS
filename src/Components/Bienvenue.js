import React from 'react';
import { Card } from 'react-bootstrap';

class Bienvenue extends React.Component {
  render() {
    return (
      <Card className="bg-dark text-white">
        <Card.Body>
          <Card.Title>
            <h1>Bienvenue au Magasin des Voitures</h1>
          </Card.Title>
          <blockquote className="blockquote mb-0">
            <p>Le meilleur de nos voitures est exposé près de chez vous</p>
            <footer className="blockquote-footer">
              Master MIOLA
            </footer>
          </blockquote>
        </Card.Body>
      </Card>
    );
  }
}

export default Bienvenue;
