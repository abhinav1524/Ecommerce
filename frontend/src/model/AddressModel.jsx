import { useState, useEffect } from 'react';
import axios from 'axios';

const AddressModel = ({ isOpen, onClose, onSubmit, userData }) => {
    const [formData, setFormData] = useState({
        street: '',
        city: '',
        state: '',
        pincode: '',
        country: '',
    });

    useEffect(() => {
        // Populate form data if editing, or reset for a new address
        if (userData) {
            setFormData({
                street: userData.street || '',
                city: userData.city || '',
                state: userData.state || '',
                pincode: userData.pincode || '',
                country: userData.country || '',
            });
        } else {
            setFormData({
                street: '',
                city: '',
                state: '',
                pincode: '',
                country: '',
            });
        }
    }, [userData]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData); // Pass form data to the submit handler
    };

    if (!isOpen) return null;

    return (
       <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
    <div className="bg-white p-6 rounded shadow-lg mx-4 sm:mx-6 md:mx-10 w-full max-w-md sm:max-w-lg">
        <h2 className="text-lg sm:text-xl mb-4 text-center font-semibold">
            {userData ? 'Edit Address' : 'Add Address'}
        </h2>
        <form onSubmit={handleSubmit}>
            <div className="mb-4">
                <label htmlFor="street" className="block text-sm font-medium text-gray-700">
                    Street Address
                </label>
                <input
                    type="text"
                    id="street"
                    name="street"
                    value={formData.street}
                    onChange={handleChange}
                    className="border rounded p-2 w-full text-sm sm:text-base"
                />
            </div>
            <div className="mb-4">
                <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                    City
                </label>
                <input
                    type="text"
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className="border rounded p-2 w-full text-sm sm:text-base"
                />
            </div>
            <div className="mb-4">
                <label htmlFor="state" className="block text-sm font-medium text-gray-700">
                    State
                </label>
                <input
                    type="text"
                    id="state"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    className="border rounded p-2 w-full text-sm sm:text-base"
                />
            </div>
            <div className="mb-4">
                <label htmlFor="pincode" className="block text-sm font-medium text-gray-700">
                    Pincode
                </label>
                <input
                    type="text"
                    id="pincode"
                    name="pincode"
                    value={formData.pincode}
                    onChange={handleChange}
                    className="border rounded p-2 w-full text-sm sm:text-base"
                />
            </div>
            <div className="mb-4">
                <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                    Country
                </label>
                <input
                    type="text"
                    id="country"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    className="border rounded p-2 w-full text-sm sm:text-base"
                />
            </div>
            <div className="flex flex-col sm:flex-row justify-end items-center sm:items-start">
                <button
                    type="button"
                    onClick={onClose}
                    className="bg-gray-300 px-4 py-2 rounded mb-2 sm:mb-0 sm:mr-2 text-sm sm:text-base"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded text-sm sm:text-base"
                >
                    {userData ? 'Update' : 'Add'} Address
                </button>
            </div>
        </form>
    </div>
</div>
    );
}

export default AddressModel;
