---
sidebar_position: 180
tags:
  - array
  - design
  - Medium
---

# 180.连续的数字

标签: `array`, `design`

难度: Medium

通过率: 44.8%

原题链接: https://leetcode.com/problems/consecutive-numbers/description/

## 题目描述
找出所有至少连续出现三次的数字。返回结果表可以是任意顺序。

## 解题思路
本题要求找出在数据库表中至少连续三次出现的数字。在SQL中，我们可以使用自连接的方法来解决此问题。具体地，我们需要三次自连接`Logs`表来检查连续的行是否具有相同的值。通过比较每一行和它紧邻的两个后续行的值，我们可以确定一个数字是否连续出现至少三次。

## 代码实现
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="python" label="Python">

```python
# 使用内置sqlite3库来实现解决方案
import sqlite3

# 连接数据库
conn = sqlite3.connect(':memory:')
cursor = conn.cursor()

# 创建Logs表
cursor.execute('''
CREATE TABLE Logs (
    id INTEGER PRIMARY KEY,
    num TEXT
)
''')

# 插入示例数据
cursor.executemany('INSERT INTO Logs VALUES (?, ?)', [
    (1, '1'),
    (2, '1'),
    (3, '1'),
    (4, '2'),
    (5, '1'),
    (6, '2'),
    (7, '2'),
])

# 查询连续出现至少三次的数字
cursor.execute('''
SELECT DISTINCT l1.num AS ConsecutiveNums
FROM Logs l1, Logs l2, Logs l3
WHERE l1.num = l2.num AND l2.num = l3.num AND l1.id = l2.id - 1 AND l2.id = l3.id - 1
''')

# 输出结果
tupleResult = cursor.fetchall()
print(tupleResult)

# 关闭数据库连接
conn.close()
```

</TabItem>
<TabItem value="cpp" label="C++">

```cpp
SELECT DISTINCT l1.num AS ConsecutiveNums
FROM Logs l1, Logs l2, Logs l3
WHERE l1.num = l2.num AND l2.num = l3.num AND l1.id = l2.id - 1 AND l2.id = l3.id - 1;
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
// JavaScript版本使用Node.js并连接SQLite数据库
const sqlite3 = require('sqlite3').verbose();

// 打开数据库
let db = new sqlite3.Database(':memory:');

// 创建Logs表
let createTable = `CREATE TABLE Logs(
    id INTEGER PRIMARY KEY,
    num TEXT
);`;

db.run(createTable);

// 插入示例数据
let insertData = `INSERT INTO Logs(id, num) VALUES
    (1, '1'),
    (2, '1'),
    (3, '1'),
    (4, '2'),
    (5, '1'),
    (6, '2'),
    (7, '2');`;

db.run(insertData);

// 查询连续出现至少三次的数字
let query = `SELECT DISTINCT l1.num AS ConsecutiveNums
             FROM Logs l1, Logs l2, Logs l3
             WHERE l1.num = l2.num AND l2.num = l3.num
             AND l1.id = l2.id - 1 AND l2.id = l3.id - 1;`;

db.all(query, [], (err, rows) => {
    if (err) {
        throw err;
    }
    console.log(rows);
});

// 关闭数据库
db.close();
```

</TabItem>
<TabItem value="java" label="Java">

```java
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

public class ConsecutiveNumbersSolution {
    public static void main(String[] args) throws SQLException {
        // 连接数据库
        Connection connection = DriverManager.getConnection("jdbc:sqlite::memory:");
        Statement statement = connection.createStatement();

        // 创建Logs表
        statement.execute("CREATE TABLE Logs (id INTEGER PRIMARY KEY, num TEXT)");

        // 插入示例数据
        statement.execute("INSERT INTO Logs (id, num) VALUES (1, '1'), (2, '1'), (3, '1'), (4, '2'), (5, '1'), (6, '2'), (7, '2')");

        // 查询连续出现至少三次的数字
        ResultSet rs = statement.executeQuery("SELECT DISTINCT l1.num AS ConsecutiveNums 
" +
                                              "FROM Logs l1, Logs l2, Logs l3 
" +
                                              "WHERE l1.num = l2.num AND l2.num = l3.num 
" +
                                              "AND l1.id = l2.id - 1 AND l2.id = l3.id - 1");

        // 输出结果
        while (rs.next()) {
            System.out.println(rs.getString("ConsecutiveNums"));
        }

        // 关闭连接
        connection.close();
    }
}
```

</TabItem>
</Tabs>

## 复杂度分析
时间复杂度是 $O(N)$，其中 $N$ 是日志表中记录的数量。因为我们通过自连接多次遍历了所有行。  
  
空间复杂度是 $O(1)$，因为除了存储结果，几乎不需要额外的空间。
