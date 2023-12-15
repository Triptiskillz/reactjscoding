import React from "react";
import { Modal, Button, Form, FormControl } from "react-bootstrap";

const ModalA = ({
  openModalA,
  openModalB,
  closeModal,
  onlyEven,
  handleCheckboxChange,
  handleSearchChange,
  filteredContacts,
  loadMoreContacts,
  openModalC,
}) => {
  return (
    // Bootstrap Modal component
    <Modal show={true} onHide={closeModal}>
      {/* Modal Header */}
      <Modal.Header closeButton>
        <Modal.Title>All Contacts</Modal.Title>
      </Modal.Header>

      {/* Modal Body */}
      <Modal.Body>
        {/* Button group for navigation */}
        <Button
          variant="outline-primary me-4"
          style={{ backgroundColor: "#461391", color: "white" }}
          onClick={openModalA}
        >
          All Contacts
        </Button>
        <Button
          variant="outline-warning me-4"
          style={{ backgroundColor: "#ff7f50", color: "white" }}
          onClick={openModalB}
        >
          US Contacts
        </Button>
        <Button variant="outline-secondary" onClick={closeModal}>
          Close
        </Button>

        {/* Checkbox for filtering even contacts */}
        <Form.Check
          className="mt-2 mb-2"
          type="checkbox"
          id="onlyEvenCheckbox"
          label="Only even"
          checked={onlyEven}
          onChange={() => handleCheckboxChange(filteredContacts)}
        />

        {/* Search input for filtering contacts */}
        <FormControl
          type="text"
          placeholder="Search..."
          onChange={handleSearchChange}
        />

        {/* List of contacts */}
        <ul>
          {filteredContacts.length > 0 ? (
            filteredContacts.map((contact) => (
              <li key={contact.id} onClick={() => openModalC(contact)}>
                {contact.phone}
              </li>
            ))
          ) : (
            <p>No data</p>
          )}
        </ul>

        {/* Button to load more contacts */}
        <Button variant="primary" onClick={loadMoreContacts}>
          Load More
        </Button>
      </Modal.Body>
    </Modal>
  );
};

export default ModalA;
