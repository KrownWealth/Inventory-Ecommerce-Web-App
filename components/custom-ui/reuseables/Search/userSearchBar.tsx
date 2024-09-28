"use client"

import React from 'react';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { PiMagnifyingGlass } from 'react-icons/pi';
import { useDebouncedCallback } from 'use-debounce';
import { Button } from '@/components/ui/button';

function UserSearch() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set('query', term);
    } else {
      params.delete('query');
    }
    router.replace(`${pathname}?${params.toString()}`);
  }, 500);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const term = (e.target as HTMLInputElement).value;
      handleSearch(term);
    }
  };

  return (
    <div className="flex items-center w-full lg:w-[580px]">
      <div className="relative w-full">
        <label htmlFor="search" className="sr-only">
          Search
        </label>
        <PiMagnifyingGlass className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-600 peer-focus:text-gray-900" />
        <Input
          placeholder="Search for product here..."
          onKeyDown={handleKeyDown}
          onChange={(e) => handleSearch(e.target.value)}
          defaultValue={searchParams.get('query')?.toString()}
          endContent={<Button className='bg-pricesageBlackTwo text-white font-medium absolute rounded-l-none right-0 top-1/2 h-full -translate-y-1/2 peer-focus:text-gray-900'>Search</Button>}
          className="peer block w-full rounded-l-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-600"
        />
      </div>
    </div>
  );
}

export default UserSearch;
