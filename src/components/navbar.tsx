'use client';

import { useClerk, useUser } from '@clerk/nextjs';
import { ListIcon, LogOutIcon } from 'lucide-react';
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';

export const Navbar = () => {
  const { signOut } = useClerk();
  const { user } = useUser();

  if (!user) return null;

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="rounded-full bg-transparent text-white ">
            <Avatar>
              <AvatarImage
                src={user?.imageUrl}
                alt={user?.fullName ?? user.firstName ?? ''}
              />
              <AvatarFallback>
                {user?.fullName?.charAt(0) ?? user?.firstName?.charAt(0)}
              </AvatarFallback>
            </Avatar>
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-36 bg-black border border-gray-700/80">
          <DropdownMenuLabel className="text-white">
            {user?.fullName}
          </DropdownMenuLabel>
          <DropdownMenuSeparator className="bg-gray-700/80" />
          <DropdownMenuItem className="cursor-pointer hover:bg-gray-700/40 transition-colors">
            <Link href="/dashboard" className="flex items-center gap-2">
              <ListIcon className="size-4 text-white" />
              Mis Productos
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer hover:bg-gray-700/40 transition-colors">
            <button
              onClick={() => signOut({ redirectUrl: '/' })}
              className="w-full text-white flex items-center gap-2"
            >
              <LogOutIcon className="size-4" />
              Cerrar Sesión
            </button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
