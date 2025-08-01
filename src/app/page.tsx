"use client";
import React, { useState, useEffect } from "react";
import { useFieldStore } from "@/store/field-store";
import { useShallow } from "zustand/shallow";
import PremiumGlassLoader from "@/components/LoadingAnimations";
import HomeFieldCard from "./components/HomeFieldCard";
import HomeSearchFilters from "./components/HomeSearchFilters";
import UsersSidebar from "./components/UsersSidebar";
import TopBar from "./components/TopBar";
import PopularFeatures from "./components/PopularFeatures";
import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";
import Pagination from "./admin/components/Pagination";
import { useDebouncedValue } from "@/utils/useDebounce";
import FieldBookingModal from "./components/FieldBookingModal";
import { Field } from "@/type/fields";

const HomePage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSport, setSelectedSport] = useState<string>("Semua");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [sortBy, setSortBy] = useState("popular");
  const [priceRange, setPriceRange] = useState([0, 200000]);
  const [showFilters, setShowFilters] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedField, setSelectedField] = useState<Field | null>(null);
  const useDebounce = useDebouncedValue(searchTerm, 500);

  const { fetchFieldPage, fieldsPage, loading } = useFieldStore(
    useShallow((s) => ({
      fetchFieldPage: s.fetchFieldPage,
      fieldsPage: s.fieldsPage,
      loading: s.loading,
    }))
  );

  useEffect(() => {
    fetchFieldPage(currentPage, {
      name: useDebounce,
      location: useDebounce,
      category: useDebounce,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, useDebounce]);

  if (loading) return <PremiumGlassLoader />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Sidebar */}
      <UsersSidebar
        sidebarOpen={sidebarOpen}
        sidebarCollapsed={sidebarCollapsed}
        setSidebarCollapsed={setSidebarCollapsed}
        setSidebarOpen={setSidebarOpen}
      />
      {/* Main Content */}
      <div
        className={`transition-all duration-300 ${
          sidebarCollapsed ? "lg:ml-24" : "lg:ml-80"
        }`}
      >
        {/* Top Bar */}
        <TopBar setSidebarOpen={setSidebarOpen} />

        {/* Content Area */}
        <div className="p-4 lg:p-6">
          <>
            {/* Search and Filter Section */}
            <HomeSearchFilters
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              selectedSport={selectedSport}
              setSelectedSport={setSelectedSport}
              priceRange={priceRange}
              setPriceRange={setPriceRange}
              showFilters={showFilters}
              setShowFilters={setShowFilters}
              sortBy={sortBy}
              setSortBy={setSortBy}
            />

            {/* Sports Fields Grid */}
            <HomeFieldCard
              fieldsPage={fieldsPage}
              setSearchTerm={setSearchTerm}
              setSelectedSport={setSelectedSport}
              setPriceRange={setPriceRange}
              setIsModalOpen={setIsModalOpen}
              setSelectedField={setSelectedField}
            />
            <Pagination
              currentPage={fieldsPage.paging.current_page}
              totalPages={fieldsPage.paging.total_page}
              onPageChange={(page) => setCurrentPage(page)}
            />

            <FieldBookingModal
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              field={selectedField!}
            />
            {/* Popular Features Section */}
            <PopularFeatures />

            {/* Contact Section */}
            <ContactSection />

            {/* Footer */}
            <Footer />
          </>
        </div>
      </div>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default HomePage;
