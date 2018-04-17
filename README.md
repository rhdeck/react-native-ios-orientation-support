# react-native-ios-orientation-support

React-Native plugin for managing supported orientations in iOS XCode projects

# Usage

All of the command line extensions modify your package.json file, but do not commit to your XCode project.

## react-native addorientations [up][down] [left][right] [ipad]

Adds orientation support in those directions. Mark as ipad for ipad-specific directions (for example, iPhone app might be limited to portrait-only but iPads rarely have such a restriction)

## react-native removeorientation [orientation][ipad]

Removes support from one (1) orientation. Similarly mark as ipad-specific for those cases

## react-native clearorientations [ipad]

Removes all designated orientations, so that react-native link will no longer express an opinion as to the correct orientation going forward. Mark "ipad" to just remove the ipad-specific orientations

## react-native link

Sets supported orientations based on the settings expressed in your package.json using the tools above.
