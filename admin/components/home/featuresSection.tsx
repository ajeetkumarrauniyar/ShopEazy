import Image from "next/image";
import React from "react";

const FeaturesSection = () => {
  const features = [
    {
      title: "Customizable Storefronts",
      description:
        "Start with groceries and expand to any vertical with fully customizable templates.",
      icon: (
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
            d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
          />
        </svg>
      ),
      bgColor: "bg-blue-50",
      iconBgColor: "bg-blue-500",
      checkColor: "text-blue-500",
      benefits: [
        "Drag-and-drop builder",
        "Mobile-optimized design",
        "Industry-specific templates",
      ],
    },
    {
      title: "Multi-tenant Admin Panels",
      description:
        "Role-based workflows for administrators, accountants, and sales teams.",
      icon: (
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
            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
          />
        </svg>
      ),
      bgColor: "bg-indigo-50",
      iconBgColor: "bg-indigo-500",
      checkColor: "text-indigo-500",
      benefits: [
        "Customizable permissions",
        "Role-specific dashboards",
        "Activity logging",
      ],
    },
    {
      title: "Automated Accounting",
      description:
        "Generate GST invoices, update ledgers, and prepare tax filings automatically.",
      icon: (
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
            d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
          />
        </svg>
      ),
      bgColor: "bg-green-50",
      iconBgColor: "bg-green-500",
      checkColor: "text-green-500",
      benefits: [
        "GST-compliant invoicing",
        "Automated reconciliation",
        "One-click tax filing",
      ],
    },
    {
      title: "Mobile + Web Integration",
      description:
        "Enjoy seamless real-time synchronization between all your devices.",
      icon: (
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
            d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
          />
        </svg>
      ),
      bgColor: "bg-purple-50",
      iconBgColor: "bg-purple-500",
      checkColor: "text-purple-500",
      benefits: [
        "Real-time data syncing",
        "Native iOS & Android apps",
        "Offline capabilities",
      ],
    },
  ];

  const advancedFeatures = [
    {
      title: "Built for Scalability",
      description:
        "Grow from startup to enterprise without changing platforms.",
    },
    {
      title: "Bank-grade Security",
      description: "Enterprise-level encryption and compliance built-in.",
    },
    {
      title: "API-first Design",
      description:
        "Integrate with any existing system via our comprehensive API.",
    },
  ];

  return (
    <section
      id="features"
      className="py-16 md:py-24 bg-white dark:bg-neutral-900"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Everything You Need in One Platform
          </h2>
          <p className="max-w-3xl mx-auto text-lg text-gray-600 dark:text-gray-300">
            Seamlessly merge e-commerce and ERP functions with powerful features
            designed for modern businesses.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`${feature.bgColor} dark:bg-neutral-800 rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col`}
            >
              <div
                className={`${feature.iconBgColor} rounded-full w-12 h-12 flex items-center justify-center mb-4`}
              >
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                {feature.description}
              </p>
              <ul className="space-y-2 mt-auto">
                {feature.benefits.map((benefit, idx) => (
                  <li
                    key={idx}
                    className="flex items-center text-gray-600 dark:text-gray-300"
                  >
                    <svg
                      className={`h-5 w-5 ${feature.checkColor} mr-2`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-20">
          <div className="bg-gray-50 dark:bg-neutral-800 rounded-2xl overflow-hidden shadow-xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
              <div className="p-8 md:p-12 flex flex-col justify-center">
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
                  Advanced Platform for Modern Business
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  OmniLedger eliminates the complexity of managing separate
                  systems for your e-commerce and back-office operations.
                </p>

                <div className="space-y-4">
                  {advancedFeatures.map((feature, index) => (
                    <div key={index} className="flex items-start">
                      <div className="flex-shrink-0 bg-blue-100 dark:bg-blue-900 rounded-full p-1">
                        <svg
                          className="h-5 w-5 text-blue-600 dark:text-blue-300"
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
                          {feature.title}
                        </h4>
                        <p className="mt-1 text-gray-600 dark:text-gray-300">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8">
                  <a
                    href="#demo"
                    className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 shadow-md transition"
                  >
                    See it in action
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="ml-2 -mr-1 h-5 w-5"
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
                </div>
              </div>

              <div className="relative">
                <Image
                  src="/feature.jpeg"
                  width={800}
                  height={600}
                  alt="OmniLedger platform interface showcase"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 mix-blend-multiply"></div>

                {/* Feature annotation elements */}
                <div className="absolute top-1/4 left-1/3 bg-white dark:bg-neutral-800 rounded-lg shadow-lg p-2 transform -translate-x-1/2 -translate-y-1/2 hidden md:block">
                  <p className="text-xs font-medium text-gray-900 dark:text-white">
                    Smart Analytics Dashboard
                  </p>
                </div>

                <div className="absolute top-2/3 right-1/4 bg-white dark:bg-neutral-800 rounded-lg shadow-lg p-2 transform translate-x-1/2 -translate-y-1/2 hidden md:block">
                  <p className="text-xs font-medium text-gray-900 dark:text-white">
                    Real-time Inventory Sync
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
