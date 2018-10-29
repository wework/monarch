module.exports = (type = {}, validatorFuncName = 'customPropType') => {
  var splittingRef = `${validatorFuncName}(`;

  if(type.raw && type.raw.includes(splittingRef)) {
    var reference = type.raw.split(splittingRef)[1].split(')')[0];
    return reference;
  }

  return null;
};
