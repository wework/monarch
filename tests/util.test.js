const { isJSFile, removeSpecialChars, getReferenceComponent, CUSTOM_TYPE, CHILD_TYPE } = require('../util/');

describe('#removeSpecialChars', () => {
  test("returns string without ` or '", () => {
    expect(removeSpecialChars("we have some ```quotes``` and 'then' things\n more things")).toEqual('we have some quotes and then things more things')
  })
});

describe('#isJSFile', () => {
  test('when there is a valid javascript file', () => {
    expect(isJSFile('someJSFile.js')).toEqual(true);
  });

  test('when there is an invalid javascript file', () => {
    expect(isJSFile('someJSFile.jpg')).toEqual(false);
  });
});

const ReferencedComponent = 'ReferencedComponent';

describe('#getReferenceComponent', () => {
  test('without any validatorFuncName', () => {
    expect(getReferenceComponent({ raw: `${CUSTOM_TYPE}(${ReferencedComponent})` })).toEqual(ReferencedComponent)
  })

  test('without any validatorFuncName, required', () => {
    expect(getReferenceComponent({ raw: `${CUSTOM_TYPE}(${ReferencedComponent}).isRequired` })).toEqual(ReferencedComponent)
  })

  test(`with ${CHILD_TYPE}`, () => {
    expect(getReferenceComponent({ raw: `${CHILD_TYPE}(${ReferencedComponent})` }, CHILD_TYPE )).toEqual(ReferencedComponent)
  })

  test(`with ${CHILD_TYPE}, required`, () => {
    expect(getReferenceComponent({ raw: `${CHILD_TYPE}(${ReferencedComponent}).isRequired` }, CHILD_TYPE)).toEqual(ReferencedComponent)
  })
})
