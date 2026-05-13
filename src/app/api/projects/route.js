import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const dataFilePath = path.join(process.cwd(), 'data.json');

export async function GET() {
  try {
    const data = fs.readFileSync(dataFilePath, 'utf8');
    return NextResponse.json(JSON.parse(data).projects);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to read data' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const newProject = await request.json();
    const data = JSON.parse(fs.readFileSync(dataFilePath, 'utf8'));
    
    // Simple ID assignment
    newProject.id = Date.now();
    data.projects.push(newProject);
    
    fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));
    return NextResponse.json({ success: true, project: newProject });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update data' }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = parseInt(searchParams.get('id'));
    
    const data = JSON.parse(fs.readFileSync(dataFilePath, 'utf8'));
    data.projects = data.projects.filter(p => p.id !== id);
    
    fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete data' }, { status: 500 });
  }
}
