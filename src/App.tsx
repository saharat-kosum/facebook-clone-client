import React from "react";
import HomePage from "./page/homePage/HomePage";
import LoginPage from "./page/loginPage/LoginPage";
import ProfilePage from "./page/profilePage/ProfilePage";
import { BrowserRouter , Routes, Route } from 'react-router-dom';
import IndexPage from "./page/indexPage/indexPage";

function App() {
  return (
    <div className="App bg-secondary-subtle">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<IndexPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/login" element={<LoginPage/>} />
          <Route path="/profile/:userId" element={<ProfilePage/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
