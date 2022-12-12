#include<iostream>
#include<stack>
#include<vector>
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
    vector<int> nextLargerNodes(ListNode* head) {
        ListNode* temp = head;
        vector<int> nums;
        
        while(temp != NULL){ 
            nums.push_back(temp->val);
            temp = temp->next;
        }
        
        vector<int> ans;
        stack<int> st;
        int n = nums.size();
        
        for(int i = n-1;i >= 0;i--){
            while(!st.empty() && st.top() <= nums[i]){
                st.pop();
            }
            
            int res = (st.empty()) ? 0 : st.top();
            ans.push_back(res);
            st.push(nums[i]);
        }
        
        return ans;
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
    
    vector<int> ans = ob.nextLargerNodes(dummy->next);
    for(int i =0;i < n;i++){
        cout<<ans[i]<<" ";
    }
    cout<<endl;

    return 0;
}
