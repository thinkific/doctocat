import { Box, SubNav } from '@primer/components'
import React, { useState } from 'react'

function Tabs({ children }) {
  const initialTab = extractLanguage(children[0].props.children.props.className)
  const [tab, setTab] = useState(initialTab)

  function extractLanguage(str) {
    return str.replace(/language-/, '')
  }

  return (
    <>
      <SubNav aria-label="Main">
        {children.map((el, i) => {
          const { className } = el.props.children.props
          const language = className ? extractLanguage(className) : ''
          return <SubNav.Link key={i} href="#" onClick={() => setTab(language)} selected={language === tab}>{language.toUpperCase()}</SubNav.Link>
        })}
      </SubNav>
      {children.map((el, i) => {
        const { className } = el.props.children.props
        const language = className ? extractLanguage(className) : ''

        return (
          <Box key={i} style={{display: tab === language ? 'block' : 'none'}}>
            {el}
          </Box>
        )
      })}
    </>
  )
}

export default Tabs
