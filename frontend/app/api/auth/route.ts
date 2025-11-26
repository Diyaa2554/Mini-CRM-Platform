// app/api/auth/route.ts
import { NextResponse } from 'next/server';
import { createUser } from '../users/createUser';

export async function POST(req: Request) {
  try {
    const { token } = await req.json();
    const data = await createUser(token);

    if (data.success) {
      return NextResponse.json({ success: true, user: data.user });
    } else {
      return NextResponse.json({ success: false, message: data.message || 'User creation failed' });
    }
  } catch (error) {
    console.error('Error in /api/auth:', error);
    return NextResponse.json({ success: false, message: 'Internal server error' });
  }
}
