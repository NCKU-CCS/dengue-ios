# Dengue App - iOS

## Table of content
* [Getting Started](#sec-1)
* [Usage](#sec-2)
* [Develop](#sec-3)
* [Reference](#sec-4)
* [License](#sec-5)

<a name='sec-1'></a>
## Getting Started

### Environment
* This project is built on macOS 10.14.2.

### Prerequsite
* [Xcode](https://developer.apple.com/xcode/) (Version 10.1)
* [node](https://nodejs.org/en/) (6.10.3)
* [nvm](https://github.com/creationix/nvm)
* [Watchman](https://facebook.github.io/watchman/)

### Install Software

```sh
brew install node
brew install nvm
brew install watchman
```

### Setup Dengue App Backend Server
Before build the iOS App, [the backend server for dengue app](https://github.com/the-mosquito-man/dengue-app-backend-server) should be started.  
After started, you set the `APIDomain` (line 5 and 6) in `Actions.ios/global.js` to your server host.

e.g. Changing the APIDomain to `http://127.0.0.1:8000`

```js
# Actions.ios/global.js
import DeviceInfo from 'react-native-device-info';
import Storage from 'react-native-storage';
export let APIDomain
  = DeviceInfo.getModel() === 'Simulator' ?
  'http://127.0.0.1:8000'
  : 'http://127.0.0.1:8000';
```

### Build iOS App

```sh
nvm install 6.10.3
nvm use 6.10.3
npm install
sh ./fix-module.sh
rnpm link
react-native run-ios
npm start
```

A local server will start after `npm start`.

```sh
open ios/DengueFever.xcodeproj
```

After running this command, Xcode should be started.

* Click `Product` > `Clean Build Folder`
* Click `Product` > `Run`

<a name='sec-2'></a>
## Usage
* Please check [The Mosquito Man App Instruction](./doc/掌蚊人APP.pdf)


<a name='sec-3'></a>
## Develop

### Structure

* **Actions.ios**: 這個地方放 redux 的 actions , 對應每個 component
* **Component.ios**: app 的主要介面元件都放在這
    * **App.js**: app 起點,決定接下來進入app主體或是介紹頁
    * **BreedingSourceReport**: 環境髒亂回報
    * **BreedingSourceReportList**: 環境髒亂回報列表
    * **Common**: 共用的 component 放在這裡 例如： button, text 等等
    * **Global.js**: 存放一些常共用的變數：顏色 高度等等
    * **HospitalInfo**: 就醫資訊
    * **HotZoneInfo**: 熱區
    * **Intro**: 第一次登入的畫面
    * **MosquitoBiteReport**: 蚊子叮咬回報
    * **Nav**: 導覽的相關 component 包括 tabbar
    * **Nav.js**: 導覽
    * **UserSetting**: 使用者設定 包括登入 註冊都在這邊
* **README.md**
* **Reducers.ios**: redux 的 reducer 對應每個 component
* **android**: 這是 android 原生的一些檔案, 寫 code 的時候不會用到
* **img**: 圖檔
* **index.android.js**: android 的 entry
* **index.ios.js**: ios 的 entry
* **ios**: ios 原生的檔案，寫 code 的時候一樣不會用到，但設定 ios 相關東西通常用 xcode 打開裡面的 .xcodeproj
* **node_modules**
* **package.json**
* **.eslintrc.js**: coding style config

### Other
在 components 裡面很多會有一個 fucntion select 會 return 一個 object  那是代表要從 data tree 挑選出怎樣的 data 給那個 component


### JS Linter 

* Install linter dependency

```sh
npm install --save-dev
```

* Run Linter to check coding style

```sh
eslint <File>
```

* The configure file for linter is `.eslintrc.js`


<a name='sec-4'></a>
## Reference
* [React-native - Getting Started](https://facebook.github.io/react-native/docs/getting-started.html)

<a name='sec-5'></a>
## License
Copyright (c) NCKU The Mosquito Man Project. All rights reserved.

Licensed under the MIT License.
