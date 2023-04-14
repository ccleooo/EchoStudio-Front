import { Link } from 'react-router-dom'
import '../../styles/User/sidebar.scss'

function Sidebar() {
  return (
    <div className="sidenav_content col-md-2">
      <ul className="navbar-nav ">
        <li>
          <Link to="/user" className=" main_color link">
            會員主頁
          </Link>
        </li>
        <li>
          <Link to="profile" className=" main_color link">
            基本資料
          </Link>
        </li>
        <li>
          <Link to="order" className=" main_color link">
            訂單查詢
          </Link>
        </li>
        <li>
          <Link to="myCourse" className=" main_color link">
            我的課程
          </Link>
        </li>
        <li>
          <Link to="resever" className=" main_color link">
            教室預約
          </Link>
        </li>
        <li>
          <Link to="coupon" className=" main_color link">
            我的優惠券
          </Link>
        </li>
        <li>
          <Link to="favorite" className=" main_color link">
            我的收藏
          </Link>
        </li>
        <li>
          <Link to="quesion" className=" main_color link">
            我要詢問
          </Link>
        </li>
      </ul>
    </div>
  )
}

export default Sidebar
