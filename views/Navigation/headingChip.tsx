import React from 'react'

interface ChipProps{
  headingText: string
}
const Chip:React.FC<ChipProps> = ({headingText}) => {
  return (
   <h2 className='flex bg-white p-4 border rounded-full items-start'>
    {headingText}
   </h2>
  )
}

export default Chip
