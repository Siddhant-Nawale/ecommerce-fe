import React, { useEffect, useState } from "react";
import Select from "react-select";
import apiService from "../services/apiService";
import Loader from "./Loader";

interface Role {
  id: string;
  name: string;
}

interface User {
  id?: string;
  name: string;
  phone: string;
  roleIds: string[];
  password?: string; // Add password field to User
  roles?: { id: string; name: string }[];
}

interface UserFormProps {
  user?: User | null;
  onClose: () => void;
  onUserCreated: () => void;
}

const UserForm: React.FC<UserFormProps & { isViewMode?: boolean }> = ({
  user = null,
  onClose,
  onUserCreated,
  isViewMode = false,
}) => {
  const [userData, setUserData] = useState<User>({
    name: "",
    phone: "",
    roleIds: [],
    password: "", // Initialize password state
  });
  const [confirmPassword, setConfirmPassword] = useState<string>(""); // State for confirm password
  const [roles, setRoles] = useState<Role[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [passwordMismatch, setPasswordMismatch] = useState<boolean>(false); // State for password mismatch error

  useEffect(() => {
    const fetchRoles = async () => {
      setIsLoading(true);
      try {
        const rolesResponse = await apiService.fetchAllRoles();
        setRoles(rolesResponse?.data || []);
      } catch (error) {
        console.error("Failed to fetch roles", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRoles();

    if (user) {
      setUserData({
        name: user.name || "",
        phone: user.phone || "",
        roleIds: user?.roles?.map((role: any) => role.id) || [],
        password: "", // Reset password field when editing
      });
    }
  }, [user]);

  const handleInputChange = (selectedRoles: any) => {
    setUserData((prevState) => ({
      ...prevState,
      roleIds: selectedRoles.map((role: any) => role.value),
    }));
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserData({ ...userData, password: e.target.value });
  };

  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setConfirmPassword(e.target.value);
    setPasswordMismatch(e.target.value !== userData.password); // Check if passwords match
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (passwordMismatch) {
      return; // Prevent submission if passwords don't match
    }

    try {
      if (user) {
        await apiService.updateUser(user.id!, userData);
      } else {
        await apiService.createUser(userData);
        onUserCreated();
      }
      onClose();
    } catch (error) {
      console.error("Error submitting user data", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="user-form-wrapper">
      {isLoading ? (
        <Loader />
      ) : (
        <form onSubmit={handleSubmit} className="user-form">
          <div className="form-field-wrapper">
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={userData.name}
              disabled={isViewMode}
              onChange={(e) =>
                setUserData({ ...userData, name: e.target.value })
              }
              required
            />
          </div>
          <div className="form-field-wrapper">
            <label>Phone</label>
            <input
              type="number"
              name="phone"
              value={userData.phone}
              disabled={isViewMode}
              onChange={(e) =>
                setUserData({ ...userData, phone: e.target.value })
              }
              required
            />
          </div>
          <div className="form-field-wrapper">
            <label>Roles</label>
            <Select
              isMulti
              options={roles.map((role) => ({
                label: role.name,
                value: role.id,
              }))}
              value={roles
                .filter((role) => userData.roleIds.includes(role.id))
                .map((role) => ({
                  label: role.name,
                  value: role.id,
                }))}
              onChange={handleInputChange}
              isDisabled={isViewMode}
            />
          </div>
          {!isViewMode && (
            <>
              <div className="form-field-wrapper">
                <label>Password</label>
                <input
                  type="password"
                  name="password"
                  value={userData.password}
                  disabled={isViewMode}
                  onChange={handlePasswordChange}
                  required
                />
              </div>
              <div className="form-field-wrapper">
                <label>Confirm Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                  required
                />
                {passwordMismatch && (
                  <span style={{ color: "red" }}>Passwords do not match</span>
                )}
              </div>
            </>
          )}
          <div className="flex-row action-button-wrapper">
            <button onClick={onClose} className="button-cancle">
              Close
            </button>
            <button type="submit" disabled={isSubmitting || passwordMismatch || isViewMode}>
              {isSubmitting
                ? "Submitting..."
                : user
                ? "Update User"
                : "Add User"}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default UserForm;
