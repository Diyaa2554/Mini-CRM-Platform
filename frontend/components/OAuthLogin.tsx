"use client";
import useAuthStore from '@/app/store/useAuthStore';
import { GoogleLogin } from '@react-oauth/google';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const OAuthLogin = () => {
  const { isLoggedIn, login} = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    const token = sessionStorage.getItem('googleIdToken');
    if (token) {
      login(JSON.parse(sessionStorage.getItem('user') || '{}'));
    }
  }, []);


  const handleSuccess = async (response: any) => {
    const { credential } = response; 
    if (!credential) {
      console.error('OAuth error: No credential received');
      return;
    }
    sessionStorage.setItem('googleIdToken', credential);  
    const res = await fetch('/api/auth/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token: credential }),
    });

    const data = await res.json();

    if (data.success) {
      login(data.user);
      sessionStorage.setItem('user', JSON.stringify(data.user));
      console.log('User created or logged in:', data.user);
    
    } else {
      console.error('OAuth error:', data.message);
    }
  };

  const handleFailure = () => {
    console.error('OAuth error: Failed to authenticate');
  };

  return (
    <>
      {!isLoggedIn ? (
        <GoogleLogin onSuccess={handleSuccess} onError={handleFailure} />
      ) : (
        <>
          <button onClick={() => router.push('/dashboard')}
          className='cursor-pointer bg-gradient-to-br from-purple-600 via-pink-500 to-pink-400 text-white px-4 py-2 rounded-lg'>
          Go To DashBoard</button>
        </>
      )}
    </>
  );
};

export default OAuthLogin;
