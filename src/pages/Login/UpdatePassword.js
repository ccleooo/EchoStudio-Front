import '../../styles/Login/forgotPassword.scss'
import { Link } from 'react-router-dom'
import { ImKey } from 'react-icons/im'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate, useLocation } from 'react-router-dom'
import { Toast } from '@douyinfe/semi-ui'

function UpdatePassword() {
  const navigate = useNavigate()

  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)
  const code = searchParams.get('code')

  const [updatePassword, setUpdatePassword] = useState({
    password: '12345',
    confirmPassword: '12345',
    code: code,
  })

  // console.log('code', code)

  function handleChange(e) {
    // console.log(e);
    let newPassword = { ...updatePassword }
    newPassword[e.target.name] = e.target.value
    setUpdatePassword(newPassword)
  }

  async function handleSubmit(e) {
    // console.log('handleSubmit')
    // 關閉表單的預設行為
    e.preventDefault()

    let response = await axios.put(
      `http://localhost:3001/login/update-password?code=${code}`,
      updatePassword
    )

    // console.log(response.data)
    Toast.success(response.data.msg)
    navigate('/login')
  }
  return (
    <div className="container">
      {/* 登入/註冊切換按鈕 */}
      <div className="row justify-content-center">
        <div className="col-10 col-md-4 d-flex mt-5">
          <div className="login_register_btn ">
            <Link to="/login" className="btns main_color login_register_btns">
              會員登入
            </Link>
          </div>
          <div className="login_register_btn">
            <Link
              to="/login/register"
              className="btns main_color login_register_btns"
            >
              會員註冊
            </Link>
          </div>

          <div className="row justify-content-center">
            <div className="col-10 col-md-4">
              <hr width="100%" size="5" className="" />
            </div>
          </div>
        </div>
      </div>

      {/* 忘記密碼BOX */}
      <div className="forget_password_box mb-5">
        <div className="row justify-content-center">
          {/* <div className="forget_password"></div> */}
          <div className="col-md-8 forget_password">
            <h4 className="text-center text-white py-3">修改密碼</h4>
            <div className="link-top py-2"></div>
            <div className="row justify-content-center mt-2">
              <div className="col-10 d-flex flex-row">
                <ImKey className="me-3 mt-2 login_icons" />
                <input
                  type="password"
                  className="form-control bg-transparent user_register_form_control"
                  placeholder="請輸入新密碼(8~12位半形字元)"
                  id="password"
                  name="password"
                  value={updatePassword.password}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="row justify-content-center mt-4">
              <div className="col-10 d-flex flex-row">
                <ImKey className="me-3 mt-2 login_icons" />
                <input
                  type="comfirmPassword"
                  className="form-control bg-transparent user_register_form_control"
                  placeholder="再一次確認密碼"
                  id="comfirmPassword"
                  name="confirmPassword"
                  value={updatePassword.confirmPassword}
                  onChange={handleChange}
                />
              </div>
            </div>

            <button
              className="btn btn-primary bold mt-3 forget_password_btn"
              onClick={handleSubmit}
            >
              送出
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UpdatePassword
