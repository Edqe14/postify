import { Navbar } from '@/components/ui/navbar';
import { getMe } from '@/service/server/user';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function AuthenticatedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookie = cookies();
  const user = await getMe(cookie.get('token')?.value);

  if (!user) return redirect('/login');

  return (
    <>
      <Navbar />
      <main className="pt-16 min-h-screen flex flex-col">{children}</main>
    </>
  );
}
