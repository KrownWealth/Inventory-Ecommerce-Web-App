import { NextResponse } from "next/server";
import { db } from "@/lib";

interface CartItemRequest {
  userId: string;
  productId: string;
  quantity: number;
}

interface DeleteRequest {
  itemId: number;
  userId: string;
}

export async function POST(req: Request) {
  try {
    const { userId, productId, quantity }: CartItemRequest = await req.json();
    if (!userId || !productId || quantity <= 0) {
      return NextResponse.json({ error: "All fields are required." }, { status: 400 });
    }

    const product = await db.product.findUnique({ where: { id: productId } });
    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }
    
    const itemPrice = product.sellingPrice ?? 0;
    const totalPrice = quantity * itemPrice;

    const existingCartItem = await db.cartItem.findFirst({
      where: { productId, userId },
    });

    if (existingCartItem) {
      await db.cartItem.update({
        where: { id: existingCartItem.id },
        data: {
          quantity: existingCartItem.quantity + quantity,
          totalPrice: (existingCartItem.quantity + quantity) * itemPrice,
        },
      });
    } else {
      await db.cartItem.create({
        data: { userId, productId, quantity, totalPrice },
      });
    }

    return NextResponse.json({ message: "Item added to cart" }, { status: 201 });
  } catch (error) {
    console.error("Error adding cart item:", error);
    return NextResponse.json({ error: "Failed to add cart item." }, { status: 500 });
  }
}


// Function to handle GET requests (Fetching cart items)
export async function GET(req: Request) {
  const userId = req.headers.get("user-id");

  if (!userId) {
    console.error("Invalid or missing user ID:", userId);
    return NextResponse.json({ error: "Valid User ID is required" }, { status: 400 });
  }

  try {
    const cartItems = await db.cartItem.findMany({
      where: { userId: userId },
      include: { product: true },
    });

    return cartItems.length > 0
      ? NextResponse.json(cartItems, { status: 200 })
      : NextResponse.json({ message: "No items in the cart" }, { status: 200 });
  } catch (error) {
    console.error("Error fetching cart items:", error);
    return NextResponse.json({ error: "Failed to fetch cart items." }, { status: 500 });
  }
}


// Function to handle DELETE requests (Removing items from cart)
export async function DELETE(req: Request) {
  try {
    const { itemId, userId }: DeleteRequest = await req.json();
    if (!itemId && !userId) {
      return NextResponse.json({ error: "Item ID or User ID is required" }, { status: 400 });
    }

    if (itemId) {
      await db.cartItem.delete({ where: { id: itemId } });
      return NextResponse.json({ message: "Item deleted successfully" }, { status: 200 });
    }

    if (userId) {
      await db.cartItem.deleteMany({ where: { userId } });
      return NextResponse.json({ message: "All items deleted successfully" }, { status: 200 });
    }
  } catch (error) {
    console.error("Error deleting cart items:", error);
    return NextResponse.json({ error: "Failed to delete cart items." }, { status: 500 });
  }
}


export async function PATCH(req: Request) {
  const { userId, productId, quantity }: CartItemRequest = await req.json();

  if (!userId || !productId || quantity == null) {
    return NextResponse.json(
      { error: "User ID, product ID, and quantity are required" },
      { status: 400 }
    );
  }

  try {
    const existingItem = await db.cartItem.findFirst({
      where: { userId, productId },
    });

    if (!existingItem) {
      return NextResponse.json({ error: "Item not found in the cart" }, { status: 404 });
    }

    const unitPrice = (existingItem.totalPrice ?? 0) / (existingItem.quantity || 1);
    const updatedItem = await db.cartItem.update({
      where: { id: existingItem.id },
      data: {
        quantity,
        totalPrice: quantity * unitPrice,
      },
    });

   return NextResponse.json({ message: "Cart item updated successfully", updatedItem }, { status: 200 });
  } catch (error) {
    console.error("Error updating cart item:", error);
    return NextResponse.json(
      { error: "An error occurred while updating the cart item." },
      { status: 500 }
    );
  }
}

export async function PUT(req: Request) {
  const cartItems: CartItemRequest[] = await req.json();
  if (!Array.isArray(cartItems) || cartItems.length === 0) {
    return NextResponse.json({ error: "Cart items array is required" }, { status: 400 });
  }

  try {
    const updatePromises = cartItems.map(async (item) => {

      const existingItem = await db.cartItem.findFirst({
        where: { userId: item.userId, productId: item.productId },
      });

      if (existingItem) {
        const unitPrice = existingItem.totalPrice ?? 0 / existingItem.quantity;
        return db.cartItem.update({
          where: { id: existingItem.id },
          data: {
            quantity: item.quantity,
            totalPrice: item.quantity * unitPrice,
          },
        });
      } if (!existingItem) {
  console.warn(`Item with productId ${item.productId} not found.`);
  return null; // Skip this item.
}

    });

    await Promise.all(updatePromises);
    return NextResponse.json({ message: "All items updated successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error updating all cart items:", error);
    return NextResponse.json({ error: "Failed to update all cart items." }, { status: 500 });
  }
}



