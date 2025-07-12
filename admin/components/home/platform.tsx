import Image from "next/image";
import React from "react";

const PlatformSection = () => {
  return (
    <section
      id="platform"
      className="py-16 md:py-24 bg-white dark:bg-neutral-900"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-block px-3 py-1 text-xs font-semibold text-blue-600 bg-blue-100 dark:bg-blue-900 dark:text-blue-200 rounded-full mb-3">
            THE PLATFORM
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            A Unified Business Engine
          </h2>
          <p className="max-w-3xl mx-auto text-lg text-gray-600 dark:text-gray-300">
            One powerful platform to handle every aspect of your business
            operations with enterprise-grade security and scalability.
          </p>
        </div>

        {/* Platform Diagram */}
        <div className="relative mb-20 rounded-xl bg-gray-50 dark:bg-neutral-800 p-6 md:p-10 shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {/* Platform center piece */}
            <div className="order-2 md:order-2 flex flex-col items-center justify-center p-6 bg-blue-600 rounded-xl text-white">
              <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-10 w-10 text-blue-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2 text-center">
                OmniLedger Core
              </h3>
              <p className="text-center text-blue-100 mb-4">
                Unified data architecture with enterprise-grade security
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                <span className="px-2 py-1 bg-blue-700 rounded-full text-xs">
                  API Gateway
                </span>
                <span className="px-2 py-1 bg-blue-700 rounded-full text-xs">
                  Real-time Sync
                </span>
                <span className="px-2 py-1 bg-blue-700 rounded-full text-xs">
                  Auth Service
                </span>
              </div>
            </div>

            {/* Left column  */}
            <div className="order-1 md:order-1 flex flex-col space-y-4">
              <div className="bg-white dark:bg-neutral-700 p-4 rounded-lg shadow">
                <div className="flex items-center mb-3">
                  <div className="w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center mr-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-indigo-600 dark:text-indigo-300"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                      />
                    </svg>
                  </div>
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                    E-Commerce
                  </h4>
                </div>
                <ul className="space-y-2 pl-4">
                  <li className="flex items-center text-gray-600 dark:text-gray-300">
                    <svg
                      className="h-4 w-4 text-green-500 mr-2"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Storefronts
                  </li>
                  <li className="flex items-center text-gray-600 dark:text-gray-300">
                    <svg
                      className="h-4 w-4 text-green-500 mr-2"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Product Catalog
                  </li>
                  <li className="flex items-center text-gray-600 dark:text-gray-300">
                    <svg
                      className="h-4 w-4 text-green-500 mr-2"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Cart & Checkout
                  </li>
                </ul>
              </div>

              <div className="bg-white dark:bg-neutral-700 p-4 rounded-lg shadow">
                <div className="flex items-center mb-3">
                  <div className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center mr-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-purple-600 dark:text-purple-300"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Finance
                  </h4>
                </div>
                <ul className="space-y-2 pl-4">
                  <li className="flex items-center text-gray-600 dark:text-gray-300">
                    <svg
                      className="h-4 w-4 text-green-500 mr-2"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Invoicing
                  </li>
                  <li className="flex items-center text-gray-600 dark:text-gray-300">
                    <svg
                      className="h-4 w-4 text-green-500 mr-2"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Tax Management
                  </li>
                  <li className="flex items-center text-gray-600 dark:text-gray-300">
                    <svg
                      className="h-4 w-4 text-green-500 mr-2"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Ledger
                  </li>
                </ul>
              </div>
            </div>

            {/* Right column  */}
            <div className="order-3 md:order-3 flex flex-col space-y-4">
              <div className="bg-white dark:bg-neutral-700 p-4 rounded-lg shadow">
                <div className="flex items-center mb-3">
                  <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center mr-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-green-600 dark:text-green-300"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Operations
                  </h4>
                </div>
                <ul className="space-y-2 pl-4">
                  <li className="flex items-center text-gray-600 dark:text-gray-300">
                    <svg
                      className="h-4 w-4 text-green-500 mr-2"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Inventory
                  </li>
                  <li className="flex items-center text-gray-600 dark:text-gray-300">
                    <svg
                      className="h-4 w-4 text-green-500 mr-2"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Orders
                  </li>
                  <li className="flex items-center text-gray-600 dark:text-gray-300">
                    <svg
                      className="h-4 w-4 text-green-500 mr-2"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Fulfillment
                  </li>
                </ul>
              </div>

              <div className="bg-white dark:bg-neutral-700 p-4 rounded-lg shadow">
                <div className="flex items-center mb-3">
                  <div className="w-10 h-10 rounded-full bg-yellow-100 dark:bg-yellow-900 flex items-center justify-center mr-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-yellow-600 dark:text-yellow-300"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                      />
                    </svg>
                  </div>
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Analytics
                  </h4>
                </div>
                <ul className="space-y-2 pl-4">
                  <li className="flex items-center text-gray-600 dark:text-gray-300">
                    <svg
                      className="h-4 w-4 text-green-500 mr-2"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Dashboards
                  </li>
                  <li className="flex items-center text-gray-600 dark:text-gray-300">
                    <svg
                      className="h-4 w-4 text-green-500 mr-2"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Reports
                  </li>
                  <li className="flex items-center text-gray-600 dark:text-gray-300">
                    <svg
                      className="h-4 w-4 text-green-500 mr-2"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Forecasting
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Connecting lines (visible on desktop only) */}
          <div className="hidden md:block absolute inset-0 pointer-events-none">
            <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
              <line
                x1="32%"
                y1="25%"
                x2="45%"
                y2="30%"
                className="stroke-blue-400 dark:stroke-blue-600"
                strokeWidth="2"
                strokeDasharray="5,5"
              />
              <line
                x1="32%"
                y1="75%"
                x2="45%"
                y2="70%"
                className="stroke-blue-400 dark:stroke-blue-600"
                strokeWidth="2"
                strokeDasharray="5,5"
              />
              <line
                x1="68%"
                y1="25%"
                x2="55%"
                y2="30%"
                className="stroke-blue-400 dark:stroke-blue-600"
                strokeWidth="2"
                strokeDasharray="5,5"
              />
              <line
                x1="68%"
                y1="75%"
                x2="55%"
                y2="70%"
                className="stroke-blue-400 dark:stroke-blue-600"
                strokeWidth="2"
                strokeDasharray="5,5"
              />
            </svg>
          </div>
        </div>

        {/* Device showcase  */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Seamless Access Across Devices
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              OmniLedger syncs in real-time across all your devices, ensuring
              your data is always up-to-date whether you&apos;re at your desk or
              on the go.
            </p>

            <div className="space-y-4 mb-8">
              <div className="flex items-start">
                <div className="flex-shrink-0 h-10 w-10 rounded-md bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-blue-600 dark:text-blue-300"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-medium text-gray-900 dark:text-white">
                    Enterprise-Grade Security
                  </h4>
                  <p className="mt-1 text-gray-600 dark:text-gray-300">
                    End-to-end encryption and role-based access controls keep
                    your data safe.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0 h-10 w-10 rounded-md bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-blue-600 dark:text-blue-300"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                    />
                  </svg>
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-medium text-gray-900 dark:text-white">
                    Developer-Friendly API
                  </h4>
                  <p className="mt-1 text-gray-600 dark:text-gray-300">
                    Extend functionality with our comprehensive API and webhook
                    system.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0 h-10 w-10 rounded-md bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-blue-600 dark:text-blue-300"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-medium text-gray-900 dark:text-white">
                    Fast Implementation
                  </h4>
                  <p className="mt-1 text-gray-600 dark:text-gray-300">
                    Launch your integrated platform in weeks, not months or
                    years.
                  </p>
                </div>
              </div>
            </div>

            <a
              href="#demo"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 shadow-md transition"
            >
              Schedule Platform Tour
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 ml-2"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
          </div>

          <div className="relative">
            <div className="relative z-10 transform rotate-2 hover:rotate-0 transition-transform duration-300">
              <Image
                src="/platform.jpeg"
                alt="Business professional using OmniLedger on desktop"
                width="5048"
                height="3370"
                className="w-full h-auto rounded-lg shadow-xl"
              />
            </div>

            <div className="absolute -bottom-6 -left-6 z-20 w-48 bg-white dark:bg-neutral-800 rounded-lg shadow-lg p-3 transform -rotate-3">
              <div className="flex items-center mb-2">
                <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center mr-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-white"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  Native mobile apps
                </p>
              </div>
              <p className="text-xs text-gray-600 dark:text-gray-300">
                iOS, Android and progressive web apps with offline capabilities
              </p>
            </div>

            <div className="absolute -top-6 -right-6 z-20 w-48 bg-white dark:bg-neutral-800 rounded-lg shadow-lg p-3 transform rotate-3">
              <div className="flex items-center mb-2">
                <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center mr-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-white"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  Real-time sync
                </p>
              </div>
              <p className="text-xs text-gray-600 dark:text-gray-300">
                Changes instantly reflected across all devices and users
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PlatformSection;
