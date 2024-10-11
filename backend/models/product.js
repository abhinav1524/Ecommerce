const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    brand: { type: String, required: true },
    category: { type: String, required: true },
    stock: { type: Number, required: true },
    images: [{ type: String }],
    ratings: { type: Number, default: 0 },
    reviews: [{
      user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      comment: String,
      rating: Number,
    }],
    createdAt: { type: Date, default: Date.now },
  });
  
  module.exports = mongoose.model('Product', productSchema);
  