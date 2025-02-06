---
sidebar_position: 401
tags:
  - bit-manipulation
  - backtracking
  - Easy
---

# 401.二进制手表

标签: `bit-manipulation`, `backtracking`

难度: Easy

通过率: 55.6%

原题链接: https://leetcode.com/problems/binary-watch/description/

## 题目描述
一款二进制手表有上面4个LED表示小时（0-11），下面6个LED表示分钟（0-59）。每个LED代表一个二进制位（0或1），最右边是最低有效位。例如，如果手表显示"4:51"，就表示小时LED为 "0100"，分钟LED为 "110011"。给定一个整数turnedOn表示当前亮着的LED灯数（不包括PM），返回手表可能显示的所有时间。返回的时间可以是任意顺序的。小时不能有前导零（例如"01:00"不是有效，应该是"1:00"）。分钟必须是两位数，可以有前导零（例如"10:2"不是有效，应该是"10:02"）。

## 解题思路
题目要求我们找出所有开启特定数量 LED 的时间组合，小时和分钟的二进制表示相加应该等于 `turnedOn`。我们可以使用回溯法来生成所有可能的时间组合：

1. 枚举小时从 0 到 11（因为小时只有 4 位二进制），并统计其二进制中 1 的个数。
2. 对于每个小时，枚举分钟从 0 到 59，统计其二进制中 1 的个数。
3. 如果小时与分钟中 1 的总数等于 `turnedOn`，将其格式化为时间字符串并添加到结果集中。
4. 返回结果集。

## 代码实现
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="python" label="Python">

```python
def readBinaryWatch(turnedOn):
    result = []
    # 枚举小时
    for h in range(12):
        # 枚举分钟
        for m in range(60):
            # 如果小时和分钟的二进制1的总数等于turnedOn
            if bin(h).count('1') + bin(m).count('1') == turnedOn:
                # 将时间格式化并添加到结果
                result.append(f"{h}:{m:02d}")
    return result

```

</TabItem>
<TabItem value="cpp" label="C++">

```cpp
vector<vector<string>> readBinaryWatch(int turnedOn) {
    vector<string> result;
    // 枚举小时
    for (int h = 0; h < 12; ++h) {
        // 枚举分钟
        for (int m = 0; m < 60; ++m) {
            // 如果小时和分钟的二进制1的总数等于turnedOn
            if (__builtin_popcount(h) + __builtin_popcount(m) == turnedOn) {
                // 将时间格式化并添加到结果
                result.push_back(to_string(h) + ":" + (m < 10 ? "0" : "") + to_string(m));
            }
        }
    }
    return result;
}
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
function readBinaryWatch(turnedOn) {
    let result = [];
    // 枚举小时
    for (let h = 0; h < 12; h++) {
        // 枚举分钟
        for (let m = 0; m < 60; m++) {
            // 如果小时和分钟的二进制1的总数等于turnedOn
            if ((h.toString(2).split('1').length - 1) + (m.toString(2).split('1').length - 1) === turnedOn) {
                // 将时间格式化并添加到结果
                result.push(`${h}:${m < 10 ? '0' : ''}${m}`);
            }
        }
    }
    return result;
}
```

</TabItem>
<TabItem value="java" label="Java">

```java
public List<String> readBinaryWatch(int turnedOn) {
    List<String> result = new ArrayList<>();
    // 枚举小时
    for (int h = 0; h < 12; h++) {
        // 枚举分钟
        for (int m = 0; m < 60; m++) {
            // 如果小时和分钟的二进制1的总数等于turnedOn
            if (Integer.bitCount(h) + Integer.bitCount(m) == turnedOn) {
                // 将时间格式化并添加到结果
                result.add(String.format("%d:%02d", h, m));
            }
        }
    }
    return result;
}
```

</TabItem>
</Tabs>

## 复杂度分析
时间复杂度：$O(12 \times 60)$，因为我们枚举所有可能的小时（12种）和分钟（60种）组合。  
  
空间复杂度：$O(1)$，除了输出结果外，不需要额外的存储。
