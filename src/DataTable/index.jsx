import React, { useState, useCallback, useMemo } from 'react'

import Pagination from './Pagination'
import Row from './Row'
import Search from './Search'

const DataTable = ({ 
  data = [],
  columns = [],
  options = {
    keyField: undefined,
    rowsPerPage: 40,
    search: false,
  },
  components = {},
}) => {
  const [rows, setRows] = useState(data);
  const [currentPageNumber, setCurrentPageNumber] = useState(0);

  const calculateTotalNumberOfPages = useCallback((rows) => {
    if (options.rowsPerPage === 0) return 0
    return Math.ceil(rows.length / options.rowsPerPage)
  }, [options.rowsPerPage, rows.length])

  const [totalNumberOfPages, setTotalNumberOfPages] = useState(calculateTotalNumberOfPages(data));

  const filterByValue = useCallback((value, rowData) => Object.keys(rowData).some(
    (propKey) => (columns.some(col => col.field === propKey && (typeof col.searchable === 'boolean' && !col.searchable)))
      ? false
      : rowData[propKey].toString().toLowerCase().search(value) > -1), 
  [columns])

  const handleSearch = useCallback((event) => {
    const text = event.target.value

    const newState = !text 
      ? [...data] 
      : [...data.filter((row) => filterByValue(text, row))]

    setRows(newState)
    setCurrentPageNumber(0)
    setTotalNumberOfPages(calculateTotalNumberOfPages(newState))
  }, [columns, data])

  const handlePageChange = useCallback((pageNumber) => {
    setCurrentPageNumber(pageNumber)
  }, [])

  const rowsInPageNumber = React.useCallback((pageNumber) => {
    const startIndex = pageNumber * options.rowsPerPage
    return [startIndex, startIndex + options.rowsPerPage]
  }, [options.rowsPerPage])

  const rowsToRender = useMemo(() => rows.slice(...rowsInPageNumber(currentPageNumber)), [
    currentPageNumber,
    rows
  ])

  const RowNode = useCallback(
    typeof components.Row === 'function' 
      ? components.Row
      : Row,
    [components])

  const getKeyField = useCallback(
    (rowData, index) => typeof options.keyField === 'undefined'
      ? index
      : rowData[options.keyField], 
    [options])

  return(
    <div>
      {options.search && (
        <Search onSearch={handleSearch} />
      )}
      <table>
        <tbody>
          { rowsToRender.map(
            ( rowData, index ) => (
              <RowNode 
                key={getKeyField(rowData, index)}
                rowData={rowData}
                columns={columns}
              />
            )
          )}
        </tbody>
      </table>
      <Pagination
        currentPageNumber={currentPageNumber}
        totalNumberOfPages={totalNumberOfPages}
        onChange={handlePageChange} 
      />
    </div>
  )
}

export default DataTable
