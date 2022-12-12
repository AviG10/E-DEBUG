#include<iostream>
#include<stack>
#include<vector>

using namespace std;

class Solution {
public:
    int firstMissingPositive(vector<int> &nums) {
        int n=nums.size();
        for(int i=0 ; i<n-1 ; i++){
            while(nums[i]>0 and nums[i] <= n and nums[i] != nums[nums[i]-1]){
                swap(nums[i],nums[nums[i]-1]);
            }
        }
        
        for(int i=0 ; i<n ; i++) 
            if(nums[i] != i+1) 
                return i+1;
        
        return n+1;
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
    
    int ans = ob.firstMissingPositive(v);
    cout<<ans<<endl;

    return 0;
}
