import { useState, useEffect } from "react";
import Hero from "../components/hero/Hero";
import Features from "../components/features/Features";
import DemoSnippets from "../components/demo-snippets/DemoSnippets";
import UserBenefits from "../components/user-benfits/UserBenefits";
import Integrations from "../components/integrations/integrations";
import HowItWorks from "../components/how-works/HowItWorks";
import PricingPlans from "../components/pricing-plans/PricingPlans";
import CommunitySection from "../components/community/CommunitySection";
import Footer from "../components/footer/Footer";
import WelcomeMessage from "../components/common/welcome-message/WelcomeMessage";
import ModalMessage from "../components/common/modal-message/ModalMessage";


const HomePage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    //const hasModalBeenShown = localStorage.getItem("hasModalBeenShown"); 
    const hasModalBeenShown = sessionStorage.getItem("hasModalBeenShown"); 

    if (!hasModalBeenShown) {
      setIsModalOpen(true);
      //localStorage.setItem("hasModalBeenShown", "true"); 
      sessionStorage.setItem("hasModalBeenShown", "true");
    }
  }, []);

  const closeModal = () => setIsModalOpen(false);

  return (
    <div>
      {isModalOpen && <ModalMessage onClose={closeModal} />}
      <Hero />
      <Features />
      <DemoSnippets />
      <UserBenefits />
      <Integrations />
      <HowItWorks />
      <PricingPlans />
      <CommunitySection />
      <Footer />
      <WelcomeMessage />
    </div>
  );
};

export default HomePage;
