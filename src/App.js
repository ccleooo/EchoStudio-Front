import { BrowserRouter, Routes, Route } from 'react-router-dom'
//引入頁面元件
import Home from './pages/Home/Home'
import About from './pages/About'
//News
import NewsDetail from './pages/News/NewsDetail'
import News from './pages/News/News'
//Product
import ProductLayout from './layout/Product/ProductLayout'
import Product from './pages/Product/Product'
import ProductDetail from './pages/Product/ProductDetail'
import Search from './pages/Product/Search'
// Activity
import Activity from './pages/Activity/Activity'
import AcProduct from './pages/Activity/AcProduct'
// Courses
import Courses from './pages/Courses/Courses'
import CourseDetail from './pages/Courses/CourseDetail'
// Rehearsal
import Rehearsal from './pages/Rehearsal/Rehearsal'
import RehearsalDetail from './pages/Rehearsal/RehearsalDetail'
// Faq
import Faq from './pages/Faq'
// Cart
import Cart from './pages/Cart/Cart'
import Checkout from './pages/Cart/Checkout'
import Success from './pages/Cart/Success'
// Notfound
import Notfound from './pages/Notfound'

//巢式使用-------------------------------
// User
import UserLayout from './layout/User/UserLayout'
import OrderLayout from './layout/User/OrderLayout'
import ProfileLayout from './layout/User/ProfileLayout'
import QuesionLayout from './layout/User/QuesionLayout'
import User from './pages/User/User'
import Profile from './pages/User/Profile'
import Edit from './pages/User/Edit'
import Order from './pages/User/Order'
import OrderDetail from './pages/User/OrderDetail'
import OrderComment from './pages/User/OrderComment'
import MyCourse from './pages/User/MyCourse'
import Resever from './pages/User/Resever'
import Favorite from './pages/User/Favorite'
import FavoriteCourse from './pages/User/FavoriteCourse'
import Coupon from './pages/User/Coupon'
import Quesion from './pages/User/Quesion'
import QuesionDetail from './pages/User/QuesionDetail'

// Login
import LoginLayout from './layout/Login/LoginLayout'
import Login from './pages/Login/Login'
import Register from './pages/Login/Register'
import ForgotPassword from './pages/Login/ForgotPassword'
import Teacher from './pages/Login/Teacher'
import UpdatePassword from './pages/Login/UpdatePassword'

//引入排版用文件
import Footer from './layout/Footer/Footer'
import HomeNavbar from './layout/HomeNavbar'
import { CartProvider } from './utils/useCart'
import { SecondCartProvider } from './utils/useSecondCart'
import { FilterProvider } from './utils/productFilter'
import { AuthProvider } from './hooks/useAuth'

function App() {
  return (
    <AuthProvider>
      <FilterProvider>
        <SecondCartProvider localStorageKey="secondCart">
          <CartProvider>
            <BrowserRouter>
              {/* 所有頁面統一選單(導覽列) */}

              <HomeNavbar />
              <Routes>
                {/* 這裡加上index與`path="/"` 同意思  */}
                <Route index element={<Home />} />
                {/* 巢式 */}

                {/* User */}
                <Route path="user" element={<UserLayout />}>
                  <Route index element={<User />} />
                  {/* User/profile */}
                  <Route path="profile" element={<ProfileLayout />}>
                    <Route index element={<Profile />} />
                    <Route path="edit" element={<Edit />} />
                  </Route>
                  {/* User/order */}
                  <Route path="/user/order" element={<OrderLayout />}>
                    <Route index element={<Order />} />
                    <Route
                      path="orderDetail/:ordersID"
                      element={<OrderDetail />}
                    />
                    <Route
                      path="orderDetail/:ordersID/OrderComment"
                      element={<OrderComment />}
                    />
                  </Route>

                  <Route path="/user/mycourse" element={<MyCourse />} />
                  <Route path="resever" element={<Resever />} />
                  <Route path="favorite" element={<Favorite />} />
                  <Route path="favorite-course" element={<FavoriteCourse />} />
                  <Route path="/usercoupon" element={<Coupon />} />

                  <Route path="quesion" element={<QuesionLayout />}>
                    <Route index element={<Quesion />} />
                    <Route path="quesiondetail" element={<QuesionDetail />} />
                  </Route>
                </Route>

                {/* Login */}
                <Route path="login" element={<LoginLayout />}>
                  <Route index element={<Login />} />
                  <Route path="login" element={<Login />} />
                  <Route path="register" element={<Register />} />
                </Route>
                <Route
                  path="login/forgotpassword"
                  element={<ForgotPassword />}
                />
                <Route
                  path="login/updatepassword"
                  element={<UpdatePassword />}
                />
                <Route path="login/teacher" element={<Teacher />} />

                {/* news */}
                <Route path="news" element={<News />} />
                <Route path="news/:itemID" element={<NewsDetail />} />
                <Route path="about" element={<About />} />

                {/* Product */}
                <Route path="product" element={<ProductLayout />}>
                  <Route index element={<Product />} />
                  <Route path="search" element={<Search />} />
                </Route>
                <Route
                  path="product/productdetail/:productId"
                  element={<ProductDetail />}
                />

                {/* Activity */}
                <Route path="activity" element={<Activity />} />
                <Route
                  path="activity/acproduct/:activityProductID"
                  element={<AcProduct />}
                />

                {/* Courses */}
                <Route path=":currentPage" element={<Courses />} />
                <Route
                  path="coursedetail/:courseId"
                  element={<CourseDetail />}
                />

                {/* Rehearsal */}
                <Route path="rehearsal" element={<Rehearsal />} />
                <Route
                  path="rehearsal/rehearsaldetail/:rehearsalId"
                  element={<RehearsalDetail />}
                />

                {/* Cart */}
                <Route path="cart" element={<Cart />} />
                <Route path="cart/Checkout" element={<Checkout />} />
                <Route path="cart/success" element={<Success />} />

                <Route path="faq" element={<Faq />} />

                <Route path="*" element={<Notfound />} />
              </Routes>
              {/* End: 這裡的頁面元件會切換 */}
              {/* 所有頁面統一頁尾 */}
              <Footer />
            </BrowserRouter>
          </CartProvider>
        </SecondCartProvider>
      </FilterProvider>
    </AuthProvider>
  )
}

export default App
