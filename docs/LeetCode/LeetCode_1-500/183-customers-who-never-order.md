---
sidebar_position: 183
tags:
  - hash-table
  - design
  - Easy
---

# 183.从未下订单的客户

标签: `hash-table`, `design`

难度: Easy

通过率: 70.02%

原题链接: https://leetcode.com/problems/customers-who-never-order/description/

## 题目描述
编写一个解决方案，以查找从未下过订单的所有客户。返回的结果表按任意顺序排列。

## 解题思路
我们可以通过左连接(LEFT JOIN) `Customers` 表和 `Orders` 表，然后选择那些在 `Orders` 表中没有匹配记录的 `Customers`，来找到从未下订单的客户。具体思路如下：

1. 从 `Customers` 表中选择所有客户。
2. 通过左连接将 `Customers` 表和 `Orders` 表连接在一起，条件为 `Customers.id = Orders.customerId`。
3. 选择连接结果中 `Orders.customerId` 为空的所有 `Customers`，这些客户就是从未下订单的客户。

## 代码实现
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="python" label="Python">

```python
# 导入SQLite库
import sqlite3

# 创建内存中的数据库并建立连接
con = sqlite3.connect(':memory:')

# 创建游标对象
cur = con.cursor()

# 创建Customers表
cur.execute('''
CREATE TABLE Customers (
    id INT PRIMARY KEY,
    name VARCHAR(255)
);
''')

# 创建Orders表
cur.execute('''
CREATE TABLE Orders (
    id INT PRIMARY KEY,
    customerId INT,
    FOREIGN KEY(customerId) REFERENCES Customers(id)
);
''')

# 插入数据到Customers
cur.executemany('INSERT INTO Customers (id, name) VALUES (?, ?);',
                [(1, 'Joe'), (2, 'Henry'), (3, 'Sam'), (4, 'Max')])

# 插入数据到Orders
cur.executemany('INSERT INTO Orders (id, customerId) VALUES (?, ?);',
                [(1, 3), (2, 1)])

# 执行查询
cur.execute('''
SELECT name
FROM Customers
LEFT JOIN Orders ON Customers.id = Orders.customerId
WHERE Orders.customerId IS NULL;
''')

# 获取结果并打印
result = cur.fetchall()
for row in result:
    print(row[0])

# 关闭连接
con.close()
```

</TabItem>
<TabItem value="cpp" label="C++">

```cpp
SELECT c.name FROM Customers c LEFT JOIN Orders o ON c.id = o.customerId WHERE o.customerId IS NULL;
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
/* 服务数据库的SQL查询语句 */

SELECT c.name 
FROM Customers c
LEFT JOIN Orders o ON c.id = o.customerId
WHERE o.customerId IS NULL;
```

</TabItem>
<TabItem value="java" label="Java">

```java
import java.sql.*;

public class Solution {
    public static void main(String[] args) throws SQLException {
        // SQLite连接设置
        Connection conn = DriverManager.getConnection("jdbc:sqlite::memory:");
        Statement stmt = conn.createStatement();
        
        // 创建表和插入数据
        stmt.executeUpdate("CREATE TABLE Customers (id INT PRIMARY KEY, name VARCHAR(255));");
        stmt.executeUpdate("INSERT INTO Customers (id, name) VALUES (1, 'Joe'), (2, 'Henry'), (3, 'Sam'), (4, 'Max');");

        stmt.executeUpdate("CREATE TABLE Orders (id INT PRIMARY KEY, customerId INT);");
        stmt.executeUpdate("INSERT INTO Orders (id, customerId) VALUES (1, 3), (2, 1);");
        
        // 查询从未下订单的客户
        String sql = "SELECT name FROM Customers LEFT JOIN Orders ON Customers.id = Orders.customerId WHERE Orders.customerId IS NULL;";
        ResultSet rs = stmt.executeQuery(sql);

        // 打印结果
        while (rs.next()) {
            System.out.println(rs.getString("name"));
        }

        // 关闭连接
        rs.close();
        stmt.close();
        conn.close();
    }
}
```

</TabItem>
</Tabs>

## 复杂度分析
时间复杂度: $O(m + n)$，其中 $m$ 是 `Customers` 表的条目数，$n$ 是 `Orders` 表的条目数。因为我们只需要遍历每个表一次。  
  
空间复杂度: $O(1)$。只使用了有限的额外空间。
