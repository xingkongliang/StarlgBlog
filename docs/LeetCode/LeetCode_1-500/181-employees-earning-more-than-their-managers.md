---
sidebar_position: 181
tags:
  - hash-table
  - sort
  - Easy
---

# 181.工资高于经理的员工

标签: `hash-table`, `sort`

难度: Easy

通过率: 70.7%

原题链接: https://leetcode.com/problems/employees-earning-more-than-their-managers/description/

## 题目描述
给定一个Employee表，包含员工的id、名字、工资和经理的id。需要找出工资高于经理的员工姓名。返回的表中只需要包含员工姓名，顺序可以是任意的。

## 解题思路
我们需要找出那些工资高于其经理的员工。可以通过自连接(Employee表与自身连接)来实现这一点。为此，我们将Employee表看作两张表：一张代表员工，一张代表经理，通过比较员工的工资和其经理的工资，选出工资更高的员工。假设E1是员工，E2是E1的经理，当E1的工资高于E2的工资时，我们就选择E1的名字。具体SQL语句如下：

```sql
SELECT E1.name AS Employee
FROM Employee E1, Employee E2
WHERE E1.managerId = E2.id AND E1.salary > E2.salary;
```

## 代码实现
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="python" label="Python">

```python
# Python version: 使用pandas模拟SQL查询。
import pandas as pd

# 假设Employee是一个DataFrame对象
def find_higher_salary_employees(Employee):
    # 自连接DataFrame：employee E1和manager E2
    df = Employee.merge(Employee, left_on='managerId', right_on='id', suffixes=('_employee', '_manager'))
    # 过滤出工资高于经理的员工
    result = df[df['salary_employee'] > df['salary_manager']]
    # 只返回员工的名字
    return result[['name_employee']]

# 示例使用
# Employee = pd.DataFrame({
#     'id': [1, 2, 3, 4],
#     'name': ['Joe', 'Henry', 'Sam', 'Max'],
#     'salary': [70000, 80000, 60000, 90000],
#     'managerId': [3, 4, None, None]
# })
# print(find_higher_salary_employees(Employee))

```

</TabItem>
<TabItem value="cpp" label="C++">

```cpp
// C++ version: 使用模拟SQL查询的结构体来进行操作。
#include <iostream>
#include <vector>
#include <string>
#include <unordered_map>

struct Employee {
    int id;
    std::string name;
    int salary;
    int managerId;
};

std::vector<std::string> find_higher_salary_employees(const std::vector<Employee>& employees) {
    // 用于快速查找经理工资的map
    std::unordered_map<int, int> managerSalary;
    for (const Employee& emp : employees) {
        managerSalary[emp.id] = emp.salary;
    }
    
    std::vector<std::string> result;
    for (const Employee& emp : employees) {
        if (emp.managerId != -1 && emp.salary > managerSalary[emp.managerId]) {
            result.push_back(emp.name);
        }
    }
    return result;
}

int main() {
    std::vector<Employee> employees = {
        {1, "Joe", 70000, 3},
        {2, "Henry", 80000, 4},
        {3, "Sam", 60000, -1},
        {4, "Max", 90000, -1}
    };
    auto result = find_higher_salary_employees(employees);
    for (const std::string& name : result) {
        std::cout << name << std::endl;
    }
}

```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
// JavaScript version: 使用对象和数组来模拟数据库表和查询。
function findHigherSalaryEmployees(employees) {
    // 构建managerId到工资的映射
    const managerSalary = {};
    employees.forEach(emp => {
        managerSalary[emp.id] = emp.salary;
    });
    
    // 筛选出工资高于经理的员工
    return employees.filter(emp => emp.managerId !== null && emp.salary > managerSalary[emp.managerId])
                    .map(emp => emp.name);
}

// 示例使用
const employees = [
    {id: 1, name: 'Joe', salary: 70000, managerId: 3},
    {id: 2, name: 'Henry', salary: 80000, managerId: 4},
    {id: 3, name: 'Sam', salary: 60000, managerId: null},
    {id: 4, name: 'Max', salary: 90000, managerId: null}
];
console.log(findHigherSalaryEmployees(employees));

```

</TabItem>
<TabItem value="java" label="Java">

```java
// Java version: 使用ArrayList和HashMap进行数据查询和操作。
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

class Employee {
    int id;
    String name;
    int salary;
    Integer managerId;

    public Employee(int id, String name, int salary, Integer managerId) {
        this.id = id;
        this.name = name;
        this.salary = salary;
        this.managerId = managerId;
    }
}

public class Main {
    public static List<String> findHigherSalaryEmployees(List<Employee> employees) {
        HashMap<Integer, Integer> managerSalary = new HashMap<>();
        for (Employee emp : employees) {
            managerSalary.put(emp.id, emp.salary);
        }
        
        List<String> result = new ArrayList<>();
        for (Employee emp : employees) {
            if (emp.managerId != null && emp.salary > managerSalary.get(emp.managerId)) {
                result.add(emp.name);
            }
        }
        return result;
    }

    public static void main(String[] args) {
        List<Employee> employees = new ArrayList<>();
        employees.add(new Employee(1, "Joe", 70000, 3));
        employees.add(new Employee(2, "Henry", 80000, 4));
        employees.add(new Employee(3, "Sam", 60000, null));
        employees.add(new Employee(4, "Max", 90000, null));
        
        List<String> result = findHigherSalaryEmployees(employees);
        for (String name : result) {
            System.out.println(name);
        }
    }
}
```

</TabItem>
</Tabs>

## 复杂度分析
时间复杂度：

如果你以SQL执行，上述查询的时间复杂度主要取决于表的大小和系统优化级别，通常认为是 $O(n \cdot k)$，其中$n$是行数，$k$是自连接的倍数。对于其他实现如在编程语言中的模拟，也为$O(n)$，因为涉及两次遍历。


空间复杂度：

$O(n)$，因为我们需要存储所有员工信息以进行比较。
