/**
 * 键盘提示算法服务
 * 为不同输入法提供当前字符的键盘高亮提示
 */

export type InputMethodType = 'uyghur' | 'pinyin' | 'english';

/**
 * 键盘提示算法接口
 */
export interface KeyboardHintAlgorithm {
  /**
   * 获取当前字符应该高亮的键位
   * @param currentChar 当前需要输入的字符
   * @returns 应该高亮的键位数组
   */
  getHighlightedKeys(currentChar: string): string[];
  
  /**
   * 检查键位是否应该高亮
   * @param keyValue 键位值
   * @param currentChar 当前字符
   * @returns 是否应该高亮
   */
  isKeyActive(keyValue: string, currentChar: string): boolean;
}

/**
 * 维吾尔语键盘提示算法
 */
class UyghurKeyboardHint implements KeyboardHintAlgorithm {
  private readonly map: Record<string, string> = {
    'چ': 'q', 'ۋ': 'w', 'ې': 'e', 'ر': 'r', 'ت': 't', 'ي': 'y', 'ۇ': 'u', 'ڭ': 'i', 'و': 'o', 'پ': 'p',
    'ھ': 'a', 'س': 's', 'د': 'd', 'ژ': 'd', 'ا': 'f', 'ف': 'f', 'ە': 'g', 'گ': 'g', 'ى': 'h', 'خ': 'h',
    'ق': 'j', 'ج': 'j', 'ك': 'k', 'ۆ': 'k', 'ل': 'l', 'ز': 'z', 'ش': 'x', 'غ': 'c', 'ۈ': 'v', 'ب': 'b',
    'ن': 'n', 'م': 'm', 'ئ': '/', 'ئ‍': '/'
  };
  // 需要 Shift 的变体字符
  private readonly shiftVariants: Record<string, string> = {
    'ژ': 'd', 'ف': 'f', 'گ': 'g', 'خ': 'h', 'ج': 'j', 'ۆ': 'k'
    // 'لا': 'l' // 若后续 activeChar 支持组合可在此开启
  };
  getHighlightedKeys(currentChar: string): string[] {
    if (currentChar === ' ') return ['Space'];
    const base = this.map[currentChar];
    if (base) {
      if (this.shiftVariants[currentChar]) {
        return [base, 'ShiftLeft', 'ShiftRight'];
      }
      return [base];
    }
    return [currentChar.toLowerCase()];
  }

  isKeyActive(keyValue: string, currentChar: string): boolean {
    if (keyValue === 'Space') return currentChar === ' ';
    const base = this.map[currentChar];
    if (base) {
      if (keyValue === 'ShiftLeft' || keyValue === 'ShiftRight') {
        return !!this.shiftVariants[currentChar];
      }
      return keyValue.toLowerCase() === base.toLowerCase();
    }
    if (keyValue === 'ShiftLeft' || keyValue === 'ShiftRight') return false;
    return currentChar.toLowerCase() === keyValue.toLowerCase();
  }
}

/**
 * 英文键盘提示算法
 */
class EnglishKeyboardHint implements KeyboardHintAlgorithm {
  getHighlightedKeys(currentChar: string): string[] {
    if (currentChar === ' ') return ['Space'];
    const lowerChar = currentChar.toLowerCase();
    return [lowerChar];
  }

  isKeyActive(keyValue: string, currentChar: string): boolean {
    if (keyValue === 'Space') return currentChar === ' ';
    return currentChar.toLowerCase() === keyValue.toLowerCase();
  }
}

/**
 * 中文拼音键盘提示算法
 * 需要根据汉字推断可能的拼音输入
 */
