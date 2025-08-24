import { PageHeader } from "@/components/page-header";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { AlertTriangle, Camera, Shield } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Report an Issue | Simmerce",
  description: "Help us maintain a safe and trustworthy B2B marketplace by reporting issues you encounter on Simmerce.",
  alternates: { canonical: "/report" },
  openGraph: {
    url: "/report",
    title: "Report an Issue | Simmerce",
    description: "Help us maintain a safe and trustworthy B2B marketplace by reporting issues you encounter on Simmerce.",
  },
};

export default function ReportPage() {
  return (
    <div className="min-h-screen bg-slate-50/30">
      <PageHeader
        title="Report an Issue"
        description="Help us maintain a safe and trustworthy B2B marketplace"
      />

      <div className="container mx-auto px-6 max-w-4xl py-16">
        {/* Important Notice */}
        <Alert className="mb-8 border-red-200 bg-red-50">
          <AlertTriangle className="h-4 w-4 text-red-600" />
          <AlertDescription className="text-red-800">
            <strong>Important:</strong> For urgent security issues or fraudulent
            activities, please contact our emergency hotline at +91-XXXX-XXXX-XX
            immediately.
          </AlertDescription>
        </Alert>

        <Card className="border-slate-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-red-600" />
              Submit Report
            </CardTitle>
            <p className="text-sm text-slate-600">
              All reports are reviewed within 24 hours. Your identity will be
              kept confidential.
            </p>
          </CardHeader>
          <CardContent>
            <form className="space-y-6" method="post" action="#">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="text-sm font-medium text-slate-700 mb-2 block">
                    Your Name (Optional)
                  </label>
                  <Input id="name" name="name" placeholder="Enter your name" />
                </div>
                <div>
                  <label htmlFor="email" className="text-sm font-medium text-slate-700 mb-2 block">
                    Email Address
                  </label>
                  <Input id="email" name="email" type="email" placeholder="your.email@company.com" required />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="issue_category" className="text-sm font-medium text-slate-700 mb-2 block">
                    Issue Category *
                  </label>
                  <select
                    id="issue_category"
                    name="issue_category"
                    className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                    defaultValue=""
                  >
                    <option value="" disabled>
                      Select issue type
                    </option>
                    <option value="fraudulent-supplier">Fraudulent Supplier</option>
                    <option value="fake-products">Fake Products/Misleading Info</option>
                    <option value="payment-fraud">Payment Fraud</option>
                    <option value="spam-messages">Spam Messages/Calls</option>
                    <option value="inappropriate-content">Inappropriate Content</option>
                    <option value="technical-issue">Technical Issue</option>
                    <option value="account-security">Account Security</option>
                    <option value="data-privacy">Data Privacy Concern</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="urgency" className="text-sm font-medium text-slate-700 mb-2 block">
                    Urgency Level
                  </label>
                  <select
                    id="urgency"
                    name="urgency"
                    className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    defaultValue=""
                  >
                    <option value="" disabled>
                      Select urgency
                    </option>
                    <option value="low">Low - General inquiry</option>
                    <option value="medium">Medium - Affects my business</option>
                    <option value="high">High - Urgent business impact</option>
                    <option value="critical">Critical - Security/Fraud concern</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="company" className="text-sm font-medium text-slate-700 mb-2 block">
                  Supplier/Company Name (If applicable)
                </label>
                <Input id="company" name="company" placeholder="Enter supplier or company name" />
              </div>

              <div>
                <label htmlFor="product_url" className="text-sm font-medium text-slate-700 mb-2 block">
                  Product/Service URL (If applicable)
                </label>
                <Input id="product_url" name="product_url" placeholder="https://simmerce.com/product/..." />
              </div>

              <div>
                <label htmlFor="description" className="text-sm font-medium text-slate-700 mb-2 block">
                  Detailed Description *
                </label>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="Please provide a detailed description of the issue, including what happened, when it occurred, and any relevant details..."
                  className="min-h-[120px]"
                  required
                />
              </div>

              <div>
                <label className="text-sm font-medium text-slate-700 mb-2 block">
                  Supporting Evidence
                </label>
                <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center">
                  <Camera className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                  <p className="text-sm text-slate-600 mb-2">
                    Upload screenshots, documents, or other evidence
                  </p>
                  <Button type="button" variant="outline" size="sm">
                    Choose Files
                  </Button>
                  <p className="text-xs text-slate-500 mt-2">
                    Max 5 files, 10MB each. Formats: JPG, PNG, PDF, DOC
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <input type="checkbox" id="anonymous" name="anonymous" className="rounded" />
                <label htmlFor="anonymous" className="text-sm text-slate-600">
                  Submit this report anonymously
                </label>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="updates"
                  className="rounded"
                  defaultChecked
                  name="updates"
                />
                <label htmlFor="updates" className="text-sm text-slate-600">
                  Send me updates about this report
                </label>
              </div>

              <Button type="submit" className="w-full bg-red-600 hover:bg-red-700">
                Submit Report
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
