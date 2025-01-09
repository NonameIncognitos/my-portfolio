
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HomePage from "@/components/home/page";
import AboutPage from "@/components/about/page";
import ProjectsPage from "@/components/projects/page";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header nameUser="Toktobaev Asanbek" />
      <main className="flex-grow">
        <section id="home">
          <HomePage />
        </section>
        <section id="about">
          <AboutPage />
        </section>
        <section id="projects">
          <ProjectsPage />
        </section>
      </main>
      <Footer />
    </div>
  );
}