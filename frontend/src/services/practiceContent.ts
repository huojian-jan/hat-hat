// 练习内容数据源（模拟数据，可后续替换为后端 API）
// 提供：单词 / 句子 / 文章（短段落） 三种级别，多语言（维吾尔语 / 英文 / 拼音）

export type PracticeLanguage = 'uyghur' | 'english' | 'pinyin';
export type PracticeCategory = 'word' | 'sentence' | 'article';

interface FetchOptions {
  language: PracticeLanguage;
  category: PracticeCategory;
}

// 维吾尔语
const UY_WORDS = ['مەن', 'بىز', 'ئۇ', 'كىتاب', 'خۇشال', 'ئانا', 'ئۆگىنىش', 'مورا', 'خىزمەت', 'تېخنىكا'];
const UY_SENTENCES = [
  'مەن ئۇيغۇر تىلىنى ياخشى كۆرىمەن',
  'ھەر كۈنى مەشىق قىلىش مۇھىم',
  'تىل ئۆگىنىش صابىر تاۋاۋۇزنى تەلەپ قىلىدۇ',
  'ئۇيغۇرچە يېزىشنى تېخىمۇ ياخشى قىلىمەن'
];
const UY_ARTICLES = [
  `ئۇيغۇر تىلى بىزنىڭ ئانا تىلىمىز بولۇپ، ئۇنىڭ كۈندىلىك قوللىنىلىشى ۋە يېزىق بىيلەن مەدەنىيەتنى ساقلاش بەك مۇھىم. ھەر كۈنى ئاز دەپ قارايدۇغىن نەرسىلەر بار.
مەشىق قىلىش ئارقىلىق تېخىمۇ ياخشى ئۈنۈملەرگە ئېرىشىشكە بولىدۇ.`,
  `تىل ئۆگىنىش پەقەت سۆزلەش بىلەنلا چەكلىنىپ قالماي، ئۇنىڭ تارىخى، مەدەنىيىتى ۋە يېزىق سىستېمىسىنى چۈشىنىدىغان بولۇشىمۇ كېرەك. بۇ جەرياندىكى كىچىك قەدەملەر كېلەر كۈندە چوڭ نەتكە ئېرىشىشكە ياردەم بېرىدۇ.`
];

// 英文
const EN_WORDS = ['code', 'input', 'focus', 'speed', 'logic', 'array', 'model', 'token', 'graph', 'async'];
const EN_SENTENCES = [
  'Keep your fingers relaxed while typing',
  'Practice improves accuracy and speed',
  'Consistency beats intensity over time',
  'Optimize your learning workflow'
];
const EN_ARTICLES = [
  'Typing practice is not only about moving faster. It is about building reliable neural patterns so that your conscious mind can focus on ideas instead of individual letters. A steady rhythm matters more than raw speed at the beginning.',
  'Small daily improvements compound into large gains. Track progress, rest properly, and occasionally push beyond comfort zones. Mastery emerges from sustainable repetition, not sporadic bursts.'
];

// 拼音（不含声调，便于纯键盘练习）
const PINYIN_WORDS = ['xue', 'shi', 'yu', 'zi', 'shuo', 'wen', 'ren', 'xin', 'hao', 'kuai'];
const PINYIN_SENTENCES = [
  'mei tian lian xi jiu hui jin bu',
  'jian chi hen zhong yao',
  'hao de xi guan man man xing cheng',
  'xue xi xu yao fan fu yu shen hua'
];
const PINYIN_ARTICLES = [
  'pinyin lian xi ke yi bang zhu li jie sheng mu yun mu de jie gou cong er cu jin du li du he zheng que shu ru. zai zao qi bu yao tai kua ji xu gen zhong jie zou he zhun que.',
  'jian li yi ge chang qi ke chi de xue xi xi guan bi duan qi ji li geng you xiao mei yi ci jin bu yi dian dian jiu shi qian jin.'
];

function pick<T>(arr: T[]): T { return arr[Math.floor(Math.random() * arr.length)]; }

export async function getRandomPracticeContent({ language, category }: FetchOptions): Promise<string> {
  // 将来这里可替换为：
  // return api.get(`/practice?lang=${language}&cat=${category}`).then(r => r.data.text)
  switch (language) {
    case 'english':
      if (category === 'word') return pick(EN_WORDS);
      if (category === 'sentence') return pick(EN_SENTENCES);
      return pick(EN_ARTICLES);
    case 'pinyin':
      if (category === 'word') return pick(PINYIN_WORDS);
      if (category === 'sentence') return pick(PINYIN_SENTENCES);
      return pick(PINYIN_ARTICLES);
    case 'uyghur':
    default:
      if (category === 'word') return pick(UY_WORDS);
      if (category === 'sentence') return pick(UY_SENTENCES);
      return pick(UY_ARTICLES);
  }
}

// 预加载：可用于后续缓存策略
export function preloadPracticePools() {
  return {
    uyghur: { words: UY_WORDS.length, sentences: UY_SENTENCES.length, articles: UY_ARTICLES.length },
    english: { words: EN_WORDS.length, sentences: EN_SENTENCES.length, articles: EN_ARTICLES.length },
    pinyin: { words: PINYIN_WORDS.length, sentences: PINYIN_SENTENCES.length, articles: PINYIN_ARTICLES.length }
  };
}
