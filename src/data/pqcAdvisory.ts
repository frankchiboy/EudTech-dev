export type PqcText = readonly [string, string];

export const pqcExperts = [
  {
    id: 'frank-hsu', name: 'Chung-hao (Frank) Hsu', image: '/vendor/pqc/home-chung-hao-frank-hsu.webp',
    focus: ['PQC 專案與工程研究', 'PQC projects & engineering research'],
    degree: ['EudTech 專案負責人／技術窗口', 'EudTech project lead / technical contact'],
    expertise: ['FPGA · 密碼導入規劃 · 音訊隱寫研究', 'FPGA · Cryptographic migration planning · Audio steganography research'],
    detail: ['研究關注延伸至形式邏輯與溯因推理（IBE），從假設、推理到可驗證的技術判斷。', 'Research interests also include formal logic and abductive reasoning (IBE), connecting assumptions and inference to testable technical judgments.'],
    href: 'https://eudtech.ai/#team', source: ['EudTech 團隊資料', 'EudTech team profile']
  },
  {
    id: 'hung-jr-shiu', name: 'Hung-Jr Shiu', image: '/vendor/pqc/home-hung-jr-shiu.webp',
    focus: ['密碼學與演算法研究', 'Cryptography & algorithms'],
    degree: ['國立臺灣大學電機工程博士', 'Ph.D. in Electrical Engineering, National Taiwan University'],
    expertise: ['國立臺北大學資訊工程學系助理教授', 'Assistant Professor, Computer Science and Information Engineering, National Taipei University'],
    detail: ['研究領域涵蓋密碼學、演算法、隱寫術與多媒體安全，並主持 ML-DSA 後量子數位簽章實作研究。', 'Research covers cryptography, algorithms, steganography, and multimedia security, including a principal-investigator role in ML-DSA implementation research.'],
    href: 'https://scholar.ntpu.edu.tw/en/persons/hung-jr-shiu/', source: ['大學官方學術資料', 'University research profile']
  }
] as const;

export const pqcPhases = [
  { id: 'readiness', label: ['準備度評估', 'Readiness assessment'], title: ['把未知範圍，變成可以決策的清單。', 'Turn an unknown scope into a decision-ready inventory.'], description: ['從一個業務服務或約定的資產範圍著手，辨識密碼使用位置、資料保密需求與供應商依賴。', 'Start with one business service or agreed asset scope. Identify cryptographic use, confidentiality needs, and vendor dependencies.'], items: [['威脅模型與密碼資產清冊', 'Threat model and cryptographic inventory'], ['資料生命週期與優先順序', 'Data lifetime and priorities'], ['供應商支援與缺口清單', 'Vendor support and gap assessment'], ['分階段遷移路線圖', 'Phased migration roadmap']], acceptance: ['每筆資產可追溯來源、擁有者與狀態，並明列未覆蓋範圍。', 'Each asset has a traceable source, owner, and status. Uncovered areas remain explicit.'] },
  { id: 'pilot', label: ['架構與試點', 'Architecture & pilot'], title: ['先在可控環境，驗證一條完整路徑。', 'Validate a complete path in a controlled environment.'], description: ['比較連線或簽章場景的架構選項，設計測試並確認產品支援、通過條件與回復路徑。', 'Compare architecture options for a connection or signing use case. Define product support, tests, acceptance criteria, and rollback.'], items: [['架構選項、取捨與測試矩陣', 'Architecture options, trade-offs, and test matrix'], ['相容性及效能比較報告', 'Compatibility and performance comparison'], ['協商或簽驗章的測試證據', 'Negotiation or signature test evidence'], ['故障、降級與回復演練紀錄', 'Failure, fallback, and recovery exercises']], acceptance: ['依事前約定的效能及相容性條件驗收，成功與失敗情境均可重複測試。', 'Use agreed performance and compatibility criteria, with repeatable success and failure tests.'] },
  { id: 'migration', label: ['遷移治理', 'Migration governance'], title: ['讓每一批變更，都有可審查的依據。', 'Give every migration batch a reviewable basis.'], description: ['依試點結果提供批次路線、設計與變更審查，持續管理資產、供應商依賴與例外。', 'Use pilot evidence to plan migration batches and review changes, while maintaining assets, dependencies, and exceptions.'], items: [['批次路線與責任矩陣', 'Rollout plan and responsibility matrix'], ['變更審查與驗證準則', 'Change review and validation criteria'], ['採購要求與例外清冊', 'Procurement requirements and exceptions'], ['供應商更新與定期回顧', 'Vendor updates and periodic review']], acceptance: ['建議可追溯證據；正式核准與切換由客戶負責，未完成範圍及責任人清楚可見。', 'Recommendations trace back to evidence. The customer owns approval and cutover, with open items and owners recorded.'] }
] as const;

