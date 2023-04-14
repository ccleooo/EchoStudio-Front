import { FaArrowRight } from 'react-icons/fa'
import ProImage1 from '../../images/product_01.png'
import ProImage2 from '../../images/product_02.png'
import ProImage3 from '../../images/product_03.png'
import ProImage4 from '../../images/product_04.png'
import { Link } from 'react-router-dom'

function ProductDemo() {
  return (
    <>
      <div className="col-md-6 ind_product_wrap">
        <img src={ProImage1} className="img-fluid" alt="ProImage1" />
        <Link to="/product">
          <div className="flex_end">
            <div className="text_box">
              <p className="second_color">吉他</p>
              <h2 className="main_color">Guitar</h2>
            </div>
            <FaArrowRight className="arrow_icon main_color" />
          </div>
        </Link>
      </div>
      <div className="col-md-6 ind_product_wrap">
        <img src={ProImage2} className="img-fluid" alt="ProImage2" />
        <Link to="/product">
          <div className="flex_end">
            <div className="text_box">
              <p className="second_color">爵士鼓</p>
              <h2 className="main_color">Drum Set</h2>
            </div>
            <FaArrowRight className="arrow_icon main_color" />
          </div>
        </Link>
      </div>
      <div className="col-md-6 ind_product_wrap margin0 rwd_margin">
        <img src={ProImage3} className="img-fluid" alt="ProImage3" />
        <Link to="/product">
          <div className="flex_end">
            <div className="text_box">
              <p className="second_color">電子琴</p>
              <h2 className="main_color">Electronic Piano</h2>
            </div>
            <FaArrowRight className="arrow_icon main_color" />
          </div>
        </Link>
      </div>
      <div className="col-md-6 ind_product_wrap margin0">
        <img src={ProImage4} className="img-fluid" alt="ProImage4" />
        <Link to="/product">
          <div className="flex_end">
            <div className="text_box">
              <p className="second_color">音響設備</p>
              <h2 className="main_color">Audio Equipment</h2>
            </div>
            <FaArrowRight className="arrow_icon main_color" />
          </div>
        </Link>
      </div>
    </>
  )
}

export default ProductDemo
