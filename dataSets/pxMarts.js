// 區域分組店家
const targetAreaPxMarts = {
  大甲區: [
    "豐原成功",
    "豐原大豐",
    "神岡五權",
    "台中豐后",
    "后里",
    "后里文明",
    "大甲復興",
    "大甲經國",
    "大甲民生",
    "大甲光明",
    "大甲甲后",
    "外埔六分",
  ],
  北中區: [
    "台中博館",
    "台中東光",
    "台中新民",
    "台中崇德",
    "台中進化",
    "台中民權",
    "台中永興",
    "台中二中",
    "台中學士",
    "台中博二",
    "台中健行",
    "台中明新",
  ],
  北屯區: [
    "台中松竹",
    "台中軍太",
    "北屯",
    "台中大坑",
    "軍功",
    "台中太原",
    "台中松五",
    "台中南興",
    "台中北屯二",
    "台中東山",
    "台中敦富",
  ],
  北西區: [
    "台中梅川東",
    "旅順",
    "台中陜西",
    "台中四平",
    "台中大鵬",
    "台中水湳",
    "天津",
    "大連",
    "台中崇德八",
    "台中山西",
    "台中河北東",
    "台中敦化",
    "台中后庄",
  ],
  西屯區: ["逢甲", "台中西屯", "中工", "台中寶慶", "台中福科", "台中青海"],
  沙鹿區: [
    "沙鹿",
    "沙鹿北勢東",
    "沙鹿屏西",
    "沙鹿中山",
    "清水新興",
    "清水中興",
    "清水五權",
    "清水中山",
    "清水鰲峰",
  ],
  南中區: [
    "台中林森",
    "台中忠孝",
    "台中南門",
    "台中復興",
    "台中忠明南",
    "台中工學",
    "台中建國南",
    "台中樂群",
    "台中學府",
    "大智",
    "台中三民",
    "台中仁和",
  ],
  南西區: [
    "台中大昌",
    "台中忠義",
    "台中市政",
    "精誠",
    "文心",
    "台中向上",
    "忠明",
    "台中文華",
    "台中大進",
    "台中永春東",
    "台中美村",
    "台中大忠",
  ],
  雅潭區: [
    "大雅雅環",
    "大雅學府",
    "大雅民生",
    "神岡中正",
    "神岡中山",
    "神岡昌平",
    "潭子得天",
    "潭子潭陽",
    "潭子中山",
    "潭子福潭",
    "潭子",
    "潭子潭豐",
    "潭子豐興",
  ],
  豐原區: [
    "東勢豐勢",
    "東勢東蘭",
    "新社中和",
    "豐原田心",
    "豐原向陽",
    "豐原豐東",
    "豐原北陽",
    "豐原大順",
    "豐原忠孝",
  ],
  大里區: ["大里爽文", "大里", "大里新興", "塗城金德", "大里新芳", "霧峰民生"],
  太平區: ["太平樹德", "太平宜昌", "太平樹孝", "十甲"],
  龍井區: ["大肚榮華", "龍井沙田", "梧棲文昌", "梧棲文化"],
  南屯區: [
    "烏日長春",
    "烏日中山",
    "烏日環河",
    "台中豐樂",
    "台中三厝",
    "台中黎明",
    "台中三和",
    "台中楓樹",
    "台中嶺東",
    "台中惠文",
    "台中萬和",
  ],
  彰化區: [
    "彰安",
    "三民",
    "長興",
    "彰化自強南",
    "彰化進德",
    "彰化彰鹿",
    "彰化延平",
    "彰化中興",
    "彰化彰南",
    "彰化金馬",
    "彰化中正",
  ],
};

