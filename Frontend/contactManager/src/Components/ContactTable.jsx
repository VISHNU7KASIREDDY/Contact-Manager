import React, { useState } from "react";
import { Pencil, Trash2, X } from "lucide-react";
import { API_URL } from "../config";

const ContactTable = ({ contacts, onDelete, onUpdate }) => {
  const [editingContact, setEditingContact] = useState(null);
  const [form, setForm] = useState({ name: "", email: "", phone: "" });

  const openEditModal = (contact) => {
    setEditingContact(contact);
    setForm({ name: contact.name, email: contact.email, phone: contact.phone });
  };

  const closeEditModal = () => {
    setEditingContact(null);
    setForm({ name: "", email: "", phone: "" });
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    try {
      const res = await fetch(`${API_URL}/contacts/${editingContact.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const msg = await res.text();
        throw new Error(msg);
      }

      closeEditModal();
      onUpdate(); // refresh list
    } catch (err) {
      console.error("Update failed:", err);
      alert("Error updating contact");
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md mt-8">
      <h2 className="text-2xl font-semibold mb-4">All Contacts</h2>

      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b text-gray-500">
            <th className="py-2">NAME</th>
            <th>EMAIL</th>
            <th>PHONE</th>
            <th>ACTIONS</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((c) => (
            <tr key={c.id} className="border-b hover:bg-gray-50">
              <td className="py-2">{c.name}</td>
              <td>{c.email}</td>
              <td>{c.phone}</td>
              <td className="flex space-x-2">
                <button
                  className="text-blue-500 hover:text-blue-700"
                  onClick={() => openEditModal(c)}
                >
                  <Pencil size={16} />
                </button>
                <button
                  className="text-red-500 hover:text-red-700"
                  onClick={() => onDelete(c.id)}
                >
                  <Trash2 size={16} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>


      {editingContact && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 w-[400px] relative shadow-lg">
            <button
              onClick={closeEditModal}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
            >
              <X size={18} />
            </button>

            <h3 className="text-xl font-semibold mb-4">Edit Contact</h3>
            <div className="space-y-3">
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Name"
                className="w-full border p-2 rounded"
              />
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Email"
                className="w-full border p-2 rounded"
              />
              <input
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="Phone"
                className="w-full border p-2 rounded"
              />
              <div className="flex justify-end space-x-2">
                <button
                  onClick={closeEditModal}
                  className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  onClick={handleUpdate}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactTable;
