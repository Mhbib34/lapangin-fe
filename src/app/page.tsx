"use client";
import React, { useState, useEffect } from "react";
import {
  Search,
  Calendar,
  Clock,
  MapPin,
  Star,
  Users,
  Filter,
  ChevronRight,
  Menu,
  X,
  Home,
  User,
  BookOpen,
  History,
  Settings,
  Bell,
  Heart,
  Share2,
  Phone,
  Mail,
  MessageCircle,
  TrendingUp,
  Award,
  Shield,
  Zap,
  ChevronDown,
  Eye,
  SlidersHorizontal,
} from "lucide-react";
import { time } from "console";

// Types
interface SportField {
  id: string;
  name: string;
  type: "Futsal" | "Badminton" | "Basket" | "Tenis" | "Voli";
  location: string;
  rating: number;
  price: number;
  image: string;
  available: boolean;
  features: string[];
  distance: number;
  reviews: number;
  openTime: string;
  closeTime: string;
  popular: boolean;
}

interface Booking {
  id: string;
  fieldName: string;
  date: string;
  time: string;
  status: "confirmed" | "pending" | "cancelled";
}

interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
}

// Mock data
const mockFields: SportField[] = [
  {
    id: "1",
    name: "Arena Futsal Premier",
    type: "Futsal",
    location: "Medan Baru",
    rating: 4.8,
    price: 120000,
    image: "/api/placeholder/300/200",
    available: true,
    features: ["AC", "Parkir Luas", "Kantin", "CCTV"],
    distance: 2.5,
    reviews: 128,
    openTime: "06:00",
    closeTime: "23:00",
    popular: true,
  },
  {
    id: "2",
    name: "Badminton Center Elite",
    type: "Badminton",
    location: "Medan Timur",
    rating: 4.7,
    price: 80000,
    image: "/api/placeholder/300/200",
    available: true,
    features: ["AC", "Shuttle Premium", "Locker", "Shower"],
    distance: 3.2,
    reviews: 95,
    openTime: "05:00",
    closeTime: "22:00",
    popular: false,
  },
  {
    id: "3",
    name: "Basketball Court Pro",
    type: "Basket",
    location: "Medan Selatan",
    rating: 4.6,
    price: 100000,
    image: "/api/placeholder/300/200",
    available: false,
    features: ["Indoor", "Tribun", "Sound System", "Score Board"],
    distance: 4.1,
    reviews: 76,
    openTime: "07:00",
    closeTime: "21:00",
    popular: true,
  },
  {
    id: "4",
    name: "Tennis Club Exclusive",
    type: "Tenis",
    location: "Medan Utara",
    rating: 4.9,
    price: 150000,
    image: "/api/placeholder/300/200",
    available: true,
    features: ["Outdoor", "Lighting", "Pro Shop", "Coaching"],
    distance: 5.8,
    reviews: 203,
    openTime: "06:00",
    closeTime: "22:00",
    popular: true,
  },
  {
    id: "5",
    name: "Voli Indoor Arena",
    type: "Voli",
    location: "Medan Barat",
    rating: 4.5,
    price: 90000,
    image: "/api/placeholder/300/200",
    available: true,
    features: ["Indoor", "AC", "Tribun", "Net Premium"],
    distance: 3.7,
    reviews: 67,
    openTime: "08:00",
    closeTime: "21:00",
    popular: false,
  },
];

const mockBookings: Booking[] = [
  {
    id: "1",
    fieldName: "Arena Futsal Premier",
    date: "2025-08-01",
    time: "19:00",
    status: "confirmed",
  },
  {
    id: "2",
    fieldName: "Tennis Club Exclusive",
    date: "2025-07-28",
    time: "16:00",
    status: "pending",
  },
];

const mockNotifications: Notification[] = [
  {
    id: "1",
    title: "Booking Dikonfirmasi",
    message: "Booking Anda di Arena Futsal Premier telah dikonfirmasi",
    time: "2 jam lalu",
    read: false,
  },
  {
    id: "2",
    title: "Promo Spesial!",
    message: "Dapatkan diskon 20% untuk booking hari weekday",
    time: "1 hari lalu",
    read: true,
  },
];

