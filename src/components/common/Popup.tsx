import React from "react";
const Popup = ({
  isOpen,
  onClose,
  children,
  showCloseButton = true,
}: {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  showCloseButton?: boolean;
}) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="popup-container">
        {showCloseButton && (
          <button className="close-button" onClick={onClose}>
            ✖
          </button>
        )}
        {children}
      </div>
    </div>
  );
};

export default Popup;
