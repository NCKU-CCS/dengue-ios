import React, {
  Component,
} from 'react-native';
import Swiper from 'react-native-swiper';
import Page from './Page.js';
export default class Intro extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return(
      <Swiper showsButtons = {true}>
        <Page
          titleText = "即時熱區資訊"
          imgSource = {require('../../img/iPhone6-Flat-21.png')}
          description = "掌握即時登革熱熱區，了解哪些地區較危險需避開。"
          skip = {false}
            />
            <Page
              titleText = "鄰近的醫療院所"
              imgSource = {require('../../img/iPhone6-Flat-22.png')}
              description = "快速了解鄰近能快篩的醫院診所和相關資訊。"
              skip = {false}
            />
            <Page
              titleText = "舉報問題點"
              imgSource = {require('../../img/iPhone6-Flat-23.png')}
              description = "輕鬆回報周邊環境狀況，讓防疫網更加沒有漏洞，也能回報蚊子叮咬，供團隊更精確的分析隱性躲藏點。"
              skip = {true}
                />
      </Swiper>
    );
  }
}
