'use client';

import { PostCard } from '@/components/post-card';
import { DynamicPagination } from '@/components/ui/dynamic-pagination';
import { Spinner } from '@/components/ui/spinner';
import { getMyPosts } from '@/service/client/post';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';

export const MyPostList = () => {
  const searchParam = useSearchParams();
  const page = parseInt(searchParam.get('page') ?? '1', 10);

  const { isPending, data } = useQuery({
    queryKey: ['posts', page],
    queryFn: () => getMyPosts(page),
    placeholderData: keepPreviousData,
  });

  return (
    <section className="flex flex-col">
      <section className="container relative flex-grow flex flex-col py-8 space-y-8">
        {isPending && (
          <div className="flex-grow grid place-items-center">
            <Spinner />
          </div>
        )}

        {!isPending && data?.data.length === 0 && (
          <div className="text-center flex-grow grid place-items-center">
            No posts found
          </div>
        )}

        {!isPending && (data?.data.length ?? 0) > 0 && (
          <>
            <section className="space-y-4">
              {data?.data.map((post) => (
                <PostCard key={post.id} {...post} />
              ))}
            </section>

            <DynamicPagination
              page={page}
              pageSize={data?.metadata.perPage ?? 20}
              totalCount={data?.metadata.total ?? 0}
            />
          </>
        )}
      </section>
    </section>
  );
};
