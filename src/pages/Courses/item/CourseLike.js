import React from 'react'
import { useEffect, useState } from 'react'
import { FaHeart, FaRegHeart } from 'react-icons/fa'
import { useParams } from 'react-router-dom'
import { useAuth } from '../../../hooks/useAuth'
import axios from 'axios'

function CourseLike(props) {
  const { CourseDetailData } = props
  const [like, setLike] = useState(false)
  const { auth } = useAuth()
  const { courseId } = useParams()
  useEffect(() => {
    async function getCourseLike() {
      let response = await axios.get(
        `http://localhost:3001/coursesLike/${courseId}`,
        {
          withCredentials: true,
        }
      )
      if (Array.isArray(response.data) && response.data.length > 0) {
        setLike(true)
      } else {
        setLike(false)
      }
    }
    getCourseLike()
  }, [courseId])

  //加入收藏
  async function addLike(pid) {
    await axios.post(
      `http://localhost:3001/coursesLikeAdd`,
      { class_id: pid },
      { withCredentials: true }
    )
    // console.log('111111111', response.data)

    setLike(true)
  }
  // 取消收藏
  async function deleteLike(pid) {
    await axios.delete(`http://localhost:3001/coursesLikeAdd/${pid}`, {
      withCredentials: true,
    })
    setLike(false)
  }

  return (
    <>
      {auth.isAuth ? (
        <div className="course_like" role="button">
          {like ? (
            <FaHeart
              onClick={() => {
                deleteLike(CourseDetailData[0].id)
              }}
            />
          ) : (
            <FaRegHeart
              onClick={() => {
                addLike(CourseDetailData[0].id)
              }}
            />
          )}
        </div>
      ) : (
        <div className="course_like" role="button">
          <FaRegHeart />
        </div>
      )}
    </>
  )
}

export default CourseLike
