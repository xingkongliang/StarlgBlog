---
sidebar_position: 262
tags:
  - hash-table
  - sort
  - string
  - Hard
---

# 262.行程和用户

标签: `hash-table`, `sort`, `string`

难度: Hard

通过率: 36.75%

原题链接: https://leetcode.com/problems/trips-and-users/description/

## 题目描述
在给定的"2013-10-01"到"2013-10-03"的日期范围内，计算未被禁用户的行程请求的取消率（当日取消请求数目除以未被禁用户的总请求数目）。需要将取消率四舍五入保留两位小数。

## 解题思路
我们需要计算每一天的取消率，其中只包含未被禁用户的请求。取消率的计算方法是：取消请求的数量除以总请求数量。在此问题中，我们需要联接两个表，将请求列表中涉及的用户和司机筛选出来，并验证他们是否被禁，在筛选出未被禁止的用户的请求之后，统计出每一天取消的请求数量和总请求数量即可。具体步骤如下：

1. 使用`LEFT JOIN`将`Trips`和`Users`按`client_id`和`users_id`合并，以筛选非被禁客户端用户的请求。
2. 再次使用`LEFT JOIN`将步骤1的结果与`Users`按`driver_id`和`users_id`进行合并，以筛选出非被禁的司机用户的请求。
3. 在合并后的表中，过滤日期在指定区间内的请求。
4. 使用`GROUP BY`按日期分组，分别统计每一天的总请求数和取消数（状态为`cancelled_by_driver`或`cancelled_by_client`）。
5. 计算每一天的取消率为`取消数 / 总请求数`，并对结果四舍五入保留两位小数。

## 代码实现
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="python" label="Python">

```python
# SQL方案：
SELECT 
    T1.request_at AS Day,
    ROUND(SUM(IF(T1.status = 'cancelled_by_driver' OR T1.status = 'cancelled_by_client', 1, 0)) / COUNT(T1.id), 2) AS 'Cancellation Rate'
FROM 
    Trips T1
JOIN 
    Users U1 ON T1.client_id = U1.users_id AND U1.banned = 'No'
JOIN 
    Users U2 ON T1.driver_id = U2.users_id AND U2.banned = 'No'
WHERE 
    T1.request_at BETWEEN '2013-10-01' AND '2013-10-03'
GROUP BY 
    T1.request_at;
```

</TabItem>
<TabItem value="cpp" label="C++">

```cpp
## C++ solution is not applicable - this is a SQL/Database problem and could not be addressed using C++.
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
## JavaScript solution is not applicable - this is a SQL/Database problem and could not be addressed using JavaScript.
```

</TabItem>
<TabItem value="java" label="Java">

```java
## Java solution is not applicable - this is a SQL/Database problem and could not be addressed using Java.
```

</TabItem>
</Tabs>

## 复杂度分析
时间复杂度：由于这是一个数据库查询问题，故时间复杂度依赖于数据库引擎的实现和数据的大小。对于索引和合适的查询优化，通常在 $O(N)$ 的范围内，其中 $N$ 是条目的数量。  

空间复杂度：空间复杂度同样依赖数据库，通常是 $O(1)$，因为结果集大小和特定的索引会影响空间使用，但一般在内存中占比不大。
