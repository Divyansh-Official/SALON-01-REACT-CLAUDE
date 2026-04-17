import React, { useEffect } from 'react';
import salonData from './data/salon.json';
import colorsData from './data/colors.json';
import type { SalonData, Colors } from './types';
import { injectThemeVariables } from './utils/theme';

import Header from './components/sections/Header';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Services from './components/sections/Services';
import Pricing from './components/sections/Pricing';
import Testimonials from './components/sections/Testimonials';
import WorkingHours from './components/sections/WorkingHours';
import Gallery from './components/sections/Gallery';
import Partners from './components/sections/Partners';
import Booking from './components/sections/Booking';
import Contact from './components/sections/Contact';
import Footer from './components/sections/Footer';
import FloatingContact from './components/ui/FloatingContact';

const salon = salonData as SalonData;
const colors = colorsData as Colors;

const App: React.FC = () => {
  useEffect(() => {
    injectThemeVariables(colors);
    document.title = salon.seo.title;
  }, []);

  return (
    <div style={{ background: 'var(--color-background)', color: 'var(--color-textPrimary)' }}>
      <Header salon={salon} />
      <main>
        <Hero salon={salon} />
        <About salon={salon} />
        <Services salon={salon} />
        <Pricing salon={salon} />
        <Testimonials salon={salon} />
        <WorkingHours salon={salon} />
        <Gallery salon={salon} />
        <Partners salon={salon} />
        <Booking salon={salon} />
        <Contact salon={salon} />
      </main>
      <Footer salon={salon} />
      <FloatingContact salon={salon} />
    </div>
  );
};

export default App;
