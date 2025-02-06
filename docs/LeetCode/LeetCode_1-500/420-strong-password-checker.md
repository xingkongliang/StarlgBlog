---
sidebar_position: 420
tags:
  - greedy
  - string
  - Hard
---

# 420.密码强度检验器

标签: `greedy`, `string`

难度: Hard

通过率: 14.22%

原题链接: https://leetcode.com/problems/strong-password-checker/description/

## 题目描述
一个密码被认为是强密码需要满足以下条件：1. 长度至少为6，最多20。 2. 至少包含一个小写字母、一个大写字母和一个数字。 3. 不包含三个连续重复字符（例如，“Baaabb0”不强，但“Baaba0”强）。给定一个字符串password，返回将password变强的最小步骤数。如果password已经很强，返回0。在一步中，你可以插入一个字符、删除一个字符或替换一个字符。

## 解题思路
对于这个问题，我们可以分成两种不同的情况来处理：1. 长度不足6或者超过20的字符串；2. 长度在6到20之间的字符串。特别地，我们还需要检查是否包含小写字母、大写字母和数字，以及是否有三个连续重复字符的问题。

1. **处理长度不足和字符种类不全的问题**：
   - 如果字符串长度小于6，我们需要添加字符。插入字符可以增加字符串长度并可能满足当前的其他条件（如缺少的小写字母、大写字母或数字）。最大步数是使得总长达到6和满足字母种类的最大值。

2. **处理长度过长和连续重复的问题**：
   - 如果字符串长度超过20，必须删除一些字符。删除字符优先考虑解决连续重复的问题。选择性地替换或者删除在重复位置的字符来逐步改善问题。
   - 对于连续三个或三个以上字符的情况，处理这些序列时，一个替换操作可以减少一个三连字符，但如果需要减少长度，也可以通过多个替换减少总长度。

3. **结合所有条件**：
   - 合并以上所述的修复步骤数量以满足总长、字符种类以及连续重复要求。

## 代码实现
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="python" label="Python">

```python
def strongPasswordChecker(password: str) -> int:
    # 分类进行检查
    missing_type = 3  # 初始设定为需要小写、大写、数字
    if any('a' <= c <= 'z' for c in password):
        missing_type -= 1
    if any('A' <= c <= 'Z' for c in password):
        missing_type -= 1
    if any(c.isdigit() for c in password):
        missing_type -= 1

    change_count = 0
    one_change = two_change = 0  # 记录长度情况后的变动计数
    i = 2  # 从第三个字符开始

    while i < len(password):
        # 发现三连字符的情况
        if password[i] == password[i - 1] == password[i - 2]:
            repeat_len = 2  # 初始化连续长度
            while i < len(password) and password[i] == password[i - 1]:
                repeat_len += 1
                i += 1
            change_count += repeat_len // 3
            
            if repeat_len % 3 == 0:
                one_change += 1
            elif repeat_len % 3 == 1:
                two_change += 1
        else:
            i += 1

    if len(password) < 6:
        return max(missing_type, 6 - len(password))
    elif len(password) <= 20:
        return max(missing_type, change_count)
    else:
        deletes_required = len(password) - 20
        change_count -= min(deletes_required, one_change)
        change_count -= min(max(deletes_required - one_change, 0), two_change * 2) // 2
        change_count -= max(deletes_required - one_change - 2 * two_change, 0) // 3
        
        return deletes_required + max(missing_type, change_count)
```

</TabItem>
<TabItem value="cpp" label="C++">

