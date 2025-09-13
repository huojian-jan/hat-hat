import { describe, it, expect } from 'vitest';
import { computeActiveChar, simulateSteps } from '../services/activeChar';

// 目标维吾尔语句子（用户提供）
const SENTENCE = 'مەن ئۇيغۇر تىلىدا يېزىشنى ئۆگىنىمەن';

// 构造期望：逐字符输入时，下一个高亮应为下一个未输入字符；
// 空格输入完成后，应跳到下一个词首字母，而非继续停留。
// 我们用朴素逻辑：active = 第一个未输入的字符（去掉前面全匹配部分），
// 这样可以对比当前算法结果。
function naiveExpected(target: string, userInput: string): string {
  for (let i = 0; i < target.length; i++) {
    if (userInput[i] !== target[i]) return target[i];
  }
  return '';
}

describe('computeActiveChar (Uyghur sentence)', () => {
  it('should progress to next word first letter after space', () => {
    const steps = simulateSteps(SENTENCE);
    // 找出包含空格的位置
    const spaceIndexes: number[] = [];
    for (let i = 0; i < SENTENCE.length; i++) if (SENTENCE[i] === ' ') spaceIndexes.push(i);
    // 验证在空格被输入后的下一步 active 指向后续非空格字符
    for (const idx of spaceIndexes) {
      // step 序号 = 已输入字符数量
      const recordAfterSpace = steps.find(r => r.step === idx + 1); // 输入该空格后一状态
      if (!recordAfterSpace) continue;
      // 下一个非空格字符
      let j = idx + 1;
      while (j < SENTENCE.length && SENTENCE[j] === ' ') j++;
      const expected = j < SENTENCE.length ? SENTENCE[j] : '';
      expect(recordAfterSpace.active).toBe(expected);
    }
  });

  it('compare algorithm active vs naive expected for whole progression', () => {
    let userInput = '';
    for (let i = 0; i <= SENTENCE.length; i++) {
      const active = computeActiveChar({ targetText: SENTENCE, userInput });
      const expected = naiveExpected(SENTENCE, userInput);
      expect(active).toBe(expected);
      userInput = SENTENCE.slice(0, i + 1);
    }
  });
});
