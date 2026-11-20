import type { ImpactMetric } from './types';

/**
 * Three concise, verified headline outcomes from the master workbook.
 * Detailed methodology and supporting breakdowns live inside the case studies.
 */
export const IMPACT_METRICS: ImpactMetric[] = [
  {
    id: 'metric-sales-report',
    value: '45 min → 10 sec',
    label: 'Automated Daily Reporting',
    context: 'Multi-company ERP sales consolidation running in production via n8n and Docker.',
    projectSlug: 'kalled-automation-analytics',
  },
  {
    id: 'metric-barcode',
    value: '30 min → 5 min',
    label: 'Order Verification Flow',
    context: 'Barcode-scanner verification streamlining warehouse picking and shipping.',
    projectSlug: 'kalled-automation-analytics',
  },
  {
    id: 'metric-commercial',
    value: '300+ Accounts',
    label: 'Commercial Intelligence',
    context: 'Active & inactive client tracking supporting 12 sales reps and catalog decisions.',
    projectSlug: 'kalled-automation-analytics',
  },
];
