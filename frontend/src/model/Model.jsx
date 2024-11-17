// Modal.js
import {useState} from 'react';

const Modal = ({ isOpen, onClose, onSubmit, userData }) => {
    if (!isOpen) return null;

    const [formData, setFormData] =useState(userData);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await onSubmit(formData); // Call the submit handler with the form data
        onClose(); // Close the modal
    };

    return (
<div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
    <div className="bg-white p-6 rounded shadow-lg w-full max-w-md mx-4">
        <h2 className="text-xl mb-4">Edit Profile</h2>
        <form onSubmit={handleSubmit}>
            <div className="mb-4">
                <label className="block mb-2" htmlFor="name">Name</label>
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="border border-gray-300 rounded p-2 w-full"
                />
            </div>
            <div className="mb-4">
                <label className="block mb-2" htmlFor="email">Email</label>
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="border border-gray-300 rounded p-2 w-full"
                />
            </div>
            <div className="mb-4">
                <label className="block mb-2" htmlFor="phoneNumber">Phone No</label>
                <input
                    type="number"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    className="border border-gray-300 rounded p-2 w-full"
                />
            </div>
            <div className="mb-4">
                <label className="block mb-2" htmlFor="address">Address</label>
                <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className="border border-gray-300 rounded p-2 w-full"
                />
            </div>
            <div className="flex justify-end">
                <button type="button" onClick={onClose} className="bg-gray-300 text-black rounded px-4 py-2 mr-2">
                    Cancel
                </button>
                <button type="submit" className="bg-blue-500 text-white rounded px-4 py-2">
                    Update
                </button>
            </div>
        </form>
    </div>
</div>
    );
};

export default Modal;
