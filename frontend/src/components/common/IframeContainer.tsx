import { useState, useEffect } from 'react'

interface IframeContainerProps {
  url: string
  className?: string
}

export default function IframeContainer({ url, className = '' }: IframeContainerProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    setIsLoading(true)
    setHasError(false)
  }, [url])

  const handleLoad = () => {
    setIsLoading(false)
  }

  const handleError = () => {
    setIsLoading(false)
    setHasError(true)
  }

  return (
    <div className={`relative w-full h-full ${className}`}>
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-50 dark:bg-dark-bg">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500 mb-4"></div>
            <p className="text-gray-700 dark:text-gray-300">Loading application...</p>
          </div>
        </div>
      )}
      {hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-50 dark:bg-dark-bg">
          <div className="text-center">
            <p className="text-red-600 dark:text-red-400 mb-2">Failed to load application</p>
            <p className="text-gray-600 dark:text-gray-400 text-sm">{url}</p>
          </div>
        </div>
      )}
      <iframe
        src={url}
        className="w-full h-full border-0"
        onLoad={handleLoad}
        onError={handleError}
        sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-top-navigation"
        title="Application Frame"
      />
    </div>
  )
}

