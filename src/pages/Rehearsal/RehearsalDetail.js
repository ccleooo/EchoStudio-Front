import '../../styles/Rehearsal/rehearsalDetail.scss'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import { Link } from 'react-router-dom'
import { BsFillArrowRightCircleFill } from 'react-icons/bs'
import { Toast } from '@douyinfe/semi-ui'

function RehearsalDetail() {
  const { auth } = useAuth()
  const { rehearsalId } = useParams()

  const [data, setData] = useState([])
  const [img, setImg] = useState([])

  const location = useLocation()
  const navigate = useNavigate()

  const [reserveRH, setRH] = useState({
    user_id: auth.user.id,
    name: '',
    rehearsal: rehearsalId,
    email: '',
    phone: '',
    price: location.state.value,
    reserve_date: '',
    reserve_time_start: '',
  })

  function handleChange(e) {
    setRH({ ...reserveRH, [e.target.name]: e.target.value })
  }

  async function handleSubmit(e) {
    // 關閉表單的預設行為
    e.preventDefault()
    let response = await axios.post(
      'http://localhost:3001/rehearsal_reserve',
      reserveRH,
      { withCredentials: true }
    )
    Toast.success(response.data.msg)
    navigate(`/user/resever`)
  }

  //rehearsal
  useEffect(() => {
    // console.log('練團室詳細頁')
    // 在component初始化的時後跑一次
    // 通常會把去跟後端要資料的動作放這裡
    async function getData() {
      let response = await axios.get(
        `http://localhost:3001/rehearsal/${rehearsalId}`
      )
      setData(response.data)
    }
    getData()
  }, [rehearsalId])

  //rehearsal img
  useEffect(() => {
    console.log('練團室詳細頁')
    // 在component初始化的時後跑一次
    // 通常會把去跟後端要資料的動作放這裡
    async function getImg() {
      let response = await axios.get(
        `http://localhost:3001/rehearsal_img/${rehearsalId}`
      )
      setImg(response.data)
    }
    getImg()
  }, [rehearsalId])

  return (
    <>
      <section className="container">
        {data.map((item) => {
          const dataInformation = `${item.rehearsal_device}`
          return (
            <>
              <p className="RehearsalDetail_title three_color">
                {item.rehearsal_name}
              </p>
              <div className="img_RehearsalDetail d-flex justify-content-center">
                <img
                  src={`${process.env.REACT_APP_NODE_URL}/public/upload/rehearsal/${item.rehearsal_img}`}
                  alt={item.rehearsal_img}
                />
              </div>
              <div className="container text-center mb-5">
                <div className="row">
                  {img.map((value, i) => {
                    return (
                      <div className="col-3 ">
                        <div className="img_RehearsalDetail3">
                          <img
                            src={`${process.env.REACT_APP_NODE_URL}/public/upload/rehearsaldetail/${value.src}`}
                            alt={value.src}
                            className="img_RehearsalDetail3 "
                          />
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>

              <div className="detail container text-center">
                <div className="row">
                  <div className="col-6" key={item.id}>
                    <h2>詳細內容</h2>
                    <p>
                      練團價格：NT{item.reserve_price}元/HR
                      (學生社團歡迎洽談特惠)
                      <br />
                      地址：台北市復興南路一段390號10樓之6<br></br>
                      營業時間：平日 13:00~23:00 六日 10:00~23:00 <br></br>
                      早練時段 :平日 08:00~13:00 六 08:00~10:00 (價格電洽)
                      <br />
                      無夜練服務
                    </p>
                  </div>

                  <div className="col-6">
                    <h2>設備</h2>
                    <p>
                      <div
                        dangerouslySetInnerHTML={{ __html: dataInformation }}
                      />
                    </p>
                  </div>
                </div>
              </div>
            </>
          )
        })}
      </section>

      <section className="rehdetail_reserve">
        <div className="container">
          <div className="row rehdetail_bg">
            <div className="col-12">
              <div className="form_title text-center">
                <h2>我要預約</h2>
                <br></br>
              </div>
            </div>
            {auth.isAuth ? (
              <div className="col-12 d-flex justify-content-center">
                <div className="col-md-5">
                  <form action="" method="" onSubmit={handleSubmit}>
                    <div className="mb-3">
                      <label for="exampleInputEmail1" className="reform-label">
                        預約姓名
                      </label>
                      <input
                        required
                        type="name"
                        className="re_detail_form form-control bg-transparent text-white"
                        id="bookName"
                        placeholder="請輸入姓名"
                        aria-describedby="emailHelp"
                        name="name"
                        value={reserveRH.name}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="mb-3">
                      <label
                        for="exampleInputPassword1"
                        className="reform-label"
                      >
                        聯絡信箱
                      </label>
                      <input
                        required
                        type="email"
                        className="re_detail_form form-control bg-transparent text-white"
                        placeholder="請輸入信箱"
                        id="bookEmail"
                        name="email"
                        value={reserveRH.email}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="mb-3">
                      <label
                        for="exampleInputPassword1"
                        className="reform-label"
                      >
                        聯絡電話
                      </label>
                      <input
                        required
                        type="phone"
                        className="re_detail_form form-control bg-transparent text-white"
                        placeholder="請輸入電話"
                        id="bookPhone"
                        name="phone"
                        value={reserveRH.phone}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="mb-3">
                      <label
                        for="exampleInputPassword1"
                        className="reform-label"
                      >
                        預約日期
                      </label>
                      <input
                        required
                        type="date"
                        style={{
                          background: 'transparent',
                          color: 'white',
                        }}
                        className="re_detail_form form-control bg-transparent text-white"
                        placeholder="請選擇日期"
                        id="bookDate"
                        name="reserve_date"
                        value={reserveRH.reserve_date}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="mb-3">
                      <label
                        for="exampleInputPassword1"
                        className="reform-label"
                      >
                        預約時間
                      </label>
                      <select
                        className="reform-label"
                        name="reserve_time_start"
                        id="bookTime"
                        value={reserveRH.reserve_time_start}
                        onChange={handleChange}
                      >
                        <option className="re_detail_form form-control bg-transparent text-white">
                          請選擇時間
                        </option>
                        <option
                          className="re_detail_form form-control bg-transparent"
                          value="10:00 ~ 12:00"
                        >
                          10:00 ~ 12:00
                        </option>
                        <option className="re_detail_form form-control bg-transparent">
                          12:00 ~ 14:00
                        </option>
                        <option className="re_detail_form form-control bg-transparent">
                          14:00 ~ 16:00
                        </option>
                        <option className="re_detail_form form-control bg-transparent">
                          16:00 ~ 18:00
                        </option>
                        <option className="re_detail_form form-control bg-transparent">
                          18:00 ~ 20:00
                        </option>
                      </select>
                    </div>
                    <div className="row  justify-content-center">
                      <div className="col-2">
                        <button type="submit" className="rehearsal_btn">
                          送出
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            ) : (
              <p className="four_color fw-bolder text-center">
                <Link to="/login" className="text-white fw-bolder mb-1">
                  <BsFillArrowRightCircleFill className="mx-2 mb-1" /> 請 點 我
                  登 入 會 員 ! ! !
                </Link>
              </p>
            )}
          </div>
        </div>
      </section>
    </>
  )
}

export default RehearsalDetail
