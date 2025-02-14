export const cleanWordFromSigns = (word: string) => {
  const newWord = word.split('').slice(0, -1).join('')
  switch (word.slice(-1)) {
    case ',': {
      return {
        newWord,
        sign: ','
      }
    }
    case '.': {
      return {
        newWord,
        sign: '.'
      }
    }
    case '?': {
      return {
        newWord,
        sign: '?'
      }
    }
    case '!': {
      return {
        newWord,
        sign: '!'
      }
    }
    default: {
      return { newWord: word, sign: '' }
    }
  }
}
