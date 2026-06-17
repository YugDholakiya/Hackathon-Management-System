import React from 'react';
import DropDown from '../Dropdown';

function Filter() {
  const categories = [
    {
      title: "Category1",
      subcategories: [{title:"subcategory1"},{title: "subcategory2"}, {title:"subcategory3"}, {title:"subcategory4"}],
    },
    {
      title: "Category2",
      subcategories: [{title:"subcategory1"},{title: "subcategory2"}, {title:"subcategory3"}, {title:"subcategory4"}],
    },
    {
      title: "Category3",
      subcategories: [{title:"subcategory1"},{title: "subcategory2"}, {title:"subcategory3"}, {title:"subcategory4"}],
    },
  ];

  return (
    <> 
    <div className='w-full md:w-1/4 lg:w-[10%] shadow-md shadow-blue-500   rounded-lg'>
    <DropDown title="Filter" nested={true}>
        <div className='  '>
        {categories.map((category) => (
          <DropDown key={category.title} title={category.title} nested={true}>
            {category.subcategories.map((subcategory) => (
              <div key={subcategory.title} className="text-gray-700 text-center hover:text-blue-500 hover:bg-blue-100 rounded-md font-bold  px-2 py-1   ">{subcategory.title}</div>
            ))}
          </DropDown>
        ))}
        </div>
      </DropDown>
    </div>
    </>
  );
}

export default Filter;