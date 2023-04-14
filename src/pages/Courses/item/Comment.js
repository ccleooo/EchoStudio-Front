import React, { useState } from 'react'
import { useEffect } from 'react'
import CmmentFrom from './CmmentFrom'
import CommentsStar from './CommentsStar'
import axios from 'axios'

function Comment(props) {
  const [data, setData] = useState([])

  const [flag, setFlag] = useState(false)
  const { comments } = props
  useEffect(() => {
    async function getComment() {
      let response = await axios.get(`http://localhost:3001/coursesComments`)
      setData(response.data)
    }
    getComment()
  }, [flag])
  // console.log('54456415614561456', auth.user.id)
  return (
    <>
      <CmmentFrom refresh={() => setFlag(!flag)} />

      {data.filter((comm) => comm.class_id === comments).length === 0 ? (
        <div className="courseDetail_evaluaten">
          <div className="evaluaten_main">
            <div className="evaluaten_main_right">
              <div className="evaluaten_main_right_text main_color">
                <p>尚無評價</p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        data
          .filter((comm) => comm.class_id === comments)
          .map((v, index) => {
            const dataComment = `${v.comment}`
            let totalStar = v.star

            return (
              <>
                <div className="courseDetail_evaluaten" key={v.id}>
                  <div className="evaluaten_main">
                    <div className="evaluaten_main_left">
                      <img
                        className="evaluaten_main_user_img"
                        src={`${process.env.REACT_APP_NODE_URL}/public/upload/user/${v.user_img}`}
                        alt={v.user_img}
                      ></img>
                      <p className="evaluaten_main_user_name four_color">
                        {v.user_name}
                      </p>
                      <p className="evaluaten_main_user_date main_color">
                        {v.create_time}
                      </p>
                    </div>
                    <div className="evaluaten_main_right">
                      <div className="evaluaten_main_right_star">
                        <div>
                          <CommentsStar
                            commentsId={v.id}
                            refresh={() => setFlag(!flag)}
                          />
                        </div>
                        <p className="evaluaten_main_star_people four_color">
                          {totalStar === null ? '未評分' : totalStar}
                        </p>
                      </div>
                      <div className="evaluaten_main_right_text main_color">
                        <p>
                          <div
                            dangerouslySetInnerHTML={{ __html: dataComment }}
                          />
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )
          })
      )}
    </>
  )
}

export default Comment
