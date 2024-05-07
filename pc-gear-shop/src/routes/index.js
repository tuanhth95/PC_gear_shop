import HomePage from "../pages/HomePage/HomePage";
import CartPage from "../pages/CartPage/CartPage";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage";
import SignIn from "../pages/Sign-in/SignIn";
import Register from "../pages/Register/Register";
import CategoryPage from "../pages/CategoryPage/CategoryPage";
import ProductDetailPage from "../pages/ProductDetailPage/ProductDetailPage";
import UserPage from '../pages/UserPage/UserPage';
import SearchResult from '../pages/SearchResult/SearchResult'
import ForgotPassword from '../pages/ForgotPassword/ForgotPassword'
import AdminPage from '../pages/AdminPage/AdminPage'

export const routes = [
  {
    path: "/",
    page: HomePage,
    isShowHeader: true,
  },
  {
    path: "/cart",
    page: CartPage,
    isShowHeader: true,
  },
  {
    path: "*",
    page: NotFoundPage,
    isShowHeader: false,
  },
  {
    path: "/SignIn",
    page: SignIn,
  },
  {
    path: "/Register",
    page: Register,
  },
  {
    path: "/Category",
    page: CategoryPage,
  },
  {
    path: "/ProductDetail/:id",
    page: ProductDetailPage,
    isShowHeader: true,
  },
  {
    path: "/UserPage",
    page: UserPage,
  },
  {
    path: '/ForgotPassword',
    page: ForgotPassword
  },
  {
    path: '/search-results',
    page: SearchResult,
    isShowHeader: true,
  },
  {
    path: '/system/admin',
    page: AdminPage,
    isShowHeader: true,
  },
];
