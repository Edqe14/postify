'use client';

import { getMe } from '@/service/client/auth';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './dropdown-menu';

export const Navbar = () => {
  const query = useQuery({
    queryKey: ['user'],
    queryFn: getMe,
  });

  return (
    <nav className="h-16 border-b fixed top-0 inset-x-0">
      <div className="container h-full flex items-center justify-between">
        <Link href="/" className="font-bold text-lg">
          Postify
        </Link>

        <DropdownMenu>
          <DropdownMenuTrigger>
            <img
              src={
                query.data?.profile_pict ??
                `https://api.dicebear.com/9.x/initials/svg?seed=${query.data?.username}`
              }
              alt={query.data?.username ?? 'Profile'}
              className="h-10 rounded-full"
            />
          </DropdownMenuTrigger>
          <DropdownMenuContent sideOffset={8}>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
};
