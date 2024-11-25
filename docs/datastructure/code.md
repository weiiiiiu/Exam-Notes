代码原则：

* 不追求完美
* 模糊条件，要求
* 关键步骤与注释
* 先画图，照着写，不多想
* 有主见，不犹豫（尤其是递归 按照逻辑直接写）

## 顺序表

Seqlist L

* 一维数组 element[]
* 实际个数 n
* 最大个数 maxSize

### 遍历

```c
for(int = 0;i<L.n;i++){
  if();
}
```

### 搜索

```c
for(int i=0;i<L.n;i++){
  if(L.element[i]==x){
  
  }
}
```

### 添加

```c
bool Insert(SeqList *L,int i,int x){
  if(i<-1||i>L.n-1)
    return 0;
  if(L->n==L->maxSize)
    return 0;
  for(int j = L->n-1;j>i;j--)
    L->element[j+1]=L.element[j];
  L->element[j+1]=x;
  L->n++;
  return 1;
}
```

 ### 删除第i个元素

```c
bool Delete(SeqList *L, int i) {
    if (i < 0 || i >= L->n) // 检查索引是否有效
        return false;
    for (int j = i; j < L->n - 1; j++) {
        L->element[j] = L->element[j + 1]; // 将后续元素前移
    }
    L->n--; // 更新顺序表的实际元素个数
    return true;
}
```

### 找最大最小

```c
int FindMax(seqlist L){
  	int max = L.element[0];
    if (i < 0 || i >= L->n) // 检查索引是否有效
        return false;
    for(int i = 0;i<L.n;i++) {
      if(max<L.element[i])
         max = L.element[i];
    }   
  	return max;
}
```

### 顺序表中删除所有值重复的元素

```c
void del(SeqList *L) {
    for (int i = 0; i < L->n; i++) {
        for (int j = i+1; j < L->n; j++) {
            if (L->element[i] == L->element[j]) {
                // 移动后续元素
                for (int k = j+1; k < L->n; k++) {
                    L->element[k-1] = L->element[k];
                }
                L->n--;    // 更新顺序表长度
                j--;       // j需要回退，因为当前j位置已经是新元素
            }
        }
    }
}
```

### 顺序表中删除所有值重复的元素 仅保留第一个

```c
void del(SeqList *L) {
    int i = 0;  // i指向当前不重复的最后一个元素
  
    // j遍历整个数组
    for (int j = 1; j < L->n; j++) {
        // 如果当前元素与i指向的元素不同
        if (L->element[i] != L->element[j]) {
            i++;  // i向后移动
            L->element[i] = L->element[j];  // 保存不重复的元素
        }
    }
  
    L->n = i + 1;  // 更新顺序表长度
}
```

### 查找三个有序递增序列的公共元素

```c
#include <math.h>

// 返回两个数中的较大值
int fmax(int a, int b) {
    if (a > b)
        return a;
    else
        return b;
}

void samekey(int A[], int B[], int C[], int n) {
    int i = 0, j = 0, k = 0;
  
    while (i < n && j < n && k < n) {
        // 如果三个指针指向的元素相等，找到一个公共元素
        if (A[i] == B[j] && A[i] == C[k]) {
            printf("%d ", A[i]);
            i++;
            j++;
            k++;
        }
        else {
            // 找出三个当前元素中的最大值
            int max_num = fmax(fmax(A[i], B[j]), C[k]);
          
            // 将小于最大值的指针都向后移动
            if (A[i] < max_num)
                i++;
            if (B[j] < max_num)
                j++;
            if (C[k] < max_num)
                k++;
        }
    }
}
```

## 单链表

Node:

* 元素element
* 指针link

SingleList  L

* 头指针 first
* 节点个数  n

### 完整遍历

```c
Node *p = L->first;
while (p != NULL) {
    // 对 element 补充
    p = p->link;
}
```

### 在某处停下

* 在a处

  ```c
  while(p->element!=a) p=p->link
  ```
* 在a前一个停

  ```c
  while(p->link->element!=a) p=p->link
  ```
* 在a后一个停

  ```c
  while(p->element!=a) 
  		p=p->link;
  p=p->link;
  ```

### 添加

* 中间

  ```c
  s->link=p->link;
  p->link=s;
  ```
* 插在最后一个

  ```c
  s->link=NULL;
  r->link = s;
  r =s;
  ```
* 插在最前面

  ```c
  s->link=L->first;
  L->first=s;
  ```

### 删除

两个指向：一个前一个 一个自己

```c
Node *q = p->first;
while (p->link->element != a) {
    p = p->link;
}
Node *temp = p->link;
p->link = temp->link;
free(temp);
L->n--;
```

### 将两个单循坏链表合并成一个单循环链表

```c
void fun(SingleList *LA, SingleList *LB) {
    Node *PA = LA->first;
    Node *PB = LB->first;
  
    // 遍历找到两个链表的最后节点
    while (PA->link != LA->first) {
        PA = PA->link;
    }
    while (PB->link != LB->first) {
        PB = PB->link;
    }  
    // 连接两个链表
    PA->link = LB->first;    // LA尾部连接LB头部
    PB->link = LA->first;    // LB尾部连接LA头部
    // 更新节点数量
    LA->n += LB->n;
}

```

### 链表逆置

```c
void reverseList(SingleList *L) {
    // 空链表或只有一个节点时无需逆置
    if (L->first == NULL || L->first->link == NULL) {
        return;
    }
  
    Node *p = NULL;       // 前一个节点
    Node *q = L->first;   // 当前节点
    Node *r = NULL;       // 下一个节点

    while (q != NULL) {
        r = q->link;      // 1. 保存下一个节点，防止链表断开
        q->link = p;      // 2. 反转指针，指向前一个节点
        p = q;            // 3. 前一个节点右移
        q = r;            // 4. 当前节点右移
    }

    L->first = p;         // 更新头指针指向原链表的最后一个节点
}

```

### 单链表数据逆序输出

> 链表的数据操作用数组

```c
void Reverse(SingleList L) {
    int a[L.n], k = 0;         // 定义数组 a 用于存储链表中的元素，k 用于记录数组索引

    Node *p = L->first;        // 初始化指针 p，指向链表的第一个节点

    while (p != NULL) {        // 遍历链表
        a[k++] = p->element;   // 将当前节点的 element 存入数组 a，然后 k++
        p = p->link;           // 移动 p 到下一个节点
    }

    // 逆序打印数组 a 中的元素
    for (int i = L.n - 1; i >= 0; i--) {
        printf("%d ", a[i]);   // 从数组的最后一个元素开始打印
    }
}
```

