"use client";

import React from 'react';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { PiMagnifyingGlass } from 'react-icons/pi';
import { useDebouncedCallback } from 'use-debounce';
import { Button } from '@/components/ui/button';

function InputSearch({ placeholder, onSearch }: { placeholder: string; onSearch: (searchQuery: string) => void; }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set('query', term);
      onSearch(term);
    } else {
      params.delete('query');
      onSearch('');
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
    <div className="relative hidden lg:flex ">
      <PiMagnifyingGlass className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
      <Input
        placeholder={placeholder}
        onKeyDown={handleKeyDown}
        onChange={(e) => handleSearch(e.target.value)}
        defaultValue={searchParams.get('query')?.toString()}
        endContent={<Button className='bg-pricesageBlackTwo text-white font-medium absolute rounded-l-none right-0 top-1/2 h-full -translate-y-1/2 peer-focus:text-gray-900'>Search</Button>}
        className="peer w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500 lg:w-[500px]"
      />
    </div>
  );
}

export default InputSearch;
