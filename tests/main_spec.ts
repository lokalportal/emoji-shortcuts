import replaceAsciiAliases from '../src/'

describe('replaceAsciiAliases', () => {
  describe('should convert ascii shortcut to utf8 emojis', ()=> {
    test('single', () => {
      expect(replaceAsciiAliases(':)')).toEqual('😃')
    })

    test('multiple', () => {
      expect(replaceAsciiAliases(':) :/')).toEqual('😃 😕')
    })

    test('over multiple lines', () => {
      expect(replaceAsciiAliases(':)\n:/')).toEqual('😃\n😕')
    })

    test('starting wiht a new line', () => {
      expect(replaceAsciiAliases('\n:/')).toEqual('\n😕')
    })
    test('in text', () => {
      expect(replaceAsciiAliases('Hello :) test :/ bla')).toEqual('Hello 😃 test 😕 bla')
    })

  })
  describe('should not convert ascii shortcut to utf8 emojis', () => {

    test('concatinated', () => {
      expect(replaceAsciiAliases(':):/')).toEqual(':):/')
    })

    test('concatinated between text', () => {
      expect(replaceAsciiAliases('hello:)test')).toEqual('hello:)test')
    })

    test('concatinated before text', () => {
      expect(replaceAsciiAliases(':)test')).toEqual(':)test')
    })

    test('concatinated before text', () => {
      expect(replaceAsciiAliases(':)test')).toEqual(':)test')
    })

    test('concatinated with text', () => {
      expect(replaceAsciiAliases('hello:)')).toEqual('hello:)')
    })

    describe('as part of url', () => {

      test('in https', () => {
        expect(replaceAsciiAliases('https://test.com')).toEqual('https://test.com')
      })

      test('in http', () => {
        expect(replaceAsciiAliases('http://test.com')).toEqual('http://test.com')
      })

      test('inside url params', () => {
        expect(replaceAsciiAliases('http://test.com?param=)sdfo:)')).toEqual('http://test.com?param=)sdfo:)')
      })
    })

  })

})
