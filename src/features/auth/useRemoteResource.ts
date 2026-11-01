import { useEffect, useState } from 'react'
import { errorMessage, isAborted } from '../../api/errors'

export function useRemoteResource<T>(load: (signal: AbortSignal) => Promise<T>) {
  const [retry, setRetry] = useState(0)
  const [resource, setResource] = useState<{ load: typeof load; data: T | null; loading: boolean; error: string }>({ load, data: null, loading: true, error: '' })
  useEffect(() => {
    const controller = new AbortController()
    load(controller.signal).then(data => {
      if (!controller.signal.aborted) setResource({ load, data, loading: false, error: '' })
    }).catch(error => {
      if (!controller.signal.aborted && !isAborted(error)) setResource({ load, data: null, loading: false, error: errorMessage(error) })
    })
    return () => controller.abort()
  }, [load, retry])
  const current = resource.load === load ? resource : { data: null, loading: true, error: '' }
  return { ...current, retry: () => { setResource({ load, data: null, loading: true, error: '' }); setRetry(value => value + 1) } }
}
