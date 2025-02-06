---
sidebar_position: 177
tags:
  - sort
  - design
  - math
  - Medium
---

# 177.第N高的薪水

标签: `sort`, `design`, `math`

难度: Medium

通过率: 37.95%

原题链接: https://leetcode.com/problems/nth-highest-salary/description/

## 题目描述
编写一个解决方案，查找Employee表中第n高的薪水。如果不存在第n高的薪水，则返回null。

## 解题思路
要找到第n高的薪水，我们可以对所有的薪水降序排列，然后选择第n个薪水。如果所需的第n高薪水不存在，则返回null。具体步骤如下：

1. 使用SQL中的`DISTINCT`关键词去除重复的薪水。
2. 利用`ORDER BY`子句将薪水降序排列。
3. 使用`LIMIT`子句定位到结果中的第n个位置。
4. 检查是否存在第n个结果：如果存在则输出该薪水，否则输出null。

可以用一个子查询来实现这个逻辑，伪代码如下：

```sql
SELECT salary FROM (
  SELECT DISTINCT salary 
  FROM Employee 
  ORDER BY salary DESC 
  LIMIT n
) AS temp_table 
ORDER BY salary ASC LIMIT 1;
```

该查询的主要思想是通过一个子查询获得按降序排序的唯一薪水列表，利用`LIMIT`限制到n个，然后在外层查询中取得第n个元素。

## 代码实现
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="python" label="Python">

```python
# 由于这是数据库问题，我们通常不使用Python来解决这种问题。
# 但如果使用Python，我们可以通过以下方式获取第n高薪水：

def get_nth_highest_salary(employee_data, n):
    # 提取所有薪水values
    salaries = [salary for id, salary in employee_data]
    # 获取唯一的薪水集合，并降序排列
    unique_salaries = sorted(set(salaries), reverse=True)
    # 检查n是否超出范围，返回相应结果
    if n <= len(unique_salaries):
        return unique_salaries[n-1]
    else:
        return None

# 示例输入
print(get_nth_highest_salary([(1, 100), (2, 200), (3, 300)], 2))  # 输出：200
print(get_nth_highest_salary([(1, 100)], 2))  # 输出：None
```

</TabItem>
<TabItem value="cpp" label="C++">

```cpp
#include <iostream>
#include <vector>
#include <set>
#include <algorithm>

using namespace std;

int getNthHighestSalary(vector<pair<int, int>>& employee_data, int n) {
    set<int> unique_salaries;
    // 提取所有唯一的薪水
    for (auto &p : employee_data) {
        unique_salaries.insert(p.second);
    }
    // 将薪水集合转换为向量并降序排列
    vector<int> salaries(unique_salaries.rbegin(), unique_salaries.rend());
    // 检查n是否超出范围
    if (n <= salaries.size()) {
        return salaries[n-1];
    } else {
        return -1; // 表示不存在
    }
}

// 示例输入
int main() {
    vector<pair<int, int>> employee_data = {{1, 100}, {2, 200}, {3, 300}};
    cout << getNthHighestSalary(employee_data, 2) << endl; // 输出：200
    employee_data = {{1, 100}};
    cout << getNthHighestSalary(employee_data, 2) << endl; // 输出：-1（表示不存在）
    return 0;
}
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
function getNthHighestSalary(employeeData, n) {
    // 提取所有唯一的薪水
    const salaries = [...new Set(employeeData.map(employee => employee[1]))];
    // 将薪水降序排列
    salaries.sort((a, b) => b - a);
    // 检查n是否超出范围并返回相应结果
    return n <= salaries.length ? salaries[n - 1] : null;
}

// 示例输入
console.log(getNthHighestSalary([[1, 100], [2, 200], [3, 300]], 2)); // 输出：200
console.log(getNthHighestSalary([[1, 100]], 2)); // 输出：null
```

</TabItem>
<TabItem value="java" label="Java">

```java
import java.util.*;

public class NthHighestSalary {
    public static Integer getNthHighestSalary(List<int[]> employeeData, int n) {
        // 使用TreeSet自动去重并按升序排列
        TreeSet<Integer> salaries = new TreeSet<>(Collections.reverseOrder());
        for (int[] data : employeeData) {
            salaries.add(data[1]);
        }
        // 将TreeSet转换为列表以便访问
        List<Integer> salaryList = new ArrayList<>(salaries);
        // 检查n是否超出范围
        if (n <= salaryList.size()) {
            return salaryList.get(n - 1);
        } else {
            return null; // 表示不存在
        }
    }

    public static void main(String[] args) {
        List<int[]> employeeData = Arrays.asList(
            new int[]{1, 100},
            new int[]{2, 200},
            new int[]{3, 300}
        );
        System.out.println(getNthHighestSalary(employeeData, 2)); // 输出：200
        employeeData = Arrays.asList(
            new int[]{1, 100}
        );
        System.out.println(getNthHighestSalary(employeeData, 2)); // 输出：null
    }
}
```

</TabItem>
</Tabs>

## 复杂度分析
时间复杂度：

对于SQL查询，由于需要对薪水进行排序，时间复杂度为 $O(N \log N)$，其中 $N$ 是唯一薪水的数量。

空间复杂度：

由于需要存储排序后的结果，空间复杂度为 $O(N)$。
