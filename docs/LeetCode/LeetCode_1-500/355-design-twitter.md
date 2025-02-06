---
sidebar_position: 355
tags:
  - design
  - hash-table
  - heap
  - Medium
---

# 355.设计Twitter

标签: `design`, `hash-table`, `heap`

难度: Medium

通过率: 41.23%

原题链接: https://leetcode.com/problems/design-twitter/description/

## 题目描述
设计一个简化版的Twitter，用户可以发布推文、关注/取消关注其他用户，以及查看用户时间线中的最近10条推文。

## 解题思路
我们需要设计一个数据结构，支持发布推文、获取最近推文流、关注和取消关注用户的操作。每个用户的时间线应能显示该用户自己的推文以及他们所关注的用户的推文。为了实现这些功能，我们可以使用以下几个数据结构：

1. 使用一个哈希表 `user_tweets`，其中键是用户的ID，值是一个用来存储该用户自己的推文的列表（有序存储，最早的在前）。

2. 使用一个哈希表 `followees`，其中键是用户ID，值是一个该用户关注的其他用户ID的集合。

3. 在调用`getNewsFeed(userId)`时，需要整合用户自己的推文和其关注对象的推文，然后取最近的10条。为了快速找到最近的推文，我们可以使用优先队列（小顶堆）来合并推文流。

具体步骤：
- `postTweet(userId, tweetId)`: 在`user_tweets`中将推文加入到用户对应的列表中。
- `getNewsFeed(userId)`: 收集该用户及其关注用户的推文，然后使用优先队列获取最近的10条推文。
- `follow(followerId, followeeId)`: 在`followees`中将被关注用户的ID加入到关注者用户对应的集合中。
- `unfollow(followerId, followeeId)`: 从`followees`中将被关注用户的ID从关注者用户对应的集合中移除。

需要注意的细节：
- 每个用户不能关注自己。
- 每个用户发布的推文都具有唯一性，可以使用时间戳或序号来标记推文的发布先后。

## 代码实现
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="python" label="Python">

```python
import heapq
from collections import defaultdict, deque

class Twitter:

    def __init__(self):
        # 用于存储用户的推文列表（按时间排序）
        self.user_tweets = defaultdict(deque)
        # 用于存储用户所关注的用户集合
        self.followees = defaultdict(set)
        # 时间戳，用于排序推文
        self.timestamp = 0

    def postTweet(self, userId: int, tweetId: int) -> None:
        # 添加推文到用户的推文列表中
        self.user_tweets[userId].appendleft((self.timestamp, tweetId))
        # 自增时间戳
        self.timestamp += 1

    def getNewsFeed(self, userId: int) -> list:
        min_heap = []
        # 收集用户自己的推文
        for tweet in self.user_tweets[userId]:
            heapq.heappush(min_heap, tweet)
            if len(min_heap) > 10:
                heapq.heappop(min_heap)
        # 收集关注用户的推文
        for followeeId in self.followees[userId]:
            if followeeId != userId:
                for tweet in self.user_tweets[followeeId]:
                    heapq.heappush(min_heap, tweet)
                    if len(min_heap) > 10:
                        heapq.heappop(min_heap)
        # 获取最近的10条
        news_feed = [heapq.heappop(min_heap)[1] for _ in range(len(min_heap))]
        return news_feed[::-1]

    def follow(self, followerId: int, followeeId: int) -> None:
        if followerId != followeeId:
            self.followees[followerId].add(followeeId)

    def unfollow(self, followerId: int, followeeId: int) -> None:
        if followeeId in self.followees[followerId]:
            self.followees[followerId].remove(followeeId)

```

</TabItem>
<TabItem value="cpp" label="C++">

```cpp
class Twitter {
    private Map<Integer, Set<Integer>> followees;
    private Map<Integer, List<int[]>> tweets;
    private int timestamp;

    public Twitter() {
        followees = new HashMap<>();
        tweets = new HashMap<>();
        timestamp = 0;
    }

    public void postTweet(int userId, int tweetId) {
        tweets.putIfAbsent(userId, new ArrayList<>());
        tweets.get(userId).add(new int[] {timestamp++, tweetId});
    }

    public List<Integer> getNewsFeed(int userId) {
        PriorityQueue<int[]> pq = new PriorityQueue<>((a, b) -> a[0] - b[0]);
        if (tweets.containsKey(userId)) {
            for (int[] tweet : tweets.get(userId)) {
                pq.offer(tweet);
                if (pq.size() > 10) {
                    pq.poll();
                }
            }
        }
        if (followees.containsKey(userId)) {
            for (Integer followeeId : followees.get(userId)) {
                if (tweets.containsKey(followeeId)) {
                    for (int[] tweet : tweets.get(followeeId)) {
                        pq.offer(tweet);
                        if (pq.size() > 10) {
                            pq.poll();
                        }
                    }
                }
            }
        }
        List<Integer> newsFeed = new ArrayList<>();
        while (!pq.isEmpty()) {
            newsFeed.add(0, pq.poll()[1]);
        }
        return newsFeed;
    }

    public void follow(int followerId, int followeeId) {
        if (followerId != followeeId) {
            followees.computeIfAbsent(followerId, k -> new HashSet<>()).add(followeeId);
        }
    }

    public void unfollow(int followerId, int followeeId) {
        if (followees.containsKey(followerId) && followees.get(followerId).contains(followeeId)) {
            followees.get(followerId).remove(followeeId);
        }
    }
}

```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
class Twitter {
    constructor() {
        this.followees = new Map(); // 存储关注关系
        this.tweets = new Map(); // 存储用户的推文
        this.timestamp = 0; // 时间戳
    }

