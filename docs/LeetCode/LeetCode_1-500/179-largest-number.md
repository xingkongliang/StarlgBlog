---
sidebar_position: 179
tags:
  - string
  - sort
  - Medium
---

# 179.最大数

标签: `string`, `sort`

难度: Medium

通过率: 40.47%

原题链接: https://leetcode.com/problems/largest-number/description/

## 题目描述
给定一个非负整数的数组 `nums`，将其重新排列后使得组成的数最大，并返回该结果。结果可能非常大，所以需要返回字符串而不是整数。

## 解题思路
要形成最大的数字，我们需要一个有效的排序策略来排列这些数字的字符串形式。考虑到两个数字 `a` 和 `b`，如果将他们拼接起来形成的数字 `ab` 大于 `ba`（即字符串拼接），我们希望 `a` 排在 `b` 之前。`ab` 和 `ba` 比较的是两个字符串拼接后的字典序。按此策略对数组中的所有数进行排序。最后将这些数字拼接成一个字符串即可。特殊情况是所有数字都是 `0` 时，结果应该是 `"0"` 不是 `"000..."`。

## 代码实现
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="python" label="Python">

```python
from functools import cmp_to_key`    

class LargerNumberKey(str):`    
    def __lt__(x, y):`    
        # 定义比较规则：x+y > y+x 则认为 x "大" 于 y`    
        return x+y > y+x

class Solution:`    
    def largestNumber(self, nums):`    
        # 将每个整数转换为字符串`    
        nums = list(map(str, nums))`    
        # 按照自定义的字符串比较规则排序`    
        nums.sort(key=LargerNumberKey)`    
        # 特殊情况：开头为 0 的多个数字，就说明全为 0 `    
        if nums[0] == '0':`    
            return '0'`    
        # 拼接排序后的字符串`    
        return ''.join(nums)
```

</TabItem>
<TabItem value="cpp" label="C++">

```cpp
``cpp
#include <algorithm>`    
#include <string>`    
#include <vector>`

// 定义自定义排序规则
bool compare(const std::string &a, const std::string &b) {`    
    return a + b > b + a;`    
}`

class Solution {`    
public:`    
    std::string largestNumber(std::vector<int>& nums) {`    
        // 将数字转换为字符串`    
        std::vector<std::string> num_strings;`    
        for (int num : nums) {`    
            num_strings.push_back(std::to_string(num));`    
        }`    
        // 按照自定义规则排序`    
        std::sort(num_strings.begin(), num_strings.end(), compare);`    
        // 特殊情况：如果最大值是0`    
        if (num_strings[0] == "0") {`    
            return "0";`    
        }`    
        // 拼接排序后的字符串`    
        std::string result;`    
        for (const std::string &s : num_strings) {`    
            result += s;`    
        }`    
        return result;`    
    }`    
};
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
function largestNumber(nums) {`    
    // 将数字转换为字符串`    
    nums = nums.map(String);`    
    // 自定义排序规则`    
    nums.sort((a, b) => (b + a) - (a + b));`    
    // 特殊情况：数组中全是0`    
    if (nums[0] === '0') return '0';`    
    // 拼接排序后的数组`    
    return nums.join('');`    
}
```

</TabItem>
<TabItem value="java" label="Java">

```java
import java.util.*;`

class LargerNumberComparator implements Comparator<String> {`    
    @Override`    
    public int compare(String a, String b) {`    
        // 比较两种拼接方式`    
        String order1 = a + b;`    
        String order2 = b + a;`    
        return order2.compareTo(order1); // order2 在前是为了降序排序`    
    }`    
}`

public class Solution {`    
    public String largestNumber(int[] nums) {`    
        // 转换成字符串数组`    
        String[] asStrs = new String[nums.length];`    
        for (int i = 0; i < nums.length; i++) {`    
            asStrs[i] = String.valueOf(nums[i]);`    
        }`    

        // 按照自定义规则排序`    
        Arrays.sort(asStrs, new LargerNumberComparator());`    
        // 如果排序后第一个元素是"0"，则整个数组的元素为"0"`    
        if (asStrs[0].equals("0")) {`    
            return "0";`    
        }`    

        // 拼接排序后的字符串`    
        String largestNumberStr = new String();`    
        for (String numAsStr : asStrs) {`    
            largestNumberStr += numAsStr;`    
        }`    

        return largestNumberStr;`    
    }`    
}
```

</TabItem>
</Tabs>

## 复杂度分析
时间复杂度：假设 $n$ 是数组的长度，$m$ 是数组中数字的最大位数。排序的时间复杂度为 $O(n \log n)$。但每次比较两个字符串的时间是 $O(m)$，所以整体时间复杂度是 $O(n \cdot m \log n)$。  
  
空间复杂度：主要是排序需要的额外空间，所以是 $O(n)$。
