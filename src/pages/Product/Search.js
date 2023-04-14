import '../../styles/Product/search.scss'
import { ReactComponent as CartIcon } from '../../images/svg/cart.svg'
import {
  FaAngleRight,
  FaAngleDoubleRight,
  FaAngleDoubleLeft,
  FaCheckCircle,
} from 'react-icons/fa'
import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link, useLocation } from 'react-router-dom'
import { Modal, Button } from 'react-bootstrap'
import axios from 'axios'
import '../../styles/Product/product.scss'

import { useCart } from '../../utils/useCart'
import { useFilter } from '../../utils/productFilter'

function Search(props) {
  const [products, setProducts] = useState([])
  let navigate = useNavigate()
  const location = useLocation()

  const [valueText, setValueText] = useState(location.state.value.filterProduct)
  //page
  const { currentPage } = useParams()
  const [page, setPage] = useState(parseInt(currentPage, 10) || 1)
  const [totalPage, setTotalPage] = useState(0)
  const [prevPage, setPrevPage] = useState(0)
  const [nextPage, setNextPage] = useState(page)
  const [total, setTotal] = useState(0)

  //product 過濾
  const { category } = useFilter()
  const { filterColor } = useFilter()
  const { priceRange } = useFilter()
  const { specName } = useFilter()
  const priceStart = priceRange[0]
  const priceEnd = priceRange[1]

  useEffect(() => {
    let queryString = new URLSearchParams({
      page: page,
      product_name: valueText,
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
      setTotal(response.data.pagination.total)
    }
    getProducts()
  }, [
    page,
    valueText,
    category,
    specName,
    filterColor,
    priceStart,
    priceEnd,
    total,
  ])

  //page
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
            setValueText(i.data.bbb)
            navigate(`/product/search?page=${i}`)
          }}
        >
          {i}
        </button>
      )
    }

    return pages
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
    <div className="search">
      <div className=" main_color search_header">
        <div className="d-flex align-items-center">
          <Link to="/product" className="main_color back_product me-1">
            Back
          </Link>
          <FaAngleRight className="right_icon" />
        </div>
        <p>「 {location.state.value.filterProduct}的搜尋結果 」</p>
      </div>
      <div className="search_input">
        <p className="search_text">
          搜尋「{valueText}」, 總共有 {total} 項搜尋結果
        </p>
      </div>

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
      <div className="product_list row">
        {products.map((products, index) => {
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
                      // 商品原本無數量屬性(quantity)，要先加上
                      showModal(
                        products.product_name,
                        products.id,
                        products.product_price,
                        products.subject_img,
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
      </div>
      <div className="page ">
        {prevPage <= 0 ? (
          ''
        ) : (
          <button
            className="btn double_btn"
            onClick={(e) => {
              setPage(prevPage)
              navigate(`/product/search?page=${prevPage}`)
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
              navigate(`/product/search?page=${nextPage}`)
            }}
          >
            <FaAngleDoubleRight className="doublet_icon" />
          </button>
        )}
      </div>
    </div>
  )
}

export default Search
