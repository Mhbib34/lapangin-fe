import { Mail, MessageCircle, Phone } from "lucide-react";
import React from "react";

const ContactSection = () => {
  return (
    <section className="mt-12">
      <div className="backdrop-blur-xl bg-white/10 rounded-3xl p-8 border border-white/20 shadow-2xl">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">Butuh Bantuan?</h2>
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
  );
};

export default ContactSection;
