import React, { useRef } from 'react'
import { CSSTransition, SwitchTransition } from 'react-transition-group'
import { useLocation } from 'react-router-dom'

const PageTransition = ({ children }) => {
  const location = useLocation()
  const nodeRef = useRef(null)

  return (
    <SwitchTransition mode='out-in'>
      <CSSTransition
        key={location.pathname}
        nodeRef={nodeRef}
        timeout={300}
        classNames='page-transition'
        unmountOnExit>
        {() => (
          <div
            ref={nodeRef}
            className='page-content-wrapper'>
            {children}
          </div>
        )}
      </CSSTransition>
    </SwitchTransition>
  )
}

export default PageTransition
