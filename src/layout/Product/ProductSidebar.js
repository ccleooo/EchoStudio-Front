import Collapse from 'react-bootstrap/Collapse'
import '../../styles/Product/sidebar.scss'
import { FaCaretRight } from 'react-icons/fa'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import axios from 'axios'

import { useFilter } from '../../utils/productFilter'

function ProductSidebar(props) {
  const [openFirst, setOpenFirst] = useState(false)
  const [openSecond, setOpenSecond] = useState(false)
  const [color, setColor] = useState([])
  const [active, setActive] = useState('')

  const [filterPrice, setFilterPrice] = useState('')

  const { setCategory } = useFilter()
  const { setFilterColor } = useFilter()
  const { setPriceRange } = useFilter()
  const { setCategoryName } = useFilter()
  const { setSpecName } = useFilter()

  let navigate = useNavigate()

  // radio
  const priceRangeTypes = [
    { range: 'NT$ 1000 以下', price: '0,1000' },
    { range: 'NT$ 1000 ~ 5000', price: '1000,5000' },
    { range: 'NT$ 5000 ~ 10000', price: '5000,10000' },
    { range: 'NT$ 10000 ~ 20000', price: '10000,20000' },
    { range: 'NT$ 20000 ~ 30000', price: '20000,30000' },
    { range: 'NT$ 30000 ~ 40000', price: '30000,40000' },
    { range: 'NT$ 40000 ~ 50000', price: '40000,50000' },
    { range: 'NT$ 50000 以上', price: '50000,100000' },
  ]

  useEffect(() => {
    async function getColor() {
      let response = await axios.get('http://localhost:3001/product_color')
      setColor(response.data)
    }
    getColor()
  }, [])

  return (
    <>
      {/* 產品 Menu sidebar */}

      {/* sidebar top */}
      <div className="left_top">
        <ul className="navbar-nav main_color">
          <li className="nav-item ">
            <p
              className={
                !active || active === '熱門商品'
                  ? 'product_left_active'
                  : 'nav-link '
              }
              role="button"
              onClick={() => {
                setCategory('')
                setCategoryName('熱門商品')
                setActive('熱門商品')
                setSpecName([])
                navigate(`/product?category=熱門商品`)
              }}
            >
              <span>熱門商品</span>
            </p>
          </li>
          <li className="nav-item">
            <p
              className={
                active === '烏克麗麗'
                  ? 'product_left_active'
                  : 'nav-link collapsed'
              }
              onClick={() => {
                setOpenFirst(!openFirst)
                setActive('烏克麗麗')
                setCategoryName('烏克麗麗')
                setCategory('烏克麗麗')
                setSpecName([])
                navigate(`/product?category=烏克麗麗`)
              }}
              aria-controls="collapse-text"
              aria-expanded={openFirst}
              role="button"
            >
              <span>烏克麗麗</span>
              <FaCaretRight className="fa-solid fa-angle-right arrow_icon" />
            </p>
            <Collapse in={openFirst}>
              <div className=" pb-2 collapse-inner rounded">
                <div className="rounded_item">
                  <p
                    className={
                      active === '17吋' ? 'spec_active' : 'collapse-item'
                    }
                    role="button"
                    onClick={() => {
                      setActive('17吋')
                      setCategoryName('烏克麗麗 17吋')
                      setCategory('烏克麗麗')
                      setSpecName('17吋')
                    }}
                  >
                    <span>17吋</span>
                  </p>
                </div>
                <div className="rounded_item">
                  <p
                    className={
                      active === '21吋' ? 'spec_active' : 'collapse-item'
                    }
                    role="button"
                    onClick={() => {
                      setActive('21吋')
                      setCategoryName('烏克麗麗 21吋')
                      setCategory('烏克麗麗')
                      setSpecName('21吋')
                    }}
                  >
                    <span>21吋</span>
                  </p>
                </div>
                <div className="rounded_item">
                  <p
                    className={
                      active === '23吋' ? 'spec_active' : 'collapse-item'
                    }
                    role="button"
                    onClick={() => {
                      setActive('23吋')
                      setCategoryName('烏克麗麗 23吋')
                      setCategory('烏克麗麗')
                      setSpecName('23吋')
                    }}
                  >
                    <span>23吋</span>
                  </p>
                </div>
                <div className="rounded_item">
                  <p
                    className={
                      active === '26吋' ? 'spec_active' : 'collapse-item'
                    }
                    role="button"
                    onClick={() => {
                      setActive('26吋')
                      setCategoryName('烏克麗麗 26吋')
                      setCategory('烏克麗麗')
                      setSpecName('26吋')
                    }}
                  >
                    <span>26吋</span>
                  </p>
                </div>
              </div>
            </Collapse>
          </li>
          <li className="nav-item">
            <p
              className={
                active === '木吉他'
                  ? 'product_left_active'
                  : 'nav-link collapsed'
              }
              role="button"
              onClick={() => {
                setOpenSecond(!openSecond)
                setActive('木吉他')
                setCategoryName('木吉他')
                setCategory('木吉他')
                setSpecName([])
                navigate(`/product?category=木吉他`)
              }}
              aria-controls="collapse-text"
              aria-expanded={openSecond}
            >
              <span>木吉他</span>
              <FaCaretRight className="fa-solid fa-angle-right arrow_icon" />
            </p>
            <Collapse in={openSecond}>
              <div className="pb-2 collapse-inner rounded">
                <div className="rounded_item">
                  <p
                    className={
                      active === '36吋' ? 'spec_active' : 'collapse-item'
                    }
                    role="button"
                    onClick={() => {
                      setActive('36吋')
                      setCategoryName('木吉他 36吋')
                      setCategory('木吉他')
                      setSpecName('36吋')
                      navigate(`/product?category=木吉他&spec_name=36吋`)
                    }}
                  >
                    <span>36吋</span>
                  </p>
                </div>
                <div className="rounded_item">
                  <p
                    className={
                      active === '41吋' ? 'spec_active' : 'collapse-item'
                    }
                    role="button"
                    onClick={() => {
                      setActive('41吋')
                      setCategoryName('木吉他 41吋')
                      setCategory('木吉他')
                      setSpecName('41吋')
                      navigate(`/product?category=木吉他&spec_name=41吋`)
                    }}
                  >
                    <span>41吋</span>
                  </p>
                </div>
              </div>
            </Collapse>
          </li>
          <li className="nav-item">
            <p
              role="button"
              className={active === '貝斯' ? 'product_left_active' : 'nav-link'}
              onClick={() => {
                setCategory('貝斯')
                setActive('貝斯')
                setCategoryName('貝斯')
                setSpecName('無區分規格')
                navigate(`/product?category=貝斯`)
              }}
            >
              <span>貝斯</span>
            </p>
          </li>
          <li className="nav-item">
            <p
              role="button"
              className={
                active === '電子琴' ? 'product_left_active' : 'nav-link'
              }
              onClick={() => {
                setCategory('電子琴')
                setActive('電子琴')
                setCategoryName('電子琴')
                setSpecName('無區分規格')
                navigate(`/product?category=電子琴`)
              }}
            >
              <span>電子琴</span>
            </p>
          </li>
          <li className="nav-item">
            <p
              role="button"
              className={
                active === '木箱鼓' ? 'product_left_active' : 'nav-link'
              }
              onClick={() => {
                setCategory('木箱鼓')
                setActive('木箱鼓')
                setCategoryName('木箱鼓')
                setSpecName('無區分規格')
                navigate(`/product?category=木箱鼓`)
              }}
            >
              <span>木箱鼓</span>
            </p>
          </li>
          <li className="nav-item">
            <p
              role="button"
              className={
                active === '爵士鼓' ? 'product_left_active' : 'nav-link'
              }
              onClick={() => {
                setCategory('爵士鼓')
                setActive('爵士鼓')
                setCategoryName('爵士鼓')
                setSpecName('無區分規格')
                navigate(`/product?category=爵士鼓`)
              }}
            >
              <span>爵士鼓</span>
            </p>
          </li>
          <li className="nav-item">
            <p
              role="button"
              className={
                active === '麥克風' ? 'product_left_active' : 'nav-link'
              }
              onClick={() => {
                setCategory('麥克風')
                setActive('麥克風')
                setCategoryName('麥克風')
                setSpecName('無區分規格')
                navigate(`/product?category=麥克風`)
              }}
            >
              <span>麥克風</span>
            </p>
          </li>
          <li className="nav-item">
            <p
              role="button"
              className={active === '耳機' ? 'product_left_active' : 'nav-link'}
              onClick={() => {
                setCategory('耳機')
                setActive('耳機')
                setCategoryName('耳機')
                setSpecName('無區分規格')
                navigate(`/product?category=耳機`)
              }}
            >
              <span>耳機</span>
            </p>
          </li>
          <li className="nav-item">
            <p
              role="button"
              className={active === 'pick' ? 'product_left_active' : 'nav-link'}
              onClick={() => {
                setCategory('pick')
                setActive('pick')
                setCategoryName('pick')
                setSpecName('無區分規格')
                navigate(`/product?category=pick`)
              }}
            >
              <span>pick</span>
            </p>
          </li>
          <li className="nav-item">
            <p
              role="button"
              className={
                active === '音響設備' ? 'product_left_active' : 'nav-link'
              }
              onClick={() => {
                setCategory('音響設備')
                setActive('音響設備')
                setCategoryName('音響設備')
                setSpecName('無區分規格')
                navigate(`/product?category=音響設備`)
              }}
            >
              <span>音響設備</span>
            </p>
          </li>
          <li className="nav-item">
            <p
              role="button"
              className={
                active === '清潔保養' ? 'product_left_active' : 'nav-link'
              }
              onClick={() => {
                setCategory('清潔保養')
                setActive('清潔保養')
                setCategoryName('清潔保養')
                setSpecName('無區分規格')
                navigate(`/product?category=清潔保養`)
              }}
            >
              <span>清潔保養</span>
            </p>
          </li>
        </ul>
      </div>
      {/* sidebar bottom */}
      <div className="left_bottom">
        <ul className="navbar-nav main_color">
          {/* 顏色 */}
          <li>篩選列</li>
          <li className="nav-item">
            <p>
              顏色
              <button
                className="btn btn-link btn-sm three_color text-decoration-none"
                onClick={() => setFilterColor([])}
              >
                重設
              </button>
            </p>
            <div className="circle_content">
              {color.map((color, i) => {
                return (
                  <button
                    key={color.id}
                    className="circle_color"
                    style={{ background: `${color.rgb}` }}
                    onClick={() => {
                      setFilterColor([color.color_name])
                    }}
                  ></button>
                )
              })}
            </div>
          </li>
          {/* price  */}
          <li className="nav-item">
            <p>
              價錢
              <button
                className="btn btn-link btn-sm three_color text-decoration-none"
                onClick={() => {
                  setPriceRange([])
                  setFilterPrice([])
                }}
              >
                重設
              </button>
            </p>
            <div className="price_content">
              {priceRangeTypes.map((value, i) => {
                return (
                  <div className="form-check" key={i}>
                    <input
                      className="form-check-input"
                      type="radio"
                      value={value.price}
                      checked={filterPrice === value.price}
                      onChange={(e) => {
                        setFilterPrice(value.price)
                        const priceArray = value.price.split(',')
                        setPriceRange(priceArray)
                        console.log(priceArray)
                      }}
                    />
                    <label className="form-check-label">{value.range}</label>
                  </div>
                )
              })}
            </div>
          </li>
        </ul>
      </div>
    </>
  )
}

export default ProductSidebar
