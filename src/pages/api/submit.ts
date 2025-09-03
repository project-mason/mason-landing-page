// src/pages/api/submit.ts
import { isValidText } from "@/lib/utils/textValidation";
import type { APIRoute } from "astro";

export const prerender = false; // service side rendering

// Type definitions for our form data
interface ContactFormData {
  subject: string;
  firstName: string;
  lastName: string;
  email: string;
  companyName?: string;
  website?: string;
}

// Type definition for the response from Google Apps Script
interface GoogleAppsScriptResponse {
  result: "success" | "error";
  message: string;
}

const defaultErrMsg = "Failed to process your request. Please try again later.";

// Environment variable (set in your deployment platform)
const GOOGLE_SCRIPT_URL = import.meta.env.PUBLIC_GOOGLE_SCRIPT_URL;

// Validate environment variable
if (!GOOGLE_SCRIPT_URL && import.meta.env.PROD) {
  console.error("GOOGLE_SCRIPT_URL environment variable is not set");
}

// CORS headers
const corsHeaders = {
  "Access-Control-Allow-Origin": import.meta.env.PROD
    ? "https://yourdomain.com" // Replace with your production domain
    : "http://localhost:4321", // For development
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

export const POST: APIRoute = async ({ request }) => {
  // Handle preflight OPTIONS request
  if (request.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  // Check if the request has a JSON body
  if (request.headers.get("Content-Type") !== "application/json") {
    console.error("Invalid content type. Please use application/json");
    const errMsg = "Failed to process your request. Please try again later.";
    return new Response(
      JSON.stringify({
        error: errMsg,
      }),
      {
        status: 400,
        statusText: errMsg,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders,
        },
      },
    );
  }

  let data: ContactFormData;

  try {
    // Parse and validate the request body
    data = await request.json();

    // Check if bot
    if (data.website && data.website.length > 0) {
      console.debug("website recorded");
      return new Response(JSON.stringify({ message: "Success" }), {
        status: 200,
      });
    }

    console.debug("data:", data);

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      const errMsg = "Invalid email format";
      return new Response(
        JSON.stringify({
          error: errMsg,
        }),
        {
          status: 400,
          statusText: errMsg,
          headers: {
            "Content-Type": "application/json",
            ...corsHeaders,
          },
        },
      );
    }

    const first = isValidText("First Name", data.firstName);
    if (!first.isValid) {
      return new Response(
        JSON.stringify({
          error: first.message,
        }),
        {
          status: 400,
          statusText: first.message,
          headers: {
            "Content-Type": "application/json",
            ...corsHeaders,
          },
        },
      );
    }

    const last = isValidText("Last Name", data.lastName);
    if (!last.isValid) {
      return new Response(
        JSON.stringify({
          error: last.message,
        }),
        {
          status: 400,
          statusText: last.message,
          headers: {
            "Content-Type": "application/json",
            ...corsHeaders,
          },
        },
      );
    }

    if (data.companyName && data.companyName.length > 0) {
      const comp = isValidText("Company Name", data.companyName, { allowNumbers: true });
      if (!comp.isValid) {
        return new Response(
          JSON.stringify({
            error: comp.message,
          }),
          {
            status: 400,
            statusText: comp.message,
            headers: {
              "Content-Type": "application/json",
              ...corsHeaders,
            },
          },
        );
      }
    }

  } catch (error) {
    console.error(error + "! Invalid JSON in request body");
    return new Response(
      JSON.stringify({
        error: defaultErrMsg,
      }),
      {
        status: 400,
        statusText: defaultErrMsg,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders,
        },
      },
    );
  }

  // Forward the data to Google Apps Script
  try {
    const response = await fetch(GOOGLE_SCRIPT_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`Google Apps Script returned ${response.status}`);
    }

    const result: GoogleAppsScriptResponse = await response.json();

    // Return the appropriate response to the frontend
    if (result.result === "success") {
      return new Response(
        JSON.stringify({
          message: result.message,
        }),
        {
          status: 200,
          headers: {
            "Content-Type": "application/json",
            ...corsHeaders,
          },
        },
      );
    } else {
      const errMsg = result.message || "Unknown error occurred";
      return new Response(
        JSON.stringify({
          error: errMsg,
        }),
        {
          status: 500,
          statusText: errMsg,
          headers: {
            "Content-Type": "application/json",
            ...corsHeaders,
          },
        },
      );
    }
  } catch (error) {
    console.error("Error forwarding to Google Apps Script:", error);
    return new Response(
      JSON.stringify({
        error: defaultErrMsg,
      }),
      {
        status: 500,
        statusText: defaultErrMsg,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders,
        },
      },
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
