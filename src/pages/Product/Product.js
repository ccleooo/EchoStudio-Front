import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Modal, Button } from 'react-bootstrap'
import axios from 'axios'
import '../../styles/Product/product.scss'
import { ReactComponent as CartIcon } from '../../images/svg/cart.svg'
import {
  FaSearch,
  FaAngleDoubleLeft,
  FaAngleDoubleRight,
  FaCheckCircle,
} from 'react-icons/fa'

import { useCart } from '../../utils/useCart'
import { useFilter } from '../../utils/productFilter'
import { useAuth } from '../../hooks/useAuth'
import { Toast } from '@douyinfe/semi-ui'

function Product(props) {
  const { auth } = useAuth()

  const [products, setProducts] = useState([])
  const [displayProducts, setDisplayProducts] = useState([])

  let navigate = useNavigate()
  //page
  const { currentPage } = useParams()
  const [page, setPage] = useState(parseInt(currentPage, 10) || 1)
  const [totalPage, setTotalPage] = useState(0)
  const [prevPage, setPrevPage] = useState(0)
  const [nextPage, setNextPage] = useState(page)

  //搜尋
  const [filterProduct, setFilterProduct] = useState('')

  //product 過濾
  const [sortBy, setSortBy] = useState('預設排列')
  const { category } = useFilter()
  const { filterColor } = useFilter()
  const { priceRange } = useFilter()
  const { categoryName } = useFilter()
  const { specName } = useFilter()
  const priceStart = priceRange[0]
  const priceEnd = priceRange[1]

  useEffect(() => {
    let queryString = new URLSearchParams({
      page: page,
      category_name: category,
      spec_name: specName,
      color_name: filterColor,
      product_price_start: priceStart === undefined ? '' : priceStart,
      product_price_end: priceEnd === undefined ? '' : priceEnd,
    })
    async function getProducts() {
      let response = await axios.get(
        `http://localhost:3001/product?${queryString.toString()}`
      )

      // console.log(`http://localhost:3001/product?${queryString.toString()}`)
      setProducts(response.data.data)
      setTotalPage(response.data.pagination.totalPage)
      setNextPage(response.data.pagination.nextPage)
      setPrevPage(response.data.pagination.prevPage)
    }

    getProducts()
  }, [page, category, specName, filterColor, priceStart, priceEnd])

  //頁碼
  const getPages = () => {
    let pages = []
    for (let i = 1; i <= totalPage; i++) {
      pages.push(
        <button
          className="class_page_btn"
          style={{ backgroundColor: page === i ? '#888276' : 'transparent' }}
          key={i}
          onClick={(e) => {
            setPage(i)
            navigate(`/product?page=${i}`)
          }}
        >
          {i}
        </button>
      )
    }

    return pages
  }

  //排序
  const handleSort = (products, sortBy) => {
    let newProducts = [...products]

    if (sortBy === '1') {
      newProducts = [...newProducts].sort(
        (a, b) => new Date(a.create_time) - new Date(b.create_time)
      )
    }
    // 以價格排序-由少至多
    if (sortBy === '2') {
      newProducts = [...newProducts].sort(
        (a, b) => a.product_price - b.product_price
      )
    }

    if (sortBy === '3') {
      newProducts = [...newProducts].sort(
        (a, b) => b.product_price - a.product_price
      )
    }

    // 預設用新到舊
    if (sortBy === '') {
      newProducts = [...newProducts].sort(
        (a, b) => new Date(b.create_time) - new Date(a.create_time)
      )
    }

    return newProducts
  }

  //處理排序過濾
  useEffect(() => {
    let newProducts = []

    // 處理排序
    newProducts = handleSort(products, sortBy)

    setDisplayProducts(newProducts)
  }, [products, sortBy])

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

  const firstCart = useCart()

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
      <div className="product_head ">
        <h3 className="product_title three_color col-4">{categoryName}</h3>
        <div className="right">
          <div className="product_search">
            <input
              type="text"
              className="search_line border-bottom main_color"
              value={filterProduct}
              onChange={(e) => setFilterProduct(e.target.value)}
              placeholder="以商品名稱搜尋"
            />
            <p
              className=" main_color"
              role="button"
              onClick={() => {
                navigate(`/product/search`, {
                  state: { ...products, value: { filterProduct } },
                })
              }}
            >
              <FaSearch className="search_icon main_color" />
            </p>
          </div>
          <select
            aria-label=".form-select-sm example"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="0">預設排列</option>
            <option value="1">上架舊到新</option>
            <option value="2">價格低到高</option>
            <option value="3">價格高到低</option>
          </select>
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
              firstCart.addItem(item)
              handleClose()
            }}
          >
            <p>加入購物車</p>
          </Button>
          {auth.isAuth ? (
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
                firstCart.addItem(items)
                handleClose()
                navigate('/cart', { replace: true })
              }}
            >
              <p>立即購買</p>
            </Button>
          ) : (
            <Button
              className="modal_footer_btn modal_buycart_btn"
              onClick={() => {
                Toast.warning('尚未登入')
              }}
            >
              <p>立即購買</p>
            </Button>
          )}
        </Modal.Footer>
      </Modal>
      {/* 產品列表 */}
      <div className="product_list row">
        {displayProducts.map((products, index) => {
          return (
            <div
              key={products.id}
              className="card product_card col-lg-3 col-md-4"
            >
              <img
                src={`${process.env.REACT_APP_NODE_URL}/public/upload/product-subject/${products.subject_img}`}
                className="card-img-top card_img"
                alt={products.subject_img}
              />
              <div className="card-body product_card_body">
                <button
                  onClick={() => {
                    navigate(`/product/productdetail/${products.id}`, {
                      state: { ...products },
                    })
                    window.location.reload()
                  }}
                  className="card-title product_card_title main_color"
                >
                  {products.product_name}
                </button>
                <div className="product_card_bottom">
                  <p className="card-text product_card_price">
                    NT$ {products.product_price}
                  </p>
                  <button
                    type="button"
                    className="btn product_btn_cart"
                    onClick={() => {
                      const cartItem = { ...products }
                      showModal(
                        products.product_name,
                        products.id,
                        products.product_price,
                        products.subject_img,
                        cartItem
                      )
                      // console.log('----------359 --------', products)
                    }}
                  >
                    <CartIcon className="cart" />
                  </button>
                </div>
              </div>
            </div>
          )
        })}
      </div>
      {/* 頁碼 */}
      <div className="page ">
        {prevPage <= 0 ? (
          ''
        ) : (
          <button
            className="btn double_btn"
            onClick={(e) => {
              setPage(prevPage)
              navigate(`/product?page=${prevPage}`)
            }}
          >
            <FaAngleDoubleLeft className="doublet_icon" />
          </button>
        )}

        {getPages()}

        {page === totalPage ? (
          ''
        ) : (
          <button
            className="btn double_btn"
            onClick={(e) => {
              setPage(nextPage)
              navigate(`/product?page=${nextPage}`)
            }}
          >
            <FaAngleDoubleRight className="doublet_icon" />
          </button>
        )}
      </div>
    </>
  )
}

export default Product
