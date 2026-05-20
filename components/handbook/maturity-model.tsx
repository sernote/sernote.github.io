import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getDictionary, type Locale } from "@/lib/i18n";

export function MaturityModel({ locale = "en" }: { locale?: Locale }) {
  const model = getDictionary(locale).handbook.maturity;

  return (
    <div className="my-8 rounded-lg border border-border bg-card/60">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>{model.headers[0]}</TableHead>
            <TableHead>{model.headers[1]}</TableHead>
            <TableHead>{model.headers[2]}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {model.levels.map(([level, state, pain]) => (
            <TableRow key={level}>
              <TableCell className="font-mono text-primary">{level}</TableCell>
              <TableCell>{state}</TableCell>
              <TableCell>{pain}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
