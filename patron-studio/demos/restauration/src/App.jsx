import Contact from './components/Contact';
import Footer from './components/Footer';
import Gallery from './components/Gallery';
import Header from './components/Header';
import Hero from './components/Hero';
import Menu from './components/Menu';
import Reservation from './components/Reservation';
import Reviews from './components/Reviews';
import Story from './components/Story';
import { useScrollRefresh } from './hooks/useScrollRefresh';

export default function App() {
  useScrollRefresh();
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Menu />
        <Story />
        <Gallery />
        <Reviews />
        <Reservation />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