const HomePage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSport, setSelectedSport] = useState<string>("Semua");
  const [filteredFields, setFilteredFields] =
    useState<SportField[]>(mockFields);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeView, setActiveView] = useState("home");
  const [sortBy, setSortBy] = useState("popular");
  const [priceRange, setPriceRange] = useState([0, 200000]);
  const [showFilters, setShowFilters] = useState(false);
  const [favoriteFields, setFavoriteFields] = useState<string[]>(["1", "4"]);
  const [notifications, setNotifications] = useState(mockNotifications);

  const sportTypes = [
    "Semua",
    "Futsal",
    "Badminton",
    "Basket",
    "Tenis",
    "Voli",
  ];
  const sortOptions = [
    { value: "popular", label: "Paling Populer" },
    { value: "rating", label: "Rating Tertinggi" },
    { value: "price-low", label: "Harga Terendah" },
    { value: "price-high", label: "Harga Tertinggi" },
    { value: "distance", label: "Terdekat" },
  ];

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    let filtered = mockFields;

    // Filter by sport type
    if (selectedSport !== "Semua") {
      filtered = filtered.filter((field) => field.type === selectedSport);
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        (field) =>
          field.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          field.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by price range
    filtered = filtered.filter(
      (field) => field.price >= priceRange[0] && field.price <= priceRange[1]
    );

    // Sort results
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "rating":
          return b.rating - a.rating;
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        case "distance":
          return a.distance - b.distance;
        case "popular":
        default:
          return (
            (b.popular ? 1 : 0) - (a.popular ? 1 : 0) || b.rating - a.rating
          );
      }
    });

    setFilteredFields(filtered);
  }, [searchTerm, selectedSport, sortBy, priceRange]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const toggleFavorite = (fieldId: string) => {
    setFavoriteFields((prev) =>
      prev.includes(fieldId)
        ? prev.filter((id) => id !== fieldId)
        : [...prev, fieldId]
    );
  };

  const markNotificationAsRead = (notificationId: string) => {
    setNotifications((prev) =>
      prev.map((notif) =>
        notif.id === notificationId ? { ...notif, read: true } : notif
      )
    );
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  const sidebarItems = [
    { id: "home", icon: Home, label: "Beranda", count: null },
    {
      id: "bookings",
      icon: BookOpen,
      label: "Booking Saya",
      count: mockBookings.length,
    },
    { id: "history", icon: History, label: "Riwayat", count: null },
    {
      id: "favorites",
      icon: Heart,
      label: "Favorit",
      count: favoriteFields.length,
    },
    {
      id: "notifications",
      icon: Bell,
      label: "Notifikasi",
      count: unreadCount,
    },
    { id: "profile", icon: User, label: "Profil", count: null },
    { id: "settings", icon: Settings, label: "Pengaturan", count: null },
  ];

  const renderSidebarContent = () => {
    switch (activeView) {
      case "bookings":
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white mb-4">Booking Saya</h3>
            {mockBookings.map((booking) => (
              <div
                key={booking.id}
                className="backdrop-blur-xl bg-white/10 rounded-2xl p-4 border border-white/20"
              >
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-semibold text-white">
                    {booking.fieldName}
                  </h4>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      booking.status === "confirmed"
                        ? "bg-green-500/20 text-green-300"
                        : booking.status === "pending"
                        ? "bg-yellow-500/20 text-yellow-300"
                        : "bg-red-500/20 text-red-300"
                    }`}
                  >
                    {booking.status}
                  </span>
                </div>
                <div className="text-white/70 text-sm space-y-1">
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4" />
                    <span>
                      {new Date(booking.date).toLocaleDateString("id-ID")}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4" />
                    <span>{booking.time}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        );

      case "notifications":
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white mb-4">Notifikasi</h3>
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={`backdrop-blur-xl bg-white/10 rounded-2xl p-4 border border-white/20 cursor-pointer transition-all hover:bg-white/20 ${
                  !notification.read ? "border-cyan-400/50" : ""
                }`}
                onClick={() => markNotificationAsRead(notification.id)}
              >
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-semibold text-white">
                    {notification.title}
                  </h4>
                  {!notification.read && (
                    <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                  )}
                </div>
                <p className="text-white/70 text-sm mb-1">
                  {notification.message}
                </p>
                <p className="text-white/50 text-xs">{notification.time}</p>
              </div>
            ))}
          </div>
        );

      case "favorites":
        const favoriteFieldsData = mockFields.filter((field) =>
          favoriteFields.includes(field.id)
        );
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white mb-4">Favorit Saya</h3>
            {favoriteFieldsData.map((field) => (
              <div
                key={field.id}
                className="backdrop-blur-xl bg-white/10 rounded-2xl p-4 border border-white/20"
              >
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-semibold text-white">{field.name}</h4>
                  <button
                    onClick={() => toggleFavorite(field.id)}
                    className="text-red-400 hover:text-red-300 transition-colors"
                  >
                    <Heart className="w-5 h-5 fill-current" />
                  </button>
                </div>
                <div className="flex items-center space-x-2 text-white/70 text-sm mb-2">
                  <MapPin className="w-4 h-4" />
                  <span>{field.location}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-white text-sm">{field.rating}</span>
                  </div>
                  <span className="text-cyan-300 font-semibold">
                    {formatPrice(field.price)}/jam
                  </span>
                </div>
              </div>
            ))}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 backdrop-blur-xl bg-black/20 border-r border-white/20 transform transition-all duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 ${sidebarCollapsed ? "lg:w-20" : "lg:w-80"} w-80`}
      >
        <div className="flex flex-col h-full">
          {/* Sidebar Header */}
          <div className="p-6 border-b border-white/20">
            <div className="flex items-center justify-between">
              {!sidebarCollapsed && (
                <div>
                  <h2 className="text-2xl font-bold text-white bg-gradient-to-r from-white to-cyan-200 bg-clip-text text-transparent">
                    SportBook
                  </h2>
                  <p className="text-cyan-200/60 text-sm">Dashboard</p>
                </div>
              )}
              <div className="flex items-center space-x-2">
                {/* Desktop Collapse Button */}
                <button
                  onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                  className="hidden lg:block text-white/70 hover:text-white transition-colors p-2 rounded-xl hover:bg-white/10"
                  title={
                    sidebarCollapsed ? "Expand Sidebar" : "Collapse Sidebar"
                  }
                >
                  <Menu
                    className={`w-5 h-5 transition-transform duration-300 ${
                      sidebarCollapsed ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {/* Mobile Close Button */}
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="lg:hidden text-white/70 hover:text-white transition-colors p-2 rounded-xl hover:bg-white/10"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
            {sidebarCollapsed && (
              <div className="text-center mt-2">
                <div className="w-8 h-8 mx-auto bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">SB</span>
                </div>
              </div>
            )}
          </div>

          {/* Navigation */}
          <div className="flex-1 p-6">
            <nav className="space-y-2">
              {sidebarItems.map((item) => (
                <div key={item.id} className="relative group">
                  <button
                    onClick={() => setActiveView(item.id)}
                    className={`w-full flex items-center ${
                      sidebarCollapsed ? "justify-center" : "justify-between"
                    } p-3 rounded-xl transition-all duration-300 ${
                      activeView === item.id
                        ? "bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 text-white"
                        : "text-white/70 hover:text-white hover:bg-white/10"
                    }`}
                    title={sidebarCollapsed ? item.label : ""}
                  >
                    <div
                      className={`flex items-center ${
                        sidebarCollapsed ? "" : "space-x-3"
                      }`}
                    >
                      <item.icon className="w-5 h-5 flex-shrink-0" />
                      {!sidebarCollapsed && (
                        <span className="font-medium">{item.label}</span>
                      )}
                    </div>
                    {!sidebarCollapsed &&
                      item.count !== null &&
                      item.count > 0 && (
                        <span className="px-2 py-1 bg-cyan-500/20 text-cyan-300 rounded-full text-xs font-semibold">
                          {item.count}
                        </span>
                      )}
                    {sidebarCollapsed &&
                      item.count !== null &&
                      item.count > 0 && (
                        <span className="absolute -top-1 -right-1 w-4 h-4 bg-cyan-500 text-white rounded-full text-xs flex items-center justify-center font-semibold">
                          {item.count > 9 ? "9+" : item.count}
                        </span>
                      )}
                  </button>

                  {/* Tooltip for collapsed sidebar */}
                  {sidebarCollapsed && (
                    <div className="absolute left-full ml-2 top-1/2 transform -translate-y-1/2 bg-gray-900 text-white px-2 py-1 rounded-lg text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
                      {item.label}
                      {item.count !== null && item.count > 0 && (
                        <span className="ml-2 px-1 py-0.5 bg-cyan-500 rounded text-xs">
                          {item.count}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </nav>
          </div>

          {/* User Profile Section */}
          <div className="p-6 border-t border-white/20">
            {sidebarCollapsed ? (
              <div className="text-center group relative">
                <div className="w-10 h-10 mx-auto bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-white" />
                </div>
                {/* Tooltip for collapsed profile */}
                <div className="absolute left-full ml-2 top-1/2 transform -translate-y-1/2 bg-gray-900 text-white p-2 rounded-lg text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
                  <div className="font-semibold">John Doe</div>
                  <div className="text-xs text-cyan-300">Member Premium</div>
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="font-semibold text-white">John Doe</div>
                  <div className="text-white/60 text-sm">Member Premium</div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div
        className={`transition-all duration-300 ${
          sidebarCollapsed ? "lg:ml-20" : "lg:ml-80"
        }`}
      >
        {/* Top Bar */}
        <header className="relative z-10 p-4 lg:p-6">
          <div className="backdrop-blur-xl bg-white/10 rounded-3xl p-4 border border-white/20 shadow-2xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setSidebarOpen(true)}
                  className="lg:hidden text-white/70 hover:text-white transition-colors p-2 rounded-xl hover:bg-white/10"
                >
                  <Menu className="w-5 h-5" />
                </button>
                <div>
                  <h1 className="text-2xl lg:text-3xl font-bold text-white">
                    {activeView === "home"
                      ? "Selamat Datang!"
                      : sidebarItems.find((item) => item.id === activeView)
                          ?.label}
                  </h1>
                  <p className="text-cyan-200/80 text-sm">
                    {currentTime.toLocaleDateString("id-ID", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="text-right hidden sm:block">
                  <div className="text-white/90 font-mono text-lg">
                    {currentTime.toLocaleTimeString("id-ID")}
                  </div>
                </div>
                <button className="relative p-2 rounded-xl bg-white/10 border border-white/20 text-white/70 hover:text-white hover:bg-white/20 transition-all">
                  <Bell className="w-5 h-5" />
                  {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-xs flex items-center justify-center text-white">
                      {unreadCount}
                    </span>
                  )}
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="p-4 lg:p-6">
          {activeView === "home" ? (
            <>
              {/* Search and Filter Section */}
              <section className="mb-8">
                <div className="backdrop-blur-xl bg-white/10 rounded-3xl p-6 border border-white/20 shadow-2xl">
                  <div className="grid lg:grid-cols-3 gap-4 mb-4">
                    {/* Search Bar */}
                    <div className="relative lg:col-span-2">
                      <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/70 w-5 h-5" />
                      <input
                        type="text"
                        placeholder="Cari lapangan atau lokasi..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-12 pr-4 py-4 rounded-2xl backdrop-blur-sm bg-white/20 border border-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:border-cyan-400/50 transition-all duration-300"
                      />
                    </div>

                    {/* Advanced Filters Button */}
                    <button
                      onClick={() => setShowFilters(!showFilters)}
                      className="flex items-center justify-center space-x-2 px-4 py-4 rounded-2xl backdrop-blur-sm bg-white/20 border border-white/30 text-white hover:bg-white/30 transition-all duration-300"
                    >
                      <SlidersHorizontal className="w-5 h-5" />
                      <span>Filter</span>
                      <ChevronDown
                        className={`w-4 h-4 transition-transform ${
                          showFilters ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                  </div>

                  {/* Advanced Filters */}
                  {showFilters && (
                    <div className="grid md:grid-cols-3 gap-4 pt-4 border-t border-white/20">
                      <div>
                        <label className="block text-white/80 text-sm mb-2">
                          Jenis Olahraga
                        </label>
                        <select
                          value={selectedSport}
                          onChange={(e) => setSelectedSport(e.target.value)}
                          className="w-full px-4 py-3 rounded-xl backdrop-blur-sm bg-white/20 border border-white/30 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400/50 appearance-none"
                        >
                          {sportTypes.map((sport) => (
                            <option
                              key={sport}
                              value={sport}
                              className="bg-gray-800"
                            >
                              {sport}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-white/80 text-sm mb-2">
                          Urutkan
                        </label>
                        <select
                          value={sortBy}
                          onChange={(e) => setSortBy(e.target.value)}
                          className="w-full px-4 py-3 rounded-xl backdrop-blur-sm bg-white/20 border border-white/30 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400/50 appearance-none"
                        >
                          {sortOptions.map((option) => (
                            <option
                              key={option.value}
                              value={option.value}
                              className="bg-gray-800"
                            >
                              {option.label}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-white/80 text-sm mb-2">
                          Rentang Harga: {formatPrice(priceRange[0])} -{" "}
                          {formatPrice(priceRange[1])}
                        </label>
                        <div className="flex space-x-2">
                          <input
                            type="range"
                            min="0"
                            max="200000"
                            step="10000"
                            value={priceRange[0]}
                            onChange={(e) =>
                              setPriceRange([
                                parseInt(e.target.value),
                                priceRange[1],
                              ])
                            }
                            className="flex-1"
                          />
                          <input
                            type="range"
                            min="0"
                            max="200000"
                            step="10000"
                            value={priceRange[1]}
                            onChange={(e) =>
                              setPriceRange([
                                priceRange[0],
                                parseInt(e.target.value),
                              ])
                            }
                            className="flex-1"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </section>

              {/* Quick Stats */}
              <section className="mb-8">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  {[
                    {
                      label: "Total Lapangan",
                      value: "24+",
                      icon: MapPin,
                      color: "from-cyan-500/20 to-blue-500/20",
                    },
                    {
                      label: "Booking Hari Ini",
                      value: "15",
                      icon: Calendar,
                      color: "from-green-500/20 to-emerald-500/20",
                    },
                    {
                      label: "Rating Rata-rata",
                      value: "4.8",
                      icon: Star,
                      color: "from-yellow-500/20 to-orange-500/20",
                    },
                    {
                      label: "User Aktif",
                      value: "1.2K+",
                      icon: Users,
                      color: "from-purple-500/20 to-pink-500/20",
                    },
                  ].map((stat, index) => (
                    <div
                      key={index}
                      className="backdrop-blur-xl bg-white/10 rounded-2xl p-4 border border-white/20 shadow-xl hover:bg-white/20 transition-all duration-300 group"
                    >
                      <div className="flex items-center space-x-3">
                        <div
                          className={`p-3 rounded-xl bg-gradient-to-r ${stat.color} group-hover:scale-110 transition-transform duration-300`}
                        >
                          <stat.icon className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-white">
                            {stat.value}
                          </div>
                          <div className="text-xs text-white/70">
                            {stat.label}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Sports Fields Grid */}
              <section>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-white">
                    Lapangan Tersedia
                  </h2>
                  <div className="flex items-center space-x-4">
                    <div className="text-cyan-200/80">
                      {filteredFields.length} lapangan ditemukan
                    </div>
                    <button className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-white/10 border border-white/20 text-white/70 hover:text-white hover:bg-white/20 transition-all">
                      <Eye className="w-4 h-4" />
                      <span>Tampilan</span>
                    </button>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filteredFields.map((field) => (
                    <div
                      key={field.id}
                      className="backdrop-blur-xl bg-white/10 rounded-3xl p-6 border border-white/20 shadow-2xl hover:bg-white/20 hover:scale-105 transition-all duration-500 group cursor-pointer"
                    >
                      {/* Field Header */}
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center space-x-2">
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
                        </div>

                        <div className="flex items-center space-x-2">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleFavorite(field.id);
                            }}
                            className={`p-2 rounded-full border transition-all ${
                              favoriteFields.includes(field.id)
                                ? "bg-red-500/20 border-red-500/30 text-red-400"
                                : "bg-white/10 border-white/20 text-white/70 hover:text-red-400"
                            }`}
                          >
                            <Heart
                              className={`w-4 h-4 ${
                                favoriteFields.includes(field.id)
                                  ? "fill-current"
                                  : ""
                              }`}
                            />
                          </button>
                          <button className="p-2 rounded-full bg-white/10 border border-white/20 text-white/70 hover:text-white transition-all">
                            <Share2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      {/* Field Image */}
                      <div className="relative mb-4 overflow-hidden rounded-2xl">
                        <div className="w-full h-48 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 flex items-center justify-center">
                          <div className="text-6xl opacity-30">🏟️</div>
                        </div>
                        <div className="absolute bottom-3 left-3 flex items-center space-x-1 px-2 py-1 bg-black/50 backdrop-blur-sm rounded-lg">
                          <MapPin className="w-3 h-3 text-white/80" />
                          <span className="text-white/80 text-xs">
                            {field.distance}km
                          </span>
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
                                {field.type}
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
                              <span className="text-white font-semibold">
                                {field.rating}
                              </span>
                              <span className="text-white/60 text-sm">
                                ({field.reviews})
                              </span>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2 text-sm text-white/70">
                            <Clock className="w-4 h-4" />
                            <span>
                              {field.openTime}-{field.closeTime}
                            </span>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-1">
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
                        </div>

                        <div className="flex items-center justify-between pt-3 border-t border-white/20">
                          <div>
                            <div className="text-2xl font-bold text-white">
                              {formatPrice(field.price)}
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
                              className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold hover:from-cyan-600 hover:to-blue-600 transition-all duration-300 shadow-lg hover:shadow-xl group-hover:scale-105 flex items-center space-x-2"
                              disabled={!field.available}
                            >
                              <span>
                                {field.available ? "Book Now" : "Penuh"}
                              </span>
                              {field.available && (
                                <ChevronRight className="w-4 h-4" />
                              )}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {filteredFields.length === 0 && (
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

              {/* Popular Features Section */}
              <section className="mt-12">
                <h2 className="text-2xl font-bold text-white mb-6">
                  Kenapa Pilih SportBook?
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

              {/* Contact Section */}
              <section className="mt-12">
                <div className="backdrop-blur-xl bg-white/10 rounded-3xl p-8 border border-white/20 shadow-2xl">
                  <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-white mb-2">
                      Butuh Bantuan?
                    </h2>
                    <p className="text-white/70">
                      Tim customer service kami siap membantu Anda 24/7
                    </p>
                  </div>
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="text-center">
                      <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-r from-cyan-500/20 to-blue-500/20 flex items-center justify-center">
                        <Phone className="w-8 h-8 text-cyan-300" />
                      </div>
                      <h3 className="font-bold text-white mb-2">Telepon</h3>
                      <p className="text-white/70">+62 821-xxxx-xxxx</p>
                    </div>
                    <div className="text-center">
                      <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-r from-green-500/20 to-emerald-500/20 flex items-center justify-center">
                        <MessageCircle className="w-8 h-8 text-green-300" />
                      </div>
                      <h3 className="font-bold text-white mb-2">WhatsApp</h3>
                      <p className="text-white/70">Chat langsung dengan CS</p>
                    </div>
                    <div className="text-center">
                      <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-r from-purple-500/20 to-pink-500/20 flex items-center justify-center">
                        <Mail className="w-8 h-8 text-purple-300" />
                      </div>
                      <h3 className="font-bold text-white mb-2">Email</h3>
                      <p className="text-white/70">support@sportbook.com</p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Footer */}
              <footer className="mt-16 text-center">
                <div className="backdrop-blur-xl bg-white/10 rounded-3xl p-6 border border-white/20 shadow-2xl">
                  <div className="flex flex-col md:flex-row items-center justify-between">
                    <p className="text-white/80 mb-4 md:mb-0">
                      © 2025 SportBook. Platform booking lapangan olahraga
                      terpercaya di Medan.
                    </p>
                    <div className="flex items-center space-x-6 text-white/60">
                      <a
                        href="#"
                        className="hover:text-white transition-colors"
                      >
                        Syarat & Ketentuan
                      </a>
                      <a
                        href="#"
                        className="hover:text-white transition-colors"
                      >
                        Kebijakan Privasi
                      </a>
                      <a
                        href="#"
                        className="hover:text-white transition-colors"
                      >
                        FAQ
                      </a>
                    </div>
                  </div>
                </div>
              </footer>
            </>
          ) : (
            <div className="backdrop-blur-xl bg-white/10 rounded-3xl p-6 border border-white/20 shadow-2xl">
              {renderSidebarContent()}
            </div>
          )}
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
