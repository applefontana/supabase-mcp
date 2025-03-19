/**
 * Example: Database operations with Supabase
 */

// Select data from a table
async function selectExample(supabase) {
  // Simple select
  const { data, error } = await supabase.db_select({
    table: 'users',
    columns: 'id, name, email, created_at',
    filters: {
      role: 'admin'
    },
    options: {
      limit: 10,
      order: {
        column: 'created_at',
        ascending: false
      }
    }
  });
  
  if (error) {
    console.error('Error selecting data:', error.message);
    return;
  }
  
  console.log('Selected data:', data);
  
  // Advanced filtering
  const { data: filteredData, error: filterError } = await supabase.db_select({
    table: 'products',
    columns: '*',
    filters: {
      price: { gt: 100 },
      category: 'electronics'
    }
  });
  
  if (filterError) {
    console.error('Error with filtered select:', filterError.message);
    return;
  }
  
  console.log('Filtered data:', filteredData);
}

// Insert data into a table
async function insertExample(supabase) {
  const { data, error } = await supabase.db_insert({
    table: 'tasks',
    data: {
      title: 'Complete documentation',
      description: 'Finish writing the examples for the Supabase MCP',
      status: 'in_progress',
      user_id: 123
    },
    options: {
      returning: true
    }
  });
  
  if (error) {
    console.error('Error inserting data:', error.message);
    return;
  }
  
  console.log('Inserted data:', data);
  
  // Insert multiple rows
  const { data: bulkData, error: bulkError } = await supabase.db_insert({
    table: 'tasks',
    data: [
      { title: 'Task 1', user_id: 123 },
      { title: 'Task 2', user_id: 123 }
    ],
    options: {
      returning: true
    }
  });
  
  if (bulkError) {
    console.error('Error bulk inserting data:', bulkError.message);
    return;
  }
  
  console.log('Bulk inserted data:', bulkData);
}

// Update data in a table
async function updateExample(supabase) {
  const { data, error } = await supabase.db_update({
    table: 'tasks',
    data: {
      status: 'completed',
      completed_at: new Date().toISOString()
    },
    filters: {
      id: 1
    },
    options: {
      returning: true
    }
  });
  
  if (error) {
    console.error('Error updating data:', error.message);
    return;
  }
  
  console.log('Updated data:', data);
}

// Delete data from a table
async function deleteExample(supabase) {
  const { data, error } = await supabase.db_delete({
    table: 'tasks',
    filters: {
      status: 'completed',
      created_at: { lt: '2023-01-01T00:00:00Z' }
    },
    options: {
      returning: true
    }
  });
  
  if (error) {
    console.error('Error deleting data:', error.message);
    return;
  }
  
  console.log('Deleted data:', data);
}

// Call a database function (RPC)
async function rpcExample(supabase) {
  const { data, error } = await supabase.db_rpc({
    function: 'calculate_total_price',
    params: {
      user_id: 123,
      include_tax: true
    }
  });
  
  if (error) {
    console.error('Error calling function:', error.message);
    return;
  }
  
  console.log('Function result:', data);
}