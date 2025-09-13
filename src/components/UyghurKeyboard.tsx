import React from 'react';

interface UyghurKeyboardProps {
  currentChar: string;
}

// 维吾尔语键盘布局 (根据用户提供的映射表)
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

// 字符到键位的映射 (包括 shift 组合)
const charToKeyMap: { [char: string]: { key: string; needsShift?: boolean } } = {};

// 构建字符映射
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
        // 空格键映射
        charToKeyMap[' '] = { key: 'Space' };
      }
    }
  });
});

// 手动添加空格键映射确保万无一失
charToKeyMap[' '] = { key: 'Space' };

const UyghurKeyboard: React.FC<UyghurKeyboardProps> = ({ currentChar }) => {
  // 获取当前字符需要的键位信息
  const getKeyInfo = (char: string) => {
    return charToKeyMap[char] || null;
  };

  const currentKeyInfo = currentChar ? getKeyInfo(currentChar) : null;

  // 检查键是否应该被高亮
  const isKeyActive = (keyInfo: any) => {
    if (!currentKeyInfo) return false;
    
    if (keyInfo.type === 'special') {
      // 特殊键处理
      if (keyInfo.key === 'Shift' && currentKeyInfo.needsShift) {
        return true;
      }
      // 空格键高亮逻辑
      if (keyInfo.key === 'Space' && currentKeyInfo.key === 'Space') {
        return true;
      }
      return false;
    }
    
    // 普通键处理
    const isNormalMatch = currentKeyInfo.key === keyInfo.en && !currentKeyInfo.needsShift;
    const isShiftMatch = currentKeyInfo.key === keyInfo.en && currentKeyInfo.needsShift;
    
    return isNormalMatch || isShiftMatch;
  };

  // 获取键显示的内容
  const getKeyDisplay = (keyInfo: any) => {
    if (keyInfo.type === 'special') {
      return keyInfo.key;
    }

    if (keyInfo.type === 'normal') {
      return (
        <div className="key-content">
          {/* 主字符：维吾尔语字母（最大最明显） */}
          {keyInfo.uy ? (
            <div className="key-uyghur-main">{keyInfo.uy}</div>
          ) : (
            <div className="key-main-char">{keyInfo.en.toUpperCase()}</div>
          )}
          {/* 副字符：英文字母（较小，左下角） - 仅维吾尔语键显示 */}
          {keyInfo.uy && (
            <div className="key-english-small">{keyInfo.en.toUpperCase()}</div>
          )}
          {/* 维吾尔语Shift字符：蓝色小字符（右上角） - 根据映射表样式 */}
          {keyInfo.uyShift && keyInfo.uyShift !== keyInfo.uy && (
            <div className="key-uyghur-shift">↑{keyInfo.uyShift}</div>
          )}
          {/* Shift字符：标准键盘的Shift符号（左上角） - 仅标准键显示 */}
          {!keyInfo.uy && keyInfo.shift && (
            <div className="key-shift-symbol">{keyInfo.shift}</div>
          )}
        </div>
      );
    }

    return keyInfo.key;
  };

  // 获取键的宽度类名
  const getKeyWidthClass = (width: number) => {
    if (width === 1) return '';
    if (width === 1.25) return 'key-ctrl';
    if (width === 1.5) return 'key-tab';
    if (width === 1.75) return 'key-caps';
    if (width === 2) return 'key-double';
    if (width === 2.25) return 'key-shift-left';
    if (width === 2.75) return 'key-shift-right';
    if (width === 6.25) return 'key-space';
    return '';
  };

  return (
    <div className="keyboard-container">
      <div className="keyboard">
        {keyboardLayout.map((row, rowIndex) => (
          <div key={rowIndex} className="keyboard-row">
            {row.map((keyInfo, keyIndex) => (
              <div
                key={keyIndex}
                className={`keyboard-key ${getKeyWidthClass(keyInfo.width)} ${
                  isKeyActive(keyInfo) ? 'active' : ''
                } ${keyInfo.type === 'special' ? 'special-key' : ''}`}
              >
                {getKeyDisplay(keyInfo)}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default UyghurKeyboard;