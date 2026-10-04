import React from "react";
import Nav from "../components/Nav";
import Sidebar from "../components/Sidebar";

const Home = () => {
  return (
    <div
      className="relative min-h-screen w-full overflow-x-hidden flex flex-col bg-gradient-to-b from-[#141414] to-[#0c2025]"
    >
      {/* write Homepage code here */}
    <Nav/>
    <Sidebar/>

    </div>
  );
};

export default Home;
