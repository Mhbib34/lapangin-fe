"use client";
import React, { useState } from "react";
import {
  Settings,
  User,
  Bell,
  Shield,
  Database,
  Palette,
  Globe,
  Mail,
  CreditCard,
  Save,
  Eye,
  EyeOff,
  Upload,
  Download,
  RefreshCw,
  AlertCircle,
  Moon,
  Sun,
  Smartphone,
  Lock,
  Key,
  Zap,
} from "lucide-react";

interface SettingsSection {
  id: string;
  title: string;
  icon: React.ReactNode;
  description: string;
}

const SettingsPage = () => {
  const [activeSection, setActiveSection] = useState("profile");
  const [showPassword, setShowPassword] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    sms: false,
    booking: true,
    payment: true,
    maintenance: false,
  });
  const [profile, setProfile] = useState({
    name: "Admin Lapagin",
    email: "admin@lapagin.com",
    phone: "+62 812-3456-7890",
    role: "Super Admin",
    avatar: "👨‍💼",
  });

  const settingSections: SettingsSection[] = [
    {
      id: "profile",
      title: "Profile Admin",
      icon: <User size={20} />,
      description: "Kelola informasi profil dan akun admin",
    },
    {
      id: "notifications",
      title: "Notifikasi",
      icon: <Bell size={20} />,
      description: "Atur preferensi notifikasi sistem",
    },
    {
      id: "security",
      title: "Keamanan",
      icon: <Shield size={20} />,
      description: "Pengaturan keamanan dan privasi",
    },
    {
      id: "appearance",
      title: "Tampilan",
      icon: <Palette size={20} />,
      description: "Kustomisasi tema dan tampilan dashboard",
    },
    {
      id: "system",
      title: "Sistem",
      icon: <Settings size={20} />,
      description: "Konfigurasi sistem dan maintenance",
    },
    {
      id: "database",
      title: "Database",
      icon: <Database size={20} />,
      description: "Backup dan restore data aplikasi",
    },
    {
      id: "payment",
      title: "Pembayaran",
      icon: <CreditCard size={20} />,
      description: "Pengaturan gateway pembayaran",
    },
    {
      id: "integration",
      title: "Integrasi",
      icon: <Globe size={20} />,
      description: "API dan integrasi pihak ketiga",
    },
  ];

  const renderProfileSection = () => (
    <div className="space-y-6">
      <div className="backdrop-blur-xl bg-white/10 rounded-3xl border border-white/20 p-8">
        <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
          <User size={24} />
          Informasi Profil
        </h3>

        <div className="flex items-center gap-6 mb-8">
          <div className="w-24 h-24 rounded-3xl flex items-center justify-center text-4xl backdrop-blur-xl bg-white/10 border border-white/20">
            {profile.avatar}
          </div>
          <div className="flex-1">
            <button className="backdrop-blur-xl bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 px-6 py-3 rounded-2xl border border-blue-500/30 transition-all duration-300 flex items-center gap-2 hover:scale-105">
              <Upload size={18} />
              Ganti Avatar
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-white/70 text-sm mb-2">
              Nama Lengkap
            </label>
            <input
              type="text"
              value={profile.name}
              onChange={(e) => setProfile({ ...profile, name: e.target.value })}
              className="w-full bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl py-3 px-4 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
            />
          </div>
          <div>
            <label className="block text-white/70 text-sm mb-2">Role</label>
            <input
              type="text"
              value={profile.role}
              disabled
              className="w-full bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl py-3 px-4 text-white/50"
            />
          </div>
          <div>
            <label className="block text-white/70 text-sm mb-2">Email</label>
            <input
              type="email"
              value={profile.email}
              onChange={(e) =>
                setProfile({ ...profile, email: e.target.value })
              }
              className="w-full bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl py-3 px-4 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
            />
          </div>
          <div>
            <label className="block text-white/70 text-sm mb-2">Telepon</label>
            <input
              type="tel"
              value={profile.phone}
              onChange={(e) =>
                setProfile({ ...profile, phone: e.target.value })
              }
              className="w-full bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl py-3 px-4 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
            />
          </div>
        </div>
      </div>

      <div className="backdrop-blur-xl bg-white/10 rounded-3xl border border-white/20 p-8">
        <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
          <Lock size={24} />
          Ubah Password
        </h3>

        <div className="space-y-4">
          <div>
            <label className="block text-white/70 text-sm mb-2">
              Password Lama
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Masukkan password lama"
                className="w-full bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl py-3 px-4 pr-12 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white/50 hover:text-white"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-white/70 text-sm mb-2">
                Password Baru
              </label>
              <input
                type="password"
                placeholder="Password baru"
                className="w-full bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl py-3 px-4 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
              />
            </div>
            <div>
              <label className="block text-white/70 text-sm mb-2">
                Konfirmasi Password
              </label>
              <input
                type="password"
                placeholder="Konfirmasi password baru"
                className="w-full bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl py-3 px-4 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderNotificationsSection = () => (
    <div className="space-y-6">
      <div className="backdrop-blur-xl bg-white/10 rounded-3xl border border-white/20 p-8">
        <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
          <Bell size={24} />
          Pengaturan Notifikasi
        </h3>

        <div className="space-y-6">
          {[
            {
              key: "email",
              label: "Email Notifications",
              desc: "Terima notifikasi melalui email",
              icon: <Mail size={20} />,
            },
            {
              key: "push",
              label: "Push Notifications",
              desc: "Notifikasi push di browser",
              icon: <Smartphone size={20} />,
            },
            {
              key: "sms",
              label: "SMS Notifications",
              desc: "Notifikasi melalui SMS",
              icon: <Smartphone size={20} />,
            },
            {
              key: "booking",
              label: "Booking Alerts",
              desc: "Notifikasi booking baru dan update",
              icon: <AlertCircle size={20} />,
            },
            {
              key: "payment",
              label: "Payment Alerts",
              desc: "Notifikasi pembayaran dan transaksi",
              icon: <CreditCard size={20} />,
            },
            {
              key: "maintenance",
              label: "Maintenance Alerts",
              desc: "Notifikasi maintenance sistem",
              icon: <Settings size={20} />,
            },
          ].map((item) => (
            <div
              key={item.key}
              className="flex items-center justify-between p-4 backdrop-blur-xl bg-white/5 rounded-2xl border border-white/10"
            >
              <div className="flex items-center gap-4">
                <div className="text-white/70">{item.icon}</div>
                <div>
                  <p className="text-white font-semibold">{item.label}</p>
                  <p className="text-white/60 text-sm">{item.desc}</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-11 h-6 bg-white/20 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderSecuritySection = () => (
    <div className="space-y-6">
      <div className="backdrop-blur-xl bg-white/10 rounded-3xl border border-white/20 p-8">
        <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
          <Shield size={24} />
          Keamanan & Privasi
        </h3>

        <div className="space-y-6">
          <div className="p-6 backdrop-blur-xl bg-white/5 rounded-2xl border border-white/10">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <Key size={20} className="text-yellow-400" />
                <div>
                  <h4 className="text-white font-semibold">
                    Two-Factor Authentication
                  </h4>
                  <p className="text-white/60 text-sm">
                    Tambahkan lapisan keamanan ekstra
                  </p>
                </div>
              </div>
              <button className="backdrop-blur-xl bg-green-500/20 hover:bg-green-500/30 text-green-300 px-4 py-2 rounded-xl border border-green-500/30 transition-all duration-300">
                Aktifkan
              </button>
            </div>
          </div>

          <div className="p-6 backdrop-blur-xl bg-white/5 rounded-2xl border border-white/10">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <Globe size={20} className="text-blue-400" />
                <div>
                  <h4 className="text-white font-semibold">
                    Session Management
                  </h4>
                  <p className="text-white/60 text-sm">
                    Kelola sesi login aktif
                  </p>
                </div>
              </div>
              <button className="backdrop-blur-xl bg-red-500/20 hover:bg-red-500/30 text-red-300 px-4 py-2 rounded-xl border border-red-500/30 transition-all duration-300">
                Lihat Sesi
              </button>
            </div>
          </div>

          <div className="p-6 backdrop-blur-xl bg-white/5 rounded-2xl border border-white/10">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <Lock size={20} className="text-purple-400" />
                <div>
                  <h4 className="text-white font-semibold">Login History</h4>
                  <p className="text-white/60 text-sm">
                    Riwayat aktivitas login
                  </p>
                </div>
              </div>
              <button className="backdrop-blur-xl bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 px-4 py-2 rounded-xl border border-blue-500/30 transition-all duration-300">
                Lihat Log
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderAppearanceSection = () => (
    <div className="space-y-6">
      <div className="backdrop-blur-xl bg-white/10 rounded-3xl border border-white/20 p-8">
        <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
          <Palette size={24} />
          Tampilan & Tema
        </h3>

        <div className="space-y-6">
          <div className="p-6 backdrop-blur-xl bg-white/5 rounded-2xl border border-white/10">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                {isDarkMode ? (
                  <Moon size={20} className="text-blue-400" />
                ) : (
                  <Sun size={20} className="text-yellow-400" />
                )}
                <div>
                  <h4 className="text-white font-semibold">Mode Gelap</h4>
                  <p className="text-white/60 text-sm">
                    Aktifkan tema gelap untuk dashboard
                  </p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={isDarkMode}
                  onChange={() => setIsDarkMode(!isDarkMode)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-white/20 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
              </label>
            </div>
          </div>

          <div className="p-6 backdrop-blur-xl bg-white/5 rounded-2xl border border-white/10">
            <h4 className="text-white font-semibold mb-4">Pilih Tema Warna</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { name: "Blue", colors: "from-blue-500 to-purple-500" },
                { name: "Green", colors: "from-green-500 to-emerald-500" },
                { name: "Orange", colors: "from-orange-500 to-red-500" },
                { name: "Pink", colors: "from-pink-500 to-rose-500" },
              ].map((theme) => (
                <button
                  key={theme.name}
                  className="p-4 rounded-2xl border border-white/20 backdrop-blur-xl bg-white/5 hover:bg-white/10 transition-all duration-300"
                >
                  <div
                    className={`w-full h-12 rounded-xl bg-gradient-to-r ${theme.colors} mb-2`}
                  ></div>
                  <p className="text-white text-sm">{theme.name}</p>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSystemSection = () => (
    <div className="space-y-6">
      <div className="backdrop-blur-xl bg-white/10 rounded-3xl border border-white/20 p-8">
        <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
          <Settings size={24} />
          Konfigurasi Sistem
        </h3>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="p-6 backdrop-blur-xl bg-white/5 rounded-2xl border border-white/10">
            <div className="flex items-center gap-3 mb-4">
              <Zap size={20} className="text-yellow-400" />
              <h4 className="text-white font-semibold">Status Sistem</h4>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-white/70">Server Status</span>
                <span className="flex items-center gap-2 text-green-400">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  Online
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-white/70">Database</span>
                <span className="flex items-center gap-2 text-green-400">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  Connected
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-white/70">Cache</span>
                <span className="flex items-center gap-2 text-yellow-400">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                  Warning
                </span>
              </div>
            </div>
          </div>

          <div className="p-6 backdrop-blur-xl bg-white/5 rounded-2xl border border-white/10">
            <div className="flex items-center gap-3 mb-4">
              <RefreshCw size={20} className="text-blue-400" />
              <h4 className="text-white font-semibold">Maintenance</h4>
            </div>
            <div className="space-y-3">
              <button className="w-full backdrop-blur-xl bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 py-3 rounded-xl border border-blue-500/30 transition-all duration-300">
                Clear Cache
              </button>
              <button className="w-full backdrop-blur-xl bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-300 py-3 rounded-xl border border-yellow-500/30 transition-all duration-300">
                Restart Services
              </button>
              <button className="w-full backdrop-blur-xl bg-red-500/20 hover:bg-red-500/30 text-red-300 py-3 rounded-xl border border-red-500/30 transition-all duration-300">
                Maintenance Mode
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderDatabaseSection = () => (
    <div className="space-y-6">
      <div className="backdrop-blur-xl bg-white/10 rounded-3xl border border-white/20 p-8">
        <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
          <Database size={24} />
          Backup & Restore
        </h3>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="p-6 backdrop-blur-xl bg-white/5 rounded-2xl border border-white/10">
            <h4 className="text-white font-semibold mb-4 flex items-center gap-2">
              <Download size={18} />
              Backup Data
            </h4>
            <p className="text-white/60 text-sm mb-4">
              Buat backup data aplikasi dan database
            </p>
            <div className="space-y-3">
              <button className="w-full backdrop-blur-xl bg-green-500/20 hover:bg-green-500/30 text-green-300 py-3 rounded-xl border border-green-500/30 transition-all duration-300">
                Full Backup
              </button>
              <button className="w-full backdrop-blur-xl bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 py-3 rounded-xl border border-blue-500/30 transition-all duration-300">
                Incremental Backup
              </button>
            </div>
          </div>

          <div className="p-6 backdrop-blur-xl bg-white/5 rounded-2xl border border-white/10">
            <h4 className="text-white font-semibold mb-4 flex items-center gap-2">
              <Upload size={18} />
              Restore Data
            </h4>
            <p className="text-white/60 text-sm mb-4">
              Restore data dari file backup
            </p>
            <div className="space-y-3">
              <input
                type="file"
                className="w-full bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl py-3 px-4 text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:bg-blue-500/20 file:text-blue-300"
              />
              <button className="w-full backdrop-blur-xl bg-orange-500/20 hover:bg-orange-500/30 text-orange-300 py-3 rounded-xl border border-orange-500/30 transition-all duration-300">
                Restore from File
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const getCurrentSection = () => {
    switch (activeSection) {
      case "profile":
        return renderProfileSection();
      case "notifications":
        return renderNotificationsSection();
      case "security":
        return renderSecuritySection();
      case "appearance":
        return renderAppearanceSection();
      case "system":
        return renderSystemSection();
      case "database":
        return renderDatabaseSection();
      default:
        return renderProfileSection();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-6">
      {/* Header */}
      <div className="backdrop-blur-xl bg-white/10 rounded-3xl border border-white/20 p-8 mb-8 shadow-2xl">
        <div className="flex items-center gap-4">
          <div className="p-4 backdrop-blur-xl bg-white/10 rounded-2xl border border-white/20">
            <Settings size={32} className="text-white" />
          </div>
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">
              Pengaturan Lapagin
            </h1>
            <p className="text-white/70 text-lg">
              Konfigurasi dan personalisasi dashboard admin
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="backdrop-blur-xl bg-white/10 rounded-3xl border border-white/20 p-6 shadow-2xl sticky top-6">
            <h2 className="text-xl font-bold text-white mb-6">Kategori</h2>
            <nav className="space-y-2">
              {settingSections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`w-full text-left p-4 rounded-2xl transition-all duration-300 flex items-center gap-3 ${
                    activeSection === section.id
                      ? "backdrop-blur-xl bg-blue-500/20 border border-blue-500/30 text-blue-300"
                      : "hover:backdrop-blur-xl hover:bg-white/5 text-white/70 hover:text-white"
                  }`}
                >
                  {section.icon}
                  <div>
                    <p className="font-semibold">{section.title}</p>
                    <p className="text-xs opacity-70">{section.description}</p>
                  </div>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          {getCurrentSection()}

          {/* Save Button */}
          <div className="mt-8 flex justify-end">
            <button className="backdrop-blur-xl bg-green-500/20 hover:bg-green-500/30 text-green-300 px-8 py-4 rounded-2xl border border-green-500/30 transition-all duration-300 flex items-center gap-3 hover:scale-105 font-semibold">
              <Save size={20} />
              Simpan Perubahan
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