```cpp
class Solution {
public:
    int strongPasswordChecker(string s) {
        int missing_type = 3;
        if (any_of(s.begin(), s.end(), ::islower))
            --missing_type;
        if (any_of(s.begin(), s.end(), ::isupper))
            --missing_type;
        if (any_of(s.begin(), s.end(), ::isdigit))
            --missing_type;

        int change_count = 0;
        int one_change = 0, two_change = 0;
        int i = 2;
        
        while (i < s.size()) {
            if (s[i] == s[i - 1] && s[i] == s[i - 2]) {
                int repeat_len = 2;
                while (i < s.size() && s[i] == s[i - 1]) {
                    ++repeat_len;
                    ++i;
                }
                change_count += repeat_len / 3;
                
                if (repeat_len % 3 == 0) 
                    ++one_change;
                else if (repeat_len % 3 == 1)
                    ++two_change;
            } else {
                ++i;
            }
        }
        
        if (s.size() < 6)
            return max(missing_type, 6 - s.size());
        else if (s.size() <= 20)
            return max(missing_type, change_count);
        else {
            int deletes_required = s.size() - 20;
            change_count -= min(deletes_required, one_change);
            change_count -= min(max(deletes_required - one_change, 0), two_change * 2) / 2;
            change_count -= max(deletes_required - one_change - 2 * two_change, 0) / 3;
            return deletes_required + max(missing_type, change_count);
        }
    }
};
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
function strongPasswordChecker(password) {
    let missingType = 3;
    if (/[a-z]/.test(password)) missingType--;
    if (/[A-Z]/.test(password)) missingType--;
    if (/\d/.test(password)) missingType--;

    let changeCount = 0;
    let oneChange = 0, twoChange = 0;
    let i = 2;
    
    while (i < password.length) {
        if (password[i] === password[i - 1] && password[i] === password[i - 2]) {
            let repeatLen = 2;
            while (i < password.length && password[i] === password[i - 1]) {
                repeatLen++;
                i++;
            }
            changeCount += Math.floor(repeatLen / 3);
            
            if (repeatLen % 3 === 0) 
                oneChange++;
            else if (repeatLen % 3 === 1)
                twoChange++;
        } else {
            i++;
        }
    }

    if (password.length < 6)
        return Math.max(missingType, 6 - password.length);
    else if (password.length <= 20)
        return Math.max(missingType, changeCount);
    else {
        let deletesRequired = password.length - 20;
        changeCount -= Math.min(deletesRequired, oneChange);
        changeCount -= Math.floor(Math.min(Math.max(deletesRequired - oneChange, 0), twoChange * 2) / 2);
        changeCount -= Math.floor(Math.max(deletesRequired - oneChange - 2 * twoChange, 0) / 3);
        return deletesRequired + Math.max(missingType, changeCount);
    }
}
```

</TabItem>
<TabItem value="java" label="Java">

```java
public class Solution {
    public int strongPasswordChecker(String password) {
        int missingType = 3;
        if (password.chars().anyMatch(Character::isLowerCase)) missingType--;
        if (password.chars().anyMatch(Character::isUpperCase)) missingType--;
        if (password.chars().anyMatch(Character::isDigit)) missingType--;

        int changeCount = 0;
        int oneChange = 0, twoChange = 0;
        int i = 2;

        while (i < password.length()) {
            if (password.charAt(i) == password.charAt(i - 1) && password.charAt(i) == password.charAt(i - 2)) {
                int repeatLen = 2;
                while (i < password.length() && password.charAt(i) == password.charAt(i - 1)) {
                    repeatLen++;
                    i++;
                }
                changeCount += repeatLen / 3;

                if (repeatLen % 3 == 0)
                    oneChange++;
                else if (repeatLen % 3 == 1)
                    twoChange++;
            } else {
                i++;
            }
        }

        if (password.length() < 6)
            return Math.max(missingType, 6 - password.length());
        else if (password.length() <= 20)
            return Math.max(missingType, changeCount);
        else {
            int deletesRequired = password.length() - 20;
            changeCount -= Math.min(deletesRequired, oneChange);
            changeCount -= Math.min(Math.max(deletesRequired - oneChange, 0), twoChange * 2) / 2;
            changeCount -= Math.max(deletesRequired - oneChange - 2 * twoChange, 0) / 3;
            return deletesRequired + Math.max(missingType, changeCount);
        }
    }
}
```

</TabItem>
</Tabs>

## 复杂度分析
时间复杂度为 $O(n)$，其中 $n$ 是密码的长度。我们至少需要一次遍历字符串，又需要几次遍历来调整字符。  
  
空间复杂度为 $O(1)$，只使用了常数空间来存储变量计数等信息。
