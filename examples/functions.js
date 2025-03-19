/**
 * Example: Edge Functions with Supabase
 */

// Invoke an edge function
async function invokeEdgeFunctionExample(supabase) {
  // Simple function call with payload
  const { data, error } = await supabase.functions_invoke({
    functionName: 'hello-world',
    payload: {
      name: 'MCP User'
    }
  });
  
  if (error) {
    console.error('Error invoking function:', error.message);
    return;
  }
  
  console.log('Function result:', data);
  
  // More complex function example: process a payment
  const { data: paymentData, error: paymentError } = await supabase.functions_invoke({
    functionName: 'process-payment',
    payload: {
      amount: 1999, // $19.99
      currency: 'usd',
      payment_method: 'pm_card_visa',
      description: 'Subscription payment'
    }
  });
  
  if (paymentError) {
    console.error('Error processing payment:', paymentError.message);
    return;
  }
  
  console.log('Payment processed:', paymentData);
}

// Example of a function that handles file processing
async function fileProcessingExample(supabase) {
  // First upload a file to storage
  const fileData = new Blob(['Test file content'], { type: 'text/plain' });
  
  const { data: uploadData, error: uploadError } = await supabase.storage_upload({
    bucket: 'uploads',
    path: 'documents/sample.txt',
    file: fileData
  });
  
  if (uploadError) {
    console.error('Error uploading file:', uploadError.message);
    return;
  }
  
  // Then trigger a function to process the file
  const { data, error } = await supabase.functions_invoke({
    functionName: 'process-document',
    payload: {
      filePath: 'documents/sample.txt',
      bucket: 'uploads',
      options: {
        convertToPdf: true,
        extractText: true
      }
    }
  });
  
  if (error) {
    console.error('Error processing document:', error.message);
    return;
  }
  
  console.log('Document processed:', data);
}