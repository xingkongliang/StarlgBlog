---
sidebar_position: 299
tags:
  - hash-table
  - string
  - Medium
---

# 299.公牛与母牛游戏

标签: `hash-table`, `string`

难度: Medium

通过率: 50.85%

原题链接: https://leetcode.com/problems/bulls-and-cows/description/

## 题目描述
你在和朋友玩一个叫做"公牛与母牛"的游戏。你写下一个秘密数字，并让朋友猜这个数字。当朋友做出猜测时，你会提供以下提示信息：

- “公牛”的数量，指猜测中位于正确位置的数字。
- “母牛”的数量，指猜测中虽然存在于秘密数字但位置错误的数字。

给定秘密数字`secret`和朋友的猜测`guess`，返回猜测的提示，格式为`xAyB`，其中`x`是公牛的数量，`y`是母牛的数量。注意：`secret`和`guess`中可能包含重复的数字。

## 解题思路
要解决这个问题，我们可以分两步进行：

1. **计算公牛（Bulls）数量**：遍历`secret`和`guess`字符串，找出相同位置且相同数值的字符。这些字符便是公牛。

2. **计算母牛（Cows）数量**：在去掉已经匹配的公牛后，我们需要检查每个出现的数字（不含位置信息）在`secret`中和在`guess`中出现的次数，利用这两个次数中的最小值来累计母牛的数量。

我们可以利用哈希表来记录除去匹配公牛之外，在`secret`和`guess`中各个数字的出现频率。然后通过两者的频率来计算出仅位置不同但数值相同的母牛数量。

## 代码实现
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="python" label="Python">

```python
def getHint(secret: str, guess: str) -> str:
    # 统计公牛数量
    bulls = sum(s == g for s, g in zip(secret, guess))
    
    # 生成字典记录secret和guess中的非公牛字符的数量
    from collections import Counter
    secret_counter = Counter(s for s, g in zip(secret, guess) if s != g)
    guess_counter = Counter(g for s, g in zip(secret, guess) if s != g)
    
    # 计算母牛数量：取两个Counter中每个数字出现的最小次数
    cows = sum(min(secret_counter[k], guess_counter[k]) for k in secret_counter)
    
    # 返回结果
    return f"{bulls}A{cows}B"
```

</TabItem>
<TabItem value="cpp" label="C++">

```cpp
std::string getHint(std::string secret, std::string guess) {
    int bulls = 0, cows = 0;
    std::vector<int> secret_count(10, 0), guess_count(10, 0);
    
    // 计算公牛数量并记录其余数字的出现次数
    for (int i = 0; i < secret.length(); ++i) {
        if (secret[i] == guess[i]) {
            ++bulls;
        } else {
            ++secret_count[secret[i] - '0'];
            ++guess_count[guess[i] - '0'];
        }
    }
    
    // 计算驴子数量
    for (int i = 0; i < 10; ++i) {
        cows += std::min(secret_count[i], guess_count[i]);
    }
    
    return std::to_string(bulls) + "A" + std::to_string(cows) + "B";
}
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
function getHint(secret, guess) {
    let bulls = 0;
    const secretCounter = new Array(10).fill(0);
    const guessCounter = new Array(10).fill(0);
    
    // 计算公牛数量并统计其余数字的出现次数
    for (let i = 0; i < secret.length; i++) {
        if (secret[i] === guess[i]) {
            bulls++;
        } else {
            secretCounter[parseInt(secret[i]) - 0]++;
            guessCounter[parseInt(guess[i]) - 0]++;
        }
    }
    
    // 计算驴子数量
    let cows = 0;
    for (let i = 0; i < 10; i++) {
        cows += Math.min(secretCounter[i], guessCounter[i]);
    }
    
    return `${bulls}A${cows}B`;
}
```

</TabItem>
<TabItem value="java" label="Java">

```java
public String getHint(String secret, String guess) {
    int bulls = 0, cows = 0;
    int[] secretCount = new int[10];
    int[] guessCount = new int[10];
    
    // 计算公牛数量并记录其余数字的出现次数
    for (int i = 0; i < secret.length(); i++) {
        if (secret.charAt(i) == guess.charAt(i)) {
            bulls++;
        } else {
            secretCount[secret.charAt(i) - '0']++;
            guessCount[guess.charAt(i) - '0']++;
        }
    }
    
    // 计算驴子数量
    for (int i = 0; i < 10; i++) {
        cows += Math.min(secretCount[i], guessCount[i]);
    }
    
    return bulls + "A" + cows + "B";
}
```

</TabItem>
</Tabs>

## 复杂度分析
时间复杂度：$O(n)$，其中$n$是字符串`secret`的长度，因为需要遍历字符串来计算公牛和母牛数量。  
  
空间复杂度：$O(1)$，因为哈希表中的大小是固定的（数字的范围为0-9）。
