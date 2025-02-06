---
sidebar_position: 93
tags:
  - string
  - backtracking
  - Medium
---

# 93.还原IP地址

标签: `string`, `backtracking`

难度: Medium

通过率: 51.8%

原题链接: https://leetcode.com/problems/restore-ip-addresses/description/

## 题目描述
一个合法的IP地址由四个整数通过单个点连接而成。每个整数都在0到255之间（含）。整数不能有前导零。例如，"0.1.2.201"和"192.168.1.1"是合法的IP地址，但"0.011.255.245"，"192.168.1.312"和"192.168@1.1"是非法的IP地址。给定一个仅包含数字的字符串s，返回通过插入点可以生成的所有可能的合法IP地址。你不可以更改s中的字符顺序，也不能删除字符。

## 解题思路
我们可以使用回溯法来解决这个问题。主要思路是尝试将输入字符串分割成四个部分，然后验证每个部分是否是一个合法的IP位。具体步骤包括：

1. 初始化一个结果列表用来存储所有可能的合法IP地址。
2. 递归地尝试为每一个IP段选择1到3个字符，通过判断这些字符是否能够组成合法的整数（一位数是合法的；两位数不能以“0”开头，范围是0-99；三位数不能以“0”开头，范围是0-255）。
3. 如果已经分成4段且正好分割完了整个字符串，那么这是一个合法的IP地址，将其加入结果列表中。
4. 如果分出的段超过了4段，或者字符串不够分成4段，那么就停止这条路径的搜索。
5. 当所有可能的组合都尝试完成后，返回结果列表。

## 代码实现
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="python" label="Python">

```python
def restore_ip_addresses(s: str) -> list[str]:
    def is_valid(segment: str) -> bool:
        # 检查段是否有效
        if len(segment) > 1 and segment[0] == '0':
            return False  # 以'0'开头的非零数字
        return 0 <= int(segment) <= 255

    def backtrack(start: int, path: list[str]):
        # 如果path中有4个部分并且我们已经用完了所有的字符
        if len(path) == 4:
            if start == len(s):
                res.append(".".join(path))
            return

        # 尝试每种可能的切割方式
        for end in range(start, min(start + 3, len(s))):
            segment = s[start:end + 1]
            if is_valid(segment):
                backtrack(end + 1, path + [segment])

    res = []
    backtrack(0, [])
    return res

```

</TabItem>
<TabItem value="cpp" label="C++">

```cpp
class Solution {
public:
    vector<string> restoreIpAddresses(string s) {
        vector<string> res;
        vector<string> path;
        backtrack(s, 0, path, res);
        return res;
    }

private:
    bool isValid(string segment) {
        if (segment.length() > 1 && segment[0] == '0') 
            return false; // 以'0'开头的数字
        int num = stoi(segment);
        return num >= 0 && num <= 255;
    }

    void backtrack(const string &s, int start, vector<string> &path, vector<string> &res) {
        // 若路径有4段且用完了所有字符
        if (path.size() == 4) {
            if (start == s.size()) {
                res.push_back(path[0] + "." + path[1] + "." + path[2] + "." + path[3]);
            }
            return;
        }

        // 尝试每种可能分段
        for (int end = start; end < min((int)s.size(), start + 3); ++end) {
            string segment = s.substr(start, end - start + 1);
            if (isValid(segment)) {
                path.push_back(segment);
                backtrack(s, end + 1, path, res);
                path.pop_back();
            }
        }
    }
};

```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
function restoreIpAddresses(s) {
    const res = [];

    const isValid = (segment) => {
        // 段有效性检查
        if (segment.length > 1 && segment[0] === '0') return false;
        return parseInt(segment) >= 0 && parseInt(segment) <= 255;
    };

    const backtrack = (start, path) => {
        // 如果path有4个部分，并且已经分割完
        if (path.length === 4) {
            if (start === s.length) {
                res.push(path.join('.'));
            }
            return;
        }

        // 试试每种切割方式
        for (let end = start; end < Math.min(start + 3, s.length); end++) {
            const segment = s.slice(start, end + 1);
            if (isValid(segment)) {
                backtrack(end + 1, [...path, segment]);
            }
        }
    };

    backtrack(0, []);
    return res;
}
```

</TabItem>
<TabItem value="java" label="Java">

```java
import java.util.ArrayList;
import java.util.List;

public class Solution {
    public List<String> restoreIpAddresses(String s) {
        List<String> res = new ArrayList<>();
        backtrack(s, 0, new ArrayList<>(), res);
        return res;
    }

    private boolean isValid(String segment) {
        if (segment.length() > 1 && segment.startsWith("0"))
            return false; // 以'0'开头的数字
        int num = Integer.parseInt(segment);
        return num >= 0 && num <= 255;
    }

    private void backtrack(String s, int start, List<String> path, List<String> res) {
        // 当路径有4段且用完所有字符
        if (path.size() == 4) {
            if (start == s.length()) {
                res.add(String.join(".", path));
            }
            return;
        }

        // 尝试所有可能的分段
        for (int end = start; end < Math.min(s.length(), start + 3); end++) {
            String segment = s.substring(start, end + 1);
            if (isValid(segment)) {
                path.add(segment);
                backtrack(s, end + 1, path, res);
                path.remove(path.size() - 1);
            }
        }
    }
}

```

</TabItem>
</Tabs>

## 复杂度分析
时间复杂度：$O(1)$，这是因为字符串的长度会最多导致$3^4 = 81$种组合，也就是说所有可能的IP地址都是有限且不多的。`（因为 IP 地址格式是固定的，人为限制的组合数是8, 可以认为是常量）`  
空间复杂度：$O(1)$，除去存储结果所需的空间外，不使用额外的空间。（递归深度不会超过4，因为IP只有4个段）
