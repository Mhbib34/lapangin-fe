import React from "react";

const Footer = () => {
  return (
    <footer className="mt-16 text-center">
      <div className="backdrop-blur-xl bg-white/10 rounded-3xl p-6 border border-white/20 shadow-2xl">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <p className="text-white/80 mb-4 md:mb-0">
            © 2025 Lapangin. Platform booking lapangan olahraga terpercaya di
            Indonesia.
          </p>
          <div className="flex items-center space-x-6 text-white/60">
            <a href="#" className="hover:text-white transition-colors">
              Syarat & Ketentuan
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Kebijakan Privasi
            </a>
            <a href="#" className="hover:text-white transition-colors">
              FAQ
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
