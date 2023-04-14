import '../../styles/User/user.scss'
import { AiOutlineRight } from 'react-icons/ai'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { useAuth } from '../../hooks/useAuth'

function User() {
  const [userlevel, setUserlevel] = useState([])
  const [UserlevelCoupon, setUserlevelCoupon] = useState([])
  const [userlevelname, setUserlevelname] = useState([])
  const { auth } = useAuth()

  useEffect(() => {
    // console.log('userlevelname')
    async function getUserlevelname() {
      let response = await axios.get(
        `http://localhost:3001/users/userlevelname/${auth.user.id}`
      )
      setUserlevelname(response.data)
    }
    getUserlevelname()
  }, [auth.user.id])

  useEffect(() => {
    // console.log('收藏商品')
    async function getUserlevel() {
      let response = await axios.get(
        `http://localhost:3001/users/userlevel_like/${auth.user.id}`
      )
      setUserlevel(response.data)
    }
    getUserlevel()
  }, [auth.user.id])

  useEffect(() => {
    // console.log('收藏coupon')
    async function getUserlevelCoupon() {
      let response = await axios.get(
        `http://localhost:3001/users/userlevel_coupon/${auth.user.id}`
      )
      setUserlevelCoupon(response.data)
    }
    getUserlevelCoupon()
  }, [auth.user.id])

  return (
    <>
      <section className="userbanner col-md-10">
        <p className="user_title three_color fw-bold">會員</p>
        <br />
        <div className="box1">
          {userlevelname.map((userlevelnames, i) => {
            return (
              <div className="img_user_level" key={userlevelnames.id}>
                <div className="user_level main_color">
                  <h6>
                    會員等級： {userlevelnames.level_name} <br />
                  </h6>
                  <p>{auth.user.name}</p>
                </div>
              </div>
            )
          })}

          <div className="box2 container mt-3">
            <div className="container">
              <div className="row user_page_row">
                <div className="col user_page_border">
                  <h4>收 藏 商 品 / 課 程</h4>
                  <br />
                  <br />
                  {userlevel.map((userlevels, i) => {
                    return (
                      <h1
                        className="text-white d-flex justify-content-between"
                        key={userlevels.id}
                      >
                        {userlevels.p_total} / {userlevels.c_total}
                        <p>
                          個<AiOutlineRight />
                        </p>
                      </h1>
                    )
                  })}
                </div>

                <div className="col">
                  <h4>我 的 優 惠 券</h4>
                  <br />
                  <br />
                  {UserlevelCoupon.map((UserlevelCoupons, i) => {
                    return (
                      <h1 className="text-white d-flex justify-content-between">
                        {UserlevelCoupons.total}
                        <p>
                          張<AiOutlineRight />
                        </p>
                      </h1>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>

          <div className="box3_user_level container mt-5">
            <h4>
              <br />會 員 如 何 升 等
            </h4>
            <div>
              <table className="table table-bordered text-center mt-5 ">
                <tbody>
                  <tr>
                    <th scope="row">一般會員</th>
                    <td>消費即銅卡會員</td>
                  </tr>
                  <tr>
                    <th scope="row ">VIP</th>
                    <td>每半年消費滿50000即可成為VIP</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default User
