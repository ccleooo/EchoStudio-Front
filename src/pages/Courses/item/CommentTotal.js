import React from 'react'
import { useEffect, useState } from 'react'
import axios from 'axios'

function CommentTotal(props) {
  const { totalTotal } = props

  const [data, setData] = useState([])
  useEffect(() => {
    async function getCommentTotal() {
      let response = await axios.get(`http://localhost:3001/commenTotal`)
      setData(response.data)
    }
    getCommentTotal()
  }, [])
  const filterResult = data.filter((totals) => totals.class_id === totalTotal)
  if (filterResult.length === 0) {
    return <p className="evaluate">0 則評價</p>
  } else {
    const qty = filterResult[0]
    return <p className="evaluate">{qty.total} 則評價</p>
  }
}

export default CommentTotal
