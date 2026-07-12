export type ConfiguratorSeoPage = {
  slug: string;
  kind?: 'solution' | 'comparison' | 'guide' | 'checklist';
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
      en: 'NVIDIA H200 Server Quote, Availability, and Price Planning',
      zh: 'NVIDIA H200 伺服器報價、供貨與價格規劃｜AI 訓練與推論'
    },
    description: {
      en: 'Plan an NVIDIA H200 server quote for AI training, HPC, or inference. EudTech confirms current availability, price, and delivery only after GPU count, CPU, memory, storage, power, cooling, and networking are defined.',
      zh: '規劃 NVIDIA H200 伺服器報價時，先對齊 GPU 數量、CPU、記憶體、儲存、電力、散熱與網路；EudTech 會依實際配置確認目前供貨、價格與交期。'
    },
    keywords: {
      en: 'NVIDIA H200 server, H200 server price, H200 GPU server quote, H200 AI inference server, NVIDIA H200 next generation AI inference, AI training server, HPC GPU server, liquid cooled GPU server, Taiwan AI server',
      zh: 'NVIDIA H200 伺服器, H200 伺服器價格, NVIDIA H200 價格, H200 GPU 伺服器報價, H200 AI 推論伺服器, NVIDIA H200 下一代 AI 推論, AI 訓練伺服器, HPC GPU 伺服器, 液冷 GPU 伺服器, 台灣 AI 伺服器'
    },
    hero: {
      en: 'NVIDIA H200 AI GPU server quote and pricing planning',
      zh: 'NVIDIA H200 AI GPU 伺服器報價與價格規劃'
    },
    lead: {
      en: 'Start with Taiwan procurement assumptions for an H200 server, adjust GPU count, CPU, memory, storage, power, cooling, and networking, then send the exact build to EudTech for a configuration-specific availability, price, and delivery review.',
      zh: '先以台灣採購可審查的 H200 伺服器需求為基礎，調整 GPU 數量、CPU、記憶體、儲存、電源、散熱與網路，再將完整配置交由 EudTech 進行依配置的供貨、價格與交期確認。'
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
        en: 'Useful for next-generation inference planning where GPU memory, power, and deployment density must be reviewed together.',
        zh: '適合下一代推論規劃，需要同時審查 GPU 記憶體、電力與部署密度。'
      },
      {
        en: 'Configurator keeps GPU, CPU, memory, storage, and power selections together.',
        zh: '配置器會同步保留 GPU、CPU、記憶體、儲存與電源選項。'
      },
      {
        en: 'Quote request includes a shareable configuration link for procurement review.',
        zh: '詢價內容包含可分享的配置連結，方便採購與技術審查。'
      },
      {
        en: 'Price planning is based on the final GPU count, platform, memory, storage, power, cooling, and delivery requirements.',
        zh: '價格規劃會依最終 GPU 數量、平台、記憶體、儲存、電力、散熱與交付需求確認。'
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
      },
      {
        question: { en: 'Is H200 suitable for next-generation AI inference planning?', zh: 'H200 適合下一代 AI 推論規劃嗎？' },
        answer: { en: 'Yes. H200 server configurations are useful when teams need to review GPU memory, CPU, RAM, storage, power, and networking assumptions for training, HPC, and inference in one quote path.', zh: '適合。H200 伺服器配置可協助團隊在同一個報價路徑中審查 GPU 記憶體、CPU、RAM、儲存、電源與網路假設，涵蓋訓練、HPC 與推論需求。' }
      },
      {
        question: { en: 'How is H200 server pricing determined?', zh: 'H200 伺服器價格如何確認？' },
        answer: { en: 'EudTech confirms price from the submitted configuration rather than publishing one fixed amount, because GPU count, CPU platform, memory, NVMe storage, power, cooling, networking, delivery, and supply conditions affect the final quote.', zh: 'EudTech 會依送出的配置確認價格，而非公布單一固定金額，因為 GPU 數量、CPU 平台、記憶體、NVMe 儲存、電力、散熱、網路、交期與供應條件都會影響最終報價。' }
      },
      {
        question: { en: 'How is NVIDIA H200 server availability confirmed?', zh: 'NVIDIA H200 伺服器供貨狀態如何確認？' },
        answer: { en: 'EudTech confirms availability and delivery only after reviewing the submitted GPU count, platform, and delivery requirements. This page does not represent a fixed in-stock commitment.', zh: 'EudTech 會在審查送出的 GPU 數量、平台與交付需求後確認供貨與交期；本頁不代表固定現貨承諾。' }
      }
    ]
  },
  {
    slug: 'rtx-pro-6000-workstation',
    title: {
      en: 'RTX PRO 6000 AI Workstation Quote Configurator for Local Inference',
      zh: 'RTX PRO 6000 本地 AI 推論工作站報價配置器'
    },
    description: {
      en: 'Configure RTX PRO 6000 workstations for local AI inference, rendering, visualization, and simulation, then send the build to EudTech for Taiwan quote follow-up.',
      zh: '配置 RTX PRO 6000 工作站，適用於本地 AI 推論、渲染、視覺化與模擬，並可送交 EudTech 追蹤台灣報價。'
    },
    keywords: {
      en: 'RTX PRO 6000 workstation, RTX PRO 6000 quote, AI workstation, GPU workstation quote, NVIDIA workstation Taiwan, local AI inference workstation',
      zh: 'RTX PRO 6000 工作站, RTX PRO 6000 報價, AI 工作站, GPU 工作站報價, NVIDIA 工作站 台灣, 本地 AI 推論工作站'
    },
    hero: {
      en: 'RTX PRO 6000 AI workstation quote and configuration',
      zh: 'RTX PRO 6000 AI 工作站報價與配置'
    },
    lead: {
      en: 'Use the workstation configurator to align GPU, CPU, memory, NVMe storage, and networking before sending a quote request for local AI and visualization workloads.',
      zh: '使用工作站配置器先對齊 GPU、CPU、記憶體、NVMe 儲存與網路，再針對本地 AI 與視覺化工作負載送出報價需求。'
    },
    image: '/comino-workstation-front.png',
    imageAlt: {
      en: 'Comino Grando workstation for RTX PRO 6000 configurations',
      zh: '可配置 RTX PRO 6000 的 Comino Grando 工作站'
    },
    configuratorHref: '/configurator/34',
    quoteHref: '/configurator/34?request=true',
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
      en: 'Choose between deskside AI workstations, rackable GPU systems, and integration-kit paths for Taiwan teams that need GPU acceleration, local inference, model development, rendering, or simulation workloads.',
      zh: '為台灣團隊在桌邊 AI 工作站、可上架 GPU 系統與整合套件之間進行選型，支援 GPU 加速、本地推論、模型開發、渲染與模擬工作負載。'
    },
    keywords: {
      en: 'AI workstation Taiwan, GPU workstation Taiwan, AI PC quote, NVIDIA workstation quote, local AI workstation',
      zh: 'AI 工作站 台灣, GPU 工作站 台灣, AI 電腦報價, NVIDIA 工作站報價, 本地 AI 工作站'
    },
    hero: {
      en: 'Taiwan AI workstation and GPU deployment selection',
      zh: '台灣 AI 工作站與 GPU 部署選型入口'
    },
    lead: {
      en: 'Start by matching the deployment site and operating constraints to a deskside workstation, a rackable GPU system, or an integration-kit path; then adjust hardware choices and send a shareable quote request.',
      zh: '先依部署場域與作業限制選擇桌邊工作站、可上架 GPU 系統或整合套件路徑，再調整硬體選項並送出可分享的詢價需求。'
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
        en: 'Use this page when the first decision is deployment form, not a single GPU SKU: deskside workstation, rackable system, or integration kit.',
        zh: '適用於先決定部署型態，而不是先鎖定單一 GPU SKU 的情境：桌邊工作站、可上架系統或整合套件。'
      },
      {
        en: 'Choose a deskside path when the team works in an office or lab without rack constraints; move to rackable systems when rack, power, network, and cooling are part of the deployment scope.',
        zh: '辦公室或實驗室沒有機架限制時，可先選桌邊路徑；當機架、供電、網路與散熱已納入部署範圍時，改看可上架系統。'
      },
      {
        en: 'Choose an integration-kit path when the buyer already owns the chassis, rack, cooling, or integration work and needs a component-level quote discussion.',
        zh: '採購方已掌握機箱、機架、散熱或整合作業，且需要零組件層級報價討論時，可選整合套件路徑。'
      },
      {
        en: 'EudTech can follow up in Taiwan with product selection and quote consultation.',
        zh: 'EudTech 可在台灣協助產品選型與報價諮詢。'
      }
    ],
    specs: [
      { label: { en: 'Region', zh: '服務區域' }, value: { en: 'Taiwan quote follow-up', zh: '台灣報價追蹤' } },
      { label: { en: 'Selection order', zh: '選型順序' }, value: { en: 'Deployment site, rack constraints, power, network, cooling, then hardware configuration', zh: '部署場域、機架限制、供電、網路、散熱，再進入硬體配置' } },
      { label: { en: 'Products', zh: '產品方向' }, value: { en: 'Deskside GPU workstations, rackable GPU systems, and integration kits', zh: '桌邊 GPU 工作站、可上架 GPU 系統與整合套件' } },
      { label: { en: 'Buyer stage', zh: '採購階段' }, value: { en: 'Initial deployment selection, specification alignment, and RFQ preparation', zh: '初步部署選型、規格對齊與 RFQ 準備' } }
    ],
    faqs: [
      {
        question: { en: 'Can EudTech help if the configuration is only a first draft?', zh: '配置只是初稿也可以請 EudTech 協助嗎？' },
        answer: { en: 'Yes. Send the draft configuration and EudTech can help refine it around workload, budget, and deployment needs.', zh: '可以。送出初稿配置後，EudTech 可依工作負載、預算與部署需求協助調整。' }
      },
      {
        question: { en: 'Is this only for large servers?', zh: '這只適合大型伺服器嗎？' },
        answer: { en: 'No. The configurator includes deskside workstations, rackable systems, and integration-kit directions, so teams can start from the deployment form that fits their site.', zh: '不是。配置器包含桌邊工作站、可上架系統與整合套件方向，團隊可從符合部署場域的型態開始。' }
      },
      {
        question: { en: 'When should a Taiwan AI workstation project use a rackable path?', zh: '台灣 AI 工作站專案何時應改看可上架路徑？' },
        answer: { en: 'Use a rackable path when the delivery site already requires rack placement, power planning, network integration, or cooling coordination. Start with a deskside path when those constraints are not part of the project.', zh: '交付場域已需要機架配置、電力規劃、網路整合或散熱協調時，應改看可上架路徑；這些限制尚未納入專案時，可先從桌邊路徑開始。' }
      },
      {
        question: { en: 'When is an integration kit a better starting point?', zh: '什麼情況適合先看整合套件？' },
        answer: { en: 'Start from an integration kit when the buyer already plans the chassis, rack, cooling, or integration work and needs a component-level configuration and quote discussion.', zh: '採購方已規劃機箱、機架、散熱或整合作業，且需要進行零組件層級配置與報價討論時，適合先看整合套件。' }
      }
    ]
  },
  {
    slug: 'liquid-cooled-gpu-server',
    title: {
      en: 'Liquid-Cooled GPU Server Cooling and Quote Configurator',
      zh: '液冷 GPU 伺服器散熱與報價配置器'
    },
    description: {
      en: 'Explore GPU server cooling and liquid-cooled GPU server configurations for sustained AI and HPC workloads, then request a formal quote from EudTech.',
      zh: '探索 GPU 伺服器散熱與液冷 GPU 伺服器配置，面向長時間 AI 與 HPC 工作負載，並可向 EudTech 取得正式報價。'
    },
    keywords: {
      en: 'GPU server cooling, liquid cooled GPU server, liquid cooling AI server, Comino Grando, GPU server configurator, AI server quote Taiwan',
      zh: 'GPU 伺服器散熱, 液冷 GPU 伺服器, 液冷 AI 伺服器, Comino Grando, GPU 伺服器配置器, AI 伺服器報價 台灣'
    },
    hero: {
      en: 'GPU server cooling and liquid-cooled systems for sustained compute density',
      zh: '面向持續高密度運算的 GPU 伺服器散熱與液冷系統'
    },
    lead: {
      en: 'Use the configurator to document GPU density, cooling-sensitive hardware choices, storage, and power needs before the quote discussion.',
      zh: '在報價討論前，先用配置器記錄 GPU 密度、散熱敏感硬體、儲存與電源需求。'
    },
    image: '/GRANDO%20DPR%204090-FT_6_01.jpg',
    imageAlt: {
      en: 'Liquid-cooled Comino Grando GPU server interior',
      zh: 'Comino Grando 液冷 GPU 伺服器內部'
    },
    configuratorHref: '/configurator/29',
    quoteHref: '/configurator/29?request=true',
    highlights: [
      {
        en: 'Useful for buyers comparing air-cooled GPU server cooling and liquid-cooled GPU density.',
        zh: '適合正在比較氣冷 GPU 伺服器散熱與液冷 GPU 密度的採購者。'
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
      { label: { en: 'Planning focus', zh: '規劃重點' }, value: { en: 'GPU server cooling, power, and deployment density', zh: 'GPU 伺服器散熱、電力與部署密度' } },
      { label: { en: 'Workload', zh: '工作負載' }, value: { en: 'AI training, inference, HPC, simulation', zh: 'AI 訓練、推論、HPC、模擬' } },
      { label: { en: 'Next action', zh: '下一步' }, value: { en: 'Configure and request quote', zh: '配置並送出報價需求' } }
    ],
    faqs: [
      {
        question: { en: 'Why start with a configurator for liquid cooling?', zh: '為什麼液冷需求要先用配置器？' },
        answer: { en: 'Liquid-cooled systems depend on GPU count, power, storage, networking, and deployment constraints. A configuration link makes those assumptions explicit.', zh: '液冷系統會受 GPU 數量、電源、儲存、網路與部署條件影響。配置連結可讓這些假設清楚呈現。' }
      },
      {
        question: { en: 'What should buyers check when planning GPU server cooling?', zh: '規劃 GPU 伺服器散熱時應先確認什麼？' },
        answer: { en: 'Start with GPU count, power capacity, rack or workstation form factor, storage density, networking, and room deployment assumptions before asking for a quote.', zh: '先確認 GPU 數量、電源容量、機架或工作站型態、儲存密度、網路與機房部署假設，再進入報價討論。' }
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
      en: 'GPU Server Quote and AI RFQ Configurator for H200 or RTX PRO 6000',
      zh: 'GPU 伺服器報價與 AI RFQ 配置器｜H200 或 RTX PRO 6000'
    },
    description: {
      en: 'Create an RFQ-ready GPU server quote request for an H200 server or RTX PRO 6000 workstation. Capture the hardware and deployment factors EudTech needs to confirm configuration-specific price and delivery.',
      zh: '建立可供 RFQ 使用的 GPU 伺服器報價需求，選擇 H200 伺服器或 RTX PRO 6000 工作站，並整理 EudTech 確認依配置價格與交期所需的硬體及部署因素。'
    },
    keywords: {
      en: 'GPU server quote, GPU server price, GPU server pricing, GPU server quote configurator, AI server quote, AI server RFQ quote, GPU workstation quote, server configurator, EudTech configurator',
      zh: 'GPU 伺服器報價, GPU 伺服器價格, GPU 伺服器預算, GPU 伺服器報價配置器, AI 伺服器報價, AI 伺服器價格, AI 伺服器 RFQ 報價, GPU 工作站報價, 伺服器配置器, EudTech 配置器'
    },
    hero: {
      en: 'GPU server quote, pricing planning, and RFQ entry point',
      zh: 'GPU 伺服器報價、價格規劃與 RFQ 入口'
    },
    lead: {
      en: 'Choose an H200 server or RTX PRO 6000 workstation, then replace ambiguous RFQ notes with a configuration URL that records the selected GPU, CPU, RAM, storage, power, cooling, network, and the details EudTech needs to confirm price and delivery.',
      zh: '先選擇 H200 伺服器或 RTX PRO 6000 工作站，再用配置連結取代模糊 RFQ 備註，保留 GPU、CPU、RAM、儲存、電源、散熱、網路與 EudTech 確認價格及交期所需的需求細節。'
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
      },
      {
        en: 'The configuration keeps price-driving hardware and deployment assumptions visible for budgetary review.',
        zh: '配置會保留影響價格的硬體與部署假設，供預算審查使用。'
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
      },
      {
        question: { en: 'Why is there no single public GPU server price?', zh: '為什麼沒有單一公開的 GPU 伺服器價格？' },
        answer: { en: 'A usable GPU server quote depends on the selected GPU count and model, CPU platform, memory, storage, power, cooling, networking, delivery, and supply conditions. The configurator records those variables so EudTech can return a configuration-specific quote.', zh: '可用的 GPU 伺服器報價會受所選 GPU 數量與型號、CPU 平台、記憶體、儲存、電力、散熱、網路、交期與供應條件影響。配置器會保留這些變因，讓 EudTech 回覆依配置的報價。' }
      }
    ]
  },
  {
    slug: 'h200-vs-rtx-pro-6000',
    kind: 'comparison',
    title: {
      en: 'H200 vs RTX PRO 6000: Which Fits AI Training and Local Inference?',
      zh: 'H200 vs RTX PRO 6000：AI 訓練與本地推論怎麼選？'
    },
    description: {
      en: 'H200 vs RTX PRO 6000: compare dense AI training and HPC server deployment with local AI inference and workstation deployment, then open the matching configurator for a Taiwan quote-ready configuration.',
      zh: 'H200 vs RTX PRO 6000：比較高密度 AI 訓練與 HPC 伺服器部署，以及本地 AI 推論與工作站部署，再進入對應配置器準備台灣可詢價的配置。'
    },
    keywords: {
      en: 'H200 vs RTX PRO 6000, H200 RTX PRO 6000 difference, H200 vs RTX PRO 6000 quote, NVIDIA H200 server comparison, RTX PRO 6000 workstation comparison, AI training GPU vs inference workstation, AI GPU comparison, GPU server procurement',
      zh: 'H200 vs RTX PRO 6000, H200 RTX PRO 6000 差異, H200 vs RTX PRO 6000 報價, NVIDIA H200 伺服器比較, RTX PRO 6000 工作站比較, AI 訓練 GPU 與推論工作站, AI GPU 比較, GPU 伺服器採購'
    },
    hero: {
      en: 'H200 vs RTX PRO 6000: choose by AI workload and deployment model',
      zh: 'H200 vs RTX PRO 6000：依 AI 工作負載與部署型態選擇'
    },
    lead: {
      en: 'Use this H200 vs RTX PRO 6000 comparison to decide whether dense AI training or HPC server deployment, or local inference and workstation flexibility, fits the project. Then preserve the exact hardware assumptions in the matching configurator for quote review.',
      zh: '使用此 H200 vs RTX PRO 6000 比較，判斷專案較適合高密度 AI 訓練或 HPC 伺服器部署，或本地推論與工作站彈性；再以對應配置器保留完整硬體假設供報價審查。'
    },
    image: '/grando-8gpu-server.jpg',
    imageAlt: {
      en: 'Comparison of NVIDIA H200 GPU server and RTX PRO 6000 workstation configurations',
      zh: 'NVIDIA H200 GPU 伺服器與 RTX PRO 6000 工作站配置比較'
    },
    configuratorHref: '/configurator',
    quoteHref: '/configurator?request=true',
    highlights: [
      {
        en: 'H200 routes fit dense AI training, HPC, and shared data center compute.',
        zh: 'H200 路線適合高密度 AI 訓練、HPC 與共用資料中心運算。'
      },
      {
        en: 'RTX PRO 6000 routes fit local AI development, visualization, and workstation deployment.',
        zh: 'RTX PRO 6000 路線適合本地 AI 開發、視覺化與工作站部署。'
      },
      {
        en: 'Configurator links make the comparison actionable for engineering and purchasing reviews.',
        zh: '配置器連結可讓工程與採購審查直接依同一組假設討論。'
      }
    ],
    specs: [
      { label: { en: 'Best H200 fit', zh: 'H200 適合' }, value: { en: 'Training, HPC, dense multi-GPU server use', zh: '訓練、HPC、高密度多 GPU 伺服器' } },
      { label: { en: 'Best RTX PRO fit', zh: 'RTX PRO 適合' }, value: { en: 'Local inference, rendering, simulation, workstation use', zh: '本地推論、渲染、模擬、工作站' } },
      { label: { en: 'Decision output', zh: '決策輸出' }, value: { en: 'Configuration URL and quote request', zh: '配置連結與報價需求' } }
    ],
    faqs: [
      {
        question: { en: 'Should AI training buyers start with H200?', zh: 'AI 訓練採購應該先看 H200 嗎？' },
        answer: { en: 'For dense training and shared server deployment, H200 is usually the higher-intent path. For local development or visualization, RTX PRO 6000 may be the better starting point.', zh: '若需求是高密度訓練或共用伺服器部署，通常先看 H200。若是本地開發或視覺化，RTX PRO 6000 可能更適合作為起點。' }
      },
      {
        question: { en: 'Can EudTech compare both configurations in one quote discussion?', zh: 'EudTech 可以在同一次報價討論比較兩種配置嗎？' },
        answer: { en: 'Yes. Share the H200 and RTX PRO 6000 configurator URLs so the same component assumptions can be compared.', zh: '可以。請分享 H200 與 RTX PRO 6000 的配置器連結，讓雙方依同一組零組件假設比較。' }
      },
      {
        question: { en: 'Which option should I open first for quote review?', zh: '報價審查應該先開哪一種配置？' },
        answer: { en: 'Start with H200 when the project is dense training, HPC, or shared server deployment. Start with RTX PRO 6000 when the project is local inference, workstation deployment, visualization, or simulation.', zh: '若專案是高密度訓練、HPC 或共用伺服器部署，先看 H200。若專案是本地推論、工作站部署、視覺化或模擬，先看 RTX PRO 6000。' }
      },
      {
        question: { en: 'What is the simplest way to choose between H200 and RTX PRO 6000?', zh: 'H200 與 RTX PRO 6000 最簡單的選擇方式是什麼？' },
        answer: { en: 'Start with H200 for dense shared training, HPC, or rack deployment. Start with RTX PRO 6000 for local inference, development, visualization, or a workstation-first deployment. Share the selected configurator links when both paths need quote review.', zh: '高密度共用訓練、HPC 或機架部署先看 H200；本地推論、開發、視覺化或以工作站為主的部署先看 RTX PRO 6000。若兩種路徑都需報價審查，可分別分享對應配置器連結。' }
      }
    ]
  },
  {
    slug: 'gpu-server-rfq-checklist',
    kind: 'checklist',
    title: {
      en: 'GPU Server RFQ Checklist for AI Procurement',
      zh: 'AI 採購 GPU 伺服器 RFQ 檢核表'
    },
    description: {
      en: 'Prepare a GPU server RFQ with clear GPU, CPU, RAM, storage, power, networking, cooling, and deployment assumptions before requesting a quote.',
      zh: '在送出 GPU 伺服器報價需求前，先整理 GPU、CPU、RAM、儲存、電源、網路、散熱與部署假設。'
    },
    keywords: {
      en: 'GPU server RFQ, AI server RFQ checklist, GPU server procurement checklist, AI infrastructure quote, server configurator quote',
      zh: 'GPU 伺服器 RFQ, AI 伺服器 RFQ 檢核表, GPU 伺服器採購檢核表, AI 基礎設施報價, 伺服器配置器報價'
    },
    hero: {
      en: 'GPU server RFQ checklist before quote submission',
      zh: '送出報價前的 GPU 伺服器 RFQ 檢核表'
    },
    lead: {
      en: 'A quote is easier to review when the RFQ includes workload, GPU class, CPU, memory, NVMe storage, power, networking, and deployment constraints.',
      zh: 'RFQ 若包含工作負載、GPU 等級、CPU、記憶體、NVMe 儲存、電源、網路與部署限制，報價審查會更清楚。'
    },
    image: '/grando-rackable-01.jpg',
    imageAlt: {
      en: 'GPU server RFQ checklist and configuration workflow',
      zh: 'GPU 伺服器 RFQ 檢核表與配置流程'
    },
    configuratorHref: '/configurator',
    quoteHref: '/configurator?request=true',
    highlights: [
      {
        en: 'Turns early procurement notes into a reviewable configuration URL.',
        zh: '把早期採購備註轉成可審查的配置連結。'
      },
      {
        en: 'Keeps workload, hardware, and deployment assumptions together.',
        zh: '將工作負載、硬體與部署假設保留在同一脈絡。'
      },
      {
        en: 'Useful before formal RFQ, budgetary quote, or internal approval.',
        zh: '適合正式 RFQ、預算報價或內部核准前使用。'
      }
    ],
    specs: [
      { label: { en: 'Hardware inputs', zh: '硬體輸入' }, value: { en: 'GPU, CPU, RAM, NVMe, power, network', zh: 'GPU、CPU、RAM、NVMe、電源、網路' } },
      { label: { en: 'Procurement inputs', zh: '採購輸入' }, value: { en: 'Workload, site constraints, review owner, timing', zh: '工作負載、場地限制、審查窗口、時程' } },
      { label: { en: 'Configurator output', zh: '配置器輸出' }, value: { en: 'Share URL and quote request email', zh: '分享連結與報價需求信' } }
    ],
    faqs: [
      {
        question: { en: 'What should be ready before sending a GPU server RFQ?', zh: '送出 GPU 伺服器 RFQ 前應該準備什麼？' },
        answer: { en: 'Prepare the target workload, preferred GPU class, memory and storage expectations, power constraints, networking requirements, and deployment timeline.', zh: '請先準備目標工作負載、偏好的 GPU 等級、記憶體與儲存需求、電源限制、網路需求與部署時程。' }
      },
      {
        question: { en: 'Can the configurator replace a written RFQ?', zh: '配置器可以取代書面 RFQ 嗎？' },
        answer: { en: 'It can provide the technical configuration context. Formal procurement documents can still reference the configurator URL for the selected hardware assumptions.', zh: '配置器可提供技術配置脈絡。正式採購文件仍可引用配置器連結作為已選硬體假設。' }
      }
    ]
  },
  {
    slug: 'liquid-cooling-ai-server-procurement',
    kind: 'guide',
    title: {
      en: 'Liquid-Cooling AI Server Procurement Guide',
      zh: '液冷 AI 伺服器採購指南'
    },
    description: {
      en: 'Plan liquid-cooled AI server procurement around GPU density, sustained workloads, rack deployment, power capacity, and quote-ready configuration details.',
      zh: '依 GPU 密度、長時間工作負載、機架部署、電源容量與可報價配置細節規劃液冷 AI 伺服器採購。'
    },
    keywords: {
      en: 'liquid cooling AI server procurement, liquid cooled GPU server quote, AI data center cooling, GPU density server, Comino liquid cooling',
      zh: '液冷 AI 伺服器採購, 液冷 GPU 伺服器報價, AI 資料中心散熱, 高密度 GPU 伺服器, Comino 液冷'
    },
    hero: {
      en: 'Liquid-cooling AI server procurement starts with configuration clarity',
      zh: '液冷 AI 伺服器採購從清楚配置開始'
    },
    lead: {
      en: 'Liquid-cooled GPU systems should be evaluated with GPU count, heat load, rack constraints, power capacity, storage, networking, and service follow-up in one quote path.',
      zh: '液冷 GPU 系統應在同一條報價流程中評估 GPU 數量、熱負載、機架限制、電源容量、儲存、網路與服務追蹤。'
    },
    image: '/GRANDO%20DPR%204090-FT_6_01.jpg',
    imageAlt: {
      en: 'Liquid-cooling AI server procurement planning with Comino Grando systems',
      zh: '以 Comino Grando 系統規劃液冷 AI 伺服器採購'
    },
    configuratorHref: '/configurator/29',
    quoteHref: '/configurator/29?request=true',
    highlights: [
      {
        en: 'Targets sustained AI, simulation, and HPC workloads where heat density matters.',
        zh: '針對熱密度重要的長時間 AI、模擬與 HPC 工作負載。'
      },
      {
        en: 'Keeps cooling, power, rack, and component assumptions visible before quote review.',
        zh: '在報價審查前保留散熱、電源、機架與零組件假設。'
      },
      {
        en: 'Helps buyers compare liquid-cooled systems against conventional server options.',
        zh: '協助採購者比較液冷系統與傳統伺服器選項。'
      }
    ],
    specs: [
      { label: { en: 'Planning inputs', zh: '規劃輸入' }, value: { en: 'GPU density, power, rack, storage, network', zh: 'GPU 密度、電源、機架、儲存、網路' } },
      { label: { en: 'Best fit', zh: '適合需求' }, value: { en: 'Dense AI training, HPC, simulation, shared compute', zh: '高密度 AI 訓練、HPC、模擬、共用運算' } },
      { label: { en: 'Next step', zh: '下一步' }, value: { en: 'Open rackable configurator and request quote', zh: '開啟機架式配置器並送出報價' } }
    ],
    faqs: [
      {
        question: { en: 'When should procurement consider liquid-cooled GPU servers?', zh: '什麼情境應該考慮液冷 GPU 伺服器？' },
        answer: { en: 'Consider liquid cooling when GPU density, sustained load, rack limits, or power and thermal planning become central to the deployment.', zh: '當 GPU 密度、長時間負載、機架限制，或電源與熱規劃成為部署核心時，就應考慮液冷。' }
      },
      {
        question: { en: 'Why use a configurator before discussing liquid cooling?', zh: '為什麼討論液冷前要先使用配置器？' },
        answer: { en: 'The configurator keeps GPU count, CPU, memory, storage, power, and networking assumptions together, which makes cooling and procurement review more precise.', zh: '配置器會保留 GPU 數量、CPU、記憶體、儲存、電源與網路假設，讓散熱與採購審查更精準。' }
      }
    ]
  },
  {
    slug: 'gpu-server-power-planning',
    kind: 'guide',
    title: {
      en: 'GPU Server Power Planning Configurator',
      zh: 'GPU 伺服器電力規劃配置器'
    },
    description: {
      en: 'Plan GPU server power capacity, redundant power supplies, GPU count, CPU platform, memory, storage, and network assumptions before requesting a quote.',
      zh: '在送出報價需求前，先規劃 GPU 伺服器電力容量、冗餘電源、GPU 數量、CPU 平台、記憶體、儲存與網路假設。'
    },
    keywords: {
      en: 'GPU server power planning, redundant power supply GPU server, AI server power capacity, GPU server quote, data center GPU power',
      zh: 'GPU 伺服器電力規劃, GPU 伺服器冗餘電源, AI 伺服器電力容量, GPU 伺服器報價, 資料中心 GPU 電力'
    },
    hero: {
      en: 'GPU server power planning before quote review',
      zh: '報價審查前的 GPU 伺服器電力規劃'
    },
    lead: {
      en: 'Use the configurator to keep GPU count, power supply design, CPU, memory, storage, and networking assumptions in one reviewable quote path.',
      zh: '使用配置器把 GPU 數量、電源供應設計、CPU、記憶體、儲存與網路假設保留在同一條可審查的報價路徑。'
    },
    image: '/grando-8gpu-server.jpg',
    imageAlt: {
      en: 'GPU server power planning for high-density AI systems',
      zh: '高密度 AI 系統的 GPU 伺服器電力規劃'
    },
    configuratorHref: '/configurator/29',
    quoteHref: '/configurator/29?request=true',
    highlights: [
      {
        en: 'Designed for buyers checking rack power, redundant supply options, and GPU density together.',
        zh: '適合需要同時檢查機架電力、冗餘電源選項與 GPU 密度的採購者。'
      },
      {
        en: 'Configuration links keep power and component assumptions visible for facility and IT review.',
        zh: '配置連結可讓機房與 IT 審查者看到同一組電力與零組件假設。'
      },
      {
        en: 'Quote requests can include selected GPU, CPU, memory, NVMe, networking, and power supply details.',
        zh: '詢價可包含已選 GPU、CPU、記憶體、NVMe、網路與電源供應細節。'
      }
    ],
    specs: [
      { label: { en: 'Planning focus', zh: '規劃重點' }, value: { en: 'Power capacity, redundancy, GPU density', zh: '電力容量、冗餘、GPU 密度' } },
      { label: { en: 'Best fit', zh: '適合需求' }, value: { en: 'AI servers, HPC clusters, shared GPU systems', zh: 'AI 伺服器、HPC 叢集、共用 GPU 系統' } },
      { label: { en: 'Quote output', zh: '報價輸出' }, value: { en: 'Configuration URL with power assumptions', zh: '包含電力假設的配置連結' } }
    ],
    faqs: [
      {
        question: { en: 'Why include power planning in a GPU server quote?', zh: '為什麼 GPU 伺服器報價要包含電力規劃？' },
        answer: { en: 'High-density GPU systems depend on power capacity and redundancy. Recording these assumptions before quote review reduces unclear follow-up.', zh: '高密度 GPU 系統會受電力容量與冗餘設計影響。報價前先記錄這些假設，可減少後續不清楚的追問。' }
      },
      {
        question: { en: 'Does the configurator replace facility planning?', zh: '配置器可以取代機房規劃嗎？' },
        answer: { en: 'No. It gives the hardware and power context that facility and IT teams can review before formal deployment planning.', zh: '不取代。配置器提供硬體與電力脈絡，讓機房與 IT 團隊在正式部署規劃前先審查。' }
      }
    ]
  },
  {
    slug: 'rack-ai-server-deployment',
    kind: 'guide',
    title: {
      en: 'Rack AI Server Deployment Configurator',
      zh: '機架式 AI 伺服器部署配置器'
    },
    description: {
      en: 'Prepare rack AI server deployment requirements with GPU density, rack form factor, power, cooling, storage, networking, and quote-ready configuration details.',
      zh: '整理機架式 AI 伺服器部署需求，包含 GPU 密度、機架型態、電力、散熱、儲存、網路與可報價配置細節。'
    },
    keywords: {
      en: 'rack AI server deployment, rackmount GPU server, AI rack server quote, GPU server rack planning, AI data center server',
      zh: '機架式 AI 伺服器部署, 機架式 GPU 伺服器, AI 機架伺服器報價, GPU 伺服器機架規劃, AI 資料中心伺服器'
    },
    hero: {
      en: 'Rack AI server deployment starts with a shareable configuration',
      zh: '機架式 AI 伺服器部署從可分享配置開始'
    },
    lead: {
      en: 'Use this entry point when the deployment discussion includes rack space, power, cooling, GPU count, storage, and network assumptions.',
      zh: '當部署討論包含機架空間、電力、散熱、GPU 數量、儲存與網路假設時，可從這個入口開始。'
    },
    image: '/grando-rackable-01.jpg',
    imageAlt: {
      en: 'Rack AI server deployment planning with GPU server configurator',
      zh: '以 GPU 伺服器配置器規劃機架式 AI 伺服器部署'
    },
    configuratorHref: '/configurator/29',
    quoteHref: '/configurator/29?request=true',
    highlights: [
      {
        en: 'Targets rack deployment discussions for AI, HPC, simulation, and research environments.',
        zh: '針對 AI、HPC、模擬與研究環境的機架部署討論。'
      },
      {
        en: 'Keeps selected server, GPU, CPU, memory, storage, power, and network assumptions together.',
        zh: '保留已選伺服器、GPU、CPU、記憶體、儲存、電源與網路假設。'
      },
      {
        en: 'Helps purchasing and infrastructure teams review the same deployment context.',
        zh: '協助採購與基礎設施團隊審查同一部署脈絡。'
      }
    ],
    specs: [
      { label: { en: 'Deployment type', zh: '部署型態' }, value: { en: 'Rackable AI GPU server systems', zh: '可上架 AI GPU 伺服器系統' } },
      { label: { en: 'Inputs', zh: '輸入項目' }, value: { en: 'Rack, power, cooling, GPU, storage, network', zh: '機架、電力、散熱、GPU、儲存、網路' } },
      { label: { en: 'Next action', zh: '下一步' }, value: { en: 'Configure rackable system and request quote', zh: '配置機架式系統並送出報價' } }
    ],
    faqs: [
      {
        question: { en: 'When should I use the rack deployment entry point?', zh: '什麼時候應該使用機架部署入口？' },
        answer: { en: 'Use it when the buying process needs rack, facility, IT, and procurement teams to review the same GPU server assumptions.', zh: '當採購流程需要機架、機房、IT 與採購團隊審查同一組 GPU 伺服器假設時，適合使用這個入口。' }
      },
      {
        question: { en: 'Can this help before a formal site survey?', zh: '正式場勘前可以使用嗎？' },
        answer: { en: 'Yes. The configurator does not replace a site survey, but it gives a concrete hardware baseline for the discussion.', zh: '可以。配置器不取代場勘，但可提供具體硬體基準，方便討論。' }
      }
    ]
  },
  {
    slug: 'taiwan-public-procurement-gpu-server',
    kind: 'checklist',
    title: {
      en: 'Taiwan Public Procurement GPU Server Checklist',
      zh: '台灣公部門 GPU 伺服器採購檢核表'
    },
    description: {
      en: 'Prepare Taiwan public-sector GPU server procurement discussions with clear workload, configuration, quote, delivery, warranty, and review assumptions.',
      zh: '為台灣公部門 GPU 伺服器採購討論整理工作負載、配置、報價、交付、保固與審查假設。'
    },
    keywords: {
      en: 'Taiwan public procurement GPU server, government GPU server quote, AI server procurement Taiwan, GPU server specification checklist',
      zh: '台灣公部門 GPU 伺服器採購, 政府 GPU 伺服器報價, AI 伺服器採購 台灣, GPU 伺服器規格檢核表'
    },
    hero: {
      en: 'GPU server procurement context for Taiwan public-sector buyers',
      zh: '台灣公部門採購者使用的 GPU 伺服器需求脈絡'
    },
    lead: {
      en: 'Use a configuration URL to keep hardware assumptions visible before internal review, budgetary quote, or formal procurement documentation.',
      zh: '在內部審查、預算報價或正式採購文件前，使用配置連結保留硬體假設。'
    },
    image: '/grando-rackable-01.jpg',
    imageAlt: {
      en: 'GPU server specification checklist for Taiwan procurement discussions',
      zh: '台灣採購討論使用的 GPU 伺服器規格檢核表'
    },
    configuratorHref: '/configurator',
    quoteHref: '/configurator?request=true',
    highlights: [
      {
        en: 'Supports early specification alignment before formal procurement documents are finalized.',
        zh: '支援正式採購文件定稿前的早期規格對齊。'
      },
      {
        en: 'Keeps workload, component, deployment, and quote assumptions in one shareable URL.',
        zh: '以一個可分享連結保留工作負載、零組件、部署與報價假設。'
      },
      {
        en: 'Useful for research, university, government, and public-sector AI infrastructure teams.',
        zh: '適合研究、學校、政府與公部門 AI 基礎設施團隊。'
      }
    ],
    specs: [
      { label: { en: 'Procurement context', zh: '採購脈絡' }, value: { en: 'Specification review and budgetary quote', zh: '規格審查與預算報價' } },
      { label: { en: 'Required assumptions', zh: '必要假設' }, value: { en: 'Workload, GPU class, storage, power, warranty', zh: '工作負載、GPU 等級、儲存、電力、保固' } },
      { label: { en: 'Output', zh: '輸出' }, value: { en: 'Configuration URL for internal review', zh: '供內部審查的配置連結' } }
    ],
    faqs: [
      {
        question: { en: 'Is this legal procurement advice?', zh: '這是政府採購法律建議嗎？' },
        answer: { en: 'No. This page is a technical and quote preparation checklist. Formal procurement wording should still be reviewed by the responsible procurement team.', zh: '不是。此頁是技術與報價準備檢核表。正式採購文字仍應由負責採購團隊審查。' }
      },
      {
        question: { en: 'How does the configurator help public-sector review?', zh: '配置器如何協助公部門審查？' },
        answer: { en: 'It preserves the selected hardware assumptions in a URL so technical reviewers and purchasing staff can discuss the same configuration.', zh: '它會用連結保留已選硬體假設，讓技術審查與採購人員可以討論同一配置。' }
      }
    ]
  },
  {
    slug: 'supermicro-comino-gpu-server-comparison',
    kind: 'comparison',
    title: {
      en: 'Supermicro and Comino GPU Server Configuration Comparison',
      zh: 'Supermicro 與 Comino GPU 伺服器配置比較'
    },
    description: {
      en: 'Compare GPU server buying paths when evaluating Supermicro-style server RFQs and Comino Grando configurator-led AI server quotes.',
      zh: '比較評估 Supermicro 類 GPU 伺服器 RFQ 與 Comino Grando 配置器導向 AI 伺服器報價時的採購路徑。'
    },
    keywords: {
      en: 'Supermicro GPU server comparison, Comino GPU server, GPU server alternative, AI server quote comparison, GPU server configurator',
      zh: 'Supermicro GPU 伺服器比較, Comino GPU 伺服器, GPU 伺服器替代方案, AI 伺服器報價比較, GPU 伺服器配置器'
    },
    hero: {
      en: 'Compare GPU server RFQs with configurator-led quote paths',
      zh: '比較 GPU 伺服器 RFQ 與配置器導向報價路徑'
    },
    lead: {
      en: 'Use this page when the buying team is comparing conventional GPU server RFQs with a configurator workflow that preserves component choices and quote context.',
      zh: '當採購團隊比較傳統 GPU 伺服器 RFQ 與可保留零組件選擇及報價脈絡的配置器流程時，可從此頁開始。'
    },
    image: '/grando-8gpu-server.jpg',
    imageAlt: {
      en: 'Comino GPU server configuration comparison for Supermicro-style RFQ evaluation',
      zh: '用於 Supermicro 類 RFQ 評估的 Comino GPU 伺服器配置比較'
    },
    configuratorHref: '/configurator',
    quoteHref: '/configurator?request=true',
    highlights: [
      {
        en: 'Frames the decision around quote workflow, configuration clarity, and deployment assumptions.',
        zh: '以報價流程、配置清楚度與部署假設作為比較重點。'
      },
      {
        en: 'Configurator URLs help both technical and purchasing teams review the same build.',
        zh: '配置器連結協助技術與採購團隊審查同一配置。'
      },
      {
        en: 'Useful when buyers need a comparable GPU server path before vendor selection.',
        zh: '適合採購者在選擇供應商前，需要可比較的 GPU 伺服器路徑。'
      }
    ],
    specs: [
      { label: { en: 'Comparison focus', zh: '比較重點' }, value: { en: 'RFQ workflow and configuration traceability', zh: 'RFQ 流程與配置可追蹤性' } },
      { label: { en: 'Best use', zh: '適合情境' }, value: { en: 'Vendor evaluation and quote preparation', zh: '供應商評估與報價準備' } },
      { label: { en: 'Next step', zh: '下一步' }, value: { en: 'Open configurator and export quote context', zh: '開啟配置器並輸出報價脈絡' } }
    ],
    faqs: [
      {
        question: { en: 'Is this a specification-by-specification benchmark?', zh: '這是逐規格效能比較嗎？' },
        answer: { en: 'No. This page compares buying workflow and quote preparation context. Specific product performance should be reviewed against the final selected configuration.', zh: '不是。此頁比較採購流程與報價準備脈絡。具體產品效能應依最終選定配置另行審查。' }
      },
      {
        question: { en: 'Why compare with a configurator workflow?', zh: '為什麼要比較配置器流程？' },
        answer: { en: 'A configurator workflow keeps selected GPU, CPU, memory, storage, power, and network assumptions visible, which can make RFQ review more consistent.', zh: '配置器流程會保留已選 GPU、CPU、記憶體、儲存、電源與網路假設，可讓 RFQ 審查更一致。' }
      }
    ]
  },
  {
    slug: 'ai-inference-server-taiwan',
    title: {
      en: 'AI Inference Server Quote Configurator for Taiwan LLM and Private Model Deployment',
      zh: 'AI 推論伺服器報價配置器｜台灣 LLM 與私有模型部署'
    },
    description: {
      en: 'Configure an AI inference server for Taiwan LLM and private model serving, with concurrency, GPU memory, system RAM, NVMe, networking, deployment, and quote follow-up context.',
      zh: '為台灣 LLM 與私有模型服務配置 AI 推論伺服器，保留併發量、GPU 記憶體、系統記憶體、NVMe、網路、部署與報價追蹤脈絡。'
    },
    keywords: {
      en: 'AI inference server Taiwan, LLM server Taiwan, private model serving server, GPU inference server, local AI server quote, LLM inference server, AI server configurator Taiwan',
      zh: 'AI 推論伺服器 台灣, LLM 伺服器 台灣, 私有模型服務伺服器, GPU 推論伺服器, 本地 AI 伺服器報價, LLM 推論伺服器, AI 伺服器配置器 台灣'
    },
    hero: {
      en: 'AI inference server quote configuration for Taiwan LLM deployment',
      zh: '台灣 LLM 部署的 AI 推論伺服器報價配置'
    },
    lead: {
      en: 'Start from a GPU server or workstation configuration, then record concurrency, model size, GPU memory, system RAM, NVMe storage, networking, and operations assumptions for inference workloads.',
      zh: '從 GPU 伺服器或工作站配置開始，記錄推論工作負載的併發量、模型規模、GPU 記憶體、系統記憶體、NVMe、網路與維運假設。'
    },
    image: '/grando-desktop-01.jpg',
    imageAlt: {
      en: 'AI inference server configuration for Taiwan teams',
      zh: '台灣團隊使用的 AI 推論伺服器配置'
    },
    configuratorHref: '/configurator',
    quoteHref: '/configurator?request=true',
    highlights: [
      {
        en: 'Targets teams planning local inference, private model serving, and GPU-accelerated application deployment.',
        zh: '鎖定規劃本地推論、私有模型服務與 GPU 加速應用部署的團隊。'
      },
      {
        en: 'Configurator links help compare workstation and rackable server directions.',
        zh: '配置器連結可協助比較工作站與可上架伺服器方向。'
      },
      {
        en: 'Quote requests preserve hardware assumptions for technical and purchasing review.',
        zh: '詢價會保留硬體假設，方便技術與採購審查。'
      }
    ],
    specs: [
      { label: { en: 'Workload', zh: '工作負載' }, value: { en: 'Local AI inference and model serving', zh: '本地 AI 推論與模型服務' } },
      { label: { en: 'Hardware focus', zh: '硬體重點' }, value: { en: 'GPU memory, system RAM, NVMe, network', zh: 'GPU 記憶體、系統記憶體、NVMe、網路' } },
      { label: { en: 'Region', zh: '服務區域' }, value: { en: 'Taiwan quote follow-up', zh: '台灣報價追蹤' } }
    ],
    faqs: [
      {
        question: { en: 'Should inference buyers choose a workstation or a rack server?', zh: '推論需求應該選工作站還是機架式伺服器？' },
        answer: { en: 'It depends on concurrency, uptime, GPU density, rack availability, and management needs. The configurator helps preserve both options for review.', zh: '取決於併發量、可用性、GPU 密度、機架條件與管理需求。配置器可保留兩種方向供審查。' }
      },
      {
        question: { en: 'Can EudTech help size an inference server from a draft configuration?', zh: 'EudTech 可以依初稿配置協助估推論伺服器規格嗎？' },
        answer: { en: 'Yes. Send the draft configuration with workload notes so EudTech can follow up on GPU memory, system RAM, storage, and networking assumptions.', zh: '可以。送出初稿配置與工作負載備註後，EudTech 可協助追蹤 GPU 記憶體、系統記憶體、儲存與網路假設。' }
      },
      {
        question: { en: 'What should be included in an AI inference server quote request?', zh: 'AI 推論伺服器詢價應包含哪些資訊？' },
        answer: { en: 'Include model size, expected concurrency, response-time target, GPU memory, system RAM, NVMe storage, networking, operating model, and whether the deployment is a workstation or rack server. The configurator retains the hardware choices for that review.', zh: '請包含模型規模、預期併發量、回應時間目標、GPU 記憶體、系統記憶體、NVMe 儲存、網路、維運模式，以及部署為工作站或機架伺服器。配置器會保留硬體選項供後續審查。' }
      }
    ]
  },
  {
    slug: 'comino-grando-configurator-taiwan',
    kind: 'guide',
    title: {
      en: 'Comino Grando Configurator Taiwan Quote Guide',
      zh: 'Comino Grando 台灣報價配置器指南'
    },
    description: {
      en: 'Use the Comino Grando configurator to prepare Taiwan GPU server and AI workstation quote requests with GPU, CPU, memory, storage, power, and networking context.',
      zh: '使用 Comino Grando 配置器準備台灣 GPU 伺服器與 AI 工作站詢價，保留 GPU、CPU、記憶體、儲存、電源與網路脈絡。'
    },
    keywords: {
      en: 'Comino Grando, Comino Grando configurator, Grando GPU server, Grando quote Taiwan, GPU server configurator Taiwan, EudTech Comino',
      zh: 'Comino Grando, Comino Grando 配置器, Grando GPU 伺服器, Grando 台灣報價, GPU 伺服器配置器 台灣, EudTech Comino'
    },
    hero: {
      en: 'Comino Grando quote configuration for Taiwan buyers',
      zh: '面向台灣採購者的 Comino Grando 報價配置入口'
    },
    lead: {
      en: 'Start from the Grando configurator, choose the system direction, and keep the selected hardware assumptions in a shareable URL for EudTech quote follow-up.',
      zh: '從 Grando 配置器開始，選擇系統方向，並以可分享連結保留硬體假設，供 EudTech 後續追蹤正式報價。'
    },
    image: '/grando-8gpu-server.jpg',
    imageAlt: {
      en: 'Comino Grando GPU server configurator for Taiwan quote requests',
      zh: '用於台灣詢價的 Comino Grando GPU 伺服器配置器'
    },
    configuratorHref: '/configurator',
    quoteHref: '/configurator?request=true',
    highlights: [
      {
        en: 'Targets search intent around Comino Grando, Grando configurator, and Taiwan GPU server quotes.',
        zh: '對應 Comino Grando、Grando 配置器與台灣 GPU 伺服器報價搜尋意圖。'
      },
      {
        en: 'Keeps workstation, rackable server, and integration-kit paths connected through one crawler-readable guide.',
        zh: '以單一可抓取指南串接工作站、可上架伺服器與整合套件路徑。'
      },
      {
        en: 'Quote requests preserve configuration state, marketing attribution, and contact context for follow-up.',
        zh: '詢價會保留配置狀態、來源追蹤與聯絡脈絡，方便後續追蹤。'
      }
    ],
    specs: [
      { label: { en: 'Search focus', zh: '搜尋重點' }, value: { en: 'Comino Grando configurator and quote', zh: 'Comino Grando 配置器與報價' } },
      { label: { en: 'Product scope', zh: '產品範圍' }, value: { en: 'GPU servers, AI workstations, integration kits', zh: 'GPU 伺服器、AI 工作站、整合套件' } },
      { label: { en: 'Region', zh: '服務區域' }, value: { en: 'Taiwan sales and procurement follow-up', zh: '台灣銷售與採購追蹤' } }
    ],
    faqs: [
      {
        question: { en: 'Is this the main Comino Grando configurator entry?', zh: '這是 Comino Grando 配置器的主要入口嗎？' },
        answer: { en: 'Yes. This guide points buyers to the Grando configurator and related product routes for quote preparation.', zh: '是。此指南會引導採購者進入 Grando 配置器與相關產品路徑，以準備詢價。' }
      },
      {
        question: { en: 'Does EudTech handle Taiwan quote follow-up for Comino Grando?', zh: 'EudTech 會追蹤 Comino Grando 的台灣報價嗎？' },
        answer: { en: 'Yes. EudTech can receive the submitted configuration and follow up through info@eudaemonia.tech.', zh: '會。EudTech 可接收送出的配置，並透過 info@eudaemonia.tech 追蹤後續報價。' }
      }
    ]
  },
  {
    slug: 'h200-gpu-server-rfq-taiwan',
    kind: 'checklist',
    title: {
      en: 'NVIDIA H200 GPU Server RFQ Checklist for Taiwan Procurement',
      zh: 'NVIDIA H200 GPU 伺服器台灣採購 RFQ 檢核表'
    },
    description: {
      en: 'Prepare NVIDIA H200 GPU server RFQs for Taiwan procurement by aligning GPU count, CPU platform, RAM, NVMe, power, networking, rack, cooling, and quote follow-up requirements.',
      zh: '為台灣採購準備 NVIDIA H200 GPU 伺服器 RFQ，對齊 GPU 數量、CPU 平台、RAM、NVMe、電源、網路、機架、散熱與報價追蹤需求。'
    },
    keywords: {
      en: 'H200 GPU server RFQ, NVIDIA H200 server Taiwan, H200 server quote, H200 AI training server, GPU server procurement checklist, H200 liquid cooled server',
      zh: 'H200 GPU 伺服器 RFQ, NVIDIA H200 伺服器 台灣, H200 伺服器報價, H200 AI 訓練伺服器, GPU 伺服器採購檢核表, H200 液冷伺服器'
    },
    hero: {
      en: 'H200 GPU server RFQ preparation before formal quote',
      zh: '正式詢價前的 H200 GPU 伺服器 RFQ 準備'
    },
    lead: {
      en: 'Use the H200 configurator path to preserve the selected GPU, CPU, RAM, storage, power, and network assumptions before sending the quote request.',
      zh: '使用 H200 配置器路徑，在送出詢價前保留已選 GPU、CPU、RAM、儲存、電源與網路假設。'
    },
    image: '/grando-8gpu-server.jpg',
    imageAlt: {
      en: 'NVIDIA H200 GPU server RFQ configuration',
      zh: 'NVIDIA H200 GPU 伺服器 RFQ 配置'
    },
    configuratorHref: '/configurator/29',
    quoteHref: '/configurator/29?request=true',
    highlights: [
      {
        en: 'Matches Search Console intent for H200 server, H200 versus RTX PRO 6000, and GPU server quote queries.',
        zh: '對應 Search Console 已出現的 H200 伺服器、H200 與 RTX PRO 6000 比較、GPU 伺服器報價查詢。'
      },
      {
        en: 'Helps technical and procurement teams review deployment assumptions before a formal RFQ.',
        zh: '協助技術與採購團隊在正式 RFQ 前審查部署假設。'
      },
      {
        en: 'Connects directly to SERVER 6xH200 and related H200 product configuration pages.',
        zh: '直接連至 SERVER 6xH200 與相關 H200 產品配置頁。'
      }
    ],
    specs: [
      { label: { en: 'GPU focus', zh: 'GPU 重點' }, value: { en: 'NVIDIA H200 141GB server paths', zh: 'NVIDIA H200 141GB 伺服器路徑' } },
      { label: { en: 'RFQ scope', zh: 'RFQ 範圍' }, value: { en: 'GPU, CPU, RAM, NVMe, power, networking, rack, cooling', zh: 'GPU、CPU、RAM、NVMe、電源、網路、機架、散熱' } },
      { label: { en: 'Buyer stage', zh: '採購階段' }, value: { en: 'Specification review before formal quote', zh: '正式報價前規格審查' } }
    ],
    faqs: [
      {
        question: { en: 'Which H200 route should I start from?', zh: 'H200 需求應該從哪個路徑開始？' },
        answer: { en: 'Start from SERVER 6xH200 when the team is comparing high-density H200 server assumptions, then adjust the configuration before requesting a quote.', zh: '若團隊正在比較高密度 H200 伺服器假設，建議先從 SERVER 6xH200 開始，再調整配置並送出詢價。' }
      },
      {
        question: { en: 'Can this checklist replace a formal RFQ document?', zh: '這份檢核表可以取代正式 RFQ 文件嗎？' },
        answer: { en: 'No. It helps prepare the configuration context; the formal RFQ and quote still depend on the final project requirement.', zh: '不可以。它用於準備配置脈絡；正式 RFQ 與報價仍需依最終專案需求確認。' }
      }
    ]
  },
  {
    slug: 'rtx-pro-6000-local-ai-inference',
    kind: 'guide',
    title: {
      en: 'RTX PRO 6000 Local AI Inference Workstation Quote Guide',
      zh: 'RTX PRO 6000 本地 AI 推論工作站報價指南'
    },
    description: {
      en: 'Plan RTX PRO 6000 workstation quotes for local AI inference, visualization, simulation, and model development with GPU, CPU, RAM, NVMe, and networking context.',
      zh: '規劃 RTX PRO 6000 工作站報價，適用於本地 AI 推論、視覺化、模擬與模型開發，並保留 GPU、CPU、RAM、NVMe 與網路脈絡。'
    },
    keywords: {
      en: 'RTX PRO 6000 local inference, RTX PRO 6000 workstation quote, local AI inference workstation, AI workstation Taiwan, GPU workstation quote, RTX PRO 6000 LLM',
      zh: 'RTX PRO 6000 本地推論, RTX PRO 6000 工作站報價, 本地 AI 推論工作站, AI 工作站 台灣, GPU 工作站報價, RTX PRO 6000 LLM'
    },
    hero: {
      en: 'RTX PRO 6000 workstation quote context for local AI',
      zh: '面向本地 AI 的 RTX PRO 6000 工作站報價脈絡'
    },
    lead: {
      en: 'Use the workstation configurator to compare RTX PRO 6000 options with H200 or rackable systems before sending a quote request.',
      zh: '使用工作站配置器比較 RTX PRO 6000、H200 或可上架系統方向，再送出詢價需求。'
    },
    image: '/comino-workstation-front.png',
    imageAlt: {
      en: 'RTX PRO 6000 workstation for local AI inference quote planning',
      zh: '用於本地 AI 推論報價規劃的 RTX PRO 6000 工作站'
    },
    configuratorHref: '/configurator/34',
    quoteHref: '/configurator/34?request=true',
    highlights: [
      {
        en: 'Targets buyers evaluating local inference, workstation deployment, rendering, and simulation.',
        zh: '鎖定評估本地推論、工作站部署、渲染與模擬的採購者。'
      },
      {
        en: 'Strengthens internal links between RTX PRO 6000 workstation pages and the broader quote funnel.',
        zh: '強化 RTX PRO 6000 工作站頁面與整體詢價漏斗之間的站內連結。'
      },
      {
        en: 'Keeps quote context separate from public pricing because final pricing depends on configuration and supply conditions.',
        zh: '報價脈絡與公開價格分開處理，因正式價格取決於配置與供應條件。'
      }
    ],
    specs: [
      { label: { en: 'GPU focus', zh: 'GPU 重點' }, value: { en: 'NVIDIA RTX PRO 6000 96GB workstation options', zh: 'NVIDIA RTX PRO 6000 96GB 工作站選項' } },
      { label: { en: 'Workload', zh: '工作負載' }, value: { en: 'Local inference, visualization, rendering, simulation', zh: '本地推論、視覺化、渲染、模擬' } },
      { label: { en: 'Next step', zh: '下一步' }, value: { en: 'Configure workstation and submit quote request', zh: '配置工作站並送出詢價' } }
    ],
    faqs: [
      {
        question: { en: 'When should I choose RTX PRO 6000 instead of H200?', zh: '什麼情況適合選 RTX PRO 6000 而不是 H200？' },
        answer: { en: 'RTX PRO 6000 can fit workstation, visualization, and local inference planning, while H200 is typically reviewed for higher-memory server workloads. EudTech can compare both quote paths from submitted configurations.', zh: 'RTX PRO 6000 適合工作站、視覺化與本地推論規劃；H200 通常用於較高記憶體需求的伺服器工作負載。EudTech 可依送出的配置比較兩種報價路徑。' }
      },
      {
        question: { en: 'Can I use this page for LLM workstation quote planning?', zh: '這個頁面可以用於 LLM 工作站詢價規劃嗎？' },
        answer: { en: 'Yes. Add workload notes about model size, concurrency, storage, and deployment needs in the quote form.', zh: '可以。請在詢價表單中補充模型大小、併發量、儲存與部署需求等工作負載備註。' }
      }
    ]
  },
  {
    slug: 'ai-server-procurement-case-taiwan',
    kind: 'guide',
    title: {
      en: 'Taiwan AI Server Procurement Case Guide with Configurator Quote Flow',
      zh: '台灣 AI 伺服器採購案例指南與配置器詢價流程'
    },
    description: {
      en: 'Map Taiwan AI server procurement scenarios to EudTech configurator quote paths for H200 servers, RTX PRO 6000 workstations, rackable systems, and liquid-cooling requirements.',
      zh: '將台灣 AI 伺服器採購情境對應到 EudTech 配置器詢價路徑，涵蓋 H200 伺服器、RTX PRO 6000 工作站、可上架系統與液冷需求。'
    },
    keywords: {
      en: 'AI server procurement Taiwan, GPU server procurement Taiwan, AI server quote case, EudTech configurator, liquid cooled AI server procurement, GPU workstation procurement',
      zh: 'AI 伺服器採購 台灣, GPU 伺服器採購 台灣, AI 伺服器報價案例, EudTech 配置器, 液冷 AI 伺服器採購, GPU 工作站採購'
    },
    hero: {
      en: 'Configurator-driven AI server procurement cases for Taiwan teams',
      zh: '面向台灣團隊的配置器式 AI 伺服器採購情境'
    },
    lead: {
      en: 'Choose the closest procurement scenario, open the matching configurator path, and keep the selected hardware assumptions ready for quote follow-up.',
      zh: '先選擇最接近的採購情境，再開啟對應配置器路徑，保留硬體假設供後續報價追蹤。'
    },
    image: '/grando-rackable-01.jpg',
    imageAlt: {
      en: 'Taiwan AI server procurement case route with configurator quote flow',
      zh: '台灣 AI 伺服器採購案例與配置器詢價流程'
    },
    configuratorHref: '/configurator',
    quoteHref: '/configurator?request=true',
    highlights: [
      {
        en: 'Creates an owned-site case page for organic and email outreach without requiring new ad-platform credentials.',
        zh: '建立不需新廣告平台憑證即可使用的自有案例頁，供自然曝光與 Email 觸及。'
      },
      {
        en: 'Connects procurement intent to H200, RTX PRO 6000, RFQ checklist, power planning, and rack deployment pages.',
        zh: '將採購意圖連到 H200、RTX PRO 6000、RFQ 檢核、電力規劃與機架部署頁面。'
      },
      {
        en: 'Supports government, research, enterprise, and system-integration quote preparation.',
        zh: '支援政府、研究單位、企業與系統整合採購的報價準備。'
      }
    ],
    specs: [
      { label: { en: 'Procurement case', zh: '採購情境' }, value: { en: 'AI server, GPU workstation, rackable system, liquid cooling', zh: 'AI 伺服器、GPU 工作站、可上架系統、液冷' } },
      { label: { en: 'Conversion path', zh: '轉換路徑' }, value: { en: 'Scenario page to configurator quote request', zh: '情境頁導向配置器詢價' } },
      { label: { en: 'Review team', zh: '審查角色' }, value: { en: 'IT, research, procurement, finance, vendor management', zh: 'IT、研究、採購、財務、供應商管理' } }
    ],
    faqs: [
      {
        question: { en: 'Why use a case guide before opening the configurator?', zh: '為什麼開啟配置器前要先看案例指南？' },
        answer: { en: 'A case guide helps non-technical stakeholders choose the right starting path before detailed hardware options are selected.', zh: '案例指南可協助非技術利害關係人先選擇正確起點，再進入詳細硬體選項。' }
      },
      {
        question: { en: 'Can this page be used for organic outreach?', zh: '這個頁面可以用於自然觸及嗎？' },
        answer: { en: 'Yes. It is designed as a crawler-readable owned page and will be included in sitemap, feed, LLM files, and organic promotion assets.', zh: '可以。此頁設計為可被 crawler 讀取的自有頁面，會納入 sitemap、feed、LLM 檔與自然推廣素材。' }
      }
    ]
  }
];

export const getConfiguratorSeoPage = (slug?: string) =>
  CONFIGURATOR_SEO_PAGES.find((page) => page.slug === slug);
