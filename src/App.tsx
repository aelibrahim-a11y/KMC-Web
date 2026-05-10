/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { AnimatePresence } from "motion/react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import CustomCursor from "./components/CustomCursor";
import WhatsAppButton from "./components/WhatsAppButton";

// Pages (to be created)
import Home from "./pages/Home";
import About from "./pages/About";
import Work from "./pages/Work";
import Services from "./pages/Services";
import Sectors from "./pages/Sectors";
import Contact from "./pages/Contact";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen bg-paper flex flex-col">
        <CustomCursor />
        <Header />
        <main className="flex-grow pt-24">
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/work" element={<Work />} />
              <Route path="/services" element={<Services />} />
              <Route path="/sectors" element={<Sectors />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </AnimatePresence>
        </main>
        <Footer />
        <WhatsAppButton />
      </div>
    </Router>
  );
}
