import { CharacterInfo, TypingStats } from './types';

// 内部空格占位符字符（选择一个极少出现的控制符）
export const INTERNAL_SPACE = '\u241F'; // SYMBOL FOR UNIT SEPARATOR (visual debug-friendly)

export function externalToInternalSpaces(text: string): string {
  if (!text) return '';
  return text.replace(/ /g, INTERNAL_SPACE);
}

export function internalToExternalSpaces(text: string): string {
  if (!text) return '';
  return text.replace(new RegExp(INTERNAL_SPACE, 'g'), ' ');
}

// 维吾尔语示例文本 - 完整的句子
export const SAMPLE_TEXTS_UY = [
  'ئۇيغۇر تىلى ئۆگىنىش پروگراممىسى',
  'مەن ئۇيغۇر تىلىدا يېزىشنى ئۆگىنىمەن',
  'بۇ بىر ئاددىي تىل ئۆگىنىش پروگراممىسى',
  'تېز ۋە تەخت يېزىش ئۈچۈن مەشىق قىلىڭ',
  'ھەر كۈنى مەشىق قىلسىڭىز تېزراق ئۆگىنىسىز',
  'مەن سىزنى سۆيىمەن',
  'بۇ ياخشى بىر كۈن',
  'ئۇيغۇرچە ئۆگىنىش قىزىقارلىق',
  'كىتاب ئوقۇش ياخشى',
  'مەكتەپتە ئوقۇيمەن',
  'دوستلار بىلەن ئويناش',
  'ئائىلە بىلەن ۋاقىت ئۆتكۈزۈش',
  'يېمەكلىك تەييارلاش',
  'مۇزىكا ئاڭلاش',
  'كىنو كۆرۈش',
  'سەير قىلىش',
  'ئۇيغۇر تىلى بىزنىڭ ئانا تىلىمىز',
  'ھەر كىشى ئۆز تىلىنى بىلىشى كېرەك',
  'تېخنولوگىيە ۋە تىل ئۆگىنىش',
  'ئىنتېرنېت ئارقىلىق ئۇيغۇرچە ئۆگىنىش',
  'كىتابخانىدا كىتاب ئوقۇش',
  'ئۇيغۇر مەدەنىيىتىنى ئۆگىنىش',
  'ئۇيغۇر ئەدەبىياتىنى ئوقۇش',
  'ئۇيغۇر تارىخىنى بىلىش',
  'ئۇيغۇر خەلقىنىڭ ئەنئەنىۋى ئۇسۇللىرى'
];

// 英文示例（单词 / 句子 / 简短段落混合）
export const SAMPLE_TEXTS_EN = [
  'Typing practice improves speed and accuracy',
  'Learning new layouts can boost efficiency',
  'Consistent practice leads to better results',
  'Focus on rhythm and flow while typing',
  'Small daily improvements compound over time',
  'Clean code is a form of good communication',
  'Never stop learning and exploring ideas',
  'Stay curious and keep building projects'
];

// 中文汉字示例（用于拼音输入法练习）
export const SAMPLE_TEXTS_CHINESE = [
  '中国文化非常有趣',
  '学习汉字可以帮助理解文化',
  '每天都练习就能提高',
  '坚持习惯是很重要的',
  '好的基础能够带来高效',
  '自然语言理解需要时间',
  '编程是一种创造性的工作',
  '技术发展改变了我们的生活',
  '互联网连接了全世界',
  '学习新技能需要耐心和坚持',
  '阅读是获取知识的重要途径',
  '沟通是人际关系的基础',
  '团队合作能够创造更大的价值',
  '创新思维推动社会进步',
  '教育是国家发展的根本',
  '环境保护是我们共同的责任',
  '健康的生活方式很重要',
  '家庭和睦是幸福的源泉',
  '友谊是人生中珍贵的财富',
  '梦想给我们前进的动力'
];

// 随机获取练习文本
export function getRandomText(lang: 'uyghur' | 'english' | 'pinyin' = 'uyghur'): string {
  let pool: string[] = SAMPLE_TEXTS_UY;
  if (lang === 'english') pool = SAMPLE_TEXTS_EN;
  else if (lang === 'pinyin') pool = SAMPLE_TEXTS_CHINESE;
  return pool[Math.floor(Math.random() * pool.length)];
}

// 规范化Unicode文本
export function normalizeText(text: string): string {
  if (!text) return '';
  return text
    .normalize('NFC')
    // 去除零宽字符 (ZWSP,ZWNJ,ZWJ,BOM)
    .replace(/[\u200B\u200C\u200D\uFEFF]/g, '')
    // 各类 unicode 空格统一成普通空格
  .replace(/[\u00A0\u1680\u2000-\u200A\u202F\u205F\u3000]/g, ' ');
}

// 计算字符状态数组
export function calculateCharacterStates(
  targetText: string,
  userInput: string,
  currentIndex: number
): CharacterInfo[] {
  const normalizedTarget = normalizeText(targetText);
  const normalizedInput = normalizeText(userInput);
  
  return normalizedTarget.split('').map((char, index) => {
    let status: CharacterInfo['status'] = 'pending';
    
    if (index < normalizedInput.length) {
      // 已输入的字符
      status = normalizedInput[index] === char ? 'correct' : 'incorrect';
    } else if (index === currentIndex) {
      // 当前需要输入的字符
      status = 'current';
    }
    
    return {
      char: char === INTERNAL_SPACE ? ' ' : char,
      status,
      index
    };
  });
}

// 计算打字统计信息
export function calculateStats(
  targetText: string,
  userInput: string,
  startTime: Date | null,
  endTime: Date | null
): TypingStats {
  const normalizedTarget = normalizeText(targetText);
  const normalizedInput = normalizeText(userInput);
  
  const totalCharacters = normalizedTarget.length;
  let correctCharacters = 0;
  
  // 计算正确字符数
  for (let i = 0; i < Math.min(normalizedTarget.length, normalizedInput.length); i++) {
    if (normalizedTarget[i] === normalizedInput[i]) {
      correctCharacters++;
    }
  }
  
  const incorrectCharacters = normalizedInput.length - correctCharacters;
  const accuracy = totalCharacters > 0 ? (correctCharacters / totalCharacters) * 100 : 0;
  
  // 计算WPM (假设平均每个词5个字符)
  let wpm = 0;
  if (startTime && endTime) {
    const timeInMinutes = (endTime.getTime() - startTime.getTime()) / (1000 * 60);
    if (timeInMinutes > 0) {
      const wordsTyped = correctCharacters / 5; // 平均每个词5个字符
      wpm = Math.round(wordsTyped / timeInMinutes);
    }
  }
  
  return {
    totalCharacters,
    correctCharacters,
    incorrectCharacters,
    accuracy: Math.round(accuracy * 100) / 100,
    wpm,
    startTime,
    endTime
  };
}

// 检查是否完成输入
export function isInputComplete(targetText: string, userInput: string): boolean {
  const normalizedTarget = normalizeText(targetText);
  const normalizedInput = normalizeText(userInput);
  return normalizedInput.length >= normalizedTarget.length;
}
