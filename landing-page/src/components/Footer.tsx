import React from 'react';
import { FileText, Mail, MessageSquare, MapPin, Heart } from 'lucide-react';

const Footer = () => {
  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-gradient-to-r from-emerald-600 to-blue-600 rounded-xl shadow-lg">
                <FileText className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold">RuralLedger</h3>
                <p className="text-gray-400 text-sm">आपकी दुकान का Digital Bahi-Khata</p>
              </div>
            </div>
            <p className="text-gray-300 mb-6 max-w-md leading-relaxed">
              Empowering rural shops with offline-first digital billing and seamless accountant collaboration. 
              Making GST compliance simple for every shopkeeper in India.
            </p>
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <MapPin className="h-4 w-4" />
              <span>Made in India with</span>
              <Heart className="h-4 w-4 text-red-500" />
              <span>for Rural Entrepreneurs</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <button 
                  onClick={() => scrollToSection('features')}
                  className="text-gray-300 hover:text-white transition-colors text-left"
                >
                  Features
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('audience')}
                  className="text-gray-300 hover:text-white transition-colors text-left"
                >
                  For You
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('waitlist')}
                  className="text-gray-300 hover:text-white transition-colors text-left"
                >
                  Join Waitlist
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('faq')}
                  className="text-gray-300 hover:text-white transition-colors text-left"
                >
                  FAQ
                </button>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Get in Touch</h4>
            <ul className="space-y-4">
              <li className="flex items-center gap-3">
                <MessageSquare className="h-5 w-5 text-emerald-400 flex-shrink-0" />
                <a 
                  href="https://wa.me/919876543210" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  WhatsApp Support
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-emerald-400 flex-shrink-0" />
                <a 
                  href="mailto:support@ruralledger.com"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  support@ruralledger.com
                </a>
              </li>
            </ul>

            {/* Social Proof */}
            <div className="mt-8 space-y-2">
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                <span>500+ shops on waitlist</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
                <span>15+ states covered</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <span className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></span>
                <span>Launching in 6-8 weeks</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              © 2024 RuralLedger. All rights reserved.
            </p>
            <div className="flex items-center gap-6 text-sm text-gray-400">
              <span className="flex items-center gap-2">
                🚀 <span>Launching Soon</span>
              </span>
              <span>•</span>
              <span className="flex items-center gap-2">
                🇮🇳 <span>Made for Rural India</span>
              </span>
              <span>•</span>
              <span className="flex items-center gap-2">
                💚 <span>Offline First</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;