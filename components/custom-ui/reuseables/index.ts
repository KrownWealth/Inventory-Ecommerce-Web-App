import InputSearch from "./Search/searchBar";
import SideBarNav from "./Navigation/sideBar";
import ProductPageHead from "./Headings/productPageHead";
import ModalManager from "./Modals/handleModalOpenClose";
import PageHead from "./Headings/PageHeading";
import CustomerTable from "./Admin/customersTable";
import OrdersTable from "./Admin/ordersTable";
import { DatePickerWithRange } from "./DateRange/dateRangePicker";
import DashBoardCard from "./Cards/dashBoardCard";
import SalesBarCharts from "./Admin/salesBarCharts";
import CustomerMapDoughnut from "./Admin/salesCategoryouhnutCharts";
import SalesHistoryLineChart from "./Admin/customerMapLineChart";
import ProductTableTwo from "./Admin/productTable";
import { ProductCardSkeleton } from "./Skeleton/productTableSkeleton";
import ProductsPagination from "./Pagination/productPagination";

import { DataCard } from "./Admin/dataCard";
import SignupWithGoogle from "./Authentication/google0Auth";
import { Quote } from "./Authentication/quote";
import { LogoOnAuth } from "./Navigation/logoOnAuth";



import { ProductCard } from "./Cards/ProductCard";
import UserSearch from "./Search/userSearchBar";
import AddCategoryModal from "./Modals/addCategoryModal";
import CategoryTable from "./Admin/categoryTable";

import { DetailedProductCard } from "./Cards/DetailProductCard";
import ShopBtn from "./Buttons/shopBtn";
import ViewOrderBtn from "./Buttons/viewOrderBtn";
import GoBackBtn from "./Buttons/goBack";
import DropdownButton from "./Buttons/dropDownBtn";

import CartItemCard from "./Cards/CartItemCard";
import { StarRating } from "./Rating/starRating";
import CheckoutButton from "./Buttons/checkoutBtn";


// skeleton

import CartItemSkeleton from "./Skeleton/cartItemSkeleton";
import DetailedProductSkeleton from "./Skeleton/detailProductSkleton";

//Loader
import ColorRingAuthLoader from "./Loader/colorRingAuthLoader";
import ThreeDotsLoader from "./Loader/threeDotLoader";


export {
  InputSearch,
  SideBarNav,
  ProductPageHead,
  ModalManager,
  PageHead,
  CustomerTable,
  DatePickerWithRange,
  DashBoardCard,
  SalesBarCharts,
 CustomerMapDoughnut,
 SalesHistoryLineChart,
  ProductTableTwo,
  ProductCardSkeleton,
  ProductsPagination,
  OrdersTable,
  CategoryTable,
  SignupWithGoogle,
  Quote,
  LogoOnAuth,
  ProductCard,
  UserSearch,
  AddCategoryModal,
  DetailedProductCard,
  ShopBtn,
  CartItemCard,
  StarRating,
  CheckoutButton,
  CartItemSkeleton,
  ViewOrderBtn,
  GoBackBtn,
  DataCard,
  DropdownButton,
  DetailedProductSkeleton,

  ColorRingAuthLoader,
  ThreeDotsLoader
}