// UserTable.js
import React, { useEffect, useRef } from "react";
import $ from "jquery";
import "datatables.net-bs4/css/dataTables.bootstrap4.min.css";
import "datatables.net-bs4/js/dataTables.bootstrap4.min.js";
import { useSelector } from "react-redux";
import { User } from "./features/types.ts";

const UserTable = () => {
  const submittedUsers = useSelector((state) => state.user.submittedUsers);
  const tableRef = useRef(null);
  console.log(submittedUsers);

  useEffect(() => {
    console.log("submittedUsers in useEffect", submittedUsers);
    tableRef.current = $("#userTable").DataTable({
      data: submittedUsers,
      columns: [
        { data: "Name" },
        { data: "Age" },
        { data: "Sex" },
        { data: "Mobile" },
        { data: "GovtIdType" },
        { data: "GovtId" },
      ],
    });
  
    return () => {
      tableRef.current.destroy();
    };
  }, [submittedUsers]);
  

  return (
    <div>
      <h2>Step 1 - Submitted Users</h2>
      <table id="userTable" className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Age</th>
            <th>Sex</th>
            <th>Mobile</th>
            <th>ID Type</th>
            <th>ID</th>
          </tr>
        </thead>
        <tbody>{/* No need to map here */}</tbody>
      </table>
    </div>
  );
};

export default UserTable;
