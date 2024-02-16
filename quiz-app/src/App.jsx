import React from "react";
import NoKey from "./pages/NoKey";
import WithKey from "./pages/WithKey";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" Component={NoKey}/>
        <Route path="/key" Component={WithKey}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
