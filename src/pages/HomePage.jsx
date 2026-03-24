import { Helmet } from 'react-helmet-async';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import WhatsAppFloat from '../components/common/WhatsAppFloat';
import ScrollToTop from '../components/common/ScrollToTop';
import HeroBanner from '../components/home/HeroBanner';
import RunningText from '../components/home/RunningText';
import Products from '../components/home/Products';
import WhyChooseUs from '../components/home/WhyChooseUs';
import Gallery from '../components/home/Gallery';
import Testimonials from '../components/home/Testimonials';
import Location from '../components/home/Location';
import FAQ from '../components/home/FAQ';
import BlogList from '../components/home/BlogList';
import ContactForm from '../components/home/ContactForm';

export default function HomePage() {
  return (
    <>
      <Helmet>
        <title>Ocho Vape Store — Vape Store & Product vape Terpercaya</title>
        <meta
          name="description"
          content="Ocho Vape Store - vape store terpercaya. Spesialis product vape semua merk, liquid/mod original, vapista berpengalaman. Belanja cepat, harga transparan."
        />
        <meta property="og:title" content="Ocho Vape Store — Vape Store & Product vape Terpercaya" />
        <meta property="og:description" content="Spesialis product vape semua merk. vapista berpengalaman, liquid/mod original." />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://ochovape.com" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "AutoRepair",
            "name": "Ocho Vape Store",
            "description": "Vape Store & Product vape Terpercaya",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "Jl. Raya Ocho Vape Store No. 123",
              "addressLocality": "Jakarta",
              "addressCountry": "ID"
            },
            "telephone": "+6281234567890",
            "openingHours": "Mo-Sa 08:00-17:00",
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "4.9",
              "reviewCount": "500"
            }
          })}
        </script>
      </Helmet>

      <Navbar />
      <main>
        <HeroBanner />
        <RunningText />
        <Products />
        <WhyChooseUs />
        <Gallery />
        <Testimonials />
        <Location />
        <FAQ />
        <BlogList />
        <ContactForm />
      </main>
      <Footer />
      <WhatsAppFloat />
      <ScrollToTop />
    </>
  );
}
