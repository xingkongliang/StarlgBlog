---
sidebar_position: 165
tags:
  - string
  - Medium
---

# 165.版本号比较

标签: `string`

难度: Medium

通过率: 41.69%

原题链接: https://leetcode.com/problems/compare-version-numbers/description/

## 题目描述
给定两个版本号字符串 `version1` 和 `version2`，请比较它们。版本号由点 `.` 分隔的修订版本组成，修订版本的值是其转化为整数后的值，不考虑前导零。

比较两个版本号需要从左到右逐个比较各自的修订版本值。如果一个版本号比另一个版本号的修订版本少，则将缺失的修订版本视为0。

返回如下结果：

- 如果 `version1 < version2` 返回 -1。
- 如果 `version1 > version2` 返回 1。
- 否则返回 0。

## 解题思路
为了比较两个版本号，我们可以按照如下步骤进行：

1. 使用点 `.` 来分割版本号字符串，得到各个修订版本值。
2. 将修订版本值转换为整数值，忽略任何前导零。
3. 按照从左到右的顺序比较每个修订版本。
4. 当一个版本号的修订个数少于另一个版本号时，将缺少的修订部分视为 `0` 进行比较。
5. 如果在某次比较中，`version1` 的某个修订值小于 `version2` 的对应修订值，返回 `-1`。
6. 如果 `version1` 的某个修订值大于 `version2` 的对应修订值，返回 `1`。
7. 如果在所有修订版本的比较中都相同，返回 `0`。

## 代码实现
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="python" label="Python">

```python
def compareVersion(version1: str, version2: str) -> int:
    # 使用 '.' 将版本号字符串分割成整数
    v1 = list(map(int, version1.split('.')))
    v2 = list(map(int, version2.split('.')))
    
    # 找出较长的版本号列表长度
    length = max(len(v1), len(v2))
    
    # 逐一比较修订版本
    for i in range(length):
        # 若版本号列表较短，补充为0
        num1 = v1[i] if i < len(v1) else 0
        num2 = v2[i] if i < len(v2) else 0
        # 比较大小
        if num1 < num2:
            return -1
        elif num1 > num2:
            return 1
    return 0
```

</TabItem>
<TabItem value="cpp" label="C++">

```cpp
int compareVersion(string version1, string version2) {
    // 用 '.' 将版本号分割成整数
    vector<int> v1, v2;
    stringstream ss1(version1), ss2(version2);
    string temp;
    
    while (getline(ss1, temp, '.')) {
        v1.push_back(stoi(temp));
    }

    while (getline(ss2, temp, '.')) {
        v2.push_back(stoi(temp));
    }

    int length = max(v1.size(), v2.size());

    // 逐一比较修订版本
    for (int i = 0; i < length; i++) {
        int num1 = (i < v1.size()) ? v1[i] : 0;
        int num2 = (i < v2.size()) ? v2[i] : 0;
        
        if (num1 < num2) {
            return -1;
        } else if (num1 > num2) {
            return 1;
        }
    }
    return 0;
}
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
function compareVersion(version1, version2) {
    // 使用 '.' 将版本号分割成整数
    const v1 = version1.split('.').map(Number);
    const v2 = version2.split('.').map(Number);

    const length = Math.max(v1.length, v2.length);

    // 逐一比较修订版本
    for (let i = 0; i < length; i++) {
        const num1 = i < v1.length ? v1[i] : 0;
        const num2 = i < v2.length ? v2[i] : 0;

        if (num1 < num2) {
            return -1;
        } else if (num1 > num2) {
            return 1;
        }
    }
    return 0;
}
```

</TabItem>
<TabItem value="java" label="Java">

```java
public int compareVersion(String version1, String version2) {
    // 使用 '.' 将版本号分割成整数
    String[] v1 = version1.split("\\.");
    String[] v2 = version2.split("\\.");

    int length = Math.max(v1.length, v2.length);

    // 逐一比较修订版本
    for (int i = 0; i < length; i++) {
        int num1 = i < v1.length ? Integer.parseInt(v1[i]) : 0;
        int num2 = i < v2.length ? Integer.parseInt(v2[i]) : 0;

        if (num1 < num2) {
            return -1;
        } else if (num1 > num2) {
            return 1;
        }
    }
    return 0;
}
```

</TabItem>
</Tabs>

## 复杂度分析
时间复杂度为 $O(n + m)$，其中 $n$ 和 $m$ 分别是版本号字符串 $version1$ 和 $version2$ 的长度。


空间复杂度为 $O(n + m)$，用于存储分割后的修订版本。
