---
sidebar_position: 184
tags:
  - array
  - hash-table
  - sort
  - Medium
---

# 184.部门最高薪水

标签: `array`, `hash-table`, `sort`

难度: Medium

通过率: 53.38%

原题链接: https://leetcode.com/problems/department-highest-salary/description/

## 题目描述
编写一个SQL查询，找出每个部门中薪水最高的员工。返回的结果表的格式如给出的例子。

### 示例 1:
输入：
Employee 表：

| id | name  | salary | departmentId |
|----|-------|--------|--------------|
| 1  | Joe   | 70000  | 1            |
| 2  | Jim   | 90000  | 1            |
| 3  | Henry | 80000  | 2            |
| 4  | Sam   | 60000  | 2            |
| 5  | Max   | 90000  | 1            |

Department 表：

| id | name  |
|----|-------|
| 1  | IT    |
| 2  | Sales |

输出：

| Department | Employee | Salary |
|------------|----------|--------|
| IT         | Jim      | 90000  |
| Sales      | Henry    | 80000  |
| IT         | Max      | 90000  |

## 解题思路
我们需要查找每个部门的最高薪水员工。可以通过以下步骤来完成：

1. 首先，通过 `Department` 表和 `Employee` 表进行连接，使用 `departmentId` 连接到 department 表的 `id` 栏位。

2. 使用一个子查询来为每个部门找到最高的 `salary`。

3. 将主查询和子查询结合，确保我们只选出每个部门中拥有最高薪水的员工。

这是经典的SQL聚合查询的使用，需要通过 `GROUP BY` 和条件关联来提取分组中的最大值。此外，由于一个部门可能有多个工资最高的员工，我们需要处理这种多行输出的情况。

## 代码实现
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="python" label="Python">

```python
SELECT d.name AS Department, e.name AS Employee, e.salary AS Salary
FROM Employee e
JOIN Department d ON e.departmentId = d.id
WHERE e.salary = (
    SELECT MAX(salary) FROM Employee e2 WHERE e2.departmentId = e.departmentId
)
```

</TabItem>
<TabItem value="cpp" label="C++">

```cpp
SELECT d.name AS Department, e.name AS Employee, e.salary AS Salary
FROM Employee e
JOIN Department d ON e.departmentId = d.id
WHERE e.salary = (
    SELECT MAX(salary) FROM Employee e2 WHERE e2.departmentId = e.departmentId
);
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
// 注意：JavaScript 主要用于前端逻辑开发，不支持原生SQL查询。需使用后端查询。
// 因此直接提供SQL语句的伪代码实现。
// 
// const sqlQuery = `SELECT d.name AS Department, e.name AS Employee, e.salary AS Salary` +
//                  ` FROM Employee e JOIN Department d ON e.departmentId = d.id` +
//                  ` WHERE e.salary = (SELECT MAX(salary) FROM Employee e2 WHERE e2.departmentId = e.departmentId)`;
//
// executeSQL(sqlQuery); // This method hypothetically executes SQL on the backend.
```

</TabItem>
<TabItem value="java" label="Java">

```java
SELECT d.name AS Department, e.name AS Employee, e.salary AS Salary
FROM Employee e
JOIN Department d ON e.departmentId = d.id
WHERE e.salary = (
    SELECT MAX(salary) FROM Employee e2 WHERE e2.departmentId = e.departmentId
);
```

</TabItem>
</Tabs>

## 复杂度分析
时间复杂度：

对于每个 `employee` 记录，我们进行了一次子查询以查找该部门的最高工资。假设有 $m$ 个员工和 $n$ 个部门，子查询会消耗 $O(m)$ 的时间。因此总体时间复杂度是 $O(m \times n)$。


空间复杂度：

没有使用额外的数据结构，仅在处理过程中需要一些额外的临时空间。空间复杂度为 $O(m)$。
