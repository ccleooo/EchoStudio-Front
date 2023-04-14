import { Outlet } from 'react-router-dom'
import ProductSidebar from './ProductSidebar'
import '../../styles/Product/sidebar.scss'

function ProductLayout() {
  return (
    <>
      <section className="product_banner">
        <div className="container">
          <div className="product_content row">
            <div className="product_left col-md-3">
              <ProductSidebar />
            </div>
            <div className="product_right col-md-9 ">
              {/* Outlet相當於子頁區域呈現內容 */}
              <Outlet />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default ProductLayout
