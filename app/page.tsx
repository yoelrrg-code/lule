import Header from '@/components/Header';
import Hero from '@/components/Hero';
import SelectedWork from '@/components/SelectedWork';
import GoodWork from '@/components/GoodWork';
import { CaseStudiesHeader, CaseStudiesContent } from '@/components/CaseStudies';
import Capabilities from '@/components/Capabilities';
import About from '@/components/About';
import ConversationCTA from '@/components/ConversationCTA';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main>
      {/* Upper Container with Gradient */}
      <div className="upper-gradient-wrapper">
        <div className="lule-container">
          <Header />
          <Hero />
          <SelectedWork />
          <GoodWork />
          <CaseStudiesHeader />
        </div>
      </div>

      {/* Case Studies */}
      <CaseStudiesContent />

      {/* Capabilities */}
      <Capabilities />

      {/* About */}
      <About />

      {/* Conversation CTA */}
      <ConversationCTA />

      {/* Footer */}
      <Footer />
    </main>
  );
}

