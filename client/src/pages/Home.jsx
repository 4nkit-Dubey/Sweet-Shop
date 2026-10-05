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
    <div className="relative min-h-screen w-full overflow-x-hidden flex flex-col bg-gradient-to-b from-[#0c2025] to-[#141414]">
      {/* Spacer matching fixed NavBar height */}
      <div className="h-[10vh] min-h-[80px] w-full shrink-0 sm:h-[12vh]" />

      {/* Hero / Banner section */}
      <section className="relative w-full flex flex-col items-center justify-start px-2 sm:px-4 md:px-6 pt-2 sm:pt-3 md:pt-4">
        {/* Banner wrapper — hugging image dimensions so dots align on image bottom */}
        <div className="relative w-fit max-w-6xl mx-auto flex items-center justify-center">
          <Background heroCount={heroCount} />
          <Hero heroCount={heroCount} setHeroCount={setHeroCount} />
        </div>
      </section>

      {/* Divider glow line between hero and products */}
      <div className="w-full max-w-4xl mx-auto mt-10 mb-2 h-px bg-gradient-to-r from-transparent via-[#a5faf7]/25 to-transparent" />

      {/* Products section (Latest Collections + Best Sellers) */}
      <Product />

      {/* Bottom padding for mobile bottom nav */}
      <div className="h-[72px] lg:hidden shrink-0" />
    </div>
  );
}

export default Home;
