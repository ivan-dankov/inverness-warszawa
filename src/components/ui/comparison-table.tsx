interface ComparisonTableProps {
  methods?: {
    method: string;
    characteristic: string;
  }[];
  criteria?: {
    criterion: string;
    inverness: string;
    gun: string;
  }[];
  headers?: {
    col1?: string;
    col2?: string;
    col3?: string;
  };
}

export function ComparisonTable({ methods, criteria, headers }: ComparisonTableProps) {
  // Support for 3-column comparison (Criterion | Inverness | Gun)
  if (criteria && criteria.length > 0) {
    const col1Header = headers?.col1 || "Kryterium";
    const col2Header = headers?.col2 || "Inverness Med";
    const col3Header = headers?.col3 || "Pistolet";
    
    return (
      <div className="overflow-x-auto my-6">
        <table className="w-full border-collapse border border-border rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-muted/50">
              <th className="border border-border px-4 py-3 text-left font-semibold text-foreground">
                {col1Header}
              </th>
              <th className="border border-border px-4 py-3 text-left font-semibold text-foreground">
                {col2Header}
              </th>
              <th className="border border-border px-4 py-3 text-left font-semibold text-foreground">
                {col3Header}
              </th>
            </tr>
          </thead>
          <tbody>
            {criteria.map((item, index) => (
              <tr 
                key={index} 
                className={index % 2 === 0 ? "bg-background" : "bg-muted/20"}
              >
                <td className="border border-border px-4 py-3 font-medium text-foreground">
                  {item.criterion}
                </td>
                <td className="border border-border px-4 py-3 text-muted-foreground">
                  {item.inverness}
                </td>
                <td className="border border-border px-4 py-3 text-muted-foreground">
                  {item.gun}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  // Original 2-column comparison (Method | Characteristic)
  if (methods && methods.length > 0) {
    const col1Header = headers?.col1 || "Metoda";
    const col2Header = headers?.col2 || "Charakterystyka";
    
    return (
      <div className="overflow-x-auto my-6">
        <table className="w-full border-collapse border border-border rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-muted/50">
              <th className="border border-border px-4 py-3 text-left font-semibold text-foreground">
                {col1Header}
              </th>
              <th className="border border-border px-4 py-3 text-left font-semibold text-foreground">
                {col2Header}
              </th>
            </tr>
          </thead>
          <tbody>
            {methods.map((item, index) => (
              <tr 
                key={index} 
                className={index % 2 === 0 ? "bg-background" : "bg-muted/20"}
              >
                <td className="border border-border px-4 py-3 font-medium text-foreground">
                  {item.method}
                </td>
                <td className="border border-border px-4 py-3 text-muted-foreground">
                  {item.characteristic}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  return null;
}
