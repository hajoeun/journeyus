import React from 'react';
import { StyleSheet, View, Image, Text, Button, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';

const _ = require('partial-js'), TO = TouchableOpacity;
const images = {
  2: require('./img/img_2.png'),
  3: require('./img/img_3.png'),
  4: require('./img/img_4.png'),
  5: require('./img/img_5.png'),
  6: require('./img/img_6.png'),
  7: require('./img/img_7.png'),
  8: require('./img/img_8.png'),
  9: require('./img/img_9.png'),
  10: require('./img/img_10.png'),
  11: require('./img/img_11.png'),
  12: require('./img/img_12.png'),
  A: require('./img/img_13.png'),
  B: require('./img/img_13.png'),
  C: require('./img/img_13.png'),
  D: require('./img/img_13.png'),
  E: require('./img/img_13.png'),
  F: require('./img/img_13.png'),
  G: require('./img/img_13.png'),
  H: require('./img/img_13.png'),
};

let t = { city: 0, rest: 0, purpose: 0, achieve: 0, consume: 0 };

function a_or_b(a, b) {
  return function(id) {
    if (id == 'left') ++t[a];
    else ++t[b];
  }
}

function type_is(t) {
  if (_.every(t, function(t) { return t == 2 })) /*alert("당신은 숨만 쉬어도 행복한 말미잘")*/ return 'A';
  else if (t.city == 4 && t.consume < 3 && t.achieve < 3 && t.rest < 3 && t.purpose < 3) /*alert("당신은 차가운 도시 여우")*/ return 'B';
  else if (t.achieve + t.rest >=5 && t.consume <= 2) /*alert("당신은 티타임매니아 다람쥐")*/ return 'C';
  else if (t.consume == 4 && t.consume + t.purpose >= 5) /*alert("당신은 클러버 올빼미")*/ return 'D';
  else if (t.rest + t.consume >= 5 && t.achieve <= 2) /*alert("당신은 반전매력 돌고래")*/ return 'E';
  else if (t.consume + t.city >= 5) /*alert("당신은 주머니 열린 캥거루")*/ return 'F';
  else if (t.purpose + t.city >= 5) /*alert("당신은 재벌 2세 공작새")*/ return 'G';
  else if (t.achieve + t.rest >=5 ) /*alert("당신은 뜨거운 심장의 사슴")*/ return 'H';
  else _.loge('????');
  return 'I';
}

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      uri: require('./img/img_13.png'),
      page: 1,
      btn: {
        position: 'absolute',
        height: 47,
        width: 335,
        borderRadius: 50,
      },
      left_btn: {
        bottom: 105,
        left: 20
      },
      right_btn: {
        bottom: 46,
        right: 20
      }
    };

    this.actions = {
      1: () => {
        this.setState(ps => ({
          left_btn: {
            bottom: 105,
            left: -2000
          },
          right_btn: {
            bottom: 45,
            right: 34,
            width: 308,
            height: 50
          }
        }))
      },
      2: () => {
        this.setState(ps => ({
          left_btn: {
            left: 35
          },
          right_btn: {
            right: 35
          },
          btn: {
            position: 'absolute',
            bottom: 77,
            height: 90,
            width: 147,
            borderRadius: 18
          },
        }))
      },
      3: a_or_b('city', 'rest'),
      4: a_or_b('purpose', 'rest'),
      5: a_or_b('achieve', 'rest'),
      6: a_or_b('city', 'consume'),
      7: a_or_b('consume', 'rest'),
      8: a_or_b('purpose', 'achieve'),
      9: a_or_b('achieve', 'consume'),
      10: a_or_b('purpose', 'consume'),
      11: a_or_b('city', 'purpose'),
      12: a_or_b('rest', 'city'),
    };
  }

  click_event(id) {
    if (this.state.page > 12) return;
    _.isFunction(this.actions[this.state.page]) && this.actions[this.state.page](id);
    this.setState(ps => ({
      page: ps.page+1,
      uri: this.state.page === 12 ? images[type_is(t)] : images[ps.page+1]
    }));
  }

  render() {
    return (
      <View style={styles.container}>
        <Image source={this.state.uri} style={styles.bg_img}/>
        <Text>{this.state.page}</Text>
        <TO onPress={() => this.click_event('left')} style={[this.state.btn, this.state.left_btn]}></TO>
        <TO onPress={() => this.click_event('right')} style={[this.state.btn, this.state.right_btn]}></TO>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  bg_img: {
    flex: 1,
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    height: '100%',
    width: '100%'
  }
});
