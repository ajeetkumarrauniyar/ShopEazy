import React, { useState } from 'react';
import { ChevronDown, ChevronUp, MessageSquare } from 'lucide-react';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "How does offline billing work?",
      answer: "RuralLedger stores all your invoices locally on your phone using SQLite database. You can create, edit, and print invoices even without internet. When your phone connects to internet (WiFi or mobile data), everything syncs automatically to the cloud and your accountant's dashboard."
    },
    {
      question: "What happens if my phone breaks or gets lost?",
      answer: "All your data is safely backed up in the cloud. Simply install RuralLedger on your new phone, log in with the same mobile number, and all your invoices, customer data, and settings will be restored automatically within minutes."
    },
    {
      question: "Can my accountant access my data?",
      answer: "Only if you invite them! You can invite your accountant by sharing their mobile number or email. They'll get read-only access to your invoices and can export data to Tally, MARG, or Excel. They cannot delete your data or see sensitive information like profit margins."
    },
    {
      question: "Is this app suitable for different types of shops?",
      answer: "Yes! RuralLedger works for Kirana stores, mobile shops, pharmacy, grocery stores, hardware shops, cloth stores, and any retail business that needs to create invoices and maintain GST records. The app adapts to your business type automatically."
    },
    {
      question: "How much will the app cost?",
      answer: "We'll have a free plan for basic invoicing (up to 50 bills/month) and a Pro plan (₹299/month) for unlimited bills, advanced features, multiple users, and export options. Early waitlist users get lifetime Pro access for free!"
    },
    {
      question: "Will this work on my Android phone?",
      answer: "RuralLedger works on all Android phones running Android 6.0 or newer. It's designed to work smoothly even on budget smartphones with limited storage and RAM. The app size is under 50MB and works great on 2G/3G networks."
    },
    {
      question: "How is this different from Khatabook or other apps?",
      answer: "Unlike other apps, RuralLedger is built specifically for GST compliance and accountant collaboration. It works completely offline, generates proper tax invoices, and lets your accountant access structured data instead of just photos or PDFs. Plus, it exports directly to Tally and MARG."
    },
    {
      question: "When will the app be available?",
      answer: "We're targeting a launch in the next 6-8 weeks. Waitlist users will get early access 2 weeks before the public launch. We'll notify you via SMS and WhatsApp when it's ready for download from Google Play Store."
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-gray-600">
            Got questions? We've got answers. Still need help? WhatsApp us anytime.
          </p>
        </div>

        <div className="space-y-4 mb-12">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow"
            >
              <button
                className="w-full px-6 py-5 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
                onClick={() => toggleFAQ(index)}
              >
                <span className="font-semibold text-gray-900 pr-4">{faq.question}</span>
                <div className="flex-shrink-0">
                  {openIndex === index ? (
                    <ChevronUp className="h-5 w-5 text-emerald-600" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-gray-500" />
                  )}
                </div>
              </button>
              
              {openIndex === index && (
                <div className="px-6 pb-5">
                  <div className="pt-2 border-t border-gray-100">
                    <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Contact Support */}
        <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-200 text-center">
          <MessageSquare className="w-12 h-12 text-emerald-600 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            Still have questions?
          </h3>
          <p className="text-gray-600 mb-6">
            Our team is here to help! Get answers from real people, not bots. 
            We respond within 2 hours during business hours.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://wa.me/917004367569"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-medium px-6 py-3 rounded-lg transition-colors"
            >
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
              </svg>
              WhatsApp Support
            </a>
            <a
              href="mailto:ajeetjumar5487@gmail.com"
              className="inline-flex items-center gap-2 border-2 border-gray-300 hover:border-emerald-500 text-gray-700 hover:text-emerald-600 font-medium px-6 py-3 rounded-lg transition-colors"
            >
              Email Us
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;