export type ConfiguratorSeoPage = {
  slug: string;
  title: {
    en: string;
    zh: string;
  };
  description: {
    en: string;
    zh: string;
  };
  keywords: {
    en: string;
    zh: string;
  };
  hero: {
    en: string;
    zh: string;
  };
  lead: {
    en: string;
    zh: string;
  };
  image: string;
  imageAlt: {
    en: string;
    zh: string;
  };
  configuratorHref: string;
  quoteHref: string;
  highlights: Array<{
    en: string;
    zh: string;
  }>;
  specs: Array<{
    label: {
      en: string;
      zh: string;
    };
    value: {
      en: string;
      zh: string;
    };
  }>;
  faqs: Array<{
    question: {
      en: string;
      zh: string;
    };
    answer: {
      en: string;
      zh: string;
    };
  }>;
};

export const SITE_ORIGIN = 'https://eudaemonia.tech';

export const CONFIGURATOR_SEO_PAGES: ConfiguratorSeoPage[] = [
  {
    slug: 'nvidia-h200-server',
    title: {
      en: 'NVIDIA H200 GPU Server Configurator',
      zh: 'NVIDIA H200 GPU 伺服器配置器'
    },
    description: {
      en: 'Configure liquid-cooled NVIDIA H200 GPU servers for AI training, inference, and HPC workloads. Send your selected configuration to EudTech for a formal quote.',
      zh: '配置液冷 NVIDIA H200 GPU 伺服器，適用於 AI 訓練、推論與 HPC 工作負載，並可直接送出配置需求取得正式報價。'
    },
    keywords: {
      en: 'NVIDIA H200 server, H200 GPU server, AI training server, HPC GPU server, GPU server quote, liquid cooled GPU server, Taiwan AI server',
      zh: 'NVIDIA H200 伺服器, H200 GPU 伺服器, AI 訓練伺服器, HPC GPU 伺服器, GPU 伺服器報價, 液冷 GPU 伺服器, 台灣 AI 伺服器'
    },
    hero: {
      en: 'NVIDIA H200 GPU servers for dense AI workloads',
      zh: '面向高密度 AI 工作負載的 NVIDIA H200 GPU 伺服器'
    },
    lead: {
      en: 'Start from a Grando rackable workstation configuration, adjust GPU count, CPU, memory, storage, power, and networking, then submit the exact build to EudTech.',
      zh: '從 Grando 機架式工作站配置開始，調整 GPU 數量、CPU、記憶體、儲存、電源與網路後，將完整配置送交 EudTech。'
    },
    image: '/grando-8gpu-server.jpg',
    imageAlt: {
      en: 'Liquid-cooled Grando GPU server for NVIDIA H200 configurations',
      zh: '可配置 NVIDIA H200 的 Grando 液冷 GPU 伺服器'
    },
    configuratorHref: '/configurator/29',
    quoteHref: '/configurator/29?request=true',
    highlights: [
      {
        en: 'Designed for AI training, inference, simulation, and research clusters.',
        zh: '適用於 AI 訓練、推論、模擬與研究叢集。'
      },
      {
        en: 'Configurator keeps GPU, CPU, memory, storage, and power selections together.',
        zh: '配置器會同步保留 GPU、CPU、記憶體、儲存與電源選項。'
      },
      {
        en: 'Quote request includes a shareable configuration link for procurement review.',
        zh: '詢價內容包含可分享的配置連結，方便採購與技術審查。'
      }
    ],
    specs: [
      { label: { en: 'GPU focus', zh: 'GPU 重點' }, value: { en: 'NVIDIA H200 141GB options', zh: 'NVIDIA H200 141GB 選項' } },
      { label: { en: 'Form factor', zh: '機構型態' }, value: { en: 'Rackable liquid-cooled Grando systems', zh: '可上架 Grando 液冷系統' } },
      { label: { en: 'Best fit', zh: '適合需求' }, value: { en: 'AI labs, HPC teams, and data center procurement', zh: 'AI 實驗室、HPC 團隊與資料中心採購' } }
    ],
    faqs: [
      {
        question: { en: 'Can I request a quote without choosing every component?', zh: '沒有選完所有零件也可以詢價嗎？' },
        answer: { en: 'Yes. The configurator sends the current configuration state, and EudTech can follow up on incomplete or optional items.', zh: '可以。配置器會送出目前選擇狀態，未完成或選配項目可由 EudTech 後續確認。' }
      },
      {
        question: { en: 'Is this page for Taiwan procurement?', zh: '這個頁面適合台灣採購使用嗎？' },
        answer: { en: 'Yes. EudTech handles local consultation and quote follow-up for Taiwan buyers.', zh: '適合。EudTech 可協助台灣客戶進行本地諮詢與報價追蹤。' }
      }
    ]
  },
  {
    slug: 'rtx-pro-6000-workstation',
    title: {
      en: 'RTX PRO 6000 AI Workstation Configurator',
      zh: 'RTX PRO 6000 AI 工作站配置器'
    },
    description: {
      en: 'Configure RTX PRO 6000 workstation builds for AI development, rendering, simulation, and local inference. Send the configuration to EudTech for quote follow-up.',
      zh: '配置 RTX PRO 6000 工作站，適用於 AI 開發、渲染、模擬與本地推論，並可直接送出需求給 EudTech 追蹤報價。'
    },
    keywords: {
      en: 'RTX PRO 6000 workstation, AI workstation, GPU workstation quote, NVIDIA workstation Taiwan, local AI inference workstation',
      zh: 'RTX PRO 6000 工作站, AI 工作站, GPU 工作站報價, NVIDIA 工作站 台灣, 本地 AI 推論工作站'
    },
    hero: {
      en: 'RTX PRO 6000 workstations for local AI and visualization',
      zh: '面向本地 AI 與視覺化工作的 RTX PRO 6000 工作站'
    },
    lead: {
      en: 'Use the configurator to align GPU, CPU, memory, NVMe storage, and networking before sending a quote request.',
      zh: '使用配置器先對齊 GPU、CPU、記憶體、NVMe 儲存與網路，再送出報價需求。'
    },
    image: '/comino-workstation-front.png',
    imageAlt: {
      en: 'Comino Grando workstation for RTX PRO 6000 configurations',
      zh: '可配置 RTX PRO 6000 的 Comino Grando 工作站'
    },
    configuratorHref: '/configurator/28',
    quoteHref: '/configurator/28?request=true',
    highlights: [
      {
        en: 'Built for AI development, visualization, rendering, and simulation teams.',
        zh: '適用於 AI 開發、視覺化、渲染與模擬團隊。'
      },
      {
        en: 'Workstation route helps buyers compare desktop and rackable configurations.',
        zh: '工作站路線可協助採購比較桌面式與機架式配置。'
      },
      {
        en: 'Share link preserves selected configuration for internal review.',
        zh: '分享連結會保留已選配置，方便內部審查。'
      }
    ],
    specs: [
      { label: { en: 'GPU focus', zh: 'GPU 重點' }, value: { en: 'NVIDIA RTX PRO 6000 class options', zh: 'NVIDIA RTX PRO 6000 等級選項' } },
      { label: { en: 'Use case', zh: '應用場景' }, value: { en: 'Local AI inference, rendering, simulation', zh: '本地 AI 推論、渲染、模擬' } },
      { label: { en: 'Quote path', zh: '詢價路徑' }, value: { en: 'Configurator form to info@eudaemonia.tech', zh: '配置器表單送至 info@eudaemonia.tech' } }
    ],
    faqs: [
      {
        question: { en: 'Can I compare RTX PRO 6000 and H200 builds?', zh: '可以比較 RTX PRO 6000 與 H200 配置嗎？' },
        answer: { en: 'Yes. Use the workstation and rackable configurator paths, then share both links with EudTech for comparison.', zh: '可以。分別使用工作站與機架式配置路徑，再把兩個連結交給 EudTech 比較。' }
      },
      {
        question: { en: 'Does the quote request include storage and CPU choices?', zh: '詢價會包含儲存與 CPU 選項嗎？' },
        answer: { en: 'Yes. The submitted message includes the selected GPU, CPU, RAM, storage, and configuration URL.', zh: '會。送出內容包含已選 GPU、CPU、RAM、儲存與配置連結。' }
      }
    ]
  },
  {
    slug: 'ai-workstation-taiwan',
    title: {
      en: 'AI Workstation Taiwan Configurator',
      zh: '台灣 AI 工作站配置器'
    },
    description: {
      en: 'Configure AI workstations for Taiwan teams that need GPU acceleration, local inference, model development, rendering, or simulation workloads.',
      zh: '為台灣團隊配置 AI 工作站，支援 GPU 加速、本地推論、模型開發、渲染與模擬工作負載。'
    },
    keywords: {
      en: 'AI workstation Taiwan, GPU workstation Taiwan, AI PC quote, NVIDIA workstation quote, local AI workstation',
      zh: 'AI 工作站 台灣, GPU 工作站 台灣, AI 電腦報價, NVIDIA 工作站報價, 本地 AI 工作站'
    },
    hero: {
      en: 'AI workstation configurations for Taiwan buyers',
      zh: '為台灣採購者設計的 AI 工作站配置入口'
    },
    lead: {
      en: 'Select a workstation, adjust hardware choices, and send a quote request with a configuration URL that technical and procurement teams can review.',
      zh: '選擇工作站、調整硬體選項，並送出可供技術與採購團隊審查的配置連結。'
    },
    image: '/grando-desktop-01.jpg',
    imageAlt: {
      en: 'AI workstation configuration for Taiwan teams',
      zh: '台灣團隊使用的 AI 工作站配置'
    },
    configuratorHref: '/configurator',
    quoteHref: '/configurator?request=true',
    highlights: [
      {
        en: 'Targets local AI development, inference, and visualization teams.',
        zh: '鎖定本地 AI 開發、推論與視覺化團隊。'
      },
      {
        en: 'Supports a clearer handoff between engineering and purchasing.',
        zh: '協助工程與採購之間更清楚交接需求。'
      },
      {
        en: 'EudTech can follow up in Taiwan with product and quote consultation.',
        zh: 'EudTech 可在台灣協助產品與報價諮詢。'
      }
    ],
    specs: [
      { label: { en: 'Region', zh: '服務區域' }, value: { en: 'Taiwan quote follow-up', zh: '台灣報價追蹤' } },
      { label: { en: 'Products', zh: '產品方向' }, value: { en: 'GPU workstations and rackable systems', zh: 'GPU 工作站與可上架系統' } },
      { label: { en: 'Buyer stage', zh: '採購階段' }, value: { en: 'Specification alignment and RFQ preparation', zh: '規格對齊與 RFQ 準備' } }
    ],
    faqs: [
      {
        question: { en: 'Can EudTech help if the configuration is only a first draft?', zh: '配置只是初稿也可以請 EudTech 協助嗎？' },
        answer: { en: 'Yes. Send the draft configuration and EudTech can help refine it around workload, budget, and deployment needs.', zh: '可以。送出初稿配置後，EudTech 可依工作負載、預算與部署需求協助調整。' }
      },
      {
        question: { en: 'Is this only for large servers?', zh: '這只適合大型伺服器嗎？' },
        answer: { en: 'No. The configurator includes workstation and server directions, so teams can start from the form factor that fits their site.', zh: '不是。配置器包含工作站與伺服器方向，團隊可從符合場域的機構型態開始。' }
      }
    ]
  },
  {
    slug: 'liquid-cooled-gpu-server',
    title: {
      en: 'Liquid-Cooled GPU Server Configurator',
      zh: '液冷 GPU 伺服器配置器'
    },
    description: {
      en: 'Explore liquid-cooled GPU server configurations for sustained AI and HPC workloads. Configure Grando systems and request a formal quote from EudTech.',
      zh: '探索適合長時間 AI 與 HPC 工作負載的液冷 GPU 伺服器配置，並可配置 Grando 系統後向 EudTech 取得正式報價。'
    },
    keywords: {
      en: 'liquid cooled GPU server, liquid cooling AI server, Comino Grando, GPU server configurator, AI server quote Taiwan',
      zh: '液冷 GPU 伺服器, 液冷 AI 伺服器, Comino Grando, GPU 伺服器配置器, AI 伺服器報價 台灣'
    },
    hero: {
      en: 'Liquid-cooled GPU systems for sustained compute density',
      zh: '面向持續高密度運算的液冷 GPU 系統'
    },
    lead: {
      en: 'Use the configurator to document GPU density, cooling-sensitive hardware choices, storage, and power needs before the quote discussion.',
      zh: '在報價討論前，先用配置器記錄 GPU 密度、散熱敏感硬體、儲存與電源需求。'
    },
    image: '/GRANDO DPR 4090-FT_6_01.jpg',
    imageAlt: {
      en: 'Liquid-cooled Comino Grando GPU server interior',
      zh: 'Comino Grando 液冷 GPU 伺服器內部'
    },
    configuratorHref: '/configurator/29',
    quoteHref: '/configurator/29?request=true',
    highlights: [
      {
        en: 'Useful for buyers comparing air-cooled and liquid-cooled GPU density.',
        zh: '適合正在比較氣冷與液冷 GPU 密度的採購者。'
      },
      {
        en: 'Configuration link keeps technical assumptions visible.',
        zh: '配置連結可保留技術假設，方便審查。'
      },
      {
        en: 'Quote workflow sends the complete request to EudTech sales follow-up.',
        zh: '報價流程會把完整需求送交 EudTech 業務追蹤。'
      }
    ],
    specs: [
      { label: { en: 'Cooling', zh: '冷卻方向' }, value: { en: 'Liquid-cooled multi-GPU systems', zh: '液冷多 GPU 系統' } },
      { label: { en: 'Workload', zh: '工作負載' }, value: { en: 'AI training, inference, HPC, simulation', zh: 'AI 訓練、推論、HPC、模擬' } },
      { label: { en: 'Next action', zh: '下一步' }, value: { en: 'Configure and request quote', zh: '配置並送出報價需求' } }
    ],
    faqs: [
      {
        question: { en: 'Why start with a configurator for liquid cooling?', zh: '為什麼液冷需求要先用配置器？' },
        answer: { en: 'Liquid-cooled systems depend on GPU count, power, storage, networking, and deployment constraints. A configuration link makes those assumptions explicit.', zh: '液冷系統會受 GPU 數量、電源、儲存、網路與部署條件影響。配置連結可讓這些假設清楚呈現。' }
      },
      {
        question: { en: 'Can I share the configuration internally before sending it?', zh: '可以先在內部分享配置再送出嗎？' },
        answer: { en: 'Yes. Use the Share button in the configurator, then send a formal quote request when the configuration is ready.', zh: '可以。先使用配置器中的分享按鈕，配置確認後再送出正式詢價。' }
      }
    ]
  },
  {
    slug: 'gpu-server-quote',
    title: {
      en: 'GPU Server Quote Configurator',
      zh: 'GPU 伺服器報價配置器'
    },
    description: {
      en: 'Create a GPU server quote request with selected GPU, CPU, RAM, storage, power, and networking options. EudTech receives the configuration for follow-up.',
      zh: '建立 GPU 伺服器報價需求，包含 GPU、CPU、RAM、儲存、電源與網路選項，並由 EudTech 接收配置後追蹤。'
    },
    keywords: {
      en: 'GPU server quote, AI server quote, GPU workstation quote, server configurator, EudTech configurator',
      zh: 'GPU 伺服器報價, AI 伺服器報價, GPU 工作站報價, 伺服器配置器, EudTech 配置器'
    },
    hero: {
      en: 'GPU server quote requests with configuration context',
      zh: '帶有完整配置脈絡的 GPU 伺服器報價需求'
    },
    lead: {
      en: 'Replace ambiguous RFQ notes with a configuration URL that records the selected system, components, and quote request details.',
      zh: '用配置連結取代模糊 RFQ 備註，保留系統、零組件與詢價需求細節。'
    },
    image: '/grando-rackable-01.jpg',
    imageAlt: {
      en: 'GPU server quote request configurator',
      zh: 'GPU 伺服器報價需求配置器'
    },
    configuratorHref: '/configurator',
    quoteHref: '/configurator?request=true',
    highlights: [
      {
        en: 'High-intent quote path for teams ready to compare GPU server builds.',
        zh: '適合已準備比較 GPU 伺服器配置的高意圖詢價路徑。'
      },
      {
        en: 'Quote email is sent to EudTech with the selected configuration summary.',
        zh: '詢價信會連同配置摘要送至 EudTech。'
      },
      {
        en: 'Useful for procurement, research labs, system integrators, and IT teams.',
        zh: '適合採購、研究實驗室、系統整合商與 IT 團隊。'
      }
    ],
    specs: [
      { label: { en: 'Quote includes', zh: '詢價包含' }, value: { en: 'GPU, CPU, RAM, storage, power, network, URL', zh: 'GPU、CPU、RAM、儲存、電源、網路、連結' } },
      { label: { en: 'Recipient', zh: '收件' }, value: { en: 'EudTech sales follow-up', zh: 'EudTech 業務追蹤' } },
      { label: { en: 'Best use', zh: '最適合' }, value: { en: 'Early specification and RFQ alignment', zh: '早期規格與 RFQ 對齊' } }
    ],
    faqs: [
      {
        question: { en: 'What happens after I submit a quote request?', zh: '送出報價需求後會發生什麼？' },
        answer: { en: 'EudTech receives the configuration summary and contact details, then follows up by email or phone.', zh: 'EudTech 會收到配置摘要與聯絡資料，並透過 Email 或電話後續聯繫。' }
      },
      {
        question: { en: 'Can I use the configurator link in an RFQ process?', zh: '配置器連結可以放進 RFQ 流程嗎？' },
        answer: { en: 'Yes. The share link preserves the selected configuration and helps technical reviewers see the same hardware assumptions.', zh: '可以。分享連結會保留已選配置，協助技術審查者看到同一組硬體假設。' }
      }
    ]
  }
];

export const getConfiguratorSeoPage = (slug?: string) =>
  CONFIGURATOR_SEO_PAGES.find((page) => page.slug === slug);
