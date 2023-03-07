import axios from "axios";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./components/Layout";
import { UserContextProvider } from "./components/UserContext";
import PlacesPage from "./pages/Account/Places/PlacesPage";
import ProfilePage from "./pages/Account/ProfilePage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/Register/LoginPage";
import Register from "./pages/Register/Register";
import PlacesFormPage from "./pages/Account/Places/PlacesFormPage";
import PlacePage from "./pages/Place/PlacePage";
import BookingsPage from "./pages/Bookings/BookingsPage";
import SingleBooking from "./pages/Bookings/SingleBooking";

axios.defaults.baseURL = "https://airbnbbackend.cyclic.app";
axios.defaults.withCredentials = true;

function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/account" element={<ProfilePage />} />
          <Route path="/account/places" element={<PlacesPage />} />
          <Route path="/account/places/new" element={<PlacesFormPage />} />
          <Route path="/account/places/:id" element={<PlacesFormPage />} />
          <Route path="/place/:id" element={<PlacePage />} />
          <Route path="/account/bookings" element={<BookingsPage />} />
          <Route path="/account/bookings/:id" element={<SingleBooking />} />
        </Route>
      </Routes>
    </UserContextProvider>
  );
}

export default App;
