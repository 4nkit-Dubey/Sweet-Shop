import { useEffect, useState } from "react";
import Background from "../components/Background";
import Hero from "../components/Hero";
import Product from "./Product";

function Home() {
  const [heroCount, setHeroCount] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setHeroCount((prevCount) => (prevCount === 4 ? 0 : prevCount + 1));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="relative min-h-screen w-full overflow-x-hidden flex flex-col bg-gradient-to-b from-[#141414] to-[#0c2025]"
    >
      {/* Spacer matching fixed NavBar height */}
      <div className="h-[12%] min-h-[80px] w-full shrink-0" />

      {/* Main container - top aligned with small gap below nav (no vertical center dead space) */}
      <div className="relative w-full flex flex-col items-center justify-start px-2 sm:px-4 md:px-6 pt-2 sm:pt-3 md:pt-4 pb-16 lg:pb-0">
        {/* Banner wrapper hugging image dimensions so dots align on image bottom */}
        <div className="relative w-fit max-w-6xl mx-auto flex items-center justify-center">
          <Background heroCount={heroCount} />
          <Hero heroCount={heroCount} setHeroCount={setHeroCount} />
        </div>
      </div>

      <Product />
    </div>
  );
}

export default Home;
