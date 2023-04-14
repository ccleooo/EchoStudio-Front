import '../../styles/User/resever.scss'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { useAuth } from '../../hooks/useAuth'

function Resever() {
  const { auth } = useAuth()
  const [reserve, setReserve] = useState([])

  useEffect(() => {
    // console.log('會員教室預約')
    async function getReserve() {
      let response = await axios.get(
        `http://localhost:3001/user/reserver/${auth.user.id}`
      )
      setReserve(response.data)
    }
    getReserve()
  }, [auth.user.id])
  return (
    <>
      <div className="reserver col-md-10">
        <div className="reserver_head ">
          <h3 className="reserver_title three_color">教室預約</h3>
        </div>
        <div className="reserver_body">
          {reserve.map((item) => {
            return (
              <>
                <div className="reserver_body_list fw-bold" key={item.id}>
                  <img
                    src={`${process.env.REACT_APP_NODE_URL}/public/upload/rehearsal/${item.rehearsal_img}`}
                    alt={item.rehearsal_img}
                    className="room_img"
                  />
                  <div className="reserver_body_right main_color">
                    <p className="room_name my-2">
                      教室名稱: {item.rehearsal_name}
                    </p>
                    <p className="room_time my-3">
                      預約日期: {item.reserve_date}
                    </p>
                    <p className="room_time my-3">
                      預約時間: {item.reserve_time_start}
                    </p>
                    <p className="room_price my-2">
                      預約價錢: NT$ {item.order_price} / hr
                    </p>
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

export default Resever
