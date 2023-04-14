import '../../styles/User/orderDetail.scss'
import '../../styles/User/orderComment.scss'

import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useAuth } from '../../hooks/useAuth'
import { orderStatusMap } from '../../configs/orderStatus'
import { Toast } from '@douyinfe/semi-ui'

function OrderComment(props) {
  const { auth } = useAuth()
  const { ordersID } = useParams()

  const navigate = useNavigate()
  const [data, setData] = useState([])
  const [orderProduct, setOrderProduct] = useState([])

  const [comments, setComments] = useState([])

  useEffect(() => {
    async function getData() {
      let response = await axios.get(
        `http://localhost:3001/orders/${ordersID}`,
        { withCredentials: true }
      )
      setData(response.data)
    }
    getData()

    async function getOrderProduct() {
      let response = await axios.get(
        `http://localhost:3001/orders/${ordersID}/order_product`,
        { withCredentials: true }
      )
      setOrderProduct(response.data)
    }
    getOrderProduct()
  }, [ordersID])

  async function handleSubmit(e) {
    // console.log('handleSubmit')
    // 關閉表單的預設行為
    e.preventDefault()

    const order_product_ids = orderProduct.map((v) => v.id)
    const user_ids = Array(order_product_ids.length).fill(auth.user.id)
    let tzoffset = new Date().getTimezoneOffset() * 60000
    let localISOTime = new Date(Date.now() - tzoffset)
      .toISOString()
      .slice(0, -1)

    const orderComment = {
      user_ids,
      order_product_ids,
      comments,
      create_time: localISOTime,
    }

    let response = await axios.post(
      'http://localhost:3001/insetComment',
      orderComment
    )
    Toast.success(response.data.msg)
    navigate(`/user/order`)
  }

  return (
    <>
      <section className="page_bg col-md-10">
        {data.map((item) => {
          return (
            <div className="container" key={item.id}>
              <h1 className="fw-bold three_color">訂單評論</h1>
              <div className="content_bg">
                <div className="order_detail_state">
                  <div className="order_num">
                    <span className={`state_4`}>{orderStatusMap[4]}</span>
                    <p>訂單編號:{item.order_number}</p>
                  </div>
                  <div>
                    <p>訂購日期:{item.order_create_time}</p>
                  </div>
                </div>

                <div className="order_trans">
                  <div>
                    <p className="transport_2">我要評論</p>
                  </div>
                  {/* 商品評論 */}
                  {orderProduct.map((orderProduct, i) => {
                    return (
                      <div key={orderProduct.id}>
                        <div className="order_detail_content orderComment row">
                          <img
                            className="img-fluid col-3 "
                            src={`${process.env.REACT_APP_NODE_URL}/public/upload/product-subject/${orderProduct.subject_img}`}
                            alt={orderProduct.subject_img}
                          />
                          <div className="order_detail_state_p col-9">
                            <div>
                              <p className="order_detail_name">
                                {orderProduct.product_name}
                              </p>
                              <p className="order_color second_color">
                                規格：{orderProduct.color_name} ,{' '}
                                {orderProduct.spec_name}
                              </p>
                            </div>
                          </div>
                        </div>
                        <textarea
                          type="text"
                          name="comment"
                          value={comments[i] ? comments[i] : ''}
                          onChange={(e) => {
                            const newComments = [...comments]
                            newComments[i] = e.target.value

                            setComments(newComments)
                          }}
                          className="orderComment_textarea main_color"
                          placeholder="請輸入您的商品感受，讓ECHO越來越進步。"
                        ></textarea>
                      </div>
                    )
                  })}

                  <div className="d-flex justify-content-center">
                    <button
                      className="btn orderComment_btn main_color"
                      onClick={handleSubmit}
                    >
                      送出
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </section>
    </>
  )
}

export default OrderComment
