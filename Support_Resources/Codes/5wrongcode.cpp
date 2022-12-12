#include<iostream>
#include<stack>
#include<vector>

using namespace std;

class Solution {
public:
    int largestRectangleArea(vector<int> &heights) {
        stack<int> st; 
        int res = 0; 
        int n = heights.size(); 
        
        for(int i = 0;i<= n;i++) {
            
            while(!st.empty() && (i == n || heights[st.top()] == heights[i])){
                int height = heights[st.top()];
                st.pop(); 
                
                int width; 
                
                if(st.empty()) 
                    width = i; 
                else 
                    width = i - st.top() - 1; 
                
                res = max(res, width * height); 
            }
            
            st.push(i); 
        }
        return res;
    }
};

int main(){
    Solution ob;
    int n;
    cin>>n;
    vector<int>v;
    for(int i=0;i<n;i++){
        int k;
        cin>>k;
        v.push_back(k);
    }
    
    int ans = ob.largestRectangleArea(v);
    cout<<ans<<endl;

    return 0;
}
