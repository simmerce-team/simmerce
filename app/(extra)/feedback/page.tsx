import { PageHeader } from '@/components/page-header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { MessageSquare, Star } from 'lucide-react';

export default function FeedbackPage() {
  return (
    <div className="min-h-screen bg-slate-50/30">
      <PageHeader 
        title="Share Your Feedback" 
        description="Help us improve Simmerce by sharing your thoughts and suggestions"
      />

      <div className="container mx-auto px-6 max-w-4xl py-16">
      <Card className="border-slate-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-red-600" />
                  Submit Feedback
                </CardTitle>
                <p className="text-sm text-slate-600">
                  Your feedback helps us build a better B2B marketplace experience
                </p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-slate-700 mb-2 block">
                      Your Name
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

                <div>
                  <label className="text-sm font-medium text-slate-700 mb-2 block">
                    Feedback Category
                  </label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="feature-request">Feature Request</SelectItem>
                      <SelectItem value="improvement">General Improvement</SelectItem>
                      <SelectItem value="bug-report">Bug Report</SelectItem>
                      <SelectItem value="user-experience">User Experience</SelectItem>
                      <SelectItem value="supplier-quality">Supplier Quality</SelectItem>
                      <SelectItem value="search-results">Search & Filtering</SelectItem>
                      <SelectItem value="mobile-app">Mobile Experience</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium text-slate-700 mb-2 block">
                    Overall Rating
                  </label>
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map((rating) => (
                      <button
                        key={rating}
                        className="p-1 hover:scale-110 transition-transform"
                      >
                        <Star className="w-6 h-6 text-slate-300 hover:text-yellow-400 hover:fill-yellow-400" />
                      </button>
                    ))}
                    <span className="hidden md:block text-sm text-slate-500 ml-2">Rate your experience</span>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-slate-700 mb-2 block">
                    Your Feedback
                  </label>
                  <Textarea 
                    placeholder="Please share your thoughts, suggestions, or report any issues you've encountered..."
                    className="min-h-[120px]"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-slate-700 mb-2 block">
                    How can we improve? (Optional)
                  </label>
                  <Textarea 
                    placeholder="What specific improvements would you like to see?"
                    className="min-h-[80px]"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <input type="checkbox" id="updates" className="rounded" />
                  <label htmlFor="updates" className="text-sm text-slate-600">
                    I'd like to receive updates about improvements based on my feedback
                  </label>
                </div>

                <Button className="w-full bg-red-600 hover:bg-red-700">
                  Submit Feedback
                </Button>
              </CardContent>
            </Card>
      </div>
    </div>
  );
}
