import React, { useState, useEffect, useMemo } from "react";
import { useTable, Column } from "react-table";
import apiService from "../services/apiService";
import authorizationservice from "../services/authorizationservice";
import Loader from "./Loader";
import { userFetchAndPolicyConfig } from "../configs/userFetchAndPolicyConfig";
import UserForm from "./UserForm";
import { User } from "../contexts/UserContext";

const UserManagement: React.FC = () => {
  const [userList, setUserList] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showUserForm, setShowUserForm] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<any | null>(null);

  useEffect(() => {
    fetchAndProcessUserData();
  }, []);

  const fetchAndProcessUserData = async () => {
    setIsLoading(true);
    try {
      const roleNames = Object.keys(userFetchAndPolicyConfig).reduce(
        (acc: string[], policy: string) => {
          if (authorizationservice.authorise(policy)) {
            const config = userFetchAndPolicyConfig[policy]?.roles;
            if (config) {
              acc.push(...config);
            }
          }
          return acc;
        },
        []
      );

      const response =
        (await apiService.fetchManagementUserList(roleNames))?.data?.users ||
        [];
      setUserList(response);
    } catch (error) {
      console.error("Failed to fetch user data", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Define table columns
  const columns: Column<User>[] = useMemo(
    () => [
      {
        Header: "Name",
        accessor: "name",
      },
      {
        Header: "Phone",
        accessor: "phone",
      },
      {
        Header: "Roles",
        accessor: "roles",
        Cell: ({ value }: { value: { name: string }[] }) =>
          value.map((role) => role.name).join(", "),
      },
      {
        Header: "Actions",
        accessor: "id",
        Cell: ({ row }: { row: { original: User } }) => (
          <div className="action-buttons">
            <button
              className="button-type-green"
              onClick={() => handleViewUserClick(row.original)}
            >
              View
            </button>
            <button
              className="button-type-warning"
              onClick={() => handleEditUserClick(row.original)}
            >
              Edit
            </button>
            <button
              className="button-type-danger"
              onClick={() => handleDeleteUserClick(row.original)}
            >
              Delete
            </button>
          </div>
        ),
      },
    ],
    []
  );

  // React Table instance
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable<User>({ columns, data: userList });

  const handleAddUserClick = () => {
    setSelectedUser(null);
    setShowUserForm(true);
  };

  const handleEditUserClick = (user: User) => {
    setSelectedUser(user);
    setShowUserForm(true);
  };

  const handleViewUserClick = (user: User) => {
    setSelectedUser({ ...user, viewOnly: true });
    setShowUserForm(true);
  };

  const handleDeleteUserClick = async (user: User) => {
    try {
      await apiService.deleteUserWithId(user.id);
      fetchAndProcessUserData();
    } catch (error) {
      console.error("Failed to delete user", error);
    }
  };

  const handleUserFormClose = () => {
    setShowUserForm(false);
    setSelectedUser(null);
  };

  const handleUserCreated = () => {
    handleUserFormClose();
    fetchAndProcessUserData();
  };

  return (
    <div className="user-management">
      <div className="button-type-blue-wrapper">
        <button
          onClick={handleAddUserClick}
          className="button-type-warning button-type-blue"
        >
          Add User
        </button>
      </div>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="table-container">
          <table {...getTableProps()} className="user-table">
            <thead>
              {headerGroups.map((headerGroup) => {
                const { key: headerKey, ...restHeaderProps } =
                  headerGroup.getHeaderGroupProps(); // Extract key

                return (
                  <tr key={headerKey} {...restHeaderProps}>
                    {headerGroup.headers.map((column) => {
                      const { key, ...rest } = column.getHeaderProps(); // Extract key
                      return (
                        <th key={key} {...rest}>
                          {column.render("Header")}
                        </th>
                      );
                    })}
                  </tr>
                );
              })}
            </thead>
            <tbody {...getTableBodyProps()}>
              {rows.map((row) => {
                prepareRow(row);
                const { key, ...rowProps } = row.getRowProps(); // Extract key separately
                return (
                  <tr key={key} {...rowProps}>
                    {row.cells.map((cell) => {
                      const { key: cellKey, ...cellProps } =
                        cell.getCellProps(); // Extract key separately for cells
                      return (
                        <td key={cellKey} {...cellProps}>
                          {cell.render("Cell")}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>

          {/* Pagination Controls
          {userList.length > 0 && (
            <div className="pagination-controls">
              <button
                disabled={currentPage === 1}
                onClick={() => handlePageChange(currentPage - 1)}
              >
                Previous
              </button>
              <span>
                Page {currentPage} of {totalPages}
              </span>
              <button
                disabled={currentPage === totalPages}
                onClick={() => handlePageChange(currentPage + 1)}
              >
                Next
              </button>
            </div>
          )} */}
        </div>
      )}

      {showUserForm && (
        <div className="modal-overlay">
          <div className="modal-content">
            <UserForm
              user={selectedUser}
              onClose={handleUserFormClose}
              onUserCreated={handleUserCreated}
              isViewMode={!!selectedUser?.viewOnly}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagement;
