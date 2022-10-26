# Flatlist plugin for Flipper 
This package exposes FlatList metrics and private variables from React Native (Web) directly to flipper.

<img src="https://github.com/azimgd/flipper-flatlist/blob/main/docs/screenshot.png?raw=true" />

## Installation
Install the plugin and specify it in your .babelrc with the custom environment. Here's an example:

- Within your RN project
yarn add `babel-plugin-flipper-flatlist`

```
// in your .babelrc
[path.resolve(__dirname, 'babel-plugin-flipper-flatlist'), {
  environment: 'web', // [web|native]
}],
```

- Flipper plugin
https://www.npmjs.com/package/babel-plugin-flipper-flatlist

### Web
`yarn add js-flipper --dev`

### Native
`yarn add react-native-flipper --dev`

