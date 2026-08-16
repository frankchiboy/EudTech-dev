import React from 'react';
import { ArrowRight, Database, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

interface FinSightEnterpriseCtaProps {
  isEnglish: boolean;
}

const FinSightEnterpriseCta: React.FC<FinSightEnterpriseCtaProps> = ({ isEnglish }) => (
  <section className="bg-white py-16 dark:bg-gray-900">
    <div className="mx-auto max-w-7xl px-4">
      <div className="rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-50 to-indigo-50 p-8 dark:border-blue-800/30 dark:from-blue-900/20 dark:to-indigo-900/20">
        <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-blue-700 dark:text-blue-300">
              {isEnglish ? 'Enterprise evaluation' : '企業導入評估'}
            </p>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              {isEnglish ? 'Connect FinSight to your financial data workflow' : '將 FinSight 接入企業金融資料流程'}
            </h2>
            <p className="mt-4 max-w-3xl text-lg leading-relaxed text-gray-700 dark:text-gray-300">
              {isEnglish
                ? 'Discuss data sources, API integration, private deployment, access control, and the first business use case with EudTech.'
                : '與 EudTech 討論資料來源、API 整合、私有部署、存取控制與第一個企業使用情境。'}
            </p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="flex items-start gap-3 text-sm text-gray-700 dark:text-gray-200">
                <Database className="mt-0.5 h-5 w-5 shrink-0 text-blue-600 dark:text-blue-300" />
                <span>{isEnglish ? 'Data source and API integration review' : '資料來源與 API 整合評估'}</span>
              </div>
              <div className="flex items-start gap-3 text-sm text-gray-700 dark:text-gray-200">
                <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-blue-600 dark:text-blue-300" />
                <span>{isEnglish ? 'Private deployment and access-control planning' : '私有部署與存取控制規劃'}</span>
              </div>
            </div>
          </div>
          <Link
            to="/contact"
            className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-7 py-4 text-base font-semibold text-white shadow-lg transition hover:bg-blue-700"
          >
            {isEnglish ? 'Request an evaluation' : '預約導入評估'}
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </div>
    </div>
  </section>
);

export default FinSightEnterpriseCta;
