import '../../styles/User/favorite.scss'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { useAuth } from '../../hooks/useAuth'
import { Link } from 'react-router-dom'
import { Modal, Button } from 'react-bootstrap'
import { FaCheckCircle, FaHeart } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../../utils/useCart'
import { FiShoppingCart } from 'react-icons/fi'

function Favorite(props) {
  let navigate = useNavigate()
  const { auth } = useAuth()
  const [favorites, setFavorites] = useState([])
  // 收藏
  const [like, setLike] = useState(false)

  useEffect(() => {
    // console.log('會員資料')
    async function getFavorites() {
      let response = await axios.get(
        `http://localhost:3001/users/user_like/${auth.user.id}`,
        { withCredentials: true }
      )
      setFavorites(response.data)
    }
    getFavorites()
  }, [auth.user.id])

  // 取消收藏
  async function deleteLike(pid) {
    await axios.delete(`http://localhost:3001/users/user_like_delete/${pid}`, {
      withCredentials: true,
    })
    setLike(false)
    navigate('/user/favorite')
  }

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

  const { addItem } = useCart()

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
      <div className="container col-md-10">
        <div className="row user_favotites">
          <div className="col-md-10 user_favotites_title">
            <h1>我的收藏</h1>
          </div>
        </div>

        {/* 切換按鈕：我的收藏/我的課程 */}
        <div className="row">
          <div className="col-10 col ms-5 mt-2 favorite_tabs">
            <div className=" main_color d-flex" id="favorite_tab">
              <Link
                to="../favorite"
                type="button"
                className="favorite_active main_color favorite_btn"
                href="/"
              >
                我的收藏
              </Link>
              <Link
                to="../favorite-course"
                type="button"
                className="main_color favorite_btn"
                href="/"
              >
                我的課程
              </Link>
            </div>
          </div>
        </div>
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
                          active === colors.color_id
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
                  quantity: 1,
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
                // 導向購物車頁面
                // props.history.push('/')
                const items = {
                  ...cartProduct,
                  quantity: 1,
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

        <div className="row content_favorite main_color mx-3">
          {favorites.map((favorite, i) => {
            return (
              <>
                <div className="col ms-3 mb-4">
                  <div class="card user_favorite_card">
                    <div class="card-body position-relative">
                      <img
                        src={`${process.env.REACT_APP_NODE_URL}/public/upload/product-subject/${favorite.subject_img}`}
                        alt={favorite.subject_img}
                        width="155"
                      />
                      <div role="button">
                        <FaHeart
                          className="position-absolute top-0 end-0 my-2 heart_icon"
                          onClick={() => {
                            deleteLike(favorite.product_id)
                            window.location.reload()
                          }}
                        />
                      </div>

                      <div class="card-text">
                        <h4 className="like_product_category">
                          {favorite.category_name}
                        </h4>
                        <button
                          onClick={() => {
                            navigate(
                              `/product/productdetail/${favorite.product_id}`,
                              {
                                state: { ...favorite },
                              }
                            )
                          }}
                          className="like_product_name mt-2"
                        >
                          {favorite.product_name}
                        </button>
                        <div className="d-flex flex-row justify-content-between">
                          <p className="like_product_price">
                            NT${favorite.product_price}
                          </p>
                          <button
                            type="button"
                            className="btn shopping_cart_icon"
                            onClick={() => {
                              const cartItem = { ...favorite }
                              // 商品原本無數量屬性(quantity)，要先加上
                              showModal(
                                favorite.product_name,
                                favorite.id,
                                favorite.product_price,
                                favorite.subject_img,
                                cartItem
                              )
                              // console.log('----------359 --------', cartItem)
                            }}
                          >
                            <FiShoppingCart className="cart shopping_cart_icon" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )
          })}
        </div>
      </div>
    </>
  )
}

export default Favorite
