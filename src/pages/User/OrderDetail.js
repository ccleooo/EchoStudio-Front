import '../../styles/User/orderDetail.scss'

import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { orderStatusMap } from '../../configs/orderStatus'
import { orderTakeMap } from '../../configs/orderTake'
import { orderPayMap } from '../../configs/orderPay'
import { orderReceiptMap } from '../../configs/orderReceipt'
import { Link } from 'react-router-dom'
import DetailList from './order/DetailList'

import axios from 'axios'
import { Toast } from '@douyinfe/semi-ui'

function OrderDetail() {
  const { ordersID } = useParams()
  const [data, setData] = useState([])
  const navigate = useNavigate()
  const [editStatus, setEditStatus] = useState([])
  const [orderProduct, setOrderProduct] = useState([])
  const [orderComment, setOrderComment] = useState([])
  // console.log('........', data)

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

    async function getOrderComment() {
      let response = await axios.get(
        `http://localhost:3001/orderComment/${ordersID}`,
        { withCredentials: true }
      )
      setOrderComment(response.data)
    }
    getOrderComment()
  }, [ordersID])

  //取消按鈕
  useEffect(() => {
    // console.log('會員資料編輯')
    async function getEditUser() {
      let response = await axios.get(
        `http://localhost:3001/orders/update/${ordersID}`,
        { withCredentials: true }
      )
      setEditStatus(response.data[0])
    }
    getEditUser()
  }, [ordersID])

  function handleChange(e) {
    setEditStatus({ ...editStatus, [e.target.name]: e.target.value })
  }

  async function handleSubmit(e) {
    // 關閉表單的預設行為
    e.preventDefault()
    let response = await axios.put(
      `http://localhost:3001/orders/updateStatus/${ordersID}`,
      { withCredentials: true },
      editStatus
    )
    Toast.success(response.data.msg)
    navigate(`/user/order`)
  }

  function orderSumCount() {
    let count = orderProduct.reduce((acc, item) => {
      return acc + item.order_amount
    }, 0)
    return count
  }

  function orderSumPrice() {
    let amount = orderProduct.reduce((acc, item) => {
      return acc + item.product_price * item.order_amount
    }, 0)
    return amount
  }

  return (
    <section className="page_bg col-md-10">
      {data.map((item) => {
        return (
          <div className="container" key={item.id}>
            <h1 className="fw-bold three_color">訂單詳細</h1>
            <div className="content_bg">
              <div className="order_detail_state">
                <div className="order_num">
                  <span className={`state_${item.order_status}`}>
                    {orderStatusMap[item.order_status]}
                  </span>
                  <p>訂單編號:{item.order_number}</p>
                </div>
                <div>
                  <p>訂購日期:{item.order_create_time}</p>
                </div>
              </div>

              <div className="order_trans">
                <div>
                  <p className="transport">運送資訊</p>
                  <div className="order_address">
                    <p>收件人 : {item.order_name}</p>
                    <p className="address">
                      運送方式 : {orderTakeMap[item.take_method]}
                    </p>
                    <p className="address">運送地址 : {item.order_address}</p>
                  </div>
                </div>
              </div>

              <div className="order_trans">
                <div>
                  <p className="transport_2">訂單內容</p>

                  <DetailList ordersID={ordersID} />
                </div>

                <div className="order_detail_row row">
                  <div className="col-sm-5 col-12">
                    <table>
                      <tbody className="order_detail_total">
                        <tr>
                          <td className="total_left">數量</td>
                          <td className="total_right">{orderSumCount()}</td>
                        </tr>
                        <tr>
                          <td className="total_left">小計</td>
                          <td className="total_right">{orderSumPrice()}</td>
                        </tr>
                        <tr>
                          <td className="total_left">優惠代碼</td>
                          <td className="four_color total_right">{item.sn}</td>
                        </tr>
                        <tr>
                          <td className="total_left">優惠折扣</td>
                          <td className="four_color total_right">
                            {item.discount_name === null
                              ? '無使用優惠序號'
                              : `${item.discount_name}折`}
                          </td>
                        </tr>
                        <tr>
                          <td className="total_left">運費</td>
                          <td className="total_right">{item.freight}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="order_detail_row_2 row">
                  <div className="col-sm-5 col-12">
                    <table>
                      <tbody className="order_detail_total">
                        <tr>
                          <td className="total_left">合計</td>
                          <td className="total_right three_color">
                            NT$ {item.total_amount}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              <div className="order_trans">
                <div>
                  <p className="transport">付款資訊</p>
                  <div className="order_address">
                    <p>付款方式: {orderPayMap[item.pay_method]}</p>
                  </div>
                </div>
              </div>

              <div className="order_trans">
                <div>
                  <p className="transport">發票資訊 / 訂單備註</p>
                  <div className="order_detail_ps">
                    <p>發票 : {orderReceiptMap[item.receipt]}</p>
                    <p>統一編號 : {item.gui}</p>
                    <p>備註: {item.memo}</p>
                  </div>
                </div>
              </div>

              {/* 取消訂單 */}
              <div
                className={
                  item.order_status === 1 ? 'order_cancel' : 'display:none'
                }
              >
                <div>
                  <Link
                    type="button"
                    name="order_status"
                    value={(editStatus.order_status = 5)}
                    onClick={handleSubmit}
                    onChange={handleChange}
                  >
                    {item.order_status === 1 ? '取消訂單' : null}
                  </Link>
                </div>
              </div>
              {/* 前往評論 */}
              <div
                className={
                  item.order_status === 4
                    ? 'order_cancel_comment'
                    : 'display:none'
                }
              >
                {item.order_status === 4 ? (
                  <div>
                    <Link
                      type="button"
                      to={
                        orderComment.length > 0 ? '/user/order' : 'orderComment'
                      }
                    >
                      {orderComment.length > 0 ? '已評論回前頁' : '前往評論'}
                    </Link>
                  </div>
                ) : (
                  ''
                )}
              </div>
              {/* 回前頁 */}
              <div
                className={
                  item.order_status === 5 ||
                  item.order_status === 2 ||
                  item.order_status === 3
                    ? 'order_cancel_back'
                    : 'display:none'
                }
              >
                <div>
                  <Link type="button" to="/user/order">
                    {item.order_status === 5 ||
                    item.order_status === 2 ||
                    item.order_status === 3
                      ? '回前頁'
                      : null}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )
      })}
    </section>
  )
}

export default OrderDetail
