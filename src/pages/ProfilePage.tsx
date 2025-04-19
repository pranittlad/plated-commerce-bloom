
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { fetchUserProfile } from '@/lib/supabase';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Skeleton } from "@/components/ui/skeleton"
import { Profile } from '@/types/profile';

const ProfilePage: React.FC = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getProfile = async () => {
      if (user) {
        setLoading(true);
        const userProfile = await fetchUserProfile(user.id);
        
        if (userProfile) {
          setProfile(userProfile as Profile);
        } else {
          setProfile(null);
        }
        
        setLoading(false);
      }
    };

    getProfile();
  }, [user]);

  // Handle null profile by showing appropriate UI
  const displayName = profile?.full_name || 'Unknown';
  const avatarUrl = profile?.avatar_url || '/placeholder.svg';

  return (
    <div className="godhadya-container py-20">
      <div className="flex flex-col items-center">
        {loading ? (
          <Skeleton className="h-24 w-24 rounded-full mb-4" />
        ) : (
          <Avatar className="h-24 w-24 rounded-full mb-4">
            <AvatarImage src={avatarUrl} alt={displayName} />
            <AvatarFallback>{displayName.charAt(0)}</AvatarFallback>
          </Avatar>
        )}
        
        {loading ? (
          <Skeleton className="h-8 w-48 mb-2" />
        ) : (
          <h1 className="text-2xl font-semibold text-gray-800 mb-2">{displayName}</h1>
        )}
        
        {loading ? (
          <Skeleton className="h-6 w-64 text-gray-600" />
        ) : (
          <p className="text-gray-600">{user?.email}</p>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
