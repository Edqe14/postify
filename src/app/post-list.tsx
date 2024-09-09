'use client';

import { DynamicPagination } from '@/components/ui/dynamic-pagination';
import { Spinner } from '@/components/ui/spinner';
import { getPosts } from '@/service/client/post';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { useState } from 'react';

export const PostList = () => {
  const [page, setPage] = useState(1);

  const { isPending, isError, error, data, isFetching } = useQuery({
    queryKey: ['posts', page],
    queryFn: () => getPosts(page),
    placeholderData: keepPreviousData,
  });

  console.log(data);

  return (
    <section className="min-h-screen flex flex-col">
      <section className="container relative flex-grow">
        {isFetching && (
          <div className="absolute inset-0 grid place-items-center">
            <Spinner />
          </div>
        )}

        <DynamicPagination
          page={page}
          pageSize={data?.metadata.perPage ?? 20}
          totalCount={data?.metadata.total ?? 0}
        />
      </section>
    </section>
  );
};
