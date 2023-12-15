import React, { useState, useEffect } from "react";
import ModalA from "./ModalA";
import ModalB from "./ModalB";
import ModalC from "./ModalC";
const Problem2 = () => {
  // State variables
  const [modalAVisible, setModalAVisible] = useState(false);
  const [modalBVisible, setModalBVisible] = useState(false);
  const [modalCVisible, setModalCVisible] = useState(false);
  const [contacts, setContacts] = useState([]);
  const [usContacts, setUsContacts] = useState([]);
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [onlyEven, setOnlyEven] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentUSPage, setCurrentUSPage] = useState(1);
  const [sDate, setCData] = useState(null);
  // Fetch initial contacts data on component mount
  useEffect(() => {
    // Fetch all contacts
    fetchContacts();

    // Fetch US contacts
    fetchUsContacts();
  }, []);

  // Fetch all contacts
  const fetchContacts = async () => {
    try {
      const response = await fetch(
        "https://contact.mediusware.com/api/contacts/?page=1",
        {
          headers: {
            Origin: "http://localhost:3000",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch contacts. Status: ${response.status}`);
      }

      const data = await response.json();
      setContacts(data.results);
      setFilteredContacts(data.results);
    } catch (error) {
      console.error("Error fetching contacts:", error);
    }
  };
  // Fetch US contacts
  const fetchUsContacts = async () => {
    try {
      const response = await fetch(
        `https://contact.mediusware.com/api/country-contacts/United%20States/?page=1`
      );
      const data = await response.json();
      setUsContacts(data.results);
    } catch (error) {
      console.error("Error fetching US contacts:", error);
    }
  };

  // Load more contacts when scrolling (Infinity Scroll) for all contacts
  const loadMoreContacts = async () => {
    try {
      const nextPage = currentPage + 1;
      const response = await fetch(
        `https://contact.mediusware.com/api/contacts/?page=${nextPage}`
      );
      const data = await response.json();
      setCurrentPage(nextPage);
      setFilteredContacts((prevFilteredContacts) => [
        ...prevFilteredContacts,
        ...data.results,
      ]);
    } catch (error) {
      console.error("Error loading more contacts:", error);
    }
  };
  // Load more US contacts when scrolling (Infinity Scroll) for US contacts
  const loadMoreUSContacts = async () => {
    try {
      //   console.log("hello");
      const nextPage = currentUSPage + 1;
      const response = await fetch(
        `https://contact.mediusware.com/api/country-contacts/United%20States/?page=${nextPage}`
      );
      const data = await response.json();
      setCurrentUSPage(nextPage);
      setUsContacts((prevContacts) => [...prevContacts, ...data.results]);
    } catch (error) {
      console.error("Error loading more contacts:", error);
    }
  };
  // Open Modal A
  const openModalA = () => {
    setModalAVisible(true);
    setModalBVisible(false);
    setModalCVisible(false);
  };
  // Open Modal B
  const openModalB = () => {
    setModalAVisible(false);
    setModalBVisible(true);
    setModalCVisible(false);
  };
  // Open Modal C with selected contact data
  const openModalC = (data) => {
    setModalAVisible(false);
    setModalBVisible(false);
    setModalCVisible(true);
    setCData(data);
  };
  // Close all modals
  const closeModal = () => {
    setModalAVisible(false);
    setModalBVisible(false);
    setModalCVisible(false);
  };

  // Handle checkbox change for filtering contacts
  const handleCheckboxChange = () => {
    setOnlyEven((prevOnlyEven) => !prevOnlyEven);
    filterContacts(!onlyEven);
  };

  // Filter contacts based on checkbox and search term
  const filterContacts = (even) => {
    const filtered = even
      ? contacts.filter((contact) => contact.id % 2 === 0)
      : contacts;
    setFilteredContacts(filtered);
    setUsContacts(filtered);
  };
  // Handle search change for all contacts
  const handleSearchChange = async (event) => {
    const searchTerm = event.target.value.toLowerCase();
    setTimeout(async () => {
      try {
        const response = await fetch(
          `https://contact.mediusware.com/api/contacts/?page=${currentPage}&search=${searchTerm}`
        );

        if (!response.ok) {
          throw new Error(
            `Failed to fetch contacts. Status: ${response.status}`
          );
        }

        const data = await response.json();
        setContacts(data.results);
        setFilteredContacts(data.results);
        setCurrentPage(currentPage + 1);
      } catch (error) {
        console.error("Error fetching contacts:", error);
      }
    }, 300);
  };
  // Handle search change for US contacts
  const handleUSSearchChange = async (event) => {
    const searchTerm = event.target.value.toLowerCase();
    setTimeout(async () => {
      try {
        const response = await fetch(
          `https://contact.mediusware.com/api/country-contacts/United%20States/?search=${searchTerm}&page=${currentUSPage}`
        );
        if (searchTerm) {
          const data = await response.json();
          setUsContacts(data.results);
          setCurrentUSPage(currentUSPage + 1);
        } else {
          setUsContacts(contacts);
          setCurrentUSPage(currentUSPage + 1);
        }
      } catch (error) {
        console.error("Error fetching US contacts:", error);
      }
    }, 300);
  };

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <h4 className="text-center text-uppercase mb-5">Problem-2</h4>

        <div className="d-flex justify-content-center gap-3">
          <button
            className="btn btn-lg btn-outline-primary"
            type="button"
            style={{ backgroundColor: "#461391", color: "white" }}
            onClick={openModalA}
          >
            All Contacts
          </button>
          <button
            className="btn btn-lg btn-outline-warning"
            type="button"
            style={{ backgroundColor: "#ff7f50", color: "white" }}
            onClick={openModalB}
          >
            US Contacts
          </button>
        </div>
      </div>

      {/* Modal A */}
      {modalAVisible && (
        <ModalA
          openModalA={openModalA}
          openModalB={openModalB}
          closeModal={closeModal}
          onlyEven={onlyEven}
          handleCheckboxChange={handleCheckboxChange}
          handleSearchChange={handleSearchChange}
          filteredContacts={filteredContacts}
          loadMoreContacts={loadMoreContacts}
          openModalC={openModalC}
        />
      )}

      {/* Modal B */}
      {modalBVisible && (
        <ModalB
          openModalA={openModalA}
          openModalB={openModalB}
          closeModal={closeModal}
          onlyEven={onlyEven}
          handleCheckboxChange={handleCheckboxChange}
          handleSearchChange={handleUSSearchChange}
          usContacts={usContacts}
          loadMoreContacts={loadMoreUSContacts}
          openModalC={openModalC}
        />
      )}

      {/* Modal C */}
      {modalCVisible && (
        <ModalC closeModal={closeModal} selectedContact={sDate} />
      )}
    </div>
  );
};
export default Problem2;
