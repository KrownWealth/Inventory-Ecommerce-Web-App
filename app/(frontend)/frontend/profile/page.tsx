import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/authOptions'
import { SignOut } from "@/views"


export default async function UserProfile() {
  const session = await getServerSession(authOptions);

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
            <p className="text-sm text-muted-foreground">Total Orders: 20</p>
          </div>
          <SignOut />
        </CardFooter>
      </Card>
      <Card className="w-full md:w-1/2 mx-auto mt-8">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">List of Orders</CardTitle>
        </CardHeader>
      </Card>
    </section>
  )
}