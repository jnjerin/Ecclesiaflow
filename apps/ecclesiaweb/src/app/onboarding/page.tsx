import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { 
  Users, 
  Plus,
  CheckCircle,
  Clock,
  User,
  Calendar,
  MessageSquare,
  FileText,
  Award
} from "lucide-react"

/**
 * Onboarding Page - Manages new member onboarding process
 * Shows member progress and AI-generated personalized content
 */
export default function OnboardingPage() {
  // Mock data for new members
  const mockMembers = [
    {
      id: "1",
      name: "Sarah Johnson",
      email: "sarah.johnson@email.com",
      joinedDate: "Dec 10, 2024",
      progress: 80,
      avatar: "SJ",
      tasks: [
        { id: "1", title: "Welcome packet received", completed: true, dueDate: null },
        { id: "2", title: "Pastor meeting scheduled", completed: true, dueDate: null },
        { id: "3", title: "Small group assignment", completed: false, dueDate: "Dec 18" },
        { id: "4", title: "Volunteer interest survey", completed: false, dueDate: "Dec 20" },
      ],
      aiGenerated: {
        welcomePoster: true,
        personalizedMessage: true,
        groupRecommendations: ["Worship Team", "Community Outreach"]
      }
    },
    {
      id: "2",
      name: "Michael Chen",
      email: "michael.chen@email.com", 
      joinedDate: "Dec 12, 2024",
      progress: 45,
      avatar: "MC",
      tasks: [
        { id: "1", title: "Welcome packet received", completed: true, dueDate: null },
        { id: "2", title: "Pastor meeting scheduled", completed: false, dueDate: "Dec 16" },
        { id: "3", title: "Church tour", completed: false, dueDate: "Dec 17" },
        { id: "4", title: "Small group assignment", completed: false, dueDate: "Dec 22" },
      ],
      aiGenerated: {
        welcomePoster: true,
        personalizedMessage: false,
        groupRecommendations: ["Youth Ministry", "Media Team"]
      }
    },
    {
      id: "3",
      name: "Emily Rodriguez",
      email: "emily.rodriguez@email.com",
      joinedDate: "Dec 13, 2024", 
      progress: 25,
      avatar: "ER",
      tasks: [
        { id: "1", title: "Welcome packet received", completed: true, dueDate: null },
        { id: "2", title: "Pastor meeting scheduled", completed: false, dueDate: "Dec 19" },
        { id: "3", title: "Church tour", completed: false, dueDate: "Dec 20" },
        { id: "4", title: "Small group assignment", completed: false, dueDate: "Dec 25" },
      ],
      aiGenerated: {
        welcomePoster: false,
        personalizedMessage: false,
        groupRecommendations: []
      }
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Member Onboarding
            </h1>
            <p className="text-gray-600">
              Guide new members through their journey with personalized AI assistance
            </p>
          </div>
          
          <Button className="flex items-center space-x-2">
            <Plus className="h-4 w-4" />
            <span>Add New Member</span>
          </Button>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Active Members
              </CardTitle>
              <Users className="h-4 w-4 text-primary-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
              <p className="text-xs text-gray-500">Currently onboarding</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Avg. Progress
              </CardTitle>
              <Award className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">50%</div>
              <p className="text-xs text-gray-500">Across all members</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Tasks Due
              </CardTitle>
              <Clock className="h-4 w-4 text-yellow-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">5</div>
              <p className="text-xs text-gray-500">This week</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                AI Content
              </CardTitle>
              <FileText className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2</div>
              <p className="text-xs text-gray-500">Generated this week</p>
            </CardContent>
          </Card>
        </div>

        {/* Members List */}
        <div className="space-y-6">
          {mockMembers.map((member) => (
            <Card key={member.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-4">
                    {/* Avatar */}
                    <div className="h-12 w-12 rounded-full bg-gradient-primary flex items-center justify-center">
                      <span className="text-white font-medium">{member.avatar}</span>
                    </div>
                    
                    {/* Member Info */}
                    <div>
                      <CardTitle className="text-lg">{member.name}</CardTitle>
                      <CardDescription className="flex items-center space-x-4">
                        <span>{member.email}</span>
                        <span>•</span>
                        <span>Joined: {member.joinedDate}</span>
                      </CardDescription>
                    </div>
                  </div>

                  {/* Progress Circle */}
                  <div className="text-center">
                    <div className="relative w-16 h-16">
                      <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 36 36">
                        <path
                          className="text-gray-200"
                          stroke="currentColor"
                          strokeWidth="3"
                          fill="none"
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        />
                        <path
                          className="text-primary-500"
                          stroke="currentColor"
                          strokeWidth="3"
                          strokeDasharray={`${member.progress}, 100`}
                          strokeLinecap="round"
                          fill="none"
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-sm font-medium">{member.progress}%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardHeader>

              <CardContent>
                {/* Tasks Progress */}
                <div className="mb-6">
                  <h4 className="font-medium text-sm text-gray-700 mb-3">Onboarding Tasks</h4>
                  <div className="space-y-2">
                    {member.tasks.map((task) => (
                      <div
                        key={task.id}
                        className={`flex items-center justify-between p-3 rounded-lg ${
                          task.completed ? 'bg-green-50 border border-green-200' : 'bg-gray-50 border border-gray-200'
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          {task.completed ? (
                            <CheckCircle className="h-5 w-5 text-green-500" />
                          ) : (
                            <Clock className="h-5 w-5 text-yellow-500" />
                          )}
                          <span className={`text-sm ${task.completed ? 'text-green-800' : 'text-gray-700'}`}>
                            {task.title}
                          </span>
                        </div>
                        
                        {task.dueDate && !task.completed && (
                          <span className="text-xs text-gray-500 bg-white px-2 py-1 rounded">
                            Due: {task.dueDate}
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* AI Generated Content */}
                <div className="mb-6">
                  <h4 className="font-medium text-sm text-gray-700 mb-3 flex items-center space-x-1">
                    <span>🤖 AI Personalized Content</span>
                  </h4>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className={`p-3 rounded-lg ${member.aiGenerated.welcomePoster ? 'bg-green-50 border border-green-200' : 'bg-gray-50 border border-gray-200'}`}>
                      <div className="flex items-center space-x-2">
                        {member.aiGenerated.welcomePoster ? (
                          <CheckCircle className="h-4 w-4 text-green-500" />
                        ) : (
                          <Clock className="h-4 w-4 text-yellow-500" />
                        )}
                        <span className="text-sm">Welcome Poster</span>
                      </div>
                    </div>

                    <div className={`p-3 rounded-lg ${member.aiGenerated.personalizedMessage ? 'bg-green-50 border border-green-200' : 'bg-gray-50 border border-gray-200'}`}>
                      <div className="flex items-center space-x-2">
                        {member.aiGenerated.personalizedMessage ? (
                          <CheckCircle className="h-4 w-4 text-green-500" />
                        ) : (
                          <Clock className="h-4 w-4 text-yellow-500" />
                        )}
                        <span className="text-sm">Personal Message</span>
                      </div>
                    </div>
                  </div>

                  {member.aiGenerated.groupRecommendations.length > 0 && (
                    <div className="mt-3">
                      <p className="text-xs text-gray-600 mb-2">AI Recommended Groups:</p>
                      <div className="flex flex-wrap gap-2">
                        {member.aiGenerated.groupRecommendations.map((group) => (
                          <span
                            key={group}
                            className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full"
                          >
                            {group}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-2">
                  <Button variant="outline" size="sm" className="flex items-center space-x-1">
                    <User className="h-4 w-4" />
                    <span>View Profile</span>
                  </Button>
                  
                  <Button variant="outline" size="sm" className="flex items-center space-x-1">
                    <Calendar className="h-4 w-4" />
                    <span>Schedule Meeting</span>
                  </Button>
                  
                  <Button variant="secondary" size="sm" className="flex items-center space-x-1">
                    <MessageSquare className="h-4 w-4" />
                    <span>Send Message</span>
                  </Button>
                  
                  {member.aiGenerated.welcomePoster && (
                    <Button variant="outline" size="sm">
                      View Welcome Poster
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {mockMembers.length === 0 && (
          <Card className="text-center py-12">
            <CardContent>
              <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No members onboarding</h3>
              <p className="text-gray-600 mb-4">
                Start welcoming new members to your church community
              </p>
              <Button className="flex items-center space-x-2">
                <Plus className="h-4 w-4" />
                <span>Add First Member</span>
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
