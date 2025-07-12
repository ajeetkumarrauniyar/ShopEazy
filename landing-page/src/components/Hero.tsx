import {
  FileText,
  Zap,
  Download,
  Wifi,
  Shield,
} from "lucide-react";

const Hero = () => {
  const scrollToWaitlist = () => {
    document.getElementById("waitlist")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-emerald-50 via-white to-blue-50 pt-24 pb-20">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))]"></div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-emerald-200 rounded-full opacity-20 animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-blue-200 rounded-full opacity-20 animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-orange-200 rounded-full opacity-10 animate-bounce"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* Launch Badge */}
          <div className="inline-flex items-center bg-emerald-100 text-emerald-800 px-6 py-3 rounded-full text-sm font-medium mb-8 shadow-md">
            <Zap className="w-4 h-4 mr-2" />
            MVP Development Phase - Early Access Available
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
            RuralLedger
            <span className="block bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
              आपकी दुकान का Digital Bahi-Khata
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-4xl mx-auto leading-relaxed">
            <strong>Offline-first Android app</strong> for rural kirana shops.
            Create invoices without internet, sync with your accountant
            automatically, export GST-ready reports to Tally & MARG.
          </p>

          {/* Key Value Props */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <div className="flex items-center bg-white px-6 py-3 rounded-full shadow-md border hover:shadow-lg transition-shadow">
              <Wifi className="w-5 h-5 text-emerald-500 mr-3" />
              <span className="font-medium text-gray-700">
                Works 100% Offline
              </span>
            </div>
            <div className="flex items-center bg-white px-6 py-3 rounded-full shadow-md border hover:shadow-lg transition-shadow">
              <Shield className="w-5 h-5 text-blue-500 mr-3" />
              <span className="font-medium text-gray-700">
                Multi-User Organizations
              </span>
            </div>
            <div className="flex items-center bg-white px-6 py-3 rounded-full shadow-md border hover:shadow-lg transition-shadow">
              <FileText className="w-5 h-5 text-orange-500 mr-3" />
              <span className="font-medium text-gray-700">
                GST Compliance Ready
              </span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <button
              onClick={scrollToWaitlist}
              className="group bg-emerald-600 text-white px-8 py-4 rounded-xl hover:bg-emerald-700 transition-all duration-200 transform hover:scale-105 text-lg font-semibold shadow-lg hover:shadow-xl"
            >
              <Download className="w-5 h-5 mr-2 inline group-hover:animate-bounce" />
              Join MVP Beta Program
            </button>
            {/* <button className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-xl hover:border-emerald-500 hover:text-emerald-600 transition-all duration-200 text-lg font-semibold">
              View Technical Demo
            </button> */}
          </div>

          {/* Technical Stack Preview */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/20 max-w-5xl mx-auto">
            {/* <h3 className="text-lg font-semibold text-gray-900 mb-6">
              Built with Production-Ready Technology Stack
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div>
                <div className="text-2xl font-bold text-emerald-600 mb-2">
                  React Native
                </div>
                <div className="text-sm text-gray-600">
                  Cross-platform Mobile
                </div>
              </div>
              <div>
                <div className="text-2xl font-bold text-blue-600 mb-2">
                  SQLite
                </div>
                <div className="text-sm text-gray-600">
                  Offline-first Storage
                </div>
              </div>
              <div>
                <div className="text-2xl font-bold text-purple-600 mb-2">
                  Supabase
                </div>
                <div className="text-sm text-gray-600">Cloud Backend</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-orange-600 mb-2">
                  Express.js
                </div>
                <div className="text-sm text-gray-600">Sync API Layer</div>
              </div>
            </div> */}

            {/* Success Metrics Preview */}
            <div className="mt-8 border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center items-center">
                <div>
                  <div className="text-2xl font-bold text-emerald-600 mb-1">
                    500+
                  </div>
                  <div className="text-sm text-gray-600">
                    Target MVP Installs
                  </div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-blue-600 mb-1">
                    90%+
                  </div>
                  <div className="text-sm text-gray-600">
                    Auto-sync Success Rate
                  </div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-orange-600 mb-1">
                    50+
                  </div>
                  <div className="text-sm text-gray-600">
                    Accountants Using Exports
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
