import { useState, useEffect } from 'react'

const baseUrl = process.env.REACT_APP_API_BASE_URL

export default function useFetch(url) {
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(baseUrl + url)
      .then((response) => {
        if (response.ok) return response.json()
        else throw response
      })
      .then((data) => setData(data))
      .catch((e) => setError(e))
      .finally(() => setLoading(false))
  }, [url])

  return { data, error, loading }
}

// useEffect(() => {
//   async function init() {
//     try {
//       const response = await fetch(baseUrl + 'products?category=' + url)
//       if (response.ok) {
//         const jsonData = await response.json()
//         setData(jsonData)
//       } else throw response
//     } catch (error) {
//       setError(error)
//     } finally {
//       setLoading(false)
//     }
//   }
//   init()
// }, [url])
