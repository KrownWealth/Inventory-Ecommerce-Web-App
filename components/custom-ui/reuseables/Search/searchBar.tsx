"use client"

import React from 'react';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { PiMagnifyingGlass } from 'react-icons/pi';
import {useDebouncedCallback} from 'use-debounce'

function InputSearch({ placeholder }: { placeholder: string }) {
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
      e.preventDefault(); // Prevent form submission
      const term = (e.target as HTMLInputElement).value;
      handleSearch(term);
    }
  };

  return (
   
      <div className="relative ">
        <label htmlFor="search" className="sr-only">
          Search
        </label>
        <PiMagnifyingGlass className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
        <Input
          placeholder={placeholder}
          onKeyDown={handleKeyDown}
          onChange={(e) => handleSearch(e.target.value)}
          defaultValue={searchParams.get('query')?.toString()}
          className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500 lg:w-[500px]"
        />
      </div>
   
  );
}

export default InputSearch;
