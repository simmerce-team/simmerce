import { PageHeader } from '@/components/page-header';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, Award, Building, MapPin, Quote, Star, TrendingUp, Users } from 'lucide-react';

const successStories = [
  {
    id: 1,
    companyName: "TechnoFab Industries",
    industry: "Electronics Manufacturing",
    location: "Bangalore, Karnataka",
    story: "We were struggling to find reliable suppliers for our electronic components. Simmerce connected us with verified manufacturers who not only provided quality products but also helped us reduce costs by 30%. Our production efficiency has increased significantly.",
    results: {
      costReduction: "30%",
      timeToMarket: "45 days faster",
      supplierNetwork: "15+ verified suppliers"
    },
    testimonial: "Simmerce transformed our supply chain. The verified supplier network gave us confidence to scale our operations nationwide.",
    contactPerson: "Rajesh Kumar",
    designation: "Procurement Head",
    rating: 5,
    image: "/placeholder.svg",
    tags: ["Cost Reduction", "Supply Chain", "Electronics"]
  },
  {
    id: 2,
    companyName: "Green Textiles Ltd",
    industry: "Textile Manufacturing",
    location: "Coimbatore, Tamil Nadu",
    story: "As a sustainable textile manufacturer, finding eco-friendly raw material suppliers was challenging. Through Simmerce, we discovered suppliers who shared our environmental values and helped us achieve organic certification.",
    results: {
      sustainabilityGoals: "100% organic cotton",
      newMarkets: "3 international markets",
      revenueGrowth: "250% in 18 months"
    },
    testimonial: "The platform's verification system helped us find genuine sustainable suppliers. Our business has grown exponentially while maintaining our environmental commitments.",
    contactPerson: "Priya Sharma",
    designation: "Founder & CEO",
    rating: 5,
    image: "/placeholder.svg",
    tags: ["Sustainability", "Organic", "Export"]
  },
  {
    id: 3,
    companyName: "Metro Construction Co.",
    industry: "Construction & Infrastructure",
    location: "Mumbai, Maharashtra",
    story: "Managing multiple construction projects required reliable suppliers for steel, cement, and other materials. Simmerce's bulk ordering system and verified suppliers helped us complete projects on time and within budget.",
    results: {
      projectsCompleted: "25+ on-time deliveries",
      costSavings: "₹2.5 Crore annually",
      supplierReliability: "99.8% delivery success"
    },
    testimonial: "The bulk pricing and reliable delivery schedules from Simmerce suppliers have been game-changers for our construction timeline management.",
    contactPerson: "Amit Patel",
    designation: "Operations Director",
    rating: 5,
    image: "/placeholder.svg",
    tags: ["Construction", "Bulk Orders", "Infrastructure"]
  },
  {
    id: 4,
    companyName: "Pharma Solutions Inc",
    industry: "Pharmaceutical",
    location: "Hyderabad, Telangana",
    story: "Finding FDA-approved chemical suppliers for our pharmaceutical manufacturing was critical. Simmerce's verification process ensured we connected with compliant suppliers, helping us maintain our quality standards.",
    results: {
      complianceRate: "100% FDA compliant",
      qualityImprovement: "Zero rejections",
      timeToApproval: "60% faster"
    },
    testimonial: "The rigorous supplier verification gave us confidence in our supply chain. We've maintained perfect compliance records since joining Simmerce.",
    contactPerson: "Dr. Meera Reddy",
    designation: "Quality Assurance Head",
    rating: 5,
    image: "/placeholder.svg",
    tags: ["Pharmaceutical", "FDA Compliance", "Quality"]
  }
];

const platformStats = [
  { label: "Success Stories", value: "500+", icon: Award },
  { label: "Business Growth", value: "300%", icon: TrendingUp },
  { label: "Cost Savings", value: "₹100Cr+", icon: Building },
  { label: "Happy Clients", value: "10,000+", icon: Users }
];

