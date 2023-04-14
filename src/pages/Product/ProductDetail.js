import '../../styles/Product/productDetail.scss'
import { Link, useParams, useLocation, useNavigate } from 'react-router-dom'
import { ReactComponent as CartIcon } from '../../images/svg/cart.svg'
import { Modal, Button } from 'react-bootstrap'
import {
  FaHome,
  FaAngleRight,
  FaMinus,
  FaPlus,
  FaRegHeart,
  FaMusic,
  FaInfoCircle,
  FaShippingFast,
  FaComment,
  FaShoppingBag,
  FaHeart,
  FaCheckCircle,
} from 'react-icons/fa'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { useCart } from '../../utils/useCart'
import { useAuth } from '../../hooks/useAuth'
import { Toast } from '@douyinfe/semi-ui'

import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import OwlCarousel from 'react-owl-carousel'
import 'owl.carousel/dist/assets/owl.carousel.css'
import 'owl.carousel/dist/assets/owl.theme.default.css'

function ProductDetail(props) {
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
  const { productId } = useParams()
  const [productData, setProductData] = useState([])
  const [productImg, setProductImg] = useState([])
  const [detailProductColor, setDetailProductColor] = useState([])
  const [counter, setCounter] = useState(1)
  const [productComment, setProductComment] = useState([])
  const [productRand, setProductRand] = useState([])
  const [showActive, setShowActive] = useState('')
  const [productColorBtn, setCartProductColorBtn] = useState('')
  // 收藏
  const [like, setLike] = useState(false)
  const { auth } = useAuth()

  useEffect(() => {
    async function getLike() {
      let response = await axios.get(
        `http://localhost:3001/users/user_like_get/${productId}`,
        { withCredentials: true }
      )
      if (Array.isArray(response.data) && response.data.length > 0) {
        setLike(true)
      } else {
        setLike(false)
      }
    }
    getLike()
  }, [productId])

  //加入收藏
  async function addLike(pid) {
    await axios.post(
      `http://localhost:3001/users/user_like_add`,
      { product_id: pid },
      { withCredentials: true }
    )

    setLike(true)
  }
  // 取消收藏
  async function deleteLike(pid) {
    await axios.delete(`http://localhost:3001/users/user_like_delete/${pid}`, {
      withCredentials: true,
    })

    setLike(false)
  }

  const navigate = useNavigate()
  const { state } = useLocation()
  const { addItem } = useCart()

  const pickColorBtn = (itemcolor) => {
    setCartProductColorBtn(itemcolor)
  }
  //productData
  useEffect(() => {
    async function getData() {
      let response = await axios.get(
        `http://localhost:3001/product/${productId}`
      )
      setProductData(response.data)
    }
    getData()
  }, [productId])

  //productImg
  useEffect(() => {
    async function getData() {
      let response = await axios.get(
        `http://localhost:3001/product/product_img/${productId}`
      )
      setProductImg(response.data)
    }
    getData()
  }, [productId])

  // slide 設定
  const settings = {
    arrows: false,
    dots: true,
    dotsClass: 'slick-dots slick-thumb',
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  }

  //productColor
  useEffect(() => {
    async function getData() {
      let response = await axios.get(
        `http://localhost:3001/product/product_color_detail/${productId}`
      )
      setDetailProductColor(response.data)
    }
    getData()
  }, [productId])

  //productComment
  useEffect(() => {
    async function getProductComment() {
      let response = await axios.get(
        `http://localhost:3001/product/${productId}/comment`
      )
      setProductComment(response.data)
    }
    getProductComment()
  }, [productId])

  //productRand
  useEffect(() => {
    async function getProductRand() {
      let response = await axios.get(`http://localhost:3001/randproduct`)
      setProductRand(response.data)
    }
    getProductRand()
  }, [])

  //cart
  // 對話盒使用
  const [show, setShow] = useState(false)
  // 對話盒中的商品
  const [productColor, setProductColor] = useState([])
  const [test, setTest] = useState('')
  const [productName, setProductName] = useState('')
  const [productPrice, setProductPrice] = useState('')
  const [productSubjectImg, setProductSubjectImg] = useState('')
  const [cartProduct, setCartProduct] = useState('')
  const [cartProductColor, setCartProductColor] = useState('')
  const [active, setActive] = useState('')

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const showModal = (name, id, price, image, cartItem) => {
    setProductName(name)
    setTest(id)
    setProductPrice(price)
    setProductSubjectImg(image)
    setCartProduct(cartItem)
    handleShow()
  }

  const pickColor = (itemcolor) => {
    setCartProductColor(itemcolor)
  }
  //cart useEffect
  useEffect(() => {
    async function getProductColor() {
      let response = await axios.get(
        `http://localhost:3001/product/cart/product_color_detail/${test}`
      )
      setProductColor(response.data)
    }
    getProductColor()
  }, [test])

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
              <Link to="/product" className="productDetail_link">
                購物專區
              </Link>
              <FaAngleRight className="productDetail_header_icon" />
              {/* 帶商品名稱進來 */}
              {productData.map((v, i) => {
                return <p key={v.id}>{v.product_name}</p>
              })}
            </div>
          </div>
        </div>
      </section>
      {/* productDetail */}
      <section>
        <div className="container">
          <div className="productDetail_content main_color">
            <div className="productDetail_title row">
              <div className="productDetail_left col-lg-6">
                <div className="left_top">
                  <div className="product_img">
                    <Slider {...settings}>
                      {productImg.map((v, i) => {
                        return (
                          <img
                            key={v.id}
                            src={`${process.env.REACT_APP_NODE_URL}/public/upload/product/${v.src}`}
                            className="object-fill large_img"
                            alt={v.src}
                            role="button"
                          />
                        )
                      })}
                    </Slider>
                  </div>
                </div>
              </div>

              {productData.map((v, i) => {
                return (
                  <div key={v.id} className="productDetail_right col-lg-6">
                    <h4>{v.product_name}</h4>
                    <p className="productDetail_right_info ">
                      {v.Introduction}
                    </p>
                    <p>售價</p>
                    <h3 className="three_color">NT$ {v.product_price}</h3>
                    <p>顏色</p>
                    <div className="color_btn_group ">
                      {detailProductColor.map((v, i) => {
                        return (
                          <button
                            id={v.color_id}
                            key={v.id}
                            className={
                              showActive === v.color_id
                                ? 'color_btn_active '
                                : ' color_btn btn'
                            }
                            onClick={() => {
                              const itemcolor = { ...v }
                              pickColorBtn(itemcolor)
                              setShowActive(v.color_id)
                            }}
                          >
                            {v.color_name}
                          </button>
                        )
                      })}
                    </div>
                    <div className="productDetail_count">
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
                          counter < v.inventory
                            ? setCounter(counter + 1)
                            : setCounter(counter)
                        }}
                        className="count_symbol count_btn_right"
                      >
                        <FaPlus />
                      </button>
                    </div>
                    <div className="buy_btn_group ">
                      <button
                        className="btn buy_btn"
                        onClick={() => {
                          // 商品原本無數量屬性(quantity)，要先加上, 淺拷貝
                          const item = {
                            ...state,
                            product_price: 0,
                            set_price: v.product_price,
                            quantity: counter,
                            completed: false,
                            ...productColorBtn,
                          }
                          // 注意: 重覆加入會自動+1產品數量
                          addItem(item)
                          Toast.success(`成功加入購物車`, { duration: 1500 })
                        }}
                      >
                        加入購物車
                      </button>
                      {auth.isAuth ? (
                        <button
                          className="btn buy_btn"
                          onClick={() => {
                            // 商品原本無數量屬性(quantity)，要先加上, 淺拷貝
                            const item = {
                              ...state,
                              product_price: 0,
                              set_price: v.product_price,
                              quantity: counter,
                              ...productColorBtn,
                            }
                            // 注意: 重覆加入會自動+1產品數量
                            addItem(item)
                            navigate('/cart', { replace: true })
                          }}
                        >
                          立即購買
                        </button>
                      ) : (
                        <button
                          className="btn buy_btn"
                          onClick={() => {
                            Toast.warning('尚未登入')
                          }}
                        >
                          立即購買
                        </button>
                      )}
                    </div>
                    <p className="inventory">供貨狀況: {v.inventory}</p>
                    {/* 收藏 */}
                    <div className="collect">
                      {auth.isAuth ? (
                        <button className="collect_btn">
                          {like ? (
                            <FaHeart
                              className="collect_fill_icon"
                              onClick={() => {
                                deleteLike(productData[0].id)
                              }}
                            />
                          ) : (
                            <FaRegHeart
                              name="product_id"
                              className="collect_icon"
                              onClick={() => {
                                addLike(productData[0].id)
                              }}
                            />
                          )}
                        </button>
                      ) : (
                        <button className="collect_btn">
                          <FaRegHeart
                            name="product_id"
                            className="collect_icon"
                          />
                        </button>
                      )}

                      <p>加入收藏</p>
                    </div>
                  </div>
                )
              })}
            </div>
            <div className="productDetail_list input-group">
              <ul className="list-unstyled">
                <li className="productDetail_list_start">
                  <a href="#product_info" className="main_color">
                    商品介紹
                  </a>
                </li>
                <li className="productDetail_list_middle">
                  <a href="#spec_info" className="main_color">
                    規格說明
                  </a>
                </li>
                <li className="productDetail_list_middle">
                  <a href="#method" className="main_color">
                    運送方式
                  </a>
                </li>
                <li className="productDetail_list_end">
                  <a href="#product_comment" className="main_color">
                    商品評論
                  </a>
                </li>
              </ul>
            </div>
            <div className="productDetail_info" id="product_info">
              {productData.map((v, i) => {
                const productInfo = `${v.information}`
                return (
                  <div key={v.id} className="productDetail_product_info">
                    <div className="product_info_title">
                      <FaMusic className="product_info_icon" />
                      <p className="title_text">商品介紹</p>
                    </div>
                    <div className="product_info_text text-white">
                      <div dangerouslySetInnerHTML={{ __html: productInfo }} />
                    </div>
                  </div>
                )
              })}
              {productData.map((v, i) => {
                const productSpec = `${v.spec_decration}`
                return (
                  <div key={v.id} className="spec_info" id="spec_info">
                    <div className="product_info_title">
                      <FaInfoCircle className="product_info_icon" />
                      <p className="title_text">規格說明</p>
                    </div>
                    <div className="info_text_middle text-white">
                      <ul>
                        <div
                          dangerouslySetInnerHTML={{ __html: productSpec }}
                        />
                      </ul>
                    </div>
                  </div>
                )
              })}
              <div className="method" id="method">
                <div className="product_info_title">
                  <FaShippingFast className="product_info_icon" />
                  <p className="title_text">運送方式</p>
                </div>
                <div className="info_text_middle text-white">
                  <ul>
                    <li>到店取貨</li>
                    <li>宅配</li>
                  </ul>
                </div>
              </div>
              <div className="product_comment" id="product_comment">
                <div className="product_info_title">
                  <FaComment className="product_info_icon" />
                  <p className="title_text">商品評論</p>
                </div>
                {productComment.map((v, i) => {
                  return (
                    <div key={v.id} className="product_comment_user row">
                      <div className="product_comment_user_left col-md-2">
                        <img
                          src={`${process.env.REACT_APP_NODE_URL}/public/upload/user/${v.user_img}`}
                          className="user_comment_img"
                          alt={v.user_img}
                        />
                        <p className="text-white">{v.user_name}</p>
                        <p className="text-white">{v.create_time}</p>
                      </div>
                      <div className="product_comment_user_right text-white col-md-10">
                        <p>{v.comment}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* 加入購物車 */}
      <Modal
        className="product_modal_addcart"
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            <div className="row">
              <div className="col-4">
                <img
                  src={`${process.env.REACT_APP_NODE_URL}/public/upload/product-subject/${productSubjectImg}`}
                  className="card-img-top card_img"
                  alt={productSubjectImg}
                />
              </div>
              <div className="col-7">
                <div className="modal_product_name">
                  <p>{productName}</p>
                </div>
                <div className="modal_product_price">
                  <p>NT$ {productPrice}</p>
                </div>
              </div>
            </div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="modal_font">商品顏色</p>
          <div className="row">
            {productColor.map((colors, index) => {
              return (
                <>
                  <div className="col-3 modal_product_color">
                    <div
                      id={colors.color_id}
                      className={
                        active && active === colors.color_id
                          ? 'modal_color_active modal_btn_style'
                          : !active && active === colors.color_id
                          ? 'modal_color_active modal_btn_style'
                          : 'modal_btn_color modal_btn_style'
                      }
                      key={colors.product_id}
                      role="button"
                      onClick={() => {
                        const itemcolor = { ...colors }
                        pickColor(itemcolor)
                        setActive(colors.color_id)
                      }}
                      onKeyUp={() => {
                        setActive('')
                      }}
                    >
                      <p>{colors.color_name}</p>
                    </div>
                    {active === colors.color_id ? (
                      <div>
                        <FaCheckCircle className="modal_active_icon" />
                      </div>
                    ) : (
                      ''
                    )}
                  </div>
                </>
              )
            })}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            className="modal_footer_btn modal_addcart_btn"
            onClick={() => {
              // 商品原本無數量屬性(quantity)，要先加上, 淺拷貝
              const item = {
                ...cartProduct,
                product_price: 0,
                set_price: productPrice,
                quantity: 1,
                completed: false,
                ...cartProductColor,
              }
              // 注意: 重覆加入會自動+1產品數量
              addItem(item)
              handleClose()
            }}
          >
            <p>加入購物車</p>
          </Button>
          <Button
            className="modal_footer_btn modal_buycart_btn"
            onClick={() => {
              const items = {
                ...cartProduct,
                product_price: 0,
                set_price: productPrice,
                quantity: 1,
                completed: false,
                ...cartProductColor,
              }
              // 注意: 重覆加入會自動+1產品數量
              addItem(items)
              handleClose()
              navigate('/cart', { replace: true })
            }}
          >
            <p>立即購買</p>
          </Button>
        </Modal.Footer>
      </Modal>
      {/* 推薦商品 */}
      <section className="recommend_banner">
        <div className="container">
          <div className="productDetail_recommend">
            <div className="product_recommend">
              <div className="product_info_title main_color">
                <FaShoppingBag className="product_info_icon" />
                <p className="title_text">推薦商品</p>
              </div>
              <div className="container">
                <div className="product_detail_list row ">
                  {productRand.length && (
                    <OwlCarousel className="owl-theme main_color" {...options}>
                      {productRand.map((v, i) => {
                        return (
                          <div className="card product_card_detail item">
                            <img
                              src={`${process.env.REACT_APP_NODE_URL}/public/upload/product-subject/${v.subject_img}`}
                              className="card-img-top card_img_detail"
                              alt={v.subject_img}
                            />
                            <div className="card-body product_card_body_detail">
                              <button
                                onClick={() => {
                                  navigate(`/product/productdetail/${v.id}`, {
                                    state: { ...v },
                                  })
                                  window.location.reload()
                                }}
                                className="card-title product_card_title_detail main_color"
                              >
                                {v.product_name}
                              </button>
                              <div className="product_card_bottom_detail">
                                <p className="card-text product_card_price_detail">
                                  NT$ {v.product_price}
                                </p>
                                <button
                                  className="btn product_btn_cart"
                                  onClick={() => {
                                    const cartItem = { ...v }
                                    showModal(
                                      v.product_name,
                                      v.id,
                                      v.product_price,
                                      v.subject_img,
                                      cartItem
                                    )
                                  }}
                                >
                                  <CartIcon className="cart" />
                                </button>
                              </div>
                            </div>
                          </div>
                        )
                      })}
                    </OwlCarousel>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default ProductDetail
