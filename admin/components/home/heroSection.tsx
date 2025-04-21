import Image from "next/image";
import React from "react";

const HeroSection = () => {
  return (
    <section
      id="hero"
      className="relative pt-24 pb-16 md:pt-32 md:pb-24 bg-gradient-to-br from-blue-900 to-indigo-800 dark:from-neutral-900 dark:to-neutral-800 text-white overflow-hidden"
    >
      <div className="absolute inset-0 bg-blue-900 bg-opacity-70 dark:bg-neutral-900 dark:bg-opacity-80 z-0"></div>

      {/* Background pattern */}
      <div className="absolute inset-0 z-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full bg-grid-white-400/[0.05] bg-[length:16px_16px]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row items-center">
          <div className="w-full md:w-1/2 mb-12 md:mb-0 md:pr-12">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Unify E-commerce & ERP
              <span className="text-blue-300"> Seamlessly</span>
            </h1>

            <p className="text-xl md:text-2xl mb-8 text-blue-100 dark:text-gray-300">
              One platform for your entire business operations. No more
              disconnected systems.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <a
                href="#demo"
                className="inline-flex justify-center items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 shadow-lg transform transition hover:-translate-y-0.5"
              >
                Request Demo
              </a>
              <a
                href="#features"
                className="inline-flex justify-center items-center px-6 py-3 border border-blue-300 text-base font-medium rounded-md text-white hover:bg-blue-800 hover:bg-opacity-20 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition hover:-translate-y-0.5"
              >
                Explore Features
              </a>
            </div>

            <div className="flex items-center text-sm">
              <div className="flex -space-x-2 mr-4">
                <div className="w-8 h-8 rounded-full bg-blue-400 flex items-center justify-center text-xs">
                  JD
                </div>
                <div className="w-8 h-8 rounded-full bg-indigo-400 flex items-center justify-center text-xs">
                  SR
                </div>
                <div className="w-8 h-8 rounded-full bg-purple-400 flex items-center justify-center text-xs">
                  LM
                </div>
              </div>
              <p className="text-blue-200 dark:text-gray-300">
                Trusted by
                <span className="font-semibold">1,000+</span> businesses
              </p>
            </div>
          </div>

          <div className="w-full md:w-1/2 relative">
            <div className="relative bg-white dark:bg-neutral-800 rounded-lg shadow-2xl overflow-hidden transform rotate-1 hover:rotate-0 transition-transform duration-300">
              <Image
                src="/hero.jpeg"
                width={600}
                height={400}
                alt="Business professional using OmniLedger platform"
                className="w-full h-full object-cover rounded-lg"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-6">
                <div className="flex items-center space-x-4">
                  <div className="h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <p className="text-white font-medium">
                    Real-time syncing between all platforms
                  </p>
                </div>
              </div>
            </div>

            {/* Floating elements */}
            <div className="absolute -top-6 -right-6 bg-blue-500 rounded-lg shadow-lg p-4 transform rotate-3 hidden md:block">
              <div className="flex items-center space-x-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-white"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-white text-sm font-medium">
                  All-in-one System
                </span>
              </div>
            </div>

            <div className="absolute -bottom-4 -left-4 bg-indigo-500 rounded-lg shadow-lg p-4 transform -rotate-3 hidden md:block">
              <div className="flex items-center space-x-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-white"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-white text-sm font-medium">
                  Secure & Scalable
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Wave separator */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          className="w-full h-auto"
        >
          <path
            fill="#ffffff"
            fillOpacity="1"
            d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,122.7C672,117,768,139,864,149.3C960,160,1056,160,1152,144C1248,128,1344,96,1392,80L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;
