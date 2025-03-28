# Workflow Diagram

```
User →
Next.js Page →
API Route →
Service Layer →
Repository →
Prisma →
PostgreSQL
```

User Authentication Flow:

```
sequenceDiagram
  Mobile Client->>Clerk: Sign In
  Clerk-->>Mobile: JWT Token
  Mobile->>Shared Storage: Store Token
  Admin App->>Clerk: Check Session
  Clerk-->>Admin: Sync Session
```

# Authentication Flow

1. User Enters Mobile Number

2. OTP Verification

If OTP fails multiple times, implement:
Cooldown timer (limit retries).
reCAPTCHA to prevent spam.

3. Organization Creation or Selection

A Super-admin creates an organization (company).
An Admin joins an existing organization via an invitation.

3. Role & Authorization Check

Super-admin:
If managing multiple businesses, select the company profile.
Select the financial year before proceeding.
Redirect to the Admin Dashboard with full CRUD permissions.

Admin:
Super-admin assigns roles (owner, admin, member) to users.
Admins only see their assigned company.
Clerk enforces access control based on these roles.
Admin directly accesses their assigned company & current financial year.

4. Session Persistence

Store the last accessed company & financial year for quick access.
If a Super-admin has only one company, auto-select it.
Users can only access the organization they belong to.
If a user belongs to multiple organizations, they can switch between them.

# Enhancements

2. Multi-Factor Authentication (Optional for Super-admins)

Extra security step like email confirmation or backup codes.

3. Role & Permission API Middleware

Middleware should ensure only the correct user role can perform actions.

4. Audit Logs

Track login attempts, role changes, and financial year selections.

# Invite-Based Onboarding for Admins

Super-admin can invite new Admins by email or mobile number.
The invite contains a unique token valid for a limited time.
The Admin must accept the invite, verify OTP, and complete profile setup.
Once accepted, the invite expires.

I'll help you create a detailed work plan for your ERP system with a focus on flexibility. Let's organize the implementation steps before generating any code.

# ERP Implementation Work Plan

## Phase 1: Foundation Setup

1. **Project Initialization**

   - Set up Next.js project with TypeScript
   - Configure Tailwind CSS and shadcn/ui components
   - Set up ESLint and Prettier for code quality

2. **Authentication Foundation**

   - Implement Clerk authentication
   - Configure RBAC model (Super-admin, Admin, Member)
   - Create middleware for role-based route protection

3. **Database Schema Design**

   - Design and implement Prisma schema for core modules
   - Create database migrations
   - Set up PostgreSQL database connection

4. **Core Repository Pattern**
   - Create base repository classes for data operations
   - Implement essential repositories (User, Company, FinancialYear)

## Phase 2: Company and User Management

1. **Company Management**

   - Implement company creation flow
   - Build company selection interface
   - Create company profile management

2. **User Invitation System**

   - Develop invitation creation process
   - Build invitation acceptance flow
   - Implement waiting screen for pending invitations

3. **Role & Permission System**

   - Build role management interface for admins
   - Implement permission checks throughout the application
   - Create role assignment workflows

4. **Financial Year Management**
   - Create financial year setup and selection
   - Implement session persistence for selected company/financial year

## Phase 3: Core ERP Modules

1. **Chart of Accounts**

   - Implement account creation and management
   - Build account grouping and hierarchy
   - Create account balance tracking

2. **Voucher Management**

   - Design voucher system (payments, receipts)
   - Implement ledger entry creation
   - Build voucher listing and reporting

3. **Inventory Management**

   - Create product catalog management
   - Implement stock tracking
   - Build HSN code and tax management

4. **Sales & Purchase System**
   - Implement sales transaction workflow
   - Build purchase order and receipt system
   - Create customer and vendor management

## Phase 4: Integration & Optimization

1. **Reporting System**

   - Build financial reports (balance sheet, P&L)
   - Implement inventory reports
   - Create export functionality (PDF/Excel)

2. **Notifications & Alerts**

   - Implement SMS notifications via Twilio
   - Build email notifications via Nodemailer
   - Create in-app notification system

3. **Bulk Operations**

   - Implement Excel import/export functionality
   - Build batch processing with BullMQ
   - Create data validation for imports

4. **Performance Optimization**
   - Add database indexes for common queries
   - Implement caching for reports
   - Optimize API response times

## Phase 5: UI/UX & Rural User Focus

1. **Simplified Interface**

   - Create intuitive navigation
   - Build simplified terminology
   - Implement guided workflows

2. **Offline Capabilities**

   - Add basic offline data storage
   - Implement sync mechanisms
   - Build offline-first components

3. **Mobile Responsiveness**
   - Ensure all interfaces work on mobile
   - Optimize for low bandwidth
   - Create PWA capabilities

## Implementation Approach

For each phase:

1. Create the necessary folder structure
2. Implement data models and repositories
3. Build service layer functionality
4. Develop API endpoints
5. Create UI components and pages
6. Test thoroughly before moving to the next phase

Shall we proceed with this work plan? Would you like any adjustments before we start implementing the code for Phase 1: Foundation Setup?

YES, PLEASE NOTE I'M USING NEONDB POSTGRESQL , PRISMA ORM, NEXT.JS 15 AND REACT JS 19.
