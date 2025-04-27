import { LoginLastResource } from "@/types/login";
import React from "react";

const LoginLastTable = ({ data,currentPage,itemsPerPage }: { data: LoginLastResource[],currentPage:number,itemsPerPage:number }) => {
  const startIndex = (currentPage - 1) * itemsPerPage;
  return (
    <div className="overflow-x-auto rounded-2xl shadow-md border border-gray-200">
      <table className="min-w-full text-sm text-left">
        <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
          <tr>
            <th className="px-4 py-3">#</th>
            <th className="px-4 py-3">Username</th>
            <th className="px-4 py-3">Name</th>
            <th className="px-4 py-3">Role</th>
            <th className="px-4 py-3">ISP</th>
            <th className="px-4 py-3">IP Address</th>
            <th className="px-4 py-3">Device</th>
            <th className="px-4 py-3">Browser</th>
            <th className="px-4 py-3">Platform</th>
            <th className="px-4 py-3">Country</th>
            <th className="px-4 py-3">City</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {data.map((item, index) => (
            <tr key={index} className="hover:bg-gray-50">
              <td className="px-4 py-3">{startIndex + index+1}</td>
              <td className="px-4 py-3">{item.username}</td>
              <td className="px-4 py-3">{item.nama}</td>
              <td className="px-4 py-3 capitalize">{item.role}</td>
              <td className="px-4 py-3">{item.isp}</td>
              <td className="px-4 py-3">{item.ip_address}</td>
              <td className="px-4 py-3">{item.device}</td>
              <td className="px-4 py-3">{item.browser}</td>
              <td className="px-4 py-3">{item.platform}</td>
              <td className="px-4 py-3">{item.country}</td>
              <td className="px-4 py-3">{item.city}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LoginLastTable;


