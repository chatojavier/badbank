const Table = ({columns, rows}) => {
    
    const tableHeaders = columns.map(column => (
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" key={column.accessor}>{column.header}</th>
    ))
    const tableRows = rows.map((row, index) => (
        <tr key={index}>
            {columns.map(column => {
                const key = column.accessor;
                return <td className="px-6 py-4 whitespace-nowrap" key={key}>{String(row[key])}</td>
            })}
        </tr>
    ))

    return (
        <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr className="">
                        {tableHeaders}
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {tableRows}
                </tbody>
            </table>
        </div>
    )
}

export default Table;