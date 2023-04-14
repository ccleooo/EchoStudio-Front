import {
  FaFacebook,
  FaYoutube,
  FaTwitter,
  FaInstagram,
  FaDiscord,
} from 'react-icons/fa'
import Follow from '../../images/follow.png'
import logo1 from '../../images/lava.png'
import logo2 from '../../images/alesis.png'
import logo3 from '../../images/casio.png'

function ProductDemo() {
  return (
    <>
      <div className="col-lg-4 col-md-6 left_rwd padding_left">
        <div className="title">
          <p className="text_end second_color">
            Brand
            <span>代理品牌</span>
          </p>
        </div>
        <div className="follow_logo">
          <div className="img_wrap">
            <img src={logo1} className="img-fluid" alt="logo1" />
          </div>
          <div className="img_wrap">
            <img src={logo2} className="img-fluid img_size" alt="logo2" />
          </div>
          <div className="img_wrap">
            <img src={logo3} className="img-fluid img_size" alt="logo3" />
          </div>
        </div>
      </div>
      <div className="col-lg-4 col-12 middle__rwd">
        <img src={Follow} className="img-fluid" alt="Follow" />
      </div>
      <div className="col-lg-4 col-md-6 right_rwd padding_right">
        <div className="title second_color">
          <p className="text_start">Follow Us</p>
        </div>
        <div className="icon_wrap">
          <a href="/">
            <FaFacebook className="follow_icon margin" />
          </a>
          <a href="/">
            <FaYoutube className="follow_icon" />
          </a>
          <a href="/">
            <FaTwitter className="follow_icon" />
          </a>
          <a href="/">
            <FaInstagram className="follow_icon" />
          </a>
          <a href="/">
            <FaDiscord className="follow_icon" />
          </a>
        </div>
      </div>
    </>
  )
}

export default ProductDemo
