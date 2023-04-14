import { useState } from 'react'
import { useLocation, Link, useNavigate } from 'react-router-dom'
import { useCart } from '../../utils/useCart'
import { useSecondCart } from '../../utils/useSecondCart'
import '../../styles/Cart/checkout.scss'
import { FaShippingFast, FaTag, FaCcVisa, FaGift, FaWaze } from 'react-icons/fa'
import { ReactComponent as CartIcon } from '../../images/svg/cart.svg'
import { useAuth } from '../../hooks/useAuth'
// orderTake
import orderPay from '../../configs/data/orderPay.json'
import logo from '../../images/cart/bank_logo.png'
import axios from 'axios'

function Checkout(props) {
  const firstCart = useCart()
  const secondCart = useSecondCart()

  const location = useLocation()
  const { auth } = useAuth()
  // console.log('---------------------', auth)
  // couponSN
  const [useCoupon] = useState(location.state.couponSN)
  // couponID
  const [useCouponID] = useState(location.state.value[0])
  // discount
  const [useDiscount] = useState(location.state.value[1])
  // take_method (DB)
  const [takeMethod] = useState(location.state.value[2])
  // freight-name - 配送方式
  const [freightName] = useState(location.state.value[3])
  // freight-price - 運費
  const [freight] = useState(location.state.value[4])

  // console.log('----- 22 take_method -------', location.state.value[1])

  // 折扣 (xx/100)
  const couponCount = useDiscount === 0 ? 1 : useDiscount / 100

  // 訂單總計
  const cartTotal =
    firstCart.cart.cartTotal -
    (firstCart.cart.cartTotal -
      Math.round(firstCart.cart.cartTotal * couponCount)) +
    freight

  // 付款方式
  const [payMethod, setPayMethod] = useState([])
  const toggleHandler = (pay) => () => {
    setPayMethod((state) => ({
      [pay.pay_method]: state[pay.pay_method]
        ? {}
        : {
            pay_method: pay.pay_method,
            pay_method_name: pay.pay_method_name,
          },
    }))
  }

  const takeMethodData = Object.values(payMethod)
  const choosepayment =
    takeMethodData.length === 0 ? '' : takeMethodData[0].pay_method

  // 收件人資料與會員相符
  const [authUser, setAuthUser] = useState(false)
  const [userData, setUserData] = useState([])
  // 收件人
  const [userName, setUserName] = useState('')
  const [userPhone, setUserPhone] = useState('')
  const [userAddress, setUserAddress] = useState('')

  const userSave = (user) => {
    setUserData(user)
  }

  // 發票載具狀態 (Boolean)
  const [useCarrier, setUseCarrier] = useState(false) // 會員載具
  const [useBill, setUseBill] = useState(false) // 紙本發票
  const [useFree, setUseFree] = useState(false) // 捐贈發票
  // 發票選擇ID
  const [receiptID, setReceiptID] = useState('') // 捐贈發票

  // 發票載具Value
  const [carrier, setCarrier] = useState('') // 會員載具
  const [taxID, setTaxID] = useState('') // 公司統編

  // 訂單備註
  const [memo, setMemo] = useState('')

  // 信用卡資訊
  const [owner, setOwner] = useState('')
  const [number, setNumber] = useState('')
  const [dateline, setDateline] = useState('')
  const [csc, setCsc] = useState('')

  // 訂單產生日期(time)
  let tzoffset = new Date().getTimezoneOffset() * 60000
  let localISOTime = new Date(Date.now() - tzoffset).toISOString().slice(0, -1)
  // 訂單編號
  const convertedDate = localISOTime.replace(/[-T:.]/g, '')
  let navigate = useNavigate()

  // INSERT Product
  const messageDataID = {
    user_id: auth.user.id,
    order_number: 'ECHO' + convertedDate.slice(0, 16),
    order_name: authUser === true ? userData.name : userName,
    order_phone: authUser === true ? userData.phone : userPhone,
    order_address: authUser === true ? userData.address : userAddress,
    pay_method: choosepayment,
    take_method: takeMethod,
    order_status: 1,
    coupon_sn_id: useCouponID,
    freight: freight,
    total_amount: cartTotal,
    receipt: receiptID,
    memo: memo,
    gui: taxID.length === 0 ? null : taxID,
    carrier: useCarrier === true ? auth.user.carrier : carrier,
    order_create_time: localISOTime,
    order_valid: 1,
    cartItems: firstCart.cart.items,
  }

  // console.log('---- 136 firstCart -----', firstCart.cart)

  // 訂單需求
  const productDataID = {
    user_id: auth.user.id,
    order_number: 'ECHO' + convertedDate,
    sn: useCoupon,
    discount: useDiscount,
    freight: freight,
    email: auth.user.email,
  }

  // INSERT Course
  const courseDataID = {
    user_id: auth.user.id,
    order_name: auth.user.name,
    order_phone: auth.user.phone,
    order_price: secondCart.cart.cartTotal,
    class_email: auth.user.email,
    pay_method: choosepayment,
    carrier: auth.user.carrier,
    creat_date: localISOTime,
    class_order_valid: 1,
    cartItems: secondCart.cart.items,
  }

  // 訂單需求
  const courseOrderData = {
    email: auth.user.email,
  }

  // console.log('------ 131 messageDataID ------', courseDataID)

  async function handleSubmit(e) {
    // console.log('handleSubmit')
    // 關閉表單的預設行為
    e.preventDefault()

    if (firstCart.cart.cartTotal > 0) {
      await axios.post('http://localhost:3001/insetCartOrder', messageDataID)
      navigate(`/cart/success`, {
        state: {
          ...productDataID,
          value: [firstCart.cart, firstCart.cart.items],
        },
      })
    } else if (firstCart.cart.cartTotal === 0) {
      await axios.post('http://localhost:3001/insetCourseOrder', courseDataID)
      navigate(`/cart/success`, {
        state: {
          ...courseOrderData,
          value: [secondCart.cart, secondCart.cart.items],
        },
      })
    }
  }

  return (
    <section className="delivery">
      <form method="post">
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
              <div className="col-lg-2 col-4 step step_active">
                <div className="circle">
                  <span className="test">2</span>
                </div>
                <div className="step_text">
                  <p>訂單資料</p>
                </div>
              </div>
              <div className="col-lg-2 col-4 step">
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
          <section className="information">
            <div className="cart_step_title main_color">
              <div className="circle">
                <span>2</span>
              </div>
              <p>確認購買資訊</p>
            </div>
            <section className="delivery_info">
              <div className="row">
                <div className="col-md-6 delivery_member cart_margin">
                  <div className="cart_table">
                    <div className="thead">
                      <p className="prdocut_title">購買清單</p>
                    </div>
                    <div className="tbody delivery_tbody">
                      <div className="checkout_product_list">
                        {firstCart.cart.cartTotal > 0 ? (
                          <>
                            <div className="checkout_product">
                              {firstCart.cart.items.map((v, i) => {
                                return (
                                  <div
                                    className="checkout_product_item"
                                    key={v.id}
                                  >
                                    <div className="row">
                                      <div className="col-md-8 product_information">
                                        <div className="checkout_product_img">
                                          <img
                                            src={`${process.env.REACT_APP_NODE_URL}/public/upload/product-subject/${v.subject_img}`}
                                            alt={v.subject_img}
                                          />
                                        </div>
                                        <div className="checkout_product_info">
                                          <h1>{v.product_name}</h1>
                                          <div className="cart_checkout_discount">
                                            <p>
                                              規格：{v.spec_name}，
                                              {v.color_name}
                                            </p>
                                            {v.add_product === 1 ? (
                                              <div className="cart_discount">
                                                <FaGift className="cart_gift_icon" />
                                                <p>加購商品</p>
                                              </div>
                                            ) : v.ac_product_state === 1 ? (
                                              <div className="cart_discount cart_ac_product">
                                                <FaGift className="cart_gift_icon" />
                                                <p>活動商品</p>
                                              </div>
                                            ) : (
                                              ''
                                            )}
                                          </div>
                                        </div>
                                      </div>
                                      <div className="col-md-4 checkout_price">
                                        <div className="checkout_original">
                                          <p>NT$ {v.product_price}</p>
                                        </div>
                                        <div className="checkout_amount">
                                          <p>x {v.quantity}</p>
                                        </div>
                                        <div className="checkout_total">
                                          <p>
                                            NT$ {v.product_price * v.quantity}
                                          </p>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                )
                              })}
                            </div>
                          </>
                        ) : (
                          <>
                            <div className="checkout_product">
                              {secondCart.cart.items.map((v, i) => {
                                return (
                                  <div
                                    className="checkout_product_item"
                                    key={v.id}
                                  >
                                    <div className="row">
                                      <div className="col-md-8 product_information">
                                        <div className="checkout_product_img">
                                          <img
                                            src={`${process.env.REACT_APP_NODE_URL}/public/upload/courses/${v.class_img}`}
                                            alt={v.class_img}
                                          />
                                        </div>
                                        <div className="checkout_product_info">
                                          <h1>{v.class_name}</h1>
                                        </div>
                                      </div>
                                      <div className="col-md-4 checkout_price">
                                        <div className="checkout_original">
                                          <p>NT$ {v.product_price}</p>
                                        </div>
                                        <div className="checkout_amount">
                                          <p>x {v.quantity}</p>
                                        </div>
                                        <div className="checkout_total">
                                          <p>NT$ {v.product_price}</p>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                )
                              })}
                            </div>
                          </>
                        )}
                        {firstCart.cart.cartTotal > 0 ? (
                          <div className="delivery_method">
                            <div className="checkout_delivery">
                              <FaShippingFast className="shipping_fast" />
                              <p>配送方式：{freightName}</p>
                            </div>
                            <div className="checkout_freight">
                              <p>NT$ {freight}</p>
                            </div>
                          </div>
                        ) : (
                          ''
                        )}
                        {/* SN 酷碰 */}
                        {useCoupon ? (
                          <div className="coupon_sn">
                            <div className="checkout_coupon">
                              <FaTag className="fatag_icon" />
                              <p>優惠券代碼：{useCoupon}</p>
                            </div>
                            <div className="checkout_discount">
                              <p>
                                - NT${' '}
                                {firstCart.cart.cartTotal -
                                  Math.round(
                                    firstCart.cart.cartTotal * couponCount
                                  )}
                              </p>
                            </div>
                          </div>
                        ) : (
                          ''
                        )}
                      </div>
                      {firstCart.cart.cartTotal > 0 ? (
                        <div className="checkout_total_amount">
                          <p>
                            總計
                            <span>
                              NT${' '}
                              {firstCart.cart.cartTotal -
                                (firstCart.cart.cartTotal -
                                  Math.round(
                                    firstCart.cart.cartTotal * couponCount
                                  )) +
                                freight}
                            </span>
                          </p>
                        </div>
                      ) : (
                        <div className="checkout_total_amount">
                          <p>
                            總計
                            <span>NT$ {secondCart.cart.cartTotal}</span>
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                {firstCart.cart.cartTotal > 0 ? (
                  <>
                    <div className="col-md-6 delivery_member_info cart_margin">
                      <div className="cart_table">
                        <div className="thead">
                          <p className="prdocut_title">收件人資料</p>
                        </div>
                        <div className="tbody member_tbody">
                          <div className="checkout_notice">
                            <p>未避免配送出錯，請填寫正確的收件資料</p>
                          </div>
                          <div className="checked_box">
                            <div className="auto_flex cart_check_box same_member_info">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                id="flexCheckDefault"
                                checked={authUser}
                                onChange={() => {
                                  setAuthUser(!authUser)
                                  if (authUser === false) {
                                    userSave(auth.user)
                                  }
                                }}
                              />
                              <p>收件人資料與會員資料相符</p>
                            </div>
                          </div>
                          <div className="recipient enter_input">
                            <label>收件人姓名</label>
                            <input
                              type="text"
                              name="order_name"
                              value={
                                authUser === true ? userData.name : userName
                              }
                              onChange={(e) => {
                                setUserName(e.target.value)
                              }}
                            />
                          </div>
                          <div className="recipient_item enter_input">
                            <label>收件人電話</label>
                            <input
                              type="text"
                              value={
                                authUser === true ? userData.phone : userPhone
                              }
                              onChange={(e) => {
                                setUserPhone(e.target.value)
                                // console.log(userPhone)
                              }}
                            />
                          </div>
                          <div className="recipient_item enter_input">
                            <label>配送地址</label>
                            <input
                              type="text"
                              value={
                                authUser === true
                                  ? userData.address
                                  : userAddress
                              }
                              onChange={(e) => {
                                setUserAddress(e.target.value)
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  ''
                )}
                {firstCart.cart.cartTotal > 0 ? (
                  <>
                    <div className="col-md-6 delivery_receipt">
                      <div className="cart_table">
                        <div className="thead">
                          <p className="prdocut_title">發票資訊 / 訂單備註</p>
                        </div>
                        <div className="tbody payment_tbody">
                          <div className="receipt_title">
                            <h2>發票載具</h2>
                          </div>
                          <div className="checked_box">
                            <div className="auto_flex cart_check_box same_member_info">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                disabled={useBill || useFree}
                                checked={useCarrier}
                                id="flexCheckDefault"
                                onChange={() => {
                                  setUseCarrier(!useCarrier)
                                  useBill || useFree
                                    ? setReceiptID()
                                    : setReceiptID(1)
                                }}
                              />
                              <p>與會員發票載具相符</p>
                            </div>
                            <div className="auto_flex cart_check_box same_member_info">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                disabled={useCarrier || useFree}
                                checked={useBill}
                                id="flexCheckDefault"
                                onChange={() => {
                                  setUseBill(!useBill)
                                  useCarrier || useFree
                                    ? setReceiptID()
                                    : setReceiptID(2)
                                }}
                              />
                              <p>索取紙本發票</p>
                            </div>
                            <div className="auto_flex cart_check_box save_data">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                disabled={useCarrier || useBill}
                                checked={useFree}
                                id="flexCheckDefault"
                                onChange={() => {
                                  setUseFree(!useFree)
                                  useCarrier || useBill
                                    ? setReceiptID()
                                    : setReceiptID(3)
                                }}
                              />
                              <p>捐贈發票</p>
                            </div>
                          </div>
                          <div className="recipient enter_input">
                            <label>電子發票手機載具條碼</label>
                            <input
                              type="text"
                              placeholder="/ABC+123"
                              value={
                                useCarrier === true
                                  ? auth.user.carrier
                                  : carrier
                              }
                              name="carrier"
                              disabled={useBill || useFree}
                              onChange={(e) => {
                                setCarrier(e.target.value)
                              }}
                            />
                          </div>
                          <div className="recipient_item enter_input">
                            <label>公司統編</label>
                            <input
                              type="text"
                              disabled={useCarrier || useFree}
                              maxLength={8}
                              value={taxID}
                              onChange={(e) => {
                                setTaxID(e.target.value)
                              }}
                            />
                          </div>
                          <div className="recipient_item enter_input cart_memo">
                            <label>訂單備註</label>
                            <textarea
                              type="text"
                              rows="4"
                              value={memo}
                              onChange={(e) => {
                                setMemo(e.target.value)
                              }}
                            ></textarea>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  ''
                )}

                <div className="col-md-6 delivery_payment">
                  <div className="cart_table">
                    <div className="thead">
                      <p className="prdocut_title">付款資料</p>
                    </div>
                    <div className="tbody payment_tbody">
                      <div className="receipt_title">
                        <h2>付款方式</h2>
                      </div>
                      <div className="checked_box">
                        {orderPay.map((pay) => {
                          return (
                            <div
                              className="auto_flex cart_check_box same_payment"
                              key={pay.pay_method}
                            >
                              <input
                                className="form-check-input"
                                type="checkbox"
                                onChange={toggleHandler(pay)}
                                checked={payMethod[pay.pay_method]}
                                id="flexCheckDefault"
                              />
                              <p>{pay.pay_method_name}</p>
                            </div>
                          )
                        })}
                      </div>
                      {/* 付款須知 */}
                      {choosepayment === 1 ? (
                        <div className="payment_notice">
                          <p>
                            接受全球消費者使用信用卡(支援VISA，Mastercard
                            ，JCB)，線上即時刷卡付款，在SSL安全機制保護下得到最大的安全保護。
                          </p>
                        </div>
                      ) : choosepayment === 2 ? (
                        <div className="payment_notice">
                          <p>
                            選擇 ATM
                            轉帳付款，請紀錄該組帳號使用網路銀行轉帳或至各大行庫ATM轉帳。
                          </p>
                        </div>
                      ) : choosepayment === 3 ? (
                        <div className="payment_notice">
                          <p>
                            選擇 LINE PAY 付款，畫面將跳轉至QR
                            CODE進行付款流程。
                          </p>
                        </div>
                      ) : (
                        ''
                      )}

                      {/* 付款方式 - 欄位 */}
                      {choosepayment === 1 ? (
                        <>
                          <div className="credit_card">
                            <div className="row">
                              <div className="col-sm-6 credit_item enter_input">
                                <label>持卡人姓名</label>
                                <input
                                  type="text"
                                  value={owner}
                                  onChange={(e) => {
                                    setOwner(e.target.value)
                                  }}
                                />
                              </div>
                              <div className="col-sm-6 credit_item enter_input input_icon">
                                <label>信用卡卡號</label>
                                <input
                                  type="text"
                                  placeholder="xxxx xxxx xxxx xxxx"
                                  value={number}
                                  maxLength={16}
                                  onChange={(e) => {
                                    setNumber(e.target.value)
                                  }}
                                />
                                <FaCcVisa className="credit_card_icon" />
                              </div>
                              <div className="col-sm-6 credit_item enter_input">
                                <label>有效日期</label>
                                <input
                                  type="text"
                                  placeholder="MM/YY"
                                  maxLength={5}
                                  value={dateline}
                                  onChange={(e) => {
                                    // const aaa = e.target.value.toString()
                                    // function formatDate(originalString) {
                                    //   return originalString.length > 2
                                    //     ? `${originalString.slice(
                                    //         0,
                                    //         2
                                    //       )}/${originalString.slice(2)}`
                                    //     : originalString
                                    // }
                                    setDateline(e.target.value)
                                  }}
                                />
                              </div>
                              <div className="col-sm-6 credit_item enter_input">
                                <label>CVV / CVC</label>
                                <input
                                  type="text"
                                  value={csc}
                                  maxLength={3}
                                  onChange={(e) => {
                                    setCsc(e.target.value)
                                  }}
                                />
                              </div>
                            </div>
                          </div>
                          {/* <div className="checked_payment">
                            <div className="receipt_title cart_check_box">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                value=""
                                id="flexCheckDefault"
                              />
                              <p>
                                保存我的信用卡資訊
                                <span>
                                  此筆訂單成功後，下次結帳免輸入卡號即可直接付款。
                                </span>
                              </p>
                            </div>
                          </div> */}
                        </>
                      ) : choosepayment === 2 ? (
                        <>
                          <div className="atm_payment row">
                            <div className="col-md-4">
                              <img
                                src={logo}
                                className="img-fluid"
                                alt="bank-logo"
                              />
                            </div>
                            <div className="col-md-8">
                              <p>玉山銀行 (808)</p>
                              <h3>1234-5678-90123</h3>
                            </div>
                            <div className="col-md-12 mt-4">
                              <div className="row atm_payment_wrap">
                                <div className="col-3 fawaze_wrap">
                                  <FaWaze className="cart_fawaze" />
                                </div>
                                <div className="col-9 cart_dialog_wrap">
                                  <div className="triangle_left"></div>
                                  <div className="payment_dialog">
                                    <p>
                                      銀行分行：中壢分行
                                      <span>戶名：ECHO STUDIO</span>
                                    </p>
                                    <p className="payment_font">
                                      請在訂單成立後的 24
                                      小時內，將訂單款項匯入指定帳戶中，以便後續確認。
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </>
                      ) : choosepayment === 3 ? (
                        <div className="payment_notice">
                          <p>
                            選擇 LINE PAY 付款，畫面將跳轉至QR
                            CODE進行付款流程。
                          </p>
                        </div>
                      ) : (
                        <>
                          <div className="credit_card">
                            <div className="row">
                              <div className="col-sm-6 credit_item enter_input">
                                <label>持卡人姓名</label>
                                <input type="text" />
                              </div>
                              <div className="col-sm-6 credit_item enter_input input_icon">
                                <label>信用卡卡號</label>
                                <input
                                  type="text"
                                  placeholder="xxxx xxxx xxxx xxxx"
                                  value={number}
                                  maxLength={16}
                                  onChange={(e) => {
                                    // Card number without dash (-)
                                    // let aaa = e.target.value
                                    // const realNumber = aaa.replace(/-/gi, '')

                                    // Generate dashed number
                                    // const dashedNumber =
                                    //   realNumber.match(/.{1,4}/g)

                                    // Replace the dashed number with the real one
                                    // aaa = dashedNumber.join('-')

                                    // console.log('----- 564 -----', aaa)
                                    setNumber(e.target.value)
                                  }}
                                />
                                <FaCcVisa className="credit_card_icon" />
                              </div>
                              <div className="col-sm-6 credit_item enter_input">
                                <label>有效日期</label>
                                <input
                                  type="text"
                                  placeholder="MM / YY"
                                  maxLength={5}
                                  value={dateline}
                                  onChange={(e) => {
                                    // const num = e.target.value
                                    // const str = num.toString()
                                    // const result = [str[0]]

                                    // console.log('---- 571 ----', str)

                                    // for (let x = 1; x < str.length; x++) {
                                    //   if (str[x] % 2 === 0 && str[x] % 2 === 0) {
                                    //     result.push('/', str[x])
                                    //   } else {
                                    //     result.push(str[x])
                                    //   }
                                    // }
                                    setDateline(e.target.value)
                                  }}
                                />
                              </div>
                              <div className="col-sm-6 credit_item enter_input">
                                <label>CVV / CVC</label>
                                <input
                                  type="text"
                                  value={csc}
                                  onChange={(e) => {
                                    setCsc(e.target.value)
                                  }}
                                />
                              </div>
                            </div>
                          </div>
                          {/* <div className="checked_payment">
                            <div className="receipt_title cart_check_box">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                value=""
                                id="flexCheckDefault"
                              />
                              <p>
                                保存我的信用卡資訊
                                <span>
                                  此筆訂單成功後，下次結帳免輸入卡號即可直接付款。
                                </span>
                              </p>
                            </div>
                          </div> */}
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </section>
        </div>
        {/* bottom */}
        <section className="shopping_cart_next shopping_cart_checked sticky-bottom">
          <div className="container">
            <div className="price_checked">
              <div className="product_checkbox previous">
                <Link to="/cart" className="btn_previous">
                  <CartIcon className="previous_cart" />
                  <p>返回購物車</p>
                </Link>
              </div>
              <div className="product_total">
                {firstCart.cart.cartTotal > 0 ? (
                  <div className="discount_price">
                    <p>
                      結帳商品 ( {firstCart.cart.totalItems} ) 件
                      <span>
                        折扣 - NT${' '}
                        {firstCart.cart.cartTotal -
                          Math.round(firstCart.cart.cartTotal * couponCount)}
                      </span>
                    </p>
                  </div>
                ) : (
                  <div className="discount_price">
                    <p>結帳商品 ( {secondCart.cart.totalItems} ) 件</p>
                  </div>
                )}
                {firstCart.cart.cartTotal > 0 ? (
                  <div className="sum_total">
                    <p>
                      合計
                      <span>
                        NT${' '}
                        {firstCart.cart.cartTotal -
                          (firstCart.cart.cartTotal -
                            Math.round(
                              firstCart.cart.cartTotal * couponCount
                            )) +
                          freight}
                      </span>
                    </p>
                  </div>
                ) : (
                  <div className="sum_total">
                    <p>
                      合計
                      <span>NT$ {secondCart.cart.cartTotal}</span>
                    </p>
                  </div>
                )}
              </div>
              <div className="next_page_btn">
                <button className="btn_next" onClick={handleSubmit}>
                  <p>前往結帳</p>
                </button>
              </div>
            </div>
          </div>
        </section>
      </form>
    </section>
  )
}

export default Checkout
