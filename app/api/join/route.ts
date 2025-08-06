import { NextResponse, NextRequest } from "next/server";
import { supabase } from "@/utlis/supaClient";
import { z } from "zod";

// Input validation schema
const FormDataSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100, "Name too long"),
  email: z.string().trim().email("Invalid email format").max(255, "Email too long"),
  whyConsider: z.string().trim().min(50, "Please provide at least 50 characters").max(1000, "Text too long"),
  skillToLearn: z.string().trim().min(1, "Please select a skill you want to learn"),
  githubLink: z.string().trim().optional().refine((val) => {
    if (!val) return true;
    return val.includes("github.com") && val.startsWith("http");
  }, "Invalid GitHub URL"),
  youtubeLink: z.string().trim().optional().refine((val) => {
    if (!val) return true;
    return val.includes("youtube.com") && val.startsWith("http");
  }, "Invalid YouTube URL")
});

// Simple in-memory rate limiting (for basic protection)
const requestCounts = new Map<string, { count: number; resetTime: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const windowMs = 15 * 60 * 1000; // 15 minutes
  const maxRequests = 5; // 5 requests per 15 minutes

  const current = requestCounts.get(ip);
  
  if (!current || now > current.resetTime) {
    requestCounts.set(ip, { count: 1, resetTime: now + windowMs });
    return true;
  }
  
  if (current.count >= maxRequests) {
    return false;
  }
  
  current.count++;
  return true;
}

function getClientIP(req: NextRequest): string {
  const forwardedFor = req.headers.get("x-forwarded-for");
  const realIP = req.headers.get("x-real-ip");
  
  if (forwardedFor) {
    return forwardedFor.split(',')[0].trim();
  }
  
  if (realIP) {
    return realIP;
  }
  
  return "unknown";
}

export async function POST(req: NextRequest) {
  try {
    // Rate limiting
    const ip = getClientIP(req);
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { message: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }

    // Parse and validate input
    const rawData = await req.json();
    const validationResult = FormDataSchema.safeParse(rawData);

    if (!validationResult.success) {
      return NextResponse.json(
        { 
          message: "Validation failed", 
          errors: validationResult.error.issues.map(err => ({
            field: err.path.join('.'),
            message: err.message
          }))
        },
        { status: 400 }
      );
    }

    const formData = validationResult.data;

    // Additional conditional validation
    if (formData.skillToLearn === "software" && !formData.githubLink) {
      return NextResponse.json(
        { message: "GitHub link is required for software track" },
        { status: 400 }
      );
    }

    if (formData.skillToLearn === "video-editing" && !formData.youtubeLink) {
      return NextResponse.json(
        { message: "YouTube link is required for video editing track" },
        { status: 400 }
      );
    }

    // Check for duplicate email
    const { data: existingUser, error: checkError } = await supabase
      .from("userdetails")
      .select("id")
      .eq("emailId", formData.email)
      .single();

    if (checkError && checkError.code !== "PGRST116") { // PGRST116 = no rows found
      console.error("Error checking existing user:", checkError);
      return NextResponse.json(
        { message: "Database error occurred" },
        { status: 500 }
      );
    }

    if (existingUser) {
      return NextResponse.json(
        { message: "An application with this email already exists" },
        { status: 409 }
      );
    }

    // Insert data using RLS-protected query
    const { data, error } = await supabase
      .from("userdetails")
      .insert([
        {
          name: formData.name,
          emailId: formData.email,
          about: formData.whyConsider, 
          skill: formData.skillToLearn,
          githubLink: formData.githubLink || null,
          youtubeLink: formData.youtubeLink || null
        }
      ])
      .select("id")
      .single();

    if (error) {
      console.error("Supabase insert error:", error);
      return NextResponse.json(
        { message: "Failed to submit application. Please try again." },
        { status: 500 }
      );
    }
    console.log(`New application submitted: ID ${data.id}, Email: ${formData.email}`);

    return NextResponse.json(
      { 
        message: "Application submitted successfully",
        success: true 
      },
      { status: 201 }
    );

  } catch (err: unknown) {
    console.error("Unexpected error:", err);
    return NextResponse.json(
      { message: "An unexpected error occurred. Please try again later." },
      { status: 500 }
    );
  }
}

// Reject all other HTTP methods for security
export async function GET() {
  return NextResponse.json({ message: "Method not allowed" }, { status: 405 });
}

export async function PUT() {
  return NextResponse.json({ message: "Method not allowed" }, { status: 405 });
}

export async function DELETE() {
  return NextResponse.json({ message: "Method not allowed" }, { status: 405 });
}