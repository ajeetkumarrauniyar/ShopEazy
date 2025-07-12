"use client";
import Image from "next/image";
import React, { useState } from "react";

const Pricing = () => {
  const [isMonthly, setIsMonthly] = useState(true);
  return (
    <section
      id="pricing"
      className="py-16 md:py-24 bg-gray-50 dark:bg-neutral-900"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-block px-3 py-1 text-xs font-semibold text-blue-600 bg-blue-100 dark:bg-blue-900 dark:text-blue-200 rounded-full mb-3">
            PRICING PLANS
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Transparent Pricing for Every Business
          </h2>
          <p className="max-w-3xl mx-auto text-lg text-gray-600 dark:text-gray-300">
            Choose the plan that best fits your business needs and scale as you
            grow.
          </p>
        </div>

        {/* Toggle between monthly and annual billing */}
        <div className="flex justify-center mb-12">
          <div className="bg-white dark:bg-neutral-800 rounded-full p-1 inline-flex shadow-sm">
            <button
              id="monthly-toggle"
              onClick={() => setIsMonthly(true)}
              className={`px-4 py-2 rounded-md transition-all ${
                isMonthly
                  ? "bg-blue-600 text-white"
                  : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-neutral-700"
              }`}
            >
              Monthly
            </button>
            <button
              id="annual-toggle"
              onClick={() => setIsMonthly(false)}
              className={`px-4 py-2 rounded-md transition-all ${
                !isMonthly
                  ? "bg-blue-600 text-white"
                  : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-neutral-700"
              }`}
            >
              Annual (Save 20%)
            </button>
          </div>
        </div>

        {/* Pricing tiers  */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Starter Plan */}
          <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
            <div className="p-6 md:p-8">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                Starter
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Perfect for small businesses just getting started.
              </p>
              <div className="flex items-end mb-6">
                <span className="text-4xl font-bold text-gray-900 dark:text-white">
                  $59
                </span>
                <span className="text-gray-600 dark:text-gray-300 ml-1 pb-1">
                  /month
                </span>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <svg
                    className="h-5 w-5 text-green-500 mt-0.5 mr-2"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-gray-600 dark:text-gray-300">
                    1 Storefront
                  </span>
                </li>
                <li className="flex items-start">
                  <svg
                    className="h-5 w-5 text-green-500 mt-0.5 mr-2"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-gray-600 dark:text-gray-300">
                    3 Admin users
                  </span>
                </li>
                <li className="flex items-start">
                  <svg
                    className="h-5 w-5 text-green-500 mt-0.5 mr-2"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-gray-600 dark:text-gray-300">
                    Basic accounting automation
                  </span>
                </li>
                <li className="flex items-start">
                  <svg
                    className="h-5 w-5 text-green-500 mt-0.5 mr-2"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-gray-600 dark:text-gray-300">
                    Mobile + web apps
                  </span>
                </li>
                <li className="flex items-start">
                  <svg
                    className="h-5 w-5 text-green-500 mt-0.5 mr-2"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-gray-600 dark:text-gray-300">
                    Email support
                  </span>
                </li>
                <li className="flex items-start">
                  <svg
                    className="h-5 w-5 text-gray-300 dark:text-gray-600 mt-0.5 mr-2"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-gray-400 dark:text-gray-500">
                    Advanced roles & permissions
                  </span>
                </li>
              </ul>
              <a
                href="#starter-signup"
                className="block text-center px-5 py-3 border border-blue-600 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg font-medium transition dark:text-blue-400 dark:border-blue-400"
              >
                Get Started
              </a>
            </div>
          </div>

          {/* Professional Plan  */}
          <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-xl relative transform scale-105 md:scale-110 z-10 border-2 border-blue-600 dark:border-blue-500">
            <div className="absolute top-0 inset-x-0 transform -translate-y-1/2 flex justify-center">
              <span className="bg-blue-600 text-white text-sm font-bold px-4 py-1 rounded-full">
                MOST POPULAR
              </span>
            </div>
            <div className="p-6 md:p-8">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                Professional
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                For growing businesses with advanced needs.
              </p>
              <div className="flex items-end mb-6">
                <span className="text-4xl font-bold text-gray-900 dark:text-white">
                  $149
                </span>
                <span className="text-gray-600 dark:text-gray-300 ml-1 pb-1">
                  /month
                </span>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <svg
                    className="h-5 w-5 text-green-500 mt-0.5 mr-2"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-gray-600 dark:text-gray-300">
                    <strong>3 Storefronts</strong>
                  </span>
                </li>
                <li className="flex items-start">
                  <svg
                    className="h-5 w-5 text-green-500 mt-0.5 mr-2"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-gray-600 dark:text-gray-300">
                    <strong>10 Admin users</strong>
                  </span>
                </li>
                <li className="flex items-start">
                  <svg
                    className="h-5 w-5 text-green-500 mt-0.5 mr-2"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-gray-600 dark:text-gray-300">
                    <strong>Full</strong> accounting automation
                  </span>
                </li>
                <li className="flex items-start">
                  <svg
                    className="h-5 w-5 text-green-500 mt-0.5 mr-2"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-gray-600 dark:text-gray-300">
                    Advanced roles & permissions
                  </span>
                </li>
                <li className="flex items-start">
                  <svg
                    className="h-5 w-5 text-green-500 mt-0.5 mr-2"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-gray-600 dark:text-gray-300">
                    Priority email & chat support
                  </span>
                </li>
                <li className="flex items-start">
                  <svg
                    className="h-5 w-5 text-green-500 mt-0.5 mr-2"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-gray-600 dark:text-gray-300">
                    Custom report builder
                  </span>
                </li>
              </ul>
              <a
                href="#pro-signup"
                className="block text-center px-5 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition"
              >
                Get Started
              </a>
            </div>
          </div>

          {/* Enterprise Plan  */}
          <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
            <div className="p-6 md:p-8">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                Enterprise
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                For large businesses with complex requirements.
              </p>
              <div className="flex items-end mb-6">
                <span className="text-4xl font-bold text-gray-900 dark:text-white">
                  $399
                </span>
                <span className="text-gray-600 dark:text-gray-300 ml-1 pb-1">
                  /month
                </span>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <svg
                    className="h-5 w-5 text-green-500 mt-0.5 mr-2"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-gray-600 dark:text-gray-300">
                    <strong>Unlimited</strong> storefronts
                  </span>
                </li>
                <li className="flex items-start">
                  <svg
                    className="h-5 w-5 text-green-500 mt-0.5 mr-2"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-gray-600 dark:text-gray-300">
                    <strong>Unlimited</strong> admin users
                  </span>
                </li>
                <li className="flex items-start">
                  <svg
                    className="h-5 w-5 text-green-500 mt-0.5 mr-2"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-gray-600 dark:text-gray-300">
                    Enterprise-grade accounting
                  </span>
                </li>
                <li className="flex items-start">
                  <svg
                    className="h-5 w-5 text-green-500 mt-0.5 mr-2"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-gray-600 dark:text-gray-300">
                    Advanced security features
                  </span>
                </li>
                <li className="flex items-start">
                  <svg
                    className="h-5 w-5 text-green-500 mt-0.5 mr-2"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-gray-600 dark:text-gray-300">
                    24/7 phone & priority support
                  </span>
                </li>
                <li className="flex items-start">
                  <svg
                    className="h-5 w-5 text-green-500 mt-0.5 mr-2"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-gray-600 dark:text-gray-300">
                    Dedicated account manager
                  </span>
                </li>
              </ul>
              <a
                href="#enterprise-contact"
                className="block text-center px-5 py-3 border border-blue-600 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg font-medium transition dark:text-blue-400 dark:border-blue-400"
              >
                Contact Sales
              </a>
            </div>
          </div>
        </div>

        {/* Feature comparison  */}
        <div className="mt-20 bg-white dark:bg-neutral-800 rounded-xl shadow-md overflow-hidden">
          <div className="px-6 py-8 border-b border-gray-200 dark:border-neutral-700">
            <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">
              Compare all features
            </h3>
          </div>
          <div className="px-6 py-8">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-neutral-700">
                <thead>
                  <tr>
                    <th className="py-3 pl-6 pr-4 text-left text-sm font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Feature
                    </th>
                    <th className="px-4 py-3 text-center text-sm font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Starter
                    </th>
                    <th className="px-4 py-3 text-center text-sm font-medium text-blue-600 dark:text-blue-400 uppercase tracking-wider">
                      Professional
                    </th>
                    <th className="py-3 pl-4 pr-6 text-center text-sm font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Enterprise
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-neutral-700">
                  <tr>
                    <td className="py-4 pl-6 pr-4 text-sm font-medium text-gray-900 dark:text-white">
                      Number of storefronts
                    </td>
                    <td className="px-4 py-4 text-center text-sm text-gray-600 dark:text-gray-300">
                      1
                    </td>
                    <td className="px-4 py-4 text-center text-sm text-gray-600 dark:text-gray-300">
                      3
                    </td>
                    <td className="py-4 pl-4 pr-6 text-center text-sm text-gray-600 dark:text-gray-300">
                      Unlimited
                    </td>
                  </tr>
                  <tr>
                    <td className="py-4 pl-6 pr-4 text-sm font-medium text-gray-900 dark:text-white">
                      Admin users
                    </td>
                    <td className="px-4 py-4 text-center text-sm text-gray-600 dark:text-gray-300">
                      3
                    </td>
                    <td className="px-4 py-4 text-center text-sm text-gray-600 dark:text-gray-300">
                      10
                    </td>
                    <td className="py-4 pl-4 pr-6 text-center text-sm text-gray-600 dark:text-gray-300">
                      Unlimited
                    </td>
                  </tr>
                  <tr>
                    <td className="py-4 pl-6 pr-4 text-sm font-medium text-gray-900 dark:text-white">
                      Role-based workflows
                    </td>
                    <td className="px-4 py-4 text-center text-sm text-gray-600 dark:text-gray-300">
                      Basic
                    </td>
                    <td className="px-4 py-4 text-center text-sm text-gray-600 dark:text-gray-300">
                      Advanced
                    </td>
                    <td className="py-4 pl-4 pr-6 text-center text-sm text-gray-600 dark:text-gray-300">
                      Custom
                    </td>
                  </tr>
                  <tr>
                    <td className="py-4 pl-6 pr-4 text-sm font-medium text-gray-900 dark:text-white">
                      Accounting automation
                    </td>
                    <td className="px-4 py-4 text-center text-sm text-gray-600 dark:text-gray-300">
                      Basic
                    </td>
                    <td className="px-4 py-4 text-center text-sm text-gray-600 dark:text-gray-300">
                      Full
                    </td>
                    <td className="py-4 pl-4 pr-6 text-center text-sm text-gray-600 dark:text-gray-300">
                      Enterprise
                    </td>
                  </tr>
                  <tr>
                    <td className="py-4 pl-6 pr-4 text-sm font-medium text-gray-900 dark:text-white">
                      API access
                    </td>
                    <td className="px-4 py-4 text-center">
                      <svg
                        className="h-5 w-5 text-gray-400 mx-auto"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </td>
                    <td className="px-4 py-4 text-center">
                      <svg
                        className="h-5 w-5 text-green-500 mx-auto"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </td>
                    <td className="py-4 pl-4 pr-6 text-center">
                      <svg
                        className="h-5 w-5 text-green-500 mx-auto"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-4 pl-6 pr-4 text-sm font-medium text-gray-900 dark:text-white">
                      White labeling
                    </td>
                    <td className="px-4 py-4 text-center">
                      <svg
                        className="h-5 w-5 text-gray-400 mx-auto"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </td>
                    <td className="px-4 py-4 text-center">
                      <svg
                        className="h-5 w-5 text-gray-400 mx-auto"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </td>
                    <td className="py-4 pl-4 pr-6 text-center">
                      <svg
                        className="h-5 w-5 text-green-500 mx-auto"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* FAQs  */}
        <div className="mt-20">
          <div className="text-center mb-12">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Frequently Asked Questions
            </h3>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Have a question? We&apos;ve got you covered.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white dark:bg-neutral-800 rounded-lg shadow-md p-6">
              <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-3">
                Can I change plans later?
              </h4>
              <p className="text-gray-600 dark:text-gray-300">
                Yes, you can upgrade or downgrade your plan at any time. Changes
                will be prorated based on your remaining billing cycle.
              </p>
            </div>
            <div className="bg-white dark:bg-neutral-800 rounded-lg shadow-md p-6">
              <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-3">
                Do you offer a free trial?
              </h4>
              <p className="text-gray-600 dark:text-gray-300">
                Yes, we offer a 14-day free trial on all plans. No credit card
                required to get started.
              </p>
            </div>
            <div className="bg-white dark:bg-neutral-800 rounded-lg shadow-md p-6">
              <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-3">
                What payment methods do you accept?
              </h4>
              <p className="text-gray-600 dark:text-gray-300">
                We accept all major credit cards, PayPal, and can arrange bank
                transfers for annual Enterprise plans.
              </p>
            </div>
            <div className="bg-white dark:bg-neutral-800 rounded-lg shadow-md p-6">
              <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-3">
                Do I need to install any software?
              </h4>
              <p className="text-gray-600 dark:text-gray-300">
                No, OmniLedger is a cloud-based SaaS platform. You can access it
                from any device with a web browser. We also offer mobile apps
                for iOS and Android.
              </p>
            </div>
          </div>
        </div>

        {/* CTA  */}
        <div className="mt-20 text-center">
          <div className="inline-block relative">
            <Image
              src="/pricing.jpeg"
              alt="Laptop with OmniLedger dashboard"
              width="2426"
              height="1728"
              className="w-full max-w-4xl rounded-xl shadow-xl mx-auto"
            />
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-neutral-800 bg-opacity-95 dark:bg-opacity-95 rounded-xl p-8 md:p-10 shadow-xl max-w-md w-11/12 md:w-full">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Ready to streamline your business?
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Start your 14-day free trial today. No credit card required.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="#signup"
                  className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition text-center"
                >
                  Start Free Trial
                </a>
                <a
                  href="#demo"
                  className="px-6 py-3 border border-blue-600 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg font-medium transition dark:text-blue-400 dark:border-blue-400 text-center"
                >
                  Book a Demo
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
