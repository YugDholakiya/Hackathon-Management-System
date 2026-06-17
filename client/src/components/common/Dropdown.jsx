import React from 'react';

const DropDown = ({ title, nested, content, children }) => (
    <details className="mb-2">
        <summary className={`p-3 m-[2px] rounded-lg cursor-pointer shadow-lg border-2 border-gray-300 ${nested ? "bg-blue-50 hover:bg-green-200 " : "bg-gray-200"}`}>
            <span className="font-semibold text-green-500  ">{title}</span>
        </summary>
        <div className=" mx-auto bg-blue-0 p-2 rounded-md">
            {nested ? children : <p className="text-gray-800">{content}</p>}
        </div>
    </details>
);

export default DropDown;