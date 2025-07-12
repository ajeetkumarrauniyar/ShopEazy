// import React from "react";
import {
  Smartphone,
  Cloud,
  PieChart,
  Users,
  // Database,
  // Shield,
  // FolderSync as Sync,
} from "lucide-react";

const Solution = () => {
  const solutions = [
    {
      icon: <Smartphone className="w-8 h-8 text-emerald-600" />,
      title: "100% Offline-First Architecture",
      description: `SQLite local database stores everything. Create invoices, manage inventory, track payments - all without internet. Auto-sync when connected.`,
      benefit: "Never miss a sale again",
      technical: "SQLite + React Native + Background Sync",
    },
    {
      icon: <Users className="w-8 h-8 text-blue-600" />,
      title: "Multi-User Organization & RBAC",
      description:
        "Create organizations, invite members with roles. Owner, Accountant, Staff - each with specific permissions and access levels.",
      benefit: "Structured collaboration with security",
      technical: "Role-based permissions + Supabase Auth",
    },
    {
      icon: <Cloud className="w-8 h-8 text-purple-600" />,
      title: "Smart Auto-Sync with Conflict Resolution",
      description:
        "Express.js API layer handles intelligent sync. Last-write-wins conflict resolution ensures data integrity across all devices.",
      benefit: "Zero data loss, seamless collaboration",
      technical: "Express.js + PostgreSQL + Conflict Resolution",
    },
    {
      icon: <PieChart className="w-8 h-8 text-orange-600" />,
      title: "GST-Ready Export Engine",
      description:
        "One-click export to Excel, CSV, JSON, MARG-compatible XML. All GST formats included with proper tax calculations.",
      benefit: "Effortless compliance and filing",
      technical: "Multi-format export + GST calculation engine",
    },
  ];

  const userStories = [
    {
      role: "Shopkeeper",
      story:
        "I want to create invoices even without internet so that I don't need to wait.",
      solution: "Offline SQLite storage with instant invoice creation",
    },
    {
      role: "Accountant",
      story:
        "I want to sync and correct sales/purchase invoices for GST returns.",
      solution: "Real-time sync with read-only access and export capabilities",
    },
    {
      role: "Salesman",
      story: "I want to create invoices but not access owner-level reports.",
      solution: "Role-based permissions with limited invoice-only access",
    },
    {
      role: "Accountant",
      story:
        "I want to export data to Tally/MARG without doing manual data entry.",
      solution: "Direct export integration with structured data formats",
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            RuralLedger: Built for Rural India's Real Needs
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our solution addresses every problem with a production-ready,
            scalable architecture designed specifically for rural business
            workflows.
          </p>
        </div>

        <div className="mb-20">
          {/* Solutions List */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {solutions.map((solution, index) => (
              <div key={index} className="flex items-start space-x-6 group">
                <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-emerald-50 transition-colors">
                  {solution.icon}
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {solution.title}
                  </h3>
                  <p className="text-gray-600 mb-3 leading-relaxed">
                    {solution.description}
                  </p>
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full inline-block">
                      ✓ {solution.benefit}
                    </p>
                    <p className="text-xs text-gray-500 bg-gray-50 px-3 py-1 rounded-full inline-block">
                      🔧 {solution.technical}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Technical Architecture Diagram */}
        {/* <div> */}
        {/* <div className="bg-gradient-to-br from-emerald-500 to-blue-600 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-6">Technical Architecture</h3>
            
            <div className="space-y-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                <div className="flex items-center gap-3 mb-2">
                  <Smartphone className="w-5 h-5" />
                  <span className="font-semibold">Mobile App Layer</span>
                </div>
                <p className="text-sm opacity-90">React Native + Expo + SQLite</p>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                <div className="flex items-center gap-3 mb-2">
                  <Sync className="w-5 h-5" />
                  <span className="font-semibold">Sync API Layer</span>
                </div>
                <p className="text-sm opacity-90">Express.js + Node.js + Conflict Resolution</p>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                <div className="flex items-center gap-3 mb-2">
                  <Database className="w-5 h-5" />
                  <span className="font-semibold">Cloud Backend</span>
                </div>
                <p className="text-sm opacity-90">Supabase + PostgreSQL + Real-time</p>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                <div className="flex items-center gap-3 mb-2">
                  <Shield className="w-5 h-5" />
                  <span className="font-semibold">Authentication & RBAC</span>
                </div>
                <p className="text-sm opacity-90">Clerk + Custom Role Management</p>
              </div>
            </div>
          </div> */}
        {/* </div> */}

        {/* User Stories Section */}
        <div className="bg-gray-50 rounded-2xl p-8 mb-16">
          <h3 className="text-2xl font-bold text-center text-gray-900 mb-8">
            How RuralLedger Solves Real User Stories
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {userStories.map((story, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-sm">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
                    <span className="text-emerald-600 font-bold text-sm">
                      {story.role[0]}
                    </span>
                  </div>
                  <span className="font-semibold text-gray-900">
                    {story.role}
                  </span>
                </div>
                <p className="text-gray-600 italic mb-3">"{story.story}"</p>
                <p className="text-sm font-medium text-emerald-700 bg-emerald-50 px-3 py-2 rounded-lg">
                  ✓ {story.solution}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* MVP Roadmap Preview */}
        {/* <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-center text-white">
          <h3 className="text-2xl font-bold mb-6">
            MVP Development Roadmap (4-Week Sprint)
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="text-lg font-bold mb-2">Week 1</div>
              <div className="text-sm opacity-90">SQLite Schema + Offline Invoicing</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="text-lg font-bold mb-2">Week 2</div>
              <div className="text-sm opacity-90">Express.js API + Supabase Setup</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="text-lg font-bold mb-2">Week 3</div>
              <div className="text-sm opacity-90">RBAC + Organization Management</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="text-lg font-bold mb-2">Week 4</div>
              <div className="text-sm opacity-90">Export Engine + Pilot Testing</div>
            </div>
          </div>
        </div> */}
      </div>
    </section>
  );
};

export default Solution;