### 将链表分成奇偶位置两个链表

```c
// 将链表分成奇偶位置两个链表，A保留奇数位置节点，B保留偶数位置节点
SingleList* split4(SingleList* A) {
    // 创建新链表B
    SingleList* B = (SingleList*)malloc(sizeof(SingleList));
    B->first = NULL;
    B->n = 0;
  
    // 处理空链表或只有一个节点的情况
    if (A->first == NULL || A->first->link == NULL) {
        return B;
    }
  
    // ra指向A的尾节点，rb指向B的尾节点，p用于遍历
    Node *ra = A->first;      // A保留奇数位置节点
    Node *rb = B->first;      // B保留偶数位置节点
    Node *p = A->first->link; // p用于遍历
  
    while (p != NULL) {
        // 处理奇数位置节点（保留在A中）
        ra->link = p;
        ra = p;
        p = p->link;
        A->n++;
      
        // 处理偶数位置节点（移到B中）
        if (p != NULL) {
            if (B->first == NULL) {  // B为空时特殊处理
                B->first = p;
                rb = p;
            } else {
                rb->link = p;
                rb = p;
            }
            p = p->link;
            B->n++;
        }
    }
  
    // 处理尾部，设置两个链表的结束标志
    ra->link = NULL;
    if (rb != NULL) rb->link = NULL;
  
    return B;
}
```

### 前后分裂

```
// 将链表分成前后两部分，A保留前半部分，B保留后半部分
SingleList* split5(SingleList* A) {
    // 创建新链表B
    SingleList* B = (SingleList*)malloc(sizeof(SingleList));
    B->first = NULL;
    B->n = 0;
  
    // 处理空链表的情况
    if (A->first == NULL) return B;
  
    // 初始化指针
    Node *ra = A->first;  // A的尾节点指针
    Node *p = A->first->link;  // 遍历指针
    Node *rb = NULL;      // B的尾节点指针
  
    // 遍历链表，交替将节点分配给A和B
    while (p != NULL) {
        // 将当前节点保留在A中
        ra->link = p;
        ra = p;
        p = p->link;
        A->n++;
      
        // 将下一个节点（如果存在）移到B中
        if (p != NULL) {
            if (B->first == NULL) {  // B为空时的特殊处理
                B->first = p;
                rb = p;
            } else {
                rb->link = p;
                rb = p;
            }
            p = p->link;
            B->n++;
        }
    }
  
    // 设置两个链表的结束标志
    ra->link = NULL;
    if (rb != NULL) rb->link = NULL;
  
    return B;
}
```

### 正负值分裂

```c
// 将链表按节点值的正负分成两个链表
// A保留大于等于0的节点，B保留小于0的节点
SingleList* split6(SingleList* A) {
    // 创建新链表B
    SingleList* B = (SingleList*)malloc(sizeof(SingleList));
    B->first = NULL;
    B->n = 0;
  
    // 处理空链表的情况
    if (A->first == NULL) return B;
  
    // 初始化指针
    Node *p = A->first;   // 用于遍历的指针
    Node *rb = NULL;      // B的尾节点指针
  
    // 遍历链表直到最后一个节点
    while (p->link != NULL) {
        if (p->link->element >= 0) {
            // 正数节点保留在A中
            p = p->link;
            A->n++;
        } else {
            // 负数节点移到B中
            Node *temp = p->link;        // 保存要移动的节点
            p->link = temp->link;        // 从A中删除该节点
          
            if (B->first == NULL) {      // B为空时的特殊处理
                B->first = temp;
                rb = temp;
            } else {
                rb->link = temp;
                rb = temp;
            }
            B->n++;
        }
    }
  
    // 设置B链表的结束标志
    if (rb != NULL) rb->link = NULL;
  
    return B;
}
```

### 线性表按顺序表存储，要求删除重复元素，保留第一个

```c
void RemoveDuplicates(SeqList *L) {  // 修改为SeqList，因为是顺序表操作
    // 外层循环：遍历每个元素
    for (int i = 0; i < L->n - 1; i++) {      
        // 内层循环：将当前元素与后面的所有元素比较
        for (int j = i + 1; j < L->n; j++) {  
            // 如果找到重复元素
            if (L->element[i] == L->element[j]) {   
                // 将后续元素前移一位
                for (int k = j; k < L->n - 1; k++) {
                    L->element[k] = L->element[k + 1];
                }
                L->n--;       // 表长减1
                j--;          // j减1，因为后面的元素都前移了一位
            }
        }
    }
}
```

### 删除单链表中的所有元素值为x的结点

```c
void delete(SingleList *L, int x) {
    // 处理头节点为x的情况
    while (L->first != NULL && L->first->element == x) {
        Node *temp = L->first;
        L->first = L->first->link;
        free(temp);
        L->n--;
    }
  
    // 如果链表为空，直接返回
    if (L->first == NULL) {
        return;
    }
  
    Node *p = L->first;
    while (p != NULL && p->link != NULL) {
        // 找到下一个节点的值为x的节点
        if (p->link->element == x) {
            Node *temp = p->link;      // 保存要删除的节点
            p->link = temp->link;      // 跳过要删除的节点
            free(temp);                // 释放内存
            L->n--;                    // 节点数减1
        } else {
            p = p->link;              // 只有当当前节点不需要删除时才移动p
        }
    }
}

```

### 顺序表中的奇数移到前面，偶数移到后面

> 快排思想 i遇奇数，j遇偶数互换

```c
void Move(SeqList *L) {
    int i = 0, j = L->n - 1;
  
    while (i < j) {
        // 向后移动i，直到找到偶数
        while (i < j && L->element[i] % 2 != 0) {
            i++;
        }
        // 向前移动j，直到找到奇数
        while (i < j && L->element[j] % 2 == 0) {
            j--;
        }
        // 交换找到的偶数和奇数的位置
        if (i < j) {
            int temp = L->element[i];
            L->element[i] = L->element[j];
            L->element[j] = temp;
        }
    }
}
```

### 有序顺序表的二分算法

