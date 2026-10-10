import reference from '../../data/serviceQuestions.json';

export const getServiceQuestions = (serviceId: string) => {
  const service = reference.services.find(item => item.id === serviceId);
  if (!service) throw new Error(`Unknown service questions: ${serviceId}`);
  return service;
};

export const serviceQuestionsSchema = (serviceId: string, isEnglish: boolean) => {
  const service = getServiceQuestions(serviceId);
  const language = isEnglish ? 'en' : 'zh';
  const pageUrl = `https://eudaemonia.tech${isEnglish ? '/en' : ''}${service.path}`;
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': `${pageUrl}#${service.sectionId}`,
    inLanguage: isEnglish ? 'en' : 'zh-TW',
    about: { '@id': `${pageUrl}#service` },
    mainEntity: service.questions.map(question => ({
      '@type': 'Question',
      '@id': `${pageUrl}#${question.id}`,
      url: `${pageUrl}#${question.id}`,
      name: question.question[language],
      acceptedAnswer: {
        '@type': 'Answer',
        text: question.answer[language],
        url: `${pageUrl}#${question.id}`,
        author: { '@id': 'https://eudaemonia.tech/#organization' }
      }
    }))
  };
};
