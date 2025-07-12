"use client";

import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";
// import { OrganizationSwitcher, useUser } from "@clerk/nextjs";
// import Link from "next/link";
import React, { useState, useEffect } from "react";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // const { user, isLoaded } = useUser();
  // const [userData, setUserData] = useState(null);

  // Handle scroll effect for header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <section id="header">
      <nav
        className={`fixed z-50 w-full bg-white dark:bg-neutral-900 ${
          isScrolled ? "shadow-md" : "shadow-sm"
        }`}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 justify-between">
            {/* Logo */}
            <div className="flex items-center">
              <a href="#" className="flex flex-shrink-0 items-center">
                <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                  OmniLedger
                </span>
              </a>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:ml-6 md:flex md:items-center md:space-x-4">
              <a
                href="#features"
                className="rounded-md px-3 py-2 text-sm font-medium text-gray-700 transition hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400"
              >
                Features
              </a>
              <a
                href="#solutions"
                className="rounded-md px-3 py-2 text-sm font-medium text-gray-700 transition hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400"
              >
                Solutions
              </a>
              <a
                href="#platform"
                className="rounded-md px-3 py-2 text-sm font-medium text-gray-700 transition hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400"
              >
                Platform
              </a>
              <a
                href="#pricing"
                className="rounded-md px-3 py-2 text-sm font-medium text-gray-700 transition hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400"
              >
                Pricing
              </a>
              <a
                href="#faq"
                className="rounded-md px-3 py-2 text-sm font-medium text-gray-700 transition hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400"
              >
                FAQ
              </a>
              <a
                href="#cta"
                className="ml-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
              >
                Contact
              </a>
              {/* <Link
                href="/sign-in"
                className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-600"
              >
                Sign In
              </Link>
              <Link
                href="/sign-up"
                className="rounded bg-green-500 px-4 py-2 font-bold text-white hover:bg-green-600"
              >
               Sign Up
              </Link> */}
              <SignedOut>
                <SignInButton />
                <SignUpButton />
              </SignedOut>
              <SignedIn>
                <UserButton />
              </SignedIn>
            </div>

            {/* Mobile menu button */}
            <div className="flex items-center md:hidden">
              <button
                onClick={toggleMobileMenu}
                type="button"
                className="inline-flex items-center justify-center rounded-md p-2 text-gray-700 hover:bg-gray-100 hover:text-blue-600 focus:ring-2 focus:ring-blue-500 focus:outline-none focus:ring-inset dark:text-gray-400 dark:hover:bg-neutral-800 dark:hover:text-blue-400"
                aria-controls="mobile-menu"
                aria-expanded={isMobileMenuOpen}
              >
                <span className="sr-only">Open main menu</span>
                {/* Icon when menu is closed */}
                {!isMobileMenuOpen ? (
                  <svg
                    className="block h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                ) : (
                  /* Icon when menu is open */
                  <svg
                    className="block h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <div
          className={`bg-white shadow-md md:hidden dark:bg-neutral-900 ${
            isMobileMenuOpen ? "block" : "hidden"
          }`}
          id="mobile-menu"
          aria-label="Mobile navigation"
        >
          <div className="space-y-1 px-2 pt-2 pb-3 sm:px-3">
            <a
              href="#features"
              className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 transition hover:bg-gray-100 hover:text-blue-600 dark:text-gray-300 dark:hover:bg-neutral-800 dark:hover:text-blue-400"
            >
              Features
            </a>
            <a
              href="#solutions"
              className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 transition hover:bg-gray-100 hover:text-blue-600 dark:text-gray-300 dark:hover:bg-neutral-800 dark:hover:text-blue-400"
            >
              Solutions
            </a>
            <a
              href="#platform"
              className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 transition hover:bg-gray-100 hover:text-blue-600 dark:text-gray-300 dark:hover:bg-neutral-800 dark:hover:text-blue-400"
            >
              Platform
            </a>
            <a
              href="#pricing"
              className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 transition hover:bg-gray-100 hover:text-blue-600 dark:text-gray-300 dark:hover:bg-neutral-800 dark:hover:text-blue-400"
            >
              Pricing
            </a>
            <a
              href="#faq"
              className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 transition hover:bg-gray-100 hover:text-blue-600 dark:text-gray-300 dark:hover:bg-neutral-800 dark:hover:text-blue-400"
            >
              FAQ
            </a>
            <a
              href="#cta"
              className="mx-3 mt-4 block rounded-md bg-blue-600 px-3 py-2 text-base font-medium text-white transition hover:bg-blue-700"
            >
              Contact
            </a>
          </div>
        </div>
      </nav>
    </section>
  );
};

export default Header;
