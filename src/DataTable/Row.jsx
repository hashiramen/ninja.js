import React from 'react'

const Row = React.memo(({
  rowData = {},
  columns = [],
}) => {
  return (
    <tr>
      { columns.map(
        ({ field }, index) => (
          <td key={index}>
            {rowData[field]}
          </td>
        )
      )}
    </tr>
  )
})

export default Row
