import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';


import Container from "./components/Container/Container";
import Header from "./components/Header/Header";
import Hero from "./components/Hero/Hero";
import Registration from "./components/Registration/Registration";
import OrganisingCommittee from './components/OrginisingCommittee/OrginisingCommittee';
import Organisers from './components/Organisers/Organisers';
import Footer from "./components/Footer/Footer";

function App() {
  return (
    <div>
      <Container>
    <Header/>
    <Hero/>
    <Registration/>
    <OrganisingCommittee/>
    <Organisers/>
    <Footer/>
      </Container>
    </div>
  );
}

export default App;