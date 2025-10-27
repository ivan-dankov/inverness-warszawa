interface ComparisonTableProps {
  methods: {
    method: string;
    characteristic: string;
  }[];
}

export function ComparisonTable({ methods }: ComparisonTableProps) {
  return (
    <div className="overflow-x-auto my-6">
      <table className="w-full border-collapse border border-border rounded-lg overflow-hidden">
        <thead>
          <tr className="bg-muted/50">
            <th className="border border-border px-4 py-3 text-left font-semibold text-foreground">
              Metoda
            </th>
            <th className="border border-border px-4 py-3 text-left font-semibold text-foreground">
              Charakterystyka
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
