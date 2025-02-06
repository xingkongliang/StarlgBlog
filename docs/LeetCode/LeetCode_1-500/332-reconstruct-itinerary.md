---
sidebar_position: 332
tags:
  - depth-first-search
  - graph
  - Hard
---

# 332.重建行程

标签: `depth-first-search`, `graph`

难度: Hard

通过率: 43.37%

原题链接: https://leetcode.com/problems/reconstruct-itinerary/description/

## 题目描述
给你一组航空机票，每张票 tickets[i] = [fromi, toi] 代表飞机的起飞机场和降落机场。请你从中重建一个行程顺序并返回。行程必须以 “JFK” 开头，如果有多个行程方案，请返回按字典序最小的那个行程。当读作一个单一字符串时苹果词典序更小。假设所有的机票都能组成至少一个有效的行程。你必须使用所有的票一次且仅能使用一次。

## 解题思路
本题可以建模为有向图的路径问题，其中机票代表图中的有向边，机场代表节点。我们需要构建一个从 "JFK" 出发且覆盖所有边的欧拉路径，同时选择字典序最小的路径。问题的核心在于：

1. 构建图：使用邻接表来存储每个机场到其他机场的映射，起始机场作为键，终点机场作为值列表。为了字典序优先考虑，我们需要对每个邻接列表按终点机场的字母顺序进行排序。

2. 深度优先搜索（DFS）：从 "JFK" 开始进行深度优先搜索，始终选择剩余机票中字母序小的目的地进行递归，直到到达无法继续前进的点（没有出去的边）。

3. 用栈记录路径：在搜索过程中用栈记录已经走过的路径，确保实现欧拉路径的记录。由于是后序遍历，所以每次在无法继续前进时，将机场添加到结果集前。

4. 构建结果：由于路径是后序添加的，最终结果需要将栈中路径逆序输出即为所求行程。

## 代码实现
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="python" label="Python">

```python
from collections import defaultdict
```

</TabItem>
<TabItem value="cpp" label="C++">

```cpp
def findItinerary(tickets):
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
    # 用邻接表存储图，使用 defaultdict(list)
```

</TabItem>
<TabItem value="java" label="Java">

```java
    graph = defaultdict(list)
```

</TabItem>
</Tabs>

## 复杂度分析
时间复杂度：$O(E \log E)$，其中 $E$ 是机票的数量。我们需要对每个机场的目的地列表进行排序，以及遍历所有机票建立图结构。  
  
空间复杂度：$O(V + E)$，其中 $V$ 是不同机场的数量，$E$ 是机票的数量。我们存储了一个图的邻接表，以及一个栈用于路径。
