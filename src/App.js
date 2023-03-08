import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginReg from "./pages/LoginReg";

import Dashboard from "./pages/Dashboard.js";
import Layout from "./Layout.js";
import { getToken } from "./services/LocalStorageService";

function App() {
  const token = getToken();

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={token ? <Dashboard /> : <LoginReg />} />
          </Route>

          <Route path="*" element={<h1>Error 404 Page not found !!</h1>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
