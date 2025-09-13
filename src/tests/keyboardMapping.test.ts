import { describe, it, expect, beforeAll } from 'vitest';

// 模拟键盘布局数据（从UyghurKeyboard.tsx复制）
const keyboardLayout = [
  // 顶部数字行
  [
    { key: '`', en: '`', shift: '~', type: 'normal', width: 1 },
    { key: '1', en: '1', shift: '!', type: 'normal', width: 1 },
    { key: '2', en: '2', shift: '@', type: 'normal', width: 1 },
    { key: '3', en: '3', shift: '#', type: 'normal', width: 1 },
    { key: '4', en: '4', shift: '$', type: 'normal', width: 1 },
    { key: '5', en: '5', shift: '%', type: 'normal', width: 1 },
    { key: '6', en: '6', shift: '^', type: 'normal', width: 1 },
    { key: '7', en: '7', shift: '&', type: 'normal', width: 1 },
    { key: '8', en: '8', shift: '*', type: 'normal', width: 1 },
    { key: '9', en: '9', shift: '(', type: 'normal', width: 1 },
    { key: '0', en: '0', shift: ')', type: 'normal', width: 1 },
    { key: '-', en: '-', shift: '_', type: 'normal', width: 1 },
    { key: '=', en: '=', shift: '+', type: 'normal', width: 1 },
    { key: 'Backspace', en: 'Backspace', type: 'special', width: 2 }
  ],
  // 第一行字母 (QWERTY行) - 根据映射表
  [
    { key: 'Tab', en: 'Tab', type: 'special', width: 1.5 },
    { key: 'q', en: 'q', shift: 'Q', uy: 'چ', type: 'normal', width: 1 },
    { key: 'w', en: 'w', shift: 'W', uy: 'ۋ', type: 'normal', width: 1 },
    { key: 'e', en: 'e', shift: 'E', uy: 'ې', type: 'normal', width: 1 },
    { key: 'r', en: 'r', shift: 'R', uy: 'ر', type: 'normal', width: 1 },
    { key: 't', en: 't', shift: 'T', uy: 'ت', type: 'normal', width: 1 },
    { key: 'y', en: 'y', shift: 'Y', uy: 'ي', type: 'normal', width: 1 },
    { key: 'u', en: 'u', shift: 'U', uy: 'ۇ', type: 'normal', width: 1 },
    { key: 'i', en: 'i', shift: 'I', uy: 'ڭ', type: 'normal', width: 1 },
    { key: 'o', en: 'o', shift: 'O', uy: 'و', type: 'normal', width: 1 },
    { key: 'p', en: 'p', shift: 'P', uy: 'پ', type: 'normal', width: 1 },
    { key: '[', en: '[', shift: '{', type: 'normal', width: 1 },
    { key: ']', en: ']', shift: '}', type: 'normal', width: 1 },
    { key: '\\', en: '\\', shift: '|', type: 'normal', width: 1.5 }
  ],
  // 第二行字母 (ASDF行) - 根据映射表
  [
    { key: 'CapsLock', en: 'CapsLock', type: 'special', width: 1.75 },
    { key: 'a', en: 'a', shift: 'A', uy: 'ھ', type: 'normal', width: 1 },
    { key: 's', en: 's', shift: 'S', uy: 'س', type: 'normal', width: 1 },
    { key: 'd', en: 'd', shift: 'D', uy: 'د', uyShift: 'ژ', type: 'normal', width: 1 },
    { key: 'f', en: 'f', shift: 'F', uy: 'ا', uyShift: 'ف', type: 'normal', width: 1 },
    { key: 'g', en: 'g', shift: 'G', uy: 'ە', uyShift: 'گ', type: 'normal', width: 1 },
    { key: 'h', en: 'h', shift: 'H', uy: 'ى', uyShift: 'خ', type: 'normal', width: 1 },
    { key: 'j', en: 'j', shift: 'J', uy: 'ق', uyShift: 'ج', type: 'normal', width: 1 },
    { key: 'k', en: 'k', shift: 'K', uy: 'ك', uyShift: 'ۆ', type: 'normal', width: 1 },
    { key: 'l', en: 'l', shift: 'L', uy: 'ل', uyShift: 'لا', type: 'normal', width: 1 },
    { key: ';', en: ';', shift: ':', type: 'normal', width: 1 },
    { key: '\'', en: '\'', shift: '"', type: 'normal', width: 1 },
    { key: 'Enter', en: 'Enter', type: 'special', width: 2.25 }
  ],
  // 第三行字母 (ZXCV行) - 根据映射表
  [
    { key: 'Shift', en: 'ShiftLeft', type: 'special', width: 2.25 },
    { key: 'z', en: 'z', shift: 'Z', uy: 'ز', type: 'normal', width: 1 },
    { key: 'x', en: 'x', shift: 'X', uy: 'ش', type: 'normal', width: 1 },
    { key: 'c', en: 'c', shift: 'C', uy: 'غ', type: 'normal', width: 1 },
    { key: 'v', en: 'v', shift: 'V', uy: 'ۈ', type: 'normal', width: 1 },
    { key: 'b', en: 'b', shift: 'B', uy: 'ب', type: 'normal', width: 1 },
    { key: 'n', en: 'n', shift: 'N', uy: 'ن', type: 'normal', width: 1 },
    { key: 'm', en: 'm', shift: 'M', uy: 'م', type: 'normal', width: 1 },
    { key: ',', en: ',', shift: '<', type: 'normal', width: 1 },
    { key: '.', en: '.', shift: '>', type: 'normal', width: 1 },
    { key: '/', en: '/', shift: '?', uy: 'ئ‍', type: 'normal', width: 1 },
    { key: 'Shift', en: 'ShiftRight', type: 'special', width: 2.75 }
  ],
  // 底部行
  [
    { key: 'Ctrl', en: 'ControlLeft', type: 'special', width: 1.25 },
    { key: 'Win Key', en: 'MetaLeft', type: 'special', width: 1.25 },
    { key: 'Alt', en: 'AltLeft', type: 'special', width: 1.25 },
    { key: 'Space', en: 'Space', type: 'special', width: 6.25 },
    { key: 'Alt', en: 'AltRight', type: 'special', width: 1.25 },
    { key: 'Win Key', en: 'MetaRight', type: 'special', width: 1.25 },
    { key: 'Menu', en: 'ContextMenu', type: 'special', width: 1.25 },
    { key: 'Ctrl', en: 'ControlRight', type: 'special', width: 1.25 }
  ]
];