```c
int Search(SeqList *L, int x) {  // 修改为指针参数
    int low = 0, high = L->n - 1;

    while (low <= high) {
        int mid = (low + high) / 2;  // 将mid的定义移到循环内部

        if (x < L->element[mid]) {
            high = mid - 1;  // 搜索左半部分
        } else if (x > L->element[mid]) {
            low = mid + 1;   // 搜索右半部分
        } else {
            return mid;      // 找到目标元素，返回下标
        }
    }
    return -1;  // 未找到目标元素，返回 -1
}

```

### 删除有序链表中从元素A到元素B所有元素

```c
void Delete(SingleList *L, int A, int B) {
    Node *p = L->first;

    // 找到元素A的前一个节点
    while (p->link->element != A) {
        p = p->link;
    }

    Node *temp = p->link;  // temp指向A节点
    Node *next;           // 用于保存下一个要处理的节点

    // 循环删除从A到B的节点
    while (temp->element != B) {
        next = temp->link;    // 保存下一个节点
        free(temp);           // 释放当前节点
        L->n--;               // 链表长度减一
        temp = next;          // 移动到下一个节点
    }

    // 删除B节点
    p->link = temp->link;
    free(temp);
    L->n--;
}

```

### 将有序链表A,B合并为有序链表C

```c
void Combine(SingleList *LA, SingleList *LB, SingleList *LC) {
    Node *pA = LA->first;
    Node *pB = LB->first;
    Node *pC = NULL;

    // 初始化 LC
    LC->first = NULL;
    LC->n = 0;

    // 合并两个链表的节点
    while (pA != NULL && pB != NULL) {
        Node *q = (Node *)malloc(sizeof(Node));
        if (pA->element < pB->element) {
            q->element = pA->element;
            pA = pA->link;
        } else {
            q->element = pB->element;
            pB = pB->link;
        }
        q->link = NULL;

        if (LC->first == NULL) {
            LC->first = pC = q;
        } else {
            pC->link = q;
            pC = q;
        }
        LC->n++;
    }

    // 处理剩余节点
    Node *p = (pA != NULL) ? pA : pB;
    while (p != NULL) {
        Node *q = (Node *)malloc(sizeof(Node));
        q->element = p->element;
        q->link = NULL;
      
        if (LC->first == NULL) {
            LC->first = pC = q;
        } else {
            pC->link = q;
            pC = q;
        }
        LC->n++;
        p = p->link;
    }
}
```

### 求2个顺序表A,B的交集

```c
void Same(SeqList LA,SeqList LB){
	int len = min(LA.n,LB.n);
	int a[len],k=0;
  for(int i = 0; i < LA.n; i++) {
        for(int j = 0; j < LB.n; j++) {
            if (LA.element[i] == LB.element[j]) {
                a[k++]=LA.element[i];
                break;     // 找到相同元素后跳出内层循环
            }
        }
    }
}
```

### 判断单链表是否有环

```c
bool Circle_SingleList(List L) {
    Node* p = L->first; // 从链表的第一个节点开始
    int Cnt = 0;        // 初始化计数器

    while (p != NULL) { // 遍历链表，直到末尾
        Cnt++;          // 计数器加一
        p = p->link;    // 移动到下一个节点

        if (Cnt > L.n)  // 如果计数器超过链表的节点总数
            return 1;   // 表示检测到环，返回1
    }

    return 0; // 如果遍历到末尾，表示没有环，返回0
}

```

### 判断链表 B 是否为链表 A 的连续子序列

```c
bool IsSubsequence(SingleList* A, SingleList* B) {
    if (B->first == NULL) return true;  // 空链表B是任何链表的子序列
    if (A->first == NULL) return false; // A为空但B不为空，返回false
  
    Node* pA = A->first;
  
    while (pA != NULL) {
        Node* pB = B->first;
        Node* tempA = pA;
      
        // 从当前A的节点开始匹配B的所有节点
        while (pB != NULL && tempA != NULL && tempA->element == pB->element) {
            tempA = tempA->link;
            pB = pB->link;
        }
      
        // 如果B已经匹配完，说明找到了连续子序列
        if (pB == NULL) return true;
      
        pA = pA->link;
    }
  
    return false;
}
```

### 求两个有序链表交集

```c
// 求两个递增有序单链表的交集，结果存入新链表C
SingleList* common(SingleList* A, SingleList* B) {
    // 创建新链表C
    SingleList* C = (SingleList*)malloc(sizeof(SingleList));
    C->first = (Node*)malloc(sizeof(Node));  // 创建头结点
    C->first->link = NULL;
    C->n = 0;
  
    // 初始化工作指针
    Node *p = A->first->link;  // p指向A的第一个实际节点
    Node *q = B->first->link;  // q指向B的第一个实际节点
    Node *r = C->first;        // r指向C的尾节点，初始指向头结点
  
    // 同时遍历两个链表
    while (p != NULL && q != NULL) {
        if (p->element < q->element) {
            // A中当前节点值小，A指针后移
            p = p->link;
        }
        else if (p->element > q->element) {
            // B中当前节点值小，B指针后移
            q = q->link;
        }
        else {
            // 找到公共元素，创建新节点添加到C中
            Node *s = (Node*)malloc(sizeof(Node));
            s->element = p->element;  // 复制数据
            s->link = NULL;
          
            // 将新节点连接到C的尾部
            r->link = s;
            r = s;
            C->n++;  // 更新C的节点计数
          
            // 两个指针都后移
            p = p->link;
            q = q->link;
        }
    }
  
    // 设置C的结束标志
    r->link = NULL;
  
    return C;
}
```

### 将链表中偶数节点移到前面、奇数节点移到后面

```c
// 将链表中的偶数节点移到前面，奇数节点移到后面
void moveEvenBeforeOdd(SingleList* L) {
    // 处理空链表或只有一个节点的情况
    if (L->first == NULL || L->first->link == NULL) {
        return;
    }
  
    // 创建头节点
    Node *head = L->first;
  
    // 创建两个指针，分别指向偶数部分和奇数部分的末尾
    Node *evenTail = head;     // 偶数部分的尾指针
    Node *oddTail = head;      // 奇数部分的尾指针
    Node *curr = head->link;   // 当前处理的节点
  
    // 标记是否已经有偶数节点
    int hasEven = 0;
  
    // 第一次遍历：将偶数节点移到前面
    while (curr != NULL) {
        Node *next = curr->link;  // 保存下一个节点
      
        if (curr->element % 2 == 0) {  // 偶数节点
            if (!hasEven) {
                // 第一个偶数节点
                curr->link = head->link;
                head->link = curr;
                evenTail = curr;
                hasEven = 1;
            } else {
                // 后续偶数节点
                curr->link = evenTail->link;
                evenTail->link = curr;
                evenTail = curr;
            }
        } else {  // 奇数节点
            oddTail = curr;
        }
      
        curr = next;
    }
  
    // 如果没有偶数节点，直接返回
    if (!hasEven) {
        return;
    }
  
    // 确保最后一个偶数节点正确连接到第一个奇数节点
    Node *firstOdd = evenTail->link;
    while (firstOdd != NULL && firstOdd->element % 2 == 0) {
        firstOdd = firstOdd->link;
    }
    evenTail->link = firstOdd;
}
```

