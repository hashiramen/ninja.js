import React, { useMemo } from 'react'

import Page from './Page'

const Pagination = React.memo(({ 
  currentPageNumber, 
  totalNumberOfPages, 
  onChange 
}) => {
  const pages = useMemo(
    () => Array
      .from(Array(totalNumberOfPages).keys())
      .map(pageNumber => (
        <Page
          key={pageNumber}
          active={pageNumber == currentPageNumber}
          pageNumber={pageNumber}
          onChange={onChange} 
        />
      )),
    [onChange, currentPageNumber])

  return !totalNumberOfPages ? null : (
    <ul className="pagination">
      {pages}
    </ul>
  )
})

export default Pagination
