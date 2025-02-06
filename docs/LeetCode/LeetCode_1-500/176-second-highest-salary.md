---
sidebar_position: 176
tags:
  - sort
  - math
  - Medium
---

# 176.第二高的薪水

标签: `sort`, `math`

难度: Medium

通过率: 42.37%

原题链接: https://leetcode.com/problems/second-highest-salary/description/

## 题目描述
编写一个解决方案，从Employee表中找到第二高的不同薪水。如果不存在第二高的薪水，返回null。

## 解题思路
为了解决这个问题，我们可以利用SQL的排序和限制功能。具体步骤如下：
1. 从`Employee`表中选择`salary`列，并使用`DISTINCT`来去除重复的薪水。
2. 按照薪水的递减顺序排序薪资。
3. 使用`LIMIT`和`OFFSET`操作来获取第二高的薪水：通过`LIMIT 1 OFFSET 1`，我们可以跳过最高薪水并选择第二个最高薪水。
4. 在没有足够不同薪水的情况下（例如，只有一个员工或者所有员工有相同的薪水），将返回null。

## 代码实现
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="python" label="Python">

```python
import pandas as pd

# 假设你已经有一个DataFrame df，其中包含 'id' 和 'salary' 两列

def second_highest_salary(df):
    # 排序并只选择不同的薪水
    distinct_salaries = df['salary'].drop_duplicates().sort_values(ascending=False)
    
    # 判断是否存在第二高薪水
    if len(distinct_salaries) < 2:
        return None
    else:
        return distinct_salaries.iloc[1]

# 示例使用
# df = pd.DataFrame({'id': [1, 2, 3], 'salary': [100, 200, 300]})
# result = second_highest_salary(df)
# print(result) # 输出：200
```

</TabItem>
<TabItem value="cpp" label="C++">

```cpp
SELECT (SELECT DISTINCT salary FROM Employee ORDER BY salary DESC LIMIT 1 OFFSET 1) AS SecondHighestSalary;
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
// 使用JavaScript作为Node.js环境中的SQL查询
const secondHighestSalary = (db) => {
  return db.query(
    `SELECT (SELECT DISTINCT salary FROM Employee ORDER BY salary DESC LIMIT 1 OFFSET 1) AS SecondHighestSalary;`
  );
};
// 示例数据库查询假设：db为数据库连接对象
// 注意：在真正的Node.js实践中，需要处理异常或设置连接池等
```

</TabItem>
<TabItem value="java" label="Java">

```java
import java.sql.*;

public class SecondHighestSalary {
    public static void main(String[] args) {
        // 数据库连接对象，请根据实际情况替换
        Connection connection = null;
        try {
            Statement statement = connection.createStatement();
            String query = "SELECT (SELECT DISTINCT salary FROM Employee ORDER BY salary DESC LIMIT 1 OFFSET 1) AS SecondHighestSalary;";
            ResultSet resultSet = statement.executeQuery(query);
            if (resultSet.next()) {
                System.out.println(resultSet.getString("SecondHighestSalary"));
            }
        } catch (SQLException e) {
            e.printStackTrace();
        } finally {
            // 确保关闭数据库连接
        }
    }
}
```

</TabItem>
</Tabs>

## 复杂度分析
时间复杂度：获取所有不同的薪水并排序为 $O(n \log n)$，其中 $n$ 是员工人数。  

空间复杂度：此解决方案不需要额外的空间来存储其他数据，空间复杂度为 $O(1)$，除了存储不同薪水的必要空间。
