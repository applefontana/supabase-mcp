# Supabase MCP Integration

A complete Multi-Code Platform integration for Supabase, providing access to all major Supabase features:

- Authentication (sign up, login, password reset)
- Database operations (CRUD operations on tables)
- Storage functionality (upload, download, and manage files)
- Realtime subscriptions (listen to database changes)
- Edge Functions (invoke serverless functions)

## Setup

To use this MCP integration, you'll need:

1. A Supabase project URL
2. A Supabase service role key (or anon key for public operations)

## Configuration

Set up your Supabase credentials in the MCP configuration:

```json
{
  "supabaseUrl": "https://your-project-id.supabase.co",
  "supabaseKey": "your-service-role-key"
}
```

## Available Functions

### Authentication

- `auth_signUp` - Register a new user
- `auth_signIn` - Sign in a user
- `auth_signOut` - Sign out a user
- `auth_resetPassword` - Send password reset email
- `auth_updateUser` - Update user data
- `auth_getUser` - Get current user data

### Database

- `db_select` - Query data from a table
- `db_insert` - Insert data into a table
- `db_update` - Update data in a table
- `db_delete` - Delete data from a table
- `db_rpc` - Call a Postgres function

### Storage

- `storage_upload` - Upload a file
- `storage_download` - Get a download URL
- `storage_list` - List files
- `storage_remove` - Delete a file
- `storage_createBucket` - Create a storage bucket
- `storage_deleteBucket` - Delete a storage bucket

### Realtime

- `realtime_subscribe` - Subscribe to changes
- `realtime_unsubscribe` - Unsubscribe from changes

### Edge Functions

- `functions_invoke` - Invoke an edge function