import { useEffect, useRef, type ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import { getServiceQuestions } from '../../utils/seo/serviceQuestions';

export default function ServiceFaqList({ serviceId, isEnglish, className, detailClassName, summaryClassName, answerClassName, summaryIcon }: {
  serviceId: string;
  isEnglish: boolean;
  className?: string;
  detailClassName?: string;
  summaryClassName?: string;
  answerClassName?: string;
  summaryIcon?: ReactNode;
}) {
  const { hash } = useLocation();
  const container = useRef<HTMLDivElement>(null);
  const service = getServiceQuestions(serviceId);
  const language = isEnglish ? 'en' : 'zh';

  useEffect(() => {
    const revealAnswer = () => {
      const target = Array.from(container.current?.querySelectorAll('details') || [])
        .find(item => `#${item.id}` === window.location.hash);
      if (target) target.open = true;
    };
    revealAnswer();
    window.addEventListener('hashchange', revealAnswer);
    return () => window.removeEventListener('hashchange', revealAnswer);
  }, [hash, serviceId, isEnglish]);

  return <div ref={container} className={className}>
    {service.questions.map(item => <details id={item.id} key={item.id} className={detailClassName} style={{ scrollMarginTop: 112 }}>
      <summary className={summaryClassName}>{item.question[language]}{summaryIcon}</summary>
      <p className={answerClassName}>{item.answer[language]}</p>
      <a
        href={`#${item.id}`}
        className="mt-3 inline-flex min-h-6 items-center text-sm font-semibold underline underline-offset-4"
        aria-label={`${isEnglish ? 'Link to this answer: ' : '此問答的連結：'}${item.question[language]}`}
      >{isEnglish ? 'Link to this answer' : '此問答連結'}</a>
    </details>)}
  </div>;
}
