import Hero from "../components/hero/Hero";
import Features from "../components/features/Features";
import DemoSnippets from "../components/demo-snippets/DemoSnippets";
import UserBenefits from "../components/user-benfits/UserBenefits";
import Integrations from "../components/integrations/integrations";
import HowItWorks from "../components/how-works/HowItWorks";
import PricingPlans from "../components/pricing-plans/PricingPlans";
import CommunitySection from "../components/community/CommunitySection";
import Footer from "../components/footer/Footer";

const HomePage = () => {
  return (
    <div>
      <Hero />
      <Features />
      <DemoSnippets />
      <UserBenefits />
      <Integrations />
      <HowItWorks />
      <PricingPlans />
      <CommunitySection />
      <Footer />
    </div>
  );
};

export default HomePage;
