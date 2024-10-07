import InputSearch from "./Search/searchBar";
import SideBarNav from "./Navigation/sideBar";
import UserProfile from "./Profile/userProfileDropdown";
import { BreadcrumbWithCustomSeparator } from "./Navigation/breadCrumb";
import ProductPageHead from "./Headings/productPageHead";
import ModalManager from "./Modals/handleModalOpenClose";
import PageHead from "./Headings/PageHeading";
import PriceFormulaModal from "./Modals/salesPriceFormula";
import CustomerTable from "./Admin/customersTable";
import OrderStatusBtn from "./Buttons/orderStatusBtn";
import OrdersTable from "./Admin/ordersTable";
import { DatePickerWithRange } from "./DateRange/dateRangePicker";
import UserAvatar from "./Profile/userAvatar";
import DashBoardCard from "./Cards/dashBoardCard";
import SalesBarCharts from "./Admin/salesBarCharts";
import SalesCategoryDoughnut from "./Admin/salesCategoryouhnutCharts";
import CustomerMap from "./Admin/customerMapLineChart";
import ProductTableTwo from "./Admin/productTableTwo";
import { ProductCardSkeleton } from "./Skeleton/productTableSkeleton";
import ProductsPagination from "./Pagination/productPagination";


import SignupWithGoogle from "./Authentication/google0Auth";

import LanguagSelect from "./Localization/languagesSelect";
import {Quote} from "./Authentication/quote";
import { LogoOnAuth } from "./Navigation/logoOnAuth";
import { WelcomeText } from "./Headings/welcomeText";

import { UserAvatarDropdown } from "./Navigation/avatarDropdown";
import { ProductCard } from "./Cards/ProductCard";
import UserSearch from "./Search/userSearchBar";
import AddCategoryModal from "./Modals/addCategoryModal";
import CategoryTable from "./Admin/categoryTable";



export { InputSearch, SideBarNav, UserProfile, BreadcrumbWithCustomSeparator, 
  ProductPageHead, ModalManager, PageHead, PriceFormulaModal, CustomerTable,
OrderStatusBtn, DatePickerWithRange, UserAvatar, DashBoardCard, SalesBarCharts, SalesCategoryDoughnut,
CustomerMap, ProductTableTwo, ProductCardSkeleton, ProductsPagination, OrdersTable,  LanguagSelect, CategoryTable,
SignupWithGoogle, Quote, LogoOnAuth, WelcomeText, UserAvatarDropdown, ProductCard, UserSearch, AddCategoryModal }