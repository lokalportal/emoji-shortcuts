import replaceAsciiAliases from '../src/'

describe('replaceAsciiAliases', () => {
  describe('should convert ascii shortcut to utf8 emojis', ()=> {
    test('single', () => {
      expect(replaceAsciiAliases(':)')).toEqual('😃')
    })

    test('multiple', () => {
      expect(replaceAsciiAliases(':) :/')).toEqual('😃 😕')
    })
    
    test('in text', () => {
      expect(replaceAsciiAliases('Hello :) test :/ bla')).toEqual('Hello 😃 test 😕 bla')
    })

    test('concatinated', () => {
      expect(replaceAsciiAliases(':):/')).toEqual('😃😕')
    })

    test('concatinated with text', () => {
      expect(replaceAsciiAliases('hello:)')).toEqual('😃😕')
    })
  })
  describe('should not convert ascii shortcut to utf8 emojis', () => {

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
