import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

import Hero from "@/sections/Hero";
import Features from "@/sections/Features";
import HowItWorks from "@/sections/HowItWorks";
import Testimonials from "@/sections/testimonials";
import CTA from "@/sections/cta";
import Stats from "@/sections/stats";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Features />
      <HowItWorks />
      <Stats />
      <Testimonials />
      <CTA />
      <Footer />
    </main>
  );
}