// 构建字符映射（从UyghurKeyboard.tsx复制逻辑）
let charToKeyMap: { [char: string]: { key: string; needsShift?: boolean } } = {};

beforeAll(() => {
  charToKeyMap = {};
  
  keyboardLayout.forEach(row => {
    row.forEach(keyInfo => {
      if (keyInfo.type === 'normal') {
        // 英文字符映射（小写）
        charToKeyMap[keyInfo.en] = { key: keyInfo.en };
        // 英文字符映射（大写）
        charToKeyMap[keyInfo.en.toUpperCase()] = { key: keyInfo.en, needsShift: true };
        
        // 维吾尔语普通字符 - 不需要Shift
        if (keyInfo.uy) {
          charToKeyMap[keyInfo.uy] = { key: keyInfo.en };
        }
        
        // 维吾尔语Shift字符 - 需要Shift
        if (keyInfo.uyShift && keyInfo.uyShift !== keyInfo.uy) {
          charToKeyMap[keyInfo.uyShift] = { key: keyInfo.en, needsShift: true };
        }
        
        // 符号字符映射
        charToKeyMap[keyInfo.key] = { key: keyInfo.en };
        if (keyInfo.shift) {
          charToKeyMap[keyInfo.shift] = { key: keyInfo.en, needsShift: true };
        }
      } else if (keyInfo.type === 'special') {
        // 特殊键映射
        if (keyInfo.key === 'Space') {
          charToKeyMap[' '] = { key: 'Space' };
        }
      }
    });
  });
  
  // 手动添加空格键映射确保万无一失
  charToKeyMap[' '] = { key: 'Space' };
});

