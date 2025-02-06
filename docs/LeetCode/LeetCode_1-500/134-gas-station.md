---
sidebar_position: 134
tags:
  - greedy
  - array
  - Medium
---

# 134.加油站

标签: `greedy`, `array`

难度: Medium

通过率: 45.77%

原题链接: https://leetcode.com/problems/gas-station/description/

## 题目描述
在一个环形路上有 n 个加油站，其中第 i 个加油站有 gas[i] 升汽油。你有一辆无限容量的油箱，从第 i 个加油站驶往下一个 i + 1 个加油站需要消耗 cost[i] 升汽油。你从某个加油站出发，初始时油箱为空。请问按照顺时针方向绕行一圈，能否到达出发的加油站。如果可以，返回出发的起始加油站的索引；否则，返回 -1。如果存在解，保证它是唯一的。

## 解题思路
要解决这个问题，我们可以使用贪心算法。这个问题的关键点在于，如果从某个加油站出发，无法继续前进，那么从这个加油站之前的任何一个加油站出发也无法环绕一圈。这是因为汽油的亏空在某个点达到了最低值，而从这里之后的点出发更有可能完成整个循环。如下是详细的步骤：  

1. 初始化三个变量：总汽油余量`total_tank`，当前汽油余量`current_tank`，起始位置`starting_station`。
2. 遍历每个加油站：
   - 更新总汽油余量`total_tank`为 `total_tank += gas[i] - cost[i]`。
   - 更新当前汽油余量`current_tank`为 `current_tank += gas[i] - cost[i]`。
   - 如果`current_tank`小于零，表示从起始位置`starting_station`无法到达当前位置i，更新起始位置`starting_station`为 i + 1，并重置`current_tank`为0。
3. 遍历结束后，如果`total_tank`大于等于零，返回起始位置`starting_station`，否则返回 -1。这意味着不仅局部的单次行驶是可行的，并且总体上是可以完成路径环绕的。

## 代码实现
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="python" label="Python">

```python
def canCompleteCircuit(gas, cost):
    # 初始化总汽油余量，总结算需要确定能否一圈结束
    total_tank = 0
    # 当前汽油余量，用来决定从哪里开始
    current_tank = 0
    # 起始加油站索引
    starting_station = 0
    
    for i in range(len(gas)):
        total_tank += gas[i] - cost[i]
        current_tank += gas[i] - cost[i]
        
        # 如果当前汽油余量小于0，意味着无法到达这里
        if current_tank < 0:
            # 更新起始加油站为下一个
            starting_station = i + 1
            # 重置当前汽油余量
            current_tank = 0

    # 检查总汽油余量是否允许绕行一圈
    return starting_station if total_tank >= 0 else -1

```

</TabItem>
<TabItem value="cpp" label="C++">

```cpp
int canCompleteCircuit(vector<int>& gas, vector<int>& cost) {
    int total_tank = 0;
    int current_tank = 0;
    int starting_station = 0;
    
    for (int i = 0; i < gas.size(); ++i) {
        total_tank += gas[i] - cost[i];
        current_tank += gas[i] - cost[i];
        if (current_tank < 0) {
            starting_station = i + 1;
            current_tank = 0;
        }
    }
    return total_tank >= 0 ? starting_station : -1;
}
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
function canCompleteCircuit(gas, cost) {
    let totalTank = 0;
    let currentTank = 0;
    let startingStation = 0;
    
    for (let i = 0; i < gas.length; i++) {
        totalTank += gas[i] - cost[i];
        currentTank += gas[i] - cost[i];
        if (currentTank < 0) {
            startingStation = i + 1;
            currentTank = 0;
        }
    }
    return totalTank >= 0 ? startingStation : -1;
}
```

</TabItem>
<TabItem value="java" label="Java">

```java
public int canCompleteCircuit(int[] gas, int[] cost) {
    int totalTank = 0;
    int currentTank = 0;
    int startingStation = 0;
    
    for (int i = 0; i < gas.length; i++) {
        totalTank += gas[i] - cost[i];
        currentTank += gas[i] - cost[i];
        if (currentTank < 0) {
            startingStation = i + 1;
            currentTank = 0;
        }
    }
    return totalTank >= 0 ? startingStation : -1;
}
```

</TabItem>
</Tabs>

## 复杂度分析
时间复杂度: $O(n)$，其中 $n$ 是加油站的数量。我们仅需要遍历数组一次。  
空间复杂度: $O(1)$，只使用了常数级别的额外空间。
