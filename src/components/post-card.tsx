import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { PostQuery } from '@/service/server/post';
import { DateTime } from 'luxon';
import Link from 'next/link';

export const PostCard = ({
  title,
  user,
  createdAt,
  id,
}: Omit<PostQuery, 'content'>) => {
  return (
    <Link href={`/post/${id}`} className="block">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl flex justify-between items-center">
            <div>
              <h3>{title}</h3>
              <p className="text-sm font-normal">
                {DateTime.fromISO(createdAt).toLocaleString(
                  DateTime.DATETIME_SHORT
                )}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <img
                src={
                  user.profile_pict ??
                  `https://api.dicebear.com/9.x/initials/svg?seed=${user.username}`
                }
                alt={user.username ?? 'Profile'}
                className="h-8 rounded-full"
                title={user.username}
              />
            </div>
          </CardTitle>
        </CardHeader>
      </Card>
    </Link>
  );
};
