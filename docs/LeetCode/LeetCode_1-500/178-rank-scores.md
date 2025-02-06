---
sidebar_position: 178
tags:
  - array
  - sort
  - Medium
---

# 178.排名分数

标签: `array`, `sort`

难度: Medium

通过率: 64.04%

原题链接: https://leetcode.com/problems/rank-scores/description/

## 题目描述
给定一个包含每个游戏分数的表格，要找出各分数的排名。排名应该按照以下规则计算：

- 分数从高到低排名。
- 如果两个分数相同，则它们的排名应该相同。
- 在出现平局后，接下来的排名数字应该是下一个连续的整数值，即，排名之间不应该有空缺。

返回结果表按分数降序排列。示例如下：

**示例输入：**

Scores 表格：

    +----+-------+
    | id | score |
    +----+-------+
    | 1  | 3.50  |
    | 2  | 3.65  |
    | 3  | 4.00  |
    | 4  | 3.85  |
    | 5  | 4.00  |
    | 6  | 3.65  |
    +----+-------+

**示例输出：**

    +-------+------+
    | score | rank |
    +-------+------+
    | 4.00  | 1    |
    | 4.00  | 1    |
    | 3.85  | 2    |
    | 3.65  | 3    |
    | 3.65  | 3    |
    | 3.50  | 4    |
    +-------+------+


## 解题思路
在这个问题中，我们需要根据给定的分数计算排名。我们可以通过以下步骤来实现：

1. 我们首先需要确保按照分数降序排序。
2. 对于每个分数，我们需要计算出其排名，注意这里要处理相同分数拥有相同排名，并且不出现排名空缺。例如，如果两个分数并列第一，下一个分数应当是第二名。

为了实现上述逻辑，我们可以使用数据库的功能进行排序和排名计算。一个简单有效的方法是使用窗口函数。通过给分数做一个自定义的排名，根据相同的分数值计算出相同排名，并使用窗口函数消除排名空缺。

在处理数据库排名时，通常使用`DENSE_RANK()`来保证满足上述的排名要求。

## 代码实现
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="python" label="Python">

```python
# 在这个例子中，我们假设有一个数据库表Scores
# 我们可以通过以下SQL查询获得结果：

SELECT score,
       DENSE_RANK() OVER (ORDER BY score DESC) AS rank
FROM Scores;
```

</TabItem>
<TabItem value="cpp" label="C++">

```cpp
-- SQL 代码在此处
-- 我们使用 DENSE_RANK() 函数来计算排名，它会自动处理相同的分数具有相同排名，并消除排名空缺

SELECT score, 
       DENSE_RANK() OVER (ORDER BY score DESC) AS rank 
FROM Scores;
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript

```

</TabItem>
<TabItem value="java" label="Java">

```java
// Java代码通过JDBC执行SQL查询
// 假设已经存在一个连接对象 conn
String sql = "SELECT score, DENSE_RANK() OVER (ORDER BY score DESC) AS rank FROM Scores";
try (Statement stmt = conn.createStatement()) {
    ResultSet rs = stmt.executeQuery(sql);
    while (rs.next()) {
        System.out.println("Score: " + rs.getDouble("score") + ", Rank: " + rs.getInt("rank"));
    }
} catch (SQLException e) {
    e.printStackTrace();
}
```

</TabItem>
</Tabs>

## 复杂度分析
时间复杂度：由于需要对分数进行排序，所以时间复杂度为 $O(n\log n)$，其中 $n$ 是分数的数量。  
  
空间复杂度：只需要常数级别的额外空间来存储输出结果，空间复杂度为 $O(1)$。
