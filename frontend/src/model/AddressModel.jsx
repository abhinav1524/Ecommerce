import React from 'react'

const AddressModel = ({ isOpen, onClose, onAddressChange, addressToEdit }) => {

    // getting the address //
    const [formData, setFormData] = useState({
        addressLine1: '',
        addressLine2: '',
        city: '',
        state: '',
        zipCode: '',
        country: '',
    });
    useEffect(() => {
        if (addressToEdit) {
            setFormData({
                addressLine1: addressToEdit.addressLine1,
                addressLine2: addressToEdit.addressLine2,
                city: addressToEdit.city,
                state: addressToEdit.state,
                zipCode: addressToEdit.zipCode,
                country: addressToEdit.country,
            });
        } else {
            setFormData({
                addressLine1: '',
                addressLine2: '',
                city: '',
                state: '',
                zipCode: '',
                country: '',
            });
        }
    }, [addressToEdit]);
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = addressToEdit
                ? await axios.patch(`/api/shipping-addresses/${addressToEdit._id}`, formData)
                : await axios.post('/api/shipping-addresses', formData);
            onAddressChange(response.data);
            onClose();
        } catch (error) {
            console.error('Error saving address', error);
        }
    };

    if (!isOpen) return null;

  return (
    <>
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded shadow-lg w-1/3">
                <h2 className="text-xl mb-4">{addressToEdit ? 'Edit Address' : 'Add Address'}</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block mb-2" htmlFor="name">Street Address</label>
                        <input
                            type="text"
                            name="street"
                            value={formData.street}
                            onChange={handleChange}
                            className="border border-gray-300 rounded p-2 w-full"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-2" htmlFor="email">City</label>
                        <input
                            type="text"
                            name="city"
                            value={formData.city}
                            onChange={handleChange}
                            className="border border-gray-300 rounded p-2 w-full"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-2" htmlFor="street">Street</label>
                        <input
                            type="text"
                            name="state"
                            value={formData.state}
                            onChange={handleChange}
                            className="border border-gray-300 rounded p-2 w-full"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-2" htmlFor="pincode">Pincode</label>
                        <input
                            type="text"
                            name="pincode"
                            value={formData.pincode}
                            onChange={handleChange}
                            className="border border-gray-300 rounded p-2 w-full"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-2" htmlFor="country">Country</label>
                        <input
                            type="text"
                            name="country"
                            value={formData.country}
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
    </>
  )
}

export default AddressModel