import React from "react";
import { Button } from "../../common/Button";
import DropDown from "../../common/Dropdown";

function LoginDorpDown() {
  const items = [
    // {
    //   title: "Dashboard",
    //   link: "Dashboard",
    //   icon: {
    //     xmlns: "http://www.w3.org/2000/svg",
    //     viewBox: "0 0 24 24",
    //     path: "M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z",
    //   },
    // },

    {
      title: "Profile",
      link: "Profile",
      icon: {
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 24 24",
        path: "M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z",
      },
    },
  ];

  return (
    <>
    <div className="w-[10%] shadow-md shadow-blue-500 rounded-lg">
    <DropDown title="Profile" nested={true}><>
    
    {items.map((item) => (
          <div key={item.title} className="text-gray-800 hover:bg-blue-200 px-2 py-2 text-start w-[80%] mx-auto rounded-md my-2">
            <svg xmlns={item.icon.xmlns} viewBox={item.icon.viewBox} className="h-6 w-6 inline-block mr-2">
              <path d={item.icon.path} />
            </svg>
            {item.title}
          </div>
        ))}

        <div className="flex justify-center">
        <Button buttonStyle="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-[40px] rounded  ">Logout</Button>
        </div>
    </>
       
        
      </DropDown>
    </div>
      
    </>
  );
}

export default LoginDorpDown;
