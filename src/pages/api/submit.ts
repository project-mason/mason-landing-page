// src/pages/api/submit.ts
import type { APIRoute } from 'astro';

// Type definitions for our form data
interface ContactFormData {
  name: string;
  email: string;
  message: string;
  [key: string]: string; // For any additional fields
}

// Type definition for the response from Google Apps Script
interface GoogleAppsScriptResponse {
  result: 'success' | 'error';
  message: string;
}

// Environment variable (set in your deployment platform)
const GOOGLE_SCRIPT_URL = import.meta.env.GOOGLE_SCRIPT_URL;

// Validate environment variable
if (!GOOGLE_SCRIPT_URL && import.meta.env.PROD) {
  console.error('GOOGLE_SCRIPT_URL environment variable is not set');
}

export const post: APIRoute = async ({ request }) => {
  // Check if the request has a JSON body
  if (request.headers.get('Content-Type') !== 'application/json') {
    return new Response(
      JSON.stringify({
        error: 'Invalid content type. Please use application/json'
      }),
      {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }

  let data: ContactFormData;

  try {
    // Parse and validate the request body
    data = await request.json();

    // Basic validation
    if (!data.name || !data.email || !data.message) {
      return new Response(
        JSON.stringify({
          error: 'Missing required fields: name, email, or message'
        }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      return new Response(
        JSON.stringify({
          error: 'Invalid email format'
        }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }
  } catch (error) {
    return new Response(
      JSON.stringify({
        error: 'Invalid JSON in request body'
      }),
      {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }

  // Forward the data to Google Apps Script
  try {
    const response = await fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`Google Apps Script returned ${response.status}`);
    }

    const result: GoogleAppsScriptResponse = await response.json();

    // Return the appropriate response to the frontend
    if (result.result === 'success') {
      return new Response(
        JSON.stringify({
          message: result.message
        }),
        {
          status: 200,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    } else {
      return new Response(
        JSON.stringify({
          error: result.message || 'Unknown error occurred'
        }),
        {
          status: 500,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }
  } catch (error) {
    console.error('Error forwarding to Google Apps Script:', error);

    return new Response(
      JSON.stringify({
        error: 'Failed to process your request. Please try again later.'
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
};

// Add a GET handler to provide information about the endpoint
export const get: APIRoute = async () => {
  return new Response(
    JSON.stringify({
      message: 'Contact form submission endpoint',
      method: 'POST',
      requiredFields: ['name', 'email', 'message']
    }),
    {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    }
  );
};
