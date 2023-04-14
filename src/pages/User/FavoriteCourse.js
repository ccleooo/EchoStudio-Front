import '../../styles/User/favorite.scss'
import { FaHeart } from 'react-icons/fa'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { useAuth } from '../../hooks/useAuth'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

function Favorite(props) {
  const { auth } = useAuth()
  const [favorites, setFavorites] = useState([])
  let navigate = useNavigate()
  // 收藏
  const [like, setLike] = useState(false)

  useEffect(() => {
    // console.log('會員資料')
    async function getFavorites() {
      let response = await axios.get(
        `http://localhost:3001/users/user_like_course/${auth.user.id}`,
        { withCredentials: true }
      )
      setFavorites(response.data)
    }
    getFavorites()
  }, [auth.user.id])

  // 取消收藏
  async function deleteLike(pid) {
    await axios.delete(`http://localhost:3001/coursesLikeAdd/${pid}`, {
      withCredentials: true,
    })
    setLike(false)
    navigate('/user/favorite')
  }

  return (
    <>
      <div className="container col-md-10">
        <div className="row user_favotites">
          <div className="col-md-10 user_favotites_title">
            <h1>我的收藏</h1>
          </div>
        </div>

        {/* 切換按鈕：我的收藏/我的課程 */}
        <div className="row">
          <div className="col-10 col ms-5 mt-2 favorite_tabs">
            <div className=" main_color d-flex" id="favorite_tab">
              <Link
                to="../favorite"
                type="button"
                className="main_color favorite_btn"
                href="/"
              >
                我的收藏
              </Link>
              <Link
                to="../favorite-class"
                type="button"
                className="main_color favorite_btn favorite_active "
                href="/"
              >
                我的課程
              </Link>
            </div>
          </div>
        </div>

        <div className="row content_favorite main_color mx-3">
          {favorites.map((favorite, i) => {
            return (
              <>
                <div className="col ms-3 mb-4">
                  <div class="card user_favorite_card">
                    <div class="card-body position-relative">
                      <img
                        src={`${process.env.REACT_APP_NODE_URL}/public/upload/courses/${favorite.class_img}`}
                        alt={favorite.class_img}
                        width="155"
                        height="130"
                      />
                      <div role="button">
                        <FaHeart
                          className="position-absolute top-0 end-0 my-2 heart_icon"
                          onClick={() => {
                            deleteLike(favorite.class_id)
                            window.location.reload()
                          }}
                        />
                      </div>

                      <div class="card-text">
                        <h4 className="like_product_category">
                          {favorite.category_name}
                        </h4>
                        <button
                          onClick={() => {
                            navigate(`/coursedetail/${favorite.class_id}`, {
                              state: { ...favorite },
                            })
                          }}
                          className="like_product_name mt-2 "
                        >
                          {favorite.class_name}
                        </button>
                        <div className="d-flex flex-row justify-content-between">
                          <p className="like_product_price">
                            NT$ {favorite.class_price}
                          </p>
                        </div>
                      </div>
                    </div>
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

export default Favorite
