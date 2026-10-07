import React from 'react';
import Title from './Title';
import { MdVerifiedUser } from "react-icons/md";
import { LuTruck } from "react-icons/lu";
import { PiHeadsetBold } from "react-icons/pi";

const policies = [
  {
    icon: MdVerifiedUser,
    title: "100% Pure & Fresh",
    description: "Handcrafted with pure desi ghee and premium ingredients for authentic taste.",
  },
  {
    icon: LuTruck,
    title: "Safe & Express Delivery",
    description: "Hygienically packed and delivered fresh to your doorstep on time.",
  },
  {
    icon: PiHeadsetBold,
    title: "Instant Customer Support",
    description: "Have questions or special bulk orders? Our dedicated team is always here to help.",
  },
];

const OurPolicy = () => {
  return (
    <section className="w-full py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col items-center justify-center text-center mb-12">
        <Title text1={"OUR"} text2={"POLICY"} />
        <p className="text-gray-300 text-sm sm:text-base max-w-xl -mt-1 font-light tracking-wide">
          We are committed to delivering unmatched sweetness, uncompromised quality, and delightful service with every bite.
        </p>
      </div>

      {/* Policy Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
        {policies.map((policy, index) => {
          const Icon = policy.icon;
          return (
            <div
              key={index}
              className="group relative flex flex-col items-center text-center p-6 sm:p-8 rounded-2xl bg-[#0e272e]/40 border border-[#a5faf7]/20 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:border-[#a5faf7]/50 hover:shadow-[0_0_25px_rgba(165,250,247,0.15)]"
            >
              {/* Icon Container with subtle glow */}
              <div className="mb-4 p-4 rounded-xl bg-[#0c2025]/80 border border-[#a5faf7]/20 text-[#a5faf7] text-3xl sm:text-4xl transition-all duration-300 group-hover:bg-[#a5faf7]/10 group-hover:scale-110 group-hover:text-white shadow-inner">
                <Icon />
              </div>

              {/* Title */}
              <h3 className="text-lg sm:text-xl font-semibold text-blue-100 mb-2 tracking-wide group-hover:text-[#a5faf7] transition-colors duration-300">
                {policy.title}
              </h3>

              {/* Description */}
              <p className="text-gray-400 text-xs sm:text-sm leading-relaxed max-w-xs">
                {policy.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default OurPolicy;