### 重排链表

```c
// 将链表重新排列为(a1, an, a2, an-1, ...)
void reorderList(SingleList* L) {
    if (L->first == NULL || L->first->link == NULL || 
        L->first->link->link == NULL) {
        return;
    }
  
    // 使用快慢指针找到中点
    Node *fast = L->first->link->link;
    Node *slow = L->first->link;
    while (fast != NULL && fast->link != NULL) {
        fast = fast->link->link;
        slow = slow->link;
    }
  
    // 将后半部分链表逆置
    Node *p = slow->link;
    slow->link = NULL;
    while (p != NULL) {
        Node *tmp = p->link;
        p->link = slow->link;
        slow->link = p;
        p = tmp;
    }
  
    // 合并前后两部分
    Node *mid = slow->link;
    Node *beg = L->first->link;
    slow->link = NULL;
  
    // 交替合并
    while (mid != NULL) {
        Node *tmp = mid->link;
        mid->link = beg->link;
        beg->link = mid;
        beg = mid->link;
        mid = tmp;
    }
}
```

### 删除并插入

```c
// 从链表A中删除从第i个元素起的len个元素，然后插入到B的第j个元素之前
void deleteAndInsert(SingleList* A, SingleList* B, int i, int len, int j) {
    // 定位到A中第i-1个节点
    Node *p = A->first;
    int k = 1;
    while (p != NULL && k < i) {
        p = p->link;
        k++;
    }
  
    // 保存要删除的片段
    Node *r = p->link;
    Node *s;
    k = 0;
    while (r != NULL && k < len) {
        s = r;
        r = r->link;
        k++;
        A->n--;  // 更新A的节点数
    }
    p->link = r;
  
    // 定位到B中第j-1个节点
    Node *q = B->first;
    k = 1;
    while (q != NULL && k < j) {
        q = q->link;
        k++;
    }
  
    // 插入到B中
    s->link = q->link;
    q->link = p->link;
    B->n += len;  // 更新B的节点数
}
```

### 处理递增链表

```c
// 处理递增链表：将小于x的节点移到前面，删除偶数值的节点
void processIncreasingList(SingleList* L, int x) {
    if (L->first == NULL || L->first->link == NULL) {
        return;
    }
  
    // 处理小于x的节点
    Node *p = L->first->link;
    Node *tail = p;  // 记录已处理部分的尾节点
  
    // 将小于x的节点移到前面
    while (p != NULL && p->element < x) {
        Node *s = p->link;
        p->link = L->first->link;
        L->first->link = p;
        p = s;
    }
  
    // 删除偶数值节点
    tail->link = p;
    while (tail->link != NULL) {
        if (tail->link->element % 2 == 0) {
            Node *r = tail->link;
            tail->link = r->link;
            free(r);
            L->n--;  // 更新节点数
        } else {
            tail = tail->link;
        }
    }
}
```

## 双链表

### 定义

```c
typedef struct duNode {
    ElemType element;          // 节点的数据域
    struct duNode *rlink;      // 指向后继节点的指针
    struct duNode *llink;      // 指向前驱节点的指针
} DuNode, DuList;

```

### 判断双链表是否对称

```c
bool check(DuList *L) {
    DuNode *p = L->first;
    DuNode *q = L->first;

    // 将q移动到最后一个节点
    while (q->rlink != NULL) {
        q = q->rlink;
    }

    // 从两端向中间移动比较
    while (p != q && q->llink != p) {
        if (p->element != q->element) {
            return false;
        }
        p = p->rlink;
        q = q->llink;
    }

    return true;
}

```

### 双向链表中值最小的节点移动到链表最前面

```c
void MoveMinToFront(DuList *L) {
    // 空链表或只有一个节点时直接返回
    if (L == NULL || L->rlink == NULL) {
        return;
    }
  
    DuNode *p = L->rlink;      // 从第一个实际节点开始
    DuNode *minNode = p;       // 记录最小值节点
  
    // 找到值最小的节点
    while (p != NULL) {
        if (p->element < minNode->element) {
            minNode = p;
        }
        p = p->rlink;
    }
  
    // 如果最小值节点已经在最前面，无需移动
    if (minNode == L->rlink) {
        return;
    }
  
    // 将最小值节点从原位置断开
    minNode->llink->rlink = minNode->rlink;
    if (minNode->rlink != NULL) {
        minNode->rlink->llink = minNode->llink;
    }
  
    // 将最小值节点插入到最前面
    minNode->rlink = L->rlink;
    minNode->llink = L;
    L->rlink->llink = minNode;
    L->rlink = minNode;
}
```

### 单链表对称

```c
bool check(SingleList *L) {
    int a[L->n];  // 数组大小只需要L->n即可
    int k = 0;    // 初始化k为0
  
    // 将链表元素存入数组
    Node *p = L->first;
    while (p != NULL) {
        a[k++] = p->element;
        p = p->link;
    }

    // 检查是否回文
    for (int i = 0; i < L->n/2; i++) {
        if (a[i] != a[L->n - 1 - i]) {
            return false;
        }
    }

    return true;
}
```

### 递归求数组最大值

```c
int Max(int a[],int n){
  if(n==1) return a[0];
  else return max(a[n-1],Max(a,n-1));
}
```

### 递归求数组平均值

```c
float Average(int a[],int n){
  if(n==1) return a[0];
  else return (Average(a,n-1)*(n-1)+a[n-1])/n;
}
```

### 递归逆序输出正整数各位

```c
void PrintDigit(int n){
  if(n<10) printf("%d",n);
  else{
    printf("%d",n%10);
    PrintDigit(n/10);
  }
}
```

##二叉树
BTNode:

* 数据域 element
* 左孩子指针 lchild
* 右孩子指针 rchild

