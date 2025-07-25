import React from "react";

const PremiumGlassLoader: React.FC = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 overflow-hidden">
      {/* Animated background orbs */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/30 rounded-full filter blur-3xl animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/30 rounded-full filter blur-3xl animate-pulse animation-delay-1000"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-500/20 rounded-full filter blur-3xl animate-pulse animation-delay-2000"></div>

      {/* Main glass container */}
      <div className="relative">
        {/* Primary glass card */}
        <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-10 shadow-2xl relative overflow-hidden">
          {/* Inner glow effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-3xl"></div>

          <div className="relative flex flex-col items-center space-y-8">
            {/* Multi-layer spinner */}
            <div className="relative w-20 h-20">
              {/* Outer ring */}
              <div className="absolute inset-0 border-2 border-white/20 rounded-full"></div>
              {/* Spinning gradient ring */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-blue-400/80 to-transparent animate-spin"></div>
              <div className="absolute inset-1 rounded-full bg-gradient-to-r from-transparent via-purple-400/80 to-transparent animate-spin-slow"></div>
              <div className="absolute inset-2 rounded-full bg-gradient-to-r from-transparent via-pink-400/80 to-transparent animate-spin-reverse"></div>
              {/* Center dot */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-6 h-6 bg-white/40 rounded-full animate-pulse"></div>
              </div>
            </div>

            {/* Animated text */}
            <div className="text-center space-y-2">
              <div className="text-white/90 text-xl font-light tracking-[0.3em] animate-fade-in-out">
                LOADING
              </div>
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-blue-400/80 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-purple-400/80 rounded-full animate-bounce animation-delay-200"></div>
                <div className="w-2 h-2 bg-pink-400/80 rounded-full animate-bounce animation-delay-400"></div>
              </div>
            </div>

            {/* Progress indicator */}
            <div className="w-56 h-1 bg-white/10 rounded-full overflow-hidden backdrop-blur-sm">
              <div className="h-full bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 rounded-full animate-progress"></div>
            </div>
          </div>
        </div>

        {/* Floating glass particles */}
        <div className="absolute -top-6 -left-6 w-12 h-12 bg-white/5 backdrop-blur-md border border-white/10 rounded-full animate-float-1"></div>
        <div className="absolute -bottom-8 -right-8 w-8 h-8 bg-white/5 backdrop-blur-md border border-white/10 rounded-full animate-float-2"></div>
        <div className="absolute top-0 -right-4 w-6 h-6 bg-white/5 backdrop-blur-md border border-white/10 rounded-full animate-float-3"></div>
        <div className="absolute -bottom-4 -left-4 w-10 h-10 bg-white/5 backdrop-blur-md border border-white/10 rounded-full animate-float-1"></div>
      </div>

      {/* Custom animations */}
      <style jsx>{`
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes spin-reverse {
          from {
            transform: rotate(360deg);
          }
          to {
            transform: rotate(0deg);
          }
        }

        @keyframes fade-in-out {
          0%,
          100% {
            opacity: 0.6;
          }
          50% {
            opacity: 1;
          }
        }

        @keyframes progress {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(400%);
          }
        }

        @keyframes float-1 {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(180deg);
          }
        }

        @keyframes float-2 {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-30px) rotate(-180deg);
          }
        }

        @keyframes float-3 {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-15px) rotate(90deg);
          }
        }

        .animate-spin-slow {
          animation: spin-slow 3s linear infinite;
        }

        .animate-spin-reverse {
          animation: spin-reverse 2s linear infinite;
        }

        .animate-fade-in-out {
          animation: fade-in-out 2s ease-in-out infinite;
        }

        .animate-progress {
          animation: progress 3s ease-in-out infinite;
        }

        .animate-float-1 {
          animation: float-1 4s ease-in-out infinite;
        }

        .animate-float-2 {
          animation: float-2 5s ease-in-out infinite;
        }

        .animate-float-3 {
          animation: float-3 3.5s ease-in-out infinite;
        }

        .animation-delay-200 {
          animation-delay: 0.2s;
        }

        .animation-delay-400 {
          animation-delay: 0.4s;
        }

        .animation-delay-1000 {
          animation-delay: 1s;
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }
      `}</style>
    </div>
  );
};

export default PremiumGlassLoader;
