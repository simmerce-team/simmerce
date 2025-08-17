import { PageHeader } from "@/components/page-header";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, FileText, Mail, Scale, Shield, Users } from "lucide-react";
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms and Conditions - Simmerce',
  description: 'Terms and conditions for using Simmerce B2B marketplace platform.',
};

export default function TermsPage() {
  const termsSections = [
    {
      icon: Users,
      title: "Account & Registration",
      content: [
        "Provide accurate business information and maintain account security",
        "Verify business credentials including GSTIN and company registration",
        "Ensure authorized personnel access your business account",
        "Maintain up-to-date contact information and business details",
        "Comply with all applicable business registration requirements"
      ]
    },
    {
      icon: FileText,
      title: "Platform Usage",
      content: [
        "Use the platform exclusively for legitimate B2B transactions",
        "Post accurate product information, pricing, and specifications",
        "Maintain professional communication with other businesses",
        "Respect intellectual property rights of other users",
        "Follow platform guidelines for product listings and inquiries"
      ]
    },
    {
      icon: Shield,
      title: "Business Transactions",
      content: [
        "Simmerce facilitates connections between buyers and suppliers",
        "All transactions occur directly between registered businesses",
        "Verify supplier credentials and product quality independently",
        "Negotiate terms, pricing, and delivery directly with counterparts",
        "Resolve disputes through direct communication or legal channels"
      ]
    },
    {
      icon: AlertTriangle,
      title: "Prohibited Activities",
      content: [
        "Posting false or misleading business information",
        "Engaging in fraudulent or deceptive business practices",
        "Violating any applicable laws or regulations",
        "Infringing on intellectual property or trademark rights",
        "Disrupting platform operations or other users' activities"
      ]
    }
  ];

  const liabilityPoints = [
    "Product quality, authenticity, or compliance with specifications",
    "Delivery timelines, shipping costs, or logistics arrangements",
    "Payment processing, credit terms, or financial transactions",
    "Business disputes, contract breaches, or legal compliance",
    "Third-party services, integrations, or external platforms"
  ];

  return (
    <div>
      <PageHeader
        title="Terms and Conditions"
        description="Terms governing the use of Simmerce B2B marketplace platform"
      />
      
      <div className="container mx-auto px-6 py-16 max-w-7xl">
        {/* Last Updated */}
        <div className="text-center mb-12">
          <Badge className="bg-slate-50 text-slate-600 border border-slate-200">
            Last updated: July 25, 2025
          </Badge>
        </div>

        {/* Introduction */}
        <div className="bg-white rounded-2xl border border-slate-100 p-8 mb-16 text-center">
          <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <Scale className="w-8 h-8 text-blue-600" />
          </div>
          <h2 className="text-2xl font-medium text-slate-800 mb-4 tracking-tight">Terms of Service</h2>
          <p className="text-slate-600 leading-relaxed max-w-3xl mx-auto">
            Welcome to Simmerce! These terms and conditions govern your use of our B2B marketplace platform. 
            By accessing and using our services, you agree to comply with these terms. Please read them carefully 
            before using our platform for your business needs.
          </p>
        </div>

        {/* Key Definitions */}
        <div className="bg-white rounded-2xl border border-slate-100 p-8 mb-16">
          <h3 className="text-xl font-medium text-slate-800 mb-6 tracking-tight">Key Definitions</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-slate-800 mb-2">"Platform"</h4>
                <p className="text-sm text-slate-600">Simmerce website, mobile app, and all related services</p>
              </div>
              <div>
                <h4 className="font-medium text-slate-800 mb-2">"User"</h4>
                <p className="text-sm text-slate-600">Any business entity or authorized representative using our services</p>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-slate-800 mb-2">"Service"</h4>
                <p className="text-sm text-slate-600">B2B marketplace services facilitating business connections</p>
              </div>
              <div>
                <h4 className="font-medium text-slate-800 mb-2">"Content"</h4>
                <p className="text-sm text-slate-600">Product listings, business information, and user-generated content</p>
              </div>
            </div>
          </div>
        </div>

        {/* Terms Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {termsSections.map((section, index) => {
            const Icon = section.icon;
            return (
              <div key={index} className="bg-white rounded-2xl border border-slate-100 p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center">
                    <Icon className="w-6 h-6 text-green-600" />
                  </div>
                  <h3 className="text-xl font-medium text-slate-800 tracking-tight">{section.title}</h3>
                </div>
                <ul className="space-y-3">
                  {section.content.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start gap-3 text-slate-600">
                      <div className="w-1.5 h-1.5 bg-green-600 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-sm leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        {/* Limitation of Liability */}
        <div className="bg-white rounded-2xl border border-slate-100 p-8 mb-16">
          <h3 className="text-xl font-medium text-slate-800 mb-6 tracking-tight">Limitation of Liability</h3>
          <div className="space-y-6">
            <p className="text-slate-600 leading-relaxed">
              Simmerce operates as a B2B marketplace platform connecting businesses. We facilitate connections 
              but are not responsible for the actual transactions between parties. Our liability is limited regarding:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-slate-800 mb-3">We Are Not Responsible For:</h4>
                <ul className="space-y-2">
                  {liabilityPoints.map((point, index) => (
                    <li key={index} className="flex items-start gap-3 text-slate-600">
                      <div className="w-1.5 h-1.5 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-sm">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-orange-50 rounded-xl p-6">
                <h4 className="font-medium text-slate-800 mb-3">Important Notice</h4>
                <p className="text-sm text-slate-600 leading-relaxed">
                  All business transactions are conducted directly between registered users. 
                  Please conduct due diligence, verify credentials, and establish clear terms 
                  before engaging in any business relationship.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Intellectual Property */}
        <div className="bg-white rounded-2xl border border-slate-100 p-8 mb-16">
          <h3 className="text-xl font-medium text-slate-800 mb-6 tracking-tight">Intellectual Property</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h4 className="font-medium text-slate-800 mb-3">Platform Content</h4>
              <p className="text-sm text-slate-600 mb-4">
                Simmerce owns all rights to the platform design, features, and proprietary technology.
              </p>
              <ul className="space-y-2 text-sm text-slate-600">
                <li>• Platform interface and user experience</li>
                <li>• Proprietary algorithms and matching systems</li>
                <li>• Simmerce branding and trademarks</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-slate-800 mb-3">User Content</h4>
              <p className="text-sm text-slate-600 mb-4">
                You retain ownership of your business content while granting us necessary usage rights.
              </p>
              <ul className="space-y-2 text-sm text-slate-600">
                <li>• Product listings and business information</li>
                <li>• Company logos and marketing materials</li>
                <li>• User-generated reviews and content</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Termination & Changes */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="bg-white rounded-2xl border border-slate-100 p-8">
            <h3 className="text-xl font-medium text-slate-800 mb-4 tracking-tight">Account Termination</h3>
            <p className="text-slate-600 text-sm leading-relaxed mb-4">
              Either party may terminate the account relationship with proper notice:
            </p>
            <ul className="space-y-2 text-sm text-slate-600">
              <li>• 30-day notice for voluntary termination</li>
              <li>• Immediate termination for policy violations</li>
              <li>• Data export available for 90 days post-termination</li>
            </ul>
          </div>
          <div className="bg-white rounded-2xl border border-slate-100 p-8">
            <h3 className="text-xl font-medium text-slate-800 mb-4 tracking-tight">Terms Updates</h3>
            <p className="text-slate-600 text-sm leading-relaxed mb-4">
              We may update these terms to reflect platform improvements:
            </p>
            <ul className="space-y-2 text-sm text-slate-600">
              <li>• 30-day advance notice for major changes</li>
              <li>• Email notifications to registered users</li>
              <li>• Continued use implies acceptance of new terms</li>
            </ul>
          </div>
        </div>

        {/* Contact Section */}
        <div className="bg-gradient-to-br from-green-50 to-green-100/50 rounded-2xl p-8 text-center">
          <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <Mail className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-xl font-medium text-slate-800 mb-3 tracking-tight">Questions About Terms?</h3>
          <p className="text-slate-600 mb-6 max-w-2xl mx-auto">
            Our legal team is available to clarify any questions about these terms and conditions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="mailto:legal@Simmerce.com" 
              className="inline-flex items-center justify-center px-6 py-3 bg-green-600 text-white rounded-xl font-medium hover:bg-green-700 transition-colors"
            >
              <Mail className="w-4 h-4 mr-2" />
              Contact Legal Team
            </a>
            <a 
              href="/help" 
              className="inline-flex items-center justify-center px-6 py-3 bg-white text-green-600 border border-green-200 rounded-xl font-medium hover:bg-green-50 transition-colors"
            >
              Visit Help Center
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
