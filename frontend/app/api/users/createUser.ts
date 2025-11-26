// app/api/users/createUser.ts

import mongoose from 'mongoose';

// Connect to MongoDB (simple singleton connection)
const MONGODB_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/test';

async function connectToDB() {
  if (mongoose.connection.readyState >= 1) return;
  return mongoose.connect(MONGODB_URI);
}

// Define a simple User schema and model
const userSchema = new mongoose.Schema({
  googleId: String,
  email: String,
  name: String,
  picture: String,
});

const User = mongoose.models.User || mongoose.model('User', userSchema);

interface GoogleTokenInfo {
  sub: string;       // Google user id
  email: string;
  name: string;
  picture?: string;
  email_verified: string; // "true" or "false"
}

export async function createUser(token: string) {
  if (!token) {
    return { success: false, message: 'No token provided' };
  }

  // Step 1: Verify the Google token by fetching Google's token info endpoint
  let tokenInfo: GoogleTokenInfo;
  try {
    const res = await fetch(`https://oauth2.googleapis.com/tokeninfo?id_token=${token}`);
    if (!res.ok) {
      return { success: false, message: 'Invalid Google token' };
    }
    tokenInfo = await res.json();

    // Check email verification
    if (tokenInfo.email_verified !== 'true') {
      return { success: false, message: 'Google email not verified' };
    }
  } catch (error) {
    return { success: false, message: 'Failed to verify Google token' };
  }

  // Step 2: Connect to DB and find or create the user
  try {
    await connectToDB();

    let user = await User.findOne({ googleId: tokenInfo.sub });

    if (!user) {
      // Create new user
      user = new User({
        googleId: tokenInfo.sub,
        email: tokenInfo.email,
        name: tokenInfo.name,
        picture: tokenInfo.picture,
      });
      await user.save();
    }

    // Step 3: Return success and user data
    return {
      success: true,
      user: {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        picture: user.picture,
      },
    };
  } catch (error) {
    console.error('DB error:', error);
    return { success: false, message: 'Database error' };
  }
}
