import { useState, useEffect, useCallback } from 'react';
import { Card, Typography, Switch, Space } from 'antd';
import { TypingState, CharacterInfo } from '../types';
import {
  getRandomText,
  calculateCharacterStates,
  calculateStats,
  isInputComplete,
  normalizeText,
  externalToInternalSpaces,
  internalToExternalSpaces,
  INTERNAL_SPACE
} from '../utils';
import { computeActiveChar } from '../services/activeChar';
import { isKeyActive, InputMethodType } from '../services/keyboardHint';
import UyghurKeyboard from './UyghurKeyboard';

interface TypingPracticeProps {
  testType: 'uyghur' | 'pinyin' | 'english';
}
// 标准英文/拼音键盘（复用 Uyghur 键盘的尺寸与样式类）
const StandardKeyboard: React.FC<{ currentChar: string; inputMethod: InputMethodType }> = ({ currentChar, inputMethod }) => {
  const layout: Array<Array<{ key: string; label?: string; width?: number; type?: 'special' }>> = [
    [
      { key: '`' }, { key: '1' }, { key: '2' }, { key: '3' }, { key: '4' }, { key: '5' },
      { key: '6' }, { key: '7' }, { key: '8' }, { key: '9' }, { key: '0' }, { key: '-' }, { key: '=' },
      { key: 'Backspace', type: 'special', width: 2 }
    ],
    [
      { key: 'Tab', type: 'special', width: 1.5 },
      { key: 'q' }, { key: 'w' }, { key: 'e' }, { key: 'r' }, { key: 't' }, { key: 'y' }, { key: 'u' }, { key: 'i' }, { key: 'o' }, { key: 'p' },
      { key: '[' }, { key: ']' }, { key: '\\', width: 1.5 }
    ],
    [
      { key: 'CapsLock', type: 'special', width: 1.75 },
      { key: 'a' }, { key: 's' }, { key: 'd' }, { key: 'f' }, { key: 'g' }, { key: 'h' }, { key: 'j' }, { key: 'k' }, { key: 'l' },
      { key: ';' }, { key: '\'' }, { key: 'Enter', type: 'special', width: 2.25 }
    ],
    [
      { key: 'ShiftLeft', label: 'Shift', type: 'special', width: 2.25 },
      { key: 'z' }, { key: 'x' }, { key: 'c' }, { key: 'v' }, { key: 'b' }, { key: 'n' }, { key: 'm' }, { key: ',' }, { key: '.' }, { key: '/' },
      { key: 'ShiftRight', label: 'Shift', type: 'special', width: 2.75 }
    ],
    [
      { key: 'ControlLeft', label: 'Ctrl', type: 'special', width: 1.25 },
  { key: 'MetaLeft', label: 'Win', type: 'special', width: 1.25 },
      { key: 'AltLeft', label: 'Alt', type: 'special', width: 1.25 },
      { key: 'Space', label: 'Space', type: 'special', width: 6 },
      { key: 'AltRight', label: 'Alt', type: 'special', width: 1.25 },
  { key: 'MetaRight', label: 'Win', type: 'special', width: 1.25 },
      { key: 'ContextMenu', label: 'Menu', type: 'special', width: 1.25 },
      { key: 'ControlRight', label: 'Ctrl', type: 'special', width: 1.25 }
    ]
  ];


  const getWidthClass = (w?: number) => {
    if (!w || w === 1) return '';
    if (w === 1.25) return 'key-ctrl';
    if (w === 1.5) return 'key-tab';
    if (w === 1.75) return 'key-caps';
    if (w === 2) return 'key-double';
    if (w === 2.25) return 'key-shift-left';
    if (w === 2.75) return 'key-shift-right';
    if (w >= 5) return 'key-space';
    return '';
  };

  const isActive = (keyVal: string) => {
    return isKeyActive(inputMethod, keyVal, currentChar);
  };

  return (
    <div className="keyboard-container">
      <div className="keyboard">
        {layout.map((row, ridx) => (
          <div key={ridx} className="keyboard-row">
            {row.map((k, kidx) => (
              <div
                key={k.key + kidx}
                className={`keyboard-key ${getWidthClass(k.width)} ${k.type === 'special' ? 'special-key' : ''} ${isActive(k.key) ? 'active' : ''}`}
              >
                <div className="key-content">
                  <div className="key-main-char">{(k.label || k.key).length === 1 ? (k.label || k.key).toUpperCase() : (k.label || k.key)}</div>
                </div>
              </div>
            ))}
          </div>
        ))}
        {/* 底部功能键与空格行 */}
        <div className="keyboard-row">
          {layout[4].map((k, idx) => (
            <div
              key={k.key + idx}
              className={`keyboard-key ${getWidthClass(k.width)} special-key ${k.key === 'Space' && isActive('Space') ? 'active' : ''}`}
            >
              <div className="key-content">
                <div className="key-main-char">{k.label?.toUpperCase() || k.key}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const { Text } = Typography;

const TypingPractice: React.FC<TypingPracticeProps> = ({ testType }) => {
  // 键盘显示状态控制
  const [showKeyboard, setShowKeyboard] = useState(true);
  
  // 初始化状态
  const [typingState, setTypingState] = useState<TypingState>(() => {
    const raw = getRandomText(testType);
    const targetText = externalToInternalSpaces(raw);
    return {
      targetText,
      userInput: '',
      currentIndex: 0,
      characters: calculateCharacterStates(targetText, '', 0),
      isCompleted: false,
      stats: {
        totalCharacters: 0,
        correctCharacters: 0,
        incorrectCharacters: 0,
        accuracy: 0,
        wpm: 0,
        startTime: null,
        endTime: null
      }
    };
  });

  // 更新统计信息
  const updateStats = useCallback(() => {
    const stats = calculateStats(
      typingState.targetText,
      typingState.userInput,
      typingState.stats.startTime,
      typingState.isCompleted ? new Date() : null
    );
    
    setTypingState(prev => ({
      ...prev,
      stats
    }));
  }, [typingState.targetText, typingState.userInput, typingState.stats.startTime, typingState.isCompleted]);

  // 处理用户输入
  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newInput = event.target.value;
  const normalizedTarget = externalToInternalSpaces(normalizeText(typingState.targetText));
  const normalizedInput = externalToInternalSpaces(normalizeText(newInput));

    setTypingState(prev => {
      const isFirstInput = prev.userInput === '' && newInput !== '';
      const startTime = isFirstInput ? new Date() : prev.stats.startTime;
      
      // 计算当前索引，但不能超过目标文本长度
      const currentIndex = Math.min(normalizedInput.length, normalizedTarget.length);
      const characters = calculateCharacterStates(normalizedTarget, normalizedInput, currentIndex);
      const completed = isInputComplete(normalizedTarget, normalizedInput);

      return {
        ...prev,
  userInput: externalToInternalSpaces(newInput),
        currentIndex,
        characters,
        isCompleted: completed,
        stats: {
          ...prev.stats,
          startTime,
          endTime: completed ? new Date() : null
        }
      };
    });
  };

  // 处理键盘事件
  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // 阻止某些默认行为
    if (event.key === 'Tab') {
      event.preventDefault();
    }
  };

  // 更新统计信息
  useEffect(() => {
    updateStats();
  }, [updateStats]);


  // 渲染目标文本，带有字符状态高亮
  const renderTargetText = () => {
    // 只有维吾尔语是从右到左的
    const isRightToLeft = testType === 'uyghur';
    return (
      <div 
        className="target-text uyghur-text"
        style={{
          textAlign: isRightToLeft ? 'right' : 'left',
          direction: isRightToLeft ? 'rtl' : 'ltr'
        }}
      >
    {typingState.characters.map((charInfo: CharacterInfo) => (
          <span
            key={charInfo.index}
            className={`char ${charInfo.status}`}
          >
      {charInfo.char === INTERNAL_SPACE ? ' ' : charInfo.char}
          </span>
        ))}
      </div>
    );
  };


  // 当前需要高亮/提示的字符（抽取到独立算法）
  const currentChar = computeActiveChar({
    targetText: typingState.targetText,
    userInput: typingState.userInput
  });

  return (
    <div style={{ padding: '0', background: 'transparent' }}>
      {/* 键盘布局（条件显示） */}
      {showKeyboard && (
        <Card style={{ marginBottom: '16px', borderRadius: '12px', border: '1px solid #e6f7ff' }}>
          {testType === 'uyghur' ? (
            <UyghurKeyboard currentChar={currentChar} />
          ) : (
            <StandardKeyboard currentChar={currentChar} inputMethod={testType} />
          )}
        </Card>
      )}

      {/* 统计信息和键盘控制开关 - 同一行显示 */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        {/* 实时统计信息 - 左对齐 */}
        <Space size="large">
          <Text style={{ color: '#666', fontSize: '14px' }}>
            <span style={{ fontWeight: 'bold', color: '#1890ff' }}>速度:</span> {typingState.stats.wpm} WPM
          </Text>
          <Text style={{ color: '#666', fontSize: '14px' }}>
            <span style={{ fontWeight: 'bold', color: '#1890ff' }}>准确率:</span> {typingState.stats.accuracy}%
          </Text>
          <Text style={{ color: '#666', fontSize: '14px' }}>
            <span style={{ fontWeight: 'bold', color: '#1890ff' }}>字符:</span> {typingState.stats.correctCharacters + typingState.stats.incorrectCharacters}
          </Text>
        </Space>

        {/* 键盘控制开关 - 右对齐 */}
        <Space align="center">
          <Text style={{ color: '#1890ff', fontWeight: 'bold' }}>显示键盘:</Text>
          <Switch 
            checked={showKeyboard}
            onChange={setShowKeyboard}
            checkedChildren="开"
            unCheckedChildren="关"
            style={{
              backgroundColor: showKeyboard ? '#1890ff' : '#d9d9d9'
            }}
          />
        </Space>
      </div>      {/* 目标文本 */}
      <Card style={{ marginBottom: '16px', borderRadius: '12px', border: '1px solid #e6f7ff' }}>
        {renderTargetText()}
      </Card>
      
      {/* 输入区域 */}
      <Card style={{ marginBottom: '16px', borderRadius: '12px', border: '1px solid #e6f7ff' }}>
        <textarea
          style={{
            width: '100%',
            minHeight: '120px',
            padding: '12px',
            border: '1px solid #d9d9d9',
            borderRadius: '6px',
            fontSize: '16px',
            fontFamily: 'Noto Sans Arabic, Arial, sans-serif',
            resize: 'vertical',
            outline: 'none',
            textAlign: testType === 'uyghur' ? 'right' : 'left',
            direction: testType === 'uyghur' ? 'rtl' : 'ltr'
          }}
          value={internalToExternalSpaces(typingState.userInput)}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder={
            testType === 'uyghur' 
              ? "...ئەم يەردە كىرگۈزۈڭ" 
              : testType === 'pinyin'
              ? "使用拼音输入法在这里输入汉字..."
              : "在这里输入..."
          }
          disabled={typingState.isCompleted}
          autoFocus
        />
      </Card>
      
      {/* 完成提示 */}
      {typingState.isCompleted && (
        <Card style={{ marginBottom: '16px', borderRadius: '12px', border: '1px solid #52c41a', background: '#f6ffed' }}>
          <div style={{ textAlign: 'center' }}>
            <Text style={{ color: '#52c41a', fontSize: '18px', fontWeight: 'bold' }}>🎉 练习完成！</Text>
            <br />
            <Text style={{ color: '#666', fontSize: '14px' }}>
              打字速度：{typingState.stats.wpm} WPM，准确率：{typingState.stats.accuracy}%
            </Text>
          </div>
        </Card>
      )}
    </div>
  );
};

export default TypingPractice;
