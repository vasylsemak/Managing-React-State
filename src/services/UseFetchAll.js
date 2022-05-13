import { useState, useEffect, useRef } from 'react'

export default function useFetchAll(urls) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  // compare urls on inital render and rerender to prevent infinite fetch request
  // cart is empty when it mounts first time
  const prevUrls = useRef([])

  useEffect(() => {
    // areEqual - f-n to compare urls arrays
    if (areEqual(prevUrls.current, urls)) {
      setLoading(false)
      return
    }
    // if mot equal - cart arr has chenged -> new fetch request
    prevUrls.current = urls

    const promises = urls.map((url) =>
      fetch(process.env.REACT_APP_API_BASE_URL + url).then((response) => {
        if (response.ok) return response.json()
        throw response
      })
    )

    Promise.all(promises)
      .then((json) => setData(json))
      .catch((e) => {
        console.error(e)
        setError(e)
      })
      .finally(() => setLoading(false))
  }, [urls])

  return { data, loading, error }
}

function areEqual(arr1, arr2) {
  return arr1.length === arr2.length && arr1.every((el, i) => el === arr2[i])
}
