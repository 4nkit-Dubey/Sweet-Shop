import { useState } from "react";
import bgimage from "../assets/background-image.png";
import Background from "../components/Background";
import Hero from "../components/Hero";

function Home() {
  let heroData = [
    {
      text1: "Welcome to Our Website",
      text2: "Discover our amazing features and services.",
    },
    {
      text1: "Welcome to Our Website",
      text2: "Discover our amazing features and services.",
    },
    {
      text1: "Welcome to Our Website",
      text2: "Discover our amazing features and services.",
    },
    {
      text1: "Welcome to Our Website",
      text2: "Discover our amazing features and services.",
    },
    {
      text1: "Welcome to Our Website",
      text2: "Discover our amazing features and services.",
    },
  ];

  let [heroCount, setHeroCount] = useState(0);
  return (
    <div
      className="min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${bgimage})` }}
    >
      <Background heroCount={heroCount} />
      <Hero
        heroData={heroData[heroCount]}
        heroCount={heroCount}
        setHeroCount={setHeroCount}
      />
    </div>
  );
}

export default Home;
