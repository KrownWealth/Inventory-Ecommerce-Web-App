import RootLayout from "./layout";
import { CustomerMap, DashBoardCard, SalesBarCharts, SalesCategoryDoughnut, InputSearch, DatePickerWithRange, PageHead } from "@/components/custom-ui/reuseables";
import { IoMdBasket } from "react-icons/io";
import { ImUsers, ImPriceTags } from "react-icons/im";
import { PiShoppingCartFill } from "react-icons/pi";
import { IoMdTrendingUp } from "react-icons/io";
import Link from "next/link";

const AdminHome = () => {
  const dashBoardContent = [
    { title: 'Total Customers', totalCustomers: '3000', percentage: "2", icon: <ImUsers className="h-4 w-4" />, trend: <IoMdTrendingUp /> },
    { title: 'Total Products', totalProducts: '500', percentage: "1.5", icon: <IoMdBasket className="h-4 w-4" />, trend: <IoMdTrendingUp /> },
    { title: 'Total Revenue', totalRevenue: '15000', percentage: "3", icon: <ImPriceTags className="h-4 w-4" />, trend: <IoMdTrendingUp /> },
    { title: 'Total Orders', totalOrders: '1200', percentage: "2.2", icon: <PiShoppingCartFill className="h-4 w-4" />, trend: <IoMdTrendingUp /> },
  ];

  return (
    <>
      <header className="flex h-[75px] pt-4 items-center justify-between border-b bg-muted/40 px-4 lg:px-6">
        <Link href="#" className="lg:hidden" prefetch={false}>
          <span className="sr-only">Home</span>
        </Link>
        <PageHead pageTitle="Dashboard" />
        <DatePickerWithRange />
      </header>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-4">
        {dashBoardContent.map((content, index) => (
          <DashBoardCard
            key={index}
            cardTitle={content.title}
            totalCustomers={content.totalCustomers}
            totalProducts={content.totalProducts}
            totalRevenue={content.totalRevenue}
            totalOrders={content.totalOrders}
            percentageAmount={content.percentage}
            icon={content.icon}
            updownTrend={content.trend}
          />
        ))}
      </div>
      <div className="mb-4"><SalesBarCharts /></div>
      <div className='grid grid-cols-2 gap-4 mb-4 '>

        <SalesCategoryDoughnut />
        <CustomerMap />

      </div>
    </>

  );
};

export default AdminHome;