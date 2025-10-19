import { useTranslation } from "react-i18next";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export const InvernessComparison = () => {
  const { t } = useTranslation();
  
  const methods = ['gun', 'needle', 'inverness'];
  const columns = ['sterility', 'comfort', 'healing', 'suitability', 'features'];

  return (
    <section className="py-20 bg-background border-t border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            {t('invernessComparison.title')}
          </h2>
          <p className="text-xl font-semibold text-primary mb-3">
            {t('invernessComparison.subtitle')}
          </p>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            {t('invernessComparison.description')}
          </p>
        </div>

        {/* Comparison Table */}
        <div className="max-w-6xl mx-auto">
          <h3 className="text-2xl font-semibold text-foreground mb-6 text-center">
            {t('invernessComparison.compareTitle')}
          </h3>
          
          <Card className="overflow-hidden border-border/50">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-primary/5">
                    <TableHead className="font-bold text-foreground">
                      {t('invernessComparison.table.headers.method')}
                    </TableHead>
                    <TableHead className="font-bold text-foreground">
                      {t('invernessComparison.table.headers.sterility')}
                    </TableHead>
                    <TableHead className="font-bold text-foreground">
                      {t('invernessComparison.table.headers.comfort')}
                    </TableHead>
                    <TableHead className="font-bold text-foreground">
                      {t('invernessComparison.table.headers.healing')}
                    </TableHead>
                    <TableHead className="font-bold text-foreground">
                      {t('invernessComparison.table.headers.suitability')}
                    </TableHead>
                    <TableHead className="font-bold text-foreground">
                      {t('invernessComparison.table.headers.features')}
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {methods.map((method) => (
                    <TableRow 
                      key={method}
                      className={method === 'inverness' ? 'bg-primary/10 hover:bg-primary/15' : ''}
                    >
                      <TableCell className="font-semibold">
                        {t(`invernessComparison.table.methods.${method}.name`)}
                      </TableCell>
                      {columns.map((column) => (
                        <TableCell key={column}>
                          {t(`invernessComparison.table.methods.${method}.${column}`)}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};