function SuccessStoryCard({ story }: { story: typeof successStories[0] }) {
  return (
    <Card className="border-slate-200 hover:shadow-lg transition-all duration-300">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-lg text-slate-900">{story.companyName}</CardTitle>
            <p className="text-sm text-slate-600 mt-1">{story.industry}</p>
            <div className="flex items-center gap-1 mt-2">
              <MapPin className="w-3 h-3 text-slate-400" />
              <span className="text-xs text-slate-500">{story.location}</span>
            </div>
          </div>
          <div className="flex items-center gap-1">
            {[...Array(story.rating)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            ))}
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-wrap gap-2">
          {story.tags.map((tag, index) => (
            <Badge key={index} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
        
        <p className="text-sm text-slate-600 leading-relaxed">{story.story}</p>
        
        <div className="bg-slate-50 rounded-lg p-4">
          <h4 className="font-medium text-slate-900 mb-3 text-sm">Key Results:</h4>
          <div className="grid grid-cols-1 gap-2">
            {Object.entries(story.results).map(([key, value], index) => (
              <div key={index} className="flex justify-between items-center">
                <span className="text-xs text-slate-600 capitalize">
                  {key.replace(/([A-Z])/g, ' $1').trim()}
                </span>
                <span className="text-xs font-medium text-slate-900">{value}</span>
              </div>
            ))}
          </div>
        </div>
        
        <div className="border-l-4 border-red-200 pl-4 py-2">
          <Quote className="w-4 h-4 text-red-600 mb-2" />
          <p className="text-sm italic text-slate-700 mb-2">{story.testimonial}</p>
          <div className="text-xs text-slate-500">
            <span className="font-medium">{story.contactPerson}</span>
            <span className="mx-1">•</span>
            <span>{story.designation}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default function SuccessStoriesPage() {
  return (
    <div className="min-h-screen bg-slate-50/30">
      <PageHeader 
        title="Success Stories" 
        description="Discover how businesses are growing with Simmerce B2B marketplace"
      />

      <div className="container mx-auto px-6 max-w-7xl py-16">
        {/* Platform Impact Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {platformStats.map((stat, index) => (
            <Card key={index} className="border-slate-200 text-center">
              <CardContent className="p-6">
                <stat.icon className="w-8 h-8 text-red-600 mx-auto mb-3" />
                <div className="text-2xl font-semibold text-slate-900 mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-slate-600">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Hero Section */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-semibold text-slate-900 mb-4">
            Real Businesses, Real Growth
          </h2>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            From startups to established enterprises, see how Simmerce has helped businesses 
            across India find reliable suppliers, reduce costs, and accelerate growth.
          </p>
        </div>

        {/* Success Stories Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {successStories.map((story) => (
            <SuccessStoryCard key={story.id} story={story} />
          ))}
        </div>

        {/* Industry Highlights */}
        <Card className="border-slate-200 mb-16">
          <CardHeader>
            <CardTitle className="text-center">Industries We've Transformed</CardTitle>
            <p className="text-center text-slate-600">
              Simmerce has enabled success across diverse B2B sectors
            </p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { name: "Electronics", growth: "40% avg growth", companies: "2,500+" },
                { name: "Textiles", growth: "35% cost savings", companies: "1,800+" },
                { name: "Construction", growth: "50% faster delivery", companies: "1,200+" },
                { name: "Chemicals", growth: "99% compliance", companies: "800+" },
                { name: "Automotive", growth: "25% efficiency", companies: "1,500+" },
                { name: "Machinery", growth: "60% quality boost", companies: "900+" },
                { name: "Pharmaceuticals", growth: "100% FDA compliance", companies: "600+" },
                { name: "Food & Beverage", growth: "30% market expansion", companies: "1,100+" }
              ].map((industry, index) => (
                <div key={index} className="text-center p-4 rounded-lg bg-slate-50">
                  <h4 className="font-medium text-slate-900 mb-2">{industry.name}</h4>
                  <p className="text-sm text-red-600 font-medium mb-1">{industry.growth}</p>
                  <p className="text-xs text-slate-500">{industry.companies} companies</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Call to Action */}
        <Card className="border-red-200 bg-gradient-to-r from-red-50 to-red-100/50">
          <CardContent className="p-8 text-center">
            <h3 className="text-2xl font-semibold text-slate-900 mb-4">
              Ready to Write Your Success Story?
            </h3>
            <p className="text-slate-600 mb-6 max-w-2xl mx-auto">
              Join thousands of businesses that have transformed their operations with Simmerce. 
              Start connecting with verified suppliers and grow your business today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-red-600 hover:bg-red-700">
                Find Suppliers Now
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <Button variant="outline" className="border-red-200 text-red-600 hover:bg-red-50">
                Share Your Story
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Testimonial Highlights */}
        <div className="mt-16">
          <h3 className="text-2xl font-semibold text-slate-900 text-center mb-8">
            What Our Partners Say
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                quote: "Simmerce's verification process gave us confidence to expand our supplier network globally.",
                author: "Sarah Chen",
                company: "Global Manufacturing Ltd",
                rating: 5
              },
              {
                quote: "The platform's bulk ordering system helped us achieve 40% cost reduction in raw materials.",
                author: "Vikram Singh",
                company: "Industrial Solutions Co",
                rating: 5
              },
              {
                quote: "Finding ISO-certified suppliers was never this easy. Our quality standards have improved significantly.",
                author: "Anita Desai",
                company: "Premium Textiles",
                rating: 5
              }
            ].map((testimonial, index) => (
              <Card key={index} className="border-slate-200">
                <CardContent className="p-6">
                  <div className="flex items-center gap-1 mb-3">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-sm text-slate-600 mb-4 italic">"{testimonial.quote}"</p>
                  <div className="text-xs text-slate-500">
                    <span className="font-medium">{testimonial.author}</span>
                    <br />
                    <span>{testimonial.company}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
