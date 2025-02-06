---
sidebar_position: 393
tags:
  - array
  - string
  - bit-manipulation
  - Medium
---

# 393.UTF-8 验证

标签: `array`, `string`, `bit-manipulation`

难度: Medium

通过率: 45.28%

原题链接: https://leetcode.com/problems/utf-8-validation/description/

## 题目描述
给定一个整数数组 data，表示数据，返回它是否是有效的 UTF-8 编码（即它会转换为一系列有效的 UTF-8 编码字符）。`UTF-8` 中的字符可以是 1 到 4 字节长，遵循以下规则：

1. 对于一个 1 字节的字符，其第一位是0，后面是它的 Unicode 码。
2. 对于一个 n 字节的字符，其前 n 位都是1，第 n+1 位是0，其后面 n-1 个字节的最高两位都是 `10`。

这就是 `UTF-8` 编码的工作方式：

| 字节数 | `UTF-8` 八位字节序列（用二进制表示） |
| ------- | ----------------------------------------- |
| 1       | `0xxxxxxx` |
| 2       | `110xxxxx 10xxxxxx` |
| 3       | `1110xxxx 10xxxxxx 10xxxxxx` |
| 4       | `11110xxx 10xxxxxx 10xxxxxx 10xxxxxx` |

注：`data` 是一个整数数组。仅使用每个整数的最低有效 8 位来存储数据。这意味着每个整数仅表示 1 字节的数据。

## 解题思路
要验证给定的整数数组是否是有效的 UTF-8 编码，可以依次检查数组中的每个字节是否符合 UTF-8 编码规则。我们需要注意每个字符的开始字节和后续字节：

1. 使用位掩码检查字符是几字节的编码：
   - 如果是一个字节：首位应该是0，即二进制表示为 `0xxxxxxx`。
   - 如果是两个字节：前两位是 `110`，即二进制表示为 `110xxxxx`。
   - 如果是三个字节：前三位是 `1110`，即二进制表示为 `1110xxxx`。
   - 如果是四个字节：前四位是 `11110`，即二进制表示为 `11110xxx`。

2. 对于每个非开始字节（即后续字节）要求前两位为 `10`，即二进制形式为 `10xxxxxx`。

3. 对于多字节字符，确保后续字节的数量和格式是正确的。

具体步骤：
- 遍历数组，检查每一个字节。
- 根据第一个字节来确定这个字符的字节数。
- 确认后续字节是以 `10` 开头的。
- 如果发现任何不符合规则的字节或字节数超出预期，这个编码则无效。

## 代码实现
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="python" label="Python">

```python
def validUtf8(data):
    # 剩余的需要符合 UTF-8 编码的字节数
    remaining_bytes = 0
    
    for num in data:
        if remaining_bytes == 0:
            # 确定需要的字节数
            
            # 1字节格式：0xxxxxxx
            if num >> 7 == 0:
                continue
            # 2字节格式：110xxxxx
            elif num >> 5 == 0b110:
                remaining_bytes = 1
            # 3字节格式：1110xxxx
            elif num >> 4 == 0b1110:
                remaining_bytes = 2
            # 4字节格式：11110xxx
            elif num >> 3 == 0b11110:
                remaining_bytes = 3
            else:
                return False
        else:
            # 检查后续字节的格式是否正确
            if num >> 6 != 0b10:
                return False
            remaining_bytes -= 1
    
    return remaining_bytes == 0
```

</TabItem>
<TabItem value="cpp" label="C++">

```cpp
bool validUtf8(vector<int>& data) {
    int remaining_bytes = 0;
    for (int num : data) {
        if (remaining_bytes == 0) {
            if ((num >> 7) == 0) continue;
            else if ((num >> 5) == 0b110) remaining_bytes = 1;
            else if ((num >> 4) == 0b1110) remaining_bytes = 2;
            else if ((num >> 3) == 0b11110) remaining_bytes = 3;
            else return false;
        } else {
            if ((num >> 6) != 0b10) return false;
            --remaining_bytes;
        }
    }
    return remaining_bytes == 0;
}
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
function validUtf8(data) {
    let remainingBytes = 0;
    for (let num of data) {
        if (remainingBytes === 0) {
            if ((num >> 7) === 0) continue;
            else if ((num >> 5) === 0b110) remainingBytes = 1;
            else if ((num >> 4) === 0b1110) remainingBytes = 2;
            else if ((num >> 3) === 0b11110) remainingBytes = 3;
            else return false;
        } else {
            if ((num >> 6) !== 0b10) return false;
            remainingBytes--;
        }
    }
    return remainingBytes === 0;
}
```

</TabItem>
<TabItem value="java" label="Java">

```java
public boolean validUtf8(int[] data) {
    int remainingBytes = 0;
    for (int num : data) {
        if (remainingBytes == 0) {
            if ((num >> 7) == 0) 
                continue;
            else if ((num >> 5) == 0b110) 
                remainingBytes = 1;
            else if ((num >> 4) == 0b1110) 
                remainingBytes = 2;
            else if ((num >> 3) == 0b11110) 
                remainingBytes = 3;
            else 
                return false;
        } else {
            if ((num >> 6) != 0b10) 
                return false;
            remainingBytes--;
        }
    }
    return remainingBytes == 0;
}
```

</TabItem>
</Tabs>

## 复杂度分析
时间复杂度： $O(n)$，其中 $n$ 是数据数组的长度。我们需要遍历每个字节来验证其是否符合 UTF-8 的要求。  
  
空间复杂度： $O(1)$，不需要使用额外的空间来验证字节串。
