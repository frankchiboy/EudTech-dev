import React from 'react';
import { SiteLink as Link } from '../common/SiteLink';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import testDrive from '../../data/cominoTestDrive.json';
import { tx } from './SitePagePrimitives';
import './CominoTestDriveSection.css';

const CominoTestDriveSection: React.FC<{ isEnglish: boolean }> = ({ isEnglish }) => (
  <section id="test-drive" className="comino-test-drive" aria-labelledby="test-drive-heading">
    <div className="comino-trial-hero">
      <img className="comino-trial-backdrop" src={testDrive.heroImage.src} alt="" loading="lazy" decoding="async" />
      <div className="comino-trial-hero-content">
        <p className="comino-eyebrow">{tx(testDrive.eyebrow, isEnglish)}</p>
        <h2 id="test-drive-heading">{tx(testDrive.title, isEnglish)}</h2>
        <p className="comino-trial-hardware">{testDrive.hardwareLines.map(line => <span key={line}>{line}</span>)}</p>
        <p className="comino-trial-description">{tx(testDrive.description, isEnglish)}</p>
        <div className="comino-actions">
          <a className="comino-button" href={testDrive.application} target="_blank" rel="noreferrer">{tx(testDrive.applyLabel, isEnglish)}<ArrowUpRight size={18} aria-hidden="true" /></a>
          <a className="comino-button comino-button-secondary" href="#test-drive-configurations">{tx(testDrive.configurationsLabel, isEnglish)}<ArrowDown size={18} aria-hidden="true" /></a>
        </div>
      </div>
    </div>
    <div className="comino-wrap comino-trial-content">
      <div className="comino-trial-ecosystem">
        <h3>{tx(testDrive.ecosystemTitle, isEnglish)}</h3>
        <div className="comino-trial-features">
          {testDrive.features.map(feature => <article key={feature.title.en}>
            <img src={feature.image} alt="" width="300" height="180" loading="lazy" decoding="async" />
            <div><h4>{tx(feature.title, isEnglish)}</h4><p>{tx(feature.body, isEnglish)}</p></div>
          </article>)}
        </div>
        <a className="comino-trial-text-link" href={testDrive.softwareSource} target="_blank" rel="noreferrer">{tx(testDrive.softwareLabel, isEnglish)}<ArrowUpRight size={16} aria-hidden="true" /></a>
      </div>
      <div id="test-drive-configurations" className="comino-trial-configurations">
        <p className="comino-eyebrow">Comino GRANDO · AMD Radeon</p>
        <h3>{tx(testDrive.configurationsTitle, isEnglish)}</h3>
        <div className="comino-trial-cards">
          {testDrive.configurations.map(config => <article className="comino-trial-card" key={config.id}>
            <div className="comino-trial-product-image"><img src={config.image} alt={isEnglish ? `Comino chassis illustration for ${config.gpu}` : `${config.gpu} 的 Comino 原廠機箱示意`} width="640" height="480" loading="lazy" decoding="async" /></div>
            <p className="comino-eyebrow">{tx(config.format, isEnglish)}</p>
            <h4>{config.gpu}</h4>
            <dl><dt>{tx(testDrive.memoryLabel, isEnglish)}</dt><dd>{config.memory}</dd></dl>
            <p className="comino-trial-cpu">{tx(config.cpu, isEnglish)}</p>
            <p className="comino-trial-cooling">{tx(testDrive.coolingLabel, isEnglish)}</p>
            <a className="comino-button comino-button-secondary" href={config.href} target="_blank" rel="noreferrer" aria-label={`${tx(testDrive.configurationLabel, isEnglish)} · ${config.gpu}`}>{tx(testDrive.configurationLabel, isEnglish)}<ArrowUpRight size={16} aria-hidden="true" /></a>
          </article>)}
        </div>
        <p className="comino-small">{tx(testDrive.configurationNote, isEnglish)}</p>
      </div>
      <div className="comino-trial-next">
        <h3>{tx(testDrive.stepsTitle, isEnglish)}</h3>
        <ol className="comino-three">
          {testDrive.steps.map((step, index) => <li className="comino-rule" key={step.title.en}>
            <span className="comino-number" aria-hidden="true">0{index + 1}</span>
            <h4>{tx(step.title, isEnglish)}</h4><p>{tx(step.body, isEnglish)}</p>
          </li>)}
        </ol>
        <p className="comino-condition">{tx(testDrive.terms, isEnglish)}</p>
        <div className="comino-actions">
          <a className="comino-button" href={testDrive.application} target="_blank" rel="noreferrer">{tx(testDrive.applyLabel, isEnglish)}<ArrowUpRight size={18} aria-hidden="true" /></a>
          <Link className="comino-button comino-button-secondary" to="/contact">{tx(testDrive.contactLabel, isEnglish)}</Link>
        </div>
        <a className="comino-trial-text-link comino-trial-credit" href={testDrive.source} target="_blank" rel="noreferrer">{tx(testDrive.creditLabel, isEnglish)}<ArrowUpRight size={16} aria-hidden="true" /></a>
      </div>
    </div>
  </section>
);

export default CominoTestDriveSection;
