import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { 
  Calendar, 
  Users, 
  TrendingUp, 
  Plus,
  CheckCircle,
  Clock,
  Zap,
  MessageSquare,
  BarChart3
} from "lucide-react"

/**
 * Dashboard Page - Main landing page after login
 * Shows overview of church activities, AI agent status, and quick actions
 */
export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gradient-subtle">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Welcome back, Pastor John! 👋
          </h1>
          <p className="text-gray-600 text-lg">
            Here's what's happening in your church community
          </p>
        </div>

        {/* Stats Cards Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Upcoming Events Card */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Upcoming Events
              </CardTitle>
              <Calendar className="h-4 w-4 text-primary-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">5</div>
              <p className="text-xs text-gray-500 mt-1">
                Next: Sunday Worship (Dec 15)
              </p>
            </CardContent>
          </Card>

          {/* New Members Card */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                New Members
              </CardTitle>
              <Users className="h-4 w-4 text-secondary-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">3</div>
              <p className="text-xs text-gray-500 mt-1">
                This week (+2 from last week)
              </p>
            </CardContent>
          </Card>

          {/* Attendance Card */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                This Week's Attendance
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">85%</div>
              <p className="text-xs text-green-600 mt-1">
                +12% from last week ↗️
              </p>
            </CardContent>
          </Card>
        </div>

        {/* AI Agents Status Section */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Zap className="h-5 w-5 text-yellow-500" />
              <span>AI Agent Status</span>
            </CardTitle>
            <CardDescription>
              Your intelligent assistants working behind the scenes
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Calendar Agent */}
              <div className="flex items-center space-x-3 p-3 rounded-lg bg-green-50 border border-green-200">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <div>
                  <p className="font-medium text-sm">Calendar Agent</p>
                  <p className="text-xs text-gray-600">Active & Synced</p>
                </div>
              </div>

              {/* Design Agent */}
              <div className="flex items-center space-x-3 p-3 rounded-lg bg-green-50 border border-green-200">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <div>
                  <p className="font-medium text-sm">Design Agent</p>
                  <p className="text-xs text-gray-600">Ready to Create</p>
                </div>
              </div>

              {/* Onboarding Agent */}
              <div className="flex items-center space-x-3 p-3 rounded-lg bg-green-50 border border-green-200">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <div>
                  <p className="font-medium text-sm">Onboarding Agent</p>
                  <p className="text-xs text-gray-600">3 Active Tasks</p>
                </div>
              </div>

              {/* Insights Agent */}
              <div className="flex items-center space-x-3 p-3 rounded-lg bg-yellow-50 border border-yellow-200">
                <Clock className="h-5 w-5 text-yellow-500" />
                <div>
                  <p className="font-medium text-sm">Insights Agent</p>
                  <p className="text-xs text-gray-600">Processing Data</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions Section */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>
              Common tasks to manage your church operations
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button className="h-auto p-4 flex flex-col items-center space-y-2">
                <Plus className="h-6 w-6" />
                <span>Create Event</span>
              </Button>
              
              <Button variant="secondary" className="h-auto p-4 flex flex-col items-center space-y-2">
                <MessageSquare className="h-6 w-6" />
                <span>Send Announcement</span>
              </Button>
              
              <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2">
                <BarChart3 className="h-6 w-6" />
                <span>View Reports</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity Section */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>
              Latest updates from your church community
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Activity Item 1 */}
              <div className="flex items-start space-x-3 p-3 rounded-lg bg-blue-50">
                <div className="h-2 w-2 bg-blue-500 rounded-full mt-2"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Christmas Outreach flyer generated</p>
                  <p className="text-xs text-gray-600">Design Agent • 2 hours ago</p>
                </div>
              </div>

              {/* Activity Item 2 */}
              <div className="flex items-start space-x-3 p-3 rounded-lg bg-green-50">
                <div className="h-2 w-2 bg-green-500 rounded-full mt-2"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Sarah Johnson completed onboarding step 3</p>
                  <p className="text-xs text-gray-600">Onboarding Agent • 4 hours ago</p>
                </div>
              </div>

              {/* Activity Item 3 */}
              <div className="flex items-start space-x-3 p-3 rounded-lg bg-purple-50">
                <div className="h-2 w-2 bg-purple-500 rounded-full mt-2"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Weekly attendance report ready</p>
                  <p className="text-xs text-gray-600">Insights Agent • 6 hours ago</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}