// 店家
const targetPxMarts = [
  "豐原成功",
  "豐原大豐",
  "神岡五權",
  "台中豐后",
  "后里",
  "后里文明",
  "大甲復興",
  "大甲經國",
  "大甲民生",
  "大甲光明",
  "大甲甲后",
  "外埔六分",
  "台中博館",
  "台中東光",
  "台中新民",
  "台中崇德",
  "台中進化",
  "台中民權",
  "台中永興",
  "台中二中",
  "台中學士",
  "台中博二",
  "台中健行",
  "台中明新",
  "台中松竹",
  "台中軍太",
  "北屯",
  "台中大坑",
  "軍功",
  "台中太原",
  "台中松五",
  "台中南興",
  "台中北屯二",
  "台中東山",
  "台中敦富",
  "台中梅川東",
  "旅順",
  "台中陜西",
  "台中四平",
  "台中大鵬",
  "台中水湳",
  "天津",
  "大連",
  "台中崇德八",
  "台中山西",
  "台中河北東",
  "台中敦化",
  "台中后庄",
  "逢甲",
  "台中西屯",
  "中工",
  "台中寶慶",
  "台中福科",
  "台中青海",
  "沙鹿",
  "沙鹿北勢東",
  "沙鹿屏西",
  "沙鹿中山",
  "清水新興",
  "清水中興",
  "清水五權",
  "清水中山",
  "清水鰲峰",
  "台中林森",
  "台中忠孝",
  "台中南門",
  "台中復興",
  "台中忠明南",
  "台中工學",
  "台中建國南",
  "台中樂群",
  "台中學府",
  "大智",
  "台中三民",
  "台中仁和",
  "台中大昌",
  "台中忠義",
  "台中市政",
  "精誠",
  "文心",
  "台中向上",
  "忠明",
  "台中文華",
  "台中大進",
  "台中永春東",
  "台中美村",
  "台中大忠",
  "大雅雅環",
  "大雅學府",
  "大雅民生",
  "神岡中正",
  "神岡中山",
  "神岡昌平",
  "潭子得天",
  "潭子潭陽",
  "潭子中山",
  "潭子福潭",
  "潭子",
  "潭子潭豐",
  "潭子豐興",
  "東勢豐勢",
  "東勢東蘭",
  "新社中和",
  "豐原田心",
  "豐原向陽",
  "豐原豐東",
  "豐原北陽",
  "豐原大順",
  "豐原忠孝",
  "大里爽文",
  "大里",
  "大里新興",
  "塗城金德",
  "大里新芳",
  "霧峰民生",
  "太平樹德",
  "太平宜昌",
  "太平樹孝",
  "十甲",
  "大肚榮華",
  "龍井沙田",
  "梧棲文昌",
  "梧棲文化",
  "烏日長春",
  "烏日中山",
  "烏日環河",
  "台中豐樂",
  "台中三厝",
  "台中黎明",
  "台中三和",
  "台中楓樹",
  "台中嶺東",
  "台中惠文",
  "台中萬和",
  "彰安",
  "三民",
  "長興",
  "彰化自強南",
  "彰化進德",
  "彰化彰鹿",
  "彰化延平",
  "彰化中興",
  "彰化彰南",
  "彰化金馬",
  "彰化中正",
];

