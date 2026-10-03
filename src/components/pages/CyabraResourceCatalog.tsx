import React, { useState } from 'react';
import { ArrowUpRight, ChevronDown, Search } from 'lucide-react';
import { cyabraPartnerCatalog } from '../../data/cyabraPartnerCatalog';

const CyabraResourceCatalog: React.FC<{ isEnglish: boolean }> = ({ isEnglish }) => {
  const [query, setQuery] = useState('');
  const [format, setFormat] = useState('all');
  const [limit, setLimit] = useState(10);
  const results = cyabraPartnerCatalog.filter(item => (format === 'all' || item.format === format) && `${item.title} ${item.category}`.toLowerCase().includes(query.trim().toLowerCase()));
  return <details className="cy-catalog">
    <summary><div><strong>{isEnglish ? 'Explore the complete partner resource index' : '探索完整合作夥伴素材目錄'}</strong><span>{cyabraPartnerCatalog.length} {isEnglish ? 'resources · original vendor titles · updated 4 Oct 2026' : '項素材 · 保留原廠名稱 · 2026.10.04 盤點'}</span></div><ChevronDown size={20}/></summary>
    <div className="cy-catalog-body"><p>{isEnglish ? 'Search reports, solution decks, worksheets, and videos. The original material opens in the Cyabra portal and requires your own authorized account.' : '搜尋調查報告、方案簡報、工作表與操作影片。原始素材在 Cyabra 平台開啟，需使用具權限的帳號登入。'}</p>
      <div className="cy-catalog-controls"><label><Search size={18}/><input type="search" value={query} onChange={event=>{setQuery(event.target.value);setLimit(10);}} placeholder={isEnglish ? 'Search original titles, e.g. Taiwan, Alerts…' : '搜尋原廠名稱，例如 Taiwan、Alerts…'} aria-label={isEnglish ? 'Search partner materials' : '搜尋合作夥伴素材'}/></label><select aria-label={isEnglish?'File format':'檔案格式'} value={format} onChange={event=>{setFormat(event.target.value);setLimit(10);}}><option value="all">{isEnglish?'All formats':'所有格式'}</option>{['pdf','pptx','mp4','docx','jpg'].map(value=><option key={value} value={value}>{value.toUpperCase()}</option>)}</select></div>
      <p className="cy-catalog-count" role="status">{results.length} {isEnglish?'matching resources':'項符合的素材'}</p>
      {results.length ? <ul>{results.slice(0,limit).map(item=><li key={item.title}><span>{item.format.toUpperCase()}</span><a href={`https://partners.cyabra.com/px/digital-asset-management/admin/media-library?renderMode=Collection&q=${encodeURIComponent(item.title)}`} target="_blank" rel="noreferrer">{item.title}<ArrowUpRight size={16}/></a></li>)}</ul> : <p className="cy-catalog-empty">{isEnglish?'No matching materials. Try a different title or file format.':'沒有符合的素材，請改用其他名稱或檔案格式。'}</p>}
      {results.length > limit && <button type="button" className="cy-load-more" onClick={()=>setLimit(value=>value+20)}>{isEnglish?'Show more resources':'顯示更多素材'}<ChevronDown size={16}/></button>}
    </div>
  </details>;
};
export default CyabraResourceCatalog;
