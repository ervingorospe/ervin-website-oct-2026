// Mermaid sources for the Relay ticketing system docs page.
// Taken from the system documentation for the Relay repos (ticketing-app + ticketing-backend).

export const relayErd = `erDiagram
    USER {
        int id PK
        string email
        string passwordHash
        string googleId
        bool isVerified
        bool hasOnboarded
        bool createdViaInvite
    }
    ORGANIZATION {
        int id PK
        int ownerId FK
        string organizationName
        bool isDeleted
    }
    ORGANIZATION_SETTINGS {
        int orgId FK
        string slug
        string timezone
        string inviteExpiration
    }
    ORGANIZATION_CAPACITY {
        int orgId FK
        int members
        int tickets
        int projects
    }
    ROLE {
        int id PK
        int orgId FK
        string roleName
        bool isDefault
        bool isLocked
    }
    RULE {
        int id PK
        string action
        int categoryId FK
    }
    RULE_CATEGORY {
        int id PK
        string name
    }
    TAG {
        int id PK
        int orgId FK
        string tagName
        bool isDefault
    }
    PROJECT {
        int id PK
        int orgId FK
        int clientId FK
        string name
    }
    MEMBER {
        int id PK
        int orgId FK
        int userId FK
        int roleId FK
        string email
        bool isActive
    }
    MEMBER_INVITE {
        int id PK
        int orgId FK
        int roleId FK
        string email
        string token
        string status
        datetime expiry
    }
    TICKET {
        int id PK
        int orgId FK
        int ownerId FK
        int projectId FK
        int tagId FK
        int clientId FK
        string referenceId
        datetime dueDate
        bool starred
    }
    TICKET_ATTACHMENT {
        int id PK
        int ticketId FK
        string name
        string url
    }
    TICKET_COMMENT {
        int id PK
        int ticketId FK
        int userId FK
        string comment
    }
    TICKET_REQUEST {
        int id PK
        int orgId FK
        int clientId FK
        int ticketId FK
        string status
        string remarks
    }
    REQUEST_ATTACHMENT {
        int id PK
        int requestId FK
        string name
    }
    ACTIVITY_LOG_ENTRY {
        int id PK
        int orgId FK
        string module
        string action
        int actorId
        int[] involvedUserIds
    }

    USER ||--o{ ORGANIZATION : owns
    USER ||--o{ MEMBER : "is user behind"
    USER ||--o{ TICKET : "owns personal"
    USER ||--o{ TICKET_COMMENT : writes

    ORGANIZATION ||--|| ORGANIZATION_SETTINGS : configures
    ORGANIZATION ||--|| ORGANIZATION_CAPACITY : limits
    ORGANIZATION ||--o{ ROLE : defines
    ORGANIZATION ||--o{ TAG : defines
    ORGANIZATION ||--o{ MEMBER : has
    ORGANIZATION ||--o{ MEMBER_INVITE : issues
    ORGANIZATION ||--o{ TICKET : has
    ORGANIZATION ||--o{ TICKET_REQUEST : receives
    ORGANIZATION ||--o{ PROJECT : runs

    ROLE }o--o{ RULE : grants
    RULE }o--|| RULE_CATEGORY : "grouped under"
    ROLE ||--o{ MEMBER : "assigned to"
    ROLE ||--o{ MEMBER_INVITE : "offered as"

    MEMBER ||--o{ MEMBER_INVITE : sent
    MEMBER }o--o{ TICKET : "assigned to"
    MEMBER ||--o{ TICKET : "is client for"
    MEMBER ||--o{ TICKET_REQUEST : "is client for"
    MEMBER }o--o{ PROJECT : "assigned to"
    MEMBER ||--o{ PROJECT : "is client for"

    PROJECT ||--o{ TICKET : groups
    TAG ||--o{ TICKET : "status of"

    TICKET ||--o{ TICKET_ATTACHMENT : has
    TICKET ||--o{ TICKET_COMMENT : has
    TICKET ||--o| TICKET_REQUEST : "originated from"
    TICKET_REQUEST ||--o{ REQUEST_ATTACHMENT : has`;

