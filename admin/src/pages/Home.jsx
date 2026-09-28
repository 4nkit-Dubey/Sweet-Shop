import React from "react";
import bgimage from "../assets/background-image.png";
import Nav from "../components/Nav";
import Sidebar from "../components/Sidebar";

const Home = () => {
  return (
    <div
      className="relative h-screen w-full overflow-hidden bg-cover bg-center flex flex-col"
      style={{ backgroundImage: `url(${bgimage})` }}
    >
      {/* write Homepage code here */}
    <Nav/>
    <Sidebar/>

    </div>
  );
};

export default Home;
