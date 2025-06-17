import { NextResponse } from 'next/server';
import api from '@/services/api';

export async function POST(request) {
  try {
    const { email, password } = await request.json();
    
    // In a real app, you would verify credentials with your database
    // This is just a mock implementation
    const { data } = await api.post('/auth/login', { email, password });
    
    return NextResponse.json({
      user: data.user,
      token: data.token
    });
  } catch (error) {
    return NextResponse.json(
      { error: error.response?.data?.message || 'Authentication failed' },
      { status: 401 }
    );
  }
}