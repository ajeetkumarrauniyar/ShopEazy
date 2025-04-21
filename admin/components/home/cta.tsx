import Image from "next/image";
import React from "react";

const CTA = () => {
  return (
    <section
      id="cta"
      className="py-16 md:py-24 bg-gradient-to-br from-blue-900 to-indigo-800 dark:from-neutral-900 dark:to-neutral-800"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Background pattern elements */}
        <div className="absolute inset-0 z-0 opacity-10">
          <div className="absolute top-0 left-0 right-0 h-40 bg-white/5"></div>
          <div className="absolute bottom-0 left-0 right-0 h-40 bg-white/5"></div>
          <div className="absolute top-1/2 left-0 transform -translate-y-1/2 w-full h-px bg-white/10"></div>
        </div>

        <div className="relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
                Ready to Transform Your Business Operations?
              </h2>

              <p className="text-lg md:text-xl text-blue-100 mb-8">
                Join hundreds of businesses that have streamlined their
                operations and accelerated growth with OmniLedger&apos;s unified
                platform.
              </p>

              <div className="space-y-6 mb-8">
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-blue-500 flex items-center justify-center mt-1">
                    <svg
                      className="h-4 w-4 text-white"
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
                  </div>
                  <div className="ml-3">
                    <h3 className="text-lg font-medium text-white">
                      14-Day Free Trial
                    </h3>
                    <p className="mt-1 text-blue-100">
                      No credit card required. Test all features risk-free.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-blue-500 flex items-center justify-center mt-1">
                    <svg
                      className="h-4 w-4 text-white"
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
                  </div>
                  <div className="ml-3">
                    <h3 className="text-lg font-medium text-white">
                      Dedicated Onboarding
                    </h3>
                    <p className="mt-1 text-blue-100">
                      Guided setup and migration support included.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-blue-500 flex items-center justify-center mt-1">
                    <svg
                      className="h-4 w-4 text-white"
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
                  </div>
                  <div className="ml-3">
                    <h3 className="text-lg font-medium text-white">
                      Cancel Anytime
                    </h3>
                    <p className="mt-1 text-blue-100">
                      No long-term contracts or hidden fees.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="#trial"
                  className="inline-flex justify-center items-center px-6 py-3 bg-white text-blue-700 rounded-lg font-medium hover:bg-blue-50 transition transform hover:-translate-y-0.5 shadow-lg"
                >
                  Start Free Trial
                </a>
                <a
                  href="#demo"
                  className="inline-flex justify-center items-center px-6 py-3 bg-transparent border-2 border-white text-white rounded-lg font-medium hover:bg-white/10 transition transform hover:-translate-y-0.5"
                >
                  Book a Demo
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
            </div>

            <div className="relative">
              <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-2xl overflow-hidden transform hover:scale-[1.02] transition-transform duration-300">
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                    Schedule a Personalized Demo
                  </h3>
                  <form action="#" method="POST" className="space-y-4">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                      >
                        Full Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        id="name"
                        className="w-full px-4 py-2 border border-gray-300 dark:border-neutral-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-neutral-700 dark:text-white"
                        placeholder="John Smith"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                      >
                        Work Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        id="email"
                        className="w-full px-4 py-2 border border-gray-300 dark:border-neutral-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-neutral-700 dark:text-white"
                        placeholder="john@yourcompany.com"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="company"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                      >
                        Company Name
                      </label>
                      <input
                        type="text"
                        name="company"
                        id="company"
                        className="w-full px-4 py-2 border border-gray-300 dark:border-neutral-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-neutral-700 dark:text-white"
                        placeholder="Your Company"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="industry"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                      >
                        Industry
                      </label>
                      <select
                        name="industry"
                        id="industry"
                        className="w-full px-4 py-2 border border-gray-300 dark:border-neutral-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-neutral-700 dark:text-white"
                      >
                        <option
                          value=""
                        >
                          Select your industry
                        </option>
                        <option value="retail">Retail & E-commerce</option>
                        <option value="grocery">Grocery & Food</option>
                        <option value="manufacturing">Manufacturing</option>
                        <option value="services">Professional Services</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    <div>
                      <label
                        htmlFor="message"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                      >
                        What are you looking to achieve?
                      </label>
                      <textarea
                        name="message"
                        id="message"
                        rows={3}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-neutral-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-neutral-700 dark:text-white"
                        placeholder="Tell us about your business needs"
                      ></textarea>
                    </div>
                    <div>
                      <button
                        type="submit"
                        className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition"
                      >
                        Schedule My Demo
                      </button>
                    </div>
                  </form>
                  <p className="mt-4 text-sm text-gray-500 dark:text-gray-400 text-center">
                    By submitting, you agree to our
                    <a
                      href="#privacy"
                      className="text-blue-600 hover:text-blue-800 dark:text-blue-400"
                    >
                      privacy policy
                    </a>
                    .
                  </p>
                </div>
              </div>

              {/* Decorative elements */}
              <div className="absolute -top-6 -right-6 w-12 h-12 bg-blue-500 rounded-full opacity-70"></div>
              <div className="absolute -bottom-6 -left-6 w-12 h-12 bg-indigo-500 rounded-full opacity-70"></div>
            </div>
          </div>

          {/* Testimonial quote  */}
          <div className="mt-16 bg-white/10 backdrop-blur-sm rounded-xl p-8 md:p-10 shadow-xl">
            <div className="flex flex-col md:flex-row items-center">
              <Image
                src="/cta.jpeg"
                alt="CEO testimonial portrait"
                width="100"
                height="100"
                className="w-24 h-24 rounded-full border-4 border-white/20 object-cover mb-6 md:mb-0 md:mr-8"
              />
              <div>
                <svg
                  className="h-10 w-10 text-blue-300 mb-4"
                  fill="currentColor"
                  viewBox="0 0 32 32"
                >
                  <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                </svg>
                <p className="text-xl md:text-2xl text-white mb-6 italic leading-relaxed">
                  Implementing OmniLedger saved us over 30 hours per week in
                  manual data entry and reconciliation. The ROI was evident
                  within the first month.
                </p>
                <div>
                  <p className="font-medium text-white">Michael Richardson</p>
                  <p className="text-blue-200">CEO, GourmetGrocers.com</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
