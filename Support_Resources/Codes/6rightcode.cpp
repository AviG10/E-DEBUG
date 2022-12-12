#include<iostream>
using namespace std;

struct ListNode{
    public:
        int val;
        ListNode *next;
        
        ListNode(){
            val = 0;
            next = NULL;
        }
        ListNode(int x){
            val = x;
            next = NULL;
        }
        ListNode(int x, ListNode *nextNext){
            val = x;
            next = nextNext;
        }
};


class Solution {
public:
    ListNode* reverseList(ListNode* head) {
        ListNode* prev = NULL;
        ListNode* cur = head;
        
        while(cur){
            ListNode* temp = cur->next;
            cur->next = prev;
            prev = cur;
            cur = temp;
        }
        
        return prev;
    }
};

int main(){
    Solution ob;
    int n;
    cin>>n;
    
    ListNode *dummy = new ListNode();
    ListNode *store = dummy;

    for(int i=0;i<n;i++){
        int k;
        cin>>k;
        ListNode* temp = new ListNode(k);
        store->next = temp;
        store = store->next;
    }
    
    ListNode* ans = ob.reverseList(dummy->next);
    while(ans != NULL){
        cout<<ans->val<<" ";
        ans = ans->next;
    }
    cout<<endl;

    return 0;
}
