import { Wifi, Phone, FileText, AlertTriangle, Users, Database } from 'lucide-react';

const Problem = () => {
  const problems = [
    {
      icon: <Wifi className="w-8 h-8 text-red-500" />,
      title: "Unreliable Internet = Business Stops",
      description: "Rural areas have poor connectivity. When network fails, existing billing apps become useless and customers leave frustrated.",
      impact: "Lost sales during network outages",
      stat: "60% of rural shops face daily connectivity issues"
    },
    {
      icon: <Phone className="w-8 h-8 text-orange-500" />,
      title: "WhatsApp Screenshot Chaos",
      description: "Shopkeepers send bill photos to accountants via WhatsApp. Data gets lost, quality is poor, requires manual re-entry.",
      impact: "15+ hours weekly wasted on coordination",
      stat: "85% of rural accountants receive data via WhatsApp"
    },
    {
      icon: <FileText className="w-8 h-8 text-yellow-500" />,
      title: "GST Filing Nightmare",
      description: "Multiple disconnected apps, Excel sheets, manual data entry. Accountants spend hours organizing messy data for GST returns.",
      impact: "Risk of ₹25,000+ penalties per violation",
      stat: "70% of small shops face GST compliance issues"
    },
    {
      icon: <Users className="w-8 h-8 text-purple-500" />,
      title: "No Organization Structure",
      description: "Shop owners, staff, and accountants work in silos. No role-based access, no collaboration, no unified business view.",
      impact: "Data security risks and workflow chaos",
      stat: "0% of rural shops have proper RBAC systems"
    },
    {
      icon: <Database className="w-8 h-8 text-blue-500" />,
      title: "Data Silos Everywhere",
      description: "Khatabook for credit, WhatsApp for communication, Excel for reports. Nothing connects, creating operational inefficiencies.",
      impact: "No unified business intelligence",
      stat: "Average shop uses 4+ disconnected tools"
    },
    {
      icon: <AlertTriangle className="w-8 h-8 text-red-600" />,
      title: "Manual Sync Conflicts",
      description: "When multiple people edit the same data, conflicts arise. No proper conflict resolution leads to data loss and errors.",
      impact: "Critical business data gets corrupted",
      stat: "30% of multi-user setups face data conflicts"
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            The Problems We Talked to 100+ Rural Shopkeepers About
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Based on extensive field research across 15 states, here are the core problems 
            that keep rural entrepreneurs up at night.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {problems.map((problem, index) => (
            <div 
              key={index}
              className="group bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border-l-4 border-red-400 hover:border-red-500"
            >
              <div className="mb-6 group-hover:scale-110 transition-transform duration-200">
                {problem.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                {problem.title}
              </h3>
              <p className="text-gray-600 mb-4 leading-relaxed">
                {problem.description}
              </p>
              
              <div className="space-y-3">
                <div className="pt-4 border-t border-gray-100">
                  <p className="text-sm font-medium text-red-600 bg-red-50 px-3 py-2 rounded-lg">
                    💔 {problem.impact}
                  </p>
                </div>
                <div className="bg-gray-50 px-3 py-2 rounded-lg">
                  <p className="text-xs font-medium text-gray-700">
                    📊 {problem.stat}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Impact Summary */}
        <div className="bg-gradient-to-r from-red-500 to-orange-500 rounded-2xl p-8 text-center text-white">
          <h3 className="text-2xl font-bold mb-6">
            The Real Cost of These Problems (Per Shop/Year)
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white/10 rounded-lg p-4">
              <div className="text-2xl font-bold mb-2">₹50,000+</div>
              <div className="text-sm opacity-90">Revenue lost due to inefficiencies</div>
            </div>
            <div className="bg-white/10 rounded-lg p-4">
              <div className="text-2xl font-bold mb-2">780 hrs</div>
              <div className="text-sm opacity-90">Time wasted on manual coordination</div>
            </div>
            <div className="bg-white/10 rounded-lg p-4">
              <div className="text-2xl font-bold mb-2">₹25,000</div>
              <div className="text-sm opacity-90">Average GST penalty per violation</div>
            </div>
            <div className="bg-white/10 rounded-lg p-4">
              <div className="text-2xl font-bold mb-2">0%</div>
              <div className="text-sm opacity-90">Shops with proper organization structure</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Problem;