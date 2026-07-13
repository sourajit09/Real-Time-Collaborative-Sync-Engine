// frontend/src/App.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DocumentEditor from "./pages/DocumentEditor";
import Home from "./pages/Home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/document/:id" element={<DocumentEditor />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;