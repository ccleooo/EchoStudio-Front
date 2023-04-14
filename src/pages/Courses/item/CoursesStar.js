import React from 'react'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa'
function CoursesStar(props) {
  const { coursesStar } = props

  const [data, setData] = useState([])
  useEffect(() => {
    async function getCoursesStar() {
      let response = await axios.get(`http://localhost:3001/coursesStar`)
      setData(response.data)
    }
    getCoursesStar()
  }, [])
  const filterResult = data.filter((stars) => stars.class_id === coursesStar)
  const starTotal = filterResult.length === 0 ? 0 : filterResult[0].total

  let rawData = starTotal.toString()
  // 取小數點後第一位的值
  let afterData = rawData.substr(2, 1)
  let starArray = []

  for (let i = 1; i <= rawData; i++) {
    if (i <= rawData) {
      starArray.push(<FaStar className="star_icon_people" key={i} />)
    }
  }

  if (afterData >= 5) {
    starArray.push(<FaStarHalfAlt className="star_icon_people" />)
  }

  if (starArray.length < 5) {
    for (let i = starArray.length + 1; i <= 5; i++) {
      starArray.push(<FaRegStar className="star_icon_people" key={i} />)
    }
  }

  return starArray
}

export default CoursesStar
