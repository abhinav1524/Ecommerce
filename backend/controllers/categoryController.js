const Category =require('../models/category');
exports.getAllCategories=async(req,res)=>{
    try {
        const category=await Category.find();
        res.json(category);
        
    } catch (error) {
        console.error('Error fetching category:', error);
        res.status(500).json({ message: 'Server error' });
    }
}

exports.createCategory=async(req,res)=>{
    try {
        // console.log(req.body);
        const {name}=req.body;
        if (!name) {
            return res.status(400).json({ message: 'Name field is required' });
        }
        const category=new Category({
            name,
        })
        const saveCategory=await category.save();
        res.status(200).json({ category: saveCategory});
    } catch (error) {
        res.status(500).json({ message: `Server error ${error}` });
    }
}

exports.getCategoryDetials=async(req,res)=>{
     try {
        const {id}=req.params;
        const category=await Category.findById(id);
        if(!category){
            res.status(404).json({message:"No category found"});
        }
        res.status(200).json(category);
     } catch (error) {
        res.status(500).json({ message: 'Error fetching category details', error });
     }
}

exports.updateCategory=async(req,res)=>{
    try {
        const {id}=req.params;
        const category=await Category.findById(id);
        if(!category){
            res.status(404).json({message:"No category found"});
        }
        if (!category) {
            return res.status(400).json({ message: 'Category field is required' });
        }
        category.name = req.body.name;
        await category.save();
        res.status(200).json({ message: 'Category updated successfully' });
    } catch (error) {
        console.error('Error updating category:', error);
        res.status(500).json({ message: 'Server error' });
    }
}

exports.deleteCategory=async(req,res)=>{
    const {id}=req.params;
    try {
        const category = Category.findById(id);
        if(!category){
            res.status(404).json({message:"No category found"});
        }
        await Category.findByIdAndDelete(id)
        res.status(200).json({message:"Category deleted successfully"});
    } catch (error) {
        console.error('Error deleting category:', error);
        res.status(500).json({ message: 'Server error' });
    }
}