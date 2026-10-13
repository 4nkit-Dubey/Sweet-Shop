import { useNavigate, Link } from "react-router-dom";
import { TiHomeOutline, TiArrowLeft } from "react-icons/ti";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="fixed inset-0 overflow-hidden bg-linear-to-l from-[#141414] to-[#0c2025] flex items-center justify-center px-4">
      <div className="w-full max-w-md text-center py-12">
        {/* Error Code */}
        <div className="mb-8">
          <span className="text-7xl md:text-9xl font-bold bg-linear-to-r from-[#a5faf7] to-[#67e8f9] bg-clip-text text-transparent">
            404
          </span>
        </div>

        {/* Title */}
        <h1 className="text-2xl md:text-3xl font-bold text-white mb-4 font-serif">
          Page Not Found
        </h1>

        {/* Description */}
        <p className="text-white/70 mb-8 text-base md:text-lg leading-relaxed">
          This admin page doesn&apos;t exist. It might have been moved or removed.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            to="/"
            onClick={() => navigate("/")}
            className="w-full sm:w-auto px-6 py-3 bg-[#a5faf7] text-[#0c2025] font-bold rounded-xl hover:bg-[#a5faf7]/90 transition-all duration-300 shadow-[0_0_15px_rgba(165,250,247,0.3)] hover:shadow-[0_0_20px_rgba(165,250,247,0.5)] flex items-center justify-center gap-2"
          >
            <TiHomeOutline className="w-5 h-5" />
            Dashboard
          </Link>

          <button
            onClick={() => navigate(-1)}
            className="w-full sm:w-auto px-6 py-3 border-2 border-white/20 text-white font-bold rounded-xl hover:border-[#a5faf7] hover:bg-white/5 transition-all duration-300 flex items-center justify-center gap-2"
          >
            <TiArrowLeft className="w-5 h-5" />
            Go Back
          </button>
        </div>

        {/* Quick Links */}
        <div className="mt-10 pt-8 border-t border-white/10">
          <p className="text-white/50 text-sm mb-4">Quick Navigation</p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              to="/add"
              onClick={() => navigate("/add")}
              className="px-4 py-2 border border-white/20 text-white/80 font-medium rounded-xl hover:border-[#a5faf7] hover:text-white hover:bg-white/5 transition-all duration-300 text-sm"
            >
              Add Items
            </Link>
            <Link
              to="/lists"
              onClick={() => navigate("/lists")}
              className="px-4 py-2 border border-white/20 text-white/80 font-medium rounded-xl hover:border-[#a5faf7] hover:text-white hover:bg-white/5 transition-all duration-300 text-sm"
            >
              View Items
            </Link>
            <Link
              to="/order"
              onClick={() => navigate("/order")}
              className="px-4 py-2 border border-white/20 text-white/80 font-medium rounded-xl hover:border-[#a5faf7] hover:text-white hover:bg-white/5 transition-all duration-300 text-sm"
            >
              Manage Orders
            </Link>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="mt-12 flex justify-center gap-2">
          <span className="w-3 h-3 rounded-full bg-[#a5faf7]/30 animate-bounce" style={{ animationDelay: '0ms' }} />
          <span className="w-3 h-3 rounded-full bg-[#a5faf7]/50 animate-bounce" style={{ animationDelay: '150ms' }} />
          <span className="w-3 h-3 rounded-full bg-[#a5faf7]/70 animate-bounce" style={{ animationDelay: '300ms' }} />
        </div>
      </div>
    </div>
  );
};

export default NotFound;