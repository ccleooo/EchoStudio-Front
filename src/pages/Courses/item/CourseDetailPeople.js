import React from 'react'
import { useEffect, useState } from 'react'
import axios from 'axios'

function CourseDetailPeople(props) {
  const { courseDetailPeople } = props
  const [data, setData] = useState([])
  useEffect(() => {
    async function getCourseDetailStar() {
      let response = await axios.get(`http://localhost:3001/coursesStar`)
      setData(response.data)
    }
    getCourseDetailStar()
  }, [])

  const filterResult = data.filter(
    (prople) => prople.class_id === courseDetailPeople
  )
  if (filterResult.length === 0) {
    return <p className="star_people main_color">(0)</p>
  } else {
    const qty = filterResult[0]
    return <p className="star_people main_color">({qty.total})</p>
  }

}

export default CourseDetailPeople
