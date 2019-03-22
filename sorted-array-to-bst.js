function TreeNode(val) {
    this.val = val;
    this.left = this.right = null;
}

var sortedArrayToBST = function (nums) {
    let start = 0;
    let end = nums.length - 1;
    const generateNode = function (start, end) {
        if (start === end) {
            if(nums[end] === undefined){
                return null;
            }
            return new TreeNode(nums[end]);
        }

        if(start > end){
            return null;
        }

        let middle = Math.ceil(start + (end - start) / 2)
        let node = new TreeNode(nums[middle]);
        node.left = generateNode(start, middle - 1);
        node.right = generateNode(middle + 1, end);
        
        return node;
    }

    return generateNode(0, nums.length - 1)
};

console.log(sortedArrayToBST([-10,-3,0,5,9]))