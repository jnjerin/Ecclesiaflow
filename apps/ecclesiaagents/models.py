"""
📋 Pydantic Models for Request/Response Validation
Purpose: Define data structures that match your Prisma schema
These models ensure type safety between frontend and backend
"""
from pydantic import BaseModel, Field, validator
from typing import Optional, List, Dict, Any
from datetime import datetime
from enum import Enum

# ==================== ENUMS ====================

class EventStatus(str, Enum):
    """Event status options"""
    DRAFT = "draft"
    PUBLISHED = "published"
    CANCELLED = "cancelled"
    COMPLETED = "completed"

class TaskStatus(str, Enum):
    """Task completion status"""
    PENDING = "pending"
    IN_PROGRESS = "in_progress"
    COMPLETED = "completed"

class MemberRole(str, Enum):
    """Member roles in the church"""
    ADMIN = "admin"
    PASTOR = "pastor"
    LEADER = "leader"
    MEMBER = "member"
    VISITOR = "visitor"

# ==================== EVENT MODELS ====================

class EventCreateRequest(BaseModel):
    """Request model for creating new events"""
    title: str = Field(..., min_length=1, max_length=200, description="Event title")
    description: Optional[str] = Field(None, max_length=1000, description="Event description")
    start_date: datetime = Field(..., description="Event start date and time")
    end_date: Optional[datetime] = Field(None, description="Event end date and time")
    location: Optional[str] = Field(None, max_length=200, description="Event location")
    group_ids: Optional[List[int]] = Field(default=[], description="Assigned ministry groups")
    max_attendees: Optional[int] = Field(None, gt=0, description="Maximum number of attendees")
    
    @validator('end_date')
    def validate_end_date(cls, v, values):
        if v and 'start_date' in values and v <= values['start_date']:
            raise ValueError('End date must be after start date')
        return v

class EventResponse(BaseModel):
    """Response model for event data"""
    id: int
    title: str
    description: Optional[str]
    start_date: datetime
    end_date: Optional[datetime]
    location: Optional[str]
    status: EventStatus
    max_attendees: Optional[int]
    created_at: datetime
    updated_at: datetime
    # Related data
    groups: Optional[List[Dict[str, Any]]] = []
    attendees_count: Optional[int] = 0

# ==================== MEMBER MODELS ====================

class MemberCreateRequest(BaseModel):
    """Request model for adding new members"""
    name: str = Field(..., min_length=1, max_length=100, description="Member full name")
    email: str = Field(..., description="Member email address")
    phone: Optional[str] = Field(None, max_length=20, description="Phone number")
    role: MemberRole = Field(default=MemberRole.MEMBER, description="Member role")
    group_ids: Optional[List[int]] = Field(default=[], description="Ministry groups to join")
    
    @validator('email')
    def validate_email(cls, v):
        # Basic email validation
        if '@' not in v or '.' not in v:
            raise ValueError('Invalid email format')
        return v.lower()

class MemberResponse(BaseModel):
    """Response model for member data"""
    id: int
    name: str
    email: str
    phone: Optional[str]
    role: MemberRole
    created_at: datetime
    updated_at: datetime
    # Related data
    groups: Optional[List[Dict[str, Any]]] = []
    tasks_completed: Optional[int] = 0
    tasks_pending: Optional[int] = 0

# ==================== CONTENT GENERATION MODELS ====================

class FlyerGenerationRequest(BaseModel):
    """Request model for generating event flyers"""
    event_id: int = Field(..., description="Event ID to generate flyer for")
    style: Optional[str] = Field("modern", description="Design style preference")
    color_scheme: Optional[str] = Field("church_blue", description="Color scheme")
    include_qr_code: Optional[bool] = Field(True, description="Include QR code for registration")


class SocialPostRequest(BaseModel):
    """Request model for generating social media posts"""
    event_id: Optional[int] = Field(None, description="Event ID if post is about an event")
    platform: str = Field(..., description="Social media platform (facebook, instagram, twitter)")
    content_type: str = Field(..., description="Type of post (announcement, reminder, celebration)")
    custom_message: Optional[str] = Field(None, max_length=500, description="Custom message to include")
    
    @validator('platform')
    def validate_platform(cls, v):
        allowed_platforms = ['facebook', 'instagram', 'twitter', 'linkedin']
        if v.lower() not in allowed_platforms:
            raise ValueError(f'Platform must be one of: {", ".join(allowed_platforms)}')
        return v.lower()

