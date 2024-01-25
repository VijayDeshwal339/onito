import React from 'react';
import { useSelector } from 'react-redux';
import MUIDataTable from 'mui-datatables';
import { useNavigate } from 'react-router-dom';

const DataTable = () => {
  const submittedUsers = useSelector((state) => state.user.submittedUsers);
  const navigate = useNavigate();

  const columns = ["Name", "Age / Sex", "Mobile", "Govt ID Type", "Govt ID", "Address"];

  const options = {
    filterType: 'checkbox',
    selectableRows: 'none', // Disable row selection
    selectableRowsHideCheckboxes: true, // Hide checkboxes
  };

  const handleRowClick = (_, rowData) => {
    console.log("Row Clicked:", rowData);
    // You can navigate to a specific user's page here if needed
    // Example: navigate(`/user/${rowData[0]}`);
  };

  return (
    <div>
      {submittedUsers ? (
        <MUIDataTable
          title="Submitted Users"
          data={submittedUsers.map((user) => [
            user.name || '',
            `${user.age || ''}Y / ${user.sex === "Male" ? "M" : "F"}`,
            user.mobile || '',
            user.govtIdType || '',
            user.govtId || '',
            user.address
              ? `${user.address.toUpperCase()}, ${user.city ? user.city.toUpperCase() : ''}, ${user.country ? user.country.toUpperCase() : ''} - ${user.pincode || ''}`
              : '',
          ])}
          columns={columns}
          options={{ ...options, onRowClick: handleRowClick }}
        />
      ) : (
        <p>No submitted users yet.</p>
      )}
    </div>
  );
};

export default DataTable;
