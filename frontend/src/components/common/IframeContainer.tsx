import { useRef, useEffect, useState } from 'react'
import { useAuth } from '../../contexts/AuthContext'
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
  const { token, accid, apid, employeeid, wpid, sessionData } = useAuth()

  // #region agent log
  useEffect(() => {
    fetch('http://127.0.0.1:7246/ingest/a3325ac2-7580-443c-83c2-0dde3f92a152',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'IframeContainer.tsx:36',message:'Component mounted',data:{url,iframeSrc},timestamp:Date.now(),sessionId:'debug-session',runId:'prevent-reload-fix',hypothesisId:'component-lifecycle'})}).catch(()=>{});
    return () => {
      fetch('http://127.0.0.1:7246/ingest/a3325ac2-7580-443c-83c2-0dde3f92a152',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'IframeContainer.tsx:39',message:'Component unmounted',data:{},timestamp:Date.now(),sessionId:'debug-session',runId:'prevent-reload-fix',hypothesisId:'component-lifecycle'})}).catch(()=>{});
    };
  }, []);
  // #endregion

  // Track iframeSrc changes
  // #region agent log
  useEffect(() => {
    fetch('http://127.0.0.1:7246/ingest/a3325ac2-7580-443c-83c2-0dde3f92a152',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'IframeContainer.tsx:47',message:'iframeSrc state changed',data:{iframeSrc,url},timestamp:Date.now(),sessionId:'debug-session',runId:'prevent-reload-fix',hypothesisId:'state-change'})}).catch(()=>{});
  }, [iframeSrc]);
  // #endregion

  // Handle URL changes - use postMessage for route changes, update src for app changes
  useEffect(() => {
    if (!iframeRef.current) return

    const currentBaseUrl = getBaseUrl(url)
    const currentPath = getPathFromUrl(url)

    // #region agent log
    fetch('http://127.0.0.1:7246/ingest/a3325ac2-7580-443c-83c2-0dde3f92a152',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'IframeContainer.tsx:48',message:'URL change detected',data:{url,currentBaseUrl,currentPath,prevBaseUrl:prevBaseUrlRef.current,prevUrl:prevUrlRef.current},timestamp:Date.now(),sessionId:'debug-session',runId:'prevent-reload',hypothesisId:'route-change'})}).catch(()=>{});
    // #endregion

    // If base URL changed (different app), update src to reload iframe
    if (prevBaseUrlRef.current !== null && prevBaseUrlRef.current !== currentBaseUrl) {
      // #region agent log
      fetch('http://127.0.0.1:7246/ingest/a3325ac2-7580-443c-83c2-0dde3f92a152',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'IframeContainer.tsx:54',message:'Base URL changed - updating src',data:{newBaseUrl:currentBaseUrl,oldBaseUrl:prevBaseUrlRef.current},timestamp:Date.now(),sessionId:'debug-session',runId:'prevent-reload-fix',hypothesisId:'app-change'})}).catch(()=>{});
      // #endregion
      setIframeSrc(url) // Update state to trigger src change
      prevBaseUrlRef.current = currentBaseUrl
      prevUrlRef.current = url
      return
    }

    // If only path changed (same app, different route), use postMessage
    if (prevUrlRef.current !== null && prevUrlRef.current !== url && prevBaseUrlRef.current === currentBaseUrl) {
      const iframeWindow = iframeRef.current.contentWindow
      if (iframeWindow) {
        // #region agent log
        fetch('http://127.0.0.1:7246/ingest/a3325ac2-7580-443c-83c2-0dde3f92a152',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'IframeContainer.tsx:65',message:'Sending route-change postMessage',data:{path:currentPath,fullUrl:url},timestamp:Date.now(),sessionId:'debug-session',runId:'prevent-reload-fix',hypothesisId:'route-change'})}).catch(()=>{});
        // #endregion
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
      // #region agent log
      fetch('http://127.0.0.1:7246/ingest/a3325ac2-7580-443c-83c2-0dde3f92a152',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'IframeContainer.tsx:78',message:'Initial load - setting src',data:{url},timestamp:Date.now(),sessionId:'debug-session',runId:'prevent-reload-fix',hypothesisId:'initial-load'})}).catch(()=>{});
      // #endregion
      setIframeSrc(url) // Set initial src
      prevBaseUrlRef.current = currentBaseUrl
      prevUrlRef.current = url
    }
  }, [url])

  const handleLoad = () => {
    // #region agent log
    fetch('http://127.0.0.1:7246/ingest/a3325ac2-7580-443c-83c2-0dde3f92a152',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'IframeContainer.tsx:103',message:'Iframe onLoad event fired',data:{iframeSrc,currentSrc:iframeRef.current?.src},timestamp:Date.now(),sessionId:'debug-session',runId:'prevent-reload-fix',hypothesisId:'iframe-reload'})}).catch(()=>{});
    // #endregion
    // Send authentication token to iframe when it loads
    if (iframeRef.current && token) {
      const iframe = iframeRef.current
      const iframeWindow = iframe.contentWindow
      
      if (iframeWindow) {
        // Send token and other auth data to the iframe
        iframeWindow.postMessage(
          {
            type: 'authentication',
            token,
            accid,
            apid,
            employeeid,
            wpid,
            sessionData,
            customUrl: getApiUrl(),
          },
          '*', // In production, you should specify the target origin
        )
      }
    }
  }

  return (
    <div className={`relative w-full h-full ${className}`}>
      <iframe
        ref={iframeRef}
        src={iframeSrc}
        className="w-full h-full border-0"
        onLoad={handleLoad}
        sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-top-navigation"
        title="Application Frame"
      />
    </div>
  )
}

