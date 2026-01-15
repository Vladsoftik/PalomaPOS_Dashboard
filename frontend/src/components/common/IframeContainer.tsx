import { useRef, useEffect, useState } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { useTheme } from '../../contexts/ThemeContext'
import { useLanguage } from '../../contexts/LanguageContext'
import { getApiUrl } from '../../services/apiConfigService'

interface IframeContainerProps {
  url: string
  className?: string
}

// Helper functions to extract base URL and path
const getBaseUrl = (url: string): string => {
  try {
    const urlObj = new URL(url)
    return `${urlObj.protocol}//${urlObj.host}`
  } catch {
    return url
  }
}

const getPathFromUrl = (url: string): string => {
  try {
    const urlObj = new URL(url)
    return urlObj.pathname + urlObj.search + urlObj.hash
  } catch {
    return '/'
  }
}

export default function IframeContainer({ url, className = '' }: IframeContainerProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const prevUrlRef = useRef<string | null>(null)
  const prevBaseUrlRef = useRef<string | null>(null)
  // Track the src value separately - only update when we want to reload
  const [iframeSrc, setIframeSrc] = useState<string>(url)
  const { token, sessionData } = useAuth()
  const { theme, resolvedTheme } = useTheme()
  const { language } = useLanguage()


  // Handle URL changes - use postMessage for route changes, update src for app changes
  useEffect(() => {
    if (!iframeRef.current) return

    const currentBaseUrl = getBaseUrl(url)
    const currentPath = getPathFromUrl(url)

    // If base URL changed (different app), update src to reload iframe
    if (prevBaseUrlRef.current !== null && prevBaseUrlRef.current !== currentBaseUrl) {
      setIframeSrc(url) // Update state to trigger src change
      prevBaseUrlRef.current = currentBaseUrl
      prevUrlRef.current = url
      return
    }

    // If only path changed (same app, different route), use postMessage
    if (prevUrlRef.current !== null && prevUrlRef.current !== url && prevBaseUrlRef.current === currentBaseUrl) {
      const iframeWindow = iframeRef.current.contentWindow
      if (iframeWindow) {
        iframeWindow.postMessage(
          {
            type: 'route-change',
            path: currentPath,
            fullUrl: url,
          },
          '*', // In production, you should specify the target origin
        )
      }
      prevUrlRef.current = url
    } else if (prevUrlRef.current === null) {
      // Initial load - set src
      setIframeSrc(url) // Set initial src
      prevBaseUrlRef.current = currentBaseUrl
      prevUrlRef.current = url
    }
  }, [url])

  const handleLoad = () => {
    // Send authentication token and all data to iframe when it loads
    if (iframeRef.current && token) {
      const iframe = iframeRef.current
      const iframeWindow = iframe.contentWindow
      
      if (iframeWindow) {
        // Get all sessionStorage values with the same keys
        const sessionDataToSend = {
          token: sessionStorage.getItem('paloma_token'),
          accid: sessionStorage.getItem('paloma_accid'),
          apid: sessionStorage.getItem('paloma_apid'),
          employeeid: sessionStorage.getItem('paloma_employeeid'),
          wpid: sessionStorage.getItem('paloma_wpid'),
          idautomated_point: sessionStorage.getItem('paloma_idautomated_point'),
          idworkplace: sessionStorage.getItem('paloma_idworkplace'),
          customUrl: sessionStorage.getItem('paloma_customUrl') || getApiUrl(),
        }
        
        // Send token, auth data, theme, and language to the iframe
        iframeWindow.postMessage(
          {
            type: 'authentication',
            ...sessionDataToSend,
            sessionData,
            theme: resolvedTheme, // Send resolved theme (light/dark) to child app
            language: language, // Send current language to child app
          },
          '*', // In production, you should specify the target origin
        )
      }
    }
  }
  
  // Also send theme and language updates when they change
  useEffect(() => {
    if (iframeRef.current && token) {
      const iframe = iframeRef.current
      const iframeWindow = iframe.contentWindow
      
      if (iframeWindow) {
        iframeWindow.postMessage(
          {
            type: 'theme-language-update',
            theme: resolvedTheme,
            language: language,
          },
          '*',
        )
      }
    }
  }, [theme, resolvedTheme, language, token])

  // Handle download requests from iframe
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      // Handle download requests from child app
      if (event.data?.type === 'download') {
        const downloadUrl = event.data.url
        const filename = event.data.filename

        if (downloadUrl) {
          // Create a temporary anchor element to trigger download
          const link = document.createElement('a')
          link.href = downloadUrl
          link.download = filename || ''
          link.target = '_blank'
          link.rel = 'noopener noreferrer'
          document.body.appendChild(link)
          link.click()
          document.body.removeChild(link)
        }
      }
    }

    window.addEventListener('message', handleMessage)
    return () => {
      window.removeEventListener('message', handleMessage)
    }
  }, [])

  return (
    <div className={`relative w-full h-full ${className}`}>
      <iframe
        ref={iframeRef}
        src={iframeSrc}
        className="w-full h-full border-0"
        onLoad={handleLoad}
        sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-top-navigation allow-downloads"
        title="Application Frame"
      />
    </div>
  )
}

