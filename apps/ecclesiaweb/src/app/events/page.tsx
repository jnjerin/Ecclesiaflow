import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { 
  Calendar, 
  Users, 
  MapPin, 
  Clock,
  Plus,
  Search,
  Filter,
  CheckCircle,
  AlertCircle,
  Edit,
  MessageSquare
} from "lucide-react"
import React from "react"

/**
 * Events Page - Displays and manages church events
 * Shows upcoming events with AI-generated content status
 */
export default function EventsPage() {
  // Mock data - we'll replace this with real data later
  const mockEvents = [
    {
      id: "1",
      title: "Sunday Worship Service",
      date: "Dec 15, 2024",
      time: "9:00 AM - 11:00 AM",
      location: "Main Sanctuary",
      groups: ["Worship Team", "Ushers"],
      volunteerCount: 12,
      aiStatus: {
        flyerGenerated: true,
        remindersSent: true,
        socialPostReady: true
      },
      attendeeCount: 245,
      status: "published"
    },
    {
      id: "2", 
      title: "Christmas Outreach Program",
      date: "Dec 20, 2024",
      time: "2:00 PM - 6:00 PM",
      location: "Community Center",
      groups: ["Outreach Team"],
      volunteerCount: 8,
      volunteersNeeded: 15,
      aiStatus: {
        flyerGenerated: false,
        remindersSent: false,
        socialPostReady: false,
        generating: true
      },
      attendeeCount: 0,
      status: "draft"
    },
    {
      id: "3",
      title: "Youth Bible Study",
      date: "Dec 18, 2024", 
      time: "7:00 PM - 8:30 PM",
      location: "Youth Room",
      groups: ["Youth Ministry"],
      volunteerCount: 4,
      aiStatus: {
        flyerGenerated: true,
        remindersSent: false,
        socialPostReady: true
      },
      attendeeCount: 28,
      status: "published"
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Events Management
            </h1>
            <p className="text-gray-600">
              Organize and coordinate church events with AI assistance
            </p>
          </div>
          
          <Button className="flex items-center space-x-2">
            <Plus className="h-4 w-4" />
            <span>New Event</span>
          </Button>
        </div>

        {/* Search and Filter Bar */}
        <Card className="mb-6">
          <CardContent className="py-4">
            <div className="flex flex-col sm:flex-row gap-4 items-center">
              {/* Search Input */}
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search events..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
              
              {/* Filter Buttons */}
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" className="flex items-center space-x-1">
                  <Filter className="h-4 w-4" />
                  <span>All Events</span>
                </Button>
                
                <Button variant="outline" size="sm">
                  This Month
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Events List */}
        <div className="space-y-6">
          {mockEvents.map((event) => (
            <Card key={event.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <CardTitle className="text-xl mb-2 flex items-center space-x-2">
                      <span>{event.title}</span>
                      {event.status === 'published' ? (
                        <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                          Published
                        </span>
                      ) : (
                        <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">
                          Draft
                        </span>
                      )}
                    </CardTitle>
                    
                    <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-3">
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-4 w-4" />
                        <span>{event.date}</span>
                      </div>
                      
                      <div className="flex items-center space-x-1">
                        <Clock className="h-4 w-4" />
                        <span>{event.time}</span>
                      </div>
                      
                      <div className="flex items-center space-x-1">
                        <MapPin className="h-4 w-4" />
                        <span>{event.location}</span>
                      </div>
                      
                      <div className="flex items-center space-x-1">
                        <Users className="h-4 w-4" />
                        <span>
                          {event.volunteerCount} volunteers
                          {event.volunteersNeeded && ` (${event.volunteersNeeded} needed)`}
                        </span>
                      </div>
                    </div>

                    {/* Groups/Teams */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {event.groups.map((group) => (
                        <span
                          key={group}
                          className="px-3 py-1 bg-primary-100 text-primary-700 text-sm rounded-full"
                        >
                          {group}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </CardHeader>

              <CardContent>
                {/* AI Status Section */}
                <div className="mb-4">
                  <h4 className="font-medium text-sm text-gray-700 mb-2 flex items-center space-x-1">
                    <span>🤖 AI Assistant Status</span>
                    {event.aiStatus.generating && (
                      <span className="text-yellow-600">(Generating content...)</span>
                    )}
                  </h4>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {/* Flyer Status */}
                    <div className="flex items-center space-x-2 p-2 rounded-lg bg-gray-50">
                      {event.aiStatus.flyerGenerated ? (
                        <CheckCircle className="h-4 w-4 text-green-500" />
                      ) : (
                        <AlertCircle className="h-4 w-4 text-yellow-500" />
                      )}
                      <span className="text-sm">
                        Flyer {event.aiStatus.flyerGenerated ? 'Generated' : 'Pending'}
                      </span>
                    </div>

                    {/* Reminders Status */}
                    <div className="flex items-center space-x-2 p-2 rounded-lg bg-gray-50">
                      {event.aiStatus.remindersSent ? (
                        <CheckCircle className="h-4 w-4 text-green-500" />
                      ) : (
                        <AlertCircle className="h-4 w-4 text-yellow-500" />
                      )}
                      <span className="text-sm">
                        Reminders {event.aiStatus.remindersSent ? 'Sent' : 'Pending'}
                      </span>
                    </div>

                    {/* Social Post Status */}
                    <div className="flex items-center space-x-2 p-2 rounded-lg bg-gray-50">
                      {event.aiStatus.socialPostReady ? (
                        <CheckCircle className="h-4 w-4 text-green-500" />
                      ) : (
                        <AlertCircle className="h-4 w-4 text-yellow-500" />
                      )}
                      <span className="text-sm">
                        Social Post {event.aiStatus.socialPostReady ? 'Ready' : 'Pending'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Attendance Info */}
                {event.attendeeCount > 0 && (
                  <div className="mb-4 p-3 bg-blue-50 rounded-lg">
                    <p className="text-sm text-blue-800">
                      <strong>{event.attendeeCount}</strong> people attended this event
                    </p>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-2">
                  <Button variant="outline" size="sm" className="flex items-center space-x-1">
                    <Edit className="h-4 w-4" />
                    <span>Edit</span>
                  </Button>
                  
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                  
                  <Button variant="secondary" size="sm" className="flex items-center space-x-1">
                    <MessageSquare className="h-4 w-4" />
                    <span>Notify Team</span>
                  </Button>
                  
                  {event.aiStatus.flyerGenerated && (
                    <Button variant="outline" size="sm">
                      View Flyer
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State - Show when no events */}
        {mockEvents.length === 0 && (
          <Card className="text-center py-12">
            <CardContent>
              <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No events yet</h3>
              <p className="text-gray-600 mb-4">
                Get started by creating your first church event
              </p>
              <Button className="flex items-center space-x-2">
                <Plus className="h-4 w-4" />
                <span>Create Your First Event</span>
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}