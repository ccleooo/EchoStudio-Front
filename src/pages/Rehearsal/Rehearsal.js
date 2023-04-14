import { useNavigate } from 'react-router-dom'
import '../../styles/Rehearsal/rehearsal.scss'
import { useState, useEffect } from 'react'
import axios from 'axios'

function Rehearsal(props) {
  let navigate = useNavigate()

  const [rehearsals, setRehearsals] = useState([])
  useEffect(() => {
    // console.log('練團室')
    // 在component初始化的時後跑一次
    // 通常會把去跟後端要資料的動作放這裡
    async function getRehearsals() {
      let response = await axios.get('http://localhost:3001/rehearsal')
      setRehearsals(response.data)
    }
    getRehearsals()
  }, [])

  return (
    <section className="container">
      <p className="rehearsal_title three_color">Rehearsal Studio</p>
      <div className="row mt-5 mb-5">
        {rehearsals.map((rehearsal, i) => {
          return (
            <div className="col-sm-6" key={rehearsal.id}>
              <div className="card rehearsal-card mt-5">
                <img
                  src={`${process.env.REACT_APP_NODE_URL}/public/upload/rehearsal/${rehearsal.rehearsal_img}`}
                  alt={rehearsal.rehearsal_img}
                  className="img_rehearsal"
                />
                <h5 className="mx-3 mt-3">{rehearsal.rehearsal_name}</h5>
                <div className="card-body d-flex justify-content-between mb-5">
                  <div>
                    <p className="">
                      練團價格：NT{rehearsal.reserve_price}元/HR (
                      學生社團歡迎洽談特惠 )
                      <br />
                      練團室資訊：{rehearsal.rehearsal_info} <br />
                    </p>
                  </div>
                  <div>
                    <p
                      role="button"
                      onClick={() => {
                        navigate(`rehearsaldetail/${rehearsal.id}`, {
                          state: { value: rehearsal.reserve_price },
                        })
                      }}
                    >
                      more +
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}

export default Rehearsal
