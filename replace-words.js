/**
 * In English, we have a concept called root, which can be followed by some other words to form another longer word - let's call this word successor. For example, the root an, followed by other, which can form another word another.

 *  Now, given a dictionary consisting of many roots and a sentence. You need to replace all the successor in the sentence with the root forming it. If a successor has many roots can form it, replace it with the root with the shortest length.

    You need to output the sentence after the replacement.

    Example 1:

    Input: dict = ["cat", "bat", "rat"]
    sentence = "the cattle was rattled by the battery"
    Output: "the cat was rat by the bat" 
*/


/**
 * @param {string[]} dict
 * @param {string} sentence
 * @return {string}
 */
var replaceWords = function (dict, sentence) {
    //useing Trie
    const Trie = function () {
        this.children = [];
        this.word = "";
    }

    //build string prefix tree or it may be called Trie;
    let trie = new Trie();
    for (let i = 0; i < dict.length; i++) {
        let cur = trie;
        for (let j = 0; j < dict[i].length; j++) {
            let letter = dict[i][j].charCodeAt() - 97;
            if (cur.children[letter] === undefined) {
                cur.children[letter] = new Trie();
            }

            cur = cur.children[letter];
        }
        cur.word = dict[i];
    }

    console.log('log', trie);

    sentence = sentence.split(' ');
    let output = [];
    for (let i = 0; i < sentence.length; i++) {
        let cur = trie;
        for (let j = 0; j < sentence[i].length; j++) {
            if (cur.children[sentence[i][j].charCodeAt() - 97] === undefined) {
                break;
            }
            if (cur.word) {
                break;
            }
            cur = cur.children[sentence[i][j].charCodeAt() - 97];
        }
        output.push(cur.word || sentence[i]);
    }

    return output.join(' ');
};

const dict = ["a", "aa", "aaa"];
const sentence = "a aaa aaaaa aabbb bbaba aaaaaa";

replaceWords(dict, sentence);