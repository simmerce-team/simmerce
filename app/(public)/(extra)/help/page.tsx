import { Button } from "@/components/ui/button";
import { Building2, HelpCircle, Mail, Phone, Search, Shield, UserPlus } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Help Center - Simmerce',
  description: 'Find answers to common questions and get support for Simmerce B2B marketplace.',
};

export default function HelpPage() {
  const faqs = [
    {
      question: 'How do I create a business account?',
      answer: 'Click "Join as Supplier" or "Sign Up" to create your business account. You\'ll need to provide business details and verification documents for supplier accounts.'
    },
    {
      question: 'How do I list my products for bulk orders?',
      answer: 'Go to your supplier dashboard, click "Add Product", enter product details including minimum order quantity, unit pricing, and bulk pricing tiers.'
    },
    {
      question: 'What is the minimum order quantity (MOQ)?',
      answer: 'MOQ is set by each supplier based on their business requirements. This ensures efficient bulk transactions and better pricing for buyers.'
    },
    {
      question: 'How do I contact suppliers for inquiries?',
      answer: 'Click "Send Inquiry" on any product page or supplier profile. You can also use the "Contact Seller" button to start direct communication.'
    },
    {
      question: 'How does supplier verification work?',
      answer: 'We verify suppliers through business registration documents, GST certificates, and quality assessments to ensure reliable B2B partnerships.'
    },
    {
      question: 'What are the payment terms for B2B transactions?',
      answer: 'Payment terms are negotiated directly between buyers and suppliers. Common terms include advance payment, credit terms, or payment on delivery.'
    },
    {
      question: 'Can I get custom pricing for large orders?',
      answer: 'Yes! Contact suppliers directly for custom quotes on large volume orders. Many suppliers offer better pricing for bulk purchases.'
    },
    {
      question: 'How do I become a verified supplier?',
      answer: 'Submit your business documents, complete the verification process, and maintain good ratings. Verified suppliers get priority visibility and trust badges.'
    }
  ];

  const helpCategories = [
    {
      icon: UserPlus,
      title: "Getting Started",
      description: "Learn how to set up your business account and start trading",
      color: "blue",
      topics: ["Account Setup", "Business Verification", "Profile Optimization"]
    },
    {
      icon: Building2,
      title: "For Suppliers",
      description: "Guide to listing products and managing your supplier profile",
      color: "green",
      topics: ["Product Listing", "Pricing Strategy", "Lead Management"]
    },
    {
      icon: Search,
      title: "For Buyers",
      description: "Find suppliers, send inquiries, and manage procurement",
      color: "purple",
      topics: ["Supplier Search", "Inquiry Process", "Bulk Ordering"]
    },
    {
      icon: Shield,
      title: "Trust & Safety",
      description: "Learn about our verification process and safety measures",
      color: "red",
      topics: ["Supplier Verification", "Quality Assurance", "Dispute Resolution"]
    }
  ];

  const getColorClasses = (color: string) => {
    switch (color) {
      case 'blue': return 'bg-blue-50 text-blue-600';
      case 'green': return 'bg-green-50 text-green-600';
      case 'purple': return 'bg-purple-50 text-purple-600';
      case 'red': return 'bg-red-50 text-red-600';
      default: return 'bg-slate-50 text-slate-600';
    }
  };

  return (
    <div>
      
      <div className="container mx-auto px-6 py-16 max-w-7xl">
        {/* Search Section */}
        <div className="text-center mb-16">
          <h2 className="text-2xl font-medium text-slate-800 mb-6 tracking-tight">How can we help you?</h2>
          <div className="max-w-xl mx-auto relative">
            <input
              type="text"
              placeholder="Search help articles..."
              className="w-full px-5 py-4 border border-slate-200 rounded-xl pl-12 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
            />
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
          </div>
        </div>

        {/* Help Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {helpCategories.map((category, index) => {
            const Icon = category.icon;
            return (
              <div key={index} className="bg-white rounded-2xl border border-slate-100 p-6 hover:shadow-lg transition-all duration-300">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-4 ${getColorClasses(category.color)}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-medium text-slate-800 mb-2">{category.title}</h3>
                <p className="text-sm text-slate-600 mb-4">{category.description}</p>
                <div className="space-y-1">
                  {category.topics.map((topic, topicIndex) => (
                    <div key={topicIndex} className="text-xs text-slate-500">• {topic}</div>
                  ))}
                </div>
                <Button variant="outline" className="w-full mt-4 border-slate-200 hover:border-primary hover:bg-primary/10 text-sm">
                  Learn More
                </Button>
              </div>
            );
          })}
        </div>

        {/* FAQ Section */}
        <div className="bg-white rounded-2xl border border-slate-100 p-8 mb-16">
          <h2 className="text-2xl font-medium text-slate-800 mb-8 tracking-tight text-center">Frequently Asked Questions</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {faqs.map((faq, index) => (
              <div key={index} className="border-b border-slate-100 pb-6 last:border-b-0">
                <h3 className="font-medium text-slate-800 mb-3 flex items-start gap-2">
                  <HelpCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  {faq.question}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed pl-6">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Support */}
        <div className="bg-primary/5 rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-medium text-slate-800 mb-3 tracking-tight">Still need help?</h2>
          <p className="text-slate-600 mb-6">Our B2B support team is here to assist you with your business needs</p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
            <div className="bg-white rounded-xl p-4 border border-slate-100">
              <Mail className="w-6 h-6 text-primary mx-auto mb-2" />
              <h3 className="font-medium text-slate-800 text-sm mb-1">Email Support</h3>
              <p className="text-xs text-slate-600 mb-3">Get detailed help via email</p>
              <Button variant="outline" size="sm" className="w-full border-slate-200 hover:border-primary hover:bg-primary/10">
                Email Us
              </Button>
            </div>
            
            <div className="bg-white rounded-xl p-4 border border-slate-100">
              <Phone className="w-6 h-6 text-green-600 mx-auto mb-2" />
              <h3 className="font-medium text-slate-800 text-sm mb-1">Phone Support</h3>
              <p className="text-xs text-slate-600 mb-3">Speak with our team directly</p>
              <Button variant="outline" size="sm" className="w-full border-slate-200 hover:border-green-300 hover:bg-green-50">
                Call Us
              </Button>
            </div>
            
            {/* <div className="bg-white rounded-xl p-4 border border-slate-100">
              <MessageCircle className="w-6 h-6 text-purple-600 mx-auto mb-2" />
              <h3 className="font-medium text-slate-800 text-sm mb-1">Live Chat</h3>
              <p className="text-xs text-slate-600 mb-3">Chat with support instantly</p>
              <Button variant="outline" size="sm" className="w-full border-slate-200 hover:border-purple-300 hover:bg-purple-50">
                Start Chat
              </Button>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}
