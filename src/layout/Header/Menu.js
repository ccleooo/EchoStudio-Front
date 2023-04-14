import '../../styles/header/menu.scss'
import {
  FaMusic,
  FaCaretRight,
  FaCompactDisc,
  FaFacebook,
  FaYoutube,
  FaDiscord,
  FaTwitter,
  FaInstagram,
  FaTimes,
  FaSignInAlt,
} from 'react-icons/fa'

function Menu(props) {
  return (
    <>
      <section className="menu">
        <div className="menu_content">
          <div className="rwd_list">
            <ul className="list-unstyled text-black">
              <li className="menu_list">
                <a href="#123">Home</a>
              </li>
              <li className="menu_list">
                <a href="#123">About</a>
              </li>
              <li className="menu_list">
                <a href="#123">Course</a>
              </li>
              <li className="menu_list">
                <a href="#123">Rehearsal</a>
              </li>
              <li className="menu_list">
                <a href="#123">News</a>
              </li>
              <li className="menu_list">
                <a href="#123">Q&A</a>
              </li>
            </ul>
          </div>
          <div className="menu_logo">
            <h1 className="main_color menu_logo_text">
              <span className="text-white">ECHO</span>&nbsp;STUDIO
            </h1>
            <p className="logo_bottom">Music Change Your Life</p>
          </div>
          <a href="999" className="activity">
            <FaMusic className="music_icon" />
            <h4 className="items_text">ACTIVITY</h4>
          </a>
          <div className="items">
            <FaMusic className="music_icon" />
            <h4 className="items_text">PRODUCT</h4>
          </div>
          <div className="category">
            <ul className="list-unstyled">
              <li className="category_list">
                <a className="category_link" href="#555">
                  <span>烏克麗麗</span>
                  <FaCaretRight className=" category_arrow_icon" />
                </a>
              </li>
              <li className="category_list">
                <a className="category_link" href="#555">
                  <span>木吉他</span>
                  <FaCaretRight className=" category_arrow_icon" />
                </a>
              </li>
              <li className="category_list">
                <a className="category_link" href="#555">
                  貝斯
                </a>
              </li>
              <li className="category_list">
                <a className="category_link" href="#555">
                  電子琴
                </a>
              </li>
              <li className="category_list">
                <a className="category_link" href="#555">
                  木箱鼓
                </a>
              </li>
              <li className="category_list">
                <a className="category_link" href="#555">
                  爵士鼓
                </a>
              </li>
              <li className="category_list">
                <a className="category_link" href="#555">
                  麥克風
                </a>
              </li>
              <li className="category_list">
                <a className="category_link" href="#555">
                  耳機
                </a>
              </li>
              <li className="category_list">
                <a className="category_link" href="#555">
                  Pick
                </a>
              </li>
              <li className="category_list">
                <a className="category_link" href="#555">
                  音響設備
                </a>
              </li>
              <li className="category_list">
                <a className="category_link" href="#555">
                  <span>清潔保養</span>
                  <FaCaretRight className=" category_list" />
                </a>
              </li>
            </ul>
          </div>
          <div className="items">
            <FaCompactDisc className="music_icon" />
            <h4 className="items_text">TEACHERS</h4>
          </div>
          <div className="rwd_teacher">
            <div className="rwd_teacher_list">
              <div className="rwd_teacher_img">
                <div className="rwd_img"></div>
              </div>
              <div className="rwd_teacher_info">
                <h3 className="rwd_teacher_name">Selena Gomez</h3>
                <p className="rwd_text">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
                  vulputate libero et velit interdum, ac.
                </p>
              </div>
            </div>
            <div className="rwd_teacher_list">
              <div className="rwd_teacher_img">
                <div className="rwd_img"></div>
              </div>
              <div className="rwd_teacher_info">
                <h3 className="rwd_teacher_name">Cat Meow</h3>
                <p className="rwd_text">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
                  vulputate libero et velit interdum, ac.
                </p>
              </div>
            </div>
            <div className="rwd_teacher_list">
              <div className="rwd_teacher_img">
                <div className="rwd_img"></div>
              </div>
              <div className="rwd_teacher_info">
                <h3 className="rwd_teacher_name">Jazz Music</h3>
                <p className="rwd_text">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
                  vulputate libero et velit interdum, ac.
                </p>
              </div>
            </div>
          </div>
          <div className="menu_follow main_color">
            <p className="follow_text border-bottom">Follow Us</p>
            <div className="follow_icons">
              <a className="main_color" href="666">
                <FaFacebook />
              </a>
              <a className="main_color" href="666">
                <FaYoutube />
              </a>
              <a className="main_color" href="666">
                <FaTwitter />
              </a>
              <a className="main_color" href="666">
                <FaInstagram />
              </a>
              <a className="main_color" href="666">
                <FaDiscord />
              </a>
            </div>
          </div>
          <div className="menu_footer">
            <FaSignInAlt className="text-white sing_icon" />
            <p>login / register</p>
          </div>
        </div>

        <div className="xmark_icon main_color">
          <FaTimes className=" FaTimes_icon" />
        </div>
      </section>
    </>
  )
}

export default Menu
