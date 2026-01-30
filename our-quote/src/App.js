import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ScrollToTop from './components/ui/ScrollToTop';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';



import Container from "./components/Container/Container";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

import HomePage from './pages/HomePage';
import Participants from './pages/ParticipantsPage';
import AbstractsPage from './pages/AbstractsPage';
import RegistrationPage from './pages/RegistrationPage';
import ProgramPage from './pages/ProgramPage';
import AdminPanel from './components/AdminPanel/AdminPanel';
import ParticipantsInfo from './components/ParticipantsInfo/ParticipantsInfo';
import EditParticipants from './components/EditParticipants/EditParticipants';
import EditAbstracts from './components/EditAbstracts/EditAbstracts';
import EditProgram from './components/EditProgram/EditProgram';
import EditWebInfo from './components/EditWebInfo/EditWebInfo';


function App() {
  return (
    <Router>
      <ScrollToTop/>
      <Container>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/participants" element={<Participants />} />
          <Route path="/abstracts" element={<AbstractsPage />} />
          <Route path="/registration" element={<RegistrationPage />} />
          <Route path="/program" element={<ProgramPage />} />

          {/* Protected Admin Routes */}
          <Route path="/admin-panel" element={
            <ProtectedRoute>
              <AdminPanel />
            </ProtectedRoute>
          } />
          <Route path="/admin-panel/participants-info" element={
            <ProtectedRoute>
              <ParticipantsInfo />
            </ProtectedRoute>
          } />
          <Route path="/admin-panel/edit-participants" element={
            <ProtectedRoute>
              <EditParticipants />
            </ProtectedRoute>
          } />
          <Route path="/admin-panel/edit-abstracts" element={
            <ProtectedRoute>
              <EditAbstracts />
            </ProtectedRoute>
          } />
          <Route path="/admin-panel/edit-program" element={
            <ProtectedRoute>
              <EditProgram />
            </ProtectedRoute>
          } />
          <Route path="/admin-panel/edit-web-info" element={
            <ProtectedRoute>
              <EditWebInfo />
            </ProtectedRoute>
          } />
        </Routes>
        <Footer />
      </Container>
    </Router>
  );
}

export default App;