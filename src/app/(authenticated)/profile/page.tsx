import { getMe } from '@/service/server/user';
import { DateTime } from 'luxon';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { MyPostList } from './post-list';

export default async function Profile() {
  const cookie = cookies();
  const user = (await getMe(cookie.get('token')?.value))!;

  if (!user) {
    return redirect('/');
  }

  return (
    <section className="container px-0 border-x flex-grow">
      <section className="flex gap-4 p-8 items-center border-b">
        <img
          src={
            user.profile_pict ??
            `https://api.dicebear.com/9.x/initials/svg?seed=${user.username}`
          }
          alt={user.username ?? 'Profile'}
          className="h-24 rounded-lg"
          title={user.username}
        />

        <div>
          <h3 className="text-3xl font-semibold">{user.username}</h3>
          <p>
            Joined at{' '}
            {DateTime.fromJSDate(user.created_at!).toLocaleString(
              DateTime.DATETIME_SHORT
            )}
          </p>
        </div>
      </section>

      <MyPostList />
    </section>
  );
}
