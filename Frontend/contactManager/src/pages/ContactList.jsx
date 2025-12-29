import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import ContactTable from "../Components/ContactTable";

const ContactList = () => {
  const [contacts, setContacts] = useState([]);

  const fetchContacts = async () => {
    try {
      const res = await fetch("http://localhost:3000/contacts");
      const data = await res.json();
      setContacts(data);
    } catch (err) {
      console.error("Error fetching contacts:", err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this contact?")) return;
    try {
      await fetch(`http://localhost:3000/contacts/${id}`, { method: "DELETE" });
      fetchContacts();
    } catch (err) {
      console.error("Error deleting contact:", err);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="max-w-5xl mx-auto p-6">
      <ContactTable contacts={contacts} onDelete={handleDelete} onUpdate={fetchContacts} />

      </div>
    </div>
  );
};

export default ContactList;
