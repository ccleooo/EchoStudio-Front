import React from 'react'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa'

function CourseDetailStar(props) {
  const { courseDetailStar } = props
  const [data, setData] = useState([])
  useEffect(() => {
    async function getCourseDetailStar() {
      let response = await axios.get(`http://localhost:3001/coursesStar`)
      setData(response.data)
    }
    getCourseDetailStar()
  }, [])
  const filterResult = data.filter(
    (stars) => stars.class_id === courseDetailStar
  )
  const starTotal = filterResult.length === 0 ? 0 : filterResult[0].total
  let rawData = starTotal.toString()
  let starArray = []
  let afterData = rawData.substr(2, 1)

  for (let i = 1; i <= rawData; i++) {
    if (i <= rawData) {
      starArray.push(<FaStar className="star_like_icon_people" key={i} />)
    }
  }

  if (afterData >= 5) {
    starArray.push(<FaStarHalfAlt className="star_like_icon_people" />)
  }

  if (starArray.length < 5) {
    for (let i = starArray.length + 1; i <= 5; i++) {
      starArray.push(<FaRegStar className="star_like_icon_people" key={i} />)
    }
  }

  return starArray
}

export default CourseDetailStar
