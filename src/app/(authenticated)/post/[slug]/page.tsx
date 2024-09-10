import { Button } from '@/components/ui/button';
import { getPost } from '@/service/server/post';
import { getMe } from '@/service/server/user';
import { DateTime } from 'luxon';
import { cookies } from 'next/headers';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { GoBack } from './go-back';
import { DeletePost } from './delete-post';
import rehypeHighlight from 'rehype-highlight';
import rehypeSanitize from 'rehype-sanitize';

export default async function PostDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const cookie = cookies();
  const user = (await getMe(cookie.get('token')?.value))!;
  const data = await getPost(params.slug);

  if (!data) {
    return redirect('/');
  }

  return (
    <section className="container py-8">
      <GoBack />

      <article>
        <div className="space-y-4 mb-8">
          <div className="flex justify-between items-center">
            <h1 className="text-5xl font-bold">{data.title}</h1>

            {user.id === data.user.id && (
              <div className="space-x-2">
                <Link href={`/post/${params.slug}/edit`}>
                  <Button>Edit</Button>
                </Link>

                <DeletePost slug={params.slug} />
              </div>
            )}
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2">
              <img
                src={
                  data.user.profile_pict ??
                  `https://api.dicebear.com/9.x/initials/svg?seed=${data.user.username}`
                }
                alt={data.user.username ?? 'Profile'}
                className="h-8 rounded-full"
                title={data.user.username}
              />

              <p>{data.user.username}</p>
            </div>

            <span className="font-bold text-2xl">&middot;</span>

            <p>
              {DateTime.fromJSDate(data.created_at!).toLocaleString(
                DateTime.DATETIME_SHORT
              )}
            </p>
          </div>
        </div>
        <div className="prose dark:prose-invert">
          <Markdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeHighlight, rehypeSanitize]}
          >
            {data.content}
          </Markdown>
        </div>
      </article>
    </section>
  );
}
