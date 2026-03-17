import { Helmet } from 'react-helmet-async';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import WhatsAppFloat from '../components/common/WhatsAppFloat';
import ScrollToTop from '../components/common/ScrollToTop';
import HeroBanner from '../components/home/HeroBanner';
import RunningText from '../components/home/RunningText';
import Services from '../components/home/Services';
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
        <title>Roma Motor — Bengkel & Service Motor Terpercaya</title>
        <meta
          name="description"
          content="Roma Motor - Bengkel motor terpercaya. Spesialis service motor semua merk, spare part original, mekanik berpengalaman. Servis cepat, harga transparan."
        />
        <meta property="og:title" content="Roma Motor — Bengkel & Service Motor Terpercaya" />
        <meta property="og:description" content="Spesialis service motor semua merk. Mekanik berpengalaman, spare part original." />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://romamotor.com" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "AutoRepair",
            "name": "Roma Motor",
            "description": "Bengkel & Service Motor Terpercaya",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "Jl. Raya Roma Motor No. 123",
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
        <Services />
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
