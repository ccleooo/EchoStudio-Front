import React from 'react'
import { useEffect, useState } from 'react'
import axios from 'axios'

function CommentsPeople(props) {
  const { totalPeople } = props

  const [data, setData] = useState([])
  useEffect(() => {
    async function getCommentsPeople() {
      let response = await axios.get(`http://localhost:3001/commentsPeople`)
      setData(response.data)
    }
    getCommentsPeople()
  }, [])

  const filterResult = data.filter((totals) => totals.class_id === totalPeople)
  if (filterResult.length === 0) {
    return <p className="people main_color">0 / 人 已學習</p>
  } else {
    const qty = filterResult[0]
    return <p className="people main_color">{qty.total} / 人 已學習</p>
  }
}

export default CommentsPeople
