import Header from '@/components/Header';
import Hero from '@/components/Hero';
import SelectedWork from '@/components/SelectedWork';
import { CaseStudiesHeader, CaseStudiesContent } from '@/components/CaseStudies';

export default function Home() {
  return (
    <main>
      {/* Upper Container with Gradient: 180deg #F2F4F6 0% to #FFFFFF 100% */}
      <div className="upper-gradient-wrapper">
        <div className="lule-container">
          <Header />
          <Hero />
          <SelectedWork />
          <CaseStudiesHeader />
        </div>
      </div>

      {/* Case Studies Gray Box section starts here */}
      <CaseStudiesContent />

      {/* Footer */}
      <footer className="lule-footer">
        <div className="lule-container">
          <p>© {new Date().getFullYear()} LULE. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
}
