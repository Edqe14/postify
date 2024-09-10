import { getPost } from '@/service/server/post';
import { getMe } from '@/service/server/user';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { GoBack } from '../go-back';
import { EditForm } from './form';

export default async function PostEditPage({
  params,
}: {
  params: { slug: string };
}) {
  const cookie = cookies();
  const user = (await getMe(cookie.get('token')?.value))!;
  const data = await getPost(params.slug);

  if (!data || user.id !== data.user.id) {
    return redirect('/');
  }

  return (
    <section className="container py-8 flex-grow flex flex-col border-x">
      <div>
        <GoBack />
      </div>

      <section className="flex-grow flex flex-col gap-4">
        <EditForm
          slug={params.slug}
          title={data.title}
          content={data.content}
        />
      </section>
    </section>
  );
}
