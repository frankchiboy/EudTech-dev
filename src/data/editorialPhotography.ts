export type EditorialPhoto = {
  src: string;
  alt: {
    zh: string;
    en: string;
  };
  objectPosition?: string;
};

export const EDITORIAL_PHOTOGRAPHY = {
  workflowDesign: {
    src: '/editorial-photography/workflow-design.webp',
    alt: {
      zh: '團隊在工作會議中討論數位流程與下一步',
      en: 'A team discussing a digital workflow and next steps in a working session'
    },
    objectPosition: 'center'
  },
  privateInfrastructure: {
    src: '/editorial-photography/private-infrastructure.webp',
    alt: {
      zh: '企業伺服器機櫃中的網路設備與連線',
      en: 'Network equipment and connections inside an enterprise server rack'
    },
    objectPosition: 'center'
  },
  operationsMonitoring: {
    src: '/editorial-photography/operations-monitoring.webp',
    alt: {
      zh: '資訊作業人員在營運中心監看系統狀態',
      en: 'Information operations staff monitoring systems in an operations centre'
    },
    objectPosition: 'center'
  },
  solutionDiscovery: {
    src: '/editorial-photography/solution-discovery.webp',
    alt: {
      zh: '團隊在會議室共同檢視資料並確認需求',
      en: 'A team reviewing data and confirming requirements in a meeting room'
    },
    objectPosition: 'center'
  },
  governanceReview: {
    src: '/editorial-photography/governance-review.webp',
    alt: {
      zh: '專業團隊共同檢視文件並討論決策',
      en: 'A professional team reviewing documents and discussing a decision'
    },
    objectPosition: 'center'
  },
  careerConversation: {
    src: '/editorial-photography/career-conversation.webp',
    alt: {
      zh: '求職者與面談人員進行工作對談',
      en: 'A candidate and interviewer having a career conversation'
    },
    objectPosition: 'center'
  }
} as const satisfies Record<string, EditorialPhoto>;
