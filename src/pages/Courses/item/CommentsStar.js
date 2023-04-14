import React from 'react'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa'

function CommentsStar(props) {
  const { commentsId, refresh } = props
  const [data, setData] = useState([])

  useEffect(() => {
    async function getCommentsStar() {
      let response = await axios.get(`http://localhost:3001/coursesComments`)
      setData(response.data)
    }
    getCommentsStar()
  }, [refresh])
  const filterResult = data.filter((stars) => stars.id === commentsId)
  const starTotal =
    filterResult.length === 0
      ? 0
      : filterResult[0].star === null
      ? 0
      : filterResult[0].star

  let rawData = starTotal.toString()
  let afterData = rawData.substr(2, 1)
  let starArray = []

  for (let i = 1; i <= rawData; i++) {
    if (i <= rawData) {
      starArray.push(
        <FaStar className="evaluaten_main_right_star_icon" key={i} />
      )
    }
  }
  if (afterData >= 5) {
    starArray.push(<FaStarHalfAlt className="evaluaten_main_right_star_icon" />)
  }

  if (starArray.length < 5) {
    for (let i = starArray.length + 1; i <= 5; i++) {
      starArray.push(
        <FaRegStar className="evaluaten_main_right_star_icon" key={i} />
      )
    }
  }

  return starArray
}

export default CommentsStar
