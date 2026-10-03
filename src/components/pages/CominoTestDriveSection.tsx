import React from 'react';
import { Link } from 'react-router-dom';
import testDrive from '../../data/cominoTestDrive.json';
import { tx } from './SitePagePrimitives';

const CominoTestDriveSection: React.FC<{ isEnglish: boolean }> = ({ isEnglish }) => (
  <section id="test-drive" className="comino-section comino-test-drive" aria-labelledby="test-drive-heading">
    <div className="comino-wrap">
      <div className="comino-intro">
        <p className="comino-eyebrow">{tx(testDrive.eyebrow, isEnglish)}</p>
        <h2 id="test-drive-heading">{tx(testDrive.title, isEnglish)}</h2>
        <p>{tx(testDrive.description, isEnglish)}</p>
      </div>
      <ol className="comino-three">
        {testDrive.steps.map((step, index) => (
          <li className="comino-rule" key={step.title.en}>
            <span className="comino-number" aria-hidden="true">0{index + 1}</span>
            <h3>{tx(step.title, isEnglish)}</h3>
            <p>{tx(step.body, isEnglish)}</p>
          </li>
        ))}
      </ol>
      <p className="comino-condition">{tx(testDrive.terms, isEnglish)}</p>
      <div className="comino-actions">
        <a className="comino-button" href={testDrive.application} target="_blank" rel="noreferrer">{tx(testDrive.applyLabel, isEnglish)}</a>
        <a className="comino-button comino-button-secondary" href={testDrive.source} target="_blank" rel="noreferrer">{tx(testDrive.sourceLabel, isEnglish)}</a>
        <Link className="comino-button comino-button-secondary" to="/contact">{tx(testDrive.contactLabel, isEnglish)}</Link>
      </div>
    </div>
  </section>
);

export default CominoTestDriveSection;
