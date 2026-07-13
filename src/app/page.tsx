import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import CareerTimeline from "@/components/CareerTimeline";
import Skills from "@/components/Skills";
import Portfolio from "@/components/Portfolio";
import Contact from "@/components/Contact";
import DigitalTwinChat from "@/components/DigitalTwinChat";

export default function Home() {
  return (
    <main className="flex-1">
      <Navbar />
      <Hero />
      <About />
      <CareerTimeline />
      <Skills />
      <Portfolio />
      <Contact />
      <DigitalTwinChat />
    </main>
  );
}
