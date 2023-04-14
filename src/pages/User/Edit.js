import '../../styles/User/profile.scss'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { useAuth } from '../../hooks/useAuth'
import { useNavigate } from 'react-router-dom'
import { Toast } from '@douyinfe/semi-ui'

function Edit() {
  const navigate = useNavigate()
  const { auth, setAuth } = useAuth()
  const [editUser, setEditUser] = useState([])

  // 選擇的檔案
  const [selectedFile, setSelectedFile] = useState(null)
  // 是否有檔案被挑選
  const [isFilePicked, setIsFilePicked] = useState(false)
  // 預覽圖片
  const [preview, setPreview] = useState('')
  // server上的圖片網址
  const [imgServerUrl, setImgServerUrl] = useState('')

  useEffect(() => {
    async function getEditUser() {
      let response = await axios.get(
        `http://localhost:3001/user/${auth.user.id}`
      )
      setEditUser(response.data[0])
    }
    getEditUser()
  }, [auth.user.id])

  function handleChange(e) {
    setEditUser({ ...editUser, [e.target.name]: e.target.value })
  }

  function handleUpload(e) {
    // file input 的值並不是存在 value 欄位裡
    setEditUser({ ...editUser, user_img: e.target.files[0] })
  }

  async function handleSubmit(e) {
    // console.log('handleSubmitUser')
    e.preventDefault()

    let formData = new FormData()
    formData.append('user_account', editUser.user_account)
    formData.append('user_name', editUser.user_name)
    formData.append('user_birthday', editUser.user_birthday)
    formData.append('user_address', editUser.user_address)
    formData.append('user_phone', editUser.user_phone)
    formData.append('user_mail', editUser.user_mail)
    formData.append('carrier', editUser.carrier)
    formData.append('user_img', editUser.user_img)
    let response = await axios.put(
      `http://localhost:3001/user/update/${auth.user.id}`,
      formData
    )
    Toast.success(response.data.msg)
    navigate('/user/profile')
    window.location.reload()
  }

  //setAuth
  useEffect(() => {
    let newAuth = { isAuth: auth.isAuth, user: { ...auth.user } }
    newAuth.user.account = editUser.user_account
    newAuth.user.name = editUser.user_name
    newAuth.user.birthday = editUser.user_birthday
    newAuth.user.address = editUser.user_address
    newAuth.user.phone = editUser.user_phone
    newAuth.user.email = editUser.user_mail
    newAuth.user.carrier = editUser.carrier
    setAuth(newAuth)
  }, [])

  // 當選擇檔案更動時建立預覽圖
  useEffect(() => {
    if (!selectedFile) {
      setPreview('')
      return
    }

    const objectUrl = URL.createObjectURL(selectedFile)
    // console.log(objectUrl)
    setPreview(objectUrl)

    // 當元件unmounted時清除記憶體
    return () => URL.revokeObjectURL(objectUrl)
  }, [selectedFile])

  const changeHandler = (e) => {
    const file = e.target.files[0]

    if (file) {
      setIsFilePicked(true)
      setSelectedFile(file)
      setImgServerUrl('')
    } else {
      setIsFilePicked(false)
      setSelectedFile(null)
      setImgServerUrl('')
    }
  }

  // const handleSubmission = () => {
  //   const formData = new FormData()

  //   // 對照server上的檔案名稱 req.files.avatar
  //   formData.append('avatar', selectedFile)

  //   fetch(
  //     'http://localhost:5555/upload-avatar', //server url
  //     {
  //       method: 'POST',
  //       body: formData,
  //     }
  //   )
  //     .then((response) => response.json())
  //     .then((result) => {
  //       console.log('Success:', result)
  //       setImgServerUrl('http://localhost:5555/uploads/' + result.data.name)
  //     })
  //     .catch((error) => {
  //       console.error('Error:', error)
  //     })
  // }

  return (
    <>
      <div className="col-md-10">
        <div className="container">
          <div className="row">
            <div className="col-md-10 profile_title">
              <h1>會員基本資料</h1>
            </div>
          </div>
          <div className="row content_profile main_color justify-content-center">
            <div className="col-5 mx-2 edit_member_content">
              <form className="user_edit_profile_form">
                <div className="mb-4">
                  <label for="userAccount" className="form-label">
                    <span>* </span>帳號
                  </label>
                  <input
                    type="text"
                    name="user_account"
                    className="form-control bg-transparent user_edit_profile_form_control"
                    id="userAccount"
                    value={editUser.user_account}
                    onChange={handleChange}
                    placeholder={auth.user.account}
                  />
                </div>
                <div className="mb-4">
                  <label for="userName" className="form-label">
                    <span>* </span>姓名
                  </label>
                  <input
                    type="text"
                    name="user_name"
                    className="form-control bg-transparent user_edit_profile_form_control"
                    id="userName"
                    value={editUser.user_name}
                    onChange={handleChange}
                    placeholder={auth.user.name}
                  />
                </div>
                <div className="mb-4">
                  <label for="userBirthday" className="form-label">
                    <span>* </span>生日
                  </label>
                  <input
                    type="date"
                    style={{
                      background: 'transparent',
                      color: 'white',
                    }}
                    name="user_birthday"
                    className="form-control bg-transparent user_edit_profile_form_control"
                    id="user_birthday"
                    value={editUser.user_birthday}
                    onChange={handleChange}
                    placeholder={auth.user.birthday}
                  />
                </div>
                <div className="mb-4">
                  <label for="userAddress" className="form-label">
                    <span>* </span>地址
                  </label>
                  <input
                    type="address"
                    name="user_address"
                    className="form-control bg-transparent user_edit_profile_form_control"
                    id="user_address"
                    value={editUser.user_address}
                    onChange={handleChange}
                    placeholder={auth.user.address}
                  />
                </div>
                <div className="mb-4">
                  <label for="userPhone" className="form-label">
                    <span>* </span>手機
                  </label>
                  <input
                    type="phone"
                    name="user_phone"
                    className="form-control bg-transparent user_edit_profile_form_control"
                    id="user_phone"
                    value={editUser.user_phone}
                    onChange={handleChange}
                    placeholder={auth.user.phone}
                  />
                </div>
              </form>
            </div>
            <div className="col-5 mx-2 edit_member_content">
              <form className="user_edit_profile_form">
                <div className="mb-4">
                  <label for="userEmail" className="form-label">
                    <span>* </span>信箱
                  </label>
                  <input
                    type="email"
                    name="user_mail"
                    className="form-control bg-transparent user_edit_profile_form_control"
                    id="user_mail"
                    value={editUser.user_mail}
                    onChange={handleChange}
                    placeholder={auth.user.email}
                  />
                </div>
                <div className="mb-4">
                  <label for="userInvoice" className="form-label">
                    會員載具
                  </label>
                  <input
                    type="text"
                    name="carrier"
                    className="form-control bg-transparent user_edit_profile_form_control"
                    id="carrier"
                    value={editUser.carrier}
                    onChange={handleChange}
                    placeholder={auth.user.carrier}
                  />
                </div>
                <div className="mb-4">
                  <label for="userInvoice" className="form-label mb-3">
                    <span>* </span>會員照片
                  </label>
                  {/* <input
                    className=" form-control bg-transparent user_edit_profile_form_control w-full border-2 border-purple-200 rounded-md h-10 focus:outline-none focus:border-purple-400 px-2"
                    type="file"
                    id="user_img"
                    name="user_img"
                    onChange={handleUpload}
                  /> */}
                  <input
                    type="file"
                    name="file"
                    className="user_edit_profile_form_control"
                    onChange={(e) => {
                      handleUpload(e)
                      changeHandler(e)
                    }}
                  />
                  {selectedFile && (
                    <div>
                      <img
                        src={preview}
                        alt=""
                        width="160"
                        className="mt-4 img_border rounded-circle"
                      />
                    </div>
                  )}
                  {isFilePicked ? (
                    <div></div>
                  ) : (
                    <div>
                      <p className="mt-2">(請選擇照片進行預覽)</p>
                    </div>
                  )}
                </div>
              </form>
            </div>
          </div>

          <div className="row mb-5 justify-content-center">
            <div className="col-2">
              <button
                type="submit"
                className="edit_profile_btn"
                onClick={handleSubmit}
              >
                送出
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Edit
