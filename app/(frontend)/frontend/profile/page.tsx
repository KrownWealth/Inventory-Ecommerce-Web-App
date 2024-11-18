import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';
import { SignOut } from "@/views";
import { db } from "@/lib";

export default async function UserProfile() {
  const session = await getServerSession(authOptions);
  const userId = session?.user.id;

  const userOrders = userId
    ? await db.order.findMany({
      where: { userId },
      include: {
        orderItems: {
          include: {
            product: true, // Ensure you have product details if needed
          },
        },
      },
    })
    : [];

  return (
    <section className="container mx-auto p-4 items-center justify-center">
      <Card className=" w-full md:w-1/2 mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">User Profile</CardTitle>
        </CardHeader>
        <CardContent>
          <p>{session?.user.username}</p>
          <p>{session?.user.email}</p>
        </CardContent>
        <CardFooter className="flex justify-between items-center">
          <div>
            <p className="text-sm text-muted-foreground">Total Orders: {userOrders.length}</p>
          </div>
          <SignOut />
        </CardFooter>
      </Card>
      <Card className="w-full md:w-1/2 mx-auto mt-8">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">List of Orders</CardTitle>
        </CardHeader>
        <CardContent>
          {userOrders.length > 0 ? (
            userOrders.map((order, index) => (
              <div key={order.id}>
                <p>Order #{index + 1} - Status: {order.status}</p>
                <ul>
                  {order.orderItems.map(item => (
                    <li key={item.id}>
                      Product: {item.product.name}, Quantity: {item.quantity}
                    </li>
                  ))}
                </ul>
              </div>
            ))
          ) : (
            <p>No orders found</p>
          )}
        </CardContent>
      </Card>
    </section>
  );
}
