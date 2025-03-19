/**
 * Example: Realtime subscriptions with Supabase
 */

// Subscribe to changes in a table
async function subscribeExample(supabase) {
  const channel = await supabase.realtime_subscribe({
    table: 'messages',
    event: 'INSERT',
    callback: (payload) => {
      console.log('New message received:', payload.new);
      // Handle the new data, e.g., update UI
    }
  });
  
  console.log('Subscribed to realtime changes');
  
  // Store the channel for later unsubscribing
  return channel;
}

// Subscribe to multiple event types
async function multiEventSubscribeExample(supabase) {
  // For multiple event types, call subscribe multiple times on the same channel
  const channel = supabase
    .channel('table-tasks-changes')
    .on('postgres_changes', {
      event: 'INSERT',
      schema: 'public',
      table: 'tasks'
    }, (payload) => {
      console.log('New task created:', payload.new);
    })
    .on('postgres_changes', {
      event: 'UPDATE',
      schema: 'public',
      table: 'tasks'
    }, (payload) => {
      console.log('Task updated:', payload.new);
      console.log('Previous state:', payload.old);
    })
    .on('postgres_changes', {
      event: 'DELETE',
      schema: 'public',
      table: 'tasks'
    }, (payload) => {
      console.log('Task deleted:', payload.old);
    })
    .subscribe();
  
  console.log('Subscribed to multiple task events');
  
  return channel;
}

// Unsubscribe from changes
async function unsubscribeExample(supabase, channel) {
  const { error } = await supabase.realtime_unsubscribe({
    channel
  });
  
  if (error) {
    console.error('Error unsubscribing:', error.message);
    return;
  }
  
  console.log('Unsubscribed from realtime changes');
}

// Example of using these functions together
async function realtimeExample(supabase) {
  // Subscribe to changes
  const channel = await subscribeExample(supabase);
  
  // Simulate some time passing
  console.log('Listening for changes...');
  
  // In a real application, you might unsubscribe when the component unmounts
  setTimeout(async () => {
    await unsubscribeExample(supabase, channel);
  }, 60000); // Unsubscribe after 1 minute
}