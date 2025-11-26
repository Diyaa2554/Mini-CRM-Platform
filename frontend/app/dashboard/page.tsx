"use client"
import React, { useEffect, useState } from 'react';
import useIsMobile from '../hooks/useMobile';
import useAuthStore from '../store/useAuthStore';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { TextShimmer } from '@/components/ui/text-shimmer';
import { WorldMap } from '@/components/ui/world-map';
import '@ant-design/v5-patch-for-react-19';
import { Spin } from 'antd';

const Page = () => {
  const isMobile = useIsMobile();
  const [currUser, setCurrUser] = useState<any>(null);
  const { isLoggedIn, user } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    const token = sessionStorage.getItem('googleIdToken');
    if (!isLoggedIn && token) {
      const storedUser = sessionStorage.getItem('user');
      if (storedUser) {
        useAuthStore.setState({
          isLoggedIn: true,
          user: JSON.parse(storedUser),
        });
      }
    } else if (!token) {
      router.push('/');
    }
  }, []);

  if (isMobile) {
    return (
      <div className="h-screen flex items-center justify-center bg-gradient-to-br from-indigo-800 via-purple-900 to-black text-white text-xl px-5 text-center">
        Please switch to a desktop device for the best experience.
      </div>
    );
  }

  if (!user) {
    return (
      <div className='h-screen flex items-center justify-center text-xl bg-gray-900 text-white'>
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-black text-white flex items-center justify-center px-10'>
      <div className='flex flex-col items-center gap-8 w-full max-w-5xl py-10'>
        {user?.avatarUrl ? (
          <Image
            className='rounded-full border-4 border-indigo-400 shadow-lg'
            src={user.avatarUrl}
            width={100}
            height={100}
            alt={user.name ? `${user.name}'s avatar` : 'User avatar'}
          />
        ) : (
          <div className="w-[100px] h-[100px] rounded-full bg-gray-600 flex items-center justify-center">
            <span className="text-gray-200 text-sm">No Avatar</span>
          </div>
        )}

        <h1 className='text-3xl font-semibold'>Welcome, {user?.name}!</h1>

        <TextShimmer
          duration={1.2}
          className='h-20 w-full text-center text-5xl font-bold [--base-color:theme(colors.pink.400)] [--base-gradient-color:theme(colors.purple.400)] dark:[--base-color:theme(colors.pink.600)] dark:[--base-gradient-color:theme(colors.purple.500)]'
        >
          Hi, how are you?
        </TextShimmer>

        <div className='w-full h-[400px] mt-10 border border-gray-700 rounded-xl overflow-hidden shadow-xl'>
          <WorldMap
            dots={[
              { start: { lat: 64.2008, lng: -149.4937 }, end: { lat: 34.0522, lng: -118.2437 } },
              { start: { lat: 64.2008, lng: -149.4937 }, end: { lat: -15.7975, lng: -47.8919 } },
              { start: { lat: -15.7975, lng: -47.8919 }, end: { lat: 38.7223, lng: -9.1393 } },
              { start: { lat: 51.5074, lng: -0.1278 }, end: { lat: 28.6139, lng: 77.209 } },
              { start: { lat: 28.6139, lng: 77.209 }, end: { lat: 43.1332, lng: 131.9113 } },
              { start: { lat: 28.6139, lng: 77.209 }, end: { lat: -1.2921, lng: 36.8219 } },
            ]}
          />
        </div>
      </div>
    </div>
  );
};

export default Page;
