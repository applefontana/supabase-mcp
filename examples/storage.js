/**
 * Example: Storage operations with Supabase
 */

// Upload a file
async function uploadExample(supabase) {
  // First, we need to get our file data
  // In a browser environment, this could come from a file input
  const fileData = new Blob(['Test file content'], { type: 'text/plain' });
  
  const { data, error } = await supabase.storage_upload({
    bucket: 'documents',
    path: 'reports/annual-2023.txt',
    file: fileData,
    options: {
      cacheControl: '3600',
      upsert: true
    }
  });
  
  if (error) {
    console.error('Error uploading file:', error.message);
    return;
  }
  
  console.log('File uploaded successfully:', data);
}

// Download a file
async function downloadExample(supabase) {
  const { data, error } = await supabase.storage_download({
    bucket: 'documents',
    path: 'reports/annual-2023.txt'
  });
  
  if (error) {
    console.error('Error downloading file:', error.message);
    return;
  }
  
  // In a browser environment, you could create a download link
  console.log('Downloaded file:', data);
}

// List files in a bucket
async function listFilesExample(supabase) {
  const { data, error } = await supabase.storage_list({
    bucket: 'documents',
    path: 'reports',
    options: {
      limit: 100,
      offset: 0,
      sortBy: { column: 'name', order: 'asc' }
    }
  });
  
  if (error) {
    console.error('Error listing files:', error.message);
    return;
  }
  
  console.log('Files in bucket:', data);
}

// Remove files
async function removeFilesExample(supabase) {
  const { data, error } = await supabase.storage_remove({
    bucket: 'documents',
    paths: [
      'reports/annual-2022.txt',
      'reports/annual-2021.txt'
    ]
  });
  
  if (error) {
    console.error('Error removing files:', error.message);
    return;
  }
  
  console.log('Files removed successfully:', data);
}

// Create a new bucket
async function createBucketExample(supabase) {
  const { data, error } = await supabase.storage_createBucket({
    id: 'images',
    options: {
      public: true
    }
  });
  
  if (error) {
    console.error('Error creating bucket:', error.message);
    return;
  }
  
  console.log('Bucket created successfully:', data);
}

// Delete a bucket
async function deleteBucketExample(supabase) {
  const { data, error } = await supabase.storage_deleteBucket({
    id: 'temporary-files'
  });
  
  if (error) {
    console.error('Error deleting bucket:', error.message);
    return;
  }
  
  console.log('Bucket deleted successfully:', data);
}