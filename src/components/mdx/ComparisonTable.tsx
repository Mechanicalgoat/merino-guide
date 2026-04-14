export default function ComparisonTable({
  headers,
  rows,
}: {
  headers: string[];
  rows: string[][];
}) {
  return (
    <div className="overflow-x-auto my-6 not-prose">
      <table className="w-full border-3 border-border rounded-xl overflow-hidden">
        <thead>
          <tr>
            {headers.map((h) => (
              <th
                key={h}
                className="bg-mint font-black px-4 py-3 text-left text-sm border-b-3 border-border"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr
              key={i}
              className={i % 2 === 1 ? "bg-cream" : "bg-white"}
            >
              {row.map((cell, j) => (
                <td
                  key={j}
                  className="px-4 py-3 text-sm border-b border-border"
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
