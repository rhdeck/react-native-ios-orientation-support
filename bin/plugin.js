const os = require("../index.js");
const ao = args => {
  const isIpad = args.filter(e => {
    if (!e) return false;
    return e.trim() == "ipad";
  }).length;
  args
    .filter(e => {
      if (!e) return false;
      return e.trim() != "ipad";
    })
    .forEach(o => {
      if (["up", "down", "left", "right"].indexOf(o) == -1) {
        console.log("Not a valid orientation: ", o);
        return;
      }
      os.addOrientation(o, isIpad);
    });
  console.log("Run react-native link to apply changes to the XCode project");
};
module.exports = [
  {
    name: "addorientation [up] [down] [left] [right] [ipad]",
    description:
      "Add supported orientation (up|down|left|right) (add string 'ipad' to only affect ipad orientations)",
    func: ao
  },
  {
    name: "addorientations [up] [down] [left] [right] [ipad]",
    description:
      "Add supported orientations (up|down|left|right) (add string 'ipad' to only affect ipad orientations)",
    func: ao
  },
  {
    name: "clearorientations [justIpad]",
    description:
      "Remove all supported orientations from package.json. Mark as justIpad to only remove iPad settings. (Makes settings same across both platforms)",
    func: args => {
      const justIpad = !!args[0];
      os.clearOrientations(justIpad);
      console.log(
        "Run react-native link to apply changes to the XCode project"
      );
    }
  },
  {
    name: "removeorientation [orientation] [ipad]",
    description:
      "Remove a supported orientation (up|down|left|right) (with modifier if specific to ipad",
    func: args => {
      const o = args[0];
      const isIpad = args[1];
      if (["up", "down", "left", "right"].indexOf(o) == -1) {
        console.log("Not a valid orientation: ", o);
        process.exit();
      }
      os.removeOrientation(o, isIpad);
      console.log(
        "Run react-native link to apply changes to the XCode project"
      );
    }
  }
];
