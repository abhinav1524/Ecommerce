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
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded shadow-lg w-1/3">
                <h2 className="text-xl mb-4">{userData ? 'Edit Address' : 'Add Address'}</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label>Street Address</label>
                        <input type="text" name="street" value={formData.street} onChange={handleChange} className="border rounded p-2 w-full"/>
                    </div>
                    <div className="mb-4">
                        <label>City</label>
                        <input type="text" name="city" value={formData.city} onChange={handleChange} className="border rounded p-2 w-full"/>
                    </div>
                    <div className="mb-4">
                        <label>State</label>
                        <input type="text" name="state" value={formData.state} onChange={handleChange} className="border rounded p-2 w-full"/>
                    </div>
                    <div className="mb-4">
                        <label>Pincode</label>
                        <input type="text" name="pincode" value={formData.pincode} onChange={handleChange} className="border rounded p-2 w-full"/>
                    </div>
                    <div className="mb-4">
                        <label>Country</label>
                        <input type="text" name="country" value={formData.country} onChange={handleChange} className="border rounded p-2 w-full"/>
                    </div>
                    <div className="flex justify-end">
                        <button type="button" onClick={onClose} className="bg-gray-300 px-4 py-2 rounded mr-2">
                            Cancel
                        </button>
                        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                            {userData ? 'Update' : 'Add'} Address
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AddressModel;
