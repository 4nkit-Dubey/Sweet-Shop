import React, { useState } from 'react';
import { LuMail, LuSend } from "react-icons/lu";
import { MdCheckCircle } from "react-icons/md";

const NewLetterBox = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setIsSubscribed(true);
      setEmail('');
      setTimeout(() => {
        setIsSubscribed(false);
      }, 5000);
    }
  };

  return (
    <section className="w-full py-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-[#0e272e]/60 via-[#102b33]/40 to-[#0c2025]/80 border border-[#a5faf7]/20 backdrop-blur-md p-8 sm:p-12 md:p-16 text-center shadow-[0_10px_40px_rgba(0,0,0,0.5)]">
        
        {/* Decorative background glow spot */}
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-80 h-40 bg-[#a5faf7]/10 blur-3xl pointer-events-none rounded-full" />

        {/* Small badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#a5faf7]/10 border border-[#a5faf7]/25 text-[#a5faf7] text-xs sm:text-sm font-medium mb-6">
          <LuMail className="text-base" />
          <span>Sweet Club Newsletter</span>
        </div>

        {/* Main Heading */}
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-wide text-blue-100 mb-3">
          Subscribe Now & Get <span className="text-[#a5faf7]">10% Off</span>
        </h2>

        {/* Subtitle */}
        <p className="text-gray-300 text-xs sm:text-sm md:text-base max-w-xl mx-auto mb-8 font-light leading-relaxed">
          Join our exclusive community to receive festive specials, newly crafted sweets announcements, and secret discounts delivered straight to your inbox.
        </p>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="relative max-w-lg mx-auto flex flex-col sm:flex-row items-stretch gap-3 sm:gap-0 sm:border sm:border-[#a5faf7]/30 sm:rounded-full sm:bg-[#07161a]/80 sm:p-1.5 sm:focus-within:border-[#a5faf7] sm:focus-within:shadow-[0_0_20px_rgba(165,250,247,0.2)] transition-all duration-300"
        >
          <div className="relative flex-1 flex items-center">
            <LuMail className="absolute left-4 sm:left-4 text-gray-400 text-lg pointer-events-none" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              required
              className="w-full pl-11 pr-4 py-3 sm:py-2.5 rounded-full sm:rounded-none bg-[#07161a]/80 sm:bg-transparent border border-[#a5faf7]/30 sm:border-0 text-white placeholder-gray-400 text-sm focus:outline-none focus:border-[#a5faf7] sm:focus:border-0"
            />
          </div>

          <button
            type="submit"
            className="group flex items-center justify-center gap-2 px-7 py-3 sm:py-2.5 rounded-full bg-[#a5faf7] text-[#081a1f] font-semibold text-sm hover:bg-white transition-all duration-300 shadow-[0_0_15px_rgba(165,250,247,0.3)] hover:shadow-[0_0_25px_rgba(165,250,247,0.5)] active:scale-95 shrink-0"
          >
            <span>Subscribe</span>
            <LuSend className="text-sm transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </form>

        {/* Success Feedback */}
        {isSubscribed && (
          <div className="mt-5 inline-flex items-center gap-2 text-xs sm:text-sm text-[#a5faf7] bg-[#a5faf7]/10 border border-[#a5faf7]/30 px-4 py-2 rounded-full">
            <MdCheckCircle className="text-base shrink-0" />
            <span>Thank you for subscribing! Your 10% discount code has been sent.</span>
          </div>
        )}

        {/* Micro Guarantee Note */}
        <p className="mt-5 text-[11px] sm:text-xs text-gray-500">
          No spam, ever. Unsubscribe at any time with one click.
        </p>
      </div>
    </section>
  );
};

export default NewLetterBox;