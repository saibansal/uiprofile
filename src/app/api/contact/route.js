import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(request) {
  try {
    const data = await request.json();
    
    // Validate data
    if (!data.name || !data.email || !data.message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const newEntry = {
      id: Date.now().toString(),
      name: data.name,
      email: data.email,
      message: data.message,
      createdAt: new Date().toISOString()
    };

    const dbPath = path.join(process.cwd(), 'messages.json');
    let messages = [];

    // Read existing messages if the file exists
    if (fs.existsSync(dbPath)) {
      const fileData = fs.readFileSync(dbPath, 'utf8');
      try {
        messages = JSON.parse(fileData);
      } catch (e) {
        messages = [];
      }
    }

    // Add new message
    messages.push(newEntry);

    // Write back to file
    fs.writeFileSync(dbPath, JSON.stringify(messages, null, 2));

    return NextResponse.json({ success: true, message: 'Message saved successfully' });
  } catch (error) {
    console.error('Error saving message:', error);
    return NextResponse.json({ error: 'Failed to save message' }, { status: 500 });
  }
}
