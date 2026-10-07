import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/favicon.png';
import { LuPhone, LuMail, LuMapPin, LuClock } from "react-icons/lu";
import { FaInstagram, FaFacebookF, FaWhatsapp, FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="w-full bg-gradient-to-b from-[#091a1e] via-[#061417] to-[#040b0d] border-t border-[#a5faf7]/20 text-gray-300 relative overflow-hidden">
      {/* Subtle top ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-20 bg-[#a5faf7]/5 blur-3xl pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12 relative z-10">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 mb-12">
          
          {/* Brand & About */}
          <div className="flex flex-col items-start">
            <Link to="/" className="flex items-center gap-3 mb-4 group">
              <img
                src={logo}
                alt="Maa Vindhyavasini Sweets Logo"
                className="w-11 h-11 object-contain rounded-xl border border-[#a5faf7]/30 p-1 bg-[#0c2025] transition-transform duration-300 group-hover:scale-105 group-hover:border-[#a5faf7]"
              />
              <span className="text-lg sm:text-xl font-bold tracking-wide text-blue-100 group-hover:text-white transition-colors">
                Maa <span className="text-[#a5faf7]">Vindhyavasini</span> Sweets
              </span>
            </Link>
            <p className="text-gray-400 text-xs sm:text-sm leading-relaxed mb-6 font-light">
              Crafting authentic Indian traditional sweets and savoury delicacies with 100% pure desi ghee, premium ingredients, and heartfelt devotion.
            </p>

            {/* Social Media Links */}
            <div className="flex items-center gap-3">
              {[
                { icon: FaInstagram, href: "#", label: "Instagram" },
                { icon: FaFacebookF, href: "#", label: "Facebook" },
                { icon: FaWhatsapp, href: "#", label: "WhatsApp" },
                { icon: FaXTwitter, href: "#", label: "Twitter" },
              ].map((social, index) => {
                const Icon = social.icon;
                return (
                  <a
                    key={index}
                    href={social.href}
                    aria-label={social.label}
                    className="w-9 h-9 rounded-full bg-[#0c2025] border border-[#a5faf7]/25 flex items-center justify-center text-gray-300 text-sm transition-all duration-300 hover:text-[#08181c] hover:bg-[#a5faf7] hover:border-[#a5faf7] hover:scale-110 shadow-sm"
                  >
                    <Icon />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold tracking-wider text-blue-100 uppercase mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#a5faf7]" />
              Quick Links
            </h3>
            <ul className="space-y-2.5 text-xs sm:text-sm text-gray-400">
              <li>
                <Link to="/" className="hover:text-[#a5faf7] hover:translate-x-1 transition-all duration-200 inline-block">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/sweets" className="hover:text-[#a5faf7] hover:translate-x-1 transition-all duration-200 inline-block">
                  Sweets Collection
                </Link>
              </li>
              <li>
                <Link to="/snacks" className="hover:text-[#a5faf7] hover:translate-x-1 transition-all duration-200 inline-block">
                  Snacks & Namkeen
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-[#a5faf7] hover:translate-x-1 transition-all duration-200 inline-block">
                  About Our Heritage
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-[#a5faf7] hover:translate-x-1 transition-all duration-200 inline-block">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Our Promise / Highlights */}
          <div>
            <h3 className="text-sm font-semibold tracking-wider text-blue-100 uppercase mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#a5faf7]" />
              Our Promise
            </h3>
            <ul className="space-y-2.5 text-xs sm:text-sm text-gray-400">
              <li className="flex items-center gap-2">
                <span className="text-[#a5faf7]">✓</span> 100% Pure Desi Ghee
              </li>
              <li className="flex items-center gap-2">
                <span className="text-[#a5faf7]">✓</span> Fresh Daily Preparation
              </li>
              <li className="flex items-center gap-2">
                <span className="text-[#a5faf7]">✓</span> Tamper-proof Packaging
              </li>
              <li className="flex items-center gap-2">
                <span className="text-[#a5faf7]">✓</span> Fast Doorstep Delivery
              </li>
              <li className="flex items-center gap-2">
                <span className="text-[#a5faf7]">✓</span> Custom Festive Gift Boxes
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h3 className="text-sm font-semibold tracking-wider text-blue-100 uppercase mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#a5faf7]" />
              Get In Touch
            </h3>
            <ul className="space-y-3 text-xs sm:text-sm text-gray-400">
              <li className="flex items-start gap-3">
                <LuMapPin className="text-[#a5faf7] text-base shrink-0 mt-0.5" />
                <span>Main Market, Vindhyachal, Mirzapur, Uttar Pradesh</span>
              </li>
              <li className="flex items-center gap-3">
                <LuPhone className="text-[#a5faf7] text-base shrink-0" />
                <a href="tel:+919585774749" className="hover:text-[#a5faf7] transition-colors">
                  +91-9585774749
                </a>
              </li>
              <li className="flex items-center gap-3">
                <LuMail className="text-[#a5faf7] text-base shrink-0" />
                <a href="mailto:contact@sweets.com" className="hover:text-[#a5faf7] transition-colors">
                  contact@sweets.com
                </a>
              </li>
              <li className="flex items-center gap-3">
                <LuClock className="text-[#a5faf7] text-base shrink-0" />
                <span>Mon - Sun: 8:00 AM - 10:00 PM</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Glowing Gradient Divider Line */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-[#a5faf7]/25 to-transparent mb-8" />

        {/* Bottom Bar: Copyright & Attribution */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500 text-center sm:text-left">
          <p>
            Copyright © 2026 <span className="text-gray-300 font-medium">Maa Vindhyavasini Sweets</span>. All Rights Reserved.
          </p>
          <p className="flex items-center gap-1 text-gray-400">
            Freshness Guaranteed • Handcrafted with Tradition
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;