export const relayFlows = [
  {
    step: "Flow 1",
    title: "Signup, verification & onboarding",
    desc: "Covers both password signup and Google OAuth — both land on the same “verify, then onboard” path. Login is folded in at the bottom.",
    chart: `flowchart TD
    A["Visitor: /signup"] --> B["Submits email, name, password"]
    B --> C["POST /auth/signup"]
    C --> D[("User row created<br/>isVerified = false")]
    D --> E["Verification email sent"]
    E --> F["Clicks link in email"]
    F --> G["GET /auth/verify-email?token=..."]
    G --> H{"Token valid<br/>and not expired?"}
    H -- No --> I["Redirect to /login<br/>with error"]
    H -- Yes --> J["isVerified = true<br/>session cookie issued"]
    J --> K{"hasOnboarded?"}
    K -- No --> L["/onboarding"]
    K -- Yes --> M["/dashboard"]
    L --> N{"Choice"}
    N -- Personal --> O["hasOnboarded = true<br/>Personal-mode dashboard"]
    N -- "Create Organization" --> P["Org creation wizard (Flow 2)"]
    P --> M
    O --> M

    Q["Clicks 'Continue with Google'"] --> R["GET /auth/google"]
    R --> S["Google consent screen"]
    S --> T["GET /auth/google/callback"]
    T --> U{"Existing user by<br/>googleId or email?"}
    U -- "New" --> D
    U -- "Existing, verified" --> J

    V["Returning user: /login"] --> W["POST /auth/login"]
    W --> X{"isVerified?"}
    X -- No --> Y["403 UNVERIFIED<br/>-> /verify-pending"]
    X -- Yes --> J`,
  },
  {
    step: "Flow 2",
    title: "Organization creation wizard",
    desc: "One multi-step form, one transaction. A failed invite email never blocks the org itself from being created.",
    chart: `flowchart TD
    A["Step 1: Name + description"] --> B["Step 2: Roles + Rules<br/>(must include Superadmin)"]
    B --> C["Step 3: Tags"]
    C --> D["Step 4: Invite teammates<br/>(email + role)"]
    D --> E["POST /organizations"]
    E --> F["Transaction: create Organization,<br/>Settings, Capacity"]
    F --> G["Create each Role + attach Rules"]
    G --> H{"Superadmin role<br/>included?"}
    H -- No --> I["Rollback -> 400 Bad Request"]
    H -- Yes --> J["Create owner's Member row<br/>(role = Superadmin)"]
    J --> K["Create each Tag"]
    K --> L["For each invite: generate<br/>token + expiry"]
    L --> M["Send invite email"]
    M --> N{"Send failed?"}
    N -- Yes --> O["Skip this invite,<br/>log warning, continue"]
    N -- No --> P["Persist MemberInvite row"]
    O --> Q["hasOnboarded = true"]
    P --> Q
    Q --> R["Owner lands in new org's dashboard"]`,
  },
  {
    step: "Flow 3",
    title: "Member invite — accept or decline",
    desc: "An invited account skips verification and onboarding entirely — the invite email is the verification, and it can never create its own org.",
    chart: `flowchart TD
    A["Member with member.invite<br/>invites a teammate"] --> B["POST /members/invite"]
    B --> C["Generate token + expiry<br/>MemberInvite.status = PENDING"]
    C --> D["Send invite email<br/>with accept-invite link"]
    D --> E["Invitee opens link"]
    E --> F["GET /auth/invite/:token"]
    F --> G{"Valid and<br/>not expired?"}
    G -- No --> H["Show expired / invalid"]
    G -- Yes --> I{"Existing user<br/>for that email?"}
    I -- No --> J["Show signup form<br/>(password optional for Gmail)"]
    I -- Yes --> K["Show 'log in to accept'"]
    J --> L["POST /auth/accept-invite"]
    K --> L
    L --> M["Create/link User<br/>isVerified = true, hasOnboarded = true,<br/>createdViaInvite = true"]
    M --> N["Create Member row<br/>(role from invite)"]
    N --> O["MemberInvite.status = ACCEPTED"]
    O --> P["Session cookie issued"]
    P --> Q["Straight to org dashboard —<br/>no verification, no onboarding step"]

    E --> R["Invitee declines instead"]
    R --> S["POST /auth/decline-invite"]
    S --> T["MemberInvite.status = REJECTED"]
    T --> U["Owner / inviter notified by email"]`,
  },
  {
    step: "Flow 4",
    title: "Ticket lifecycle",
    desc: "Tags double as status — there's no separate status field on a ticket.",
    chart: `flowchart TD
    A["Member creates a ticket"] --> B["POST /tickets"]
    B --> C["referenceId generated;<br/>tag, assignees, dueDate set"]
    C --> D["Ticket exists<br/>(tag = its current status)"]
    D --> E{"Work happens"}
    E --> F["Comments added"]
    E --> G["Tag (status) changed"]
    E --> H["Assignees updated"]
    E --> I["Attachments added"]
    F --> J["ActivityLogEntry written"]
    G --> J
    H --> J
    I --> J
    J --> K["Notification bell:<br/>SSE push + unread count"]
    E --> L["Tag set to a 'resolved'-style tag"]
    L --> M["Ticket kept for history<br/>(isDeleted stays false)"]`,
  },
  {
    step: "Flow 5",
    title: "Ticket request → approval",
    desc: "A “request” is how someone without ticket-create rights (or an external client) gets a ticket started — an org member with approval rights decides.",
    chart: `flowchart TD
    A["Client/Member submits a request"] --> B["POST /ticket-requests"]
    B --> C["TicketRequest.status = PENDING"]
    C --> D["Reviewer with<br/>request.all.approve looks at it"]
    D --> E{"Decision"}
    E -- Approve --> F["POST /ticket-requests/:id/approve"]
    F --> G["Transaction: create a real Ticket,<br/>copy title/description/client"]
    G --> H["TicketRequest.status = APPROVED,<br/>linked to the new Ticket"]
    H --> I["Ticket enters Flow 4's lifecycle"]
    E -- Reject --> J["POST /ticket-requests/:id/reject<br/>+ remarks"]
    J --> K["TicketRequest.status = REJECTED"]
    D --> L{"Requester cancels<br/>before a decision"}
    L -- Yes --> M["TicketRequest.status = CANCELLED"]`,
  },
];

export const relayRbac = [
  { category: "Organization", rules: "organization.update.basicInfo · organization.change.ownership" },
  { category: "Member", rules: "member.invite · member.update.role · member.view.owner" },
  { category: "Role", rules: "role.add · role.update · role.remove" },
  { category: "Tag", rules: "tag.add · tag.update · tag.remove" },
  { category: "Project", rules: "project.add · project.view.own" },
  { category: "Ticket", rules: "ticket.view.all · ticket.view.included · ticket.assign · ticket.change.tag" },
  { category: "Request", rules: "request.own.create · request.all.approve · request.all.reject" },
  { category: "Report", rules: "report.view.all · report.view.own · report.download" },
  { category: "Activity Log", rules: "activity.log.view.all · activity.log.view.included" },
];
