"use client";

import React, { useState } from "react";

type Address = {
  id: number;
  label: string;
  name: string;
  street: string;
  city: string;
  postalCode: string;
  country: string;
  phone: string;
};

export default function AddressBookPage() {
  const [addresses, setAddresses] = useState<Address[]>([
    {
      id: 1,
      label: "Home",
      name: "John Doe",
      street: "123 Main St",
      city: "Colombo",
      postalCode: "00100",
      country: "Sri Lanka",
      phone: "+94 77 123 4567",
    },
  ]);

  const [newAddress, setNewAddress] = useState<Omit<Address, "id">>({
    label: "",
    name: "",
    street: "",
    city: "",
    postalCode: "",
    country: "",
    phone: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewAddress({ ...newAddress, [e.target.name]: e.target.value });
  };

  const handleAddAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !newAddress.label ||
      !newAddress.name ||
      !newAddress.street ||
      !newAddress.city
    ) {
      alert("Please fill at least label, name, street, and city.");
      return;
    }
    const id = addresses.length ? addresses[addresses.length - 1].id + 1 : 1;
    setAddresses([...addresses, { id, ...newAddress }]);
    setNewAddress({
      label: "",
      name: "",
      street: "",
      city: "",
      postalCode: "",
      country: "",
      phone: "",
    });
  };

  return (
    <div className="bg-white rounded-lg shadow p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-semibold mb-6">Address Book</h1>

      {/* Existing Addresses */}
      <div className="mb-8 space-y-4">
        {addresses.map((addr) => (
          <div
            key={addr.id}
            className="border border-gray-300 rounded p-4 flex justify-between items-center"
          >
            <div>
              <p className="font-semibold">{addr.label}</p>
              <p>{addr.name}</p>
              <p>
                {addr.street}, {addr.city} {addr.postalCode}
              </p>
              <p>{addr.country}</p>
              <p>{addr.phone}</p>
            </div>
            {/* You can add Edit/Delete buttons here */}
          </div>
        ))}
        {addresses.length === 0 && (
          <p className="text-gray-500 italic">No saved addresses.</p>
        )}
      </div>

      {/* Add New Address Form */}
      <form onSubmit={handleAddAddress} className="space-y-4">
        <h2 className="text-xl font-semibold">Add New Address</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="label"
            placeholder="Label (e.g. Home, Office)"
            className="border border-gray-300 rounded p-2"
            value={newAddress.label}
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            name="name"
            placeholder="Recipient Name"
            className="border border-gray-300 rounded p-2"
            value={newAddress.name}
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            name="street"
            placeholder="Street Address"
            className="border border-gray-300 rounded p-2"
            value={newAddress.street}
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            name="city"
            placeholder="City"
            className="border border-gray-300 rounded p-2"
            value={newAddress.city}
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            name="postalCode"
            placeholder="Postal Code"
            className="border border-gray-300 rounded p-2"
            value={newAddress.postalCode}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="country"
            placeholder="Country"
            className="border border-gray-300 rounded p-2"
            value={newAddress.country}
            onChange={handleInputChange}
          />
          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            className="border border-gray-300 rounded p-2"
            value={newAddress.phone}
            onChange={handleInputChange}
          />
        </div>

        <button
          type="submit"
          className="bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700"
        >
          Add Address
        </button>
      </form>
    </div>
  );
}