BinaryTree: bt

* 根节点指针 root

### 递归

type funtree(BinaryTree *bt){
    调用fun(bt->root)
}

type fun(BTNode *t){

}

### 求总结点个数

```c
int TreeSize(BinaryTree *bt){
    return Size(bt->root);
}

int Size(BTNode *t){
    if(t==NULL) return 0;
    else return Size(t->lchild)+Size(t->rchild)+1;
}
```

### 分别度为2的结点个数

```c
// 统计二叉树中度为2的节点个数
int CountTree(BinaryTree *bt) {
    return Count(bt->root);
}

// 递归函数：统计度为2的节点个数
int Count(BTNode *t) {
    if (!t) return 0;
    if (t->rChild != NULL && t->lChild != NULL)
        return Count(t->rChild) + Count(t->lChild) + 1;   //自己是 ➕自己
    else
        return Count(t->rChild) + Count(t->lChild);      //自己不是不加自己
}
```

### 度为1的结点个数

```c
// 统计二叉树中度为1的节点个数
int CountTree(BinaryTree *bt) {
    return Count(bt->root);
}

// 递归函数：统计度为1的节点个数
int Count(BTNode *t) {
    if (!t) return 0;
    if ((t->rChild != NULL && t->lChild == NULL) || (t->rChild == NULL && t->lChild != NULL))
        return Count(t->rChild) + Count(t->lChild) + 1;
    else
        return Count(t->rChild) + Count(t->lChild);
}
```

### 叶子结点个数

```c
// 计算二叉树 bt 中非叶子节点的数量
int CountTree(BinaryTree *bt)
{
    return Count(bt->root);
}

// 计算以 t 为根节点的子树中非叶子节点的数量
int Count(BTNode *t)
{
    if (!t) // 如果 t 为空，返回 0
        return 0;

    if (t->lChild != NULL || t->rChild != NULL) // 如果 t 有左子节点或右子节点   ||短路特性  否条件
        return Count(t->lChild) + Count(t->rChild); // 不是叶子结点继续递归
    else
        return 1; // 自己是 ➕1
}
```

### 交换二叉树的左右子树

```c
void SwapTree(BinaryTree *bt) {
    Swap(bt->root);
}

// 递归函数：交换二叉树节点的左右子树
void Swap(BTNode *t) {
    if (!t) return;
    BTNode *temp = t->lChild;
    t->lChild = t->rChild;
    t->rChild = temp;
    Swap(t->lChild);
    Swap(t->rChild);
}
```

### 计算二叉树高度(左右子树判断)

```c
int HeightTree(BinaryTree *bt) {
    return Height(bt->root);
}

// 递归函数：计算二叉树节点高度
int Height(BTNode *t) {
    if (!t) return 0;
    return max(Height(t->rChild), Height(t->lChild)) + 1;
}

```

### 判断一棵树是否为满二叉树

```c
Bool CheckFullTree(BinaryTree *bt) {
    return CheckFull(bt->root);
}

int Height(BTNode *t) {
    // 实现不明确，假设已经实现
}

int Node(BTNode *t) {
    // 实现不明确，假设已经实现
}

Bool CheckFull(BTNode *t) {
    int h = Height(t);   // 获取树的高度
    int n = Node(t);     // 获取树的节点数
    // 判断是否满足满二叉树的条件：节点数 = 2^高度 - 1
    if (n == pow(2, h) - 1) return 1;
    return 0;
}
```

### 判断一棵二叉树是否是最大堆

```c
int flag = 1;   

Bool CheckTree(BinaryTree *bt) {
    Check(bt->root);
    if (flag == 1) return 1;
    else return 0;
}

Bool Check(BTNode *t) {
    if (!t) return 0;
    if ((t->element < t->lChild->element) || (t->element < t->rChild->element)) {
        flag = 0;
    }
    Check(t->lChild);
    Check(t->rChild);
}
/*
完全二叉树：所有层（除了最后一层）必须是满的，且最后一层的节点必须尽量左对齐。
堆序性：每个节点的值都必须大于或等于其子节点的值。
*/
```

### 判断是否为最小堆

```c
// 判断二叉树是否为最小堆的函数
Bool CheckTree(BinaryTree *bt) {
    Check(bt->root);
    return flag;
}

// 递归函数：检查二叉树节点是否满足最小堆性质
void Check(BTNode *t) {
    if (!t) return;
    // 检查左子节点
    if (t->lChild && t->element > t->lChild->element) {
        flag = 0;
    }
    // 检查右子节点
    if (t->rChild && t->element > t->rChild->element) {
        flag = 0;
    }
    Check(t->lChild);
    Check(t->rChild);
}
```

### 判断是否为二叉扩充树

```c
// 判断二叉树是否为扩充二叉树
bool CheckTree(BinaryTree *bt) {
    Check(bt->root);
    if (flag == 1) return true;
    else return false;
}

// 递归检查每个节点是否符合扩充二叉树的条件
void Check(BTNode *t) {
    if (!t) return;
  
    // 如果一个节点有一个子节点而没有另一个子节点，设置标志为0
    if ((t->lChild == NULL && t->rChild != NULL) || (t->lChild != NULL && t->rChild == NULL)) {
        flag = 0;
    }
  
    Check(t->lChild);
    Check(t->rChild);
}
/*
完全二叉树：除了最后一层，所有层都必须是满的，而且最后一层的节点必须尽量左对齐。
扩充二叉树：每个节点都必须有两个子节点（无论是内部节点还是叶节点），叶节点的子节点都为NULL。
*/
```

### 判断是否是二叉搜索树

```c
int flag = 1;  
bool CheckTree(BinaryTree *bt) {
    Check(bt->root);
    return flag == 1;  // 简化返回语句
}

// 递归检查每个节点是否满足二叉搜索树的性质
bool Check(BTNode *t) {
    if (!t) return true;  // 空节点认为是二叉搜索树
  
    // 检查左子树的值是否都小于当前节点
    if (t->lChild && t->lChild->element >= t->element) {
        flag = 0;
        return false;
    }
  
    // 检查右子树的值是否都大于当前节点
    if (t->rChild && t->rChild->element <= t->element) {
        flag = 0;
        return false;
    }
  
    // 递归检查左右子树
    return Check(t->lChild) && Check(t->rChild);
}
```

### 判断线性表是否是有序表

