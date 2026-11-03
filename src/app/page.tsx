import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { TechMarquee } from "@/components/TechMarquee";
import { Companies } from "@/components/Companies";
import { StackStory } from "@/components/StackStory";
import { Stats } from "@/components/Stats";
import { Process } from "@/components/Process";
import { Showcase } from "@/components/Showcase";
import { About } from "@/components/About";
import { Skills } from "@/components/Skills";
import { Experience } from "@/components/Experience";
import { Education } from "@/components/Education";
import { ScrollProgress } from "@/components/ScrollProgress";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <ScrollProgress />
      <Navbar />
      <main>
        <Hero />
        <TechMarquee />
        <StackStory />
        <Showcase />
        <Stats />
        <About />
        <Skills />
        <Experience />
        <Companies />
        <Education />
        <Process />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
