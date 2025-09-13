import { useState, useEffect, useCallback } from 'react';
import { TypingState, CharacterInfo } from '../types';
import { 
  getRandomText, 
  calculateCharacterStates, 
  calculateStats, 
  isInputComplete,
  normalizeText
} from '../utils';
import InputDisplay from './InputDisplay';
import UyghurKeyboard from './UyghurKeyboard';

const TypingPractice: React.FC = () => {
  // 初始化状态
  const [typingState, setTypingState] = useState<TypingState>(() => {
    const targetText = getRandomText();
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
    const normalizedTarget = normalizeText(typingState.targetText);
    const normalizedInput = normalizeText(newInput);

    // 防止输入超过目标文本长度
    if (normalizedInput.length > normalizedTarget.length) {
      return;
    }

    setTypingState(prev => {
      const isFirstInput = prev.userInput === '' && newInput !== '';
      const startTime = isFirstInput ? new Date() : prev.stats.startTime;
      const currentIndex = normalizedInput.length;
      const characters = calculateCharacterStates(normalizedTarget, normalizedInput, currentIndex);
      const completed = isInputComplete(normalizedTarget, normalizedInput);

      return {
        ...prev,
        userInput: newInput,
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

  // 重置练习
  const resetPractice = () => {
    const newTargetText = getRandomText();
    setTypingState({
      targetText: newTargetText,
      userInput: '',
      currentIndex: 0,
      characters: calculateCharacterStates(newTargetText, '', 0),
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
    return (
      <div className="target-text uyghur-text">
        {typingState.characters.map((charInfo: CharacterInfo) => (
          <span
            key={charInfo.index}
            className={`char ${charInfo.status}`}
          >
            {charInfo.char}
          </span>
        ))}
      </div>
    );
  };

  // 渲染统计信息
  const renderStats = () => (
    <div className="stats">
      <div className="stat-item">
        <div className="stat-value">{typingState.stats.wpm}</div>
        <div className="stat-label">每分钟字数</div>
      </div>
      <div className="stat-item">
        <div className="stat-value">{typingState.stats.accuracy}%</div>
        <div className="stat-label">准确率</div>
      </div>
      <div className="stat-item">
        <div className="stat-value">
          {typingState.stats.correctCharacters}/{typingState.stats.totalCharacters}
        </div>
        <div className="stat-label">正确字符</div>
      </div>
      <div className="stat-item">
        <div className="stat-value">{typingState.stats.incorrectCharacters}</div>
        <div className="stat-label">错误字符</div>
      </div>
    </div>
  );

  // 获取当前需要输入的字符
  const getCurrentChar = () => {
    const normalizedTarget = normalizeText(typingState.targetText);
    return normalizedTarget[typingState.currentIndex] || '';
  };

  return (
    <div className="typing-container">
      {/* 第一行：键盘布局 */}
      <div className="row keyboard-row-container">
        <UyghurKeyboard currentChar={getCurrentChar()} />
      </div>
      
      {/* 第二行：目标文本 */}
      <div className="row target-row">
        {renderTargetText()}
      </div>
      
      {/* 第三行：输入区域 */}
      <div className="row input-row">
        {/* 单一输入框 */}
        <textarea
          className="input-area uyghur-text"
          value={typingState.userInput}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder="在这里输入..."
          disabled={typingState.isCompleted}
          autoFocus
          rows={4}
        />
      </div>
      
      {/* 统计信息 - 紧凑显示 */}
      <div style={{ marginTop: '15px' }}>
        {renderStats()}
      </div>
      
      {/* 完成提示和重置按钮 */}
      {typingState.isCompleted && (
        <div style={{ textAlign: 'center', marginTop: '15px' }}>
          <h3 style={{ color: '#28a745', marginBottom: '10px', fontSize: '18px' }}>🎉 练习完成！</h3>
          <p style={{ marginBottom: '10px', fontSize: '14px' }}>
            打字速度：{typingState.stats.wpm} WPM，准确率：{typingState.stats.accuracy}%
          </p>
        </div>
      )}
      
      <button 
        className="button reset-button"
        onClick={resetPractice}
        style={{ marginTop: '15px', padding: '8px 16px', fontSize: '14px' }}
      >
        {typingState.isCompleted ? '开始新练习' : '重新开始'}
      </button>
    </div>
  );
};

export default TypingPractice;
