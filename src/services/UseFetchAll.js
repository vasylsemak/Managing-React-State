import { useState, useEffect, useRef } from 'react'

export default function useFetchAll(urls) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  // compare urls on inital render and rerender to prevent infinite fetch request
  // cart is empty when it mounts first time
  const prevUrls = useRef([])
  const isMountedRef = useRef(false)

  useEffect(() => {
    isMountedRef.current = true
    // areEqual - f-n to compare urls arrays
    if (isMountedRef.current && areEqual(prevUrls.current, urls)) {
      setLoading(false)
      return
    }
    // if mot equal - cart arr has chenged -> add new urls arr to urls Ref
    prevUrls.current = urls

    const promises = urls.map((url) =>
      fetch(process.env.REACT_APP_API_BASE_URL + url).then((response) => {
        if (response.ok) return response.json()
        throw response
      })
    )

    Promise.all(promises)
      .then((json) => {
        if (isMountedRef.current) setData(json)
      })
      .catch((e) => {
        console.error(e)
        if (isMountedRef.current) setError(e)
      })
      .finally(() => {
        if (isMountedRef.current) setLoading(false)
      })
    // set isMountedRef to true when component unmounts
    return () => (isMountedRef.current = false)
  }, [urls])

  return { data, loading, error }
}

function areEqual(arr1, arr2) {
  return arr1.length === arr2.length && arr1.every((el, i) => el === arr2[i])
}
