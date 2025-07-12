import React, { useState, useEffect } from 'react';
import { FileText, Menu, X } from 'lucide-react';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToWaitlist = () => {
    document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth' });
    setIsMobileMenuOpen(false);
  };

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    setIsMobileMenuOpen(false);
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-100' 
        : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-emerald-600 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
              <FileText className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className={`text-xl font-bold transition-colors ${
                isScrolled ? 'text-gray-900' : 'text-white'
              }`}>
                RuralLedger
              </h1>
              <p className={`text-xs transition-colors ${
                isScrolled ? 'text-gray-500' : 'text-white/80'
              }`}>
                आपकी दुकान का Digital Bahi-Khata
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => scrollToSection('features')}
              className={`text-sm font-medium transition-colors hover:text-emerald-600 ${
                isScrolled ? 'text-gray-700' : 'text-white/90'
              }`}
            >
              Features
            </button>
            <button 
              onClick={() => scrollToSection('audience')}
              className={`text-sm font-medium transition-colors hover:text-emerald-600 ${
                isScrolled ? 'text-gray-700' : 'text-white/90'
              }`}
            >
              For You
            </button>
            <button 
              onClick={() => scrollToSection('faq')}
              className={`text-sm font-medium transition-colors hover:text-emerald-600 ${
                isScrolled ? 'text-gray-700' : 'text-white/90'
              }`}
            >
              FAQ
            </button>
          </nav>

          {/* CTA Button */}
          <div className="hidden md:block">
            <button 
              onClick={scrollToWaitlist}
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2.5 rounded-lg font-medium transition-all duration-200 transform hover:scale-105 shadow-lg"
            >
              Join Waitlist
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`md:hidden p-2 rounded-lg transition-colors ${
              isScrolled ? 'text-gray-700 hover:bg-gray-100' : 'text-white hover:bg-white/10'
            }`}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 shadow-lg">
            <nav className="py-4 space-y-2">
              <button 
                onClick={() => scrollToSection('features')}
                className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Features
              </button>
              <button 
                onClick={() => scrollToSection('audience')}
                className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors"
              >
                For You
              </button>
              <button 
                onClick={() => scrollToSection('faq')}
                className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors"
              >
                FAQ
              </button>
              <div className="px-4 pt-2">
                <button 
                  onClick={scrollToWaitlist}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2.5 rounded-lg font-medium transition-colors"
                >
                  Join Waitlist
                </button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;