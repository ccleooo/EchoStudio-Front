import { ReactComponent as CartIcon } from '../../images/svg/cart.svg'
import '../../styles/footer/footer.scss'
import {
  FaRegClock,
  FaRegEnvelope,
  FaHome,
  FaUserCircle,
  FaRegHeart,
  FaChevronUp,
} from 'react-icons/fa'

function Footer(props) {
  return (
    <>
      <footer className="bg-black border-top footer_computer">
        <div className="container">
          <div className="content row">
            <div className="footer_left col-lg-4 col-md-6">
              <p className="small_title">聯絡方式</p>
              <div className="footer_title">
                <h2>Echo Studio</h2>
                <p>
                  <FaRegEnvelope className="fa-regular fa-envelope footer_icon" />
                </p>
              </div>
              <div className="main_color">
                <p className="email">echo.studio@audio.com</p>
                <p className="number">Tel : (03) 1234-567</p>
                <p className="chinese_text">桃園市中壢區新生路二段421號</p>
                <p className="address">
                  No.421, Sec. 2, Sinsheng Rd., Jhongli Dist., Taoyuan City
                  320319, Taiwan (R.O.C.)
                </p>
              </div>
            </div>
            <div className="footer_middle col-lg-4 col-md-6">
              <p className="small_title">營業時間</p>
              <div className="footer_title">
                <h2>Opening</h2>
                <p>
                  <FaRegClock className=" footer_icon" />
                </p>
              </div>
              <div className="main_color">
                <p className="chinese_text">星期一 ~ 星期六</p>
                <p className="number">9:00 ~ 22:00</p>
                <p className="sunday chinese_text">星期日 固定店休</p>
              </div>
            </div>
            <div className="footer_right col-lg-4 col-md-12">
              <div>
                <h1 className="large_logo main_color">
                  <span className="text-white">ECHO</span>&nbsp;STUDIO
                </h1>
                <p className="right_text">Music Change Your Life</p>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* RWD */}
      <footer className="bg-black rwd_footer border-top fixed-bottom">
        <div className="container">
          <div className="rwd_content main_color">
            <button className="icons_btn">
              <FaHome className="icons" />
              <p className="icon_text">Home</p>
            </button>
            <button className="icons_btn">
              <CartIcon className="footer_cart_icon" />
              <div className="count text-center">0</div>
              <p className="icon_text">Cart</p>
            </button>
            {/* <button className="icons_btn">
              <FaUserCircle className="user" />
              <p className="icon_text">User</p>
            </button> */}
            {/* user_login */}
            {/* <button className="footer_user_btn">
              <div className="user_login_img">
                <img src={UserImage} className="img-fluid" alt="user" />
              </div>
            </button> */}
            {/* user_login */}

            <button className="icons_btn">
              <div className="user_login">
                <FaUserCircle className="icons" />
              </div>
              <p className="icon_text">User</p>
            </button>
            <button className="icons_btn">
              <FaRegHeart className="icons footer_heart_icon" />
              <p className="icon_text">Collect</p>
            </button>
            <button className="icons_btn">
              <FaChevronUp className="icons" />
              <p className="icon_text footer_text_totop">Top</p>
            </button>
          </div>
        </div>
      </footer>
    </>
  )
}

export default Footer