// 區域分組(店號:店名)
const groupedStores = {
  大甲區: {
    83800: "豐原成功",
    89000: "豐原大豐",
    90800: "神岡五權",
    754900: "台中豐后",
    91400: "后里",
    87100: "后里文明",
    93400: "大甲復興",
    99700: "大甲經國",
    750500: "大甲民生",
    94900: "大甲光明",
    98000: "大甲甲后",
    90000: "外埔六分",
  },
  北中區: {
    84700: "台中博館",
    88000: "台中東光",
    87300: "台中新民",
    80300: "台中崇德",
    97800: "台中進化",
    83500: "台中民權",
    83300: "台中永興",
    81800: "台中二中",
    84300: "台中學士",
    88600: "台中博二",
    754600: "台中健行",
    96000: "台中明新",
  },
  北屯區: {
    97600: "台中松竹",
    88300: "台中軍太",
    82200: "北屯",
    89200: "台中大坑",
    81200: "軍功",
    752600: "台中太原",
    88200: "台中松五",
    97900: "台中南興",
    85200: "台中北屯二",
    80700: "台中東山",
    99100: "台中敦富",
  },
  北西區: {
    340000: "台中梅川東",
    85000: "旅順",
    80800: "台中陜西",
    88900: "台中四平",
    95200: "台中大鵬",
    754800: "台中水湳",
    81500: "天津",
    82000: "大連",
    99000: "台中崇德八",
    98700: "台中山西",
    98600: "台中敦化",
    98200: "台中河北東",
    86100: "台中后庄",
  },
  西屯區: {
    86200: "逢甲",
    752700: "台中西屯",
    81700: "中工",
    99200: "台中寶慶",
    96400: "台中福科",
    87900: "台中青海",
  },
  沙鹿區: {
    91800: "沙鹿",
    97300: "沙鹿北勢東",
    87000: "沙鹿屏西",
    95000: "沙鹿中山",
    99400: "清水新興",
    93300: "清水中興",
    88500: "清水五權",
    96700: "清水中山",
    85400: "清水鰲峰",
  },
  南中區: {
    86500: "台中林森",
    97100: "台中忠孝",
    83700: "台中南門",
    80400: "台中復興",
    96900: "台中忠明南",
    89700: "台中工學",
    89800: "台中建國南",
    83400: "台中樂群",
    83200: "台中學府",
    82400: "大智",
    755000: "台中三民",
    754500: "台中仁和",
  },
  南西區: {
    89900: "台中大昌",
    95800: "台中忠義",
    95700: "台中市政",
    81600: "精誠",
    82500: "文心",
    83600: "台中向上",
    82100: "忠明",
    82700: "台中文華",
    84400: "台中大進",
    95500: "台中永春東",
    755200: "美村綠",
    85600: "台中大忠",
  },
  雅潭區: {
    93900: "大雅雅環",
    92900: "大雅學府",
    94600: "大雅民生",
    88100: "神岡中正",
    92700: "神岡中山",
    90200: "神岡昌平",
    96300: "潭子得天",
    93800: "潭子潭陽",
    97400: "潭子中山",
    98500: "潭子福潭",
    92800: "潭子",
    96600: "潭子潭豐",
    85500: "潭子豐興",
  },
  豐原區: {
    94800: "東勢豐勢",
    91200: "東勢東蘭",
    84100: "新社中和",
    93100: "豐原田心",
    89400: "豐原向陽",
    84500: "豐原豐東",
    96500: "豐原北陽",
    89300: "豐原大順",
    86300: "豐原忠孝",
    87600: "台中石岡",
  },
  大里區: {
    95600: "大里爽文",
    91700: "大里",
    99600: "大里新興",
    94300: "塗城金德",
    87500: "大里新芳",
    92400: "霧峰民生",
  },
  太平區: {
    91100: "太平樹德",
    90300: "太平宜昌",
    86900: "太平樹孝",
    82600: "十甲",
  },
  龍井區: {
    86600: "大肚榮華",
    86800: "龍井沙田",
    88800: "梧棲文昌",
    85900: "梧棲文化",
  },
  南屯區: {
    94200: "烏日長春",
    93700: "烏日中山",
    340100: "烏日環河",
    89600: "台中豐樂",
    86700: "台中向上三厝",
    80500: "台中黎明",
    753000: "台中三和",
    96200: "台中楓樹",
    84800: "台中嶺東",
    97000: "台中惠文",
    82300: "台中萬和",
  },
  彰化區: {
    111100: "彰安",
    111200: "三民",
    111300: "長興",
    111400: "彰化自強南",
    115900: "彰化進德",
    116300: "彰化彰鹿",
    118700: "彰化延平",
    118800: "彰化中興",
    119100: "彰化彰南",
    119200: "彰化金馬",
    119400: "彰化中正",
  },
};

// 店號
const storeCodes = [
  83800, 89000, 90800, 754900, 91400, 87100, 93400, 99700, 750500, 94900, 98000,
  90000, 84700, 88000, 87300, 80300, 97800, 83500, 83300, 81800, 84300, 88600,
  754600, 96000, 97600, 88300, 82200, 89200, 81200, 752600, 88200, 97900, 85200,
  80700, 99100, 340000, 85000, 80800, 88900, 95200, 754800, 81500, 82000, 99000,
  98700, 98600, 98200, 86100, 86200, 752700, 81700, 99200, 96400, 87900, 91800,
  97300, 87000, 95000, 99400, 93300, 88500, 96700, 85400, 86500, 97100, 83700,
  80400, 96900, 89700, 89800, 83400, 83200, 82400, 755000, 754500, 89900, 95800,
  95700, 81600, 82500, 83600, 82100, 82700, 84400, 95500, 755200, 85600, 93900,
  92900, 94600, 88100, 92700, 90200, 96300, 93800, 97400, 98500, 92800, 96600,
  85500, 94800, 91200, 84100, 93100, 89400, 84500, 96500, 89300, 86300, 87600,
  95600, 91700, 99600, 94300, 87500, 92400, 91100, 90300, 86900, 82600, 86600,
  86800, 88800, 85900, 94200, 93700, 340100, 89600, 86700, 80500, 753000, 96200,
  84800, 97000, 82300, 111100, 111200, 111300, 111400, 115900, 116300, 118700,
  118800, 119100, 119200, 119400,
];

