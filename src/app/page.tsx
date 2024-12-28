import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';

export default async function Home() {
  const cookieStore = await cookies();
  const isAuthenticated = cookieStore?.get('access');

  if (!isAuthenticated) {
    redirect('/login');
  } else {
    redirect('/profile');
  }

  return null;
}