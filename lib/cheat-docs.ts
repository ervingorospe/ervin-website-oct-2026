// Docs content for the Cheat Library React Native app (from its App Documentation page).

export const cheatErd = `erDiagram
    AUTH_USERS {
        uuid id PK
        string email
    }
    PROFILES {
        uuid id PK
        string email
        string first_name
        string last_name
        string avatar_url
        bool is_active
    }
    FOLDERS {
        uuid id PK
        uuid user_id FK
        uuid parent_folder_id FK
        string name
    }
    NOTES {
        uuid id PK
        uuid user_id FK
        uuid folder_id FK
        string title
        string content
        jsonb key_points
        jsonb doc_links
        jsonb image_links
    }
    AUTH_USERS ||--|| PROFILES : "trigger creates"
    AUTH_USERS ||--o{ FOLDERS : owns
    AUTH_USERS ||--o{ NOTES : owns
    FOLDERS ||--o{ FOLDERS : "parent of"
    FOLDERS ||--o{ NOTES : contains`;

export const cheatErdCaption =
  "Deletes: user → profile, folders, notes cascade. Deleting a folder cascades to subfolders, but notes get folder_id = null. Storage buckets note-images and avatars are not cascaded and must be cleaned separately.";

export const cheatDbObjects = [
  { name: "handle_new_user", text: "Creates a profile on every new auth user (password or OAuth), splitting full_name" },
  { name: "prevent_folder_cycle", text: "Rejects self-parenting and moves that would create a loop" },
  { name: "get_descendant_folder_ids()", text: "Recursive query returning a folder and all descendants" },
  { name: "set_updated_at", text: "Keeps updated_at current on every table" },
  { name: "idx_notes_user_folder · idx_folders_user_parent", text: "Indexes for the common list queries" },
];

export const cheatStructure = [
  { path: "(auth)/landing · login · sign-up · forgot-password", text: "Signed-out entry points" },
  { path: "(tabs)/index · library · folder", text: "Home, all notes, top-level folders (custom tab bar)" },
  { path: "(main)/notes/[id]", text: "Note view and edit" },
  { path: "(main)/folders/[id]", text: "Folder contents (subfolders and notes)" },
  { path: "(main)/search · profile", text: "Search and account settings" },
  { path: "src/lib", text: "Supabase calls: notes, folders, auth, profile, image" },
  { path: "src/hooks", text: "React Query hooks and flows such as use-create-note-flow" },
  { path: "src/providers", text: "Auth, toast, loading overlay, header height" },
  { path: "supabase/", text: "Migrations and the edge function" },
];

export const cheatFlows = [
  {
    step: "Flow 1",
    title: "Sign-in & route guard",
    desc: "Password and OAuth both end in a Supabase session; the guard then swaps the visible route groups. The profile row is created by a database trigger, not by the app.",
    chart: `flowchart TD
    A["App launch"] --> B["AuthProvider restores session"]
    B --> C{"Session?"}
    C -- No --> D["(auth) screens"]
    C -- Yes --> E["(tabs) + (main) screens"]
    D --> F{"Method"}
    F -- "Email + password" --> G["signInWithPassword<br/>(remember-me preference stored)"]
    F -- "Sign up" --> H["signUpWithPassword"]
    F -- "Google / Facebook" --> I["signInWithOAuth<br/>(expo-auth-session)"]
    H --> J[("auth.users row")]
    I --> J
    J --> K["Trigger handle_new_user<br/>creates profiles row"]
    G --> L["Session set"]
    K --> L
    L --> E`,
  },
  {
    step: "Flow 2",
    title: "AI note generation",
    desc: "Generation and image upload run in parallel. If the user cancels or either side fails, uploaded images are deleted so nothing is orphaned.",
    chart: `flowchart TD
    A["Pick from library or camera"] --> B["useCreateNoteFlow"]
    B --> C["generate-notes edge function<br/>(base64 + mimeType items)"]
    B --> D["uploadNoteImage<br/>to note-images bucket"]
    C --> E["Gemini returns title, summary,<br/>keyPoints, suggestedTopic"]
    E --> F{"Cancelled or<br/>failed?"}
    D --> F
    F -- Yes --> G["Delete uploaded images<br/>+ toast error"]
    F -- No --> H["createNote<br/>(optionally in a folder)"]
    H --> I{"Saved?"}
    I -- No --> G
    I -- Yes --> J["Open note detail"]`,
  },
  {
    step: "Flow 3",
    title: "Folder management",
    desc: "Moves are validated in the database, so the client cannot create a cycle even by accident. Delete always shows its impact first.",
    chart: `flowchart TD
    A["Create folder<br/>(name, optional parent)"] --> B[("folders row")]
    B --> C["Rename"]
    B --> D["Move folder"]
    D --> E{"Trigger<br/>prevent_folder_cycle"}
    E -- "Own parent or descendant" --> F["Error returned"]
    E -- OK --> G["Parent updated"]
    B --> H["Delete"]
    H --> I["getFolderDeleteImpact<br/>(folder + note counts)"]
    I --> J{"User confirms?"}
    J -- No --> K["Cancel"]
    J -- Yes --> L["Subfolders cascade;<br/>notes get folder_id = null"]`,
  },
  {
    step: "Flow 4",
    title: "Note edit, move & delete",
    desc: "All edits go through updateNote; deleting a note also removes its stored images.",
    chart: `flowchart TD
    A["Open note"] --> B{"Action"}
    B -- Edit --> C["Change title, content, key points,<br/>doc links, image links"]
    C --> D["updateNote"]
    B -- Move --> E["moveNote to folder<br/>or to root"]
    B -- Delete --> F["deleteNote"]
    F --> G["Remove images<br/>from note-images"]
    D --> H["Invalidate queries,<br/>lists refresh"]
    E --> H
    G --> H`,
  },
];

export const cheatSetup = `pnpm install
pnpm start       # Expo dev server
pnpm ios         # iOS dev build
pnpm android     # Android dev build
pnpm rebuild     # expo prebuild --clean`;

export const cheatRoadmap = [
  { item: "Home screen issue", type: "Critical bug" },
  { item: "Forgot password flow", type: "Critical bug" },
  { item: "Add notes manually (no AI)", type: "Feature" },
  { item: "Create a checklist from a note", type: "Feature" },
  { item: "Move a folder into another folder", type: "Feature" },
  { item: "Deactivate or delete a user and all their records (storage objects need separate cleanup)", type: "Feature" },
  { item: "Light theme (currently dark only)", type: "Feature" },
];
