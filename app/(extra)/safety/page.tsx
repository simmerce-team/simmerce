import { PageHeader } from '@/components/page-header';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle, CheckCircle, CreditCard, Eye, FileText, Lock, MessageSquare, Phone, Shield, Users } from 'lucide-react';

export default function SafetyPage() {
  return (
    <div className="min-h-screen bg-slate-50/30">
      <PageHeader 
        title="Safety Guidelines" 
        description="Stay safe while trading on Simmerce B2B marketplace"
      />

      <div className="container mx-auto px-6 max-w-6xl py-16">
        {/* Important Safety Alert */}
        <Alert className="mb-8 border-red-200 bg-red-50">
          <AlertTriangle className="h-4 w-4 text-red-600" />
          <AlertDescription className="text-red-800">
            <strong>Stay Alert:</strong> Simmerce will never ask for your passwords, OTPs, or payment details over phone or email. Always verify supplier credentials before making any payments.
          </AlertDescription>
        </Alert>

        {/* Safety Categories */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Supplier Verification */}
          <Card className="border-slate-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-emerald-600" />
                Supplier Verification
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-slate-900">Look for Verification Badges</h4>
                    <p className="text-sm text-slate-600">Always prioritize suppliers with verified badges and high ratings.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-slate-900">Check Business Documents</h4>
                    <p className="text-sm text-slate-600">Verify GST certificates, trade licenses, and company registration details.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-slate-900">Visit Physical Location</h4>
                    <p className="text-sm text-slate-600">For high-value orders, consider visiting the supplier's facility.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-slate-900">Read Reviews & Ratings</h4>
                    <p className="text-sm text-slate-600">Check feedback from other buyers and their trading history.</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Secure Communication */}
          <Card className="border-slate-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-blue-600" />
                Secure Communication
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-slate-900">Use Platform Messaging</h4>
                    <p className="text-sm text-slate-600">Keep all communications within Simmerce's secure messaging system.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-slate-900">Document Everything</h4>
                    <p className="text-sm text-slate-600">Keep records of all agreements, quotes, and communications.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-slate-900">Verify Contact Details</h4>
                    <p className="text-sm text-slate-600">Cross-check phone numbers and email addresses with official records.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-slate-900">Be Cautious of Urgency</h4>
                    <p className="text-sm text-slate-600">Be wary of suppliers pushing for immediate decisions or payments.</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Payment Security */}
          <Card className="border-slate-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-purple-600" />
                Payment Security
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-slate-900">Use Secure Payment Methods</h4>
                    <p className="text-sm text-slate-600">Prefer bank transfers, letters of credit, or escrow services for large orders.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-slate-900">Avoid Advance Payments</h4>
                    <p className="text-sm text-slate-600">Never pay 100% in advance. Use milestone-based payments when possible.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-slate-900">Verify Bank Details</h4>
                    <p className="text-sm text-slate-600">Double-check bank account details and beneficiary names before transfer.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-slate-900">Get Payment Receipts</h4>
                    <p className="text-sm text-slate-600">Always obtain proper invoices and payment acknowledgments.</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Account Security */}
          <Card className="border-slate-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lock className="w-5 h-5 text-orange-600" />
                Account Security
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-slate-900">Strong Passwords</h4>
                    <p className="text-sm text-slate-600">Use unique, complex passwords and enable two-factor authentication.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-slate-900">Regular Login Monitoring</h4>
                    <p className="text-sm text-slate-600">Check your account activity regularly and report suspicious logins.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-slate-900">Secure Devices</h4>
                    <p className="text-sm text-slate-600">Only access your account from trusted devices and secure networks.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-slate-900">Logout After Use</h4>
                    <p className="text-sm text-slate-600">Always log out completely, especially on shared computers.</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Red Flags Section */}
        <Card className="border-red-200 bg-red-50/50 mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-red-800">
              <AlertTriangle className="w-5 h-5" />
              Red Flags to Watch Out For
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <h4 className="font-medium text-red-800">Suspicious Supplier Behavior</h4>
                <ul className="text-sm text-red-700 space-y-1">
                  <li>• Requests for immediate full payment</li>
                  <li>• Unusually low prices compared to market rates</li>
                  <li>• Reluctance to provide business documents</li>
                  <li>• No physical address or contact details</li>
                  <li>• Pressure to move communication off-platform</li>
                </ul>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium text-red-800">Payment & Communication Red Flags</h4>
                <ul className="text-sm text-red-700 space-y-1">
                  <li>• Requests for payment to personal accounts</li>
                  <li>• Poor grammar or unprofessional communication</li>
                  <li>• Inconsistent product information</li>
                  <li>• No samples or quality certificates available</li>
                  <li>• Fake testimonials or reviews</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Emergency Contact & Reporting */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="border-slate-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Phone className="w-5 h-5 text-red-600" />
                Emergency Contact
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-medium text-slate-900 mb-2">24/7 Fraud Hotline</h4>
                <p className="text-lg font-semibold text-red-600">+91-XXXX-XXXX-XX</p>
                <p className="text-sm text-slate-600">For immediate assistance with fraud or security issues</p>
              </div>
              <div>
                <h4 className="font-medium text-slate-900 mb-2">Security Email</h4>
                <p className="text-lg font-semibold text-red-600">security@simmerce.com</p>
                <p className="text-sm text-slate-600">Report security concerns and suspicious activities</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-slate-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-blue-600" />
                Additional Resources
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full justify-start">
                <Eye className="w-4 h-4 mr-2" />
                How to Spot Fake Suppliers
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Users className="w-4 h-4 mr-2" />
                Buyer Protection Program
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Shield className="w-4 h-4 mr-2" />
                Verification Process Guide
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <AlertTriangle className="w-4 h-4 mr-2" />
                Report Suspicious Activity
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Safety Commitment */}
        <Card className="border-emerald-200 bg-emerald-50/50 mt-8">
          <CardContent className="p-8 text-center">
            <Shield className="w-12 h-12 text-emerald-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-emerald-800 mb-2">Our Safety Commitment</h3>
            <p className="text-emerald-700 max-w-2xl mx-auto">
              Simmerce is committed to providing a safe and secure B2B marketplace. We continuously monitor activities, 
              verify suppliers, and work with law enforcement to protect our users from fraud and ensure trustworthy business transactions.
            </p>
            <div className="flex justify-center gap-4 mt-6">
              <Badge variant="secondary" className="bg-emerald-100 text-emerald-800 border-emerald-300">
                24/7 Monitoring
              </Badge>
              <Badge variant="secondary" className="bg-emerald-100 text-emerald-800 border-emerald-300">
                Verified Suppliers
              </Badge>
              <Badge variant="secondary" className="bg-emerald-100 text-emerald-800 border-emerald-300">
                Secure Platform
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
