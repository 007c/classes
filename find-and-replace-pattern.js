/**
 * 890. Find and Replace Pattern
Medium

337

31

Favorite

Share
You have a list of words and a pattern, and you want to know which words in words matches the pattern.

A word matches the pattern if there exists a permutation of letters p so that after replacing every letter x in the pattern with p(x), we get the desired word.

(Recall that a permutation of letters is a bijection from letters to letters: every letter maps to another letter, and no two letters map to the same letter.)

Return a list of the words in words that match the given pattern.

You may return the answer in any order.



Example 1:

Input: words = ["abc","deq","mee","aqq","dkd","ccc"], pattern = "abb"
Output: ["mee","aqq"]
Explanation: "mee" matches the pattern because there is a permutation {a -> m, b -> e, ...}.
"ccc" does not match the pattern because {a -> c, b -> c, ...} is not a permutation,
since a and b map to the same letter.
 */

/**
 * 
 * @param {string} word 
 * generate a word foot printer
 */
function genPrinter(word){
    let printer = "", base = 1, has =  {};
    for(let i = 0; i < word.length; i++){
        if(!has[word[i]]){
           has[word[i]] = base;
           base++;
        }
        printer += has[word[i]] + '_';
    }
    
    return printer;
}
 /**
 * @param {string[]} words
 * @param {string} pattern
 * @return {string[]}
 */

var findAndReplacePattern = function(words, pattern) {
    let patPrinter = genPrinter(pattern);
    let ans = [];
    for(let i = 0; i < words.length; i++){
        if(genPrinter(words[i]) === patPrinter){
            ans.push(words[i]);
        }
    }
    
    return ans;
};