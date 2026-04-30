import { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Imprint from "./pages/Imprint";
import { initCookieConsent } from "./lib/cookieConsent";

function ScrollToLocation() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, behavior: "auto" });
      return;
    }
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
  useEffect(() => {
    initCookieConsent();
  }, []);

  return (
    <BrowserRouter basename="/voyfai-website">
      <ScrollToLocation />
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
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/imprint" element={<Imprint />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
