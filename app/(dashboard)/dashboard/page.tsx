import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { db } from "@/lib";
import { CustomerMapDoughnut, DashBoardCard, SalesBarCharts, SalesHistoryLineChart, PageHead } from "@/components/custom-ui/reuseables";
import { IoMdBasket } from "react-icons/io";
import { ImUsers, ImPriceTags } from "react-icons/im";
import { PiShoppingCartFill } from "react-icons/pi";
import { IoMdTrendingUp } from "react-icons/io";



const calculatePercentageChange = (current: number, previous: number) => {
  if (previous === 0) return 100;
  return ((current - previous) / previous) * 100;
};

const AdminHome = async () => {

  const totalOrders = await db.order.count();
  const totalCustomers = await db.user.count({
    where: {
      role: {
        not: 'ADMIN',
      },
    },
  });
  const totalProduct = await db.product.count();
  const totalRevenue = await db.order.aggregate({
    _sum: { totalPrice: true },
  });


  const initialOrders = 0;
  const initialRevenue = 0;

  // Calculate percentage changes
  const ordersPercentage = calculatePercentageChange(totalOrders, initialOrders);
  const revenuePercentage = calculatePercentageChange(totalRevenue._sum.totalPrice || 0, initialRevenue);

  const session = await getServerSession(authOptions);

  const dashBoardContent = [
    {
      title: "Total Customers",
      totalCustomers: totalCustomers.toString(),
      icon: <ImUsers data-testid="mock-icon" className="h-4 w-4" />,
    },
    {
      title: "Total Products",
      totalProducts: totalProduct.toString(),
      icon: <IoMdBasket data-testid="mock-icon" className="h-4 w-4" />,
    },
    {
      title: "Total Orders",
      total: totalOrders.toString(),
      percentage: ordersPercentage.toFixed(2),
      icon: <PiShoppingCartFill data-testid="mock-icon" className="h-4 w-4" />,
      trend: <IoMdTrendingUp data-testid="mock-trend-icon" />,
    },
    {
      title: "Total Revenue",
      total: ((totalRevenue._sum.totalPrice || 0) / 100).toFixed(2),
      percentage: revenuePercentage.toFixed(2),
      icon: <ImPriceTags data-testid="mock-icon" className="h-4 w-4" />,
      trend: <IoMdTrendingUp data-testid="mock-trend-icon" />,
    }
  ];

  return (
    <>
      <header className="flex h-[75px] pt-4 items-center justify-between border-b bg-muted/40 px-4 lg:px-8">
        <PageHead pageTitle="Dashboard" />
        <p>Welcome {session?.user.username}</p>
      </header>
      <div className="flex flex-col space-y-4 px-4 lg:px-8 py-4">
        <div className="flex flex-col md:flex-row gap-4">
          {dashBoardContent.map((content, index) => (
            <DashBoardCard
              key={index}
              cardTitle={content.title}
              total={content.total}
              totalCustomers={content.totalCustomers}
              totalProducts={content.totalProducts}
              percentage={content.percentage}
              icon={content.icon}
              updownTrend={content.trend}
            />
          ))}
        </div>
        <div className="mb-4">
          <SalesBarCharts />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <SalesHistoryLineChart />

          <CustomerMapDoughnut />

        </div>
      </div>
    </>
  );
};

export default AdminHome;
