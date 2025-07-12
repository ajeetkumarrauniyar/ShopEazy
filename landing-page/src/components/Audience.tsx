import { Store, Calculator, Users, ArrowRight } from 'lucide-react';

const Audience = () => {
  const audiences = [
    {
      icon: <Store className="h-16 w-16 text-emerald-600" />,
      title: "🛍️ Shop Owners (Primary Users)",
      subtitle: "Rural Kirana, Mobile, Pharmacy, Grocery Stores",
      role: "Owner/Admin Role",
      benefits: [
        "Create invoices completely offline.",
        "Manage customer credit tracking & payment reminders",
        "Control inventory with low stock alerts and reorder points",
        "Generate professional GST invoices without technical knowledge",
        "Invite accountants and staff with role-based permissions",
        "Full access to all reports and business analytics"
      ],
      cta: "Perfect for shops with 10-50+ daily transactions",
      bgColor: "from-emerald-50 to-green-50",
      borderColor: "border-emerald-200",
      userStory: "I want to create invoices even without internet so that I don't need to wait for customers."
    },
    {
      icon: <Calculator className="h-16 w-16 text-blue-600" />,
      title: "🧾 Accountants & CAs",
      subtitle: "Tax Consultants, Bookkeepers, GST Practitioners",
      role: "Accountant Role (Read-Only + Export)",
      benefits: [
        "Receive client data in structured format automatically via sync",
        "Export directly to Tally, MARG, Excel with one-click functionality",
        "Review and correct invoice entries remotely via web dashboard",
        "Manage multiple shop clients from single unified interface",
        "Access GST-ready reports without manual data compilation",
        "No invoice creation rights - maintains data integrity"
      ],
      cta: "Save 10+ hours weekly on manual data entry tasks",
      bgColor: "from-blue-50 to-indigo-50",
      borderColor: "border-blue-200",
      userStory: "I want to sync and correct sales/purchase invoices for GST returns without manual entry."
    },
    {
      icon: <Users className="h-16 w-16 text-orange-600" />,
      title: "👨‍💼 Sales Staff & Assistants",
      subtitle: "Shop Assistants, Family Members, Field Sales",
      role: "Staff Role (Limited Permissions)",
      benefits: [
        "Create invoices with permission-based access only",
        "Cannot access sensitive business reports or financial data",
        "Simple interface designed specifically for quick billing",
        "All invoice entries sync to owner automatically",
        "No ability to invite members or change organization settings",
        "Perfect for trusted staff who need billing access only"
      ],
      cta: "Secure role-based access for team collaboration",
      bgColor: "from-orange-50 to-yellow-50",
      borderColor: "border-orange-200",
      userStory: "I want to create invoices for customers but not access owner-level business reports."
    }
  ];

  const organizationFlow = [
    {
      step: "1",
      title: "Organization Creation",
      description: "Shop owner creates organization and becomes default Owner",
      icon: <Store className="w-6 h-6 text-emerald-600" />
    },
    {
      step: "2", 
      title: "Member Invitation",
      description: "Owner invites accountant and staff via phone/email with specific roles",
      icon: <ArrowRight className="w-6 h-6 text-blue-600" />
    },
    {
      step: "3",
      title: "Role-Based Access",
      description: "Each member gets appropriate permissions based on their role",
      icon: <Calculator className="w-6 h-6 text-orange-600" />
    },
    {
      step: "4",
      title: "Collaborative Workflow",
      description: "Seamless data flow from creation to export with proper access control",
      icon: <Users className="w-6 h-6 text-purple-600" />
    }
  ];

  return (
    <section id="audience" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Multi-User Organization Structure for Rural Business Ecosystem
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            RuralLedger implements proper RBAC (Role-Based Access Control) to enable structured 
            collaboration between shop owners, their accountants, and staff members.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {audiences.map((audience, index) => (
            <div 
              key={index}
              className={`bg-gradient-to-br ${audience.bgColor} rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border-2 ${audience.borderColor} hover:scale-105`}
            >
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-full mb-4 shadow-md">
                  {audience.icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {audience.title}
                </h3>
                <p className="text-gray-600 font-medium mb-2">
                  {audience.subtitle}
                </p>
                <p className="text-sm font-semibold text-purple-700 bg-purple-100 px-3 py-1 rounded-full inline-block">
                  {audience.role}
                </p>
              </div>

              <div className="mb-6">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
                  <p className="text-sm font-medium text-blue-800 italic">
                    User Story: "{audience.userStory}"
                  </p>
                </div>
              </div>

              <ul className="space-y-3 mb-6">
                {audience.benefits.map((benefit, benefitIndex) => (
                  <li key={benefitIndex} className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-700 leading-relaxed text-sm">{benefit}</span>
                  </li>
                ))}
              </ul>

              <div className="pt-6 border-t border-gray-200">
                <p className="text-sm font-semibold text-emerald-700 bg-emerald-100 px-4 py-3 rounded-lg text-center">
                  💡 {audience.cta}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Organization Workflow */}
        <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-200 mb-16">
          <h3 className="text-2xl font-bold text-center text-gray-900 mb-8">
            🏢 Organization Creation & Management Workflow
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {organizationFlow.map((flow, index) => (
              <div key={index} className="text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold">
                  {flow.step}
                </div>
                <div className="mb-3">
                  {flow.icon}
                </div>
                <h4 className="font-semibold mb-2 text-gray-900">{flow.title}</h4>
                <p className="text-sm text-gray-600">{flow.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Technical Implementation Details */}
        {/* <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-8 text-white">
          <h3 className="text-2xl font-bold text-center mb-8">
            Technical Implementation of Multi-User Organizations
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h4 className="text-lg font-semibold mb-4">🔐 Authentication & Authorization</h4>
              <ul className="space-y-2 text-sm opacity-90">
                <li>• Clerk mobile OTP + email authentication</li>
                <li>• Custom RBAC system with granular permissions</li>
                <li>• Secure API endpoints with role validation</li>
                <li>• Organization-scoped data access control</li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">🏗️ Database Architecture</h4>
              <ul className="space-y-2 text-sm opacity-90">
                <li>• Supabase PostgreSQL for organization data</li>
                <li>• SQLite local storage for offline functionality</li>
                <li>• Express.js sync layer with conflict resolution</li>
                <li>• Real-time updates for collaborative features</li>
              </ul>
            </div>
          </div>
          
          <div className="mt-8 pt-6 border-t border-white/20">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-2xl font-bold mb-2">3</div>
                <div className="text-sm opacity-90">Distinct User Roles</div>
              </div>
              <div>
                <div className="text-2xl font-bold mb-2">15+</div>
                <div className="text-sm opacity-90">Granular Permissions</div>
              </div>
              <div>
                <div className="text-2xl font-bold mb-2">100%</div>
                <div className="text-sm opacity-90">Secure Data Isolation</div>
              </div>
            </div>
          </div>
        </div> */}
      </div>
    </section>
  );
};

export default Audience;