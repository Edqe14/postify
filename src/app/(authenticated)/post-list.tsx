'use client';

import { DynamicPagination } from '@/components/ui/dynamic-pagination';
import { Spinner } from '@/components/ui/spinner';
import { getPosts } from '@/service/client/post';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { useState } from 'react';

export const PostList = () => {
  const [page, setPage] = useState(1);

  const { isPending, isError, error, data } = useQuery({
    queryKey: ['posts', page],
    queryFn: () => getPosts(page),
    placeholderData: keepPreviousData,
  });

  console.log(data);

  return (
    <section className="min-h-screen flex flex-col">
      <section className="container relative flex-grow flex flex-col">
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
          <DynamicPagination
            page={page}
            pageSize={data?.metadata.perPage ?? 20}
            totalCount={data?.metadata.total ?? 0}
          />
        )}
      </section>
    </section>
  );
};
