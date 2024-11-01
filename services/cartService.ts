export const getCartItemsForUser = async (userId: number) => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/cart`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'user-id': String(userId), 
      },
    });
    if (!response.ok) {
      throw new Error('Failed to fetch cart items');
    }
    const data = await response.json();
    console.log("User Cart item in service", data); 
    return data;
  } catch (error) {
    console.error('Error fetching cart items:', error);
    return [];
  }
};
