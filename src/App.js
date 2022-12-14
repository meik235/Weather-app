import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Home from "./components/Home";
import Cities from "./components/Cities";

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <div className="app__sidebar">
          <Sidebar />
        </div>
        <div className="app__body">
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/cities" element={<Cities />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
