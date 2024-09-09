import { Navbar } from '@/components/ui/navbar';
import { getMe } from '@/service/server/user';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function Home() {
  const cookie = cookies();
  const user = await getMe(cookie.get('token')?.value);

  if (!user) return redirect('/login');

  return (
    <>
      <Navbar />
      <main>hi</main>
    </>
  );
}
