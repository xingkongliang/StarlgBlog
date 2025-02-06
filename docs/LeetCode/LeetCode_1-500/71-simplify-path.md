---
sidebar_position: 71
tags:
  - string
  - stack
  - Medium
---

# 71.简化路径

标签: `string`, `stack`

难度: Medium

通过率: 45.51%

原题链接: https://leetcode.com/problems/simplify-path/description/

## 题目描述
给你一个表示Unix风格文件系统的绝对路径，总是以斜杠`/`开头。你的任务是将这个绝对路径转化为其简化的规范路径。

Unix风格文件系统的规则如下：
- 单个句号`.`表示当前目录。
- 双个句号`..`表示上级(父)目录。
- 多个连续的斜杠如`//`和`///`被视为单个斜杠`/`。
- 不符合以上规则的句号序列应视作有效的目录或文件名，比如`...`和`....`是有效的目录或文件名。

简化的规范路径应遵循以下条件：
- 路径必须以单个斜杠`/`开头。
- 路径中的目录名之间必须由一个斜杠`/`分割。
- 除非是根目录，路径不应以斜杠`/`结尾。
- 路径不应含有用于表示当前或父目录的单个或双个句号`.`和`..`。

返回简化的规范路径。

## 解题思路
为了解决这个问题，我们可以使用一个栈来处理路径中的各个部分（由斜杠`/`分割的部分）。
1. 首先将路径按照斜杠分割成若干部分。
2. 然后遍历每个部分： 
   - 如果部分是空的或是一个句号`.`，我们跳过它，因为这表示当前目录。
   - 如果部分是两个句号`..`，我们将栈顶元素弹出（如果栈非空），因为这表示返回到上一级目录。
   - 如果是其他名称，则将其推入栈中作为一个有效的目录名称。
3. 最后，我们将栈中的元素用斜杠连接起来，并以斜杠开头，得到简化路径。

这个方法利用栈保存有效的目录名称，通过出栈实现“返回上一级目录”的操作。

## 代码实现
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="python" label="Python">

```python
def simplifyPath(path):
    # 按斜杠'/'分割路径
    parts = path.split('/')
    stack = []  # 用于保存有效路径部分的栈
    
    # 遍历每个路径部分
    for part in parts:
        if part == '' or part == '.':
            # 空串或'.'表示当前目录，跳过
            continue
        elif part == '..':
            # '..'表示返回上一级目录，如果栈不空，弹出栈顶
            if stack:
                stack.pop()
        else:
            # 其他有效目录名称加入栈
            stack.append(part)
    
    # 将栈中的路径用'/'分隔符连接，并加上根目录'/'
    return '/' + '/'.join(stack)
```

</TabItem>
<TabItem value="cpp" label="C++">

```cpp
std::string simplifyPath(std::string path) {
    std::vector<std::string> stack;  // 用于保存有效路径部分的栈
    std::stringstream ss(path);
    std::string item;
    
    // 按照'/'分割路径
    while (std::getline(ss, item, '/')) {
        if (item == "" || item == ".") {
            // 空串或'.'表示当前目录，跳过
            continue;
        } else if (item == "..") {
            // '..'表示返回上一级目录，如果栈不空，弹出栈顶
            if (!stack.empty()) {
                stack.pop_back();
            }
        } else {
            // 其他有效目录名称加入栈
            stack.push_back(item);
        }
    }
    
    // 构建简化路径
    std::string result = "/";
    for (int i = 0; i < stack.size(); ++i) {
        result += stack[i];
        if (i != stack.size() - 1) {
            result += "/";
        }
    }
    
    return result;
}
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
function simplifyPath(path) {
    const parts = path.split('/');  // 分割路径
    const stack = [];  // 用于保存有效路径部分的栈
    
    for (const part of parts) {
        if (part === '' || part === '.') {
            continue;  // 空串或'.'表示当前目录，跳过
        }
        if (part === '..') {
            if (stack.length > 0) {
                stack.pop();  // '..'表示返回上一级目录，如果栈不空，弹出栈顶
            }
        } else {
            stack.push(part);  // 其他有效目录名称加入栈
        }
    }
    
    return '/' + stack.join('/');  // 将栈中的路径用'/'分隔符连接，并加上根目录'/'
}
```

</TabItem>
<TabItem value="java" label="Java">

```java
import java.util.*;

class Solution {
    public String simplifyPath(String path) {
        String[] parts = path.split("/");  // 分割路径
        Deque<String> stack = new LinkedList<>();  // 用于保存有效路径部分的栈

        for (String part : parts) {
            if (part.equals("") || part.equals(".")) {
                continue;  // 空串或'.'表示当前目录，跳过
            }
            if (part.equals("..")) {
                if (!stack.isEmpty()) {
                    stack.pop();  // '..'表示返回上一级目录，如果栈不空，弹出栈顶
                }
            } else {
                stack.push(part);  // 其他有效目录名称加入栈
            }
        }

        StringBuilder result = new StringBuilder();
        for (String dir : stack) {
            result.insert(0, "/" + dir);  // 构建简化路径
        }

        return result.length() == 0 ? "/" : result.toString();
    }
}
```

</TabItem>
</Tabs>

## 复杂度分析
时间复杂度：$O(n)$，其中 $n$ 是给定路径的字符数，遍历路径对每个部分做处理。`空间复杂度：$O(n)$，栈最多可能存放所有目录名，总共 $n$ 字符长度。
