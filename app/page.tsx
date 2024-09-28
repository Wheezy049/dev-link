"use client"
import useAuth   from '@/useAuth/useAuth';
import { useState } from 'react';
import Link, { Link as LinkType } from '../components/links/links';

const Home: React.FC = () => {

  const { user, loading, isAuthenticated } = useAuth();

  const [links, setLinks] = useState<LinkType[]>([]); 

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return null; // This will never be reached because of the redirect in useAuth
  }

  return (
     <div>
      <Link links={links} setLinks={setLinks}/>
     </div>
  );
};

export default Home;
