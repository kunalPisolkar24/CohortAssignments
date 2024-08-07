/*
  Write a function `isAnagram` which takes 2 parameters and returns true/false if those are anagrams or not.
  What's Anagram?
  - A word, phrase, or name formed by rearranging the letters of another, such as spar, formed from rasp.
*/

function isAnagram(str1, str2) {
  if (str1.length !== str2.length) {
    return false;
  }

  const map = {};
  for (let i = 0; i < str1.length; i++) {
    const char = str1[i];
    if (map[char]) {
      map[char]++;
    } else {
      map[char] = 1;
    }
  }

  for (let i = 0; i < str2.length; i++) {
    const char = str2[i];
    if (map[char]) {
      map[char]--;
    } else {
      return false;
    }
  }

  for (const value of Object.values(map)) {
    if (value !== 0) {
      return false;
    }
  }

  return true;
}

module.exports = isAnagram;
