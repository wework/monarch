const { isJSFile, removeSpecialChars, getReferenceComponent } = require('../util/');

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

const ReferencedComponent = 'ReferencedComponent';

describe('#getReferenceComponent', () => {
  test('without any validatorFuncName', () => {
    expect(getReferenceComponent({ raw: `customPropType(${ReferencedComponent})` })).toEqual(ReferencedComponent)
  })

  test('without any validatorFuncName, required', () => {
    expect(getReferenceComponent({ raw: `customPropType(${ReferencedComponent}).isRequired` })).toEqual(ReferencedComponent)
  })

  test('with childType', () => {
    expect(getReferenceComponent({ raw: `childType(${ReferencedComponent})` }, 'childType' )).toEqual(ReferencedComponent)
  })

  test('with childType, required', () => {
    expect(getReferenceComponent({ raw: `childType(${ReferencedComponent}).isRequired` }, 'childType')).toEqual(ReferencedComponent)
  })
})
