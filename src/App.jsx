import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Careers from "./pages/Careers";
import CareerDetail from "./pages/CareerDetail";

export default function App() {
  return (
    <BrowserRouter basename="/voyfai-website">
      <div
        style={{
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          color: "#1D1D1F",
          fontWeight: 400,
          background: "#FFFFFF",
          overflowX: "hidden",
        }}
      >
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/careers/:jobId" element={<CareerDetail />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
