/**
 * Core Types for Ecclesiaflow
 * These types define the structure of our data models
 */

// User and Authentication Types
export interface User {
    id: string
    email: string
    name: string
    role: UserRole
    avatar?: string
    createdAt: Date
    updatedAt: Date
  }
  
  export enum UserRole {
    ADMIN = 'ADMIN',
    PASTOR = 'PASTOR',
    LEADER = 'LEADER',
    MEMBER = 'MEMBER',
    VOLUNTEER = 'VOLUNTEER'
  }
  
  // Event Management Types
  export interface Event {
    id: string
    title: string
    description?: string
    startDate: Date
    endDate: Date
    location?: string
    groupIds: string[]
    createdBy: string
    attendeeCount?: number
    maxAttendees?: number
    status: EventStatus
    aiGenerated: {
      flyer?: string
      socialPost?: string
      remindersSent: boolean
    }
    createdAt: Date
    updatedAt: Date
  }
  
  export enum EventStatus {
    DRAFT = 'DRAFT',
    PUBLISHED = 'PUBLISHED',
    CANCELLED = 'CANCELLED',
    COMPLETED = 'COMPLETED'
  }
  
  // Group/Ministry Types
  export interface Group {
    id: string
    name: string
    description?: string
    type: GroupType
    leaderId: string
    memberIds: string[]
    color: string
    createdAt: Date
    updatedAt: Date
  }
  
  export enum GroupType {
    WORSHIP = 'WORSHIP',
    USHERS = 'USHERS',
    MEDIA = 'MEDIA',
    OUTREACH = 'OUTREACH',
    YOUTH = 'YOUTH',
    CHILDREN = 'CHILDREN',
    PRAYER = 'PRAYER',
    ADMIN = 'ADMIN'
  }
  
  // Onboarding Types
  export interface OnboardingTask {
    id: string
    title: string
    description: string
    type: TaskType
    order: number
    required: boolean
    estimatedMinutes: number
    completedAt?: Date
  }
  
  export interface MemberOnboarding {
    id: string
    memberId: string
    member: User
    tasks: OnboardingTaskProgress[]
    startedAt: Date
    completedAt?: Date
    progress: number // 0-100
    assignedGroups: string[]
    personalizedContent: {
      welcomePoster?: string
      customMessage?: string
    }
  }
  
  export interface OnboardingTaskProgress {
    taskId: string
    task: OnboardingTask
    status: TaskStatus
    completedAt?: Date
    notes?: string
  }
  
  export enum TaskType {
    WELCOME_PACKET = 'WELCOME_PACKET',
    PASTOR_MEETING = 'PASTOR_MEETING',
    GROUP_ASSIGNMENT = 'GROUP_ASSIGNMENT',
    VOLUNTEER_SURVEY = 'VOLUNTEER_SURVEY',
    CHURCH_TOUR = 'CHURCH_TOUR',
    SMALL_GROUP = 'SMALL_GROUP'
  }
  
  export enum TaskStatus {
    PENDING = 'PENDING',
    IN_PROGRESS = 'IN_PROGRESS',
    COMPLETED = 'COMPLETED',
    SKIPPED = 'SKIPPED'
  }
  
  // AI Agent Types
  export interface AIAgent {
    id: string
    name: string
    type: AgentType
    status: AgentStatus
    lastActive: Date
    capabilities: string[]
    currentTasks: AgentTask[]
  }
  
  export enum AgentType {
    CALENDAR = 'CALENDAR',
    DESIGN = 'DESIGN',
    ONBOARDING = 'ONBOARDING',
    INSIGHTS = 'INSIGHTS'
  }
  
  export enum AgentStatus {
    ACTIVE = 'ACTIVE',
    IDLE = 'IDLE',
    PROCESSING = 'PROCESSING',
    ERROR = 'ERROR',
    OFFLINE = 'OFFLINE'
  }
  
  export interface AgentTask {
    id: string
    agentId: string
    type: string
    description: string
    status: TaskStatus
    createdAt: Date
    completedAt?: Date
    result?: any
  }
  
  // Analytics and Insights Types
  export interface AttendanceRecord {
    id: string
    eventId: string
    userId: string
    attendedAt: Date
    checkedInBy?: string
  }
  
  export interface ChurchInsights {
    period: {
      start: Date
      end: Date
    }
    attendance: {
      total: number
      average: number
      trend: number // percentage change
      byEvent: AttendanceByEvent[]
    }
    membership: {
      total: number
      newMembers: number
      activeMembers: number
      retentionRate: number
    }
    engagement: {
      eventParticipation: number
      volunteerParticipation: number
      groupParticipation: number
    }
    aiGeneratedInsights: string[]
  }
  
  export interface AttendanceByEvent {
    eventId: string
    eventTitle: string
    attendeeCount: number
    date: Date
  }
  
  // Notification Types
  export interface Notification {
    id: string
    userId: string
    title: string
    message: string
    type: NotificationType
    read: boolean
    actionUrl?: string
    createdAt: Date
  }
  
  export enum NotificationType {
    EVENT_REMINDER = 'EVENT_REMINDER',
    TASK_ASSIGNED = 'TASK_ASSIGNED',
    TASK_COMPLETED = 'TASK_COMPLETED',
    AI_CONTENT_READY = 'AI_CONTENT_READY',
    SYSTEM_UPDATE = 'SYSTEM_UPDATE',
    WELCOME = 'WELCOME'
  }
  
  // API Response Types
  export interface ApiResponse<T> {
    success: boolean
    data?: T
    error?: string
    message?: string
  }
  
  export interface PaginatedResponse<T> {
    items: T[]
    total: number
    page: number
    limit: number
    hasMore: boolean
  }
  
  // Form Types for UI Components
  export interface CreateEventForm {
    title: string
    description: string
    startDate: string
    endDate: string
    startTime: string
    endTime: string
    location: string
    groupIds: string[]
    maxAttendees?: number
    generateFlyer: boolean
    sendReminders: boolean
  }
  
  export interface CreateMemberForm {
    name: string
    email: string
    phone?: string
    role: UserRole
    assignedGroups: string[]
    startOnboarding: boolean
  }
  
  // Dashboard Stats Types
  export interface DashboardStats {
    upcomingEvents: number
    newMembers: number
    weeklyAttendance: {
      percentage: number
      trend: number
    }
    activeAgents: number
    pendingTasks: number
  }
  