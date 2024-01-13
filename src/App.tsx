import React from "react";
import HomePage from "./page/homePage/HomePage";
import ProfilePage from "./page/profilePage/ProfilePage";
import { BrowserRouter , Routes, Route } from 'react-router-dom';
import IndexPage from "./page/indexPage/indexPage";
import ChatPage from "./page/chatPage/chatPage";

function App() {
  return (
    <div className="App bg-secondary-subtle">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<IndexPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/profile/:userId" element={<ProfilePage/>} />
          <Route path="/chat" element={<ChatPage/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
