import { 
  Smartphone, 
  Shield, 
  FileText, 
  BarChart3, 
  Download,
  Users,
  Database,
  RefreshCw,
  Lock
} from 'lucide-react';

const Features = () => {
  const coreFeatures = [
    {
      icon: <Smartphone className="h-8 w-8 text-emerald-600" />,
      title: "Offline-First Invoicing",
      description: "SQLite local database enables complete offline functionality. Create sales & purchase invoices, manage inventory, track payments - all without internet.",
      benefit: "100% uptime, zero dependency on connectivity",
      technical: "SQLite + React Native + Local Storage"
    },
    {
      icon: <RefreshCw className="h-8 w-8 text-blue-600" />,
      title: "Intelligent Auto-Sync",
      description: "Express.js backend with conflict resolution. Background sync when online, last-write-wins strategy, data integrity maintained across all devices.",
      benefit: "Seamless collaboration without data loss",
      technical: "Express.js + Conflict Resolution + Background Jobs"
    },
    {
      icon: <Shield className="h-8 w-8 text-purple-600" />,
      title: "Multi-User Organizations & RBAC",
      description: "Create organizations, invite members with specific roles. Owner (full access), Accountant (read-only + export), Staff (invoice entry only).",
      benefit: "Secure collaboration with proper access control",
      technical: "Clerk Auth + Custom RBAC + Supabase"
    },
    {
      icon: <FileText className="h-8 w-8 text-orange-600" />,
      title: "GST-Compliant Invoice Engine",
      description: "Generate proper tax invoices with automatic GST calculations, customer details, and compliance formatting. PDF generation and print support.",
      benefit: "Zero GST penalties, full compliance",
      technical: "GST Calculation Engine + PDF Generation"
    },
    {
      icon: <BarChart3 className="h-8 w-8 text-red-600" />,
      title: "Advanced Reporting Suite",
      description: "GST summaries (R1/R2 style), sales/purchase registers, customer ledgers, payment tracking. All generated automatically from transaction data.",
      benefit: "Business intelligence at your fingertips",
      technical: "Automated Report Generation + Data Analytics"
    },
    {
      icon: <Download className="h-8 w-8 text-green-600" />,
      title: "Multi-Format Export Engine",
      description: "One-click export to Excel, CSV, JSON, MARG-compatible XML. Direct integration planned for Tally and other accounting software.",
      benefit: "Seamless integration with existing workflows",
      technical: "Multi-format Export + API Integrations"
    }
  ];

  const organizationFeatures = [
    {
      icon: <Users className="h-6 w-6 text-emerald-500" />,
      title: "Organization Creation",
      description: "Users create organizations and become default Owner with full permissions"
    },
    {
      icon: <Lock className="h-6 w-6 text-blue-500" />,
      title: "Role-Based Permissions",
      description: "Owner, Accountant, Staff roles with granular access control matrix"
    },
    {
      icon: <Database className="h-6 w-6 text-orange-500" />,
      title: "Member Management",
      description: "Invite via phone/email, approve join requests, promote/demote members"
    }
  ];

  const technicalSpecs = [
    {
      category: "Mobile Platform",
      specs: ["React Native + Expo", "Android 6.0+", "SQLite Local DB", "Offline-first Architecture"]
    },
    {
      category: "Backend Infrastructure", 
      specs: ["Express.js API Layer", "Supabase PostgreSQL", "Real-time Sync", "Conflict Resolution"]
    },
    {
      category: "Authentication & Security",
      specs: ["Clerk Mobile OTP", "Custom RBAC System", "Encrypted Data Storage", "Secure API Endpoints"]
    },
    {
      category: "Export & Integration",
      specs: ["Excel/CSV Export", "MARG XML Format", "Tally Integration (Planned)", "Custom Report Templates"]
    }
  ];

  return (
    <section id="features" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Production-Ready Features Built for Scale
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Every feature is architected for reliability, security, and seamless user experience 
            across rural India's challenging connectivity landscape.
          </p>
        </div>

        {/* Core Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {coreFeatures.map((feature, index) => (
            <div 
              key={index}
              className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-emerald-200 hover:-translate-y-1"
            >
              <div className="mb-6 group-hover:scale-110 transition-transform duration-200">
                {feature.icon}
              </div>
              
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {feature.title}
              </h3>
              
              <p className="text-gray-600 mb-4 leading-relaxed">
                {feature.description}
              </p>
              
              <div className="space-y-2">
                <div className="pt-4 border-t border-gray-100">
                  <p className="text-sm font-medium text-emerald-600 bg-emerald-50 px-3 py-2 rounded-lg">
                    ✓ {feature.benefit}
                  </p>
                </div>
                <p className="text-xs text-gray-500 bg-gray-50 px-3 py-2 rounded-lg">
                  🔧 {feature.technical}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Organization & RBAC Deep Dive */}
        {/* <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8 mb-16"> */}
          {/* <h3 className="text-2xl font-bold text-center text-gray-900 mb-8">
            Multi-User Organization Structure & RBAC
          </h3> */}
          
          {/* Permission Matrix */}
          {/* <div className="bg-white rounded-xl p-6 mb-8 overflow-x-auto">
            <h4 className="text-lg font-semibold mb-4">Role Permission Matrix</h4>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2">Permission</th>
                  <th className="text-center py-2">Owner</th>
                  <th className="text-center py-2">Accountant</th>
                  <th className="text-center py-2">Staff</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="py-2">Create Invoice</td>
                  <td className="text-center py-2">✅</td>
                  <td className="text-center py-2">❌</td>
                  <td className="text-center py-2">✅</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2">View All Invoices</td>
                  <td className="text-center py-2">✅</td>
                  <td className="text-center py-2">✅ (Read-Only)</td>
                  <td className="text-center py-2">Limited</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2">Invite Members</td>
                  <td className="text-center py-2">✅</td>
                  <td className="text-center py-2">❌</td>
                  <td className="text-center py-2">❌</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2">Export Reports</td>
                  <td className="text-center py-2">✅</td>
                  <td className="text-center py-2">✅</td>
                  <td className="text-center py-2">❌</td>
                </tr>
                <tr>
                  <td className="py-2">Delete Invoices</td>
                  <td className="text-center py-2">✅</td>
                  <td className="text-center py-2">❌</td>
                  <td className="text-center py-2">❌</td>
                </tr>
              </tbody>
            </table>
          </div> */}

          {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {organizationFeatures.map((feature, index) => (
              <div key={index} className="flex items-center space-x-4 bg-white p-4 rounded-xl">
                <div className="flex-shrink-0">
                  {feature.icon}
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">{feature.title}</h4>
                  <p className="text-sm text-gray-600">{feature.description}</p>
                </div>
              </div>
            ))}
          </div> */}
        {/* </div> */}

        {/* Technical Specifications */}
        {/* <div className="bg-gray-50 rounded-2xl p-8 mb-16">
          <h3 className="text-2xl font-bold text-center text-gray-900 mb-8">
            Technical Architecture & Specifications
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {technicalSpecs.map((spec, index) => (
              <div key={index} className="bg-white rounded-xl p-6">
                <h4 className="font-semibold text-gray-900 mb-4">{spec.category}</h4>
                <ul className="space-y-2">
                  {spec.specs.map((item, itemIndex) => (
                    <li key={itemIndex} className="text-sm text-gray-600 flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></div>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div> */}

        {/* Success Metrics & Goals */}
        {/* <div className="bg-gradient-to-r from-emerald-500 to-blue-600 rounded-2xl p-8 text-center text-white">
          <h3 className="text-2xl font-bold mb-4">
            MVP Success Metrics & Goals
          </h3>
          <p className="text-lg opacity-90 max-w-2xl mx-auto mb-8">
            Our success is measured by real impact on rural businesses and their operational efficiency.
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="text-2xl font-bold mb-2">500+</div>
              <div className="text-sm opacity-90">App installs in 3 months</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="text-2xl font-bold mb-2">90%+</div>
              <div className="text-sm opacity-90">Successful sync rate daily</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="text-2xl font-bold mb-2">50+</div>
              <div className="text-sm opacity-90">Accountants using exports monthly</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="text-2xl font-bold mb-2">&lt;5%</div>
              <div className="text-sm opacity-90">Sync conflicts or failures</div>
            </div>
          </div>
        </div> */}
      </div>
    </section>
  );
};

export default Features;