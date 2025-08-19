import { PageHeader } from "@/components/page-header";
import { Badge } from "@/components/ui/badge";
import { Eye, FileText, Lock, Mail, Shield, UserCheck } from "lucide-react";
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy - Simmerce',
  description: 'Learn how Simmerce protects your privacy and handles your data.',
};

export default function PrivacyPage() {
  const privacySections = [
    {
      icon: FileText,
      title: "Information We Collect",
      content: [
        "Business identification information (company name, GSTIN, business registration)",
        "Contact details (name, email, phone number, business address)",
        "Financial information for B2B transactions and credit verification",
        "Product and service information for supplier listings",
        "Communication records between buyers and suppliers",
        "Platform usage data and analytics for service improvement"
      ]
    },
    {
      icon: Eye,
      title: "How We Use Your Information",
      content: [
        "Facilitate B2B transactions and supplier-buyer connections",
        "Verify business credentials and maintain platform trust",
        "Process inquiries, quotes, and business communications",
        "Provide customer support and resolve disputes",
        "Improve our platform features and user experience",
        "Ensure compliance with legal and regulatory requirements"
      ]
    },
    {
      icon: Lock,
      title: "Data Security & Protection",
      content: [
        "Industry-standard encryption for all data transmission",
        "Secure data storage with regular security audits",
        "Access controls and authentication measures",
        "Regular security updates and vulnerability assessments",
        "Compliance with data protection regulations",
        "24/7 monitoring for suspicious activities"
      ]
    },
    {
      icon: UserCheck,
      title: "Your Rights & Controls",
      content: [
        "Access and review your personal and business information",
        "Request correction or update of your data",
        "Request deletion of your account and associated data",
        "Control marketing communications and notifications",
        "Export your business data in standard formats",
        "Withdraw consent for data processing where applicable"
      ]
    }
  ];

  return (
    <div>
      <PageHeader
        title="Privacy Policy"
        description="Learn how we protect your business data and maintain your privacy"
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
          <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <Shield className="w-8 h-8 text-red-600" />
          </div>
          <h2 className="text-2xl font-medium text-slate-800 mb-4 tracking-tight">Our Commitment to Your Privacy</h2>
          <p className="text-slate-600 leading-relaxed max-w-3xl mx-auto">
            At Simmerce, we understand the importance of protecting your business information. This Privacy Policy 
            explains how we collect, use, and safeguard your data when you use our B2B marketplace platform. 
            We are committed to maintaining the highest standards of data protection and transparency.
          </p>
        </div>

        {/* Privacy Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {privacySections.map((section, index) => {
            const Icon = section.icon;
            return (
              <div key={index} className="bg-white rounded-2xl border border-slate-100 p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center">
                    <Icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-medium text-slate-800 tracking-tight">{section.title}</h3>
                </div>
                <ul className="space-y-3">
                  {section.content.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start gap-3 text-slate-600">
                      <div className="w-1.5 h-1.5 bg-red-600 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-sm leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        {/* Data Sharing & Third Parties */}
        <div className="bg-white rounded-2xl border border-slate-100 p-8 mb-16">
          <h3 className="text-xl font-medium text-slate-800 mb-6 tracking-tight">Data Sharing & Third Parties</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h4 className="font-medium text-slate-800 mb-3">When We Share Data</h4>
              <ul className="space-y-2 text-sm text-slate-600">
                <li>• With your explicit consent for business connections</li>
                <li>• To facilitate legitimate B2B transactions</li>
                <li>• For legal compliance and regulatory requirements</li>
                <li>• With trusted service providers under strict agreements</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-slate-800 mb-3">We Never Share</h4>
              <ul className="space-y-2 text-sm text-slate-600">
                <li>• Your data for marketing by third parties</li>
                <li>• Sensitive financial information without consent</li>
                <li>• Personal data with competitors</li>
                <li>• Information that could harm your business interests</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Cookies & Tracking */}
        <div className="bg-white rounded-2xl border border-slate-100 p-8 mb-16">
          <h3 className="text-xl font-medium text-slate-800 mb-6 tracking-tight">Cookies & Tracking</h3>
          <div className="space-y-4 text-slate-600">
            <p>
              We use cookies and similar technologies to enhance your experience on our platform. These help us:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-4 bg-slate-50 rounded-xl">
                <h4 className="font-medium text-slate-800 mb-2">Essential Cookies</h4>
                <p className="text-sm">Required for platform functionality and security</p>
              </div>
              <div className="text-center p-4 bg-slate-50 rounded-xl">
                <h4 className="font-medium text-slate-800 mb-2">Analytics Cookies</h4>
                <p className="text-sm">Help us understand usage patterns and improve services</p>
              </div>
              <div className="text-center p-4 bg-slate-50 rounded-xl">
                <h4 className="font-medium text-slate-800 mb-2">Preference Cookies</h4>
                <p className="text-sm">Remember your settings and personalize experience</p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div className="bg-primary/5 rounded-2xl p-8 text-center">
          <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
            <Mail className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-xl font-medium text-slate-800 mb-3 tracking-tight">Questions About Privacy?</h3>
          <p className="text-slate-600 mb-6 max-w-2xl mx-auto">
            If you have any questions about this Privacy Policy or how we handle your data, 
            our privacy team is here to help.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="mailto:privacy@simmerce.com" 
              className="inline-flex items-center justify-center px-6 py-3 bg-primary text-white rounded-xl font-medium hover:bg-primary/80 transition-colors"
            >
              <Mail className="w-4 h-4 mr-2" />
              Email Privacy Team
            </a>
            <a 
              href="/help" 
              className="inline-flex items-center justify-center px-6 py-3 bg-white text-primary border border-primary rounded-xl font-medium hover:bg-primary/10 transition-colors"
            >
              Visit Help Center
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
