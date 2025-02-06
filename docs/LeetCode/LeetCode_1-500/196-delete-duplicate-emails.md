---
sidebar_position: 196
tags:
  - hash-table
  - design
  - Easy
---

# 196.删除重复的电子邮箱

标签: `hash-table`, `design`

难度: Easy

通过率: 63.47%

原题链接: https://leetcode.com/problems/delete-duplicate-emails/description/

## 题目描述
编写一个 SQL 解决方案以删除所有重复的电子邮件，只保留具有最小 id 的唯一电子邮件。该表“Person”具有两列：id和email，其中id是主键。每个电子邮件可能出现多次。删除重复的电子邮件记录，使得每个电子邮件在表中只保留一次，且具有最小的id。

## 解题思路
为了解决这个问题，我们需要删除重复的电子邮件并保留每个电子邮件中 `id` 最小的记录。我们将使用子查询来找到每个电子邮件的最小 id，并删除那些不是最小 id 的记录。基本思路是：

1. 获取每个电子邮件对应的最小 `id`。
2. 使用删除语句，删除那些 `id` 不在步骤1 中对应的最小 `id` 列表中的记录。

SQL 语句的结构如下：我们通过一个子查询获取每个电子邮件的最小 `id`，然后在与原表进行比较，以删除冗余记录。

## 代码实现
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="python" label="Python">

```python
-- 首先，我们通过子查询获取每个电子邮件的最小 id，然后删除冗余记录。
DELETE p1 FROM Person p1
JOIN Person p2
ON p1.email = p2.email AND p1.id > p2.id;
-- 这种删除操作会使得每个email仅保留最小id的记录
```

</TabItem>
<TabItem value="cpp" label="C++">

```cpp
-- 首先，我们通过子查询获取每个电子邮件的最小 id，然后删除冗余记录。
DELETE FROM Person
WHERE id NOT IN (
    SELECT MIN(id) FROM Person GROUP BY email
);
-- 这个操作会产生一个中间结果，每个email仅保留最小id的记录
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
-- 使用pandas，我们可以通过去重来完成相同的操作
import pandas as pd
# 假设 person 是 pandas 的 DataFrame
person.drop_duplicates(subset='email', keep='first', inplace=True)
# 上述代码直接对person DataFrame进行去重，保留第一个出现的记录
```

</TabItem>
<TabItem value="java" label="Java">

```java

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.Statement;

public class Solution {
    public void deleteDuplicateEmails() throws Exception {
        Connection connection = DriverManager.getConnection("jdbc:mysql://localhost/database_name", "user", "password");
        Statement statement = connection.createStatement();
        String query = "DELETE p1 FROM Person p1 JOIN Person p2 ON p1.email = p2.email AND p1.id > p2.id";
        statement.execute(query);
        statement.close();
        connection.close();
    }
    // Java 的代码使用 JDBC 来连接数据库，并执行删除操作。
}
```

</TabItem>
</Tabs>

## 复杂度分析
时间复杂度：

由于我们执行的是 SQL 删除操作，处理每条记录的时间复杂度是 O(1)，但结合所有记录后，时间复杂度为 O(n) ，其中 n 是表中记录的总数。

空间复杂度：

由于我们不引入额外的数据结构，仅仅是在原始表上进行删除操作，空间复杂度为 O(1)。
