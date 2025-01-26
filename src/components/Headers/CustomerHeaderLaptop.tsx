import React, { useState } from "react";
import { CgGym } from "react-icons/cg";
import { IoIosArrowDown } from "react-icons/io";
import { IoPersonSharp, IoSearch } from "react-icons/io5";
import { MdLocationPin, MdRestaurantMenu } from "react-icons/md";
import { TiShoppingCart } from "react-icons/ti";
import { useUser } from "../../contexts/UserContext";
import apiService from "../../services/apiService";
import Login from "../auth/Login";

const CustomerHeaderLaptop = () => {
  const [showLoginScreen, setShowLoginScreen] = useState(false);
  const [userDeliveryAddress, setUserDeliveryAddress] = useState({text:"asdfaevsdvasvwe"});
  const { user } = useUser();
  const handleLoginLogout = async () => {
    if (user) {
      try {
        await apiService.logout();
        window.location.reload();
      } catch (error) {
        console.error("Error during logout:", error);
      }
    } else {
      setShowLoginScreen(true);
    }
  };

  const handleOverlayClick = () => {
    setShowLoginScreen(false);
  };

  const stopPropagation = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <header className="customer-laptop-header">
      <div className="content flex-row flex-align-center">
        <div className="logo">
          <CgGym size={50} color="red" />
        </div>
        <div className="user-location flex-row flex-center">
          <div className="user-location-icon flex flex-center">
            <MdLocationPin size={30} color="red" />
          </div>
          <div className="user-location-content">
            <p>
              <strong>Delivering to</strong> <IoIosArrowDown />
            </p>
            <p>{userDeliveryAddress?.text}</p>
          </div>
        </div>
        <div className="search-bar flex-row">
          <button
            className="button-default header-action-button flex-row flex-center"
            title="Logout"
          >
            <IoSearch size={25} fill="#cc242c" className="icon" />{" "}
          </button>
          <input className="text-content" placeholder="Search Recipes"></input>
        </div>
        <div className="action-buttons">
          <button
            onClick={handleLoginLogout}
            className="button-default header-action-button flex-row flex-center"
            title="Logout"
          >
            <MdRestaurantMenu size={25} fill="#cc242c" className="icon" />{" "}
            <p className="text flex-row flex-center">Recipes</p>
          </button>
          <button
            onClick={handleLoginLogout}
            className="button-default header-action-button flex-row flex-center"
            title="Logout"
          >
            <TiShoppingCart size={25} fill="#cc242c" className="icon" />{" "}
            <p className="text flex-row flex-center">Cart</p>
          </button>
          <button
            onClick={handleLoginLogout}
            className="button-type-danger login-logout-button flex-row flex-center"
            title="Logout"
          >
            <IoPersonSharp size={25} fill="white" className="icon" />{" "}
            <p className="text">{user ? "Logout" : "Login"}</p>
          </button>
        </div>
      </div>
      {showLoginScreen && (
        <div className="modal-overlay" onClick={handleOverlayClick}>
          <div onClick={stopPropagation}>
            <Login onLogin={() => setShowLoginScreen(false)} />
          </div>
        </div>
      )}
    </header>
  );
};

export default CustomerHeaderLaptop;
