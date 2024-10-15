import React, { createContext } from "react";
const TableContext = createContext();

export default function CustomTable({ columns, children }) {
  return (
    <TableContext.Provider value={{ columns }}>
      <div className="overflow-x-auto rounded-lg border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200" role="table">
          {children}
        </table>
      </div>
    </TableContext.Provider>
  );
}

function Header({ children }) {
  return (
    <thead className="bg-gray-50">
      <tr>
        {children.map((child, index) => (
          <th
            key={index}
            scope="col"
            className="px-6 py-3  text-left text-xs font-medium text-indigo-700 uppercase tracking-wider cursor-pointer"
          >
            {child}
          </th>
        ))}
      </tr>
    </thead>
  );
}

function Body({ data, render }) {
  return (
    <tbody className="bg-white divide-y divide-gray-200">
      {data.map(render)}
    </tbody>
  );
}

function Footer({ children }) {
  return <tfoot>{children}</tfoot>;
}

CustomTable.Header = Header;
CustomTable.Body = Body;
CustomTable.Footer = Footer;
