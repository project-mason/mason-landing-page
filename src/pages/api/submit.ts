// src/pages/api/submit.ts
import type { APIRoute } from 'astro';

// Type definitions for our form data
interface ContactFormData {
  subject: string;
  name: string;
  email: string;
  businessType: string;
  companySize: string;
  source: string;
  website?: string;
}

// Type definition for the response from Google Apps Script
interface GoogleAppsScriptResponse {
  result: 'success' | 'error';
  message: string;
}

// Environment variable (set in your deployment platform)
const GOOGLE_SCRIPT_URL = import.meta.env.PUBLIC_GOOGLE_SCRIPT_URL;

// Validate environment variable
if (!GOOGLE_SCRIPT_URL && import.meta.env.PROD) {
  console.error('GOOGLE_SCRIPT_URL environment variable is not set');
}

// CORS headers
const corsHeaders = {
  'Access-Control-Allow-Origin': import.meta.env.PROD
    ? 'https://yourdomain.com'  // Replace with your production domain
    : 'http://localhost:4321',  // For development
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

export const POST: APIRoute = async ({ request }) => {
  // Handle preflight OPTIONS request
  if (request.method === 'OPTIONS') {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  // Check if the request has a JSON body
  if (request.headers.get('Content-Type') !== 'application/json') {
    return new Response(
      JSON.stringify({
        error: 'Invalid content type. Please use application/json'
      }),
      {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders,
        }
      }
    );
  }

  let data: ContactFormData;

  try {
    // Parse and validate the request body
    data = await request.json();

    // Check if bot
    if (data.website && data.website.length > 0) {
      return new Response(JSON.stringify({ message: "Success" }), { status: 200 });
    }

    console.debug("data:", data);

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      return new Response(
        JSON.stringify({
          error: 'Invalid email format'
        }),
        {
          status: 400,
          headers: {
            'Content-Type': 'application/json',
            ...corsHeaders,
          }
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
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders,
        }
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
          headers: {
            'Content-Type': 'application/json',
            ...corsHeaders,
          }
        }
      );
    } else {
      return new Response(
        JSON.stringify({
          error: result.message || 'Unknown error occurred'
        }),
        {
          status: 500,
          headers: {
            'Content-Type': 'application/json',
            ...corsHeaders,
          }
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
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders,
        }
      }
    );
  }
};

// Handle OPTIONS requests for CORS preflight
export const OPTIONS: APIRoute = async () => {
  return new Response(null, {
    status: 200,
    headers: corsHeaders,
  });
};

// Handle OPTIONS requests for CORS preflight
export const GET: APIRoute = async () => {
  return new Response("/api/submit", {
    status: 200,
    headers: corsHeaders,
  });
};
