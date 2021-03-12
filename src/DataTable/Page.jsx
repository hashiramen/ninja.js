import React, { useCallback, useMemo } from 'react'

const Page = React.memo(({
  active,
  pageNumber,
  onChange
}) => {
  const handleClick = useCallback((event) => {
    event.preventDefault()
    onChange(pageNumber)
  }, [onChange, pageNumber])

  const actualPageNumber = useMemo(
    () => pageNumber + 1, 
    [pageNumber]
  )

  return(
    <li className="page-item mr-1">
      <button 
        className={`"page-link ${active ? 'button-outline' : ''}"`} 
        onClick={handleClick}
      >
        {actualPageNumber}
      </button>
    </li>
  )
})

export default Page
