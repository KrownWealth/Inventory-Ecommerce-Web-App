import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'
import React from 'react'

function InputSearch() {
  return (
     <form>
              <div className="relative ">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search products..."
                  className="w-full bg-background shadow-none appearance-none pl-8 md:w-2/3 lg:w-full"
                />
              </div>
            </form>
  )
}

export default InputSearch
