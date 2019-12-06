import {MDXContext} from '@mdx-js/react'
import {Box, Flex} from '@primer/components'
import React from 'react'
import Container from './container'
import Head from './head'
import Header from './header'
import PageFooter from './page-footer'
import Sidebar from './sidebar'
import SourceLink from './source-link'
import StatusLabel from './status-label'
import TableOfContents from './table-of-contents'
import Tabs from './tabs'

function Layout({children, pageContext}) {
  const {h1: H1 = 'h1'} = React.useContext(MDXContext)
  const {
    title,
    description,
    status,
    source,
    additionalContributors = [],
  } = pageContext.frontmatter
  const shouldReconstructChildren = children.length && children.some((e) =>  e.props && e.props.children === '{tab')

  function reconstructChildren() {
    let cursor

    return children.reduce(function(a, e, i) {
      if (e.props.children === '{tab') {
        cursor = i + 1
      } else if (e.props.children === 'tab}') {
        a.push(React.createElement(Tabs, { key: i }, children.slice(cursor, i)))
        cursor = null
      }

      if (e.props.children !== '{tab' && e.props.children !== 'tab}' && !cursor) {
        a.push(e)
      }

      return a
    }, [])
  }

  return (
    <Flex flexDirection="column" minHeight="100vh">
      <Head title={title} description={description} />
      <Header />
      <Flex flex="1 1 auto" flexDirection="row">
        <Box display={['none', null, null, 'block']}>
          <Sidebar />
        </Box>
        <Container>
          <H1>{title}</H1>

          {status || source ? (
            <Flex mb={4} alignItems="center">
              {status ? <StatusLabel status={status} /> : null}
              <Box mx="auto" />
              {source ? <SourceLink href={source} /> : null}
            </Flex>
          ) : null}

          {pageContext.tableOfContents.items ? (
            <TableOfContents items={pageContext.tableOfContents.items} />
          ) : null}

          {shouldReconstructChildren ? reconstructChildren() : children}

          <PageFooter
            editUrl={pageContext.editUrl}
            contributors={pageContext.contributors.concat(
              additionalContributors.map(login => ({login})),
            )}
          />
        </Container>
      </Flex>
    </Flex>
  )
}

export default Layout
