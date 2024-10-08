import "./App.css"; 
import NavBar from "./components/Navbar/NavBar.jsx";
import Slider from './components/Slider/Slider.jsx';
import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route } from "react-router-dom";
import Footer from "./components/Footer/Footer.jsx";
import CardsAbautUs from "./Pages/AboutUs/CardsAbautUs.jsx";
import RollingCode from "./Pages/RollingCode/Rolling.jsx";
import EventsSection from "./Pages/HomeCards/HomeCards.jsx";
import ContactPage from "./Pages/Contact/Contact.jsx";
import UserDash from "./Pages/Dashboard/Dashboard.user.jsx";
import Event from "./Pages/Dashboard/dashboard.event.jsx";
import { ShoppingCardProvider } from "./contexts/ShoppingCardContext";
import MerchCards from './Pages/Merchandising/MerchCards.jsx'; 
import Login from "./Pages/login/Login.jsx";
import Register from "./Pages/register/Register.jsx";
import ShoppingCart from './Pages/ShoppingCart/ShoppingCart.jsx';
import Profile from "./Pages/UserProfile/Profile.jsx";

function App() {
  return (
    <ShoppingCardProvider>
      <NavBar />  {/* No necesitamos pasar cartItems y setCartItems aquí, ya que se manejarán por el contexto */}

      <Routes>
        <Route
          path=""
          element={
            <>
              <Slider />
              <EventsSection />  {/* Ya no necesitamos pasar addToCart como prop */}
            </>
          }
        />

        <Route 
          path='/homecards' 
          element={<EventsSection />} 
        />

        <Route path="/profile" element={<Profile />} />

        <Route
          path="/desarrolladores"
          element={
            <>
              <CardsAbautUs />
              <RollingCode />
            </>
          }
        />
        <Route path="/contact" element={<ContactPage />} />
        <Route
          path="/dash"
          element={
            <>
              <UserDash />
              <Event />
            </>
          }
        />
        <Route
          path="/merch"
          element={
            <>
              <MerchCards />
            </>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/carrito" element={<ShoppingCart />} />
      </Routes>
      
      <Footer />
    </ShoppingCardProvider>
  );
}

export default App;
