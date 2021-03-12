import React from 'react';
import DataTable from './DataTable';
import './App.css';
import CustomRow from './components/CustomRow';

const App = (props) => {
  return (
    <div className="container mt-3">
      <DataTable
        options={{
          keyField: 'per_id',
          rowsPerPage: 5,
          search: true
        }}
        columns={[
          {
            field: 'email',
          },
          { 
            field: 'name1', 
          },
        ]}
        components={{
          Row: ({ rowData }) => {
            const streamlinedData = React.useMemo(() => ({
              name1: rowData.name1,
              edit_path: rowData.edit_path,
              email: rowData.email,
            }), [rowData])

            return (
              <CustomRow 
                row={streamlinedData}
              />
            )
          }
        }}
        data={props.rows}
        locale="da" 
      />
    </div>
  )
}

export default App;
