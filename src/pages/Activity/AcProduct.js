import '../../styles/Activity/acProduct.scss'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { ReactComponent as CartIcon } from '../../images/svg/cart.svg'
import {
  FaHome,
  FaAngleRight,
  FaMinus,
  FaPlus,
  FaShoppingBag,
  FaMusic,
  FaInfoCircle,
  FaShippingFast,
} from 'react-icons/fa'
import { ImBookmark } from 'react-icons/im'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import * as React from 'react'
import { useCart } from '../../utils/useCart'

function AcProduct(props) {
  const [AcProduct, setAcProduct] = useState([])
  const [activity, setActivity] = useState([])
  const { activityProductID } = useParams([])
  const [counter, setCounter] = useState(1)
  const [acProductRand, setAcProductRand] = useState([])
  const navigate = useNavigate()
  const { addItem } = useCart()
  // 以 calulateTimeLeft 回傳值 初始化距離 10/10 剩下的時間
  const [timeLeft, setTimeLeft] = useState(calulateTimeLeft())

  function calulateTimeLeft() {
    let year = new Date().getFullYear() // 獲取現在的年份
    let month = new Date().getMonth() //

    let different = null
    let timeLeft = {}

    // 如果現在的月份已經超過10月，則算到下一年 若現在月份沒有超過10月，則用今年的年份來計算
    if (month > 3) {
      different = new Date(`${2}/${28}/${year + 1}`) - new Date()
    } else {
      different = new Date(`${2}/${28}/${year}`) - new Date()
    }

    if (different > 0) {
      timeLeft = {
        days: Math.floor(different / (1000 * 60 * 60 * 24)),
        hours: Math.floor((different / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((different / (1000 * 60)) % 60),
        seconds: Math.floor((different / 1000) % 60),
      }
    }

    return timeLeft
  }

  // useEffect 處理 timer
  useEffect(() => {
    let id = setInterval(() => {
      setTimeLeft(calulateTimeLeft())
    }, 1000)
    return function () {
      clearInterval(id)
    }
  }, [timeLeft])

  //活動商品
  useEffect(() => {
    // console.log('活動商品全部')
    // 在component初始化的時後跑一次
    // 通常會把去跟後端要資料的動作放這裡
    async function getAcProduct() {
      let response = await axios.get(
        `http://localhost:3001/acproduct/${activityProductID}`
      )
      setAcProduct(response.data)
    }
    getAcProduct()
  }, [activityProductID])

  //活動日期開始結束
  useEffect(() => {
    // console.log('活動日期開始結束')
    async function getActivity() {
      let response = await axios.get(`http://localhost:3001/activity`)
      setActivity(response.data)
    }
    // console.log('**************activity', activity)
    getActivity()
  }, [])

  useEffect(() => {
    async function getAcProductRand() {
      let response = await axios.get(`http://localhost:3001/randacproduct`)
      setAcProductRand(response.data)
    }
    getAcProductRand()
  }, [])

  return (
    <>
      <section className="productDetail_header_banner border-bottom">
        <div className="container">
          <div className="productDetail_header_content">
            <div className=" main_color productDetail_header">
              <Link to="/" className="productDetail_link">
                <FaHome className="productDetail_header_icon" />
              </Link>
              <FaAngleRight className="productDetail_header_icon" />
              <Link to="/activity" className="productDetail_link">
                活動優惠商品
              </Link>
              <FaAngleRight className="productDetail_header_icon" />
              {AcProduct.map((v, i) => {
                return <p key={v.id}>{v.product_name}</p>
              })}
            </div>
          </div>
        </div>
      </section>
      {/* productDetail */}
      <section>
        <div className="container">
          <div className="ac_countdown text-center mt-5 mb-3">
            <>
              <p>
                距離 02 / 28 還有{' '}
                <span className="four_color">{timeLeft.days}</span> 天{' '}
                <span className="four_color">{timeLeft.hours} </span>時{' '}
                <span className="four_color">{timeLeft.minutes}</span> 分{' '}
                <span className="four_color">{timeLeft.seconds}</span> 秒
              </p>
            </>
          </div>
          {AcProduct.map((AcProducts, i) => {
            const acproductInfo = `${AcProducts.information}`
            const acproductSpec = `${AcProducts.spec_decration}`
            return (
              <div
                className="productDetail_content main_color"
                key={AcProducts.id}
              >
                <div className="acproductDetail_title row">
                  <div className="productDetail_left col-lg-6">
                    <div className="left_top">
                      <button className="productDetail_icon_btn"></button>
                      <div className="acproduct_img">
                        <div className="aclarge_img">
                          <img
                            src={`${process.env.REACT_APP_NODE_URL}/public/upload/product-subject/${AcProducts.subject_img}`}
                            className="aclarge_img"
                            alt={AcProducts.subject_img}
                          />
                        </div>
                      </div>
                      <button className="productDetail_icon_btn"></button>
                    </div>
                  </div>
                  <div className="acproductDetail_right col-lg-6">
                    <h4>商品名稱 : {AcProducts.product_name}</h4>
                    <p>原價: NT$ {AcProducts.product_price}</p>
                    <div className="d-flex">
                      <h3>
                        會員限定價:{' '}
                        <span className="three_color">
                          NT$ {AcProducts.product_price * 0.9}
                        </span>
                      </h3>
                    </div>
                    {activity.map((v, i) => {
                      return (
                        <>
                          <p>折扣期限 : {v.activity_end} 前</p>
                          <div className="d-flex">
                            <ImBookmark className="ImBookmark three_color mt-3" />
                            <div>
                              <p>
                                結帳時輸入/選擇優惠序號: {v.coupon_sn} , 可享
                              </p>
                              <h4 className="three_color">
                                {v.discount_name}折!
                              </h4>
                            </div>
                          </div>
                        </>
                      )
                    })}

                    <div className="acproductDetail_count">
                      <button
                        onClick={() => {
                          setCounter(counter > 1 ? counter - 1 : 1)
                        }}
                        className="count_symbol count_btn_left"
                      >
                        <FaMinus />
                      </button>
                      <input type="text" value={counter} className="count" />

                      <button
                        onClick={() => {
                          setCounter(counter + 1)
                        }}
                        className="count_symbol count_btn_right"
                      >
                        <FaPlus />
                      </button>
                    </div>
                    <div className="acbuy_btn_group ">
                      <button
                        className="btn acbuy_btn"
                        onClick={() => {
                          // 商品原本無數量屬性(quantity)，要先加上, 淺拷貝
                          const item = {
                            ...AcProducts,
                            product_price: 0,
                            set_price: AcProducts.product_price,
                            quantity: counter,
                          }
                          // 注意: 重覆加入會自動+1產品數量
                          addItem(item)
                          navigate('/cart', { replace: true })
                        }}
                      >
                        前往結帳
                      </button>
                      <button
                        className="btn accart_btn"
                        onClick={() => {
                          // 商品原本無數量屬性(quantity)，要先加上, 淺拷貝
                          const item = {
                            ...AcProducts,
                            ac_product_state: 1,
                            product_price: 0,
                            set_price: AcProducts.product_price,
                            quantity: counter,
                            completed: false,
                          }
                          // 注意: 重覆加入會自動+1產品數量
                          addItem(item)
                          // console.log(AcProducts)
                        }}
                      >
                        加入購物車
                      </button>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col title d-grid ">
                    <ButtonGroup size="md" className="mb-5">
                      <a href="#acproduct_info" className="btn">
                        商品介紹
                      </a>
                      <a href="#acspec_info" className="btn">
                        規格說明
                      </a>
                      <a href="#acmethod" className="btn">
                        運送方式
                      </a>
                    </ButtonGroup>
                  </div>
                </div>

                <div className="acproductDetail_info">
                  <div className="ac_product_info">
                    <div className="acproduct_info_title">
                      <FaMusic className="product_info_icon mt-5" />
                      <p className="actitle_text mt-5" id="acproduct_info">
                        商品介紹
                      </p>
                    </div>
                    <div className="acproduct_info_text text-white">
                      <div
                        dangerouslySetInnerHTML={{ __html: acproductInfo }}
                      />
                    </div>
                  </div>
                  <div className="spec_info">
                    <div className="product_info_title">
                      <FaInfoCircle className="acproduct_info_icon mt-5" />
                      <p className="actitle_text mt-5" id="acspec_info">
                        規格說明
                      </p>
                    </div>
                    <div className="acinfo_text_middle text-white">
                      <ul>
                        <div
                          dangerouslySetInnerHTML={{ __html: acproductSpec }}
                        />
                      </ul>
                    </div>
                  </div>
                  <div className="method">
                    <div className="product_info_title">
                      <FaShippingFast className="acproduct_info_icon mt-5" />
                      <p className="actitle_text mt-5" id="acmethod">
                        運送方式
                      </p>
                    </div>
                    <div className="acinfo_text_middle text-white">
                      <ul>
                        <li>到店取貨</li>
                        <li>宅配</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* 推薦商品 */}
      {/* {AcProduct.map((AcProducts, i) => {
        return ( */}
      <section className="acrecommend_banner">
        <div className="container">
          <div className="acproductDetail_recommend">
            <div className="product_recommend">
              <div className="product_info_title main_color mb-5">
                <div className="d-flex">
                  <FaShoppingBag className="acproduct_info_icon" />
                  <p className="actitle_text">相關商品</p>
                </div>
              </div>
              <div className="product row">
                {acProductRand.map((v, i) => {
                  return (
                    <div
                      key={v.id}
                      className="ac_product_card product_card col-lg-3 col-md-4"
                    >
                      <img
                        src={`${process.env.REACT_APP_NODE_URL}/public/upload/product-subject/${v.subject_img}`}
                        className="card-img-top card_img"
                        alt={v.subject_img}
                      />
                      <div className="card-body">
                        <button
                          onClick={() => {
                            navigate(`/activity/acproduct/${v.id}`, {
                              state: { ...v },
                            })
                            window.location.reload()
                          }}
                          className="card-title product_card_title main_color"
                        >
                          {v.product_name}
                        </button>
                        <div className="acproduct_card_bottom d-flex justify-content-between">
                          <p className="accard-text card_price ">
                            會員限定價 NT$ {v.product_price * 0.9}
                          </p>
                          <button className="btn acproduct_btn_cart ">
                            <CartIcon className="accart" />
                          </button>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default AcProduct
