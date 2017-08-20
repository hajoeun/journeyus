import React from 'react';
import { StyleSheet, View, Image, Text, Button, TouchableOpacity, ScrollView, Dimensions } from 'react-native';

const _ = require('partial-js'), TO = TouchableOpacity;
const images = {
  1: require('./img/img_1.png'),
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
  A: require('./img/img_12.png'),
  B: require('./img/img_13.png'),
  C: require('./img/img_14.png'),
  D: require('./img/img_15.png'),
  E: require('./img/img_16.png'),
  F: require('./img/img_17.png'),
  G: require('./img/img_18.png'),
  H: require('./img/img_19.png'),
};

var t = { city: 0, rest: 0, purpose: 0, achieve: 0, consume: 0 };

function a_or_b(a, b) {
  return function(id) {
    if (id == 'left') ++t[a];
    else ++t[b];
  }
}

function type_is(t) {
  if (_.every(t, function(t) { return t == 2 })) return 'D'; /*"당신은 숨만 쉬어도 행복한 말미잘"*/
  else if (t.city == 4 && t.consume < 3 && t.achieve < 3 && t.rest < 3 && t.purpose < 3) return 'B'; /*"당신은 차가운 도시 여우"*/
  else if (t.achieve + t.rest >=5 && t.consume <= 2) return 'A'; /*"당신은 티타임매니아 다람쥐"*/
  else if (t.consume == 4 && t.consume + t.purpose >= 5) return 'F'; /*"당신은 클러버 올빼미"*/
  else if (t.rest + t.consume >= 5 && t.achieve <= 2) return 'H'; /*"당신은 반전매력 돌고래"*/
  else if (t.consume + t.city >= 5) return 'C'; /*"당신은 주머니 열린 캥거루"*/
  else if (t.purpose + t.city >= 5) return 'G'; /*"당신은 재벌 2세 공작새"*/
  else if (t.achieve + t.rest >=5 ) return 'E'; /*"당신은 뜨거운 심장의 기린"*/
}

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      uri: images[1],
      page: 1,
      scroll: false,
      btn: {
        position: 'absolute',
        height: 47,
        width: 335,
        borderRadius: 50
      },
      left_btn: {
        bottom: 105,
        left: -2000,
      },
      right_btn: {
        bottom: 44,
        right: 34,
        width: 308,
        height: 60
      },
      bg_img: {
        resizeMode: 'contain'
      }
    };

    this.actions = {
      1: () => {
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
            height: 100,
            width: 147,
            borderRadius: 18
          },
        }))
      },
      2: a_or_b('city', 'rest'),
      3: a_or_b('purpose', 'rest'),
      4: a_or_b('achieve', 'rest'),
      5: a_or_b('city', 'consume'),
      6: a_or_b('consume', 'rest'),
      7: a_or_b('purpose', 'achieve'),
      8: a_or_b('achieve', 'consume'),
      9: a_or_b('purpose', 'consume'),
      10: a_or_b('city', 'purpose'),
      11: a_or_b('rest', 'city'),
      12: () => {
        this.setState(ps => ({
          uri: images[1],
          page: 1,
          scroll: false,
          btn: {
            position: 'absolute',
            height: 47,
            width: 335,
            borderRadius: 50
          },
          right_btn: {
            bottom: 44,
            right: 34,
            width: 308,
            height: 52
          },
          bg_img: {
            resizeMode: 'contain'
          }
        }))
      }
    };
  }

  click_event(id) {
    if (this.state.page === 11) {
      this.setState(ps => ({
        page: ps.page+1,
        scroll: true,
        left_btn: {
          bottom: 105,
          left: -2000,
        },
        right_btn: {
          borderRadius: 20,
          bottom: 20,
          right: 27,
          width: 322,
          height: 60
        },
        uri: images[type_is(t)]
      }));
      return _.isFunction(this.actions[this.state.page]) && this.actions[this.state.page](id);
    }

    _.isFunction(this.actions[this.state.page]) && this.actions[this.state.page](id);
    if (this.state.page > 11) return;

    return this.setState(ps => ({
      page: ps.page+1,
      uri: images[ps.page+1]
    }));
  }

  render() {
    return (
      <ScrollView style={styles.container} scrollEnabled={this.state.scroll} bounces={false}>
        <Image source={this.state.uri} style={this.state.bg_img}/>
        <TO onPress={() => this.click_event('left')} style={[this.state.btn, this.state.left_btn]}></TO>
        <TO onPress={() => this.click_event('right')} style={[this.state.btn, this.state.right_btn]}></TO>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    width: '100%',
    backgroundColor: 'rgb(25, 119, 159)'
  },
});
