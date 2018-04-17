#!/usr/bin/env node
var fs = require("fs");
var path = require("path");
var glob = require("glob");
var plist = require("plist");
var os = require("../index.js");
//Get my directory
var basicObj = null;
var ipadObj = null;
const p = os.getPackage();
var basicObj = p.iosOrientations;
var ipadObj = p.iPadOrientations;
const packagePath = path.resolve(process.cwd(), "package.json");
if (fs.existsSync(packagePath)) {
  const package = require(packagePath);
  if (package.iosOrientations) {
    basicObj = package.iosOrientations.map(os.nameToOrientation);
  }
  if (package.iPadOrientations) {
    ipadObj = package.iPadOrientations.map(os.nameToOrientation);
  }
}
var iosPath = path.resolve(process.cwd(), "ios");
if (!fs.existsSync(iosPath)) {
  console.log("Could not find ios in ", thisPath, iosPath);
  console.log(fs.readdirSync(thisPath));
  process.exit();
}
plists = glob.sync(path.resolve(iosPath + "/*/Info.plist"));
plists.map(path => {
  const source = fs.readFileSync(path, "utf8");
  var o = plist.parse(source);
  if (basicObj) o.UISupportedInterfaceOrientations = basicObj;
  if (ipadObj) o["UISupportedInterfaceOrientations~ipad"] = ipadObj;
  const xml = plist.build(o);
  fs.writeFileSync(path, xml);
});
