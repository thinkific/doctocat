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
        {children.map((el) => {
          const { className } = el.props.children.props
          const language = className ? extractLanguage(className) : ''
          return <SubNav.Link href="#" onClick={() => setTab(language)} selected={language === tab}>{language.toUpperCase()}</SubNav.Link>
        })}
      </SubNav>
      {children.map((el) => {
        const { className } = el.props.children.props
        const language = className ? extractLanguage(className) : ''

        return (
          <Box style={{display: tab === language ? 'block' : 'none'}}>
            {el}
          </Box>
        )
      })}
    </>
  )
}

export default Tabs
