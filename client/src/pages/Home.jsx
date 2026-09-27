import { useEffect, useState } from "react";
import bgimage from "../assets/background-image.png";
import Background from "../components/Background";
import Hero from "../components/Hero";

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
      className="relative h-screen w-full overflow-hidden bg-cover bg-center flex flex-col"
      style={{ backgroundImage: `url(${bgimage})` }}
    >
      {/* Spacer matching fixed NavBar height */}
      <div className="h-[12%] min-h-[80px] w-full shrink-0" />

      {/* Main container - top aligned with small gap below nav (no vertical center dead space) */}
      <div className="relative flex-1 w-full overflow-hidden flex flex-col items-center justify-start px-2 sm:px-4 md:px-6 pt-2 sm:pt-3 md:pt-4 pb-16 lg:pb-0">
        {/* Banner wrapper hugging image dimensions so dots align on image bottom */}
        <div className="relative w-fit max-w-6xl mx-auto flex items-center justify-center">
          <Background heroCount={heroCount} />
          <Hero heroCount={heroCount} setHeroCount={setHeroCount} />
        </div>
      </div>
    </div>
  );
}

export default Home;
