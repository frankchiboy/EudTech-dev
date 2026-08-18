export interface VendorEvidenceSource {
  label: { zh: string; en: string };
  href: string;
}

export const VENDOR_EVIDENCE = {
  anthropic: {
    name: 'Claude Managed Agents',
    image: '/ai-agent/anthropic/managed-agents-hybrid-architecture.webp',
    imageAlt: {
      zh: 'Claude Managed Agents 混合式架構示意，呈現雲端協調、自管執行環境與企業內部系統',
      en: 'Claude Managed Agents hybrid architecture showing cloud orchestration, self-hosted execution, and private enterprise systems'
    },
    sources: {
      overview: {
        label: { zh: 'Anthropic：Claude Managed Agents 概覽', en: 'Anthropic: Claude Managed Agents overview' },
        href: 'https://platform.claude.com/docs/en/managed-agents/overview'
      },
      selfHosted: {
        label: { zh: 'Anthropic：自管 Sandbox', en: 'Anthropic: self-hosted sandboxes' },
        href: 'https://platform.claude.com/docs/en/managed-agents/self-hosted-sandboxes'
      },
      tunnel: {
        label: { zh: 'Anthropic：MCP Tunnels', en: 'Anthropic: MCP tunnels' },
        href: 'https://platform.claude.com/docs/en/agents-and-tools/mcp-tunnels/overview'
      },
      security: {
        label: { zh: 'Anthropic：自管環境安全責任', en: 'Anthropic: self-hosted security model' },
        href: 'https://platform.claude.com/docs/en/managed-agents/self-hosted-sandboxes-security'
      },
      pricing: {
        label: { zh: 'Anthropic：Claude Platform 計費', en: 'Anthropic: Claude Platform pricing' },
        href: 'https://platform.claude.com/docs/en/about-claude/pricing'
      }
    }
  },
  microsoft: {
    name: 'Microsoft Copilot Studio',
    image: '/vendor/microsoft/copilot-studio-product-tour.png',
    imageAlt: {
      zh: 'Microsoft Copilot Studio 原廠產品導覽畫面',
      en: 'Official Microsoft Copilot Studio product-tour screen'
    },
    sources: {
      product: {
        label: { zh: 'Microsoft Copilot Studio 原廠產品頁', en: 'Official Microsoft Copilot Studio product page' },
        href: 'https://www.microsoft.com/en-us/microsoft-365-copilot/microsoft-copilot-studio/'
      },
      connections: {
        label: { zh: 'Microsoft：Agent 連線與驗證', en: 'Microsoft: agent connections and authentication' },
        href: 'https://learn.microsoft.com/en-us/microsoft-copilot-studio/authoring-connections'
      },
      governance: {
        label: { zh: 'Microsoft：Copilot Studio 安全與治理', en: 'Microsoft: Copilot Studio security and governance' },
        href: 'https://learn.microsoft.com/en-us/microsoft-copilot-studio/security-and-governance'
      },
      flows: {
        label: { zh: 'Microsoft：Agent flows 與人員介入', en: 'Microsoft: agent flows and human intervention' },
        href: 'https://learn.microsoft.com/en-us/microsoft-copilot-studio/flows-overview'
      }
    }
  },
  comino: {
    name: 'Comino GRANDO',
    image: '/vendor/comino/grando-blackwell-official.jpg',
    imageAlt: {
      zh: 'Comino GRANDO Blackwell 多 GPU 液冷系統原廠圖片',
      en: 'Official image of a Comino GRANDO Blackwell multi-GPU liquid-cooled system'
    },
    sources: {
      blackwell: {
        label: { zh: 'Comino：GRANDO RTX 5090 與 RTX PRO 6000 Blackwell', en: 'Comino: GRANDO RTX 5090 and RTX PRO 6000 Blackwell' },
        href: 'https://www.comino.com/products/comino-grando-workstation-or-server-with-up-to-8x-rtx-5090'
      },
      server: {
        label: { zh: 'Comino Wiki：GRANDO Server 規格', en: 'Comino Wiki: GRANDO Server specifications' },
        href: 'https://faq.comino.com/grandorm/server'
      },
      downloads: {
        label: { zh: 'Comino：原廠資料下載', en: 'Comino: official downloads' },
        href: 'https://www.comino.com/en/downloads'
      },
      configurator: {
        label: { zh: 'Comino：AI 配置器與實測資料', en: 'Comino: AI configurator and measured data' },
        href: 'https://www.comino.com/en/ai-configurator'
      },
      nvidia: {
        label: { zh: 'NVIDIA：RTX PRO 6000 Blackwell 官方規格', en: 'NVIDIA: RTX PRO 6000 Blackwell official specifications' },
        href: 'https://www.nvidia.com/en-us/products/workstations/professional-desktop-gpus/rtx-pro-6000-family/'
      },
      amd: {
        label: { zh: 'AMD：EPYC 9005 官方規格', en: 'AMD: EPYC 9005 official specifications' },
        href: 'https://www.amd.com/en/products/processors/server/epyc/9005-series.html'
      }
    }
  },
  cyabra: {
    name: 'Cyabra',
    images: {
      profiles: '/vendor/cyabra/inauthentic-profile-analysis.svg',
      volume: '/vendor/cyabra/authenticity-content-volume.svg',
      reasons: '/vendor/cyabra/inauthenticity-reasons.svg',
      topics: '/vendor/cyabra/topic-proliferation.svg'
    },
    sources: {
      corporateComms: {
        label: { zh: 'Cyabra：企業溝通與品牌保護', en: 'Cyabra: corporate communications and brand protection' },
        href: 'https://cyabra.com/solutions/corporate-comms/'
      },
      authenticity: {
        label: { zh: 'Cyabra：真實性與行為分析', en: 'Cyabra: authenticity and behaviour analysis' },
        href: 'https://cyabra.com/product/authenticity-analysis/'
      },
      coordination: {
        label: { zh: 'Cyabra：協調式活動分析', en: 'Cyabra: coordinated activity analysis' },
        href: 'https://cyabra.com/product/coordinated-campaigns-detection/'
      },
      alerts: {
        label: { zh: 'Cyabra：即時敘事警示', en: 'Cyabra: real-time narrative alerts' },
        href: 'https://cyabra.com/product/narrative-alerts/'
      },
      cases: {
        label: { zh: 'Cyabra：官方案例與客戶證言', en: 'Cyabra: official case studies and testimonials' },
        href: 'https://cyabra.com/case-studies/'
      },
      publicSector: {
        label: { zh: 'Cyabra：公部門假資訊偵測', en: 'Cyabra: public-sector disinformation detection' },
        href: 'https://cyabra.com/solutions/public-sector/'
      }
    }
  }
} as const;
