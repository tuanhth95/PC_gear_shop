import HomePage from "../pages/HomePage/HomePage";
import CartPage from "../pages/CartPage/CartPage";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage";
import SignIn from "../pages/Sign-in/SignIn";
import Register from "../pages/Register/Register";
import Review from "../pages/Review/Review";
import CategoryPage from "../pages/CategoryPage/CategoryPage";
import ProductDetailPage from "../pages/ProductDetailPage/ProductDetailPage";
import ForgotPassword from "../pages/ForgotPassword/ForgotPassword";

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
    isShowHeader: false,
  },
  {
    path: "/Register",
    page: Register,
    isShowHeader: false,
  },
  {
    path: "/ForgotPassword",
    page: ForgotPassword,
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
];
