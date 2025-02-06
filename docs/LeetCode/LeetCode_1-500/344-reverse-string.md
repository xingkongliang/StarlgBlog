---
sidebar_position: 344
tags:
  - two-pointers
  - array
  - Easy
---

# 344.反转字符串

标签: `two-pointers`, `array`

难度: Easy

通过率: 79.28%

原题链接: https://leetcode.com/problems/reverse-string/description/

## 题目描述
编写一个函数来反转字符串。输入字符串以字符数组 `s` 的形式给出。`你必须原地修改输入数组，并且只使用 $O(1)$ 的额外空间。`

## 解题思路
要反转一个字符数组，只需从数组的两端向中间逐步交换元素。我们可以使用两个指针来解决这个问题，一个指针 (`left`) 从数组的起始位置开始，另一个指针 (`right`) 从数组的末尾位置开始。然后，不断地交换这两个位置的元素，随后将两个指针向中间移动，直到 `left` 指针等于或超过 `right` 指针为止。这样，整个数组就被反转了，因为每次交换，首尾的字符都被对调。

## 代码实现
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="python" label="Python">

```python
def reverseString(s):
    # 使用双指针方法
    left, right = 0, len(s) - 1
    while left < right:
        # 交换左右指针的元素
        s[left], s[right] = s[right], s[left]
        # 移动双指针
        left, right = left + 1, right - 1

# 示例调用
s = ["h","e","l","l","o"]
reverseString(s)
print(s) # 输出: ["o","l","l","e","h"]
```

</TabItem>
<TabItem value="cpp" label="C++">

```cpp
class Solution {
public:
    void reverseString(vector<char>& s) {
        // 初始化左右指针
        int left = 0, right = s.size() - 1;
        // 使用双指针进行交换
        while (left < right) {
            swap(s[left], s[right]);
            left++;
            right--;
        }
    }
};
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
var reverseString = function(s) {
    // 定义左右指针
    let left = 0, right = s.length - 1;
    // 使用 while 进行字符交换
    while (left < right) {
        // 交换左右指针的值
        [s[left], s[right]] = [s[right], s[left]];
        left++;
        right--;
    }
};

// 示例调用
let s = ["h","e","l","l","o"];
reverseString(s);
console.log(s); // 输出: ["o","l","l","e","h"]
```

</TabItem>
<TabItem value="java" label="Java">

```java
public class Solution {
    public void reverseString(char[] s) {
        int left = 0, right = s.length - 1;
        while (left < right) {
            // 交换字符
            char temp = s[left];
            s[left] = s[right];
            s[right] = temp;
            left++;
            right--;
        }
    }
}

// 示例调用
char[] s = {'h', 'e', 'l', 'l', 'o'};
new Solution().reverseString(s);
System.out.println(Arrays.toString(s)); // 输出: ["o", "l", "l", "e", "h"]
```

</TabItem>
</Tabs>

## 复杂度分析
时间复杂度为 $O(n)$，其中 $n$ 是字符数组的长度，因为需要遍历数组的一半，每次交换两个元素。  
  
空间复杂度为 $O(1)$，因为只需要使用固定数量的额外空间，不论输入的规模。
