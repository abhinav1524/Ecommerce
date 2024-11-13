const ShippingAddress = require("../models/ShippingAddress");

// getting the shipping addresses //
exports.getShippingAddress = async (req, res) => {
  // console.log("Incoming request headers:", req.headers);
  // console.log("User in request:", req.user);
  try {
    const shippingAddresses = await ShippingAddress.find({
      user: req.user._id,
    });
    res.status(200).json(shippingAddresses);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching shipping addresses", error });
  }
};
// adding the shipping address //
exports.addShippingAddress = async (req, res) => {
  const { street, city,state, pincode, country } = req.body;

  try {
    const newAddress = new ShippingAddress({
      user: req.user._id,  // Get the authenticated user's ID
      street,
      city,
      state,
      pincode,
      country,
    });

    await newAddress.save();
    res
      .status(201)
      .json({ message: "Shipping address added", address: newAddress });
  } catch (error) {
    // console.log(error);
    res.status(500).json({ message: "Failed to add shipping address", error });
  }
};

// edit the shipping address //
exports.editShippingAddress = async (req, res) => {
  try {
    const shippingAddress = await ShippingAddress.findById(req.params.id);
    if (!shippingAddress) {
      return res.status(404).json({ message: "Shipping address not found" });
    }
    res.status(200).json(shippingAddress);
  } catch (error) {
    res.status(500).json({ message: "Error fetching shipping address", error });
  }
};

// updating the shipping address //
exports.updateShippingAddress = async (req, res) => {
  try {
    const shippingAddress = await ShippingAddress.findById(req.params.id);
    if (!shippingAddress) {
      return res.status(404).json({ message: "Shipping address not found" });
    }

    // Update the fields
    shippingAddress.street = req.body.street;
    shippingAddress.city = req.body.city;
    shippingAddress.state = req.body.state;
    shippingAddress.pincode = req.body.pincode;
    shippingAddress.country = req.body.country;

    await shippingAddress.save();
    res
      .status(200)
      .json({
        message: "Shipping address updated successfully",
        shippingAddress,
      });
  } catch (error) {
    res.status(500).json({ message: "Error updating shipping address", error });
  }
};

// deleting the shipping address //
exports.deleteShippingAddress = async (req, res) => {
  try {
    const shippingAddress = await ShippingAddress.findById(req.params.id);
    if (!shippingAddress) {
      return res.status(404).json({ message: "Shipping address not found" });
    }
    await ShippingAddress.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Shipping address deleted successfully" });
  } catch (error) {
    // console.log(error);
    res.status(500).json({ message: "Error deleting shipping address", error });
  }
};
