import { useNavigate } from 'react-router-dom'
import { useEffect, useRef } from 'react'
import { LayoutDashboard, Clock, ShoppingBag, Brain, Gift, Globe, Zap, DollarSign } from 'lucide-react'
import { App } from '../../types/app'

// Map app IDs to Lucide React icons
const appIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  dashboard: LayoutDashboard,
  timeclock: Clock,
  orders: ShoppingBag,
  'ai-manager': Brain,
  loyalty: Gift,
  'online-order': Globe,
  'instant-funding': Zap,
  payroll: DollarSign,
}

interface TabsProps {
  apps: App[]
  activeAppId: string
}

export default function Tabs({ apps, activeAppId }: TabsProps) {
  const navigate = useNavigate()
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({})
  const previousAppIdRef = useRef<string>(activeAppId)
  const isNavigatingBackRef = useRef(false)
  const isUserClickRef = useRef(false)
  
  const handleAppClick = (app: App) => {
    // Clicking a tab is always forward navigation (scroll to left)
    // Only browser back/forward buttons should trigger right-edge scroll
    isUserClickRef.current = true
    isNavigatingBackRef.current = false
    previousAppIdRef.current = activeAppId
    navigate(`/${app.id}`)
  }

  // Detect browser back/forward navigation via popstate
  useEffect(() => {
    const handlePopState = () => {
      isUserClickRef.current = false
      isNavigatingBackRef.current = true
    }
    
    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  // Update previous app ID when active app changes
  useEffect(() => {
    previousAppIdRef.current = activeAppId
    // Reset user click flag after navigation completes
    isUserClickRef.current = false
  }, [activeAppId])

  // Auto-scroll when active tab changes
  useEffect(() => {
    const scrollContainer = scrollContainerRef.current
    const activeTab = tabRefs.current[activeAppId]
    
    if (!scrollContainer || !activeTab) return

    // Small delay to ensure DOM is updated
    const timeoutId = setTimeout(() => {
      const isBack = isNavigatingBackRef.current
      const isUserClick = isUserClickRef.current
      const scrollWidth = scrollContainer.scrollWidth
      const clientWidth = scrollContainer.clientWidth
      const currentScrollLeft = scrollContainer.scrollLeft
      
      // Only scroll to right edge if it's browser back navigation (not user click)
      if (isBack && !isUserClick) {
        // Scroll to right edge when going back via browser
        const rightEdge = scrollWidth - clientWidth
        scrollContainer.scrollTo({
          left: rightEdge,
          behavior: 'smooth'
        })
        isNavigatingBackRef.current = false
      } else {
        // Scroll active tab to left side of visible area (for both user clicks and forward navigation)
        const containerRect = scrollContainer.getBoundingClientRect()
        const tabRect = activeTab.getBoundingClientRect()
        const tabLeftRelativeToContainer = tabRect.left - containerRect.left + currentScrollLeft
        
        scrollContainer.scrollTo({
          left: tabLeftRelativeToContainer,
          behavior: 'smooth'
        })
      }
    }, 50)

    return () => clearTimeout(timeoutId)
  }, [activeAppId])

  return (
    <div className="bg-white dark:bg-dark-bg-secondary border-b border-gray-200 dark:border-gray-700">
      <div 
        ref={scrollContainerRef}
        className="flex overflow-x-auto scroll-smooth"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {apps.map((app) => {
          const isActive = app.id === activeAppId
          const IconComponent = appIcons[app.id]

          return (
            <button
              key={app.id}
              ref={(el) => {
                tabRefs.current[app.id] = el
              }}
              onClick={() => handleAppClick(app)}
              className={`
                px-5 py-3 text-sm
                border-0 border-b-2 border-l-0 border-r-0 border-t-0
                flex items-center gap-2 whitespace-nowrap
                transition-colors duration-150
                ${
                  isActive
                    ? 'text-primary-500 dark:text-primary-400 border-b-primary-500'
                    : 'text-gray-600 dark:text-gray-400 border-b-transparent hover:text-gray-900 dark:hover:text-white'
                }
                focus:outline-none
                active:border-l-0 active:border-r-0 active:border-t-0
              `}
              title={app.label}
              aria-label={`Switch to ${app.label}`}
              aria-current={isActive ? 'page' : undefined}
            >
              {IconComponent && (
                <IconComponent 
                  className={`w-4 h-4 flex-shrink-0 ${
                    isActive 
                      ? 'text-primary-500 dark:text-primary-400' 
                      : 'text-gray-500 dark:text-gray-400'
                  }`} 
                />
              )}
              <span className="truncate">{app.label}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}

