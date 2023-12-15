// Import necessary components from React Bootstrap
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

// Modal component for displaying contact details
const ModalC = ({ closeModal, selectedContact }) => {
  return (
    // Bootstrap Modal component
    <Modal show={true} onHide={closeModal}>
      {/* Modal Header */}
      <Modal.Header closeButton>
        <Modal.Title>Contact Details</Modal.Title>
      </Modal.Header>

      {/* Modal Body */}
      <Modal.Body>
        {/* Display contact details based on selectedContact */}
        <h2>Name: {selectedContact?.country.name}</h2>
        <p>Phone Number: {selectedContact?.phone}</p>
        {/* Add more details as needed */}
      </Modal.Body>

      {/* Modal Footer */}
      <Modal.Footer>
        {/* Button to close the modal */}
        <Button variant="secondary" onClick={closeModal}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalC;
