import React, { useState } from 'react';
import { 
  Mail, 
  Phone, 
  ArrowRight, 
  CheckCircle, 
  Gift,
  Star,
  Users,
  Clock,
  AlertCircle
} from 'lucide-react';
import { saveWaitlistEntry, type WaitlistEntry } from '../lib/appwrite';

interface WaitlistProps {
  email: string;
  setEmail: (email: string) => void;
  phone: string;
  setPhone: (phone: string) => void;
  userType: string;
  setUserType: (type: string) => void;
  isSubmitted: boolean;
  setIsSubmitted: (submitted: boolean) => void;
}

const Waitlist: React.FC<WaitlistProps> = ({ 
  email, 
  setEmail, 
  phone, 
  setPhone,
  userType,
  setUserType,
  isSubmitted,
  setIsSubmitted
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [waitlistPosition, setWaitlistPosition] = useState<number | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    // Validate phone number format (basic validation)
    const phoneRegex = /^[\+]?[1-9][\d]{9,14}$/;
    if (!phoneRegex.test(phone.replace(/\s+/g, ''))) {
      setError('Please enter a valid phone number');
      setIsLoading(false);
      return;
    }

    // Validate email if provided
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email address');
      setIsLoading(false);
      return;
    }

    try {
      const waitlistData: Omit<WaitlistEntry, 'createdAt'> = {
        phone: phone.replace(/\s+/g, ''),
        email: email || undefined,
        userType: userType as 'shopkeeper' | 'accountant' | 'staff'
      };

      const result = await saveWaitlistEntry(waitlistData);

      if (result.success) {
        setIsSubmitted(true);
        // Generate a random position for demo (in real app, this would come from the database)
        setWaitlistPosition(Math.floor(Math.random() * 100) + 400);
        
        // Clear form data
        setEmail('');
        setPhone('');
        setUserType('shopkeeper');
      } else {
        setError(result.error || 'Failed to join waitlist. Please try again.');
      }
    } catch (err) {
      setError('Network error. Please check your connection and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <section id="waitlist" className="py-20 bg-gradient-to-r from-emerald-600 to-blue-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-white rounded-2xl p-12 shadow-2xl">
            <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-emerald-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Welcome to RuralLedger! 🎉
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              You're now on our priority waitlist. We'll notify you as soon as the app is ready for download.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left mb-8">
              <div className="bg-emerald-50 p-6 rounded-xl border border-emerald-200">
                <Clock className="w-8 h-8 text-emerald-600 mb-3" />
                <h3 className="font-semibold text-emerald-700 mb-2">What's Next?</h3>
                <p className="text-sm text-emerald-600">We'll send you early access within 2-3 weeks via SMS and WhatsApp</p>
              </div>
              <div className="bg-blue-50 p-6 rounded-xl border border-blue-200">
                <Gift className="w-8 h-8 text-blue-600 mb-3" />
                <h3 className="font-semibold text-blue-700 mb-2">Free Benefits</h3>
                <p className="text-sm text-blue-600">Lifetime Pro access + 1-on-1 setup support for early users</p>
              </div>
              <div className="bg-orange-50 p-6 rounded-xl border border-orange-200">
                <Users className="w-8 h-8 text-orange-600 mb-3" />
                <h3 className="font-semibold text-orange-700 mb-2">Join Community</h3>
                <p className="text-sm text-orange-600">Get updates and connect with other rural entrepreneurs</p>
              </div>
            </div>

            <div className="bg-gray-50 rounded-xl p-6">
              <p className="text-gray-600 mb-4">
                <strong>Your Position:</strong> #{waitlistPosition} in the waitlist
              </p>
              <p className="text-sm text-gray-500">
                Share with friends to move up in the queue! 🚀
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="waitlist" className="py-20 bg-gradient-to-r from-emerald-600 to-blue-600">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-0">
            {/* Form Section */}
            <div className="lg:col-span-2 p-8 lg:p-12">
              <div className="text-center mb-8">
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                  Be Among The First 500 Users
                </h2>
                <p className="text-lg text-gray-600">
                  Join our waitlist and get early access + lifetime Pro features for free. 
                  Limited to first 500 signups only.
                </p>
              </div>

              {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3">
                  <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0" />
                  <p className="text-red-700 text-sm">{error}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* User Type Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    I am a: *
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {[
                      { value: 'shopkeeper', label: 'Shop Owner', icon: '🛍️' },
                      { value: 'accountant', label: 'Accountant', icon: '🧾' },
                      { value: 'staff', label: 'Sales Staff', icon: '👨‍💼' }
                    ].map((type) => (
                      <button
                        key={type.value}
                        type="button"
                        onClick={() => setUserType(type.value)}
                        className={`p-4 rounded-xl border-2 transition-all text-left ${
                          userType === type.value
                            ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                            : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                        }`}
                      >
                        <div className="text-2xl mb-1">{type.icon}</div>
                        <div className="font-medium">{type.label}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Phone Number */}
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                    Mobile Number *
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="tel"
                      id="phone"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 98765 43210"
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                      required
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address (Optional)
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your@email.com"
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={!userType || !phone || isLoading}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold py-4 px-6 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 group transform hover:scale-105"
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      Adding you to waitlist...
                    </>
                  ) : (
                    <>
                      Join Waitlist - Get Early Access
                      <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>

                <p className="text-xs text-gray-500 text-center">
                  We'll notify you when RuralLedger is ready. No spam, promise! 🤝
                </p>
              </form>
            </div>

            {/* Benefits Sidebar */}
            <div className="bg-gradient-to-br from-gray-50 to-blue-50 p-8 lg:p-12">
              <div className="flex items-center gap-3 mb-6">
                <Gift className="h-8 w-8 text-emerald-600" />
                <h3 className="text-xl font-bold text-gray-900">Early User Benefits</h3>
              </div>
              
              <ul className="space-y-4 text-sm text-gray-600 mb-8">
                <li className="flex items-start gap-3">
                  <Star className="w-5 h-5 text-yellow-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <strong className="text-gray-900">Lifetime Pro Access</strong>
                    <div className="text-gray-500">(₹2,999 value) - All premium features forever</div>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <strong className="text-gray-900">1-on-1 Setup Support</strong>
                    <div className="text-gray-500">Personal onboarding via WhatsApp call</div>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <strong className="text-gray-900">Custom Export Templates</strong>
                    <div className="text-gray-500">Tailored for your accountant's needs</div>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <strong className="text-gray-900">Priority Feature Requests</strong>
                    <div className="text-gray-500">Your suggestions get built first</div>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <strong className="text-gray-900">₹200 Mobile Recharge</strong>
                    <div className="text-gray-500">Thank you gift for early supporters</div>
                  </div>
                </li>
              </ul>

              <div className="bg-emerald-100 border border-emerald-200 rounded-xl p-4 mb-6">
                <p className="text-sm font-medium text-emerald-700 text-center">
                  🚀 Limited to first 100 users only
                </p>
                <p className="text-xs text-emerald-600 text-center mt-1">
                  {Math.floor(Math.random() * 30) + 15} spots remaining
                </p>
              </div>

              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900 mb-1">500+</div>
                <div className="text-sm text-gray-600">Rural shops already waiting</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Waitlist;