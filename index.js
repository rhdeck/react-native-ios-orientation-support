var fs = require("fs");
var path = require("path");
var glob = require("glob");
var plist = require("plist");
//Get my directory

const addOrientation = (o, isIPad) => {
  var p = getPackage();
  if (isIPad) {
    if (!p.iPadOrientations) p.iPadOrientations = [];
    if (p.iPadOrientations.indexOf(o) == -1) p.iPadOrientations.push(o);
  } else {
    if (!p.iosOrientations) p.iosOrientations = [];
    if (p.iosOrientations.indexOf(o) == -1) p.iosOrientations.push(o);
  }
  savePackage(p);
};
const removeOrientation = (o, isIPad) => {
  var p = getPackage();
  if (isIPad) {
    if (p.iPadOrientations) {
      p.iPadOrientations = p.iPadOrientations.filter(e => {
        return e != o;
      });
      if (!p.iPadOrientations.length) delete p.iPadOrientations;
    }
  } else {
    if (p.iosOrientations) {
      p.iosOrientations = p.iosOrientations.filter(e => {
        return e != o;
      });
      if (!p.iosOrientations.length) delete p.iosOrientations;
    }
  }
  savePackage(p);
};

const clearOrientations = ipadOnly => {
  var p = getPackage();
  console.log("Starting clearorientations", ipadOnly);
  delete p.iPadOrientations;
  if (!ipadOnly) delete p.iosOrientations;
  savePackage(p);
};

const getPackage = () => {
  const packagePath = path.resolve(process.cwd(), "package.json");
  if (fs.existsSync(packagePath)) {
    const p = require(packagePath);
    return p;
  }
};
const savePackage = o => {
  const packagePath = path.resolve(process.cwd(), "package.json");
  fs.writeFileSync(packagePath, JSON.stringify(o, null, 2));
};

const orientations = {
  up: "UIInterfaceOrientationPortrait",
  down: "UIInterfaceOrientationPortraitUpsideDown",
  left: "UIInterfaceOrientationLandscapeLeft",
  right: "UIInterfaceOrientationLandscapeRight"
};

const nameToOrientation = name =>
  orientations[name] ? orientations[name] : null;

module.exports = {
  nameToOrientation,
  addOrientation,
  removeOrientation,
  clearOrientations,
  getPackage,
  savePackage
};
