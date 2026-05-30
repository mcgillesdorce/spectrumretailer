import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeroSection from "@/components/recruit/HeroSection";
import OpportunitySummary from "@/components/recruit/OpportunitySummary";
import ApplicationForm from "@/components/recruit/ApplicationForm";
import RequirementsSection from "@/components/recruit/RequirementsSection";
import CommissionGuide from "@/components/recruit/CommissionGuide";
import FAQSection from "@/components/recruit/FAQSection";
import RecruitContactCTA from "@/components/recruit/RecruitContactCTA";

export const metadata: Metadata = {
  title: "Become a Spectrum Authorized Retailer | HIWS",
  description:
    "Join the HIWS network and become a Spectrum Authorized Retailer. Earn commissions, get full support, and build a business selling Internet, TV, Mobile, and Voice.",
};

export default function BecomeAPartnerPage() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <OpportunitySummary />
        <ApplicationForm />
        <RequirementsSection />
        <CommissionGuide />
        <FAQSection />
        <RecruitContactCTA />
      </main>
      <Footer />
    </>
  );
}
