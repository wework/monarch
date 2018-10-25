var { isJSFile, removeSpecialChars } = require('../util/');

describe('#removeSpecialChars', () => {
  test("returns string without ` or '", () => {
    expect(removeSpecialChars("we have some ```quotes``` and 'then' things")).toEqual('we have some quotes and then things')
  })
});

describe('#isJSFile', () => {
  test('when there is a valid javascript file', () => {
    expect(isJSFile('someJSFile.js')).toEqual(true)
  })

  test('when there is an invalid javascript file', () => {
    expect(isJSFile('someJSFile.jpg')).toEqual(false)
  })
})
