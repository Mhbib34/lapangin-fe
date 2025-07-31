import { Award, Shield, Zap } from "lucide-react";
import React from "react";

const PopularFeatures = () => {
  return (
    <section className="mt-12">
      <h2 className="text-2xl font-bold text-white mb-6">
        Kenapa Pilih Lapangin?
      </h2>
      <div className="grid md:grid-cols-3 gap-6">
        {[
          {
            icon: Shield,
            title: "Booking Aman",
            description:
              "Sistem pembayaran yang aman dan terpercaya dengan jaminan uang kembali",
            color: "from-green-500/20 to-emerald-500/20",
          },
          {
            icon: Zap,
            title: "Booking Instan",
            description:
              "Konfirmasi booking langsung tanpa perlu menunggu lama",
            color: "from-yellow-500/20 to-orange-500/20",
          },
          {
            icon: Award,
            title: "Lapangan Berkualitas",
            description:
              "Hanya lapangan terbaik dengan fasilitas lengkap dan terawat",
            color: "from-purple-500/20 to-pink-500/20",
          },
        ].map((feature, index) => (
          <div
            key={index}
            className="backdrop-blur-xl bg-white/10 rounded-3xl p-6 border border-white/20 shadow-2xl hover:bg-white/20 transition-all duration-300 group"
          >
            <div
              className={`w-12 h-12 rounded-2xl bg-gradient-to-r ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
            >
              <feature.icon className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">
              {feature.title}
            </h3>
            <p className="text-white/70">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PopularFeatures;
