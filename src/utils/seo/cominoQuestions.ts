import reference from '../../data/cominoProcurement.json';

const origin = 'https://eudaemonia.tech';
export const cominoQuestionSource = (documentId: string, page: number, isEnglish: boolean) => {
  const document = reference.documents.find(item => item.id === documentId);
  if (!document) throw new Error(`Unknown Comino document: ${documentId}`);
  return isEnglish
    ? `${origin}${document.href}#page=${page}`
    : `${origin}${document.readerHrefZh.replace(/\.html$/, '').toLowerCase()}#page-${page}`;
};

export const cominoQuestionsSchema = (isEnglish: boolean) => {
  const language = isEnglish ? 'en' : 'zh';
  const pageUrl = `${origin}${isEnglish ? '/en' : ''}/solutions/ai-infrastructure/`;
  return {
    '@context': 'https://schema.org', '@type': 'FAQPage', '@id': `${pageUrl}#procurement-questions`,
    inLanguage: isEnglish ? 'en' : 'zh-TW',
    mainEntity: reference.faqs.map(faq => ({
      '@type': 'Question', '@id': `${pageUrl}#${faq.id}`, url: `${pageUrl}#${faq.id}`,
      name: faq.question[language],
      acceptedAnswer: {
        '@type': 'Answer', text: faq.answer[language],
        citation: cominoQuestionSource(faq.documentId, faq.page, isEnglish)
      }
    }))
  };
};