class ChinesePinyinKeyboardHint implements KeyboardHintAlgorithm {
  // 简单的汉字到拼音映射（实际应用中可以使用更完整的拼音库）
  private readonly pinyinMap: { [key: string]: string[] } = {
    '中': ['z', 'h', 'o', 'n', 'g'],
    '国': ['g', 'u', 'o'],
    '文': ['w', 'e', 'n'],
    '化': ['h', 'u', 'a'],
    '非': ['f', 'e', 'i'],
    '常': ['c', 'h', 'a', 'n', 'g'],
    '有': ['y', 'o', 'u'],
    '趣': ['q', 'u'],
    '学': ['x', 'u', 'e'],
    '习': ['x', 'i'],
    '汉': ['h', 'a', 'n'],
    '字': ['z', 'i'],
    '可': ['k', 'e'],
    '以': ['y', 'i'],
    '帮': ['b', 'a', 'n', 'g'],
    '助': ['z', 'h', 'u'],
    '理': ['l', 'i'],
    '解': ['j', 'i', 'e'],
    '每': ['m', 'e', 'i'],
    '天': ['t', 'i', 'a', 'n'],
    '都': ['d', 'o', 'u'],
    '练': ['l', 'i', 'a', 'n'],
    '就': ['j', 'i', 'u'],
    '能': ['n', 'e', 'n', 'g'],
    '提': ['t', 'i'],
    '高': ['g', 'a', 'o'],
    '坚': ['j', 'i', 'a', 'n'],
    '持': ['c', 'h', 'i'],
    '惯': ['g', 'u', 'a', 'n'],
    '是': ['s', 'h', 'i'],
    '很': ['h', 'e', 'n'],
    '重': ['z', 'h', 'o', 'n', 'g'],
    '要': ['y', 'a', 'o'],
    '好': ['h', 'a', 'o'],
    '的': ['d', 'e'],
    '基': ['j', 'i'],
    '础': ['c', 'h', 'u'],
    '够': ['g', 'o', 'u'],
    '带': ['d', 'a', 'i'],
    '来': ['l', 'a', 'i'],
    '效': ['x', 'i', 'a', 'o'],
    '自': ['z', 'i'],
    '然': ['r', 'a', 'n'],
    '语': ['y', 'u'],
    '言': ['y', 'a', 'n'],
    '需': ['x', 'u'],
    '时': ['s', 'h', 'i'],
    '间': ['j', 'i', 'a', 'n']
  };

  getHighlightedKeys(currentChar: string): string[] {
    if (currentChar === ' ') return ['Space'];
    
    // 如果是汉字，返回对应的拼音字母
    if (this.pinyinMap[currentChar]) {
      return this.pinyinMap[currentChar];
    }
    
    // 如果是其他字符，返回小写形式
    return [currentChar.toLowerCase()];
  }

  isKeyActive(keyValue: string, currentChar: string): boolean {
    if (keyValue === 'Space') return currentChar === ' ';
    
    // 对于汉字，检查键位是否在拼音字母中
    if (this.pinyinMap[currentChar]) {
      const pinyinLetters = this.pinyinMap[currentChar];
      return pinyinLetters.includes(keyValue.toLowerCase());
    }
    
    // 对于其他字符，直接比较
    return currentChar.toLowerCase() === keyValue.toLowerCase();
  }
}

/**
 * 键盘提示算法工厂
 */
export class KeyboardHintFactory {
  private static algorithms: Map<InputMethodType, KeyboardHintAlgorithm> = new Map([
    ['uyghur', new UyghurKeyboardHint()],
    ['english', new EnglishKeyboardHint()],
    ['pinyin', new ChinesePinyinKeyboardHint()]
  ]);

  /**
   * 获取指定输入法的键盘提示算法
   * @param inputMethod 输入法类型
   * @returns 键盘提示算法实例
   */
  static getAlgorithm(inputMethod: InputMethodType): KeyboardHintAlgorithm {
    const algorithm = this.algorithms.get(inputMethod);
    if (!algorithm) {
      throw new Error(`Unsupported input method: ${inputMethod}`);
    }
    return algorithm;
  }

  /**
   * 注册新的键盘提示算法
   * @param inputMethod 输入法类型
   * @param algorithm 算法实例
   */
  static registerAlgorithm(inputMethod: InputMethodType, algorithm: KeyboardHintAlgorithm): void {
    this.algorithms.set(inputMethod, algorithm);
  }
}

/**
 * 便捷函数：获取当前字符的高亮键位
 * @param inputMethod 输入法类型
 * @param currentChar 当前字符
 * @returns 应该高亮的键位数组
 */
export function getHighlightedKeys(inputMethod: InputMethodType, currentChar: string): string[] {
  const algorithm = KeyboardHintFactory.getAlgorithm(inputMethod);
  return algorithm.getHighlightedKeys(currentChar);
}

/**
 * 便捷函数：检查键位是否应该高亮
 * @param inputMethod 输入法类型
 * @param keyValue 键位值
 * @param currentChar 当前字符
 * @returns 是否应该高亮
 */
export function isKeyActive(inputMethod: InputMethodType, keyValue: string, currentChar: string): boolean {
  const algorithm = KeyboardHintFactory.getAlgorithm(inputMethod);
  return algorithm.isKeyActive(keyValue, currentChar);
}