class WelcomeMaterialRequest(BaseModel):
    """Request model for generating welcome materials"""
    member_id: int = Field(..., description="New member ID")
    material_type: str = Field(..., description="Type of welcome material (card, booklet, email)")
    personalized: Optional[bool] = Field(True, description="Include personalized content")

class ContentResponse(BaseModel):
    """Response model for generated content"""
    id: str = Field(..., description="Unique content ID")
    content_type: str = Field(..., description="Type of content generated")
    title: Optional[str] = Field(None, description="Content title")
    content: str = Field(..., description="Generated content text")
    image_url: Optional[str] = Field(None, description="Generated image URL if applicable")
    metadata: Optional[Dict[str, Any]] = Field(default={}, description="Additional metadata")
    created_at: datetime = Field(default_factory=datetime.now)

# ==================== TASK MODELS ====================

class TaskCreateRequest(BaseModel):
    """Request model for creating tasks"""
    title: str = Field(..., min_length=1, max_length=200, description="Task title")
    description: Optional[str] = Field(None, max_length=1000, description="Task description")
    member_id: int = Field(..., description="Assigned member ID")
    due_date: Optional[datetime] = Field(None, description="Task due date")
    priority: Optional[str] = Field("medium", description="Task priority (low, medium, high)")

class TaskResponse(BaseModel):
    """Response model for task data"""
    id: int
    title: str
    description: Optional[str]
    status: TaskStatus
    priority: str
    due_date: Optional[datetime]
    completed_at: Optional[datetime]
    created_at: datetime
    updated_at: datetime
    # Related data
    member: Optional[Dict[str, Any]] = None

# ==================== GROUP MODELS ====================

class GroupCreateRequest(BaseModel):
    """Request model for creating ministry groups"""
    name: str = Field(..., min_length=1, max_length=100, description="Group name")
    description: Optional[str] = Field(None, max_length=500, description="Group description")
    group_type: str = Field(..., description="Type of group (worship, ushers, youth, etc.)")
    leader_id: Optional[int] = Field(None, description="Group leader member ID")

class GroupResponse(BaseModel):
    """Response model for group data"""
    id: int
    name: str
    description: Optional[str]
    group_type: str
    created_at: datetime
    updated_at: datetime
    # Related data
    leader: Optional[Dict[str, Any]] = None
    members_count: Optional[int] = 0
    members: Optional[List[Dict[str, Any]]] = []

# ==================== INSIGHTS MODELS ====================

class DashboardInsights(BaseModel):
    """Response model for dashboard insights"""
    total_members: int
    total_events: int
    upcoming_events: int
    active_tasks: int
    recent_activity: List[Dict[str, Any]]
    attendance_trend: Dict[str, Any]
    engagement_score: float
    generated_at: datetime = Field(default_factory=datetime.now)

class AttendanceInsights(BaseModel):
    """Response model for attendance analytics"""
    total_events_analyzed: int
    average_attendance: float
    attendance_by_month: Dict[str, int]
    top_attended_events: List[Dict[str, Any]]
    attendance_trends: Dict[str, Any]
    predictions: Optional[Dict[str, Any]] = None
    generated_at: datetime = Field(default_factory=datetime.now)

class EngagementInsights(BaseModel):
    """Response model for engagement metrics"""
    total_members_analyzed: int
    engagement_score: float
    active_members: int
    inactive_members: int
    engagement_by_group: Dict[str, float]
    member_activity: List[Dict[str, Any]]
    recommendations: List[str]
    generated_at: datetime = Field(default_factory=datetime.now)

# ==================== AGENT RESPONSE MODELS ====================

class AgentStatus(BaseModel):
    """Response model for individual agent status"""
    name: str
    status: str  # "active", "busy", "error", "offline"
    last_activity: Optional[datetime]
    tasks_completed: int
    tasks_failed: int
    capabilities: List[str]

class AgentSystemStatus(BaseModel):
    """Response model for overall agent system status"""
    agents: List[AgentStatus]
    system_health: str  # "healthy", "degraded", "critical"
    total_tasks_today: int
    success_rate: float
    uptime: str
    generated_at: datetime = Field(default_factory=datetime.now)

# ==================== GENERIC RESPONSE MODELS ====================

class SuccessResponse(BaseModel):
    """Generic success response"""
    success: bool = True
    message: str
    data: Optional[Dict[str, Any]] = None
    timestamp: datetime = Field(default_factory=datetime.now)

class ErrorResponse(BaseModel):
    """Generic error response"""
    success: bool = False
    error: str
    message: str
    details: Optional[Dict[str, Any]] = None
    timestamp: datetime = Field(default_factory=datetime.now)