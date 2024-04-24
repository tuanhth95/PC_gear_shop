import HomePage from '../pages/HomePage/HomePage';
import CartPage from '../pages/CartPage/CartPage';
import NotFoundPage from '../pages/NotFoundPage/NotFoundPage';

export const routes =[
  {
    path:'/',
    page: HomePage,
    isShowHeader: true,
  },
  {
    path:'/cart',
    page: CartPage,
    isShowHeader: true,
  },
  {
    path:'*',
    page: NotFoundPage,
    isShowHeader: false,
  },
]