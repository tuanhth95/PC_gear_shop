import HomePage from "../pages/HomePage/HomePage";
import CartPage from "../pages/CartPage/CartPage";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage";
import SignIn from "../pages/Sign-in/SignIn";
import Register from "../pages/Register/Register";
import Review from "../pages/Review/Review";
import CategoryPage from "../pages/CategoryPage/CategoryPage";
import ProductDetailPage from "../pages/ProductDetailPage/ProductDetailPage";
import UserInfor from '../pages/UserInfor/UserInfor';
import OrderHis from '../pages/OrderHis/OrderHis';
import OrderDetail from '../pages/OrderDetail/OrderDetail';
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
    path: "/Review",
    page: Review,
  },
  {
    path: "/Category",
    page: CategoryPage,
  },
  {
    path: "/ProductDetail",
    page: ProductDetailPage,
  },
  {
    path: "/UserInfor",
    page: UserInfor,
  },
  {
    path: "/OrderHis",
    page: OrderHis,
  },
  {
    path: "/OrderDetail",
    page: OrderDetail,
  },
];
