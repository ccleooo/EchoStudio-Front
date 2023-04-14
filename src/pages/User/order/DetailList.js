import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'

function DetailList({ ordersID }) {
  const [orderProduct, setOrderProduct] = useState([])

  useEffect(() => {
    // console.log('詳細訂單')
    // 在component初始化的時後跑一次
    // 通常會把去跟後端要資料的動作放這裡
    async function getOrderProduct() {
      let response = await axios.get(
        `http://localhost:3001/orders/${ordersID}/order_product`
      )
      setOrderProduct(response.data)
    }
    getOrderProduct()
  }, [ordersID])

  return (
    <>
      {orderProduct.map((orderProduct, i) => {
        return (
          <div className="order_detail_content row" key={orderProduct.id}>
            <img
              className="img-fluid col-3 order_img"
              src={`${process.env.REACT_APP_NODE_URL}/public/upload/product-subject/${orderProduct.subject_img}`}
              alt={orderProduct.subject_img}
            />
            <div className="order_detail_state_p col-6">
              <div>
                <p className="order_detail_name">{orderProduct.product_name}</p>
                <p className="order_color second_color">
                  規格：{orderProduct.color_name} , {orderProduct.spec_name}
                </p>
              </div>
            </div>
            <div className="col-1">
              <p className="order_detail_amount">{orderProduct.order_amount}</p>
            </div>
            <div className=" col-3">
              <p className="order_detail_price">
                NT$ {orderProduct.product_price}
              </p>
            </div>
          </div>
        )
      })}
    </>
  )
}

export default DetailList
