import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getDictionary, type Locale } from "@/lib/i18n";

type DecisionMatrixProps = {
  locale?: Locale;
  rows: Array<{
    option: string;
    useWhen: string;
    tradeoff: string;
  }>;
};

export function DecisionMatrix({ rows, locale = "en" }: DecisionMatrixProps) {
  const headers = getDictionary(locale).handbook.matrix;

  return (
    <div className="my-6 rounded-lg border border-border bg-card/50">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>{headers[0]}</TableHead>
            <TableHead>{headers[1]}</TableHead>
            <TableHead>{headers[2]}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.option}>
              <TableCell className="font-medium text-foreground">{row.option}</TableCell>
              <TableCell>{row.useWhen}</TableCell>
              <TableCell>{row.tradeoff}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
