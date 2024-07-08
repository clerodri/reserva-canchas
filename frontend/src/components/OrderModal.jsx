import React from "react";
import "../css/OrderModal.css";
export function OrderModal({ isOpen, onClose, onSelectOption }) {
  if (!isOpen) return null;
  return ReactDOM.createPortal(
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Order By</h2>
        <div className="modal-buttons">
          <button onClick={() => onSelectOption("disponible")}>
            Disponibilidad
          </button>
          <button onClick={() => onSelectOption("price")}>Price</button>
          <button className="close-button" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}

export default OrderModal;
