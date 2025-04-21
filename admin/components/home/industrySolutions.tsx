import Image from "next/image";
import React from "react";

const IndustrySolutions = () => {
  const solutions = [
    {
      id: "retail",
      title: "Retail & E-commerce",
      description:
        "Seamlessly manage inventory, process orders, and track sales across online and offline channels.",
      features: [
        "Multichannel inventory sync",
        "Dynamic pricing strategies",
        "Customer loyalty programs",
      ],
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-20 w-20 text-white opacity-80"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
      ),
      colorFrom: "from-blue-600",
      colorTo: "to-blue-800",
      bgColor: "bg-blue-900",
      accentColor: "text-blue-500",
      linkColor:
        "text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300",
      demoLink: "#retail-demo",
    },
    {
      id: "services",
      title: "Professional Services",
      description:
        "Streamline project management, billing, and client communications in one integrated platform.",
      features: [
        "Time tracking & billing",
        "Client portal access",
        "Resource allocation",
      ],
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-20 w-20 text-white opacity-80"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
          />
        </svg>
      ),
      colorFrom: "from-indigo-600",
      colorTo: "to-indigo-800",
      bgColor: "bg-indigo-900",
      accentColor: "text-indigo-500",
      linkColor:
        "text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300",
      demoLink: "#services-demo",
    },
    {
      id: "manufacturing",
      title: "Manufacturing & Distribution",
      description:
        "Optimize your supply chain, from production planning to inventory and distribution management.",
      features: [
        "Demand forecasting",
        "Supply chain visibility",
        "Quality control tracking",
      ],
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-20 w-20 text-white opacity-80"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
          />
        </svg>
      ),
      colorFrom: "from-green-600",
      colorTo: "to-green-800",
      bgColor: "bg-green-900",
      accentColor: "text-green-500",
      linkColor:
        "text-green-600 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300",
      demoLink: "#manufacturing-demo",
    },
  ];

  return (
    <section
      id="solutions"
      className="py-16 md:py-24 bg-gray-50 dark:bg-neutral-900"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-block px-3 py-1 text-xs font-semibold text-blue-600 bg-blue-100 dark:bg-blue-900 dark:text-blue-200 rounded-full mb-3">
            INDUSTRY SOLUTIONS
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Tailored for Your Industry
          </h2>
          <p className="max-w-3xl mx-auto text-lg text-gray-600 dark:text-gray-300">
            OmniLedger adapts to your specific business needs with customized
            solutions across multiple industries.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {solutions.map((solution) => (
            <div
              key={solution.id}
              className="bg-white dark:bg-neutral-800 rounded-xl shadow-md hover:shadow-lg transition-shadow overflow-hidden"
            >
              <div className={`h-48 ${solution.bgColor} relative`}>
                <div
                  className={`absolute inset-0 bg-gradient-to-r ${solution.colorFrom} ${solution.colorTo} opacity-90`}
                ></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  {solution.icon}
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  {solution.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {solution.description}
                </p>
                <ul className="space-y-2 mb-6">
                  {solution.features.map((feature, idx) => (
                    <li
                      key={idx}
                      className="flex items-center text-gray-600 dark:text-gray-300"
                    >
                      <svg
                        className={`h-5 w-5 ${solution.accentColor} mr-2`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
                <a
                  href={solution.demoLink}
                  className={`inline-flex items-center ${solution.linkColor} font-medium`}
                >
                  Learn more
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
          ))}
        </div>

        {/* Featured Solution */}
        <div className="bg-white dark:bg-neutral-800 rounded-2xl shadow-xl overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
            <div className="order-2 md:order-1 p-8 md:p-12 flex flex-col justify-center">
              <span className="inline-block px-3 py-1 text-xs font-semibold text-blue-600 bg-blue-100 dark:bg-blue-900 dark:text-blue-200 rounded-full mb-4">
                FEATURED SOLUTION
              </span>
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Grocery & Food Retail
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Start with our specialized grocery solution and expand to any
                vertical as your business grows.
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
                      Perishable Inventory Management
                    </h4>
                    <p className="mt-1 text-gray-600 dark:text-gray-300">
                      Track expiration dates and optimize stocking with
                      automated alerts.
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
                      Delivery & Pickup Scheduling
                    </h4>
                    <p className="mt-1 text-gray-600 dark:text-gray-300">
                      Integrated last-mile logistics with route optimization and
                      real-time tracking.
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
                      Recipe & Meal Planning
                    </h4>
                    <p className="mt-1 text-gray-600 dark:text-gray-300">
                      Engage customers with personalized recommendations and
                      shopping lists.
                    </p>
                  </div>
                </div>
              </div>

              <a
                href="#grocery-demo"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 shadow-md transition w-full sm:w-auto text-center"
              >
                See Grocery Solution Demo
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 ml-2"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
            </div>

            <div className="order-1 md:order-2 relative h-64 md:h-auto">
              <Image
                src="/solutions.jpeg"
                width={800}
                height={600}
                alt="OmniLedger grocery retail solution"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-60"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <div className="flex items-center space-x-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-blue-300"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="font-medium text-sm md:text-base">
                    95% reduction in inventory waste
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center mt-16">
          <a
            href="#industry-solutions"
            className="inline-flex items-center text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium"
          >
            View all industry solutions
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

export default IndustrySolutions;
