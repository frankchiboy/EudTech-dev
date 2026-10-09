import { SiteLink as Link } from '../common/SiteLink';
import SEOHead from '../common/SEOHead';
import { useLanguageContext } from '../../contexts/LanguageContext';

export default function NotFoundPage() {
  const { isEnglish } = useLanguageContext();
  return <section className="mx-auto max-w-3xl px-6 py-32 text-center">
    <SEOHead title={isEnglish ? 'Page not found' : '找不到頁面'} noIndex isEnglish={isEnglish} image="/social/configurator/home.jpg" />
    <h1 className="text-4xl font-bold">{isEnglish ? 'Page not found' : '找不到頁面'}</h1>
    <p className="my-6">{isEnglish ? 'This address is unavailable. Explore our solutions or return home.' : '這個網址目前沒有頁面，請由解決方案或首頁繼續瀏覽。'}</p>
    <Link className="mr-6 underline" to="/">{isEnglish ? 'Home' : '首頁'}</Link>
    <Link className="underline" to="/solutions">{isEnglish ? 'Solutions' : '解決方案'}</Link>
  </section>;
}