// 19 品項碼
const targetPrdtCodes = [
  "61010960",
  // 華強　南僑水晶肥皂 / ２００ｇ＊３塊
  "61010830",
  // 華強　南僑水晶肥皂－檸檬清香 / １５０ｇ＊３入
  "61011024",
  // 華強　南僑水晶肥皂－檸檬１５０ / ｇ＊６贈食器洗滌液體２５０ｍｌ
  "61010953",
  // 華強　水晶肥皂液體補充包－輕柔型 / １６００ｇ
  "71210073",
  // 華強　水晶肥皂食器洗滌液體 / １０００ｍｌ
  "61050066",
  // 華強　水晶肥皂食器洗滌液体 / －速淨＆清新８００ｍｌ
  "61010929",
  // 華強　南僑水晶皂力淨洗衣液體皂 / １６００ｇ
  "61010942",
  // 華強　南僑葡萄柚籽抗菌洗衣液體 / 皂－維他命Ｅ護纖配方１４００ｇ
  "61010950",
  // 華強　水晶肥皂洗衣用液體輕柔系 / 列補充包－優雅花香１６００ｇ
  "61010951",
  // 華強　水晶肥皂洗衣用液體補充包－ / 輕柔系列舒緩草香１６００ｇ
  "61010952",
  // 華強　南僑水晶肥皂液体補充包－ / 抗菌輕柔型１５００ｇ
  "61010992",
  // 華強　南僑水晶Ｓｐｏｒｔｓ抗菌 / 除臭洗衣液體皂補充包８００ｇ
  "61010995",
  // 華強　南僑水晶葡萄柚籽防霉洗衣 / 液體皂補充包－室內晾１２００ｇ
  "61010991",
  // 華強　南僑水晶Ｓｐｏｒｔｓ抗菌 / 除臭洗衣液體皂瓶裝１０００ｇ
  "61010994",
  // 華強　南僑水晶葡萄柚籽抗菌防霉 / 洗衣液體皂－室內晾２ｋｇ
  "71140132",
  // 華強　水晶肥皂液體－輕柔型 / ２﹒４ｋｇ
  "71018500",
  // 華強　南僑水晶肥皂液体－抗菌輕 / 柔型２．２ｋｇ
  "71018608",
  // 華強　水晶肥皂洗衣用液體輕柔系 / 列－優雅花香２．４ｋｇ
  "71110016",
  // 華強　水晶肥皂洗衣用粉体 / １．７９ｋｇ
];

// 19 品項名
const targetProductName = [
  "華強　南僑水晶肥皂 / ２００ｇ＊３塊",
  "華強　南僑水晶肥皂－檸檬清香 / １５０ｇ＊３入",
  "華強　南僑水晶肥皂－檸檬１５０ / ｇ＊６贈食器洗滌液體２５０ｍｌ",
  "華強　水晶肥皂液體補充包－輕柔型 / １６００ｇ",
  "華強　水晶肥皂食器洗滌液體 / １０００ｍｌ",
  "華強　水晶肥皂食器洗滌液体 / －速淨＆清新８００ｍｌ",
  "華強　南僑水晶皂力淨洗衣液體皂 / １６００ｇ",
  "華強　南僑葡萄柚籽抗菌洗衣液體 / 皂－維他命Ｅ護纖配方１４００ｇ",
  "華強　水晶肥皂洗衣用液體輕柔系 / 列補充包－優雅花香１６００ｇ",
  "華強　水晶肥皂洗衣用液體補充包－ / 輕柔系列舒緩草香１６００ｇ",
  "華強　南僑水晶肥皂液体補充包－ / 抗菌輕柔型１５００ｇ",
  "華強　南僑水晶Ｓｐｏｒｔｓ抗菌 / 除臭洗衣液體皂補充包８００ｇ",
  "華強　南僑水晶葡萄柚籽防霉洗衣 / 液體皂補充包－室內晾１２００ｇ",
  "華強　南僑水晶Ｓｐｏｒｔｓ抗菌 / 除臭洗衣液體皂瓶裝１０００ｇ",
  "華強　南僑水晶葡萄柚籽抗菌防霉 / 洗衣液體皂－室內晾２ｋｇ",
  "華強　水晶肥皂液體－輕柔型 / ２﹒４ｋｇ",
  "華強　南僑水晶肥皂液体－抗菌輕 / 柔型２．２ｋｇ",
  "華強　水晶肥皂洗衣用液體輕柔系 / 列－優雅花香２．４ｋｇ",
  "華強　水晶肥皂洗衣用粉体 / １．７９ｋｇ",
];

export {
  targetAreaPxMarts,
  targetPxMarts,
  groupedStores,
  storeCodes,
  targetPrdtCodes,
  targetProductName,
};
