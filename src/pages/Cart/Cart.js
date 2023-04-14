import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../../utils/useCart'
import { useSecondCart } from '../../utils/useSecondCart'
// react-multi-carousel
import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'
// orderTake
import orderTake from '../../configs/data/orderTake.json'
import { Collapse, NavDropdown } from 'react-bootstrap'
import '../../styles/Cart/cart.scss'
import { ReactComponent as CartIcon } from '../../images/svg/cart.svg'
import {
  FaMinus,
  FaPlus,
  FaTimes,
  FaInfoCircle,
  FaAngleLeft,
  FaAngleRight,
  FaGift,
} from 'react-icons/fa'
import axios from 'axios'

function Cart(props) {
  const firstCart = useCart()
  const secondCart = useSecondCart()

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 2,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 2,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  }

  let navigate = useNavigate()
  const [open, setOpen] = useState(false)

  // console.log('----- cart------', firstCart.cart)
  // 對話盒中的商品
  const [update, setUpdate] = useState('')
  const [test, setTest] = useState('')
  const [cartColor, setCartColor] = useState('')
  const [active, setActive] = useState('')
  const [productColor, setProductColor] = useState([])
  // product_add cart state
  const [addProductState, setAddProductState] = useState(false)
  // course_add cart state
  const [addCourseState, setAddCourseState] = useState(false)
  const [agree, setAgree] = useState(true)
  // all_product
  const [allState, setAllState] = useState(false)
  // all_course
  const [allCourseState, setAllCourseState] = useState(false)
  // 對話盒中的商品
  const addModal = (addId) => {
    setTest(addId)
  }

  // product_color
  useEffect(() => {
    // 在 component 初始化的時候跑一次
    // 通常會把去跟後端要資料的動作放在這裡
    async function getProductColor() {
      let response = await axios.get(
        `http://localhost:3001/product/product_color_detail/${test}`,
        { withCredentials: true }
      )
      setProductColor(response.data)
    }
    getProductColor()
  }, [test])

  const showModal = (id, productId, colorId) => {
    setUpdate(id)
    setTest(productId)
    setCartColor(colorId)
  }

  // product_add
  const [productAdd, setProductAdd] = useState([])
  const [addActive, setAddActive] = useState([])
  const [addProductId, setAddProductId] = useState('')
  const [addColorId, setAddColorId] = useState('')
  const [addColorName, setAddColorName] = useState('')
  const [counter, setCounter] = useState(1)
  const [cartProductColor, setCartProductColor] = useState('')
  // product_price
  const [productPrice, setProductPrice] = useState([])
  // course_price
  const [coursePrice, setCoursePrice] = useState([])
  // all
  const [pickIotalItems, setPickIotalItems] = useState(0)
  const [pickIotalCourse, setPickIotalCourse] = useState(0)

  const cartModal = (cId, name) => {
    setAddColorId(cId)
    setAddColorName(name)
  }

  const cartPickColor = (itemcolor) => {
    setCartProductColor(itemcolor)
  }

  // 加購商品
  useEffect(() => {
    async function getProductAdd() {
      let response = await axios.get(
        'http://localhost:3001/cart/cart_add/product'
      )
      setProductAdd(response.data)
    }
    getProductAdd()
  }, [])

  // 加購課程
  const [courseAdd, setCourseAdd] = useState([])

  useEffect(() => {
    async function getCourseAdd() {
      let response = await axios.get(
        'http://localhost:3001/cart/cart_add/courses'
      )
      setCourseAdd(response.data)
    }
    getCourseAdd()
  }, [])

  // 配送方式
  const [takeMethod, setTakeMethod] = useState([])
  const toggleHandler = (method) => () => {
    setTakeMethod((state) => ({
      [method.take_method]: state[method.take_method]
        ? {}
        : {
            take_method: method.take_method,
            take_method_name: method.take_method_name,
            take_method_price: method.take_method_price,
          },
    }))
  }
  const takeMethodData = Object.values(takeMethod)

  // useEffect(() => {
  //   console.log('---- 161 ----', takeMethod)
  // }, [takeMethod])

  // coupon
  const [couponInfo, setCouponInfo] = useState([])
  const [couponSN, setCouponSN] = useState('')
  const [useCoupon, setUseCoupon] = useState('')

  // coupon sn
  useEffect(() => {
    async function getCouponInfo() {
      let response = await axios.get(
        `http://localhost:3001/couponcart/${couponSN}`,
        { withCredentials: true }
      )
      setCouponInfo(response.data)
    }
    getCouponInfo()
  }, [couponSN])

  // CouponID
  const couponID = couponInfo.length === 0 ? 10 : couponInfo[0].coupon_id
  // 折扣 (xx折)
  const couponDiscount = couponInfo.length === 0 ? 0 : couponInfo[0].discount
  // 折扣 (xx/100)
  const couponCount = couponInfo.length === 0 ? 1 : couponInfo[0].discount / 100
  // 運費
  const takePrice =
    takeMethodData.length === 0 ? 0 : takeMethodData[0].take_method_price

  // console.log('--- 172 cinfo -----', couponID)
  // console.log('---- 173 Firstcart -----', firstCart.cart)
  // console.log('---- 174 secondcart -----', secondCart.cart)
  // console.log(
  //   '----- 178 allState, allCourseState ------',
  //   allState,
  //   allCourseState
  // )

  return (
    <>
      <section className="shooping_cart">
        <div className="container">
          <div className="cart_step">
            <div className="row cart_row">
              <div className="col-lg-2 col-4 step step_active">
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
          {/* product-cart */}
          <section className="product_cart">
            <section className="shoppping_list">
              <h1 className="cart_title main_color">PRODUCT 商品購物車</h1>
              <div className="cart_step_title main_color">
                <div className="circle">
                  <span>1</span>
                </div>
                <p>確認商品購物清單</p>
              </div>
              <div className="cart_table">
                <div className="thead">
                  <div className="row">
                    <div className="col-7">
                      <p className="prdocut_title">PRODUCT</p>
                    </div>
                    <div className="col-2">
                      <p className="price_title">PRICE</p>
                    </div>
                    <div className="col-3">
                      <p className="amount_title">QUANTITY</p>
                    </div>
                  </div>
                </div>
                <div className="tbody">
                  {/* 01 */}
                  {firstCart.cart.items.map((v, i) => {
                    return (
                      <div key={v.id} className="item">
                        <div className="check_box">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            checked={v.completed}
                            onChange={() => {
                              const newItems = firstCart.items.map((v2) => {
                                // 物件的淺拷貝
                                return { ...v2 }
                              })
                              newItems[i].completed = !newItems[i].completed
                              firstCart.updateItem({
                                id: v.id,
                                completed: newItems[i].completed,
                              })
                              setAddProductState(newItems[i].completed)
                              firstCart.updateItem({
                                id: v.id,
                                product_price:
                                  newItems[i].completed === true
                                    ? v.set_price
                                    : 0,
                              })
                              if (newItems[i].completed === true) {
                                setProductPrice(v.set_price)
                              }

                              if (newItems[i].completed === true) {
                                setPickIotalItems(
                                  pickIotalItems + newItems[i].quantity
                                )
                              } else if (newItems[i].completed === false) {
                                setPickIotalItems(
                                  pickIotalItems - newItems[i].quantity >= 1
                                    ? pickIotalItems - newItems[i].quantity
                                    : 0
                                )
                              }
                            }}
                          />
                        </div>
                        <div className="cart_product_img">
                          <img
                            src={`${process.env.REACT_APP_NODE_URL}/public/upload/product-subject/${v.subject_img}`}
                            alt={v.subject_img}
                          />
                        </div>
                        <div className="product_info">
                          <h2 className="main_color">{v.product_name}</h2>
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
                        <div className="product_spec">
                          <div className="spec_check">
                            <p>規格</p>
                            <small>{v.spec_name}</small>
                          </div>
                          <div className="spec_choose">
                            <NavDropdown
                              title={v.color_name}
                              className="color_choose"
                              id="basic-nav-dropdown"
                              onClick={() => {
                                showModal(v.id, v.product_id, v.color_id)
                              }}
                            >
                              <div className="row cart_modal_row">
                                <p className="shoppingcart_item_color">
                                  商品顏色
                                </p>
                                {productColor.map((colors, index) => {
                                  return (
                                    <>
                                      <div className="col-4 shoppingcart_color_choose">
                                        <NavDropdown.Item
                                          id={colors.color_id}
                                          className={
                                            active &&
                                            cartColor === colors.color_id
                                              ? 'modal_color_active modal_btn_style'
                                              : !active &&
                                                cartColor === colors.color_id
                                              ? 'modal_color_active modal_btn_style'
                                              : 'modal_btn_color modal_btn_style'
                                          }
                                          key={test}
                                          onClick={() => {
                                            setActive(colors.color_id)
                                            firstCart.updateItem({
                                              id: update,
                                              color_id: colors.color_id,
                                              color_name: colors.color_name,
                                            })
                                          }}
                                          onkeyup={() => {
                                            setActive('')
                                          }}
                                        >
                                          {colors.color_name}
                                        </NavDropdown.Item>
                                      </div>
                                    </>
                                  )
                                })}
                              </div>
                            </NavDropdown>
                          </div>
                        </div>
                        <div className="product_price">
                          <p>NT$ {v.set_price}</p>
                        </div>
                        <div className="quantity">
                          <button
                            type="button"
                            id={v.id}
                            onClick={() => {
                              const newItems = firstCart.items.map((v2) => {
                                // 物件的淺拷貝
                                return { ...v2 }
                              })
                              firstCart.minusOne(v.id)
                              if (newItems[i].completed === true) {
                                for (let j = 1; j < newItems[i].quantity; j++) {
                                  setPickIotalItems(pickIotalItems - j)
                                }
                              }
                              // setPickIotalItems(
                              //   pickIotalItems >= 1
                              //     ? pickIotalItems - 1
                              //     : pickIotalItems
                              // )
                            }}
                            className="cart_btn btn_left"
                          >
                            <FaMinus className="quantity_icon" />
                          </button>
                          <input type="text" value={v.quantity} />
                          <button
                            type="button"
                            onClick={() => {
                              firstCart.plusOne(v.id)
                              const newItems = firstCart.items.map((v2) => {
                                // 物件的淺拷貝
                                return { ...v2 }
                              })
                              if (newItems[i].completed === true) {
                                setPickIotalItems(pickIotalItems + 1)
                              }
                            }}
                            className="cart_btn btn_right"
                          >
                            <FaPlus className="quantity_icon" />
                          </button>
                        </div>
                        <div className="operate">
                          <button
                            type="button"
                            onClick={() => {
                              firstCart.removeItem(v.id)
                            }}
                            className="btn_style"
                          >
                            <FaTimes className="btn_fatimes" />
                          </button>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </section>
            <section className="physical_production">
              <div className="cart_table">
                <div className="thead">
                  <div className="thead_flex">
                    <p>商品配送</p>
                    <button className="info_btn">
                      <FaInfoCircle className="info_icon" />
                    </button>
                  </div>
                </div>
                <div className="tbody">
                  <div className="row">
                    {orderTake.map((method) => {
                      return (
                        <div
                          className="col-md-3 method_wrap"
                          key={method.take_method}
                        >
                          <div className="check_box">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              onChange={toggleHandler(method)}
                              checked={takeMethod[method.take_method]}
                              id="flexCheckDefault"
                            />
                          </div>
                          <div className="method_txet">
                            <p>{method.take_method_name}</p>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>
            </section>
            <section className="shooping_total">
              <div className="total_wrap">
                <div className="row">
                  <div className="col-md-8 special_offer">
                    <div className="cart_table">
                      <div className="thead">
                        <p>加購商品</p>
                      </div>
                      <div className="tbody special_offer_tbody">
                        <div className="row cart_add_item">
                          <Carousel responsive={responsive}>
                            {productAdd.map((cartadd, index) => {
                              return (
                                <div
                                  className="row cart_add_item"
                                  key={cartadd.id}
                                >
                                  <div className="col-md-4 product_quantity">
                                    <img
                                      src={`${process.env.REACT_APP_NODE_URL}/public/upload/product-subject/${cartadd.subject_img}`}
                                      className="img-fluid"
                                      alt={cartadd.subject_img}
                                    />
                                  </div>
                                  <div className="col-md-8 add_product">
                                    <div className="add_product_name">
                                      <h1>{cartadd.product_name}</h1>
                                    </div>
                                    <div
                                      className="add_prosuct_spec"
                                      role="button"
                                    >
                                      <NavDropdown
                                        title={
                                          !addProductId
                                            ? '選擇商品顏色'
                                            : addProductState === false
                                            ? '選擇商品顏色'
                                            : addProductState === true &&
                                              addProductId ===
                                                cartadd.product_id
                                            ? addColorName
                                            : '選擇商品顏色'
                                        }
                                        className="color_choose"
                                        id={cartadd.product_id}
                                        onClick={() => {
                                          addModal(cartadd.product_id)
                                          setAddProductState(true)
                                          // console.log(
                                          //   '---- 492 pid ----',
                                          //   cartadd.product_id
                                          // )
                                        }}
                                      >
                                        <div className="row cart_modal_row">
                                          <p className="shoppingcart_item_color">
                                            商品顏色
                                          </p>
                                          {productColor.map((colors, index) => {
                                            return (
                                              <>
                                                <div
                                                  className="col-4 shoppingcart_color_choose"
                                                  id={colors.product_id}
                                                >
                                                  <NavDropdown.Item
                                                    key={colors.product_id}
                                                    className={
                                                      addActive &&
                                                      addColorId ===
                                                        colors.color_id
                                                        ? 'modal_color_active modal_btn_style'
                                                        : !addActive &&
                                                          addColorId ===
                                                            colors.color_id
                                                        ? 'modal_color_active modal_btn_style'
                                                        : 'modal_btn_color modal_btn_style'
                                                    }
                                                    onClick={() => {
                                                      const itemcolor = {
                                                        ...colors,
                                                      }
                                                      setAddActive(
                                                        colors.color_id
                                                      )
                                                      setAddProductId(
                                                        colors.product_id
                                                      )
                                                      cartModal(
                                                        colors.color_id,
                                                        colors.color_name
                                                      )
                                                      cartPickColor(itemcolor)
                                                      // console.log(
                                                      //   '----- 535 pid ----',
                                                      //   colors.product_id
                                                      // )
                                                    }}
                                                    onKeyUp={() => {
                                                      setProductColor('')
                                                      setAddActive('')
                                                    }}
                                                  >
                                                    {colors.color_name}
                                                  </NavDropdown.Item>
                                                </div>
                                              </>
                                            )
                                          })}
                                        </div>
                                      </NavDropdown>
                                    </div>
                                    <div className="d-flex align-items-center add_product_price">
                                      <div className="discount_price">
                                        <p>
                                          NT$
                                          {Math.round(
                                            cartadd.product_price *
                                              (cartadd.product_discount / 100)
                                          )}
                                        </p>
                                      </div>
                                      <div className="origin_price">
                                        <p>NT$ {cartadd.product_price}</p>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-12 add_product_bottom">
                                    <div className="quantity quantity_width">
                                      <button
                                        type="button"
                                        onClick={() => {
                                          setCounter(
                                            counter > 1 ? counter - 1 : 1
                                          )
                                        }}
                                        className="cart_btn btn_left"
                                      >
                                        <FaMinus className="quantity_icon" />
                                      </button>
                                      <input type="text" value={counter} />
                                      <button
                                        type="button"
                                        onClick={() => {
                                          setCounter(counter + 1)
                                        }}
                                        className="cart_btn btn_right"
                                      >
                                        <FaPlus className="quantity_icon" />
                                      </button>
                                    </div>
                                    <div
                                      className="add_cart_btn"
                                      role="button"
                                      onClick={() => {
                                        // 商品原本無數量屬性(quantity)，要先加上, 淺拷貝
                                        const addProductPrice = Math.round(
                                          cartadd.product_price *
                                            (cartadd.product_discount / 100)
                                        )
                                        const addProductObject = {
                                          ...cartadd,
                                          product_price: 0,
                                          set_price: addProductPrice,
                                          origin_product_price:
                                            cartadd.product_price,
                                          add_product: 1,
                                          completed: false,
                                        }

                                        const item = {
                                          ...addProductObject,
                                          quantity: counter,
                                          ...cartProductColor,
                                        }
                                        setAddProductState(false)
                                        setAddProductId('')
                                        // 注意: 重覆加入會自動+1產品數量
                                        firstCart.addItem(item)
                                      }}
                                    >
                                      <CartIcon className="add_cart_icon" />
                                      <p>加購</p>
                                    </div>
                                  </div>
                                </div>
                              )
                            })}
                          </Carousel>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4 price_total">
                    <div className="cart_table cart_table_height">
                      <div className="thead">
                        <p>訂單金額</p>
                      </div>
                      <div className="tbody cart_tbody">
                        <div className="cart_price_wrap">
                          <div className="cart_price_text">
                            <div className="text-start">
                              <p>數量</p>
                              <p>小計</p>
                              <p>運費</p>
                            </div>
                            <div className="text-end">
                              <p className="font_large">
                                {allState === true
                                  ? firstCart.cart.totalItems
                                  : pickIotalItems}
                              </p>
                              <p className="font_large">
                                NT$ {firstCart.cart.cartTotal}
                              </p>
                              <p className="font_large">NT$ {takePrice}</p>
                            </div>
                          </div>
                          <div className="use_coupon_wrap">
                            <div className="cart_coupon">
                              <div
                                className="coupon_btn"
                                role="button"
                                onClick={() => setOpen(!open)}
                                aria-controls="collapse-text"
                                aria-expanded={open}
                              >
                                <div className="cart_price_text">
                                  <p>優惠代碼</p>
                                  {!useCoupon ? (
                                    <p className="font_large"></p>
                                  ) : (
                                    <p className="font_large">{useCoupon}</p>
                                  )}
                                </div>
                              </div>
                              <div className="collapse_wrap">
                                <Collapse in={open}>
                                  <div
                                    id="collapse-text"
                                    className="cart_collapse row"
                                  >
                                    <div className="col-8">
                                      <input
                                        type="text"
                                        placeholder="請輸入優惠序號"
                                        value={couponSN}
                                        onChange={(e) =>
                                          setCouponSN(e.target.value)
                                        }
                                      />
                                    </div>
                                    <div className="col-4 coupon_btn">
                                      <button
                                        className="coupon_use_btn"
                                        onClick={() => {
                                          setUseCoupon(couponSN)
                                          setOpen(!open)
                                        }}
                                      >
                                        <p>Coupon</p>
                                      </button>
                                    </div>
                                  </div>
                                </Collapse>
                              </div>
                            </div>
                            <div className="cart_dicount">
                              <div className="text-start">
                                <p>優惠折扣</p>
                              </div>
                              <div className="text-end">
                                {couponCount > 0 && couponCount < 1 ? (
                                  <p className="font_large">
                                    - NT${' '}
                                    {firstCart.cart.cartTotal -
                                      Math.round(
                                        firstCart.cart.cartTotal * couponCount
                                      )}
                                  </p>
                                ) : (
                                  <p className="font_large"></p>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </section>
          {/* courses-cart */}
          <section className="courses_cart">
            <section className="shoppping_list">
              <h1 className="cart_title main_color">COURSES 課程購物車</h1>
              <div className="cart_step_title main_color">
                <div className="circle">
                  <span>1</span>
                </div>
                <p>確認課程購物清單</p>
              </div>
              <div className="cart_table">
                <div className="thead">
                  <div className="row">
                    <div className="col-8">
                      <p className="prdocut_title">COURSES</p>
                    </div>
                    <div className="col-4">
                      <p className="price_title">PRICE</p>
                    </div>
                  </div>
                </div>
                <div className="tbody">
                  {/* 01 */}
                  {secondCart.cart.items.map((v, i) => {
                    return (
                      <div className="item">
                        <div className="check_box">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            value=""
                            id="flexCheckDefault"
                            checked={v.completed}
                            onChange={() => {
                              const newItems = secondCart.items.map((v2) => {
                                // 物件的淺拷貝
                                return { ...v2 }
                              })
                              newItems[i].completed = !newItems[i].completed
                              secondCart.updateItem({
                                id: v.id,
                                completed: newItems[i].completed,
                              })
                              setAddCourseState(newItems[i].completed)
                              secondCart.updateItem({
                                id: v.id,
                                product_price:
                                  newItems[i].completed === true
                                    ? v.class_price
                                    : 0,
                              })
                              if (newItems[i].completed === true) {
                                setCoursePrice(v.class_price)
                              }

                              if (newItems[i].completed === true) {
                                setPickIotalCourse(
                                  pickIotalCourse + newItems[i].quantity
                                )
                              } else if (newItems[i].completed === false) {
                                setPickIotalCourse(
                                  pickIotalCourse - newItems[i].quantity
                                )
                              }
                            }}
                          />
                        </div>
                        <div className="cart_product_img">
                          <img
                            src={`${process.env.REACT_APP_NODE_URL}/public/upload/courses/${v.class_img}`}
                            alt={v.class_img}
                          />
                        </div>
                        <div className="product_info">
                          <h2 className="main_color">{v.class_name}</h2>
                        </div>
                        <div className="product_price">
                          <p>NT$ {v.class_price}</p>
                        </div>
                        <div className="operate">
                          <button
                            type="button"
                            onClick={() => {
                              secondCart.removeItem(v.id)
                            }}
                            className="btn_style"
                          >
                            <FaTimes className="btn_fatimes" />
                          </button>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </section>
            <section className="shooping_total">
              <div className="total_wrap">
                <div className="row">
                  <div className="col-md-8 special_offer">
                    <div className="cart_table">
                      <div className="thead">
                        <p>加購課程</p>
                      </div>
                      <div className="tbody special_offer_tbody">
                        <div className="row cart_add_item">
                          <Carousel responsive={responsive}>
                            {courseAdd.map((v, index) => {
                              return (
                                <div className="row cart_add_item" key={v.id}>
                                  <div className="col-md-4 product_quantity">
                                    <img
                                      className="img_fluid"
                                      src={`${process.env.REACT_APP_NODE_URL}/public/upload/courses/${v.class_img}`}
                                      alt={v.class_img}
                                    />
                                  </div>
                                  <div className="col-md-8 add_product">
                                    <div className="add_product_name">
                                      <h1>{v.class_name}</h1>
                                    </div>
                                    <div className="row courses_wrap">
                                      <div className="col-7">
                                        <div className="origin_price"></div>
                                        <div className="discount_price">
                                          <p>NT${v.class_price}</p>
                                        </div>
                                      </div>
                                      <div className="col-5 courses_origin_price">
                                        <div
                                          className="add_cart_btn"
                                          role="button"
                                        >
                                          <CartIcon className="add_cart_icon" />
                                          <p>加購</p>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              )
                            })}
                          </Carousel>
                        </div>
                      </div>
                    </div>
                    <div className="carousel_btn left_button" role="button">
                      <FaAngleLeft />
                    </div>
                    <div className="carousel_btn right_button" role="button">
                      <FaAngleRight />
                    </div>
                  </div>
                  <div className="col-md-4 price_total">
                    <div className="cart_table cart_table_height">
                      <div className="thead">
                        <p>訂單金額</p>
                      </div>
                      <div className="tbody cart_tbody">
                        <div className="cart_price_wrap">
                          <div className="cart_price_text">
                            <div className="text-start">
                              <p>數量</p>
                              <p>小計</p>
                            </div>
                            <div className="text-end">
                              <p className="font_large">
                                {allCourseState === true
                                  ? secondCart.cart.totalItems
                                  : pickIotalCourse}
                              </p>
                              <p className="font_large">
                                NT$ {secondCart.cart.cartTotal}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </section>
        </div>
        <section className="shopping_cart_next sticky-bottom">
          <div className="container">
            <div className="price_checked">
              <div className="product_checkbox">
                <div className="checkbox_group">
                  <div className="checkbox_all">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      checked={allState}
                      onChange={() => {
                        setAllState(!allState)
                        firstCart.cart.items.map((v) => {
                          return firstCart.updateItem({
                            id: v.id,
                            completed: !allState,
                            product_price: !allState ? v.set_price : 0,
                          })
                        })
                        // console.log(!allState)
                      }}
                    />
                    <p>商品全選</p>
                  </div>
                  <div className="checkbox_all">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      checked={allCourseState}
                      onChange={() => {
                        setAllCourseState(!allCourseState)
                        secondCart.cart.items.map((v) => {
                          return secondCart.updateItem({
                            id: v.id,
                            completed: !allCourseState,
                            product_price: !allCourseState ? v.class_price : 0,
                          })
                        })
                        // console.log(!allCourseState)
                      }}
                    />
                    <p>課程全選</p>
                  </div>
                </div>
                <div className="pay_for">
                  <p>
                    結帳商品
                    <span>
                      {console.log('---- 1003 -----', pickIotalCourse)}
                      {allCourseState === true
                        ? secondCart.cart.totalItems
                        : allState === true
                        ? firstCart.cart.totalItems
                        : productPrice > 0
                        ? pickIotalItems
                        : coursePrice > 0
                        ? pickIotalCourse
                        : 0}
                    </span>
                    件
                  </p>
                </div>
              </div>
              <div className="product_total">
                <div className="discount_price">
                  <p>
                    折扣 - NT${' '}
                    {couponCount > 0
                      ? firstCart.cart.cartTotal -
                        Math.round(firstCart.cart.cartTotal * couponCount)
                      : 0}
                  </p>
                </div>
                <div className="sum_total">
                  <p>
                    合計
                    {allState === true ? (
                      <span>
                        NT${' '}
                        {firstCart.cart.cartTotal -
                          (firstCart.cart.cartTotal -
                            Math.round(
                              firstCart.cart.cartTotal * couponCount
                            )) +
                          takePrice}
                      </span>
                    ) : addProductState === true && productPrice > 0 ? (
                      <span>
                        NT${' '}
                        {firstCart.cart.cartTotal -
                          (firstCart.cart.cartTotal -
                            Math.round(
                              firstCart.cart.cartTotal * couponCount
                            )) +
                          takePrice}
                      </span>
                    ) : productPrice === 0 ? (
                      <span>
                        NT${' '}
                        {firstCart.cart.cartTotal -
                          (firstCart.cart.cartTotal -
                            Math.round(
                              firstCart.cart.cartTotal * couponCount
                            )) +
                          takePrice}
                      </span>
                    ) : allCourseState === true ? (
                      <span>NT$ {secondCart.cart.cartTotal}</span>
                    ) : addCourseState === true && coursePrice > 0 ? (
                      <span>NT$ {secondCart.cart.cartTotal}</span>
                    ) : coursePrice === 0 ? (
                      <span>NT$ {secondCart.cart.cartTotal}</span>
                    ) : (
                      <span>NT$ 0</span>
                    )}
                  </p>
                </div>
              </div>
              <div className="terms_shopping">
                <div className="checked_agree">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    checked={agree}
                    id="flexCheckDefault"
                    onChange={() => {
                      setAgree(!agree)
                    }}
                  />
                  <p>
                    同意<a href="/">會員責任規範及個資聲明</a>與
                    <a href="/">商家會員條款</a>
                  </p>
                </div>
                <div className="checked_agree checked_agree_two">
                  <div className="checkbox_style">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      checked={agree}
                      id="flexCheckDefault"
                      onChange={() => {
                        setAgree(!agree)
                      }}
                    />
                  </div>
                  <p>
                    為保障彼此之權益，賣家在收到您的訂單後仍保有決定是否接受訂單及出貨與否之權利
                  </p>
                </div>
              </div>
              <div className="next_page_btn">
                <button
                  className="btn_next"
                  onClick={() => {
                    if (
                      allState === true &&
                      agree === true &&
                      allCourseState === false
                    ) {
                      navigate(`/cart/checkout`, {
                        state: {
                          couponSN,
                          value: [
                            couponID,
                            couponDiscount,
                            takeMethodData[0].take_method,
                            takeMethodData[0].take_method_name,
                            takeMethodData[0].take_method_price,
                          ],
                        },
                      })
                    }
                    if (
                      allCourseState === true &&
                      agree === true &&
                      allState === false
                    ) {
                      navigate(`/cart/checkout`, {
                        state: {
                          couponSN,
                          value: [couponID, couponDiscount],
                        },
                      })
                    }
                  }}
                >
                  <p>前往結帳</p>
                </button>
              </div>
            </div>
          </div>
        </section>
      </section>
    </>
  )
}

export default Cart
