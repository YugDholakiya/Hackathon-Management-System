import React from 'react'
import SearchBar from './SearchBar'
import Filter from './Filter'

function SearchSort() {
  return (
    <>


<div className='flex flex-col md:flex-row w-full justify-center  gap-6 lg:gap-0 p-5
  '>
    <div className='w-full  md:w-1/2 lg:w-[44%]'>
    <SearchBar/>
    </div>
  
   <Filter/>
     
   
   
</div>




    </>
  )
}

export default SearchSort
