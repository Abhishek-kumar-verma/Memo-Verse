import React from "react";
import { BrowserRouter,  Route, Routes } from "react-router-dom";
import { Container } from "@material-ui/core";

import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import Auth from "./components/Auth/Auth";
const App = () => {
  return (
    <BrowserRouter>
      <Container maxWidth="lg" >
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} exact/>
          <Route path="/auth" element={<Auth />} exact/>
        </Routes>
        
      </Container>
    </BrowserRouter>
  );
};

export default App;
