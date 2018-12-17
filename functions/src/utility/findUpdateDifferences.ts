// returns an object with all differences between change before and after
const findUpdateDifferences = (changeBefore, changeAfter) => {
  const fieldsUpdated = {};

  Object.keys(changeAfter).map(key => {
    // iterate through each key of updatefield, if the value on the key
    // does not match the object before the update then we know that key changed.
    // return an object with fields that changed and handle accordingly.
    let changeBeforeString = changeBefore[key];
    let changeAfterString = changeAfter[key];
    // do string comparison to handle arrays and
    if (changeAfterString !== changeBeforeString) {
      fieldsUpdated[key] = true;
    }
  });
};
