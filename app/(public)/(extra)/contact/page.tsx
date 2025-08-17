import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-slate-50/30">
      <PageHeader
        title="Contact Us"
        description="Get in touch with our team for any inquiries or support"
      />

      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="border-slate-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageCircle className="w-5 h-5 text-red-600" />
                  Send us a Message
                </CardTitle>
                <p className="text-sm text-slate-600">
                  We'll get back to you as soon as possible, typically within 24
                  hours on business days.
                </p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-slate-700 mb-2 block">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <Input placeholder="Your name" required />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-slate-700 mb-2 block">
                      Company Name <span className="text-red-500">*</span>
                    </label>
                    <Input placeholder="Your company" required />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-slate-700 mb-2 block">
                    Business Email <span className="text-red-500">*</span>
                  </label>
                  <Input
                    type="email"
                    placeholder="your.email@company.com"
                    required
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-slate-700 mb-2 block">
                    Phone Number
                  </label>
                  <Input type="tel" placeholder="+91 XXXXXXXXXX" />
                </div>

                <div>
                  <label className="text-sm font-medium text-slate-700 mb-2 block">
                    Subject <span className="text-red-500">*</span>
                  </label>
                  <Input placeholder="How can we help?" required />
                </div>

                <div>
                  <label className="text-sm font-medium text-slate-700 mb-2 block">
                    Your Message <span className="text-red-500">*</span>
                  </label>
                  <Textarea
                    placeholder="Please provide details about your inquiry..."
                    className="min-h-[120px]"
                    required
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-red-600 hover:bg-red-700"
                >
                  Send Message
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Contact Information */}
          <Card className="border-slate-200">
            <CardHeader>
              <CardTitle className="text-lg">Contact Information</CardTitle>
              <p className="text-sm text-slate-600">
                Reach out through any of these channels
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-red-50 rounded-lg">
                  <Mail className="h-5 w-5 text-red-600" />
                </div>
                <div>
                  <h3 className="font-medium text-slate-900">Email Us</h3>
                  <p className="text-sm text-slate-600">
                    For general inquiries and support
                  </p>
                  <a
                    href="mailto:contact@simmerce.com"
                    className="text-sm text-red-600 hover:underline"
                  >
                    contact@simmerce.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 bg-red-50 rounded-lg">
                  <Phone className="h-5 w-5 text-red-600" />
                </div>
                <div>
                  <h3 className="font-medium text-slate-900">Call Us</h3>
                  <p className="text-sm text-slate-600">For urgent inquiries</p>
                  <a
                    href="tel:+911234567890"
                    className="text-sm text-red-600 hover:underline"
                  >
                    +91 12345 67890
                  </a>
                  <p className="text-xs text-slate-500 mt-1">
                    Monday - Friday, 9 AM - 6 PM IST
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 bg-red-50 rounded-lg">
                  <MapPin className="h-5 w-5 text-red-600" />
                </div>
                <div>
                  <h3 className="font-medium text-slate-900">Our Office</h3>
                  <p className="text-sm text-slate-600">
                    Simmerce Technologies Pvt. Ltd.
                  </p>
                  <p className="text-sm text-slate-600">
                    123 Business Park, Sector 44
                  </p>
                  <p className="text-sm text-slate-600">
                    Gurugram, Haryana 122002
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
