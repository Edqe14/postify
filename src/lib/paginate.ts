import { db } from '@/db';
import { sql } from 'drizzle-orm';

export type PaginationObject<T = any> = {
  metadata: {
    total: number;
    page: number;
    perPage: number;
    lastPage: number;
  };
  data: T;
};

export const paginate = async (
  builder: any,
  page: number,
  perPage = 10
): Promise<PaginationObject> => {
  const [row] = await db
    .select({ count: sql`count(*)::int` })
    .from(sql`(${builder.getSQL()}) x`)
    .limit(1);

  const count = row.count as number;

  // 0
  if (!count) {
    return {
      metadata: {
        total: 0,
        page,
        perPage,
        lastPage: 0,
      },
      data: [],
    };
  }

  const lastPage = Math.ceil(count / perPage);
  const data = await builder.limit(perPage).offset((page - 1) * perPage);

  return {
    metadata: {
      total: count,
      page,
      perPage,
      lastPage,
    },
    data,
  };
};
