'use client';

import { getMe, logout } from '@/service/client/auth';
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
import { useRouter } from 'next/navigation';
import { Button } from './button';
import { Plus } from '@phosphor-icons/react/dist/ssr';

export const Navbar = () => {
  const router = useRouter();
  const query = useQuery({
    queryKey: ['user'],
    queryFn: getMe,
  });

  const signOut = async () => {
    await logout();
    router.push('/login');
  };

  return (
    <nav className="h-16 border-b fixed top-0 inset-x-0 z-20 bg-inherit">
      <div className="container h-full flex items-center justify-between">
        <Link href="/" className="font-bold text-lg">
          Postify
        </Link>

        <div className="flex items-center gap-4">
          <Link href="/new">
            <Button variant="default">
              <Plus weight="bold" size={16} className="mr-1" />
              Create a post
            </Button>
          </Link>

          <DropdownMenu>
            <DropdownMenuTrigger>
              <img
                src={
                  query.data?.profile_pict ??
                  `https://api.dicebear.com/9.x/initials/svg?seed=${query.data?.username}`
                }
                alt={query.data?.username ?? 'Profile'}
                className="h-8 rounded-full"
              />
            </DropdownMenuTrigger>
            <DropdownMenuContent sideOffset={8}>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <Link href="/profile">
                <DropdownMenuItem>Profile</DropdownMenuItem>
              </Link>
              <DropdownMenuItem
                onClick={signOut}
                className="text-red-500 focus:text-red-600"
              >
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  );
};
