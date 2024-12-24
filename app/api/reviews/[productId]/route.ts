import connectMongoDb from '@/lib/mongodb';
import Review from '@/models/reviewModel';
import { NextRequest, NextResponse } from 'next/server';


export async function GET(request: NextRequest, { params }: { params: { productId: string } }) {
  const { productId } = params;

  try {
    await connectMongoDb();
    const review = await Review.findOne({ productId });

    if (!review) {
      return NextResponse.json({ success: false, message: 'No reviews found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: review }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest, { params }: { params: { productId: string } }) {
  const { productId } = params;
  await connectMongoDb();

  try {
    const { userId, username, rating, comment } = await request.json();
    let review = await Review.findOne({ productId });

    if (!review) {
      review = new Review({
        productId,
        reviews: [{ userId, username, rating, comment }],
        ratings: rating,
      });
    } else {
      review.reviews.push({ userId, username, rating, comment });
      const totalRatings = review.reviews.reduce((sum: number, r: {rating: number}) => sum + r.rating, 0);
      review.ratings = totalRatings / review.reviews.length;
    }

    await review.save();
    return NextResponse.json({ success: true, data: review }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}


export async function PATCH(request: NextRequest, { params }: { params: { productId: string } }) {
  const { productId } = params;
  await connectMongoDb();

  const { userId, newUserId } = await request.json();

  try {
    const review = await Review.findOne({ productId, 'reviews.userId': userId });

    if (!review) {
      return NextResponse.json({ success: false, message: 'Review or userId not found' }, { status: 404 });
    }

    // Update the userId in the reviews array
     const updatedReviews = review.reviews.map((r: { userId: string; username: string, rating: number; comment: string; createdAt: Date; updatedAt?: Date }) => {
  if (r.userId === userId) {
    return { ...r, userId: newUserId, updatedAt: new Date() }; 
  }
  return r; 
});


    review.reviews = updatedReviews;
    await review.save();

    return NextResponse.json({ success: true, data: review }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
