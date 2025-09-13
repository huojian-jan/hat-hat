# 键盘提示算法服务

## 概述

键盘提示算法服务是一个模块化的系统，用于为不同输入法提供智能的键盘按键高亮提示。该系统采用策略模式设计，支持多种输入法的扩展。

## 架构设计

### 核心接口

```typescript
interface KeyboardHintAlgorithm {
  getHighlightedKeys(currentChar: string): string[];
  isKeyActive(keyValue: string, currentChar: string): boolean;
}
```

### 支持的输入法

1. **维吾尔语 (uyghur)**
   - 直接字符映射
   - 支持维吾尔语字符的键盘高亮

2. **英文 (english)**
   - 标准英文字符映射
   - 大小写不敏感

3. **中文拼音 (pinyin)**
   - 汉字到拼音字母的智能映射
   - 支持多个拼音字母同时高亮
   - 内置常用汉字拼音映射表

## 使用方法

### 基本用法

```typescript
import { isKeyActive, getHighlightedKeys } from '../services/keyboardHint';

// 检查某个键是否应该高亮
const shouldHighlight = isKeyActive('pinyin', 'z', '中');  // true

// 获取应该高亮的所有键
const keys = getHighlightedKeys('pinyin', '中');  // ['z', 'h', 'o', 'n', 'g']
```

### 在键盘组件中使用

```typescript
// 在键盘渲染中使用
const isActive = (keyVal: string) => {
  return isKeyActive(inputMethod, keyVal, currentChar);
};

// 应用到键盘按键的样式
className={`keyboard-key ${isActive(key.value) ? 'active' : ''}`}
```

## 扩展新的输入法

### 1. 实现算法类

```typescript
class MyCustomKeyboardHint implements KeyboardHintAlgorithm {
  getHighlightedKeys(currentChar: string): string[] {
    // 实现自定义逻辑
    return ['a', 'b'];
  }

  isKeyActive(keyValue: string, currentChar: string): boolean {
    // 实现自定义逻辑
    return keyValue === currentChar;
  }
}
```

### 2. 注册算法

```typescript
KeyboardHintFactory.registerAlgorithm('custom', new MyCustomKeyboardHint());
```

### 3. 更新类型定义

```typescript
export type InputMethodType = 'uyghur' | 'pinyin' | 'english' | 'custom';
```

## 中文拼音映射表

当前支持的常用汉字及其拼音映射：

- 中 → ['z', 'h', 'o', 'n', 'g']
- 国 → ['g', 'u', 'o']
- 文 → ['w', 'e', 'n']
- 化 → ['h', 'u', 'a']
- ...

### 扩展拼音映射

可以通过修改 `ChinesePinyinKeyboardHint` 类中的 `pinyinMap` 来添加更多汉字：

```typescript
private readonly pinyinMap: { [key: string]: string[] } = {
  '新': ['x', 'i', 'n'],
  '词': ['c', 'i'],
  // 添加更多映射...
};
```

## 性能优化

1. **缓存机制**: 考虑为频繁查询的字符添加缓存
2. **懒加载**: 大型拼音字典可以考虑懒加载
3. **算法优化**: 针对特定输入法优化查找算法

## 测试

每个算法类都应该包含完整的单元测试：

```typescript
describe('ChinesePinyinKeyboardHint', () => {
  it('should highlight correct keys for Chinese characters', () => {
    const algorithm = new ChinesePinyinKeyboardHint();
    const keys = algorithm.getHighlightedKeys('中');
    expect(keys).toEqual(['z', 'h', 'o', 'n', 'g']);
  });
});
```

## 维护指南

1. **添加新字符映射**: 在对应的算法类中更新映射表
2. **优化算法**: 定期检查和优化键盘提示的准确性
3. **性能监控**: 监控算法执行性能，特别是中文拼音映射
4. **用户反馈**: 根据用户反馈调整提示逻辑

## 未来扩展

1. **动态字典**: 支持用户自定义字符映射
2. **机器学习**: 基于用户输入习惯优化提示
3. **多音字处理**: 改进中文多音字的拼音提示
4. **国际化**: 支持更多语言的输入法提示
