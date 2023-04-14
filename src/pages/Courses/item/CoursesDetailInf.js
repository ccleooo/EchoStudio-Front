import React from 'react'
import { useEffect, useState } from 'react'
import axios from 'axios'

function CoursesDetailInf(props) {
  const { coursesDetailInf } = props

  const [data, setData] = useState([])
  useEffect(() => {
    async function getCommentsPeople() {
      let response = await axios.get(`http://localhost:3001/commentsPeople`)
      setData(response.data)
    }
    getCommentsPeople()
  }, [])

  const filterResult = data.filter(
    (totals) => totals.class_id === coursesDetailInf
  )
  if (filterResult.length === 0) {
    return <p className="four_color">0位同學</p>
  } else {
    const qty = filterResult[0]
    return <p className="four_color">{qty.total}位同學</p>
  }
}
export default CoursesDetailInf
