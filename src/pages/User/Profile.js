import '../../styles/User/profile.scss'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { useAuth } from '../../hooks/useAuth'
import { Link } from 'react-router-dom'

function Profile(props) {
  const { auth } = useAuth()
  const [users, setUsers] = useState([])

  useEffect(() => {
    // console.log('會員資料')
    async function getUsers() {
      let response = await axios.get(
        `http://localhost:3001/users/${auth.user.id}`
      )
      setUsers(response.data)
    }
    getUsers()
  }, [auth.user.id])

  return (
    <>
      <section className="col-md-10">
        <div className="container">
          <div className="row">
            <div className="col-md-10 profile_title">
              <h1>基本資料</h1>
            </div>
          </div>
          <div className="row content_profile">
            {users.map((user, i) => {
              return (
                <>
                  <div className="photo_profile col-4" key={user.id}>
                    <div>
                      <img
                        src={`${process.env.REACT_APP_NODE_URL}/public/upload/user/${user.user_img}`}
                        alt={user.user_img}
                        className="profile_photo"
                      />
                    </div>
                  </div>
                  <div className="information_profile col-8 ">
                    <table className="user_profile_table mt-5">
                      <tbody>
                        <tr>
                          <td className="user_form_title mt-5">會員姓名</td>
                          <td className="user_form_content">
                            {auth.user.name}
                          </td>
                        </tr>
                        <tr>
                          <td className="user_form_title">會員帳號</td>
                          <td className="user_form_content">
                            {auth.user.account}
                          </td>
                        </tr>
                        <tr>
                          <td className="user_form_title">會員手機</td>
                          <td className="user_form_content">
                            {auth.user.phone}
                          </td>
                        </tr>
                        <tr>
                          <td className="user_form_title">會員生日</td>
                          <td className="user_form_content">
                            {auth.user.birthday}
                          </td>
                        </tr>
                        <tr>
                          <td className="user_form_title">會員信箱</td>
                          <td className="user_form_content">
                            {auth.user.email}
                          </td>
                        </tr>
                        <tr>
                          <td className="user_form_title">會員地址</td>
                          <td className="user_form_content">
                            {auth.user.address}
                          </td>
                        </tr>
                        <tr>
                          <td className="user_form_title">會員載具</td>
                          <td className="user_form_content">
                            {auth.user.carrier}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </>
              )
            })}
          </div>

          <div className="row mb-5 justify-content-center">
            <div className="col-2">
              <Link to={`edit`} className="user_profile_edit_btn">
                編輯資料
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Profile
