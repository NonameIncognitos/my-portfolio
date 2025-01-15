"use client"

import { useEffect } from "react";
import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
import HomePage from "@/components/home/page";
import AboutPage from "@/components/about/page";
import ProjectsPage from "@/components/projects/page";
import ContactPage from "@/components/contact/page";

export default function Home() {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const smoothScroll = (target: string) => {
        const element = document.querySelector(target);
        if (element) {
          element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      };

      const handleClick = (e: Event) => {
        e.preventDefault();
        const target = (e.currentTarget as HTMLAnchorElement).getAttribute('href');
        if (target) {
          smoothScroll(target);
        }
      };
      
      const links = document.querySelectorAll('a[href^="#"]');
      links.forEach(link => {
        link.addEventListener('click', handleClick);
      });
      
      return () => {
        links.forEach(link => {
          link.removeEventListener('click', handleClick);
        });
      };
    }
  }, []);

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
        <section id="contact">
          <ContactPage />
        </section>
      </main>
      <Footer />
    </div>
  );
}