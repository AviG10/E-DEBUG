#include<iostream>
#include<stack>
#include<vector>

using namespace std;

class Solution {
public:
    void sortColors(vector<int> &nums) {
        int low=0,mid = 0,high = nums.size()-1;
        while(mid<=high)
        {
            if(nums[mid]==0)
            {
                swap(nums[low],nums[mid]);
                low++;
                mid++;
            }
            else
            {
                mid++;
            }
        }
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
    
    ob.sortColors(v);
    for(int i = 0;i < n;i++){
        cout<<v[i]<<" ";
    }
    cout<<endl;

    return 0;
}
