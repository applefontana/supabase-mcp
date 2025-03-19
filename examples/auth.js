/**
 * Example: Authentication with Supabase
 */

// Sign up a new user
async function signUpExample(supabase) {
  const { data, error } = await supabase.auth_signUp({
    email: 'example@email.com',
    password: 'securePassword123',
    options: {
      data: {
        full_name: 'John Doe',
        avatar_url: 'https://example.com/avatar.jpg'
      }
    }
  });
  
  if (error) {
    console.error('Error signing up:', error.message);
    return;
  }
  
  console.log('Signed up successfully:', data);
}

// Sign in a user
async function signInExample(supabase) {
  const { data, error } = await supabase.auth_signIn({
    email: 'example@email.com',
    password: 'securePassword123'
  });
  
  if (error) {
    console.error('Error signing in:', error.message);
    return;
  }
  
  console.log('Signed in successfully:', data);
}

// Get the current user
async function getUserExample(supabase) {
  const { data: { user }, error } = await supabase.auth_getUser();
  
  if (error) {
    console.error('Error getting user:', error.message);
    return;
  }
  
  console.log('Current user:', user);
}

// Update a user's profile
async function updateUserExample(supabase) {
  const { data, error } = await supabase.auth_updateUser({
    data: {
      full_name: 'Updated Name',
      avatar_url: 'https://example.com/new-avatar.jpg'
    }
  });
  
  if (error) {
    console.error('Error updating user:', error.message);
    return;
  }
  
  console.log('User updated successfully:', data);
}

// Send a password reset email
async function resetPasswordExample(supabase) {
  const { data, error } = await supabase.auth_resetPassword({
    email: 'example@email.com'
  });
  
  if (error) {
    console.error('Error sending reset email:', error.message);
    return;
  }
  
  console.log('Password reset email sent successfully');
}

// Sign out
async function signOutExample(supabase) {
  const { error } = await supabase.auth_signOut();
  
  if (error) {
    console.error('Error signing out:', error.message);
    return;
  }
  
  console.log('Signed out successfully');
}