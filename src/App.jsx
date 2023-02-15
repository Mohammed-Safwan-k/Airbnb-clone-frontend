import axios from "axios";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./components/Layout";
import { UserContextProvider } from "./components/UserContext";
import PlacesPage from "./pages/Account/Places/PlacesPage";
import ProfilePage from "./pages/Account/ProfilePage";
import IndexPage from "./pages/IndexPage";
import LoginPage from "./pages/Register/LoginPage";
import Register from "./pages/Register/Register";
import PlacesFormPage from "./pages/Account/Places/PlacesFormPage";

axios.defaults.baseURL = "http://127.0.0.1:4000";
axios.defaults.withCredentials = true;

function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<IndexPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/account" element={<ProfilePage />} />
          <Route path="/account/places" element={<PlacesPage />} />
          <Route path="/account/places/new" element={<PlacesFormPage />} />
          <Route path="/account/places/:id" element={<PlacesFormPage />} />
        </Route>
      </Routes>
    </UserContextProvider>
  );
}

export default App;
