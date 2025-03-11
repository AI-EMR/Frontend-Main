# AI Assistant API Documentation

## Table of Contents
- [1. Authentication & Role Management](#1-authentication--role-management)
  - [1.1 User Authentication](#11-user-authentication)
  - [1.2 AI Permissions](#12-ai-permissions)
- [2. AI Chat Functionality](#2-ai-chat-functionality)
  - [2.1 Chat Messages](#21-chat-messages)
  - [2.2 AI Actions](#22-ai-actions)
- [3. Role-Specific Functionality](#3-role-specific-functionality)
  - [3.1 Admin Features](#31-admin-features)
  - [3.2 Doctor Features](#32-doctor-features)
- [4. AI Configuration](#4-ai-configuration)
  - [4.1 Functional AI Toggle](#41-functional-ai-toggle)
- [5. Implementation Notes](#5-implementation-notes)

## 1. Authentication & Role Management

### 1.1 User Authentication

#### Login
```typescript
POST /auth/login

Request {
  email: string,
  password: string
}

Response {
  user: {
    id: string,
    name: string,
    email: string,
    role: string,
    permissions: string[]
  },
  token: string
}
```

#### Register
```typescript
POST /auth/register

Request {
  name: string,
  email: string,
  password: string,
  role?: string
}

Response {
  message: string,
  user: {
    id: string,
    name: string,
    email: string
  }
}
```

#### Verify Email
```typescript
POST /auth/verify-email

Request {
  email: string,
  otp: string
}

Response {
  message: string,
  verified: boolean
}
```

#### Resend Verification
```typescript
POST /auth/resend-verification

Request {
  email: string
}

Response {
  message: string,
  success: boolean
}
```

#### Forgot Password
```typescript
POST /auth/forgot-password

Request {
  email: string
}

Response {
  message: string,
  success: boolean
}
```

#### Reset Password
```typescript
POST /auth/reset-password

Request {
  token: string,
  password: string,
  confirmPassword: string
}

Response {
  message: string,
  success: boolean
}
```

#### Logout
```typescript
POST /auth/logout

Response {
  message: string,
  success: boolean
}
```

### 1.2 AI Permissions

#### Check AI Access Permissions
```typescript
GET /api/ai/permissions

Response {
  canAccessAI: boolean,
  allowedFeatures: string[],
  role: 'admin' | 'doctor' | 'pharmacist'
}
```

## 2. AI Chat Functionality

### 2.1 Chat Messages

#### Send message to AI Assistant
```typescript
POST /api/ai/chat/message

Request {
  message: string,
  role: string,
  context?: {
    currentPage?: string,
    selectedData?: any,
    activeFilters?: any
  }
}

Response {
  id: string,
  response: string,
  timestamp: string,
  suggestedActions?: Action[]
}
```

#### Get chat history
```typescript
GET /api/ai/chat/history

Response {
  messages: Array<{
    id: string,
    content: string,
    sender: 'user' | 'assistant',
    timestamp: string,
    role: string,
    actions?: Action[]
  }>
}
```

#### Clear chat history
```typescript
DELETE /api/ai/chat/history
```

### 2.2 AI Actions

#### Execute AI suggested action
```typescript
POST /api/ai/actions/execute

Request {
  actionId: string,
  actionType: string,
  parameters: Record<string, any>
}

Response {
  success: boolean,
  result: any,
  message: string
}
```

## 3. Role-Specific Functionality

### 3.1 Admin Features

#### Get inventory analytics
```typescript
GET /api/ai/admin/inventory/analysis

Response {
  trends: Array<{
    item: string,
    status: string,
    recommendation: string
  }>,
  alerts: Array<{
    type: string,
    message: string,
    priority: 'high' | 'medium' | 'low'
  }>
}
```

#### Get staff scheduling recommendations
```typescript
GET /api/ai/admin/staff/scheduling

Response {
  recommendations: Array<{
    shift: string,
    staffing: number,
    reason: string
  }>,
  coverage: {
    current: number,
    recommended: number,
    gaps: string[]
  }
}
```

#### Get performance analytics
```typescript
GET /api/ai/admin/analytics/performance

Response {
  metrics: Array<{
    name: string,
    value: number,
    trend: 'up' | 'down' | 'stable',
    insight: string
  }>
}
```

### 3.2 Doctor Features

#### Get medication recommendations
```typescript
POST /api/ai/doctor/medications/recommend

Request {
  patientId: string,
  symptoms: string[],
  currentMedications: string[]
}

Response {
  recommendations: Array<{
    medication: string,
    reason: string,
    interactions: string[],
    alternatives: string[]
  }>
}
```

#### Check drug interactions
```typescript
POST /api/ai/doctor/medications/interactions

Request {
  medications: string[]
}

Response {
  hasInteractions: boolean,
  interactions: Array<{
    severity: 'high' | 'medium' | 'low',
    description: string,
    recommendation: string
  }>
}
```

## 4. AI Configuration

### 4.1 Functional AI Toggle

#### Update AI functionality level
```typescript
PUT /api/ai/settings/functionality

Request {
  functionalAIEnabled: boolean
}

Response {
  status: 'success' | 'error',
  currentSettings: {
    functionalAIEnabled: boolean,
    capabilities: string[]
  }
}
```

#### Get AI capabilities
```typescript
GET /api/ai/settings/capabilities

Response {
  basic: string[],
  functional: string[],
  currentMode: 'basic' | 'functional'
}
```

## 5. Implementation Notes

### Authentication
- All endpoints require valid JWT token in the Authorization header
- Token format: `Bearer <token>`
- Implement role-based access control (RBAC)
- Implement token refresh mechanism
- Implement token blacklisting for logout
- Session timeout after 30 minutes of inactivity

### Error Handling
```typescript
Error Response {
  status: 'error',
  code: string,
  message: string,
  details?: any
}

// Common error codes
{
  AUTH_001: 'Invalid credentials',
  AUTH_002: 'Token expired',
  AUTH_003: 'Invalid token',
  AUTH_004: 'Insufficient permissions',
  API_001: 'Rate limit exceeded',
  API_002: 'Invalid request format',
  API_003: 'Resource not found'
}
```

### Rate Limiting
- Implement rate limiting per user/token
- Chat endpoints: 60 requests per minute
- Quick actions: 120 requests per minute
- Authentication endpoints: 5 attempts per minute
- Implement exponential backoff for failed login attempts

### WebSocket Consideration
- Implement WebSocket for real-time chat features
- Endpoint: `ws://api/ai/chat/websocket`
- Events: message, typing, action_complete
- Implement heartbeat mechanism
- Auto-reconnect with exponential backoff
- Maximum reconnection attempts: 5

### Caching
- Implement response caching where appropriate:
  - Cache common AI responses
  - Cache user preferences and settings
  - Cache analytics data (5-minute TTL)
- Implement ETags for analytics endpoints
- Use Redis for distributed caching
- Implement cache invalidation strategies

### Security Requirements
- Data Protection:
  - Encrypt all sensitive data in transit (TLS 1.3)
  - Encrypt sensitive data at rest (AES-256)
  - Hash passwords using bcrypt with appropriate salt rounds
  - Implement request signing for critical actions
  - Sanitize all user inputs
  - Implement XSS protection
  - Set secure and httpOnly cookie flags

- Monitoring & Logging:
  - Log all authentication attempts
  - Log all AI interactions for audit purposes
  - Implement request tracing
  - Monitor API usage patterns
  - Set up alerts for suspicious activities

- API Security:
  - Implement CORS with appropriate origins
  - Set security headers (HSTS, CSP, etc.)
  - Validate content types
  - Implement request size limits
  - Use API keys for external service integrations
  - Implement API versioning

- Compliance:
  - Implement GDPR compliance measures
  - Maintain audit logs for sensitive operations
  - Implement data retention policies
  - Provide data export functionality
  - Handle data deletion requests 