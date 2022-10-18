# Flatlist plugin for Flipper 
This package exposes FlatList metrics and private variables from React Native (Web) directly to flipper.

<img src="https://github.com/azimgd/flipper-flatlist/blob/main/docs/screenshot.png?raw=true" />

## Installation
Install the plugin and specify it in your .babelrc with the custom environment. Here's an example:

```
[path.resolve(__dirname, '../babel-plugin/index.js'), {
  environment: 'web', // [web|native]
}],
```

### Web
`yarn add js-flipper --dev`

### Native
`yarn add react-native-flipper --dev`

