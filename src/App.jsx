import { lazy, Suspense, useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { initCookieConsent } from "./lib/cookieConsent";

const Home = lazy(() => import("./pages/Home"));
const Careers = lazy(() => import("./pages/Careers"));
const CareerDetail = lazy(() => import("./pages/CareerDetail"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const Imprint = lazy(() => import("./pages/Imprint"));

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
    <BrowserRouter>
      <ScrollToLocation />
      <div
        style={{
          fontFamily: "var(--font-body)",
          color: "#1D1D1F",
          fontWeight: 400,
          background: "#FFFFFF",
          overflowX: "hidden",
        }}
      >
        <Navbar />
        <Suspense fallback={null}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/careers/:jobId" element={<CareerDetail />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/imprint" element={<Imprint />} />
          </Routes>
        </Suspense>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
