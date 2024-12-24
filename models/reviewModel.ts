import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
  productId: { type: String, required: true },
  reviews: [
    {
      userId: { type: String, required: true },
      username: {type: String, required: true},
      rating: { type: Number, required: true },
      comment: { type: String, required: true },
      createdAt: { type: Date, default: Date.now },
      updatedAt: { type: Date },
    }
  ],
  ratings: { type: Number, default: 0 },
});

const Review = mongoose.models.Review || mongoose.model('Review', reviewSchema);

export default Review;
