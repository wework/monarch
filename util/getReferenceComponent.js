const { CUSTOM_TYPE } = require('./constants.js');

// Gets name of reference component
module.exports = (type = {}, validatorFuncName = CUSTOM_TYPE) => {
  const splittingRef = `${validatorFuncName}(`;

  if (type.raw && type.raw.includes(splittingRef)) {
    const reference = type.raw.split(splittingRef)[1].split(')')[0];
    return reference;
  }

  return null;
};
