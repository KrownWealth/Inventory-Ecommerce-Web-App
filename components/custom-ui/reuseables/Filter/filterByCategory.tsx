import * as React from "react"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const FilterByCategory = () => {
  return (
    <Select>
      <SelectTrigger className="w-[180px]">
        <SelectValue className="font-bold text-lg" placeholder="Filter By Category" />
      </SelectTrigger>
      <SelectContent className="font-semibold">
        <SelectGroup>
          <SelectItem value="apple">Living Room</SelectItem>
          <SelectItem value="banana">Office</SelectItem>
          <SelectItem value="blueberry">Dinning Room</SelectItem>
          <SelectItem value="grapes">Bedroom</SelectItem>
          <SelectItem value="pineapple">Kitchen</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}

export default FilterByCategory