export const pqcScenarios = [
  { id: 'tls', label: ['網站與 API 連線', 'Websites & APIs'], title: ['驗證一條完整的連線路徑。', 'Validate the complete connection path.'], description: ['確認用戶端、代理與伺服器的版本支援，評估適用的 PQC 或混合金鑰建立方式。', 'Check client, proxy, and server versions before evaluating suitable PQC or hybrid key establishment.'], check: ['協商結果、握手延遲、連線成功率與回復行為。', 'Negotiation, handshake latency, connection success, and fallback behavior.'], limit: ['金鑰建立與憑證簽章分開驗證；邊緣支援不等於全路徑保護。', 'Verify key establishment and certificate signatures separately. Edge support does not establish end-to-end protection.'] },
  { id: 'signing', label: ['軟體與文件簽章', 'Software & document signing'], title: ['確認每一端都能正確簽驗章。', 'Check signing and verification at every endpoint.'], description: ['釐清簽署端、驗證端與更新機制的相依性，確認具體產品對 ML-DSA 或 SLH-DSA 的支援。', 'Map signing, verification, and update dependencies, and confirm ML-DSA or SLH-DSA support in specific products.'], check: ['簽章與金鑰大小、驗證效能、信任鏈及舊版相容性。', 'Signature and key size, verification performance, trust chains, and legacy compatibility.'], limit: ['長期保存還涉及憑證、時間戳記與證據保全，不能只更換演算法。', 'Long-term validation also depends on certificates, timestamps, and preserved evidence.'] },
  { id: 'vendor', label: ['設備與供應商依賴', 'Devices & vendor dependencies'], title: ['讓供應商路線配合你的計畫。', 'Align vendor roadmaps with your plan.'], description: ['整理設備、PKI、HSM 與套件的版本及生命週期，逐項確認實作範圍與升級路徑。', 'Inventory device, PKI, HSM, and library versions and lifecycles. Confirm implementation scope and upgrade paths.'], check: ['可用版本、協定支援、驗證範圍、授權成本與維護週期。', 'Available versions, protocols, validation scope, licensing, and maintenance cycles.'], limit: ['宣布支援 PQC 不等於你使用的型號、版本與組態已符合需求。', 'A PQC announcement does not confirm support for your model, version, and configuration.'] }
] as const;

export const pqcFaqs = [
  [['現在就需要把所有系統換掉嗎？', 'Do we need to replace every system now?'], ['先做資產盤點、需求排序與供應商確認，再分階段測試與替換。每次變更都需要相容性、效能與回復驗證。', 'Begin with inventory, prioritization, and vendor checks. Stage replacements with compatibility, performance, and rollback validation.']],
  [['網站啟用 PQC，就代表全公司完成了嗎？', 'Does enabling PQC on a website complete the migration?'], ['還要逐段檢查邊緣到來源站、內部服務、金鑰管理及簽章流程。TLS 金鑰建立支援 PQC，不表示憑證簽章也已遷移。', 'Check edge-to-origin traffic, internal services, key management, and signing separately. PQC key establishment does not imply migrated certificate signatures.']],
  [['採用 NIST 演算法，就等於通過認證嗎？', 'Does using a NIST algorithm mean certification?'], ['演算法標準、實作正確性與密碼模組驗證是不同層次，需核對產品、版本及驗證範圍。', 'Algorithm standards, implementation correctness, and cryptographic module validation are separate. Check the product, version, and validation scope.']],
  [['PQC 與隱寫術、QKD 有什麼差別？', 'How does PQC differ from steganography and QKD?'], ['PQC 使用傳統電腦可執行的密碼演算法抵抗已知量子攻擊；隱寫術關注資訊存在的隱藏；QKD 需要量子通道及設備。本服務聚焦 PQC 遷移。', 'PQC uses algorithms on conventional computers to resist known quantum attacks. Steganography hides the presence of information; QKD requires quantum channels and equipment. This service focuses on PQC migration.']],
  [['如何確認費用與時程？', 'How are costs and timelines confirmed?'], ['先確認資產數量、應用範圍、測試環境與供應商支援，再分別約定評估、試點、遷移與維運範圍。', 'Confirm assets, applications, test environments, and vendor support, then agree the assessment, pilot, migration, and support scope.']]
] as const;
