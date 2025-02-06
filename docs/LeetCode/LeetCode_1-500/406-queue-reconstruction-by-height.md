---
sidebar_position: 406
tags:
  - array
  - sort
  - greedy
  - Medium
---

# 406.根据身高重建队列

标签: `array`, `sort`, `greedy`

难度: Medium

通过率: 73.89%

原题链接: https://leetcode.com/problems/queue-reconstruction-by-height/description/

## 题目描述
给定一个二维整数数组 `people` ，表示队列中一些人的属性（不一定按顺序）。每个人 `people[i] = [h_i, k_i]` 表示第 `i` 个人的身高 `h_i` 和他前面正好有 `k_i` 个身高大于或等于 `h_i` 的人。重建并返回输出数组格式的队列 `queue`，其中 `queue[j] = [h_j, k_j]` 是队列中第 `j` 个人的属性（`queue[0]` 是队列的前面）。

## 解题思路
题目要求对队列进行重建，使得每个人站在自己指定的位置。因此我们需要一个策略去排序和插入这些人。我们可以采取以下的策略：

1. 先将 `people` 数组进行排序。排序的规则是按高度 `h` 降序排序，如果高度相同，则按 `k` 升序排序。这样可以确保在处理更高的人时，先解决他们的站位问题。

2. 创建一个空的列表 `result` 用于存储最终的队列顺序。

3. 顺序地遍历排序后的 `people` 数组，将每个人插入到 `result` 中索引为 `k` 的位置。这是因为根据排序规则，当前处理的人不会被已经插入的更高或等高的人影响其 `k` 值。

这种策略的关键在于排序和插入操作，使得在插入过程中，已经满足了前面有 `k` 个比当前人高或等高的条件。

## 代码实现
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="python" label="Python">

```python
def reconstructQueue(people):
    # 先根据身高降序排序，若身高相等则按k值升序排列
    people.sort(key=lambda x: (-x[0], x[1]))
    result = []
    # 根据k值进行插入
    for person in people:
        result.insert(person[1], person)
    return result
```

</TabItem>
<TabItem value="cpp" label="C++">

```cpp
class Solution {
public:
    vector<vector<int>> reconstructQueue(vector<vector<int>>& people) {
        // 根据身高降序排列，若身高相等则根据k升序排列
        sort(people.begin(), people.end(), [](const vector<int>& a, const vector<int>& b) {
            return a[0] == b[0] ? a[1] < b[1] : a[0] > b[0];
        });
        vector<vector<int>> result;
        // 根据k值插入
        for (const auto& person : people) {
            result.insert(result.begin() + person[1], person);
        }
        return result;
    }
};
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
function reconstructQueue(people) {
    // 根据身高降序排列，若身高相等则按k升序
    people.sort((a, b) => a[0] === b[0] ? a[1] - b[1] : b[0] - a[0]);
    const result = [];
    // 根据k值插入
    for (const person of people) {
        result.splice(person[1], 0, person);
    }
    return result;
}
```

</TabItem>
<TabItem value="java" label="Java">

```java
import java.util.*;

class Solution {
    public int[][] reconstructQueue(int[][] people) {
        // 按照身高降序，k升序排序
        Arrays.sort(people, new Comparator<int[]>() {
            public int compare(int[] a, int[] b) {
                return a[0] == b[0] ? a[1] - b[1] : b[0] - a[0];
            }
        });
        List<int[]> result = new LinkedList<>();
        // 根据k值插入
        for (int[] person : people) {
            result.add(person[1], person);
        }
        return result.toArray(new int[result.size()][]);
    }
}
```

</TabItem>
</Tabs>

## 复杂度分析
时间复杂度：$O(n^2)$，其中 $n$ 是数组 `people` 的长度。排序的时间复杂度是 $O(n \log n)$，而插入过程每次需要线性时间，这是因为插入操作的复杂度是 $O(n)$。`result` 列表最多包含 $n$ 个元素，所以总的插入时间复杂度是 $O(n^2)$。


空间复杂度：$O(n)$，用于存储返回的结果队列，其中 $n$ 是`people` 的长度。
