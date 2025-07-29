import { PageHeader } from "@/components/page-header";
import { Badge } from "@/components/ui/badge";
import { Award, Heart, Shield, Target, Users, Zap } from "lucide-react";
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us - Simmerce',
  description: 'Learn more about Simmerce - Your trusted B2B marketplace connecting buyers and sellers across India.',
};

export default function AboutPage() {
  return (
    <div>
      <PageHeader
        title="About Simmerce"
        description="Your trusted B2B marketplace connecting businesses across India"
      />
      
      <div className="container mx-auto px-6 py-16 max-w-7xl">
        {/* Hero Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          <div className="text-center">
            <div className="text-3xl font-semibold text-slate-800 mb-1">500+</div>
            <div className="text-sm text-slate-600">Verified Suppliers</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-semibold text-slate-800 mb-1">10K+</div>
            <div className="text-sm text-slate-600">Products Listed</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-semibold text-slate-800 mb-1">50+</div>
            <div className="text-sm text-slate-600">Cities Covered</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-semibold text-slate-800 mb-1">2025</div>
            <div className="text-sm text-slate-600">Founded</div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-16">
          {/* Our Story */}
          <div className="bg-white rounded-2xl border border-slate-100 p-8">
            <h2 className="text-2xl font-medium text-slate-800 mb-6 tracking-tight">Our Story</h2>
            <div className="space-y-4 text-slate-600 leading-relaxed">
              <p>
                Founded in 2025, Simmerce was born out of a vision to transform the way businesses connect and trade in India. 
                We recognized the challenges faced by small and medium businesses in finding reliable suppliers and reaching new customers.
              </p>
              <p>
                Today, Simmerce stands as a leading B2B marketplace, connecting thousands of verified buyers with trusted sellers 
                across various industries including Electronics, Textiles, Machinery, Chemicals, and Construction Materials.
              </p>
              <p>
                Our platform empowers businesses to grow by providing access to a vast network of suppliers, competitive pricing, 
                and tools that streamline the procurement process.
              </p>
            </div>
          </div>

          {/* Our Mission */}
          <div className="bg-white rounded-2xl border border-slate-100 p-8">
            <h2 className="text-2xl font-medium text-slate-800 mb-6 tracking-tight">Our Mission</h2>
            <div className="space-y-4 text-slate-600 leading-relaxed">
              <p>
                To empower businesses of all sizes by providing a seamless, transparent, and efficient platform for B2B commerce 
                that drives growth and innovation across India's business ecosystem.
              </p>
              <p>
                We believe in democratizing access to quality suppliers and creating opportunities for businesses to scale, 
                regardless of their size or location.
              </p>
            </div>
            <div className="mt-6">
              <Badge className="bg-red-50 text-red-700 border border-red-100 hover:bg-red-50">
                Connecting Businesses • Building Trust • Driving Growth
              </Badge>
            </div>
          </div>
        </div>

        {/* Why Choose Simmerce */}
        <div className="bg-white rounded-2xl border border-slate-100 p-8 mb-16">
          <h2 className="text-2xl font-medium text-slate-800 mb-8 tracking-tight text-center">Why Choose Simmerce?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-medium text-slate-800 mb-2">Verified Suppliers</h3>
              <p className="text-sm text-slate-600">All suppliers undergo rigorous verification to ensure quality and reliability</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="font-medium text-slate-800 mb-2">Wide Product Range</h3>
              <p className="text-sm text-slate-600">Access to diverse categories from electronics to industrial machinery</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="font-medium text-slate-800 mb-2">Dedicated Support</h3>
              <p className="text-sm text-slate-600">24/7 customer support to help you with inquiries and transactions</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="w-6 h-6 text-red-600" />
              </div>
              <h3 className="font-medium text-slate-800 mb-2">Easy Platform</h3>
              <p className="text-sm text-slate-600">Intuitive interface designed for efficient B2B transactions</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-yellow-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-6 h-6 text-yellow-600" />
              </div>
              <h3 className="font-medium text-slate-800 mb-2">Quality Assurance</h3>
              <p className="text-sm text-slate-600">Strict quality standards and supplier rating system</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-6 h-6 text-emerald-600" />
              </div>
              <h3 className="font-medium text-slate-800 mb-2">Trust & Transparency</h3>
              <p className="text-sm text-slate-600">Open communication and transparent business practices</p>
            </div>
          </div>
        </div>

        {/* Our Values */}
        <div>
          <h2 className="text-2xl font-medium text-slate-800 mb-8 tracking-tight text-center">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl border border-slate-100 p-8 hover:shadow-lg transition-all duration-300">
              <h3 className="font-medium text-slate-800 text-lg mb-3">Integrity</h3>
              <p className="text-slate-600 leading-relaxed">We believe in honest and ethical business practices that build trust with our community of buyers and suppliers.</p>
            </div>
            <div className="bg-white rounded-2xl border border-slate-100 p-8 hover:shadow-lg transition-all duration-300">
              <h3 className="font-medium text-slate-800 text-lg mb-3">Innovation</h3>
              <p className="text-slate-600 leading-relaxed">Continuously improving our platform with cutting-edge technology to better serve our users' evolving needs.</p>
            </div>
            <div className="bg-white rounded-2xl border border-slate-100 p-8 hover:shadow-lg transition-all duration-300">
              <h3 className="font-medium text-slate-800 text-lg mb-3">Customer Focus</h3>
              <p className="text-slate-600 leading-relaxed">Putting our users at the heart of everything we do, ensuring their success drives our platform development.</p>
            </div>
            <div className="bg-white rounded-2xl border border-slate-100 p-8 hover:shadow-lg transition-all duration-300">
              <h3 className="font-medium text-slate-800 text-lg mb-3">Excellence</h3>
              <p className="text-slate-600 leading-relaxed">Striving for the highest standards in all aspects of our service, from supplier verification to customer support.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
