import { NextRequest, NextResponse } from 'next/server';

const ELIZA_SERVER_URL = process.env.NEXT_PUBLIC_ELIZA_SERVER_URL || 'http://localhost:3000';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { text, userId = 'web-user', userName = 'User' } = body;

    if (!text) {
      return NextResponse.json(
        { success: false, error: 'Message text is required' },
        { status: 400 }
      );
    }

    // Send message to ElizaOS agent
    const response = await fetch(`${ELIZA_SERVER_URL}/api/messaging/channels/00000000-0000-0000-0000-000000000000/messages`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text,
        userId,
        userName,
        channelType: 'API',
      }),
    });

    const data = await response.json();

    return NextResponse.json(data);
  } catch (error) {
    console.error('Eliza API error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to connect to agent' },
      { status: 500 }
    );
  }
}

export async function GET() {
  // Health check
  try {
    const response = await fetch(`${ELIZA_SERVER_URL}/api/health`, {
      method: 'GET',
    });
    
    return NextResponse.json({ 
      status: response.ok ? 'connected' : 'disconnected',
      serverUrl: ELIZA_SERVER_URL 
    });
  } catch {
    return NextResponse.json({ 
      status: 'disconnected',
      serverUrl: ELIZA_SERVER_URL 
    });
  }
}