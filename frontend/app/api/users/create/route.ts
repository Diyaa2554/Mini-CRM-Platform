// app/api/users/create/route.ts
import { NextResponse } from 'next/server';
import { createUser } from '../createUser';

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
    console.error('Error in /api/users/create:', error);
    return NextResponse.json({ success: false, message: 'Internal server error' });
  }
}
