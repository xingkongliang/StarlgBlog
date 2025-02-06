---
sidebar_position: 433
tags:
  - breadth-first-search
  - hash-table
  - Medium
---

# 433.最小基因变化

标签: `breadth-first-search`, `hash-table`

难度: Medium

通过率: 54.77%

原题链接: https://leetcode.com/problems/minimum-genetic-mutation/description/

## 题目描述
一个基因字符串可以用一个8个字符长的字符串来表示，字符选择来自'A'，'C'，'G'，'T'。假设我们需要研究从一个基因字符串 startGene 到一个基因字符串 endGene 的变异，其中一次变异定义为基因字符串中的一个字符发生变化。例如，"AACCGGTT" --> "AACCGGTA" 是一次变异。还有一个基因库 bank 记录了所有有效的基因变异。基因字符串必须在基因库中才算有效。给定两个基因字符串 startGene 和 endGene 以及一个基因库 bank，返回从 startGene 变异到 endGene 所需的最少变异次数。如果没有这样的变异，返回 -1。起始点假定为有效，因此它可能不包含在基因库中。

## 解题思路
要解决这个问题，可以使用广度优先搜索（BFS）。每次从当前基因字符串向基因库中的有效变体进行一次变异，逐步探索能够到达终点的路径。具体步骤如下：  
1. 首先，将起始基因字符串加入队列并初始化步数为0。  
2. 使用一个集合来记录基因库中的有效基因字符串。  
3. 开始广度优先搜索：  
   - 每次从队列中取出一个基因字符串，并对每一个位置的字符进行变更，尝试 'A', 'C', 'G', 'T' 这四个不同字符。  
   - 如果得到的新基因字符串在基因库且没有被访问过，则将其加入队列。  
   - 一旦新基因字符串与终点基因字符串相同，返回当前的步数加一，因为这意味着找到了到达终点的路径。  
4. 如果耗尽了队列也没能找到路径，则返回-1表示无法达成变异。

## 代码实现
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="python" label="Python">

```python
from collections import deque` `def minMutation(startGene: str, endGene: str, bank: list) -> int:` `    bank_set = set(bank)` `    if endGene not in bank_set:` `        return -1` `    queue = deque([(startGene, 0)])` `    genes = ['A', 'C', 'G', 'T']` `    visited = set()` `    while queue:` `        current_gene, steps = queue.popleft()` `        if current_gene == endGene:` `            return steps` `        for i in range(len(current_gene)):` `            for gene in genes:` `                if current_gene[i] != gene:` `                    next_gene = current_gene[:i] + gene + current_gene[i+1:]` `                    if next_gene in bank_set and next_gene not in visited:` `                        visited.add(next_gene)` `                        queue.append((next_gene, steps + 1))` `    return -1
```

</TabItem>
<TabItem value="cpp" label="C++">

```cpp
```cpp
#include <unordered_set>
#include <queue>
using namespace std;

class Solution {
public:
    int minMutation(string startGene, string endGene, vector<string>& bank) {
        unordered_set<string> bank_set(bank.begin(), bank.end());
        if (bank_set.find(endGene) == bank_set.end()) return -1;
        
        queue<pair<string, int>> q;
        q.push({startGene, 0});
        unordered_set<string> visited;
        visited.insert(startGene);
        
        vector<char> genes = {'A', 'C', 'G', 'T'};
        
        while (!q.empty()) {
            auto [current_gene, steps] = q.front(); q.pop();
            if (current_gene == endGene) return steps;
            
            for (int i = 0; i < current_gene.size(); ++i) {
                char original_char = current_gene[i];
                for (char g : genes) {
                    if (g != original_char) {
                        current_gene[i] = g;
                        if (bank_set.find(current_gene) != bank_set.end() && visited.find(current_gene) == visited.end()) {
                            visited.insert(current_gene);
                            q.push({current_gene, steps + 1});
                        }
                    }
                }
                current_gene[i] = original_char;
            }
        }
        return -1;
    }
};
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
function minMutation(startGene, endGene, bank) {`
    const bankSet = new Set(bank);`
    if (!bankSet.has(endGene)) return -1;`
  `
    const queue = [[startGene, 0]];`
    const genes = ['A', 'C', 'G', 'T'];`
    const visited = new Set();`
    visited.add(startGene);`
  `
    while (queue.length) {`
        const [currentGene, steps] = queue.shift();`
        if (currentGene === endGene) return steps;`
  `
        for (let i = 0; i < currentGene.length; i++) {`
            for (let gene of genes) {`
                if (currentGene[i] !== gene) {`
                    const nextGene = currentGene.slice(0, i) + gene + currentGene.slice(i + 1);`
                    if (bankSet.has(nextGene) && !visited.has(nextGene)) {`
                        visited.add(nextGene);`
                        queue.push([nextGene, steps + 1]);`
                    }`
                }`
            }`
        }`
    }`
    return -1;`
}`
```

</TabItem>
<TabItem value="java" label="Java">

```java
import java.util.*;`
`
public class Solution {`
  `
    public int minMutation(String startGene, String endGene, String[] bank) {`
        Set<String> bankSet = new HashSet<>(Arrays.asList(bank));`
        if (!bankSet.contains(endGene)) return -1;`
  `
        Queue<Pair<String, Integer>> queue = new LinkedList<>();`
        queue.add(new Pair<>(startGene, 0));`
        Set<String> visited = new HashSet<>();`
        visited.add(startGene);`
  `
        char[] genes = {'A', 'C', 'G', 'T'};`
  `
        while (!queue.isEmpty()) {`
            Pair<String, Integer> current = queue.poll();`
            String currentGene = current.getKey();`
            int steps = current.getValue();`
            if (currentGene.equals(endGene)) return steps;`
  `
            for (int i = 0; i < currentGene.length(); i++) {`
                char originalChar = currentGene.charAt(i);`
                for (char gene : genes) {`
                    if (gene != originalChar) {`
                        char[] newGeneArray = currentGene.toCharArray();`
                        newGeneArray[i] = gene;`
                        String nextGene = new String(newGeneArray);`
                        if (bankSet.contains(nextGene) && !visited.contains(nextGene)) {`
                            visited.add(nextGene);`
                            queue.add(new Pair<>(nextGene, steps + 1));`
                        }`
                    }`
                }`
            }`
        }`
        return -1;`
    }`
}

```

</TabItem>
</Tabs>

## 复杂度分析
时间复杂度： 对于每个基因字符串，我们尝试 8 个位置每个位置尝试 3 个新字符，因此复杂度为 $O(8 \times 3 \times n)$，其中 $n$ 是基因库的大小（最多为 10）。由于 $n$ 比较小，所以这个方法是高效的。  
  
空间复杂度： 我们需要使用额外的空间来保存所访问的基因和队列信息，因此复杂度为 $O(n)$。
