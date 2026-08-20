/* 台灣高中物理 108 課綱結構 — 儀表板與上傳頁共用
   若課綱調整，只需修改這一個檔案。 */

const CURRICULUM = [
  {
    course: "高一物理（必修·學測）",
    short: "必修",
    exam: "學測",
    chapters: [
      "第1章 科學的態度與方法",
      "第2章 物質的組成與交互作用",
      "第3章 物體的運動",
      "第4章 電與磁的統一",
      "第5章 量子現象",
      "第6章 能量"
    ]
  },
  {
    course: "選修物理Ⅰ（力學1）",
    short: "選修Ⅰ",
    exam: "分科",
    chapters: [
      "第1章 測量與不確定度",
      "第2章 運動學——直線運動",
      "第3章 運動學——平面運動",
      "第4章 牛頓運動定律",
      "第5章 萬有引力定律"
    ]
  },
  {
    course: "選修物理Ⅱ（力學2與熱學）",
    short: "選修Ⅱ",
    exam: "分科",
    chapters: [
      "第1章 動量與角動量",
      "第2章 牛頓運動定律的應用",
      "第3章 功與動能",
      "第4章 位能與力學能守恆",
      "第5章 熱學"
    ]
  },
  {
    course: "選修物理Ⅲ（波動、光及聲音）",
    short: "選修Ⅲ",
    exam: "分科",
    chapters: [
      "第1章 波動",
      "第2章 聲波",
      "第3章 光的折射及其應用",
      "第4章 光的干涉與繞射"
    ]
  },
  {
    course: "選修物理Ⅳ（電磁現象1）",
    short: "選修Ⅳ",
    exam: "分科",
    chapters: [
      "第1章 靜電學",
      "第2章 電流的磁效應",
      "第3章 電磁感應"
    ]
  },
  {
    course: "選修物理Ⅴ（電磁現象2與量子現象）",
    short: "選修Ⅴ",
    exam: "分科",
    chapters: [
      "第1章 電流與電路",
      "第2章 近代物理的重大發現",
      "第3章 原子結構與原子核"
    ]
  },
  {
    course: "探究與實作（學測範圍）",
    short: "探究實作",
    exam: "學測",
    chapters: [
      "科學探究方法",
      "實驗設計原則",
      "誤差分析",
      "資料詮釋",
      "科學報告撰寫"
    ]
  }
];

/* 108課綱 19 項議題 */
const ISSUES = [
  "環境教育","能源教育","科技教育","資訊教育","防災教育","安全教育",
  "性平教育","人權教育","品德教育","生命教育","法治教育","家庭教育",
  "生涯規劃","多元文化","閱讀素養","戶外教育","國際教育","海洋教育","原住民族教育"
];

/* 資源類型：儀表板產出對應 */
const ASSET_TYPES = [
  { key:"dashboard", label:"互動儀表板", icon:"◧", color:"#4f46e5",
    match:[/儀表板/,/dashboard/i], exts:["html","htm"] },
  { key:"lesson",    label:"正式教案",   icon:"▤", color:"#2563eb",
    match:[/教案/,/lesson/i,/企劃/],  exts:["docx","doc","pdf"] },
  { key:"worksheet", label:"學習單",     icon:"✎", color:"#0d9488",
    match:[/學習單/,/worksheet/i],    exts:[] },
  { key:"reading",   label:"閱讀題組",   icon:"❑", color:"#d97706",
    match:[/閱讀題組/,/閱讀/],         exts:[] },
  { key:"cross",     label:"跨科題組",   icon:"⬡", color:"#c2410c",
    match:[/跨科/],                    exts:[] },
  { key:"inquiry",   label:"探究實作題組", icon:"⚗", color:"#7c3aed",
    match:[/探究實作題組/,/探究實作/,/探究/], exts:[] },
  { key:"other",     label:"其他資源",   icon:"▪", color:"#64748b",
    match:[],                          exts:[] }
];

/* 依檔名猜測資源類型 */
function guessAssetType(filename){
  const name = filename;
  const ext  = (name.split(".").pop() || "").toLowerCase();
  for(const t of ASSET_TYPES){
    if(t.key === "other") continue;
    if(t.match.some(re => re.test(name))) {
      if(t.key === "dashboard" && !["html","htm"].includes(ext)) continue;
      return t.key;
    }
  }
  if(["html","htm"].includes(ext)) return "dashboard";
  if(["docx","doc"].includes(ext)) return "lesson";
  return "other";
}

const ASSET_MAP = Object.fromEntries(ASSET_TYPES.map(t => [t.key, t]));
const ALL_CHAPTERS = CURRICULUM.flatMap(c => c.chapters.map(ch => c.short + "｜" + ch));
