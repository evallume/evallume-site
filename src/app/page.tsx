import LogoTop from "./components/LogoTop";
import Header from "./components/Header";
import MobileHeader from "./components/MobileHeader";
import Banner from "./components/Banner";
import StoriesRow from "./components/StoriesRow";
import AboutShort from "./components/AboutShort";
import EquipmentCarousel from "./components/EquipmentCarousel";
import EquipmentCarousel1 from "./components/EquipmentCarousel1";
import VideoOverview from "./components/VideoOverview";
import ClientsGallery from "./components/ClientsGallery";
import ROICalculator from "./components/ROICalculator";
import CertificatesBlock from "./components/CertificatesBlock";
import AboutBlock from "./components/AboutBlock";
import FAQBlock from "./components/FAQBlock";
import ContactBlock from "./components/ContactBlock";
import Footer from "./components/Footer";
import BenefitsBlock from "./components/BenefitsBlock";
import GeographyBlock from "./components/GeographyBlock";
import FloatingContactButton from "./components/FloatingContactButton";

export const metadata = {
  title: "Evallume | Professional Aesthetic Equipment | USA",
  description: "Discover Evallume's FDA Certified aesthetic devices for medspas, dermatologists, and estheticians in the USA.",
  openGraph: {
    title: "Evallume | Professional Aesthetic Equipment | USA",
  description: "Discover Evallume's FDA Certified aesthetic devices for medspas, dermatologists, and estheticians in the USA.",
    images: ["/img/og-image.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Evallume | Professional Aesthetic Equipment | USA",
    description: "Discover Evallume's FDA Certified aesthetic devices for medspas, dermatologists, and estheticians in the USA.",
    images: ["/img/og-image.jpg"],
  },
  alternates: {
  canonical: "https://evallume.com",
  languages: {
    "en-US": "https://evallume.com",
    "es": "https://evallume.com/es",
    "ru": "https://evallume.com/ru",
  },
},
};

export default function Home() {
  return (
    <>
      <LogoTop />
      <Header />
      <main className="pt-16">
        <Banner />
        <StoriesRow />
        <AboutShort />
        <MobileHeader />
        <EquipmentCarousel />
        <EquipmentCarousel1 />
        <VideoOverview />
        <BenefitsBlock />
        <GeographyBlock />
        <ClientsGallery />
        <ROICalculator />
        <CertificatesBlock />
        <AboutBlock />
        <FAQBlock />
        <ContactBlock />
        <Footer />
        <FloatingContactButton />
        {/* Следующие блоки */}
      </main>
    </>
  );
}