```c
int flag = 1;
Bool Check(SeqList *L) {
    for (int i = 0; i < L.n - 1; i++) {
        if (L.element[i]> L.element[i + 1]) {
            flag = 0;
        }
    }
  if(flag == 1) return 1;
  else return 0;
}
```

### 判断一棵二叉搜索树是AVL

```c
int flag = 1; // 标志位，初始值为1，用于记录树是否平衡

// 检查二叉树是否是AVL树
Bool CheckTree(BinaryTree *bt) {
    Check(bt->root); // 检查根节点
    if (flag == 1) return 1; // 如果flag仍为1，说明树是平衡的
    else return 0; // 否则，树是不平衡的
}

// 计算节点的高度
int Height(BTNode *t) {
    if (!t) return 0; // 如果节点为空，高度为0
    return max(Height(t->lChild), Height(t->rChild)) + 1; // 返回左右子树中较大的高度+1
}

// 递归检查节点及其子树是否平衡
Bool Check(BTNode *t) {
    if (!t) return 0; // 如果节点为空，返回0
    // 如果左右子树高度差的绝对值大于1，设置flag为0，表示树不平衡
    if (abs(Height(t->lChild) - Height(t->rChild)) > 1) {
        flag = 0;
    }
    Check(t->lChild); // 递归检查左子树
    Check(t->rChild); // 递归检查右子树
}
/*
同时满足
二叉树的每个节点的左子树和右子树都是二叉搜索树。
二叉树的每个节点的左子树和右子树的高度差不超过1。
*/
```

### 判断是否是AVL搜索树

```c
int flag = 1; 
Bool CheckTree(BinaryTree *bt) {
    Check(bt->root); // 检查根节点
    if (flag == 1) return 1; // 如果flag仍为1，说明树是平衡的
    else return 0; // 否则，树是不平衡的
}

// 计算节点的高度
int Height(BTNode *t) {
    if (!t) return 0; // 如果节点为空，高度为0
    return max(Height(t->lChild), Height(t->rChild)) + 1; // 返回左右子树中较大的高度+1
}

// 递归检查节点及其子树是否平衡
Bool Check(BTNode *t) {
    if (!t) return 0; // 如果节点为空，返回0
    // 如果左右子树高度差的绝对值大于1，设置flag为0，表示树不平衡
  	if ((t->lChild->element > t->element) || (!t->rChild->element < t->element))  // 一个子节点的情况
        flag = 0;
    if (abs(Height(t->lChild) - Height(t->rChild)) > 1) {
        flag = 0;
    Check(t->lChild); // 递归检查左子树
    Check(t->rChild); // 递归检查右子树
}
```

### 判断是否是二叉完全树

```c
bool CheckTree(BinaryTree *bt) {
    return Check(bt->root,0,Node(bt->root));
  
}
int Node(BTNode *t) {
    if (!t) return 0;
    return Node(t->lChild) + Node(t->rChild) + 1;
}

Bool Check(BTNode *t,int index,int totalNodes) {
    if (!t) return true;
    if (index >= totalNodes) return false;
    return Check(t->lChild,2*index+1,totalNodes) && Check(t->rChild,2*index+2,totalNodes);
}
```

### 求二叉树宽度

```c
int Width(BinaryTree *bt) {
    int h = Height(bt->root);
    int w[h+1];        //w[0]未使用
    for (int i = 0; i < h; i++) w[i] = 0;
    Width(bt->root,w,1);
    for (int i = 0; i < h; i++) {
        if (w[i] > max) max = w[i];
    }
    return max;
}


void Width(BTNode *t,int w[],int level) {
    if (!t) return;
    w[level]++;
    Width(t->lChild,w,level++);
    Width(t->rChild,w,level++);
}
```

### 求内外路径长度

```c
void Path(BinaryTree *bt,int *ipath,int *epath) {
    ipath=epath=0;
    Path(bt->root,ipath,epath,1);
}

int Path(BTNode *t,int *ipath,int *epath,int level) {
    if (!t) return 0;
    if (t->lChild == NULL && t->rChild == NULL) 
        epath += level-1;
  
    else
        ipath+=level-1;
    Path(t->lChild,ipath,epath,++level);
    Path(t->rChild,ipath,epath,++level);
}
```

### 加权路径长度

```c
int WPL(BinaryTree *bt) {
    int sum = 0;
    WPL(bt->root,1,sum);
    return sum;
}

int WPL(BTNode *t,int level,int *sum) {
    if (!t) return 0;
    if (t->lChild == NULL && t->rChild == NULL)
        *sum += (level-1)*t->element;
    WPL(t->lChild,++level,sum);
    WPL(t->rChild,++level,sum);
}
```

### 求二叉树从根结点开始的路径中判断是否存在路径和为定值的路径

```c
int flag = 0;
bool CheckPath(BinaryTree *bt,int sum) {
    Check(bt->root,sum);
    return flag;
}

void Check(BTNode *t,int lastnum,int sum) {
    if (!t) return ;
    int newnum = lastnum + t->element;
    if (newnum == sum) 
        flag = 1;
    else if(newnum < sum) {
        Check(t->lChild,newnum,sum);
        Check(t->rChild,newnum,sum);
    }
    else return;
}

```

### 一个二叉树高度与宽度相同则为正方树，判断是否为正方树

```c
//判高度
//判宽度
Bool Check(BinaryTree *bt) {
    return Height(bt->root) == Width(bt->root);
}

```

### 删除二叉搜索树最大元素

```c
void DeleteMax(BinaryTree *bt) {
    BTNode *p = bt->root;
    if(p->rChild == NULL&&p->lChild == NULL) {
        bt->root = NULL;
        free(p);
    }
    while(p->rChild->rChild != NULL)
        p = p->rChild;
    BTNode *q = p->rChild;
    if(q->lChild == NULL){
        p->rChild = NULL;
        free(q);
    }  
    else
        p->rChild = q->lChild;
    free(q);
}
```

### 二叉搜索树插入一个元素

```c
bool Insert(BinaryTree *bt, int e) {
    // 创建新节点
    BTNode *q = (BTNode *)malloc(sizeof(BTNode));
    q->element = e;
    q->lChild = q->rChild = NULL;
  
    // 空树情况
    if (bt->root == NULL) {
        bt->root = q;
        return true;
    }
  
    // 查找插入位置
    BTNode *p = bt->root;
    BTNode *parent = NULL;  // 记录父节点
    bool isLeft = false;    // 记录是左子树还是右子树
  
    while (p != NULL) {
        parent = p;
        if (e < p->element) {
            p = p->lChild;
            isLeft = true;
        } else {
            p = p->rChild;
            isLeft = false;
        }
    }
  
    // 插入新节点
    if (isLeft) {
        parent->lChild = q;
    } else {
        parent->rChild = q;
    }
  
    return true;
}
```

