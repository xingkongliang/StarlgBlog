---
sidebar_position: 335
tags:
  - array
  - math
  - greedy
  - Hard
---

# 335.自相交路径

标签: `array`, `math`, `greedy`

难度: Hard

通过率: 31.28%

原题链接: https://leetcode.com/problems/self-crossing/description/

## 题目描述
给定一个整数数组 `distance`。你从平面上的点 (0, 0) 开始，然后向北移动 `distance[0]` 米，接着向西移动 `distance[1]` 米，再向南移动 `distance[2]` 米，向东移动 `distance[3]` 米，以此类推。换句话说，在每次移动后，你的方向会逆时针变换。  
返回 `true` 如果你的路径与自身相交，否则返回 `false`。

## 解题思路
这个问题涉及判断一个路径是否与自己的路径相交。路径以顺时针的北-西-南-东方向行进，我们可以通过以下方式判断路径是否会自相交：  
1. **无交叉情况 (初始)**：起始阶段起步，最多可能以类似螺旋状继续前行，而不形成自相交。即长距离的内圈不会被下一圈的任一边长所跨越。  
2. **达到自相交条件的情况**：  
   1. 如果当前步 `i (i >= 3)` 与 `i - 3` 折返回相交，我们有条件 `distance[i] >= distance[i-2]` 且 `distance[i-1] <= distance[i-3]`。  
   2. 如果当前步 `i (i >= 4)` 与 `i - 4` 折相交（边重叠），我们有特别的条件：`distance[i-1] == distance[i-3]` 且 `distance[i] + distance[i-4] >= distance[i-2]`。  
   3. 如果当前步 `i (i >= 5)` 和 `i - 5` 折相交，我们需要条件 `distance[i-2] >= distance[i-4]`，`distance[i] >= distance[i-2] - distance[i-4]`，以及 `distance[i-1] <= distance[i-3]`。  
算法思路：  
- 根据上述条件，我们按顺序遍历 `distance` 数组，并以贪心算法进行判断是否存在自相交情况。

## 代码实现
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="python" label="Python">

```python
def isSelfCrossing(distance):
    # 遍历每个移动的距离，检测是否出现自相交
    for i in range(3, len(distance)):
        # 情况 1: 当前路径与走两步前路径相交
        if distance[i] >= distance[i-2] and distance[i-1] <= distance[i-3]:
            return True
        # 情况 2: 当前路径与走三步前路径相交
        if i >= 4 and distance[i-1] == distance[i-3] and distance[i] + distance[i-4] >= distance[i-2]:
            return True
        # 情况 3: 当前路径与走四步前路径相交
        if i >= 5 and distance[i-2] >= distance[i-4] and distance[i] >= distance[i-2] - distance[i-4] and distance[i-1] <= distance[i-3]:
            return True
    return False

# 测试示例
distance = [2, 1, 1, 2]
print(isSelfCrossing(distance))  # 输出: True
```

</TabItem>
<TabItem value="cpp" label="C++">

```cpp
class Solution {
public:
    bool isSelfCrossing(vector<int>& distance) {
        for (int i = 3; i < distance.size(); ++i) {
            // 情况 1: 检查是否交叉
            if (distance[i] >= distance[i-2] && distance[i-1] <= distance[i-3])
                return true;
            // 情况 2: 当路径与三步前交叉
            if (i >= 4 && distance[i-1] == distance[i-3] && distance[i] + distance[i-4] >= distance[i-2])
                return true;
            // 情况 3: 当路径与四步前交叉
            if (i >= 5 && distance[i-2] >= distance[i-4] && distance[i] >= distance[i-2] - distance[i-4] && distance[i-1] <= distance[i-3])
                return true;
        }
        return false;
    }
};

// 示例测试
std::vector<int> distance{2, 1, 1, 2};
Solution sol;
bool res = sol.isSelfCrossing(distance); // 输出: true
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
function isSelfCrossing(distance) {
    for (let i = 3; i < distance.length; i++) {
        // 情况 1: 当前路径两步前交叉
        if (distance[i] >= distance[i - 2] && distance[i - 1] <= distance[i - 3]) {
            return true;
        }
        // 情况 2: 当前路径三步前重叠
        if ((i >= 4) && (distance[i - 1] === distance[i - 3]) && (distance[i] + distance[i - 4] >= distance[i - 2])) {
            return true;
        }
        // 情况 3: 当前路径四步前交叉
        if ((i >= 5) && (distance[i - 2] >= distance[i - 4]) && (distance[i] >= distance[i - 2] - distance[i - 4]) && (distance[i - 1] <= distance[i - 3])) {
            return true;
        }
    }
    return false;
}

// 测试示例
const distance = [2, 1, 1, 2];
console.log(isSelfCrossing(distance));  // 输出: true
```

</TabItem>
<TabItem value="java" label="Java">

```java
public class Solution {
    public boolean isSelfCrossing(int[] distance) {
        for (int i = 3; i < distance.length; i++) {
            // 情况 1: 检查是否交叉
            if (distance[i] >= distance[i-2] && distance[i-1] <= distance[i-3])
                return true;
            // 情况 2: 检查三步重叠
            if (i >= 4 && distance[i-1] == distance[i-3] && distance[i] + distance[i-4] >= distance[i-2])
                return true;
            // 情况 3: 检查四步交叉
            if (i >= 5 && distance[i-2] >= distance[i-4] && distance[i] >= distance[i-2] - distance[i-4] && distance[i-1] <= distance[i-3])
                return true;
        }
        return false;
    }

    // 测试示例
    public static void main(String[] args) {
        Solution sol = new Solution();
        int[] distance = {2, 1, 1, 2};
        System.out.println(sol.isSelfCrossing(distance));  // 输出: true
    }
}
```

</TabItem>
</Tabs>

## 复杂度分析
时间复杂度：该算法只需要遍历一次 `distance` 数组，所以时间复杂度是 $O(n)$，其中 $n$ 是 `distance` 的长度。  
  
空间复杂度：算法只使用了常数级别的额外空间，因此空间复杂度是 $O(1)$。
