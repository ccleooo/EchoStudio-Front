import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Collapse from 'react-bootstrap/Collapse'
import '../../styles/Cart/success.scss'
import { ReactComponent as CartIcon } from '../../images/svg/cart.svg'
import { FaAngleDown, FaRegCheckCircle, FaGift } from 'react-icons/fa'
import { useCart } from '../../utils/useCart'
import { useSecondCart } from '../../utils/useSecondCart'

function Success(props) {
  let navigate = useNavigate()
  const firstCart = useCart()
  const secondCart = useSecondCart()
  const [open, setOpen] = useState(false)
  const location = useLocation()

  const [orderNumber] = useState(location.state.order_number) // 訂單編號
  const [snNumber] = useState(location.state.sn) // 優惠代碼
  const [discount] = useState(location.state.discount) // 折扣
  const [freight] = useState(location.state.freight) // 運費
  const [userEmail] = useState(location.state.email) // email
  // 折扣 (xx/100)
  const couponCount = discount === 0 ? 1 : discount / 100
  // console.log('---- 27 ----', courseEmail)

  // 合計
  const totalAmount =
    firstCart.cart.cartTotal -
    Math.round(
      firstCart.cart.cartTotal - firstCart.cart.cartTotal * couponCount
    ) +
    freight

  // course
  const [courseEmail] = useState(location.state.email)

  // console.log('----- 14 location couponCount -----', couponCount)

  return (
    <>
      <section className="success_cart">
        <div className="container">
          <div className="cart_step">
            <div className="row cart_row">
              <div className="col-lg-2 col-4 step">
                <div className="circle">
                  <span className="test">1</span>
                </div>
                <div className="step_text">
                  <p>購物車</p>
                </div>
              </div>
              <div className="col-lg-2 col-4 step">
                <div className="circle">
                  <span className="test">2</span>
                </div>
                <div className="step_text">
                  <p>訂單資料</p>
                </div>
              </div>
              <div className="col-lg-2 col-4 step step_active">
                <div className="circle">
                  <span className="test">3</span>
                </div>
                <div className="step_text">
                  <p>訂單成立</p>
                </div>
              </div>
            </div>
            <div className="step_line"></div>
          </div>
          <div className="back_cart_btn">
            <button
              className="btn success_cart_btn"
              onClick={() => {
                if (firstCart.cart.cartTotal > 0) {
                  firstCart.clearCart()
                  navigate('/cart')
                } else if (firstCart.cart.cartTotal === 0) {
                  secondCart.clearCart()
                  navigate('/cart')
                }
              }}
            >
              <CartIcon className="success_cart_icon" />
              <p>返回購物車</p>
            </button>
            <div className="border_line"></div>
          </div>
          <div className="success_cart_body border">
            <div className="main_color success_body_header">
              {firstCart.cart.cartTotal > 0 ? (
                <p>
                  訂單金額<span>NT$ {totalAmount}</span>
                </p>
              ) : (
                <p>
                  訂單金額<span>NT$ {secondCart.cart.cartTotal}</span>
                </p>
              )}

              <div className="buy_amount">
                {firstCart.cart.cartTotal > 0 ? (
                  <p>購買商品 ( {firstCart.cart.totalItems} ) 件</p>
                ) : (
                  <p>購買商品 ( {secondCart.cart.totalItems} ) 件</p>
                )}
                <button className="btn buy_FaAngleDown_btn main_color">
                  <FaAngleDown
                    className="buy_FaAngleDown"
                    onClick={() => setOpen(!open)}
                    aria-controls="collapse-text"
                    aria-expanded={open}
                  />
                </button>
              </div>
            </div>
            <Collapse in={open}>
              <div className="success_order">
                <p className="success_order_title main_color">訂單內容</p>
                <div className="success_table">
                  <div className="thead">
                    <div className="row">
                      <div className="col-6">
                        <p className="prdocut_title">PRODUCT</p>
                      </div>
                      <div className="col-3">
                        <p className="price_title">PRICE</p>
                      </div>
                      <div className="col-3">
                        <p className="amount_title">QUANTITY</p>
                      </div>
                    </div>
                  </div>
                  <div className="tbody">
                    {/* item */}
                    {firstCart.cart.cartTotal > 0 ? (
                      <>
                        {firstCart.cart.items.map((v, i) => {
                          return (
                            <div className="item">
                              <div className="cart_product_img">
                                <img
                                  src={`${process.env.REACT_APP_NODE_URL}/public/upload/product-subject/${v.subject_img}`}
                                  alt={v.subject_img}
                                />
                              </div>
                              <div className="success_product_info">
                                <h2 className="main_color">{v.product_name}</h2>
                                {v.add_product === 1 ? (
                                  <div className="cart_discount">
                                    <FaGift className="cart_gift_icon" />
                                    <p>加購商品</p>
                                  </div>
                                ) : (
                                  ''
                                )}
                              </div>
                              <div className="success_product_spec">
                                <div className="success_spec_choose">
                                  <p>
                                    {v.spec_name}, {v.color_name}
                                  </p>
                                </div>
                              </div>
                              <div className="success_product_price">
                                <p>NT$ {v.product_price}</p>
                              </div>
                              <div className="success_quantity main_color">
                                <p>{v.quantity}</p>
                              </div>
                            </div>
                          )
                        })}
                      </>
                    ) : (
                      <>
                        {secondCart.cart.items.map((v, i) => {
                          return (
                            <div className="item">
                              <div className="cart_product_img">
                                <img
                                  src={`${process.env.REACT_APP_NODE_URL}/public/upload/courses/${v.class_img}`}
                                  alt={v.class_img}
                                />
                              </div>
                              <div className="success_product_info">
                                <h2 className="main_color">{v.class_name}</h2>
                              </div>
                              <div className="success_product_price">
                                <p>NT$ {v.class_price}</p>
                              </div>
                              <div className="success_quantity main_color">
                                <p>{v.quantity}</p>
                              </div>
                            </div>
                          )
                        })}
                      </>
                    )}
                  </div>
                </div>
                {firstCart.cart.cartTotal > 0 ? (
                  <div className="success_cost main_color">
                    <div className="success_cost_left">
                      <p>數量</p>
                      <p>小計</p>
                      <p>優惠代碼</p>
                      <p>折扣金額</p>
                      <p>運費</p>
                    </div>
                    <div className="success_cost_right">
                      <p>{firstCart.cart.totalItems}</p>
                      <p>NT$ {firstCart.cart.cartTotal}</p>
                      <p className="four_color">
                        {snNumber === '' ? '無使用優惠代碼' : snNumber}
                      </p>
                      {couponCount > 0 ? (
                        <p className="four_color">
                          - NT${' '}
                          {firstCart.cart.cartTotal -
                            firstCart.cart.cartTotal * couponCount}
                        </p>
                      ) : (
                        <p className="four_color">0</p>
                      )}
                      <p>NT$ {freight}</p>
                    </div>
                  </div>
                ) : (
                  <div className="success_cost main_color">
                    <div className="success_cost_left">
                      <p>數量</p>
                      <p>小計</p>
                    </div>
                    <div className="success_cost_right">
                      <p>{secondCart.cart.totalItems}</p>
                      <p>NT$ {secondCart.cart.cartTotal}</p>
                    </div>
                  </div>
                )}
                <div className="success_total main_color">
                  <div className="success_total_text">
                    <p>合計</p>
                  </div>
                  <div className="success_total_price three_color">
                    {firstCart.cart.cartTotal > 0 ? (
                      <p className="three_color">NT$ {totalAmount}</p>
                    ) : (
                      <p className="three_color">
                        NT$ {secondCart.cart.cartTotal}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </Collapse>
          </div>
          {firstCart.cart.cartTotal > 0 ? (
            <div className="success_box">
              <div className="success_box_content main_color">
                <div className="success_box_top">
                  <FaRegCheckCircle className="box_top_left four_color" />
                  <div className="box_top_right">
                    <h5 className="four_color">
                      謝謝您的購買，該筆訂單已成立！
                    </h5>
                    <h6 className="four_color">訂單編號：{orderNumber}</h6>
                    <p>訂單資訊已email至您的信箱</p>
                    <p>{userEmail}</p>
                  </div>
                </div>
                <div className="success_box_bottom">
                  <p>
                    您可前往 會員中心的
                    <button
                      className="four_color cart_succes_btn"
                      onClick={() => {
                        firstCart.clearCart()
                        navigate('/user/order')
                      }}
                    >
                      「訂單查詢」
                    </button>
                    頁面，查看您的訂單進度。
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="success_box">
              <div className="success_box_content main_color">
                <div className="success_box_top">
                  <FaRegCheckCircle className="box_top_left four_color" />
                  <div className="box_top_right">
                    <h5 className="four_color">
                      謝謝您的購買，該筆訂單已成立！
                    </h5>
                    <p>訂單資訊已email至您的信箱</p>
                    <p>{courseEmail}</p>
                  </div>
                </div>
                <div className="success_box_bottom">
                  <p>
                    您可前往 會員中心的
                    <button
                      className="four_color cart_succes_btn"
                      onClick={() => {
                        secondCart.clearCart()
                        navigate('/user/mycourse')
                      }}
                    >
                      「我的課程」
                    </button>
                    頁面，查看您所購買的課程。
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  )
}

export default Success