### 在二叉搜索树中删除一个元素 必存在x且元素为x不同时拥有左右子树

```c
bool Delete(BinaryTree *bt, int x) {
    // 查找要删除的节点及其父节点
    BTNode *p = bt->root;
    BTNode *parent = NULL;
    bool isLeft = false;
  
    while (p->element != x) {
        parent = p;
        if (x < p->element) {
            p = p->lChild;
            isLeft = true;
        } else {
            p = p->rChild;
            isLeft = false;
        }
    }
  
    // 删除节点p
    if (p->rChild == NULL) {  // 只有左子树
        if (parent == NULL) {
            bt->root = p->lChild;
        } else if (isLeft) {
            parent->lChild = p->lChild;
        } else {
            parent->rChild = p->lChild;
        }
    }
    else if (p->lChild == NULL) {  // 只有右子树
        if (parent == NULL) {
            bt->root = p->rChild;
        } else if (isLeft) {
            parent->lChild = p->rChild;
        } else {
            parent->rChild = p->rChild;
        }
    }
    else {  // 有左右子树
        BTNode *s = p->lChild;
        BTNode *ps = p;
      
        while (s->rChild != NULL) {  // 找左子树最大值
            ps = s;
            s = s->rChild;
        }
      
        p->element = s->element;
      
        if (ps == p) {
            ps->lChild = s->lChild;
        } else {
            ps->rChild = s->lChild;
        }
        p = s;
    }
  
    free(p);
    return true;
}
```

### 删除二叉树最左侧结点

```c
void DeleteLeft(BinaryTree *bt) {
    if (bt->root == NULL) return;  // 空树直接返回
  
    BTNode *p = bt->root;
  
    // 如果根节点就是最左节点
    if (p->lChild == NULL) {
        bt->root = p->rChild;      // 根节点的右子树成为新的根
        free(p);
        return;
    }
  
    // 找到最左节点的父节点
    while (p->lChild->lChild != NULL) {
        p = p->lChild;
    }
  
    // 删除最左节点
    BTNode *q = p->lChild;         // q指向最左节点
    p->lChild = q->rChild;         // 父节点指向最左节点的右子树
    free(q);
}
```

## 邻接矩阵

MGraph mg

* 二维数组 a【】【】
* 边数e，顶点数n
* 带权图无边 noEdge

### 无向图不带权查找

```c
bool Find(MGraph *mg,int v1,int v2) {
    if(v1<0||v2<0||v1>=mg->n||v2>=mg->n) return 0;
    if(v1==v2) return 0;
    if(mg->a[v1][v2] == 1) return 1;   //带权 mg->a[v1][v2] != noEdge
    else return 0;
}
```

### 添加边有向图

```c
void AddEdge(MGraph *mg,int v1,int v2) {
    //判越界
    //判自环
    if(mg->a[v1][v2] != 0) return 0;
    mg->a[v1][v2] = 1; //无向图舍一个
    mg->a[v2][v1] = 1;
    mg->e++;
    return 1;
}
```

### 删除边无向图

```c
void DeleteEdge(MGraph *mg,int v1,int v2) {
    //判越界
    //判自环
    if(mg->a[v1][v2] == 0) return 0;
    mg->a[v1][v2] = 0;
    mg->a[v2][v1] = 0;
    mg->e--;
    return 1;
}
```

## 邻接表

* ENode（边节点）:

  - adjVex：这条边指向哪个顶点
  - nextArc：指向下一条边
  - w：权重
* LGraph（图结构）:

  - a[]：每个顶点的边链表的头指针数组
  - e：图中总共有多少条边
  - n：图中总共有多少个顶点

### 无向图不带权查找

```c
bool Find(LGraph *lg,int v1,int v2) {
    //判越界
    //判自环
    ENode *p = lg->a[v1];
    while(p != NULL) {
        if(p->adjVex == v2) return 1;
        p = p->nextArc;
    }
    return 0;
}
```

### 添加边无向图（头插 尾插：尾指针）

```c
void AddEdge(LGraph *lg,int v1,int v2) {
    //判越界
    //判自环
    ENode *p = (ENode *)malloc(sizeof(ENode));
    p->adjVex = v2;
    //头插
    p->nextArc = lg->a[v1];
    lg->a[v1] = p;
    lg->e++;
    return 1;
}
```

### 删除边无向图

```c
void DeleteEdge(LGraph *lg, int v1, int v2) {
    ENode *p = lg->a[v1];      // 当前节点
    ENode *prev = NULL;        // 前一个节点
  
    // 查找要删除的边
    while (p->adjVex != v2) {
        prev = p;
        p = p->nextArc;
    }
  
    // 删除边
    if (prev == NULL) {        // 是第一条边
        lg->a[v1] = p->nextArc;
    } else {                   // 不是第一条边
        prev->nextArc = p->nextArc;
    }
  
    free(p);
    lg->e--;
}
```

### 求出度、入度 邻接矩阵

```c
bool Degree(MGraph *mg, int v, int *InDegree, int *OutDegree) {
    // 检查顶点是否合法
    if (v < 0 || v >= mg->n) return false;
  
    *InDegree = *OutDegree = 0;
  
    // 计算度数
    for (int i = 0; i < mg->n; i++) {
        if (mg->a[v][i] != 0) {     // 第v行非零元素个数是出度
            (*OutDegree)++;
        }
        if (mg->a[i][v] != 0) {     // 第v列非零元素个数是入度
            (*InDegree)++;
        }
    }
  
    return true;
}
```

### 求出度、入度 邻接表

```c
bool Degree(LGraph *lg, int v, int *InDegree, int *OutDegree) {
    // 检查顶点是否合法
    if (v < 0 || v >= lg->n) return false;
  
    *InDegree = *OutDegree = 0;
  
    // 计算出度：遍历v的边链表
    ENode *p = lg->a[v];
    while (p != NULL) {
        (*OutDegree)++;
        p = p->nextArc;
    }
  
    // 计算入度：遍历所有顶点的边链表
    for (int i = 0; i < lg->n; i++) {
        p = lg->a[i];
        while (p != NULL) {
            if (p->adjVex == v) {
                (*InDegree)++;
            }
            p = p->nextArc;
        }
    }
  
    return true;
}
```

