// UserTableStep2.js
import React, { useEffect } from "react";
import $ from "jquery";
import "https://cdn.datatables.net/2.0.0/js/dataTables.js";
import { useSelector } from "react-redux";

const UserTableStep2 = () => {
  const submittedUsersStep2 = useSelector((state) => state.user.submittedUsersStep2);

  useEffect(() => {
    $("#userTableStep2").DataTable();
  }, [submittedUsersStep2]);

  return (
    <div>
      <h2>Step 2 - Submitted Users</h2>
      <table id="userTableStep2" className="table">
        <thead>
          <tr>
            <th>Address</th>
            <th>State</th>
            <th>City</th>
            <th>Country</th>
            <th>Pin Code</th>
          </tr>
        </thead>
        <tbody>
          {submittedUsersStep2.map((user, index) => (
            <tr key={index}>
              <td>{user.Address}</td>
              <td>{user.State}</td>
              <td>{user.City}</td>
              <td>{user.Country}</td>
              <td>{user.Pincode}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTableStep2;
