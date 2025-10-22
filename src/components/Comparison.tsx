import { useTranslation } from "react-i18next";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Check, X, AlertCircle, Sparkles } from "lucide-react";

export const Comparison = () => {
  const { t } = useTranslation();

  const methods = ['gun', 'needle', 'inverness'];
  const attributes = ['sterility', 'comfort', 'healing', 'childrenSuitability', 'cartilageSuitability', 'features'];

  const getIcon = (method: string, attribute: string) => {
    if (method === 'inverness') {
      return <Check className="h-5 w-5 text-primary inline-block mr-2" />;
    }
    if (method === 'gun' && (attribute === 'sterility' || attribute === 'comfort' || attribute === 'healing' || attribute === 'childrenSuitability' || attribute === 'cartilageSuitability')) {
      return <X className="h-5 w-5 text-destructive inline-block mr-2" />;
    }
    if (method === 'needle' && attribute === 'cartilageSuitability') {
      return <Check className="h-5 w-5 text-primary inline-block mr-2" />;
    }
    return <AlertCircle className="h-5 w-5 text-muted-foreground inline-block mr-2" />;
  };

  return (
    <section id="comparison" className="py-20 bg-background border-t border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            {t('comparison.title')}
          </h2>
          <p className="text-lg text-muted-foreground mb-2">
            {t('comparison.subtitle')}
          </p>
          <p className="text-base text-muted-foreground max-w-3xl mx-auto">
            {t('comparison.description')}
          </p>
        </div>

        <div className="max-w-6xl mx-auto mb-8">
          <h3 className="text-2xl font-semibold text-center text-foreground mb-8">
            {t('comparison.tableTitle')}
          </h3>

          {/* Desktop Table */}
          <div className="hidden lg:block">
            <Card className="overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/50">
                    <TableHead className="w-1/4 font-semibold text-foreground">
                      {t('comparison.attributes.method')}
                    </TableHead>
                    <TableHead className="text-center font-semibold text-foreground">
                      {t('comparison.methods.gun.name')}
                    </TableHead>
                    <TableHead className="text-center font-semibold text-foreground">
                      {t('comparison.methods.needle.name')}
                    </TableHead>
                    <TableHead className="text-center font-semibold text-foreground bg-primary/5 border-l-4 border-primary">
                      <Sparkles className="h-5 w-5 text-primary inline-block mr-2" />
                      {t('comparison.methods.inverness.name')}
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {attributes.map((attr) => (
                    <TableRow key={attr} className="hover:bg-muted/30">
                      <TableCell className="font-medium text-foreground">
                        {t(`comparison.attributes.${attr}`)}
                      </TableCell>
                      {methods.map((method) => (
                        <TableCell 
                          key={method} 
                          className={`text-sm ${method === 'inverness' ? 'bg-primary/5 border-l-4 border-primary font-medium' : ''}`}
                        >
                          {getIcon(method, attr)}
                          {t(`comparison.methods.${method}.${attr}`)}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          </div>

          {/* Mobile Cards */}
          <div className="lg:hidden space-y-6">
            {methods.map((method) => (
              <Card 
                key={method} 
                className={`p-6 ${method === 'inverness' ? 'border-2 border-primary bg-primary/5' : ''}`}
              >
                <h4 className={`text-xl font-bold mb-4 flex items-center ${method === 'inverness' ? 'text-primary' : 'text-foreground'}`}>
                  {method === 'inverness' && <Sparkles className="h-6 w-6 mr-2" />}
                  {t(`comparison.methods.${method}.name`)}
                </h4>
                <div className="space-y-4">
                  {attributes.map((attr) => (
                    <div key={attr}>
                      <div className="font-semibold text-sm text-muted-foreground mb-1">
                        {t(`comparison.attributes.${attr}`)}
                      </div>
                      <div className="text-sm text-foreground flex items-start">
                        {getIcon(method, attr)}
                        <span className="flex-1">{t(`comparison.methods.${method}.${attr}`)}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
