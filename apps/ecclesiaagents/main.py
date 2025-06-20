"""
🚀 Ecclesiaflow AI Agents - Main FastAPI Application
Purpose: Central API server that orchestrates all AI agents for church management
Architecture: Single FastAPI app with multiple AI agents working together
"""
from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from typing import Dict, Any, List, Optional
import uvicorn
from datetime import datetime

# Import our agents and services
from agents.agent_manager import AgentManager
from services.database_service import DatabaseService
from models import *

# Initialize FastAPI app
app = FastAPI(
    title="Ecclesiaflow AI Agents",
    description="Multi-agent AI system for church management and automation",
    version="1.0.0",
    docs_url="/docs",  # Swagger UI at /docs
    redoc_url="/redoc"  # ReDoc at /redoc
)

# CORS middleware to allow Next.js frontend to communicate
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:3001"],  # Next.js dev server
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize services
database_service = DatabaseService()
agent_manager = AgentManager(database_service)

# Health check endpoint
@app.get("/health")
async def health_check():
    """Simple health check to verify the API is running"""
    return {
        "status": "healthy",
        "timestamp": datetime.now().isoformat(),
        "service": "Ecclesiaflow AI Agents",
        "agents_available": agent_manager.get_available_agents()
    }

# Root endpoint
@app.get("/")
async def root():
    """Root endpoint with API information"""
    return {
        "message": "Welcome to Ecclesiaflow AI Agents API",
        "version": "1.0.0",
        "docs": "/docs",
        "health": "/health"
    }

# ==================== EVENT ENDPOINTS ====================

@app.get("/api/v1/events", response_model=List[EventResponse])
async def get_events():
    """
    Get all events from the database
    Used by frontend dashboard and events page
    """
    try:
        events = await database_service.get_all_events()
        return events
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to fetch events: {str(e)}")

@app.post("/api/v1/events", response_model=EventResponse)
async def create_event(event_data: EventCreateRequest):
    """
    Create a new event - triggers Calendar Agent
    This demonstrates multi-agent collaboration:
    1. Calendar Agent creates event and checks conflicts
    2. Content Agent can generate promotional materials
    3. Calendar Agent sends notifications
    """
    try:
        # Use Calendar Agent to create event with intelligence
        result = await agent_manager.create_event_with_agents(event_data.dict())
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to create event: {str(e)}")

@app.get("/api/v1/events/{event_id}", response_model=EventResponse)
async def get_event(event_id: int):
    """Get specific event by ID"""
    try:
        event = await database_service.get_event_by_id(event_id)
        if not event:
            raise HTTPException(status_code=404, detail="Event not found")
        return event
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to fetch event: {str(e)}")

# ==================== MEMBER ENDPOINTS ====================

@app.get("/api/v1/members", response_model=List[MemberResponse])
async def get_members():
    """Get all church members"""
    try:
        members = await database_service.get_all_members()
        return members
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to fetch members: {str(e)}")

@app.post("/api/v1/members", response_model=MemberResponse)
async def create_member(member_data: MemberCreateRequest):
    """
    Add new church member - triggers Onboarding Agent
    Multi-agent workflow:
    1. Create member in database
    2. Onboarding Agent creates personalized task list
    3. Content Agent generates welcome materials
    4. Calendar Agent schedules follow-up reminders
    """
    try:
        result = await agent_manager.onboard_new_member(member_data.dict())
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to create member: {str(e)}")

@app.get("/api/v1/members/{member_id}/tasks", response_model=List[TaskResponse])
async def get_member_tasks(member_id: int):
    """Get onboarding tasks for a specific member"""
    try:
        tasks = await database_service.get_member_tasks(member_id)
        return tasks
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to fetch member tasks: {str(e)}")

# ==================== CONTENT GENERATION ENDPOINTS ====================

@app.post("/api/v1/content/generate-flyer", response_model=ContentResponse)
async def generate_event_flyer(request: FlyerGenerationRequest):
    """
    Generate event flyer using Content Agent
    Uses Gemini AI to create promotional content
    """
    try:
        result = await agent_manager.generate_content("flyer", request.dict())
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to generate flyer: {str(e)}")

@app.post("/api/v1/content/generate-social", response_model=ContentResponse)
async def generate_social_post(request: SocialPostRequest):
    """Generate social media post using Content Agent"""
    try:
        result = await agent_manager.generate_content("social_post", request.dict())
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to generate social post: {str(e)}")

@app.post("/api/v1/content/generate-welcome", response_model=ContentResponse)
async def generate_welcome_materials(request: WelcomeMaterialRequest):
    """Generate welcome materials for new members"""
    try:
        result = await agent_manager.generate_content("welcome_material", request.dict())
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to generate welcome materials: {str(e)}")

# ==================== INSIGHTS ENDPOINTS ====================

@app.get("/api/v1/insights/dashboard", response_model=DashboardInsights)
async def get_dashboard_insights():
    """
    Get dashboard metrics using Insights Agent
    Analyzes attendance, engagement, and provides summaries
    """
    try:
        insights = await agent_manager.generate_insights("dashboard")
        return insights
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to generate insights: {str(e)}")

@app.get("/api/v1/insights/attendance", response_model=AttendanceInsights)
async def get_attendance_insights():
    """Get detailed attendance analytics"""
    try:
        insights = await agent_manager.generate_insights("attendance")
        return insights
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to generate attendance insights: {str(e)}")

@app.get("/api/v1/insights/engagement", response_model=EngagementInsights)
async def get_engagement_insights():
    """Get member engagement metrics"""
    try:
        insights = await agent_manager.generate_insights("engagement")
        return insights
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to generate engagement insights: {str(e)}")

# ==================== GROUP ENDPOINTS ====================

@app.get("/api/v1/groups", response_model=List[GroupResponse])
async def get_groups():
    """Get all ministry groups (worship, ushers, etc.)"""
    try:
        groups = await database_service.get_all_groups()
        return groups
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to fetch groups: {str(e)}")

@app.post("/api/v1/groups", response_model=GroupResponse)
async def create_group(group_data: GroupCreateRequest):
    """Create new ministry group"""
    try:
        group = await database_service.create_group(group_data.dict())
        return group
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to create group: {str(e)}")

# ==================== TASK ENDPOINTS ====================

@app.get("/api/v1/tasks", response_model=List[TaskResponse])
async def get_tasks():
    """Get all tasks (onboarding, assignments, etc.)"""
    try:
        tasks = await database_service.get_all_tasks()
        return tasks
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to fetch tasks: {str(e)}")

@app.put("/api/v1/tasks/{task_id}/complete", response_model=TaskResponse)
async def complete_task(task_id: int):
    """Mark a task as completed"""
    try:
        task = await database_service.complete_task(task_id)
        if not task:
            raise HTTPException(status_code=404, detail="Task not found")
        return task
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to complete task: {str(e)}")

# ==================== AGENT STATUS ENDPOINT ====================

@app.get("/api/v1/agents/status")
async def get_agent_status():
    """
    Get status of all AI agents
    Useful for debugging and monitoring
    """
    try:
        status = await agent_manager.get_agent_status()
        return status
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to get agent status: {str(e)}")

# Global exception handler
@app.exception_handler(Exception)
async def global_exception_handler(request, exc):
    """Handle unexpected errors gracefully"""
    return JSONResponse(
        status_code=500,
        content={
            "error": "Internal server error",
            "message": "An unexpected error occurred. Please try again later.",
            "timestamp": datetime.now().isoformat()
        }
    )

# Run the application
if __name__ == "__main__":
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=8000,
        reload=True,  # Auto-reload during development
        log_level="info"
    )