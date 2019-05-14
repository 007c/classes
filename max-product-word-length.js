/**
 * Given a string array words, find the maximum value of length(word[i]) * length(word[j]) 
 * where the two words do not share common letters. 
 * You may assume that each word will contain only lower case letters. 
 * If no such two words exist, return 0.

    Example 1:

    Input: ["abcw","baz","foo","bar","xtfn","abcdef"]
    Output: 16 
    Explanation: The two words can be "abcw", "xtfn".
    Example 2:

    Input: ["a","ab","abc","d","cd","bcd","abcd"]
    Output: 4 
    Explanation: The two words can be "ab", "cd".
    Example 3:

    Input: ["a","aa","aaa","aaaa"]
    Output: 0 
    Explanation: No such pair of words.
 */

/**
 * @param {string[]} words
 * @return {number}
 */
var maxProduct = function(words) {
    let maps = [];
    for(let i = 0; i < words.length; i++){
        let charMap = {};
        for(let j = 0; j < words[i].length; j++){
            charMap[words[i][j]] = true;
        }

        maps.push(charMap);
    }
    let maxLength = 0;
    for(let i = 0; i < words.length; i++){
        let has = maps[i];
        for(let j = i; j < words.length; j++){
            let compareWord = words[j];
            let accepted = true;
            if(words[i].length * compareWord.length > maxLength){
                for(let k = 0; k < compareWord.length; k++){
                    if(has[compareWord[k]]){
                        accepted = false;
                        break;
                    }
                }
                if(accepted){
                    maxLength = words[i].length * compareWord.length;
                }
            }
        }
    }

    return maxLength;

};

console.log(maxProduct(['a', 'ab', 'xr', 'abcw', 'abcdef', 'xrw']))