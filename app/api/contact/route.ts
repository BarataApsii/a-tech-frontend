import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

/**
 * Validation schema for contact form data
 * - name: minimum 2 characters
 * - email: must be valid email format
 * - message: minimum 10 characters
 */
const contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  message: z.string().min(10),
})

/**
 * POST handler for contact form submissions
 * - Validates input data
 * - Saves message to database
 * - Sends email notification
 * - Returns appropriate response
 */
export async function POST(request: Request) {
  try {
    // Parse and validate request body
    const body = await request.json()
    const validation = contactSchema.safeParse(body)
    if (!validation.success) {
      return NextResponse.json(
        { error: "Invalid request data" },
        { status: 400 }
      )
    }

    const { name, email, message } = validation.data

    // Save message to database using Prisma
    const contactMessage = await prisma.contactMessage.create({
      data: {
        name,
        email,
        message,
      },
    })

    // Check for required environment variables
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
      console.error('Email configuration missing')
      return NextResponse.json(
        { error: "Server configuration error" },
        { status: 500 }
      )
    }

    // Configure email transport using Gmail
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    })

    // Prepare email content with HTML and plain text versions
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: 'apsiitese@gmail.com',
      subject: `New Contact Form Submission from ${name}`,
      text: `
        Name: ${name}
        Email: ${email}
        Message: ${message}
      `,
      html: `
        <h3>New Contact Form Submission</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    }

    // Send email notification
    await transporter.sendMail(mailOptions)

    // Return success response
    return NextResponse.json(
      { message: "Message sent successfully" },
      { status: 200 }
    )
  } catch (error) {
    console.error('Contact form error:', error)
    
    // Handle database-specific errors
    if (error instanceof Error && 'code' in error) {
      const prismaError = error as { code: string }
      if (prismaError.code === 'P2002') {
        return NextResponse.json(
          { error: "Database constraint violation" },
          { status: 400 }
        )
      }
    }

    // Handle email authentication errors
    if (error instanceof Error && error.message.includes('EAUTH')) {
      return NextResponse.json(
        { error: "Email authentication failed" },
        { status: 500 }
      )
    }

    // Return generic error for other cases
    return NextResponse.json(
      { error: "Failed to send message" },
      { status: 500 }
    )
  }
} 