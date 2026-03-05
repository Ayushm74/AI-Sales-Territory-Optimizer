export default function SalesDataTable({ data }) {
  return (
    <table className="table-auto border w-full">
      <thead>
        <tr>
          <th>Rep</th>
          <th>Region</th>
          <th>Revenue</th>
          <th>Deals</th>
        </tr>
      </thead>

      <tbody>
        {data.map((row, i) => (
          <tr key={i}>
            <td>{row.sales_rep}</td>
            <td>{row.region}</td>
            <td>{row.revenue}</td>
            <td>{row.deals}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}