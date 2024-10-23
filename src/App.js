import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import NavigationBar from './Components/NavigationBar';
import Bienvenue from './Components/Bienvenue';
import Voiture from './Voiture';
import VoitureListe from './VoitureListe';

function App() {
  return (
    <Router>
      <div className="App">
        <NavigationBar />
        <Container>
          <Row>
            <Col>
              <Routes>
                <Route path="/" element={<Bienvenue />} exact />
                <Route path="/add" element={<Voiture />} exact />
                <Route path="/list" element={<VoitureListe />} exact />
                {/* Route pour l'édition de voiture */}
                <Route path="/edit/:id" element={<Voiture />} exact />
              </Routes>
            </Col>
          </Row>
        </Container>
      </div>
    </Router>
  );
}

export default App;
