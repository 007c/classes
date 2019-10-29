//输入一个英文句子， 翻转句子中的单词顺序;

function reverse(sentence, begin, end) {
    sentence = sentence.split('');
    while (begin < end) {
        let tmp = sentence[begin];
        sentence[begin] = sentence[end];
        sentence[end] = tmp;
        begin++;
        end--
    }
    return sentence.join('');
}

function reverseSentence(sentence) {
    let reversed = reverse(sentence, 0, sentence.length - 1);
    let begin = 0;
    let i
    for (i = 0; i < reversed.length; i++) {
        if (reversed[begin] === " ") {
            begin++;
        } else if (reversed[i] === " ") {
            reversed = reverse(reversed, begin, i - 1);
            begin = i + 1;
        }
    }

    reversed = reverse(reversed, begin, i - 1);
    return reversed;
}

console.log(reverseSentence("i am a student. "))


let reversed = "abcdefg";
reversed = reverse(reversed, 0, 1);
reversed = reverse(reversed, 2, 6);
reversed = reverse(reversed, 0, 6);

console.log(reversed)