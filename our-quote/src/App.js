import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ScrollToTop from './components/ui/ScrollToTop';


import Container from "./components/Container/Container";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

import Home from './pages/Home';
import Participants from './pages/ParticipantsPage';
import AbstractsPage from './pages/AbstractsPage';

function App() {
  return (
    <Router>
      <ScrollToTop/>
      <Container>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/participants" element={<Participants />} />
          <Route path="/abstracts" element={<AbstractsPage />} />
        </Routes>
        <Footer />
      </Container>
    </Router>
  );
}

export default App;