    postTweet(userId, tweetId) {
        if (!this.tweets.has(userId)) {
            this.tweets.set(userId, []);
        }
        this.tweets.get(userId).unshift([this.timestamp++, tweetId]);
    }

    getNewsFeed(userId) {
        let minHeap = [];
        if (this.tweets.has(userId)) {
            for (let tweet of this.tweets.get(userId)) {
                minHeap.push(tweet);
                if (minHeap.length > 10) {
                    minHeap.sort((a, b) => b[0] - a[0]);
                    minHeap.pop();
                }
            }
        }
        if (this.followees.has(userId)) {
            for (let followeeId of this.followees.get(userId)) {
                if (this.tweets.has(followeeId)) {
                    for (let tweet of this.tweets.get(followeeId)) {
                        minHeap.push(tweet);
                        if (minHeap.length > 10) {
                            minHeap.sort((a, b) => b[0] - a[0]);
                            minHeap.pop();
                        }
                    }
                }
            }
        }
        return minHeap.sort((a, b) => b[0] - a[0]).map(tweet => tweet[1]);
    }

    follow(followerId, followeeId) {
        if (followerId !== followeeId) {
            if (!this.followees.has(followerId)) {
                this.followees.set(followerId, new Set());
            }
            this.followees.get(followerId).add(followeeId);
        }
    }

    unfollow(followerId, followeeId) {
        if (this.followees.has(followerId)) {
            this.followees.get(followerId).delete(followeeId);
        }
    }
}

```

</TabItem>
<TabItem value="java" label="Java">

```java
import java.util.*;

public class Twitter {

    private static int timeStamp = 0;
    private Map<Integer, User> userMap;

    private static class Tweet {
        public int id;
        public int time;
        public Tweet next;

        public Tweet(int id, int time) {
            this.id = id;
            this.time = time;
            this.next = null;
        }
    }

    public static class User {
        public int id;
        public Set<Integer> followees;
        public Tweet tweetHead;

        public User(int id) {
            this.id = id;
            this.followees = new HashSet<>();
            followees.add(id);
            this.tweetHead = null;
        }

        public void postTweet(int tweetId) {
            Tweet newTweet = new Tweet(tweetId, timeStamp++);
            newTweet.next = tweetHead;
            tweetHead = newTweet;
        }

        public void follow(int id) {
            followees.add(id);
        }

        public void unfollow(int id) {
            followees.remove(id);
        }
    }

    public Twitter() {
        userMap = new HashMap<>();
    }

    public void postTweet(int userId, int tweetId) {
        userMap.putIfAbsent(userId, new User(userId));
        userMap.get(userId).postTweet(tweetId);
    }

    public List<Integer> getNewsFeed(int userId) {
        List<Integer> result = new LinkedList<>();
        if (!userMap.containsKey(userId)) return result;
        Set<Integer> followees = userMap.get(userId).followees;
        PriorityQueue<Tweet> pq = new PriorityQueue<>(followees.size(), (a, b) -> b.time - a.time);
        for (int id : followees) {
            Tweet tweet = userMap.get(id).tweetHead;
            if (tweet != null) {
                pq.offer(tweet);
            }
        }
        while (!pq.isEmpty() && result.size() < 10) {
            Tweet tweet = pq.poll();
            result.add(tweet.id);
            if (tweet.next != null) {
                pq.offer(tweet.next);
            }
        }
        return result;
    }

    public void follow(int followerId, int followeeId) {
        userMap.putIfAbsent(followerId, new User(followerId));
        userMap.putIfAbsent(followeeId, new User(followeeId));
        userMap.get(followerId).follow(followeeId);
    }

    public void unfollow(int followerId, int followeeId) {
        if (!userMap.containsKey(followerId) || followerId == followeeId) return;
        userMap.get(followerId).unfollow(followeeId);
    }
}
```

</TabItem>
</Tabs>

## 复杂度分析
**时间复杂度**：
- `postTweet`：$O(1)$，因为只是将推文添加到列表中。
- `getNewsFeed`：$O(N \log M)$，其中$N$是所有相关用户（自己和关注的用户）的推文数量，$M=10$是我们需要维护的优先队列的大小。
- `follow`和`unfollow`：$O(1)$，因为只是在集合中添加或移除元素。`

**空间复杂度**：
- 总的来说，为所有用户存储推文和关注关系需要$O(U + T)$的空间，其中$U$是用户数量，$T$是推文总数。
