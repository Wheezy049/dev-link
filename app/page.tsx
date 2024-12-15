"use client"
import useAuth   from '@/useAuth/useAuth';
import { useState } from 'react';
import Link, { Link as LinkType } from '../components/links/links';
import Layout from '@/components/layout';

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
     <div className='max-w-[1200px] w-full flex mx-auto items-center justify-center '>
      <Layout>
      <Link links={links} setLinks={setLinks}/>
      </Layout>
     </div>
  );
};

export default Home;
