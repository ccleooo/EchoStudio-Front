import '../../styles/Activity/activity.scss'
import { FaTools, FaGift, FaTruckMoving } from 'react-icons/fa'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import * as React from 'react'
import OwlCarousel from 'react-owl-carousel'
import 'owl.carousel/dist/assets/owl.carousel.css'
import 'owl.carousel/dist/assets/owl.theme.default.css'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import { Toast } from '@douyinfe/semi-ui'

function ProductActivity(props) {
  //Owl Carousel Settings
  const options = {
    loop: true,
    items: 4,
    margin: 20,
    nav: true,
    slideSpeed: 4000,
    paginationSpeed: 1000,
    dot: false,
  }
  let navigate = useNavigate()
  const [AcProduct, setAcProduct] = useState([])
  const { activityProductID } = useParams([])
  const { auth } = useAuth()
  const [ActivityCoupon, setActivityCoupon] = useState({
    user_id: auth.user.id,
  })
  useEffect(() => {
    // console.log('活動商品全部')
    // 在component初始化的時後跑一次
    // 通常會把去跟後端要資料的動作放這裡
    async function getAcProduct() {
      let response = await axios.get(`http://localhost:3001/acproduct`)
      setAcProduct(response.data)
    }
    getAcProduct()
  }, [activityProductID])

  async function handleSubmit(e) {
    // console.log('handleSubmit')
    // 關閉表單的預設行為
    e.preventDefault()

    let response = await axios.post(
      'http://localhost:3001/ActivityCoupon',
      ActivityCoupon
    )
    Toast.success(response.data.msg)
  }
  return (
    <>
      <section className="banner_activity">
        <div className="banner_activity_main text-white">
          <p className="banner_activity_main_text1">ECHO 餘音會員日</p>
          <p className="banner_activity_main_text2">繚繞您的每個時節</p>
          <p className="banner_activity_main_text3">
            即日起至01/31 官方會員獨享超值優惠
          </p>
        </div>
      </section>
      <section className="from_hight">
        <div className="activity_table" id="tab">
          <ul className="activity_menu list-unstyled">
            <li>
              <a className="active_user" role="button" href="#active_user">
                查看會員獨家優惠
              </a>
            </li>
            <li>
              <a
                className="active_product"
                role="button"
                href="#active_product"
              >
                查看限量餘音價
              </a>
            </li>
          </ul>
        </div>
        <div className="active_user_bg"></div>
        <div className="active_user_body text-white">
          <div className="active_user_body_text" id="active_user">
            <p className="active_user_body_text_spence">官網會員獨家優惠</p>
            <p className="active_user_body_text_three">
              以下三項優惠, 會員可合併使用
            </p>
          </div>
          <div className="active_user_body_card">
            <div className="active_card1">
              <div className="active_card1_bg" role="button">
                <div className="active_card1_round_left" />
                <div className="active_card1_main_txt">
                  <p className="active_card1_2">2</p>
                  <p className="active_card1_OFF">
                    % OFF
                    <br />
                    會員折扣
                  </p>
                </div>

                <div className="active_card1_round_rigth" />
              </div>
              <div className="active_card1_text">
                <p className="active_card1_text_echo">ECHO會員限定價</p>
                <p className="active_card1_text_register">
                  簡單註冊, 未來訂單皆享折扣
                </p>
              </div>
            </div>
            <div className="active_card2">
              <div
                className="active_card2_bg"
                role="button"
                type="submit"
                onClick={handleSubmit}
              >
                <div className="coming_soon">
                  <p className="coming_soon_text">點我領取</p>
                </div>
                <div className="coming_soon2"></div>
                <div className="active_card2_round_left" />

                <div className="active_card2_main_txt">
                  <p className="active_card2_88">9</p>
                  <p className="active_card2_one">
                    折<br />
                    限定優惠
                  </p>
                </div>
                <div className="active_card2_round_rigth" />
              </div>

              {/* ---------------------------- */}
              <div className="active_card2_text">
                <p className="active_card2_text_brt">會員日限定折扣</p>
                <p className="active_card2_text_twoproduct">
                  全館任選2樣產品即享88折
                </p>
              </div>
            </div>
            <div className="active_card3">
              <div className="active_card3_bg" role="button">
                <div className="active_card3_round_left" />
                <div className="active_card3_main_txt">
                  <p className="active_card3_5">5</p>
                  <p className="active_card3_OFF">
                    % OFF
                    <br />
                    歡迎禮金
                  </p>
                </div>

                <div className="active_card3_round_rigth" />
              </div>
              <div className="active_card3_text">
                <p className="active_card3_text_echo">新會員歡迎禮</p>
                <p className="active_card3_text_register">
                  活動期間內註冊會員
                  <br />
                  即享95折優惠序號
                </p>
              </div>
            </div>
          </div>

          <p className="active_user_body_more_benefits_text">
            官網會員獨家優惠
          </p>

          <div className="more_benefits_bogy">
            <div className="benefits_install">
              <FaTools className="install_icon" />
              <p className="install_text">免費基本安裝</p>
            </div>
            <div className="benefits_discount">
              <FaGift className="discount_icon" />
              <p className="discount_text">限時限量商品折扣</p>
            </div>
            <div className="benefits_goods">
              <FaTruckMoving className="goods_icon" />
              <div className="benefits_goods_text">
                <p className="goods_text">3天內保證送達</p>
                <p className="goods_text2">部分商品因區域限制除外</p>
              </div>
            </div>
          </div>
        </div>

        <div className="active_product_bg" id="active_product"></div>

        <div className="active_product_body text-white">
          <div className="active_product_body_all">
            <div className="active_product_body_text">
              <p className="active_product_body_text_8">限量餘音價 9折搶購中</p>
              <p className="active_product_body_text_date">
                12/30-1/31 <br />
                結帳時輸入/選擇優惠序號: GT75,最高可享75折
              </p>
            </div>

            <div className="active_product_all row">
              {AcProduct.length && (
                <OwlCarousel className="owl-theme main_color" {...options}>
                  {AcProduct.map((AcProducts) => {
                    return (
                      <>
                        <div className="more_product col-3" key={AcProducts.id}>
                          <div className="active_product">
                            <div className="active_product_photo_border ">
                              <img
                                src={`${process.env.REACT_APP_NODE_URL}/public/upload/product-subject/${AcProducts.subject_img}`}
                                className="active_product_photo"
                                alt={AcProducts.subject_img}
                              />
                            </div>

                            <div className="active_product_nam_nt_icon ">
                              <button
                                className=""
                                onClick={() => {
                                  navigate(
                                    `/activity/acproduct/${AcProducts.id}`,
                                    { state: { ...AcProducts } }
                                  )
                                }}
                              >
                                <p className="active_product_name">
                                  {AcProducts.product_name}
                                </p>
                              </button>
                              <p className="active_product_nt">
                                NT$ {AcProducts.product_price}
                              </p>
                              <div className="product_nt_spice_icon">
                                <p className="active_product_nt_spice">
                                  ECHO 會員限定價
                                  <span className="active_product_span four_color">
                                    NT$ {AcProducts.product_price * 0.9}
                                  </span>
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </>
                    )
                  })}
                </OwlCarousel>
              )}
            </div>

            <p className="product_more_caption">
              *限量餘音價為 ECHO
              會員限定價之8折優惠,此優惠僅可與新會員歡迎禮95折合併使用,最高可享75折優惠
              <br />
              *ECHO 會員限定價為建議售價之9折
            </p>
          </div>
        </div>
      </section>
    </>
  )
}

export default ProductActivity
