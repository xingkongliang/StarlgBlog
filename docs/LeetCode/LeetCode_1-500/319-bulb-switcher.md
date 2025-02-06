---
sidebar_position: 319
tags:
  - math
  - Medium
---

# 319.灯泡开关

标签: `math`

难度: Medium

通过率: 53.48%

原题链接: https://leetcode.com/problems/bulb-switcher/description/

## 题目描述
有 $n$ 个灯泡，初始时都是关闭的。第一次，你打开所有的灯泡，然后你关闭每隔一个的灯泡。第三轮，你每隔两个灯泡切换其状态（若关闭则开启，若开启则关闭）。对于第 $i$ 轮，你每隔 $i$ 个灯泡切换其状态。在第 $n$ 轮，你只切换最后一个灯泡。返回在进行完所有轮之后点亮的灯泡数。

## 解题思路
这是一个经典的数学问题。每个灯泡的状态取决于其位置因数（即可以被多少数字整除）。例如果第 $i$ 个灯泡的位置是 6，那么在第 1, 2, 3, 6 轮中状态会被翻转 4 次。一般来说，如果灯泡位置 $i$ 有奇数个因数，那么最后该灯泡是点亮的；如果是偶数个因数，那么最后该灯泡是熄灭的。

只有完全平方数才有奇数个因数，因为它们有一个数在平方根的位置没有对应的配对因数。例如 16 的因数是 1, 2, 4, 8, 16，其中 4 没有配对因数（也就是 4 * 4 是完全平方数，因此有奇数个因数）。

因此，问题的答即为从 1 到 n 之间完全平方数的数量，这等价于 $\lfloor \sqrt{n} \rfloor$，这表示从 1 到 n 之间平方根取整后的结果。

## 代码实现
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="python" label="Python">

```python
import math  # 导入数学模块以使用数学函数

def bulbSwitch(n):
    # 计算小于等于 n 的完全平方数的数量
    return int(math.sqrt(n))  # 返回下取整的平方根

```

</TabItem>
<TabItem value="cpp" label="C++">

```cpp
class Solution {
public:
    int bulbSwitch(int n) {
        // 计算小于等于 n 的完全平方数数量
        return (int)sqrt(n);  // 转换为整数以表示下取整
    }
};

```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
function bulbSwitch(n) {
    // 计算小于等于 n 的完全平方数的数量
    return Math.floor(Math.sqrt(n));  // 使用 Math.floor 进行下取整
}

```

</TabItem>
<TabItem value="java" label="Java">

```java
public class Solution {
    public int bulbSwitch(int n) {
        // 计算小于等于 n 的完全平方数的数量
        return (int)Math.sqrt(n);  // 转换为整数以表示下取整
    }
}
```

</TabItem>
</Tabs>

## 复杂度分析
时间复杂度为 $O(1)$  
  
空间复杂度为 $O(1)$
