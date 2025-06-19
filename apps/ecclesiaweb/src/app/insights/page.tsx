import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown,
  Users, 
  Calendar,
  Download,
  RefreshCw,
  Eye,
  Target,
  Award,
  Clock
} from "lucide-react"

/**
 * Insights Page - Analytics and AI-generated insights
 * Shows attendance trends, member engagement, and predictive analytics
 */
export default function InsightsPage() {
  // Mock analytics data
  const mockInsights = {
    attendance: {
      thisWeek: 245,
      lastWeek: 218,
      trend: 12.4,
      monthlyAverage: 232
    },
    membership: {
      total: 156,
      newThisMonth: 8,
      activeMembers: 142,
      retentionRate: 91
    },
    events: {
      thisMonth: 12,
      avgAttendance: 78,
      mostPopular: "Sunday Worship"
    },
    aiInsights: [
      "Attendance has increased 12% this week, likely due to the Christmas season approaching.",
      "Youth Ministry events show 23% higher engagement when scheduled on Friday evenings.",
      "New member retention improves by 34% when they're assigned to a small group within 2 weeks.",
      "Community outreach events generate 2.3x more volunteer sign-ups than other event types."
    ]
  }

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Church Insights
            </h1>
            <p className="text-gray-600">
              AI-powered analytics to understand your community better
            </p>
          </div>
          
          <div className="flex space-x-2">
            <Button variant="outline" className="flex items-center space-x-2">
              <RefreshCw className="h-4 w-4" />
              <span>Refresh Data</span>
            </Button>
            
            <Button className="flex items-center space-x-2">
              <Download className="h-4 w-4" />
              <span>Export Report</span>
            </Button>
          </div>
        </div>

        {/* Key Metrics Row */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {/* Attendance Metric */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Weekly Attendance
              </CardTitle>
              <Users className="h-4 w-4 text-primary-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{mockInsights.attendance.thisWeek}</div>
              <div className="flex items-center space-x-1 mt-1">
                <TrendingUp className="h-3 w-3 text-green-500" />
                <span className="text-xs text-green-600">
                  +{mockInsights.attendance.trend}% from last week
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Total Members */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Total Members
              </CardTitle>
              <Target className="h-4 w-4 text-secondary-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{mockInsights.membership.total}</div>
              <p className="text-xs text-gray-500 mt-1">
                +{mockInsights.membership.newThisMonth} new this month
              </p>
            </CardContent>
          </Card>

          {/* Retention Rate */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Retention Rate
              </CardTitle>
              <Award className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{mockInsights.membership.retentionRate}%</div>
              <p className="text-xs text-gray-500 mt-1">
                {mockInsights.membership.activeMembers} active members
              </p>
            </CardContent>
          </Card>

          {/* Events This Month */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Events This Month
              </CardTitle>
              <Calendar className="h-4 w-4 text-accent-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{mockInsights.events.thisMonth}</div>
              <p className="text-xs text-gray-500 mt-1">
                Avg. {mockInsights.events.avgAttendance} attendees
              </p>
            </CardContent>
          </Card>
        </div>

        {/* AI Insights Section */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <div className="h-6 w-6 rounded bg-gradient-primary flex items-center justify-center">
                <span className="text-white text-xs">🤖</span>
              </div>
              <span>AI-Generated Insights</span>
            </CardTitle>
            <CardDescription>
              Intelligent observations about your church community patterns
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockInsights.aiInsights.map((insight, index) => (
                <div
                  key={index}
                  className="flex items-start space-x-3 p-4 rounded-lg bg-blue-50 border border-blue-200"
                >
                  <div className="h-6 w-6 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-white text-xs font-bold">{index + 1}</span>
                  </div>
                  <p className="text-sm text-blue-800 leading-relaxed">{insight}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Attendance Trend Chart Placeholder */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BarChart3 className="h-5 w-5 text-primary-500" />
                <span>Attendance Trends</span>
              </CardTitle>
              <CardDescription>Weekly attendance over the past 3 months</CardDescription>
            </CardHeader>
            <CardContent>
              {/* Placeholder for chart - we'll add real charts later */}
              <div className="h-64 bg-gradient-to-br from-primary-50 to-secondary-50 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300">
                <div className="text-center">
                  <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-500 text-sm">Chart visualization coming soon</p>
                  <p className="text-xs text-gray-400">Integration with charting library</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Event Engagement Chart Placeholder */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="h-5 w-5 text-green-500" />
                <span>Event Engagement</span>
              </CardTitle>
              <CardDescription>Participation rates by event type</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64 bg-gradient-to-br from-green-50 to-blue-50 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300">
                <div className="text-center">
                  <TrendingUp className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-500 text-sm">Engagement metrics visualization</p>
                  <p className="text-xs text-gray-400">Coming in next update</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity & Recommendations */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Clock className="h-5 w-5 text-gray-500" />
                <span>Recent Activity</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center space-x-3 p-2 rounded-lg bg-gray-50">
                  <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Sunday service attendance recorded</p>
                    <p className="text-xs text-gray-500">245 attendees • 2 hours ago</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3 p-2 rounded-lg bg-gray-50">
                  <div className="h-2 w-2 bg-blue-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">New member onboarding completed</p>
                    <p className="text-xs text-gray-500">Sarah Johnson • 4 hours ago</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3 p-2 rounded-lg bg-gray-50">
                  <div className="h-2 w-2 bg-purple-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Christmas event planning started</p>
                    <p className="text-xs text-gray-500">Outreach team • 6 hours ago</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* AI Recommendations */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Eye className="h-5 w-5 text-yellow-500" />
                <span>AI Recommendations</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="p-3 rounded-lg bg-yellow-50 border border-yellow-200">
                  <p className="text-sm font-medium text-yellow-800">Schedule More Youth Events</p>
                  <p className="text-xs text-yellow-600 mt-1">
                    Youth engagement is 15% below average. Consider adding Friday evening activities.
                  </p>
                </div>

                <div className="p-3 rounded-lg bg-green-50 border border-green-200">
                  <p className="text-sm font-medium text-green-800">Optimize Small Group Assignments</p>
                  <p className="text-xs text-green-600 mt-1">
                    New members in small groups have 34% better retention. Prioritize quick assignments.
                  </p>
                </div>

                <div className="p-3 rounded-lg bg-blue-50 border border-blue-200">
                  <p className="text-sm font-medium text-blue-800">Expand Community Outreach</p>
                  <p className="text-xs text-blue-600 mt-1">
                    Outreach events generate 2.3x more volunteer interest. Consider monthly programs.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
