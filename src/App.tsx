import { useState } from "react";
import { Nav } from "./components/Nav";
import { Hero } from "./components/sections/Hero";
import { Problem } from "./components/sections/Problem";
import { Coach } from "./components/sections/Coach";
import { Identity } from "./components/sections/Identity";
import { Method } from "./components/sections/Method";
import { Includes } from "./components/sections/Includes";
import { PrivateApp } from "./components/sections/PrivateApp";
import { Testimonials } from "./components/sections/Testimonials";
import { Filter } from "./components/sections/Filter";
import { FinalCTA } from "./components/sections/FinalCTA";
import { Footer } from "./components/sections/Footer";
import { ApplicationForm } from "./components/ApplicationForm";

function App() {
  const [formOpen, setFormOpen] = useState(false);
  const openForm = () => setFormOpen(true);

  return (
    <>
      <Nav onApply={openForm} />
      <Hero onApply={openForm} />
      <Problem />
      <Coach onApply={openForm} />
      <Identity />
      <Method />
      <Includes />
      <PrivateApp onApply={openForm} />
      <Testimonials />
      <Filter />
      <FinalCTA onApply={openForm} />
      <Footer />
      <ApplicationForm open={formOpen} onClose={() => setFormOpen(false)} />
    </>
  );
}

export default App;
