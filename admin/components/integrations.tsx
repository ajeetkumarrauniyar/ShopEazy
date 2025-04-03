import Image from "next/image";
import React from "react";

const Integrations = () => {
  return (
    <section
      id="integrations"
      className="py-16 md:py-24 bg-gray-50 dark:bg-neutral-900"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-block px-3 py-1 text-xs font-semibold text-blue-600 bg-blue-100 dark:bg-blue-900 dark:text-blue-200 rounded-full mb-3">
            SEAMLESS CONNECTIONS
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Connect with Your Favorite Tools
          </h2>
          <p className="max-w-3xl mx-auto text-lg text-gray-600 dark:text-gray-300">
            OmniLedger integrates with the tools you already use, ensuring a
            smooth workflow across your entire business.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
          <div className="order-2 md:order-1">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-6">
              Powerful API-First Architecture
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Our robust API enables you to connect any service or build custom
              integrations tailored to your specific needs.
            </p>

            <div className="space-y-4 mb-8">
              <div className="flex items-start">
                <div className="flex-shrink-0 h-6 w-6 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                  <svg
                    className="h-4 w-4 text-blue-600 dark:text-blue-300"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="ml-3">
                  <h4 className="text-lg font-medium text-gray-900 dark:text-white">
                    RESTful API
                  </h4>
                  <p className="mt-1 text-gray-600 dark:text-gray-300">
                    Comprehensive documentation with easy-to-use endpoints.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0 h-6 w-6 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                  <svg
                    className="h-4 w-4 text-blue-600 dark:text-blue-300"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="ml-3">
                  <h4 className="text-lg font-medium text-gray-900 dark:text-white">
                    Webhooks
                  </h4>
                  <p className="mt-1 text-gray-600 dark:text-gray-300">
                    Real-time event notifications for automated workflows.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0 h-6 w-6 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                  <svg
                    className="h-4 w-4 text-blue-600 dark:text-blue-300"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="ml-3">
                  <h4 className="text-lg font-medium text-gray-900 dark:text-white">
                    SDK Support
                  </h4>
                  <p className="mt-1 text-gray-600 dark:text-gray-300">
                    Libraries for JavaScript, Python, PHP, and more.
                  </p>
                </div>
              </div>
            </div>

            <a
              href="#api-docs"
              className="inline-flex items-center text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium"
            >
              Explore API documentation
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 ml-1"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
          </div>

          <div className="order-1 md:order-2">
            <div className="relative rounded-xl overflow-hidden shadow-xl">
              <Image
                src="/integrations-dev-working.jpeg"
                alt="Developer working with OmniLedger API"
                width="7360"
                height="4912"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-indigo-600/20 mix-blend-multiply"></div>
            </div>
          </div>
        </div>

        {/* Integration Categories  */}
        <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-md p-8 mb-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Category 1: E-commerce */}
            <div className="space-y-4">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
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
                      d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                    />
                  </svg>
                </div>
                <h4 className="ml-3 text-xl font-bold text-gray-900 dark:text-white">
                  E-commerce
                </h4>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="flex items-center p-3 bg-gray-50 dark:bg-neutral-700 rounded-lg">
                  <div className="w-8 h-8 bg-white dark:bg-neutral-600 rounded flex items-center justify-center">
                    <span className="text-sm font-bold text-blue-600"> Sh</span>
                  </div>
                  <span className="ml-2 text-sm font-medium text-gray-900 dark:text-white">
                    {" "}
                    Shopify{" "}
                  </span>
                </div>
                <div className="flex items-center p-3 bg-gray-50 dark:bg-neutral-700 rounded-lg">
                  <div className="w-8 h-8 bg-white dark:bg-neutral-600 rounded flex items-center justify-center">
                    <span className="text-sm font-bold text-purple-600">
                      WC
                    </span>
                  </div>
                  <span className="ml-2 text-sm font-medium text-gray-900 dark:text-white">
                    WooCommerce
                  </span>
                </div>
                <div className="flex items-center p-3 bg-gray-50 dark:bg-neutral-700 rounded-lg">
                  <div className="w-8 h-8 bg-white dark:bg-neutral-600 rounded flex items-center justify-center">
                    <span className="text-sm font-bold text-orange-600">
                      Mg
                    </span>
                  </div>
                  <span className="ml-2 text-sm font-medium text-gray-900 dark:text-white">
                    Magento
                  </span>
                </div>
                <div className="flex items-center p-3 bg-gray-50 dark:bg-neutral-700 rounded-lg">
                  <div className="w-8 h-8 bg-white dark:bg-neutral-600 rounded flex items-center justify-center">
                    <span className="text-sm font-bold text-green-600">Sq</span>
                  </div>
                  <span className="ml-2 text-sm font-medium text-gray-900 dark:text-white">
                    Square
                  </span>
                </div>
              </div>
            </div>

            {/*  Category 2: Accounting */}
            <div className="space-y-4">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
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
                      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h4 className="ml-3 text-xl font-bold text-gray-900 dark:text-white">
                  Accounting
                </h4>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="flex items-center p-3 bg-gray-50 dark:bg-neutral-700 rounded-lg">
                  <div className="w-8 h-8 bg-white dark:bg-neutral-600 rounded flex items-center justify-center">
                    <span className="text-sm font-bold text-blue-600">Xr</span>
                  </div>
                  <span className="ml-2 text-sm font-medium text-gray-900 dark:text-white">
                    Xero
                  </span>
                </div>
                <div className="flex items-center p-3 bg-gray-50 dark:bg-neutral-700 rounded-lg">
                  <div className="w-8 h-8 bg-white dark:bg-neutral-600 rounded flex items-center justify-center">
                    <span className="text-sm font-bold text-green-600">QA</span>
                  </div>
                  <span className="ml-2 text-sm font-medium text-gray-900 dark:text-white">
                    QuickBooks
                  </span>
                </div>
                <div className="flex items-center p-3 bg-gray-50 dark:bg-neutral-700 rounded-lg">
                  <div className="w-8 h-8 bg-white dark:bg-neutral-600 rounded flex items-center justify-center">
                    <span className="text-sm font-bold text-purple-600">
                      SG
                    </span>
                  </div>
                  <span className="ml-2 text-sm font-medium text-gray-900 dark:text-white">
                    Sage
                  </span>
                </div>
                <div className="flex items-center p-3 bg-gray-50 dark:bg-neutral-700 rounded-lg">
                  <div className="w-8 h-8 bg-white dark:bg-neutral-600 rounded flex items-center justify-center">
                    <span className="text-sm font-bold text-red-600">ZB</span>
                  </div>
                  <span className="ml-2 text-sm font-medium text-gray-900 dark:text-white">
                    Zoho Books
                  </span>
                </div>
              </div>
            </div>

            {/* Category 3: Shipping & Logistics */}
            <div className="space-y-4">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-full bg-yellow-100 dark:bg-yellow-900 flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-yellow-600 dark:text-yellow-300"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0"
                    />
                  </svg>
                </div>
                <h4 className="ml-3 text-xl font-bold text-gray-900 dark:text-white">
                  Shipping & Logistics
                </h4>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="flex items-center p-3 bg-gray-50 dark:bg-neutral-700 rounded-lg">
                  <div className="w-8 h-8 bg-white dark:bg-neutral-600 rounded flex items-center justify-center">
                    <span className="text-sm font-bold text-blue-600">SH</span>
                  </div>
                  <span className="ml-2 text-sm font-medium text-gray-900 dark:text-white">
                    ShipStation
                  </span>
                </div>
                <div className="flex items-center p-3 bg-gray-50 dark:bg-neutral-700 rounded-lg">
                  <div className="w-8 h-8 bg-white dark:bg-neutral-600 rounded flex items-center justify-center">
                    <span className="text-sm font-bold text-purple-600">
                      FX
                    </span>
                  </div>
                  <span className="ml-2 text-sm font-medium text-gray-900 dark:text-white">
                    FedEx
                  </span>
                </div>
                <div className="flex items-center p-3 bg-gray-50 dark:bg-neutral-700 rounded-lg">
                  <div className="w-8 h-8 bg-white dark:bg-neutral-600 rounded flex items-center justify-center">
                    <span className="text-sm font-bold text-yellow-600">
                      DH
                    </span>
                  </div>
                  <span className="ml-2 text-sm font-medium text-gray-900 dark:text-white">
                    DHL
                  </span>
                </div>
                <div className="flex items-center p-3 bg-gray-50 dark:bg-neutral-700 rounded-lg">
                  <div className="w-8 h-8 bg-white dark:bg-neutral-600 rounded flex items-center justify-center">
                    <span className="text-sm font-bold text-red-600">UP</span>
                  </div>
                  <span className="ml-2 text-sm font-medium text-gray-900 dark:text-white">
                    UPS
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl overflow-hidden shadow-xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
            <div className="p-8 md:p-12 flex flex-col justify-center text-white">
              <h3 className="text-2xl md:text-3xl font-bold mb-4">
                Build Custom Integrations
              </h3>
              <p className="mb-6 text-blue-100">
                Can&apos;t find what you need? Our developer-friendly platform
                makes it easy to build custom integrations tailored to your
                unique business requirements.
              </p>

              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 mb-6">
                <pre className="text-xs md:text-sm text-blue-100 overflow-x-auto">
                  <code>{`// Sample API request
fetch('https://api.omniledger.com/v1/orders', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    customer_id: '12345',
    items: [...]
  })
})`}</code>
                </pre>
              </div>

              <div className="flex flex-wrap gap-3">
                <a
                  href="#developer-docs"
                  className="inline-flex items-center px-4 py-2 border border-white text-sm font-medium rounded-md text-white hover:bg-white hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white transition"
                >
                  Developer docs
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 ml-1"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
                <a
                  href="#integration-support"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-blue-700 bg-white hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white shadow-sm transition"
                >
                  Request integration
                </a>
              </div>
            </div>

            <div className="relative h-64 md:h-auto">
              <Image
                src="/integrations.jpeg"
                alt="Team collaborating on integrations"
                width="5472"
                height="3648"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-l from-blue-600/40 to-transparent mix-blend-multiply"></div>
            </div>
          </div>
        </div>

        <div className="text-center mt-12">
          <a
            href="#all-integrations"
            className="inline-flex items-center text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium"
          >
            View all 100+ integrations
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 ml-1"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Integrations;
