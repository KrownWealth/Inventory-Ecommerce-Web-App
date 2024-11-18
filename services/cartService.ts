export const getCartItemsForUser = async (userId: string) => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/cart`, {
        method: "GET",
        headers: { "user-id": String(userId) },
    });
    if (!response.ok) {
      throw new Error('Failed to fetch cart items');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching cart items:', error);
    return [];
  }
};
