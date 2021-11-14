const debugInit = require('debug')('JS-STUDY:init');
const debugMain = require('debug')('JS-STUDY:main');
const colors = require('colors');
debugInit('Debug ... through init');

function work() {
  debugMain(colors.bgYellow.black('Debug ... through main'));
  console.log(colors.bgBlue.white('Regular console work'));
  setTimeout(work, Math.random() * 1000);
}

work();
