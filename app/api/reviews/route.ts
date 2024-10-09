import clientPromise from "@/lib/mongodb";
import { z } from "zod";

// Zod schema for a review
const ReviewSchema = z.object({
  productId: z.string(),
  userId: z.string(),
  rating: z.number().min(1).max(5),
  review: z.string().min(5),
});

export async function POST(req: Request) {
  const body = await req.json();
  const client = await clientPromise;
  const db = client.db();

  // Validate the request body
  const validationResult = ReviewSchema.safeParse(body);
  if (!validationResult.success) {
    const errorMessages = validationResult.error.errors.map((err) => ({
      path: err.path.join("."),
      message: err.message,
    }));
    return new Response(JSON.stringify({ error: errorMessages }), { status: 400 });
  }

  const { productId, userId, rating, review } = validationResult.data;

  try {
    // Insert the review into the MongoDB collection
    const result = await db.collection("reviews").insertOne({
      productId,
      userId,
      rating,
      review,
      createdAt: new Date(),
    });

    return new Response(JSON.stringify(result), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify({ message: "Error creating review", error }), { status: 500 });
  }
}

// getting reviews

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const productId = searchParams.get("productId");

  if (!productId) {
    return new Response(JSON.stringify({ message: "Product ID is required" }), { status: 400 });
  }

  const client = await clientPromise;
  const db = client.db();

  try {
    // Fetch the reviews for the specified product from MongoDB
    const reviews = await db.collection("reviews").find({ productId }).toArray();
    return new Response(JSON.stringify(reviews), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ message: "Error fetching reviews", error }), { status: 500 });
  }
}
