---
sidebar_position: 197
tags:
  - math
  - hash-table
  - greedy
  - array
  - Easy
---

# 197.温度上升

标签: `math`, `hash-table`, `greedy`, `array`

难度: Easy

通过率: 49.45%

原题链接: https://leetcode.com/problems/rising-temperature/description/

## 题目描述
编写一个SQL查询以找出天气表中所有温度与前一天相比上升的日期id。

## 解题思路
我们需要在Weather表中找到那些温度比前一天更高的日期的id。可以通过自连接（self-join）的方法解决这个问题。具体步骤如下：

1. 首先，将 `Weather` 表自己连接，通过 `recordDate` 字段判断 `date` 和 `date - 1` 的温度关系。
2. 连接条件 `W1.recordDate = date_add(W2.recordDate, interval 1 day)` 用于找出 `W2` 日期的前一天是 `W1`。
3. 比较 `W1` 和 `W2` 的 `temperature` 字段，过滤出 `W2.temperature` 大于 `W1.temperature` 的记录，这意味着温度上升。
4. 最后只选择 `W2` 的 `id` 字段输出即可。

## 代码实现
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="python" label="Python">

```python
SELECT W2.id
FROM Weather W1
JOIN Weather W2 ON W1.recordDate = DATE_ADD(W2.recordDate, INTERVAL 1 DAY)
WHERE W2.temperature > W1.temperature;
```

</TabItem>
<TabItem value="cpp" label="C++">

```cpp

```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript

```

</TabItem>
<TabItem value="java" label="Java">

```java

```

</TabItem>
</Tabs>

## 复杂度分析
时间复杂度为 $O(n)$，其中 $n$ 是天气记录的数量。虽然我们使用连接操作，但由于是简单的自连接，时间复杂度为线性的近似。  
  
空间复杂度为 $O(1)$，因为查询本身只返回id，且无额外的数据结构存储需求。