### 求有向不带权图中出度与入度相同点个数

```c
int Count(MGraph *mg) {
    int InDegree,OutDegree;
    int count = 0;
    for(int i=0;i<lg->n;i++) {
        InDegree=0,OutDegree=0;
        for(int j=0;j<mg->n;j++) {
            if(mg->a[i][j] != 0) OutDegree++;
            if(mg->a[j][i] != 0) InDegree++;
        }
        if(InDegree == OutDegree) count++;
    }
    return count;
}
```

### 有向图 邻接表转邻接矩阵

```c
void Convert(LGraph *lg,MGraph *mg) {
    mg->n = lg->n;
    mg->e = lg->e;
    for(int i=0;i<mg->n;i++) {
        for(int j=0;j<mg->n;j++) {
            mg->a[i][j] = 0;
        }
    }
    for(int i=0;i<lg->n;i++) {
        ENode *p = lg->a[i];
        while(p != NULL) {
            mg->a[i][p->adjVex] = 1;
            p = p->nextArc;
        }
    }
}
```

### 有向图 邻接矩阵转邻接表

```c
void Convert(MGraph *mg,LGraph *lg) {
    lg->n = mg->n;
    lg->e = mg->e;
    for(int i=0;i<lg->n;i++) {
        for(int j=0;j<lg->n;j++) {
            if(mg->a[i][j] != 0) {
                ENode *p = (ENode *)malloc(sizeof(ENode));
                p->adjVex = j;
                p->nextArc = lg->a[i];
                lg->a[i] = p;
            }
        }
    }
}
```

### 有向图按邻接表存储 将出度邻接表改为入度邻接表

```c
void Convert(LGraph *lgA, LGraph *lgB) {
    // 复制顶点数和边数
    lgB->n = lgA->n;
    lgB->e = lgA->e;
  
    // 遍历图A的每个顶点
    for (int i = 0; i < lgA->n; i++) {
        ENode *PA = lgA->a[i];
      
        // 遍历顶点i的所有出边
        while (PA != NULL) {
            // 创建新边节点
            ENode *p = (ENode *)malloc(sizeof(ENode));
            p->adjVex = i;                     // 原来的起点变为终点
          
            // 头插法插入到B图中
            p->nextArc = lgB->a[PA->adjVex];   // 连接到对应链表
            lgB->a[PA->adjVex] = p;            // 更新头指针
          
            PA = PA->nextArc;                  // 处理下一条边
        }
    }
}
```

### 邻接表DFS

```c
void DFS(LGraph *lg,int u,int visited[]) {
    visited[u] = 1;
    ENode *p = lg->a[u];
    while(p != NULL) {
        if(visited[p->adjVex] == 0) DFS(lg,p->adjVex,visited);
        p = p->nextArc;
    }
}
```

### 判断有向图G用邻接表存储，判断图G是否联通

```c
bool IsConnected(LGraph *lg) {
    int visited[lg->n];
    for(int i=0;i<lg->n;i++) visited[i] = 0;
    DFS(lg,0,visited);
    for(int i=0;i<lg->n;i++) {
        if(visited[i] == 0) return 0;
    }
    return 1;
}
```

### 判断有向图G用邻接表存储，求连通分量个数

```c
int CountConnectedComponents(LGraph *lg) {
    int visited[lg->n];
    for(int i=0;i<lg->n;i++) visited[i] = 0;
    int count = 0;
    for(int i=0;i<lg->n;i++) {
        if(visited[i] == 0) {
            DFS(lg,i,visited);
            count++;
        }
    }
    return count;
}
```

### 判断一个邻接表存储无向图是否是一颗树

```c
bool IsTree(LGraph *lg) {
    //判断边数是否等于顶点数-1
    if(lg->e != lg->n-1) return 0;
    //判断是否联通
    int visited[lg->n];
    for(int i=0;i<lg->n;i++) visited[i] = 0;
    DFS(lg,0,visited);
    for(int i=0;i<lg->n;i++) {
        if(visited[i] == 0) return 0;
    }
    return 1;
}
```

### 有向图用邻接表存储，求顶点个数为k的连通分量个数

```c
void DFS(LGraph *lg, int u, int visited[], int n) {
    visited[u] = 1;  // 标记当前节点为已访问
    n++;          // 增加当前连通分量的大小

    // 遍历所有邻接点
    ENode *p = lg->a[u];
    while (p != NULL) {
        if (!visited[p->adjVex]) {
            DFS(lg, p->adjVex, visited, n);
        }
        p = p->nextArc;
    }
}

int Count(LGraph *lg,int k) {
    int n=0;
    int visited[lg->n];
    for(int i=0;i<lg->n;i++) visited[i] = 0;
    for(int i=0;i<lg->n;i++) {
        n=0;
        if(visited[i] == 0) DFS(lg,i,visited,n);
        if(n == k) cnt++;
    }
    return n;
}
```

### 有向图用邻接表存储，判断是否有从i到j路径长度为k的路径

```c
// DFS搜索长度为k的路径
// u: 当前顶点
// pathlen: 当前路径长度
// j: 目标顶点
bool DFS(LGraph *lg, int u, int visited[], int pathlen, int j) {
    // 剪枝：路径长度超过k，停止搜索
    if (pathlen > k) return false;
  
    // 找到目标顶点且路径长度为k
    if (u == j && pathlen == k) return true;
  
    visited[u] = 1;  // 标记当前顶点已访问
  
    // 遍历当前顶点的所有邻接点
    ENode *p = lg->a[u];
    while (p != NULL) {
        // 如果邻接点未访问，继续搜索
        if (!visited[p->adjVex]) {
            if (DFS(lg, p->adjVex, visited, pathlen + 1, j)) {
                return true;  // 找到符合条件的路径
            }
        }
        p = p->nextArc;
    }
  
    visited[u] = 0;  // 回溯：取消标记
    return false;    // 未找到符合条件的路径
}

// 判断是否存在从i到j长度为k的路径
bool Path(LGraph *lg, int i, int j, int k) {
    int visited[MAX_SIZE] = {0};  // 初始化访问数组
    return DFS(lg, i, visited, 0, j);  // 从顶点i开始搜索
}

```
