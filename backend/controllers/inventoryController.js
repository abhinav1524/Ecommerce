// controllers/inventoryController.js

const Inventory = require('../models/inventory');

// Create new inventory item
const getAllInventories =async(req,res)=>{
     try {
        const inventories= await Inventory.find();
        res.status(200).json(inventories);

     } catch (error) {
        // console.log(error);
        res.status(500).json({ message: 'Error whiel fetching inventory', error });
     }
}
const createInventory = async (req, res) => {
    try {
        const { product, quantity } = req.body;

        const inventory = new Inventory({
            product,
            quantity
        });

        await inventory.save();
        res.status(201).json({ message: 'Inventory created', inventory });
    } catch (error) {
        res.status(500).json({ message: 'Error creating inventory', error });
    }
};

// Get inventory by product
const getSingleInventory = async (req, res) => {
    try {
        const inventory = await Inventory.findOne({ product: req.params.productId }).populate('product');

        if (!inventory) {
            return res.status(404).json({ message: 'Inventory not found' });
        }

        res.status(200).json(inventory);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching inventory', error });
    }
};

// Update inventory quantity
const updateInventory = async (req, res) => {
    try {
        const { quantity } = req.body;
        const inventory = await Inventory.findOne({ product: req.params.productId });

        if (!inventory) {
            return res.status(404).json({ message: 'Inventory not found' });
        }

        inventory.quantity = quantity;
        inventory.lastUpdated = Date.now();

        await inventory.save();
        res.status(200).json({ message: 'Inventory updated', inventory });
    } catch (error) {
        res.status(500).json({ message: 'Error updating inventory', error });
    }
};

// Delete inventory item
const deleteInventory = async (req, res) => {
    try {
        const inventory = await Inventory.findOneAndDelete({ product: req.params.productId });

        if (!inventory) {
            return res.status(404).json({ message: 'Inventory not found' });
        }

        res.status(200).json({ message: 'Inventory deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting inventory', error });
    }
};

module.exports = {
    getAllInventories,
    createInventory,
    getSingleInventory,
    updateInventory,
    deleteInventory
};
