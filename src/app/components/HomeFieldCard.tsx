import { Field, FieldPage } from "@/type/fields";
import { Format } from "@/utils/format";
import {
  ChevronRight,
  Clock,
  Heart,
  MapPin,
  MessageCircle,
  Phone,
  Share2,
  Star,
} from "lucide-react";
import Image from "next/image";
import React from "react";

type Props = {
  fieldsPage: FieldPage;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  setSelectedSport: React.Dispatch<React.SetStateAction<string>>;
  setPriceRange: React.Dispatch<React.SetStateAction<number[]>>;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedField: React.Dispatch<React.SetStateAction<Field | null>>;
};

const HomeFieldCard = ({
  fieldsPage,
  setSearchTerm,
  setSelectedSport,
  setPriceRange,
  setIsModalOpen,
  setSelectedField,
}: Props) => {
  return (
    <section className="mb-12">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white">Lapangan Tersedia</h2>
        <div className="flex items-center space-x-4">
          <div className="text-cyan-200/80 hidden md:block">
            {fieldsPage.data.length} lapangan ditemukan
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {fieldsPage.data.map((field) => (
          <div
            key={field.id}
            className="backdrop-blur-xl bg-white/10 rounded-3xl p-6 border border-white/20 shadow-2xl hover:bg-white/20 hover:scale-105 transition-all duration-500 group cursor-pointer"
          >
            {/* Field Header */}
            <div className="flex items-start justify-between mb-4">
              {/* <div className="flex items-center space-x-2">
                          {field.popular && (
                            <div className="flex items-center space-x-1 px-2 py-1 bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-full border border-orange-500/30">
                              <TrendingUp className="w-3 h-3 text-orange-300" />
                              <span className="text-xs text-orange-300 font-semibold">
                                Popular
                              </span>
                            </div>
                          )}
                          <div
                            className={`px-3 py-1 rounded-full text-xs font-semibold ${
                              field.available
                                ? "bg-green-500/20 text-green-300 border border-green-500/30"
                                : "bg-red-500/20 text-red-300 border border-red-500/30"
                            }`}
                          >
                            {field.available ? "Tersedia" : "Penuh"}
                          </div>
                        </div> */}

              <div className="flex items-center space-x-2">
                <button
                  //   onClick={(e) => {
                  //     e.stopPropagation();
                  //     toggleFavorite(field.id);
                  //   }}
                  className={`p-2 rounded-full border transition-all bg-white/10 border-white/20 text-white/70 hover:text-red-400"
                  `}
                >
                  <Heart className={`w-4 h-4`} />
                </button>
                <button className="p-2 rounded-full bg-white/10 border border-white/20 text-white/70 hover:text-white transition-all">
                  <Share2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Field Image */}
            <div className="relative mb-4 h-48 overflow-hidden rounded-2xl">
              <Image
                src={field.image!}
                alt={field.name}
                fill
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute bottom-3 left-3 flex items-center space-x-1 px-2 py-1 bg-black/50 backdrop-blur-sm rounded-lg">
                <MapPin className="w-3 h-3 text-white/80" />
                <span className="text-white/80 text-xs">{field.status}</span>
              </div>
            </div>

            {/* Field Info */}
            <div className="space-y-3">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-bold text-white text-lg group-hover:text-cyan-200 transition-colors">
                    {field.name}
                  </h3>
                  <div className="px-3 py-1 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30">
                    <span className="text-purple-200 text-sm font-semibold">
                      {field.category}
                    </span>
                  </div>
                </div>
                <div className="flex items-center space-x-2 text-white/70">
                  <MapPin className="w-4 h-4" />
                  <span className="text-sm">{field.location}</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-white font-semibold">4.8</span>
                    <span className="text-white/60 text-sm">200</span>
                  </div>
                </div>
                <div className="flex items-center space-x-2 text-sm text-white/70">
                  <Clock className="w-4 h-4" />
                  <span>{field.operationalHour}</span>
                </div>
              </div>

              {/* <div className="flex flex-wrap gap-1">
                          {field.features.slice(0, 3).map((feature, index) => (
                            <span
                              key={index}
                              className="px-2 py-1 text-xs rounded-lg bg-white/10 text-white/80 border border-white/20"
                            >
                              {feature}
                            </span>
                          ))}
                          {field.features.length > 3 && (
                            <span className="px-2 py-1 text-xs rounded-lg bg-white/10 text-white/80 border border-white/20">
                              +{field.features.length - 3}
                            </span>
                          )}
                        </div> */}

              <div className="flex items-center justify-between pt-3 border-t border-white/20">
                <div>
                  <div className="text-2xl font-bold text-white">
                    {Format.formatCurrency(field.pricePerHour)}
                  </div>
                  <div className="text-xs text-white/70">per jam</div>
                </div>
                <div className="flex items-center space-x-2">
                  <button className="p-2 rounded-xl bg-white/10 border border-white/20 text-white/70 hover:text-white hover:bg-white/20 transition-all">
                    <Phone className="w-4 h-4" />
                  </button>
                  <button className="p-2 rounded-xl bg-white/10 border border-white/20 text-white/70 hover:text-white hover:bg-white/20 transition-all">
                    <MessageCircle className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => {
                      setSelectedField(field); // kirim data field ke state
                      setIsModalOpen(true); // buka modal
                    }}
                    className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold hover:from-cyan-600 hover:to-blue-600 transition-all duration-300 shadow-lg hover:shadow-xl group-hover:scale-105 flex items-center space-x-2"
                    disabled={!field.status}
                  >
                    {/* <span>
                                {field.available ? "Book Now" : "Penuh"}
                              </span> */}
                    {field.status && <ChevronRight className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {fieldsPage.data.length === 0 && (
        <div className="text-center py-12">
          <div className="backdrop-blur-xl bg-white/10 rounded-3xl p-8 border border-white/20 shadow-2xl inline-block">
            <div className="text-6xl mb-4 opacity-50">🏟️</div>
            <h3 className="text-xl font-semibold text-white mb-2">
              Tidak ada lapangan ditemukan
            </h3>
            <p className="text-white/70 mb-4">
              Coba ubah kriteria pencarian Anda
            </p>
            <button
              onClick={() => {
                setSearchTerm("");
                setSelectedSport("Semua");
                setPriceRange([0, 200000]);
              }}
              className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-xl hover:from-cyan-600 hover:to-blue-600 transition-all"
            >
              Reset Filter
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default HomeFieldCard;
