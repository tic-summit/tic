import { NextResponse } from 'next/server';
import api from '@/services/api';

export async function POST(request) {
  try {
    const body = await request.json();
    console.log('📥 Incoming login request:', body);

    const { email, password } = body;

    const { data } = await api.post('/auth/login', { email, password });
    console.log('✅ Login successful:', data);

    return NextResponse.json({
      user: data.user,
      token: data.token,
    });
  } catch (error) {
    console.error('❌ Login error:', error.response?.data || error.message);

    return NextResponse.json(
      { error: error.response?.data?.message || 'Authentication failed' },
      { status: 401 }
    );
  }
}
