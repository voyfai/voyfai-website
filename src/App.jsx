import { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Careers from "./pages/Careers";
import CareerDetail from "./pages/CareerDetail";

function ScrollToHash() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (!hash) return;
    const id = hash.slice(1);
    let raf;
    const tryScroll = (attemptsLeft) => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
        return;
      }
      if (attemptsLeft > 0) raf = requestAnimationFrame(() => tryScroll(attemptsLeft - 1));
    };
    tryScroll(30);
    return () => raf && cancelAnimationFrame(raf);
  }, [pathname, hash]);
  return null;
}

export default function App() {
  return (
    <BrowserRouter basename="/voyfai-website">
      <ScrollToHash />
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
