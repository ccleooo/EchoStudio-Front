import { Link } from 'react-router-dom'
import '../../styles/header/headerTwo.scss'
import {
  FaFireAlt,
  FaRegCommentDots,
  FaSearch,
  FaRegHeart,
  FaSignOutAlt,
  FaUserAlt,
} from 'react-icons/fa'
import CartIcon from './CartIcon'
import axios from 'axios'
import { useAuth } from '../../hooks/useAuth'

function HeaderTwo(props) {
  const { auth } = useAuth()
  // console.log('9999999999', auth.isAuth)

  async function handleLogout() {
    await axios.get('http://localhost:3001/api/auth/logout', {
      withCredentials: true,
    })
    // navigate('/login')
  }

  return (
    <>
      <header className="border-bottom">
        <div className="container ">
          <div className="header_top">
            {/* header_left */}
            <div className="header_left">
              <input className="search_line border-bottom" />
              <a className=" main_color" href="#2">
                <FaSearch className="search_icon main_color" />
              </a>
            </div>
            {/* header_right */}
            <div className="header_right">
              {/* user */}
              {auth.isAuth ? (
                <Link
                  to="/user"
                  className="nav-link main_color link border main_color header_login_text mx-2"
                >
                  <FaUserAlt className="header_right_icons" />
                </Link>
              ) : null}
              {/* 登出 */}
              {auth.isAuth ? (
                <a
                  href="http://localhost:3000/login"
                  className="nav-link main_color link border main_color header_login_text mx-2"
                  aria-current="page"
                  onClick={handleLogout}
                >
                  <FaSignOutAlt className="header_right_icons" />
                </a>
              ) : (
                <Link
                  to="login"
                  className="nav-link main_color link border main_color header_login_text"
                  aria-current="page"
                >
                  login / register
                </Link>
              )}
              {/* cart */}
              {auth.isAuth ? (
                <Link to="/cart" className="btn header_btn_cart">
                  <CartIcon className="header_cart" />
                </Link>
              ) : (
                <Link to="/login" className="btn header_btn_cart">
                  <CartIcon />
                </Link>
              )}
            </div>
            {/* 登入後 display:block */}
            <div className="hearder_right_block">
              <div className="header_right_login main_color">
                <div className="header_user_img"></div>
                <button className="btn header_right_icons_btn">
                  <FaRegCommentDots className="header_right_icons" />
                </button>
                <button className="btn header_right_icons_btn">
                  <FaRegHeart className="header_right_icons" />
                </button>

                <p className="four_color">4</p>
              </div>
            </div>
          </div>
          <div className="text_line ">
            <FaFireAlt className="fire_icon" />
            <p className="text_fire ">Alctron yamaha 吉他 爵士鼓</p>
          </div>
          <div className="logo">
            <h2 className="main_color">
              <span className="text-white">ECHO</span>&nbsp;STUDIO
            </h2>
          </div>
          <nav className="navbar navbar-expand-md main_color">
            <div
              className="collapse navbar-collapse list"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav mb-lg-0 list-unstyled">
                <li className="nav-item fw-bold">
                  <Link
                    to="/"
                    className="nav-link main_color link"
                    aria-current="page"
                  >
                    Home
                  </Link>
                </li>
                <li className="nav-item fw-bold">
                  <Link to="about" className="nav-link main_color link">
                    About
                  </Link>
                </li>
                <li className="nav-item fw-bold ">
                  <Link to="activity" className="nav-link main_color link">
                    Activity
                  </Link>
                </li>
                <li className="nav-item fw-bold ">
                  <Link to="product" className="nav-link main_color link">
                    Product
                  </Link>
                </li>
                <li className="nav-item fw-bold">
                  <Link to="courses" className="nav-link main_color link">
                    Courses
                  </Link>
                </li>
                <li className="nav-item fw-bold">
                  <Link to="rehearsal" className="nav-link main_color link">
                    Rehearsal
                  </Link>
                </li>
                <li className="nav-item fw-bold">
                  <Link to="news" className="nav-link main_color link">
                    News
                  </Link>
                </li>
                <li className="nav-item fw-bold">
                  <Link to="Faq" className="nav-link main_color link">
                    Q&A
                  </Link>
                </li>
              </ul>
            </div>
          </nav>
        </div>
      </header>
    </>
  )
}

export default HeaderTwo
