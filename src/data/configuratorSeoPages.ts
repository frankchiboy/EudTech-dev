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
      en: 'NVIDIA H200 server quote and price planning',
      zh: 'NVIDIA H200 伺服器報價與價格規劃'
    },
    lead: {
      en: 'For Taiwan procurement, set the GPU count, CPU, memory, storage, power, cooling, and networking for an H200 server. Send the exact build to EudTech. EudTech confirms availability, price, and delivery for that configuration.',
      zh: '台灣採購 H200 伺服器，先在配置器設定 GPU 數量、CPU、記憶體、儲存、電源、散熱與網路。送出完整配置後，EudTech 依該配置確認供貨、價格與交期。'
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
        en: 'For AI training, inference, simulation, and research clusters.',
        zh: '適用於 AI 訓練、推論、模擬與研究叢集。'
      },
      {
        en: 'Fits inference planning where GPU memory, power, and deployment density must be reviewed together.',
        zh: '適合需要同時審查 GPU 記憶體、電力與部署密度的推論規劃。'
      },
      {
        en: 'The configurator keeps GPU, CPU, memory, storage, and power selections in one place.',
        zh: '配置器把 GPU、CPU、記憶體、儲存與電源選項保留在同一份配置。'
      },
      {
        en: 'The quote request includes a shareable configuration link for procurement and technical review.',
        zh: '詢價內容附可分享的配置連結，方便採購與技術審查。'
      },
      {
        en: 'Price depends on the final GPU count, platform, memory, storage, power, cooling, and delivery requirements.',
        zh: '價格依最終 GPU 數量、平台、記憶體、儲存、電力、散熱與交付需求確認。'
      }
    ],
    specs: [
      { label: { en: 'GPU focus', zh: 'GPU 重點' }, value: { en: 'NVIDIA H200 141GB options', zh: 'NVIDIA H200 141GB 選項' } },
      { label: { en: 'Form factor', zh: '機構型態' }, value: { en: 'Rackable liquid-cooled Grando systems', zh: '可上架 Grando 液冷系統' } },
      { label: { en: 'Best fit', zh: '適合需求' }, value: { en: 'AI labs, HPC teams, and data centre procurement', zh: 'AI 實驗室、HPC 團隊與資料中心採購' } }
    ],
    faqs: [
      {
        question: { en: 'Can I request a quote without choosing every component?', zh: '沒有選完所有零件也可以詢價嗎？' },
        answer: { en: 'Yes. The configurator sends the current selection, and EudTech follows up on incomplete or optional items.', zh: '可以。配置器會送出目前的選擇狀態，未完成或選配項目由 EudTech 後續確認。' }
      },
      {
        question: { en: 'Is this page for Taiwan procurement?', zh: '這個頁面適合台灣採購使用嗎？' },
        answer: { en: 'Yes. EudTech handles local consultation and quote follow-up for Taiwan buyers.', zh: '適合。EudTech 為台灣客戶提供本地諮詢與報價追蹤。' }
      },
      {
        question: { en: 'Is H200 suitable for planning inference on newer AI models?', zh: 'H200 適合下一代 AI 推論規劃嗎？' },
        answer: { en: 'Yes. An H200 configuration lets the team review GPU memory, CPU, RAM, storage, power, and networking in one quote path. The same path covers training, HPC, and inference.', zh: '適合。H200 配置可在同一條詢價路徑中審查 GPU 記憶體、CPU、RAM、儲存、電源與網路。訓練、HPC 與推論需求都適用。' }
      },
      {
        question: { en: 'How is H200 server pricing determined?', zh: '如何確認 H200 伺服器價格？' },
        answer: { en: 'EudTech confirms the price from the submitted configuration and does not publish one fixed amount. GPU count, CPU platform, memory, NVMe storage, power, cooling, networking, delivery, and supply conditions all affect the final quote.', zh: 'EudTech 依送出的配置確認價格，不公布單一固定金額。價格受 GPU 數量、CPU 平台、記憶體與 NVMe 儲存影響。電力、散熱、網路、交期與供應條件也會改變最終報價。' }
      },
      {
        question: { en: 'How is NVIDIA H200 server availability confirmed?', zh: 'NVIDIA H200 伺服器供貨狀態如何確認？' },
        answer: { en: 'EudTech confirms availability and delivery after reviewing the submitted GPU count, platform, and delivery requirements. This page is not an in-stock commitment.', zh: 'EudTech 會在審查送出的 GPU 數量、平台與交付需求後，確認供貨與交期。本頁不代表現貨承諾。' }
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
      en: 'Use the workstation configurator to set the GPU, CPU, memory, NVMe storage, and networking. Then send the quote request for local AI and visualisation workloads.',
      zh: '先用工作站配置器設定 GPU、CPU、記憶體、NVMe 儲存與網路。再針對本地 AI 與視覺化工作負載送出詢價。'
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
        en: 'For AI development, visualisation, rendering, and simulation teams.',
        zh: '適用於 AI 開發、視覺化、渲染與模擬團隊。'
      },
      {
        en: 'The workstation path lets buyers compare deskside and rackable configurations.',
        zh: '工作站路徑可讓採購比較桌面式與機架式配置。'
      },
      {
        en: 'The share link keeps the selected configuration for internal review.',
        zh: '分享連結會保留已選配置，方便內部審查。'
      }
    ],
    specs: [
      { label: { en: 'GPU focus', zh: 'GPU 重點' }, value: { en: 'NVIDIA RTX PRO 6000 class options', zh: 'NVIDIA RTX PRO 6000 等級選項' } },
      { label: { en: 'Use case', zh: '應用場景' }, value: { en: 'Local AI inference, rendering, simulation', zh: '本地 AI 推論、渲染、模擬' } },
      { label: { en: 'Quote request path', zh: '詢價路徑' }, value: { en: 'Configurator form to info@eudaemonia.tech', zh: '配置器表單送至 info@eudaemonia.tech' } }
    ],
    faqs: [
      {
        question: { en: 'Can I compare RTX PRO 6000 and H200 builds?', zh: '可以比較 RTX PRO 6000 與 H200 配置嗎？' },
        answer: { en: 'Yes. Configure one build on the workstation path and one on the rackable path, then share both links with EudTech.', zh: '可以。分別在工作站與機架式路徑完成配置，再把兩個連結交給 EudTech 比較。' }
      },
      {
        question: { en: 'Does the quote request include storage and CPU choices?', zh: '詢價會包含儲存與 CPU 選項嗎？' },
        answer: { en: 'Yes. The submitted message includes the selected GPU, CPU, RAM, storage, and the configuration URL.', zh: '會。送出內容包含已選 GPU、CPU、RAM、儲存與配置連結。' }
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
      zh: '台灣 AI 工作站與 GPU 部署選型'
    },
    lead: {
      en: 'Match the deployment site and operating constraints to a deskside workstation, a rackable GPU system, or an integration kit. Then adjust the hardware and send a shareable quote request.',
      zh: '先依部署場域與作業限制，選擇桌邊工作站、可上架 GPU 系統或整合套件。再調整硬體選項，送出附配置連結的詢價。'
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
        en: 'Start here when the first decision is the deployment form, not a single GPU SKU: deskside, rackable, or integration kit.',
        zh: '先決定部署型態、而非單一 GPU SKU 時，從這裡開始：桌邊、可上架或整合套件。'
      },
      {
        en: 'Choose the deskside path for offices or labs without rack constraints. Move to rackable systems when rack, power, network, and cooling are in scope.',
        zh: '辦公室或實驗室沒有機架限制時，選桌邊路徑。機架、供電、網路與散熱已納入範圍時，改看可上架系統。'
      },
      {
        en: 'Choose the integration-kit path when the buyer already owns the chassis, rack, cooling, or integration work and needs a component-level quote.',
        zh: '採購方已有機箱、機架、散熱或整合作業時，選整合套件路徑。適合需要零組件層級報價的情境。'
      },
      {
        en: 'EudTech follows up in Taiwan with product selection and quote consultation.',
        zh: 'EudTech 在台灣協助產品選型與報價諮詢。'
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
        answer: { en: 'Yes. Send the draft, and EudTech refines it around workload, budget, and deployment needs.', zh: '可以。送出初稿後，EudTech 依工作負載、預算與部署需求協助調整。' }
      },
      {
        question: { en: 'Is this only for large servers?', zh: '這只適合大型伺服器嗎？' },
        answer: { en: 'No. The configurator covers deskside workstations, rackable systems, and integration kits, so teams can start from the form that fits their site.', zh: '不是。配置器涵蓋桌邊工作站、可上架系統與整合套件。團隊可從符合部署場域的型態開始。' }
      },
      {
        question: { en: 'When should a Taiwan AI workstation project use a rackable path?', zh: '台灣 AI 工作站專案何時應改看可上架路徑？' },
        answer: { en: 'Use a rackable path when the site already needs rack placement, power planning, network integration, or cooling coordination. Start deskside when those constraints are not part of the project.', zh: '交付場域已需要機架配置或電力規劃時，改看可上架路徑。需要網路整合或散熱協調時也一樣。尚未有這些限制時，先從桌邊路徑開始。' }
      },
      {
        question: { en: 'When is an integration kit a better starting point?', zh: '什麼情況適合先看整合套件？' },
        answer: { en: 'Start with an integration kit when the buyer already plans the chassis, rack, cooling, or integration work and needs a component-level quote.', zh: '採購方已規劃機箱、機架、散熱或整合作業時，先看整合套件。這條路徑適合零組件層級的配置與報價討論。' }
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
      en: 'GPU server cooling and liquid-cooled systems for sustained density',
      zh: '持續高密度運算的 GPU 伺服器散熱與液冷系統'
    },
    lead: {
      en: 'Record GPU density, cooling-sensitive hardware choices, storage, and power needs in the configurator before the quote discussion.',
      zh: '報價討論前，先用配置器記錄 GPU 密度與散熱敏感的硬體選項。儲存與電源需求也一併記錄。'
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
        en: 'For buyers comparing air-cooled GPU server cooling with liquid-cooled GPU density.',
        zh: '適合正在比較氣冷 GPU 伺服器散熱與液冷 GPU 密度的採購者。'
      },
      {
        en: 'The configuration link keeps the technical assumptions visible for review.',
        zh: '配置連結保留技術假設，方便審查。'
      },
      {
        en: 'The quote request sends the complete requirement to EudTech for sales follow-up.',
        zh: '詢價會把完整需求送交 EudTech 業務追蹤。'
      }
    ],
    specs: [
      { label: { en: 'Cooling', zh: '冷卻方向' }, value: { en: 'Liquid-cooled multi-GPU systems', zh: '液冷多 GPU 系統' } },
      { label: { en: 'Planning focus', zh: '規劃重點' }, value: { en: 'GPU server cooling, power, and deployment density', zh: 'GPU 伺服器散熱、電力與部署密度' } },
      { label: { en: 'Workload', zh: '工作負載' }, value: { en: 'AI training, inference, HPC, simulation', zh: 'AI 訓練、推論、HPC、模擬' } },
      { label: { en: 'Next action', zh: '下一步' }, value: { en: 'Configure and request a quote', zh: '完成配置後送出詢價' } }
    ],
    faqs: [
      {
        question: { en: 'Why start with a configurator for liquid cooling?', zh: '為什麼液冷需求要先用配置器？' },
        answer: { en: 'Liquid-cooled systems depend on GPU count, power, storage, networking, and deployment constraints. A configuration link makes those assumptions explicit.', zh: '液冷系統受 GPU 數量、電源、儲存、網路與部署條件影響。配置連結可把這些假設清楚列出。' }
      },
      {
        question: { en: 'What should buyers check when planning GPU server cooling?', zh: '規劃 GPU 伺服器散熱時應先確認什麼？' },
        answer: { en: 'Confirm GPU count, power capacity, rack or workstation form factor, storage density, networking, and room deployment before requesting a quote.', zh: '先確認 GPU 數量、電源容量、機架或工作站型態。再確認儲存密度、網路與機房部署假設，然後送出詢價。' }
      },
      {
        question: { en: 'Can I share the configuration internally before sending it?', zh: '可以先在內部分享配置再送出嗎？' },
        answer: { en: 'Yes. Use the Share button in the configurator, then send the quote request when the configuration is ready.', zh: '可以。先用配置器的分享按鈕，配置確認後再送出詢價。' }
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
      en: 'GPU server quote, price planning, and RFQ entry point',
      zh: 'GPU 伺服器報價、價格規劃與 RFQ 入口'
    },
    lead: {
      en: 'Choose an H200 server or an RTX PRO 6000 workstation. Replace vague RFQ notes with a configuration URL that records GPU, CPU, RAM, storage, power, cooling, and network. EudTech uses it to confirm price and delivery.',
      zh: '先選 H200 伺服器或 RTX PRO 6000 工作站。再用配置連結取代模糊的 RFQ 備註，記錄 GPU、CPU、RAM、儲存、電源、散熱與網路。EudTech 依此確認價格與交期。'
    },
    image: '/grando-rackable-01.jpg',
    imageAlt: {
      en: 'GPU server quote request configurator',
      zh: 'GPU 伺服器詢價配置器'
    },
    configuratorHref: '/configurator',
    quoteHref: '/configurator?request=true',
    highlights: [
      {
        en: 'For teams ready to compare GPU server builds and send a quote request.',
        zh: '適合已準備比較 GPU 伺服器配置並送出詢價的團隊。'
      },
      {
        en: 'The quote request email reaches EudTech with the selected configuration summary.',
        zh: '詢價信連同配置摘要送至 EudTech。'
      },
      {
        en: 'Useful for procurement, research labs, system integrators, and IT teams.',
        zh: '適合採購、研究單位、系統整合商與 IT 團隊。'
      },
      {
        en: 'The configuration keeps the price-driving hardware and deployment assumptions visible for budget review.',
        zh: '配置保留影響價格的硬體與部署假設，供預算審查。'
      }
    ],
    specs: [
      { label: { en: 'Quote request includes', zh: '詢價包含' }, value: { en: 'GPU, CPU, RAM, storage, power, network, URL', zh: 'GPU、CPU、RAM、儲存、電源、網路、連結' } },
      { label: { en: 'Recipient', zh: '收件' }, value: { en: 'EudTech sales follow-up', zh: 'EudTech 業務追蹤' } },
      { label: { en: 'Best use', zh: '最適合' }, value: { en: 'Early specification and RFQ alignment', zh: '早期規格與 RFQ 對齊' } }
    ],
    faqs: [
      {
        question: { en: 'What happens after I submit a quote request?', zh: '送出詢價後會發生什麼？' },
        answer: { en: 'EudTech receives the configuration summary and contact details, then follows up by email or phone.', zh: 'EudTech 收到配置摘要與聯絡資料後，透過 Email 或電話聯繫。' }
      },
      {
        question: { en: 'Can I use the configurator link in an RFQ process?', zh: '配置器連結可以放進 RFQ 流程嗎？' },
        answer: { en: 'Yes. The share link preserves the selected configuration, so technical reviewers see the same hardware assumptions.', zh: '可以。分享連結保留已選配置，技術審查者看到的是同一組硬體假設。' }
      },
      {
        question: { en: 'Why is there no single public GPU server price?', zh: '為什麼沒有單一公開的 GPU 伺服器價格？' },
        answer: { en: 'The price depends on GPU count and model, CPU platform, memory, storage, power, cooling, networking, delivery, and supply conditions. The configurator records those variables so EudTech can return a configuration-specific quote.', zh: '價格取決於 GPU 數量與型號、CPU 平台、記憶體與儲存。電力、散熱、網路、交期與供應條件也會影響。配置器記錄這些變因，EudTech 再依配置回覆報價。' }
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
      en: 'Use this H200 vs RTX PRO 6000 comparison to choose between dense AI training or HPC servers and local inference on workstations. Then keep the exact hardware assumptions in the matching configurator for quote review.',
      zh: '用這份 H200 vs RTX PRO 6000 比較，先判斷專案方向。是高密度 AI 訓練與 HPC 伺服器部署，還是本地推論與工作站彈性。再用對應配置器保留完整硬體假設，供報價審查。'
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
        en: 'H200 fits dense AI training, HPC, and shared data centre compute.',
        zh: 'H200 路線適合高密度 AI 訓練、HPC 與共用資料中心運算。'
      },
      {
        en: 'RTX PRO 6000 fits local AI development, visualisation, and workstation deployment.',
        zh: 'RTX PRO 6000 路線適合本地 AI 開發、視覺化與工作站部署。'
      },
      {
        en: 'Configurator links let engineering and purchasing review the same assumptions.',
        zh: '配置器連結讓工程與採購依同一組假設審查。'
      }
    ],
    specs: [
      { label: { en: 'Best H200 fit', zh: 'H200 適合' }, value: { en: 'Training, HPC, dense multi-GPU server use', zh: '訓練、HPC、高密度多 GPU 伺服器' } },
      { label: { en: 'Best RTX PRO fit', zh: 'RTX PRO 適合' }, value: { en: 'Local inference, rendering, simulation, workstation use', zh: '本地推論、渲染、模擬、工作站' } },
      { label: { en: 'Decision output', zh: '決策輸出' }, value: { en: 'Configuration URL and quote request', zh: '配置連結與詢價' } }
    ],
    faqs: [
      {
        question: { en: 'Should AI training buyers start with H200?', zh: 'AI 訓練採購應該先看 H200 嗎？' },
        answer: { en: 'For dense training and shared server deployment, start with H200. For local development or visualisation, RTX PRO 6000 is usually the better starting point.', zh: '高密度訓練或共用伺服器部署，先看 H200。本地開發或視覺化，通常以 RTX PRO 6000 為起點。' }
      },
      {
        question: { en: 'Can EudTech compare both configurations in one quote discussion?', zh: 'EudTech 可以在同一次報價討論比較兩種配置嗎？' },
        answer: { en: 'Yes. Share the H200 and RTX PRO 6000 configurator URLs so both sides compare the same component assumptions.', zh: '可以。分享 H200 與 RTX PRO 6000 的配置器連結，雙方依同一組零組件假設比較。' }
      },
      {
        question: { en: 'Which option should I open first for quote review?', zh: '報價審查應該先開哪一種配置？' },
        answer: { en: 'Open H200 first for dense training, HPC, or shared server deployment. Open RTX PRO 6000 first for local inference, workstation deployment, visualisation, or simulation.', zh: '高密度訓練、HPC 或共用伺服器部署，先開 H200。本地推論、工作站部署、視覺化或模擬，先開 RTX PRO 6000。' }
      },
      {
        question: { en: 'What is the simplest way to choose between H200 and RTX PRO 6000?', zh: 'H200 與 RTX PRO 6000 最簡單的選擇方式是什麼？' },
        answer: { en: 'Pick H200 for dense shared training, HPC, or rack deployment. Pick RTX PRO 6000 for local inference, development, visualisation, or a workstation-first deployment. Share both configurator links when both paths need quote review.', zh: '高密度共用訓練、HPC 或機架部署選 H200。本地推論、開發、視覺化或以工作站為主的部署選 RTX PRO 6000。兩條路徑都要報價審查時，分享兩個配置器連結。' }
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
      en: 'GPU server RFQ checklist before the quote request',
      zh: '送出詢價前的 GPU 伺服器 RFQ 檢核表'
    },
    lead: {
      en: 'A quote is easier to review when the RFQ states workload, GPU class, CPU, memory, NVMe storage, power, networking, and deployment constraints.',
      zh: 'RFQ 應寫明工作負載、GPU 等級、CPU、記憶體與 NVMe 儲存。再加上電源、網路與部署限制，報價審查會更清楚。'
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
        zh: '把工作負載、硬體與部署假設放在同一份配置。'
      },
      {
        en: 'Use it before a formal RFQ, a budgetary quote, or internal approval.',
        zh: '適合在正式 RFQ、預算報價或內部核准前使用。'
      }
    ],
    specs: [
      { label: { en: 'Hardware inputs', zh: '硬體輸入' }, value: { en: 'GPU, CPU, RAM, NVMe, power, network', zh: 'GPU、CPU、RAM、NVMe、電源、網路' } },
      { label: { en: 'Procurement inputs', zh: '採購輸入' }, value: { en: 'Workload, site constraints, review owner, timing', zh: '工作負載、場地限制、審查窗口、時程' } },
      { label: { en: 'Configurator output', zh: '配置器輸出' }, value: { en: 'Share URL and quote request email', zh: '分享連結與詢價信' } }
    ],
    faqs: [
      {
        question: { en: 'What should be ready before sending a GPU server RFQ?', zh: '送出 GPU 伺服器 RFQ 前應該準備什麼？' },
        answer: { en: 'Prepare the target workload, preferred GPU class, memory and storage expectations, power constraints, networking requirements, and deployment timeline.', zh: '準備目標工作負載、偏好的 GPU 等級、記憶體與儲存需求。再確認電源限制、網路需求與部署時程。' }
      },
      {
        question: { en: 'Can the configurator replace a written RFQ?', zh: '配置器可以取代書面 RFQ 嗎？' },
        answer: { en: 'No. It provides the technical configuration context. Formal procurement documents can reference the configurator URL for the selected hardware assumptions.', zh: '不能。配置器提供技術配置脈絡。正式採購文件可引用配置器連結，作為已選硬體假設。' }
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
      en: 'Liquid-cooled AI server procurement starts with a clear configuration',
      zh: '液冷 AI 伺服器採購從清楚的配置開始'
    },
    lead: {
      en: 'Evaluate liquid-cooled GPU systems with GPU count, heat load, rack constraints, power capacity, storage, networking, and service follow-up in one quote path.',
      zh: '液冷 GPU 系統應在同一條詢價路徑中評估。項目包含 GPU 數量、熱負載、機架限制、電源容量、儲存、網路與服務追蹤。'
    },
    image: '/GRANDO%20DPR%204090-FT_6_01.jpg',
    imageAlt: {
      en: 'Liquid-cooled AI server procurement planning with Comino Grando systems',
      zh: '以 Comino Grando 系統規劃液冷 AI 伺服器採購'
    },
    configuratorHref: '/configurator/29',
    quoteHref: '/configurator/29?request=true',
    highlights: [
      {
        en: 'For sustained AI, simulation, and HPC workloads where heat density matters.',
        zh: '針對熱密度重要的長時間 AI、模擬與 HPC 工作負載。'
      },
      {
        en: 'Keeps cooling, power, rack, and component assumptions visible before quote review.',
        zh: '在報價審查前保留散熱、電源、機架與零組件假設。'
      },
      {
        en: 'Helps buyers compare liquid-cooled systems with conventional server options.',
        zh: '協助採購者比較液冷系統與傳統伺服器選項。'
      }
    ],
    specs: [
      { label: { en: 'Planning inputs', zh: '規劃輸入' }, value: { en: 'GPU density, power, rack, storage, network', zh: 'GPU 密度、電源、機架、儲存、網路' } },
      { label: { en: 'Best fit', zh: '適合需求' }, value: { en: 'Dense AI training, HPC, simulation, shared compute', zh: '高密度 AI 訓練、HPC、模擬、共用運算' } },
      { label: { en: 'Next step', zh: '下一步' }, value: { en: 'Open the rackable configurator and request a quote', zh: '開啟機架式配置器並送出詢價' } }
    ],
    faqs: [
      {
        question: { en: 'When should procurement consider liquid-cooled GPU servers?', zh: '什麼情境應該考慮液冷 GPU 伺服器？' },
        answer: { en: 'Consider liquid cooling when GPU density, sustained load, rack limits, or power and thermal planning become central to the deployment.', zh: '當 GPU 密度、長時間負載或機架限制成為部署核心時，考慮液冷。電源與散熱規劃成為重點時也一樣。' }
      },
      {
        question: { en: 'Why use a configurator before discussing liquid cooling?', zh: '為什麼討論液冷前要先使用配置器？' },
        answer: { en: 'The configurator keeps GPU count, CPU, memory, storage, power, and networking assumptions together, which makes the cooling and procurement review more precise.', zh: '配置器把 GPU 數量、CPU、記憶體、儲存、電源與網路假設放在一起。散熱與採購審查會更精準。' }
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
      en: 'Keep GPU count, power supply design, CPU, memory, storage, and networking assumptions in one reviewable quote path with the configurator.',
      zh: '用配置器記錄 GPU 數量、電源設計、CPU、記憶體、儲存與網路假設。這些假設會留在同一條可審查的詢價路徑。'
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
        en: 'For buyers checking rack power, redundant supply options, and GPU density together.',
        zh: '適合需要同時檢查機架電力、冗餘電源選項與 GPU 密度的採購者。'
      },
      {
        en: 'Configuration links show facility and IT reviewers the same power and component assumptions.',
        zh: '配置連結讓機房與 IT 審查者看到同一組電力與零組件假設。'
      },
      {
        en: 'The quote request can include the selected GPU, CPU, memory, NVMe, networking, and power supply details.',
        zh: '詢價可包含已選 GPU、CPU、記憶體、NVMe、網路與電源供應細節。'
      }
    ],
    specs: [
      { label: { en: 'Planning focus', zh: '規劃重點' }, value: { en: 'Power capacity, redundancy, GPU density', zh: '電力容量、冗餘、GPU 密度' } },
      { label: { en: 'Best fit', zh: '適合需求' }, value: { en: 'AI servers, HPC clusters, shared GPU systems', zh: 'AI 伺服器、HPC 叢集、共用 GPU 系統' } },
      { label: { en: 'Request output', zh: '詢價輸出' }, value: { en: 'Configuration URL with power assumptions', zh: '包含電力假設的配置連結' } }
    ],
    faqs: [
      {
        question: { en: 'Why include power planning in a GPU server quote?', zh: '為什麼 GPU 伺服器報價要包含電力規劃？' },
        answer: { en: 'High-density GPU systems depend on power capacity and redundancy. Recording these assumptions before quote review reduces unclear follow-up questions.', zh: '高密度 GPU 系統受電力容量與冗餘設計影響。報價審查前先記錄這些假設，可減少後續追問。' }
      },
      {
        question: { en: 'Does the configurator replace facility planning?', zh: '配置器可以取代機房規劃嗎？' },
        answer: { en: 'No. It gives facility and IT teams the hardware and power context to review before formal deployment planning.', zh: '不能。配置器提供硬體與電力脈絡，讓機房與 IT 團隊在正式部署規劃前審查。' }
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
      zh: '機架式 AI 伺服器部署從可分享的配置開始'
    },
    lead: {
      en: 'Start here when the deployment discussion covers rack space, power, cooling, GPU count, storage, and network assumptions.',
      zh: '部署討論包含機架空間、電力、散熱、GPU 數量、儲存與網路假設時，從這裡開始。'
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
        en: 'For rack deployment discussions in AI, HPC, simulation, and research environments.',
        zh: '針對 AI、HPC、模擬與研究環境的機架部署討論。'
      },
      {
        en: 'Keeps the selected server, GPU, CPU, memory, storage, power, and network assumptions together.',
        zh: '保留已選伺服器、GPU、CPU、記憶體、儲存、電源與網路假設。'
      },
      {
        en: 'Purchasing and infrastructure teams review the same deployment context.',
        zh: '採購與基礎設施團隊審查同一份部署脈絡。'
      }
    ],
    specs: [
      { label: { en: 'Deployment type', zh: '部署型態' }, value: { en: 'Rackable AI GPU server systems', zh: '可上架 AI GPU 伺服器系統' } },
      { label: { en: 'Inputs', zh: '輸入項目' }, value: { en: 'Rack, power, cooling, GPU, storage, network', zh: '機架、電力、散熱、GPU、儲存、網路' } },
      { label: { en: 'Next action', zh: '下一步' }, value: { en: 'Configure the rackable system and request a quote', zh: '配置機架式系統並送出詢價' } }
    ],
    faqs: [
      {
        question: { en: 'When should I use the rack deployment entry point?', zh: '什麼時候應該使用機架部署入口？' },
        answer: { en: 'Use it when rack, facility, IT, and procurement teams need to review the same GPU server assumptions.', zh: '當機架、機房、IT 與採購團隊需要審查同一組 GPU 伺服器假設時使用。' }
      },
      {
        question: { en: 'Can this help before a formal site survey?', zh: '正式場勘前可以使用嗎？' },
        answer: { en: 'Yes. The configurator does not replace a site survey, but it gives the discussion a concrete hardware baseline.', zh: '可以。配置器不取代場勘，但能提供具體的硬體基準供討論。' }
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
      zh: '台灣公部門 GPU 伺服器採購需求脈絡'
    },
    lead: {
      en: 'Use a configuration URL to keep hardware assumptions visible before internal review, a budgetary quote, or formal procurement documents.',
      zh: '在內部審查、預算報價或正式採購文件前，用配置連結保留硬體假設。'
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
        en: 'Supports early specification alignment before formal procurement documents are finalised.',
        zh: '支援正式採購文件定稿前的早期規格對齊。'
      },
      {
        en: 'Keeps workload, component, deployment, and quote assumptions in one shareable URL.',
        zh: '用一個可分享連結保留工作負載、零組件、部署與報價假設。'
      },
      {
        en: 'For research, university, government, and public-sector AI infrastructure teams.',
        zh: '適合研究單位、學校、政府與公部門 AI 基礎設施團隊。'
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
        answer: { en: 'No. This page is a technical and quote-preparation checklist. The responsible procurement team should still review the formal procurement wording.', zh: '不是。本頁是技術與詢價準備檢核表。正式採購文字仍由負責的採購團隊審查。' }
      },
      {
        question: { en: 'How does the configurator help public-sector review?', zh: '配置器如何協助公部門審查？' },
        answer: { en: 'It keeps the selected hardware assumptions in a URL, so technical reviewers and purchasing staff discuss the same configuration.', zh: '配置器用連結保留已選硬體假設。技術審查與採購人員因此討論同一份配置。' }
      }
    ]
  },
  {
    slug: 'supermicro-comino-gpu-server-comparison',
    kind: 'comparison',
    title: {
      en: 'Supermicro and Comino GPU Server Procurement Workflow Comparison',
      zh: 'Supermicro 與 Comino GPU 伺服器採購流程比較'
    },
    description: {
      en: 'Compare the procurement workflow, configuration traceability, and quote handoff for a conventional Supermicro RFQ and a Comino Grando configurator-led request. This page does not claim a hardware performance benchmark.',
      zh: '比較傳統 Supermicro RFQ 與 Comino Grando 配置器詢價的採購流程、配置可追蹤性與報價交接；本頁不宣稱硬體效能基準測試結果。'
    },
    keywords: {
      en: 'Supermicro GPU server comparison, Comino GPU server, GPU server alternative, AI server quote comparison, GPU server configurator',
      zh: 'Supermicro GPU 伺服器比較, Comino GPU 伺服器, GPU 伺服器替代方案, AI 伺服器報價比較, GPU 伺服器配置器'
    },
    hero: {
      en: 'Compare GPU server procurement workflows before requesting a quote',
      zh: '送出詢價前比較 GPU 伺服器採購流程'
    },
    lead: {
      en: 'Use this page to align the information each RFQ path requires. Review the final hardware specifications and performance evidence separately for the selected configuration.',
      zh: '用本頁對齊兩種 RFQ 路徑所需的資訊。最終硬體規格與效能證據，應針對選定配置另外審查。'
    },
    image: '/grando-8gpu-server.jpg',
    imageAlt: {
      en: 'Comino GPU server procurement workflow comparison for a Supermicro-style RFQ',
      zh: 'Supermicro 類 RFQ 與 Comino GPU 伺服器採購流程比較'
    },
    configuratorHref: '/configurator',
    quoteHref: '/configurator?request=true',
    highlights: [
      {
        en: 'Compares the information and handoff each quote workflow requires.',
        zh: '比較兩種報價流程所需的資訊與交接內容。'
      },
      {
        en: 'Configurator URLs let technical and purchasing teams review the same build.',
        zh: '配置器連結讓技術與採購團隊審查同一份配置。'
      },
      {
        en: 'Use the selected configuration to request a separate technical and commercial review.',
        zh: '用選定配置另行提出技術與商務審查需求。'
      }
    ],
    specs: [
      { label: { en: 'Comparison scope', zh: '比較範圍' }, value: { en: 'RFQ workflow and configuration traceability, not performance benchmarking', zh: 'RFQ 流程與配置可追蹤性，不包含效能基準測試' } },
      { label: { en: 'Best use', zh: '適合情境' }, value: { en: 'Vendor evaluation and quote preparation', zh: '供應商評估與報價準備' } },
      { label: { en: 'Next step', zh: '下一步' }, value: { en: 'Open a matching configurator and request a technical review', zh: '開啟對應配置器並提出技術審查需求' } }
    ],
    faqs: [
      {
        question: { en: 'Does this page compare hardware performance?', zh: '這頁有比較硬體效能嗎？' },
        answer: { en: 'No. This page compares procurement workflow and configuration traceability. Review official specifications and configuration-specific performance evidence separately before deciding on hardware.', zh: '沒有。本頁比較採購流程與配置可追蹤性。硬體決策前，另外審查官方規格與選定配置的效能證據。' }
      },
      {
        question: { en: 'Why compare with a configurator workflow?', zh: '為什麼要比較配置器流程？' },
        answer: { en: 'A configurator workflow keeps the selected GPU, CPU, memory, storage, power, and network assumptions visible, which makes RFQ review more consistent.', zh: '配置器流程保留已選 GPU、CPU、記憶體、儲存、電源與網路假設。RFQ 審查會更一致。' }
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
      en: 'Start from a GPU server or workstation configuration. Record concurrency, model size, GPU memory, system RAM, NVMe storage, networking, and operations assumptions for the inference workload.',
      zh: '從 GPU 伺服器或工作站配置開始。記錄推論工作負載的併發量、模型規模、GPU 記憶體與系統記憶體。再補上 NVMe、網路與維運假設。'
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
        en: 'For teams planning local inference, private model serving, and GPU-accelerated application deployment.',
        zh: '適合規劃本地推論、私有模型服務與 GPU 加速應用部署的團隊。'
      },
      {
        en: 'Configurator links help compare the workstation and rackable server directions.',
        zh: '配置器連結協助比較工作站與可上架伺服器兩個方向。'
      },
      {
        en: 'The quote request keeps the hardware assumptions for technical and purchasing review.',
        zh: '詢價保留硬體假設，方便技術與採購審查。'
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
        answer: { en: 'It depends on concurrency, uptime, GPU density, rack availability, and management needs. The configurator keeps both options open for review.', zh: '取決於併發量、可用性、GPU 密度、機架條件與管理需求。配置器可保留兩個方向供審查。' }
      },
      {
        question: { en: 'Can EudTech help size an inference server from a draft configuration?', zh: 'EudTech 可以依初稿配置協助估算推論伺服器規格嗎？' },
        answer: { en: 'Yes. Send the draft configuration with workload notes, and EudTech follows up on GPU memory, system RAM, storage, and networking.', zh: '可以。送出初稿配置與工作負載備註。EudTech 會追蹤 GPU 記憶體、系統記憶體、儲存與網路假設。' }
      },
      {
        question: { en: 'What should be included in an AI inference server quote request?', zh: 'AI 推論伺服器詢價應包含哪些資訊？' },
        answer: { en: 'Include model size, expected concurrency, response-time target, GPU memory, system RAM, NVMe storage, networking, and operating model. State whether the deployment is a workstation or a rack server. The configurator keeps the hardware choices for that review.', zh: '包含模型規模、預期併發量、回應時間目標、GPU 記憶體與系統記憶體。再加上 NVMe 儲存、網路、維運模式，以及部署為工作站或機架伺服器。配置器會保留硬體選項供審查。' }
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
      zh: 'Comino Grando 台灣報價配置入口'
    },
    lead: {
      en: 'Start in the Grando configurator, choose the system direction, and keep the selected hardware assumptions in a shareable URL. EudTech follows up with a quote.',
      zh: '從 Grando 配置器開始，選擇系統方向，用可分享連結保留硬體假設。EudTech 依此追蹤正式報價。'
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
        en: 'For buyers searching for Comino Grando, the Grando configurator, or a Taiwan GPU server quote.',
        zh: '適合搜尋 Comino Grando、Grando 配置器或台灣 GPU 伺服器報價的採購者。'
      },
      {
        en: 'One guide links the workstation, rackable server, and integration-kit paths.',
        zh: '一份指南串接工作站、可上架伺服器與整合套件路徑。'
      },
      {
        en: 'The quote request keeps the configuration state, source attribution, and contact details for follow-up.',
        zh: '詢價會保留配置狀態、來源資訊與聯絡資料，方便後續追蹤。'
      }
    ],
    specs: [
      { label: { en: 'Focus', zh: '重點' }, value: { en: 'Comino Grando configurator and quote', zh: 'Comino Grando 配置器與報價' } },
      { label: { en: 'Product scope', zh: '產品範圍' }, value: { en: 'GPU servers, AI workstations, integration kits', zh: 'GPU 伺服器、AI 工作站、整合套件' } },
      { label: { en: 'Region', zh: '服務區域' }, value: { en: 'Taiwan sales and procurement follow-up', zh: '台灣銷售與採購追蹤' } }
    ],
    faqs: [
      {
        question: { en: 'Is this the main Comino Grando configurator entry?', zh: '這是 Comino Grando 配置器的主要入口嗎？' },
        answer: { en: 'Yes. This guide leads buyers to the Grando configurator and the related product routes to prepare a quote request.', zh: '是。此指南引導採購者進入 Grando 配置器與相關產品路徑，準備詢價。' }
      },
      {
        question: { en: 'Does EudTech handle Taiwan quote follow-up for Comino Grando?', zh: 'EudTech 會追蹤 Comino Grando 的台灣報價嗎？' },
        answer: { en: 'Yes. EudTech receives the submitted configuration and follows up through info@eudaemonia.tech.', zh: '會。EudTech 接收送出的配置，並透過 info@eudaemonia.tech 追蹤報價。' }
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
      en: 'H200 GPU server RFQ preparation before the quote request',
      zh: '送出詢價前的 H200 GPU 伺服器 RFQ 準備'
    },
    lead: {
      en: 'Use the H200 configurator path to keep the selected GPU, CPU, RAM, storage, power, and network assumptions before sending the quote request.',
      zh: '用 H200 配置器路徑保留已選 GPU、CPU、RAM、儲存、電源與網路假設，再送出詢價。'
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
        en: 'For buyers searching for H200 server, H200 versus RTX PRO 6000, or GPU server quote.',
        zh: '適合搜尋 H200 伺服器、H200 與 RTX PRO 6000 比較或 GPU 伺服器報價的採購者。'
      },
      {
        en: 'Technical and procurement teams review deployment assumptions before the formal RFQ.',
        zh: '技術與採購團隊在正式 RFQ 前審查部署假設。'
      },
      {
        en: 'Links directly to SERVER 6xH200 and the related H200 product configuration pages.',
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
        answer: { en: 'Start from SERVER 6xH200 when the team is comparing high-density H200 server assumptions. Adjust the configuration, then send the quote request.', zh: '團隊正在比較高密度 H200 伺服器假設時，先從 SERVER 6xH200 開始。調整配置後再送出詢價。' }
      },
      {
        question: { en: 'Can this checklist replace a formal RFQ document?', zh: '這份檢核表可以取代正式 RFQ 文件嗎？' },
        answer: { en: 'No. It prepares the configuration context. The formal RFQ and quote still depend on the final project requirement.', zh: '不能。它用於準備配置脈絡。正式 RFQ 與報價仍依最終專案需求確認。' }
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
      zh: '本地 AI 的 RTX PRO 6000 工作站報價脈絡'
    },
    lead: {
      en: 'Use the workstation configurator to compare RTX PRO 6000 options with H200 or rackable systems before sending a quote request.',
      zh: '用工作站配置器比較 RTX PRO 6000 與 H200 或可上架系統，再送出詢價。'
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
        en: 'For buyers evaluating local inference, workstation deployment, rendering, and simulation.',
        zh: '適合評估本地推論、工作站部署、渲染與模擬的採購者。'
      },
      {
        en: 'Connects the RTX PRO 6000 workstation pages with the quote request flow.',
        zh: '串接 RTX PRO 6000 工作站頁面與詢價流程。'
      },
      {
        en: 'Keeps quote context separate from public pricing, because the final price depends on configuration and supply conditions.',
        zh: '報價脈絡與公開價格分開，因為正式價格取決於配置與供應條件。'
      }
    ],
    specs: [
      { label: { en: 'GPU focus', zh: 'GPU 重點' }, value: { en: 'NVIDIA RTX PRO 6000 96GB workstation options', zh: 'NVIDIA RTX PRO 6000 96GB 工作站選項' } },
      { label: { en: 'Workload', zh: '工作負載' }, value: { en: 'Local inference, visualisation, rendering, simulation', zh: '本地推論、視覺化、渲染、模擬' } },
      { label: { en: 'Next step', zh: '下一步' }, value: { en: 'Configure the workstation and submit a quote request', zh: '配置工作站並送出詢價' } }
    ],
    faqs: [
      {
        question: { en: 'When should I choose RTX PRO 6000 instead of H200?', zh: '什麼情況適合選 RTX PRO 6000 而不是 H200？' },
        answer: { en: 'Choose RTX PRO 6000 for workstation, visualisation, and local inference planning. H200 is usually reviewed for higher-memory server workloads. EudTech can compare both quote paths from the submitted configurations.', zh: '工作站、視覺化與本地推論規劃選 RTX PRO 6000。H200 通常用於較高記憶體需求的伺服器工作負載。EudTech 可依送出的配置比較兩條報價路徑。' }
      },
      {
        question: { en: 'Can I use this page for LLM workstation quote planning?', zh: '這個頁面可以用於 LLM 工作站詢價規劃嗎？' },
        answer: { en: 'Yes. Add workload notes on model size, concurrency, storage, and deployment needs in the quote request form.', zh: '可以。在詢價表單補充模型規模、併發量、儲存與部署需求等工作負載備註。' }
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
      zh: '台灣 AI 伺服器採購情境與配置器路徑'
    },
    lead: {
      en: 'Choose the closest procurement scenario, open the matching configurator path, and keep the selected hardware assumptions ready for quote follow-up.',
      zh: '先選最接近的採購情境，再開啟對應配置器路徑。保留硬體假設，供後續報價追蹤。'
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
        en: 'Organises common AI server procurement scenarios into clear starting points for technical and purchasing teams.',
        zh: '把常見 AI 伺服器採購情境整理成清楚起點，供技術與採購團隊使用。'
      },
      {
        en: 'Links the H200, RTX PRO 6000, RFQ checklist, power planning, and rack deployment guides from one starting point.',
        zh: '從同一個起點連結 H200、RTX PRO 6000、RFQ 檢核表、電力規劃與機架部署指南。'
      },
      {
        en: 'Supports quote preparation for government, research, enterprise, and system-integration buyers.',
        zh: '支援政府、研究單位、企業與系統整合採購的詢價準備。'
      }
    ],
    specs: [
      { label: { en: 'Procurement case', zh: '採購情境' }, value: { en: 'AI server, GPU workstation, rackable system, liquid cooling', zh: 'AI 伺服器、GPU 工作站、可上架系統、液冷' } },
      { label: { en: 'Path', zh: '使用路徑' }, value: { en: 'Scenario page, then configurator quote request', zh: '情境頁進入配置器，再送出詢價' } },
      { label: { en: 'Review team', zh: '審查角色' }, value: { en: 'IT, research, procurement, finance, vendor management', zh: 'IT、研究、採購、財務、供應商管理' } }
    ],
    faqs: [
      {
        question: { en: 'Why use a case guide before opening the configurator?', zh: '為什麼開啟配置器前要先看案例指南？' },
        answer: { en: 'A case guide helps non-technical stakeholders choose the right starting path before the detailed hardware options are selected.', zh: '案例指南協助非技術的利害關係人先選對起點，再進入詳細硬體選項。' }
      },
      {
        question: { en: 'How should a team use this case guide?', zh: '團隊應該如何使用這份案例指南？' },
        answer: { en: 'Choose the closest workload and deployment scenario, open the linked configurator, and submit the selected hardware assumptions for technical and quote review.', zh: '選最接近的工作負載與部署情境，開啟連結的配置器。再提交已選硬體假設，供技術與報價審查。' }
      }
    ]
  }
];

export const getConfiguratorSeoPage = (slug?: string) =>
  CONFIGURATOR_SEO_PAGES.find((page) => page.slug === slug);
