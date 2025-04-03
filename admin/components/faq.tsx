"use client";

import Image from "next/image";
import React from "react";

const FAQAccordion = () => {
  return (
    <section id="faq" className="py-16 md:py-24 bg-white dark:bg-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-block px-3 py-1 text-xs font-semibold text-blue-600 bg-blue-100 dark:bg-blue-900 dark:text-blue-200 rounded-full mb-3">
            GOT QUESTIONS?
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Frequently Asked Questions
          </h2>
          <p className="max-w-3xl mx-auto text-lg text-gray-600 dark:text-gray-300">
            Find answers to common questions about OmniLedger&apos;s all-in-one
            platform.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
          <div className="relative">
            <div className="aspect-w-4 aspect-h-3 mb-8 rounded-xl overflow-hidden bg-gray-100 dark:bg-neutral-800">
              <Image
                src="/faq.jpeg"
                alt="Business professional working with OmniLedger"
                width="5760"
                height="3840"
                className="w-full h-full object-cover rounded-xl"
              />
            </div>

            <div className="space-y-8">
              <div className="bg-white dark:bg-neutral-800 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  What makes OmniLedger different from other platforms?
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  OmniLedger uniquely combines e-commerce and ERP functionality
                  in one seamless system. While others require integrations
                  between separate platforms, we provide a unified experience
                  with real-time data synchronization across all modules.
                </p>
              </div>

              <div className="bg-white dark:bg-neutral-800 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  Is OmniLedger suitable for my industry?
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Absolutely! While we started with optimizations for grocery
                  retail, OmniLedger is designed to be adaptable to any
                  vertical. Our platform serves businesses across retail,
                  wholesale, manufacturing, professional services, and more.
                </p>
              </div>

              <div className="bg-white dark:bg-neutral-800 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  How quickly can we get up and running?
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Most businesses are fully operational within 2-4 weeks. Our
                  guided implementation process and pre-built templates
                  accelerate your setup. Enterprise customers with complex
                  requirements may require additional configuration time.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-8 mt-8 md:mt-0">
            <div className="bg-white dark:bg-neutral-800 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                How does the multi-tenant admin panel work?
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Our multi-tenant system allows you to create role-based
                workflows with specific permissions and views for different user
                types (admin, accountant, sales, etc.). Each user sees only
                what&apos;s relevant to their role, streamlining operations and
                enhancing security.
              </p>
            </div>

            <div className="bg-white dark:bg-neutral-800 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                What kind of accounting automation does OmniLedger provide?
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                OmniLedger automates GST invoicing, real-time ledger updates,
                and tax filing preparation. The system captures all transactions
                across your business, automatically categorizes them, and
                generates compliant reports ready for submission.
              </p>
            </div>

            <div className="bg-white dark:bg-neutral-800 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                Can I use OmniLedger on mobile devices?
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Yes! OmniLedger provides native iOS and Android apps, plus a
                responsive web application. All platforms sync in real-time, so
                your data is always up-to-date regardless of which device
                you&apos;re using.
              </p>
            </div>

            <div className="bg-white dark:bg-neutral-800 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                What about security and data protection?
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Security is paramount. OmniLedger uses bank-level encryption,
                regular security audits, and implements role-based access
                controls. We&apos;re compliant with major data protection
                regulations and provide detailed audit logs of all system
                activities.
              </p>
            </div>

            <div className="bg-white dark:bg-neutral-800 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                Do you offer integration with other tools?
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                While OmniLedger reduces the need for multiple tools, we provide
                robust API access for integration with specialized software you
                may already use. Common integrations include payment gateways,
                shipping providers, and marketing platforms.
              </p>
            </div>
          </div>
        </div>

        {/* Still have questions section  */}
        <div className="mt-16 bg-blue-600 dark:bg-blue-800 rounded-xl overflow-hidden shadow-xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
            <div className="p-8 md:p-12 flex flex-col justify-center">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                Still have questions?
              </h3>
              <p className="text-blue-100 mb-6">
                Our team is ready to help you determine if OmniLedger is the
                right fit for your business needs.
              </p>
              <div className="space-y-4">
                <a
                  href="#contact"
                  className="inline-flex items-center bg-white text-blue-600 hover:bg-blue-50 px-6 py-3 rounded-lg font-medium transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                  Contact Sales
                </a>
                <a
                  href="#demo"
                  className="inline-flex items-center bg-transparent border border-white text-white hover:bg-white hover:bg-opacity-10 px-6 py-3 rounded-lg font-medium transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Schedule a Demo
                </a>
              </div>
            </div>
            <div className="relative md:h-auto bg-gray-200 dark:bg-neutral-700 hidden md:block">
              <Image
                src="/faq-demo.jpeg"
                alt="OmniLedger customer support team"
                width="5066"
                height="3377"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-l from-blue-600/40 to-transparent mix-blend-multiply"></div>
            </div>
          </div>
        </div>

        {/* Resources section */}
        <div className="mt-16">
          <div className="text-center mb-10">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
              Helpful Resources
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Explore guides and documentation to learn more about OmniLedger
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            <a
              href="#knowledge-base"
              className="group bg-gray-50 dark:bg-neutral-800 rounded-lg p-6 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
            >
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mr-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-blue-600 dark:text-blue-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
                  </svg>
                </div>
                <h4 className="text-lg font-medium text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  Knowledge Base
                </h4>
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                Browse comprehensive guides and tutorials for using OmniLedger
              </p>
            </a>

            <a
              href="#video-tutorials"
              className="group bg-gray-50 dark:bg-neutral-800 rounded-lg p-6 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
            >
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mr-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-blue-600 dark:text-blue-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
                  </svg>
                </div>
                <h4 className="text-lg font-medium text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  Video Tutorials
                </h4>
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                Watch step-by-step walkthroughs of key features and workflows
              </p>
            </a>

            <a
              href="#api-docs"
              className="group bg-gray-50 dark:bg-neutral-800 rounded-lg p-6 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
            >
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mr-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-blue-600 dark:text-blue-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <h4 className="text-lg font-medium text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  API Documentation
                </h4>
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                Detailed references for developers integrating with OmniLedger
              </p>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQAccordion;
