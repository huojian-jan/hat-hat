import { CharacterInfo, TypingStats } from './types';

// 维吾尔语示例文本 - 完整的句子
export const SAMPLE_TEXTS = [
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

// 随机获取练习文本
export function getRandomText(): string {
  // 返回随机的维吾尔语练习文本
  return SAMPLE_TEXTS[Math.floor(Math.random() * SAMPLE_TEXTS.length)];
}

// 规范化Unicode文本
export function normalizeText(text: string): string {
  return text.normalize('NFC').trim();
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
      char,
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
