import React from "react";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CreateEvent from "./pages/createEvent";
import Events from "./pages/Events";
import Profile from "./pages/Profile";
import ProfileRegister from "./pages/ProfileRegister";
import Header from "./components/Header";
import AddSport from "./pages/admin/AddSport";
import AddCity from "./pages/admin/AddCity";
import Notfound from "./pages/Notfound";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EventDetail from "./pages/EventDetail";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoutes"

const App = () => {

  let id = JSON.parse(localStorage.getItem("user"))?.details;
  const admin = JSON.parse(localStorage.getItem("user"))?.isAdmin;

  return (
    <div>
      <Router>
        <ToastContainer />
        <Header />
        <Routes>
         {admin==true?<Route path="/" element={<AddSport />} />:
         <Route path="/" element={<Events />} />}
          <Route path="/event-detail" element={<EventDetail/>}/>
          <Route path="/profile" element={<Profile />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/event" element={<ProtectedRoute><CreateEvent /></ProtectedRoute>} />
          <Route path="/register_profile" element={<ProtectedRoute><ProfileRegister /></ProtectedRoute>} />
          {admin== true ? (
            <><Route path="/admin" element={<AddSport />} />
              <Route path="/add-city" element={<AddCity />} />
            </>
          ) : (
            "you are not authorized "
          )}
          <Route path="*" element={<Notfound/>}/>
        </Routes>
      </Router>
    </div>
  );
};

export default App;
