---
sidebar_position: 185
tags:
  - hash-table
  - sort
  - design
  - Hard
---

# 185.部门前三高工资

标签: `hash-table`, `sort`, `design`

难度: Hard

通过率: 56.06%

原题链接: https://leetcode.com/problems/department-top-three-salaries/description/

## 题目描述
公司的高管们对看到每个部门中薪水最高的人感兴趣。部门中的高收入者是指在该部门中薪水排在前三的员工。

## 解题思路
为了解决这个问题，我们将首先从`Employee`和`Department`表中收集有关员工的工资信息，并根据每个员工所在部门进行分组。在这些分组结果中，我们将利用窗口函数`RANK()`来计算每个部门员工的薪水排名。`RANK()`会根据`salary`字段为每个员工的工资进行排序，薪资相同者排名一致。我们可以使用`RANK() OVER(PARTITION BY departmentId ORDER BY salary DESC)`来为每个部门计算出工资排名。

接下来，我们根据这些排名筛选出在每个部门中排名不超过3的员工，因为他们的工资处于各自部门的前三。

为了输出每个员工的`Department`名称，我们需要将这些筛选出的员工信息与`Department`表结合以获取部门名称。这可以通过SQL中的`JOIN`操作实现。最终，输出格式要求是部门名称、员工姓名和他们的工资。

## 代码实现
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="python" label="Python">

```python
SELECT D.name as Department, E.name as Employee, E.salary as Salary FROM ( SELECT *, RANK() OVER(PARTITION BY departmentId ORDER BY salary DESC) as rank_salary FROM Employee ) E JOIN Department D ON E.departmentId = D.id WHERE E.rank_salary <= 3
```

</TabItem>
<TabItem value="cpp" label="C++">

```cpp
SELECT D.name AS Department, E.name AS Employee, E.salary AS Salary FROM ( SELECT *, RANK() OVER(PARTITION BY departmentId ORDER BY salary DESC) as rank_salary FROM Employee ) E JOIN Department D ON E.departmentId = D.id WHERE E.rank_salary <= 3;
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
SELECT D.name AS Department, E.name AS Employee, E.salary AS Salary FROM ( SELECT *, RANK() OVER(PARTITION BY departmentId ORDER BY salary DESC) as rank_salary FROM Employee ) E JOIN Department D ON E.departmentId = D.id WHERE E.rank_salary <= 3;
```

</TabItem>
<TabItem value="java" label="Java">

```java
SELECT D.name AS Department, E.name AS Employee, E.salary AS Salary FROM ( SELECT *, RANK() OVER(PARTITION BY departmentId ORDER BY salary DESC) as rank_salary FROM Employee ) E JOIN Department D ON E.departmentId = D.id WHERE E.rank_salary <= 3;
```

</TabItem>
</Tabs>

## 复杂度分析
时间复杂度：由于我们需要为每个部门的员工进行排序，因此时间复杂度为 $O(n \log n)$，其中 $n$ 是员工总数。分组和排序操作是最耗时的。  
  
空间复杂度：使用窗口函数进行排序和排名，需要额外的空间来存储排序结果，空间复杂度为 $O(n)$。
