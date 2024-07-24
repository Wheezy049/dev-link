"use client"
import useAuth   from '@/useAuth/useAuth';
import Header from '../components/header/header'; 
import Link from '../components/links/links';

const Home: React.FC = () => {

  const { user, loading, isAuthenticated } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return null; // This will never be reached because of the redirect in useAuth
  }

  return (
    <main>
      <Header />
      <Link />
    </main>
  );
};

export default Home;
