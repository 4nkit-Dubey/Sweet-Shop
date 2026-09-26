import bgimage from "../assets/background-image.png";

function Home() {
  return (
    <div
      className="min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${bgimage})` }}
    >

    </div>
  );
}

export default Home;