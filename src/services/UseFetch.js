import { useState, useEffect, useRef } from 'react'

const baseUrl = process.env.REACT_APP_API_BASE_URL

export default function useFetch(url) {
  // component mounted flag
  const isMountedRef = useRef(false)
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    //  set flag to true when component mounts
    isMountedRef.current = true
    async function init() {
      try {
        const response = await fetch(baseUrl + url)
        if (response.ok) {
          const jsonData = await response.json()
          //  load data to state ONLY if component is MOUNTED
          if (isMountedRef.current) setData(jsonData)
        } else throw response
      } catch (error) {
        if (isMountedRef.current) setError(error)
      } finally {
        if (isMountedRef.current) setLoading(false)
      }
    }
    init()
    //  set flag to true when component unmounts
    return () => (isMountedRef.current = false)
  }, [url])

  return { data, error, loading }
}

// useEffect(() => {
//   isMountedRef.current = true
//   fetch(baseUrl + url)
//     .then((response) => {
//       if (response.ok) return response.json()
//       else throw response
//     })
//     .then((data) => {
//       if (isMountedRef.current) setData(data)
//     })
//     .catch((e) => {
//       if (isMountedRef.current) setError(e)
//     })
//     .finally(() => {
//       if (isMountedRef.current) setLoading(false)
//     })
//   return () => (isMountedRef.current = false)
// }, [url])
