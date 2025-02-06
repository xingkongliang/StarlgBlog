---
sidebar_position: 182
tags:
  - hash-table
  - string
  - map
  - Easy
---

# 182.重复的电子邮箱

标签: `hash-table`, `string`, `map`

难度: Easy

通过率: 71.86%

原题链接: https://leetcode.com/problems/duplicate-emails/description/

## 题目描述
编写一个 SQL 查询，找出所有重复的电子邮箱。

## 解题思路
要找出重复的电子邮箱，我们可以使用 SQL 聚合函数 `COUNT` 来对 `Person` 表中的 `email` 字段进行分组，同时只筛选出出现次数大于1的电子邮箱。

## 代码实现
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="python" label="Python">

```python
# Python 并不支持直接操作 SQL 数据库，但可以使用 SQLAlchemy 等库连接数据库并进行查询
# 首先需要连接到数据库，然后执行如下 SQL 查询：

SQL = '''
SELECT email
FROM Person
GROUP BY email
HAVING COUNT(email) > 1
'''

# 然后在连接的数据库上执行这个 SQL 查询
```

</TabItem>
<TabItem value="cpp" label="C++">

```cpp
// 在 C++ 中常常使用 MySQL 的 C++ 连接器来执行 SQL 查询
// 这里假设我们有一个数据库连接 conn

std::string query = "SELECT email FROM Person GROUP BY email HAVING COUNT(email) > 1";
// 然后执行 query 得到结果
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
// 在 JavaScript 中常用 Node.js 的 mysql 库来连接并操作数据库
const query = `SELECT email FROM Person GROUP BY email HAVING COUNT(email) > 1`;
// 执行这个查询并获取结果
```

</TabItem>
<TabItem value="java" label="Java">

```java
// 在 Java 中可以使用 JDBC 进行数据库操作
String query = "SELECT email FROM Person GROUP BY email HAVING COUNT(email) > 1";
// 使用 JDBC 执行查询并获取结果集
```

</TabItem>
</Tabs>

## 复杂度分析
SQL 查询的时间复杂度主要取决于数据表的大小以及索引的优化。对于 `N` 条记录的表，GROUP BY 操作的平均时间复杂度为 $O(N \log N)$，但实际复杂度受数据库实现和索引情况影响。  
  
空间复杂度同样取决于数据库引擎的具体实现，通常为 $O(1)$，但存储中间结果的临时表会占用一定空间。
