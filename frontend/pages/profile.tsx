import React from 'react';
import { useSession } from 'next-auth/react';

const Profile = () => {
  const { data: session } = useSession();

  if (!session) {
    return <div className="flex items-center justify-center h-screen">Please login to view your profile.</div>;
  }

  const { user } = session;

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4">Profile</h2>
        <div className="mb-2"><strong>Username:</strong> {user?.name}</div>
        <div className="mb-2"><strong>Email:</strong> {user?.email}</div>
        {user?.image && <img src={user.image} alt="avatar" className="w-24 h-24 rounded-full mt-4" />}
      </div>
    </div>
  );
};

export default Profile;