describe('维吾尔语键盘映射测试', () => {
  describe('数字行映射测试', () => {
    it('应该正确映射数字键', () => {
      expect(charToKeyMap['1']).toEqual({ key: '1' });
      expect(charToKeyMap['2']).toEqual({ key: '2' });
      expect(charToKeyMap['3']).toEqual({ key: '3' });
      expect(charToKeyMap['4']).toEqual({ key: '4' });
      expect(charToKeyMap['5']).toEqual({ key: '5' });
      expect(charToKeyMap['6']).toEqual({ key: '6' });
      expect(charToKeyMap['7']).toEqual({ key: '7' });
      expect(charToKeyMap['8']).toEqual({ key: '8' });
      expect(charToKeyMap['9']).toEqual({ key: '9' });
      expect(charToKeyMap['0']).toEqual({ key: '0' });
    });

    it('应该正确映射数字键的Shift字符', () => {
      expect(charToKeyMap['!']).toEqual({ key: '1', needsShift: true });
      expect(charToKeyMap['@']).toEqual({ key: '2', needsShift: true });
      expect(charToKeyMap['#']).toEqual({ key: '3', needsShift: true });
      expect(charToKeyMap['$']).toEqual({ key: '4', needsShift: true });
      expect(charToKeyMap['%']).toEqual({ key: '5', needsShift: true });
      expect(charToKeyMap['^']).toEqual({ key: '6', needsShift: true });
      expect(charToKeyMap['&']).toEqual({ key: '7', needsShift: true });
      expect(charToKeyMap['*']).toEqual({ key: '8', needsShift: true });
      expect(charToKeyMap['(']).toEqual({ key: '9', needsShift: true });
      expect(charToKeyMap[')']).toEqual({ key: '0', needsShift: true });
    });
  });

  describe('维吾尔语字符映射测试', () => {
    it('应该正确映射QWERTY行的维吾尔语字符', () => {
      expect(charToKeyMap['چ']).toEqual({ key: 'q' }); // Q键
      expect(charToKeyMap['ۋ']).toEqual({ key: 'w' }); // W键
      expect(charToKeyMap['ې']).toEqual({ key: 'e' }); // E键
      expect(charToKeyMap['ر']).toEqual({ key: 'r' }); // R键
      expect(charToKeyMap['ت']).toEqual({ key: 't' }); // T键
      expect(charToKeyMap['ي']).toEqual({ key: 'y' }); // Y键
      expect(charToKeyMap['ۇ']).toEqual({ key: 'u' }); // U键
      expect(charToKeyMap['ڭ']).toEqual({ key: 'i' }); // I键
      expect(charToKeyMap['و']).toEqual({ key: 'o' }); // O键
      expect(charToKeyMap['پ']).toEqual({ key: 'p' }); // P键
    });

    it('应该正确映射ASDF行的维吾尔语字符', () => {
      expect(charToKeyMap['ھ']).toEqual({ key: 'a' }); // A键
      expect(charToKeyMap['س']).toEqual({ key: 's' }); // S键
      expect(charToKeyMap['د']).toEqual({ key: 'd' }); // D键
      expect(charToKeyMap['ا']).toEqual({ key: 'f' }); // F键
      expect(charToKeyMap['ە']).toEqual({ key: 'g' }); // G键
      expect(charToKeyMap['ى']).toEqual({ key: 'h' }); // H键
      expect(charToKeyMap['ق']).toEqual({ key: 'j' }); // J键
      expect(charToKeyMap['ك']).toEqual({ key: 'k' }); // K键
      expect(charToKeyMap['ل']).toEqual({ key: 'l' }); // L键
    });

    it('应该正确映射ZXCV行的维吾尔语字符', () => {
      expect(charToKeyMap['ز']).toEqual({ key: 'z' }); // Z键
      expect(charToKeyMap['ش']).toEqual({ key: 'x' }); // X键
      expect(charToKeyMap['غ']).toEqual({ key: 'c' }); // C键
      expect(charToKeyMap['ۈ']).toEqual({ key: 'v' }); // V键
      expect(charToKeyMap['ب']).toEqual({ key: 'b' }); // B键
      expect(charToKeyMap['ن']).toEqual({ key: 'n' }); // N键
      expect(charToKeyMap['م']).toEqual({ key: 'm' }); // M键
      expect(charToKeyMap['ئ‍']).toEqual({ key: '/' }); // /键
    });
  });

  describe('维吾尔语Shift字符映射测试', () => {
    it('应该正确映射需要Shift的维吾尔语字符', () => {
      expect(charToKeyMap['ژ']).toEqual({ key: 'd', needsShift: true }); // D键 + Shift
      expect(charToKeyMap['ف']).toEqual({ key: 'f', needsShift: true }); // F键 + Shift
      expect(charToKeyMap['گ']).toEqual({ key: 'g', needsShift: true }); // G键 + Shift
      expect(charToKeyMap['خ']).toEqual({ key: 'h', needsShift: true }); // H键 + Shift
      expect(charToKeyMap['ج']).toEqual({ key: 'j', needsShift: true }); // J键 + Shift
      expect(charToKeyMap['ۆ']).toEqual({ key: 'k', needsShift: true }); // K键 + Shift
      expect(charToKeyMap['لا']).toEqual({ key: 'l', needsShift: true }); // L键 + Shift
    });
  });

  describe('英文字符映射测试', () => {
    it('应该正确映射小写英文字母', () => {
      const letters = 'abcdefghijklmnopqrstuvwxyz';
      for (const letter of letters) {
        expect(charToKeyMap[letter]).toEqual({ key: letter });
      }
    });

    it('应该正确映射大写英文字母（需要Shift）', () => {
      const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
      for (const letter of letters) {
        expect(charToKeyMap[letter]).toEqual({ key: letter.toLowerCase(), needsShift: true });
      }
    });
  });

  describe('特殊键映射测试', () => {
    it('应该正确映射空格键', () => {
      expect(charToKeyMap[' ']).toEqual({ key: 'Space' });
    });
  });

  describe('测试文本字符映射验证', () => {
    it('应该能够映射当前测试文本中的所有字符', () => {
      const testText = 'چ ۈ ې ر ت ي ۇ';
      const characters = testText.split('');
      
      for (const char of characters) {
        expect(charToKeyMap[char]).toBeDefined();
        console.log(`字符 '${char}' 映射到键: ${JSON.stringify(charToKeyMap[char])}`);
      }
    });
  });

  describe('边界情况测试', () => {
    it('应该处理不存在的字符', () => {
      expect(charToKeyMap['ع']).toBeUndefined(); // 不在布局中的阿拉伯字母
      expect(charToKeyMap['ح']).toBeUndefined(); // 不在布局中的阿拉伯字母
    });

    it('应该验证所有键都有正确的映射结构', () => {
      Object.entries(charToKeyMap).forEach(([char, mapping]) => {
        expect(mapping).toHaveProperty('key');
        expect(typeof mapping.key).toBe('string');
        if ('needsShift' in mapping) {
          expect(typeof mapping.needsShift).toBe('boolean');
        }
      });
    });

    it('应该验证键盘布局的完整性', () => {
      let totalNormalKeys = 0;
      let totalSpecialKeys = 0;
      
      keyboardLayout.forEach(row => {
        row.forEach(keyInfo => {
          if (keyInfo.type === 'normal') {
            totalNormalKeys++;
            // 每个普通键都应该有英文字符
            expect(keyInfo.en).toBeDefined();
            expect(typeof keyInfo.en).toBe('string');
          } else if (keyInfo.type === 'special') {
            totalSpecialKeys++;
            expect(keyInfo.key).toBeDefined();
          }
        });
      });
      
      console.log(`总共有 ${totalNormalKeys} 个普通键和 ${totalSpecialKeys} 个特殊键`);
      expect(totalNormalKeys).toBeGreaterThan(20); // 应该有足够的字母键
      expect(totalSpecialKeys).toBeGreaterThan(5);  // 应该有一些特殊键
    });
  });
});