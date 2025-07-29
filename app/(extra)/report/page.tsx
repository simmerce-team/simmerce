import { PageHeader } from "@/components/page-header";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { AlertTriangle, Camera, Shield } from "lucide-react";

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
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-slate-700 mb-2 block">
                  Your Name (Optional)
                </label>
                <Input placeholder="Enter your name" />
              </div>
              <div>
                <label className="text-sm font-medium text-slate-700 mb-2 block">
                  Email Address
                </label>
                <Input type="email" placeholder="your.email@company.com" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-slate-700 mb-2 block">
                  Issue Category *
                </label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select issue type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="fraudulent-supplier">
                      Fraudulent Supplier
                    </SelectItem>
                    <SelectItem value="fake-products">
                      Fake Products/Misleading Info
                    </SelectItem>
                    <SelectItem value="payment-fraud">Payment Fraud</SelectItem>
                    <SelectItem value="spam-messages">
                      Spam Messages/Calls
                    </SelectItem>
                    <SelectItem value="inappropriate-content">
                      Inappropriate Content
                    </SelectItem>
                    <SelectItem value="technical-issue">
                      Technical Issue
                    </SelectItem>
                    <SelectItem value="account-security">
                      Account Security
                    </SelectItem>
                    <SelectItem value="data-privacy">
                      Data Privacy Concern
                    </SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium text-slate-700 mb-2 block">
                  Urgency Level
                </label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select urgency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low - General inquiry</SelectItem>
                    <SelectItem value="medium">
                      Medium - Affects my business
                    </SelectItem>
                    <SelectItem value="high">
                      High - Urgent business impact
                    </SelectItem>
                    <SelectItem value="critical">
                      Critical - Security/Fraud concern
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-slate-700 mb-2 block">
                Supplier/Company Name (If applicable)
              </label>
              <Input placeholder="Enter supplier or company name" />
            </div>

            <div>
              <label className="text-sm font-medium text-slate-700 mb-2 block">
                Product/Service URL (If applicable)
              </label>
              <Input placeholder="https://simmerce.com/product/..." />
            </div>

            <div>
              <label className="text-sm font-medium text-slate-700 mb-2 block">
                Detailed Description *
              </label>
              <Textarea
                placeholder="Please provide a detailed description of the issue, including what happened, when it occurred, and any relevant details..."
                className="min-h-[120px]"
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
                <Button variant="outline" size="sm">
                  Choose Files
                </Button>
                <p className="text-xs text-slate-500 mt-2">
                  Max 5 files, 10MB each. Formats: JPG, PNG, PDF, DOC
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <input type="checkbox" id="anonymous" className="rounded" />
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
              />
              <label htmlFor="updates" className="text-sm text-slate-600">
                Send me updates about this report
              </label>
            </div>

            <Button className="w-full bg-red-600 hover:bg-red-700">
              Submit Report
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
