declare module 'react-scrollspy-nav' {
  import { ReactNode } from 'react'

  interface ScrollspyNavProps {
    scrollTargetIds: string[]
    offset?: number
    activeNavClass?: string
    scrollDuration?: string | number
    children?: ReactNode
  }

  const ScrollspyNav: React.FC<ScrollspyNavProps>
  export default ScrollspyNav
}
