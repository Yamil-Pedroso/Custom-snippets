import Hero from "../components/hero/Hero";
import Features from "../components/features/Features";
import PublicSnippets from "../components/public-snippets/PublicSnippets";

const HomePage = () => {
  return (
    <div>
      <Hero />
      <Features />
      <PublicSnippets />
    </div>
  );
};

export default HomePage;
