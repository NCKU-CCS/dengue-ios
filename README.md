## Get starting
[React-Native環境設置](https://facebook.github.io/react-native/docs/getting-started.html)
## Usage
`npm install`

`rnpm link`

`react-native run-ios` for ios,
> 如果跑不起來嘗試用xcode跑ios/DengueFever.xcodeproj 或是從這裡debug

`react-native run-android` for android

#### 其他指令
`eslint [file]` 檢查coding style, 相關套件利用 `npm install --save-dev` 下載, 設定檔在`.eslintrc.js`

## Structure

>Actions.ios
```
這個地方放redux的actions, 對應每個component
```

>Component.ios
```
app的主要介面元件都放在這
```

>>App.js
```
app起點,決定接下來進入app主體或是介紹頁
```

>>BreedingSourceReport
```
環境髒亂回報
```

>>BreedingSourceReportList
```
環境髒亂回報列表
```

>>Common
```
共用的component放在這裡 例如：button, text等等
```

>>Global.js
```
存放一些常共用的變數：顏色 高度等等
```

>>HospitalInfo
```
就醫資訊
```

>>HotZoneInfo
```
熱區
```

>>Intro
```
第一次登入的畫面
```

>>MosquitoBiteReport
```
蚊子叮咬回報
```

>>Nav
```
導覽的相關component包括tabbar
```

>>Nav.js
```
導覽
```

>>UserSetting
```
使用者設定 包括登入 註冊都在這邊
```

>README.md

>Reducers.ios
```
redux的reducer 對應每個component
```

>android
```
這是android原生的一些檔案, 寫code的時候不會用到
```

>img
```
就是圖檔
```

>index.android.js
```
android的entry
```

>index.ios.js
```
ios的entry
```

>ios
```
ios原生的檔案，寫code的時候一樣不會用到，
但設定ios相關東西通常用xcode打開裡面的.xcodeproj
```

>node_modules

>package.json

>.eslintrc.js
```
coding style config
```
#### 其他
在components裡面很多會有一個fucntion select會return一個object 那是代表要從data tree挑選出怎樣的data給那個component 
## LICENSE
