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
private:
    ListNode* reverseList(ListNode* head) {
        ListNode* curr = head;
        ListNode* prev = NULL;
        while(curr != NULL )
        {
            ListNode* temp = curr->next;
            curr->next = prev;
            prev = curr;
            curr = temp;
        }
        return prev;
    }
public:
    bool isPalindrome(ListNode* head) {
        if(head == NULL || head->next == NULL)
            return true;
        
        ListNode* slow = head;
        ListNode* fast = head;
        while(fast != NULL && fast->next != NULL)
        {
            slow = slow->next;
            fast = fast->next->next;
        }
        
        slow->next = reverseList(slow->next);
        slow = slow->next;
        
        while(slow != NULL)
        {
            if(head->val != slow->val)
                return false;
            head = head->next;
            slow = slow->next;
        }
        return true;
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
    
    bool ans = ob.isPalindrome(dummy->next);
    cout<<ans<<endl;

    return 0;
}
