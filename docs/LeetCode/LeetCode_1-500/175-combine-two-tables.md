---
sidebar_position: 175
tags:
  - hash-table
  - design
  - Easy
---

# 175. 合并两个表

标签: `hash-table`, `design`

难度: Easy

通过率: 77.2%

原题链接: https://leetcode.com/problems/combine-two-tables/description/

## 题目描述
编写一个SQL解决方案，返回每个人的姓名、城市和州的信息。如果某个 `personId` 的地址在 `Address` 表中不存在，则报告 `null`。结果可以按任意顺序返回。

## 解题思路
这个问题要求我们将两个表格的数据进行合并，并在不匹配时填充NULL值。这正是SQL中的 `LEFT JOIN` 使用场景：

1. 我们使用 `LEFT JOIN` 将 `Person` 表与 `Address` 表通过 `personId` 进行连接。
2. 在连接中，如果 `Person` 表的 `personId` 在 `Address` 表中无法找到对应的记录，则返回的 `city` 和 `state` 字段为 `NULL`。
3. 最后选择所需的列：`firstName`, `lastName`, `city`, 和 `state`。

具体的SQL语句为：
```sql
SELECT Person.firstName, Person.lastName, Address.city, Address.state
FROM Person
LEFT JOIN Address ON Person.personId = Address.personId;
```
这个查询语句能够确保从 `Person` 表中获取所有的记录，即使在 `Address` 表中找不到相应的 `personId`，仍会返回 `NULL` 以示对应的数据不存在。

## 代码实现
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="python" label="Python">

```python
# SQL 不是在 Python 中执行的，这里提供SQL查询语句：

SELECT Person.firstName, Person.lastName, Address.city, Address.state
FROM Person
LEFT JOIN Address ON Person.personId = Address.personId;
```

</TabItem>
<TabItem value="cpp" label="C++">

```cpp

```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
// SQL 不是在 JavaScript 中执行的，这里提供SQL查询语句：

SELECT Person.firstName, Person.lastName, Address.city, Address.state
FROM Person
LEFT JOIN Address ON Person.personId = Address.personId;
```

</TabItem>
<TabItem value="java" label="Java">

```java

```

</TabItem>
</Tabs>

## 复杂度分析
时间复杂度：

查询的时间复杂度通常与连接的大小相关，可以认为是$O(n \cdot m)$，其中$n$和$m$分别是`Person`和`Address`表的行数。 具体时间复杂度依赖于数据库的实现和索引系统。


空间复杂度：

查询的空间复杂度主要是结果表的大小，取决于 `Person` 表的行数大小，空间复杂度为$O(n)$。
