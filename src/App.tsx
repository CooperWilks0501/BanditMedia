import { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Lenis from "lenis";
import { Layout } from "./components/layout/Layout";
import { HomePage } from "./pages/HomePage";
import { ServicesPage } from "./pages/ServicesPage";
import { PortfolioPage } from "./pages/PortfolioPage";
import { QuotePage } from "./pages/QuotePage";

function ScrollToTop() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return null;
}

export default function App() {
  useEffect(() => {
    const reduceMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const finePointerQuery = window.matchMedia("(pointer: fine)");
    const largeScreenQuery = window.matchMedia("(min-width: 1024px)");

    if (
      reduceMotionQuery.matches ||
      !finePointerQuery.matches ||
      !largeScreenQuery.matches
    ) {
      return;
    }

    const lenis = new Lenis({
      duration: 0.85,
      smoothWheel: true,
      gestureOrientation: "vertical"
    });

    let frame = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };

    frame = requestAnimationFrame(raf);
    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
    };
  }, []);

  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Layout><HomePage /></Layout>} />
        <Route path="/services" element={<Layout><ServicesPage /></Layout>} />
        <Route path="/portfolio" element={<Layout><PortfolioPage /></Layout>} />
        <Route path="/quote" element={<Layout><QuotePage /></Layout>} />
      </Routes>
    </>
  );
}
