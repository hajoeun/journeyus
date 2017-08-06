import React from 'react';
import { StyleSheet, View, Image, Text, Button,
        TouchableOpacity, TouchableWithoutFeedback } from 'react-native';

var _ = require('partial-js'), TO = TouchableOpacity;

var images = {
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
  13: require('./img/img_13.png')
};

var t = { city: 0, rest: 0, purpose: 0, achieve: 0, consume: 0 };

function a_or_b(a, b) {
  return function(id) {
    if (id == 'left') ++t[a];
    else ++t[b];
  }
}

var actions = {
  1: function() {
    // $.hide($left);
    // $.css($right, { width : 308, bottom: 45, right: 32 });
  },
  2: function() {
    console.log(this.page);
    // _.go($left, $.show, $.css({ left: 35 }));
    // _.go($btns, $.css({ bottom: 77, height: 86, width: 145, borderRadius: 18 }))
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

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      uri: require('./img/img_1.png'),
      page: 1
    }
  }

  click_event(id) {
    if (this.state.page < 13) {
      _.isFunction(actions[this.state.page]) && actions[this.state.page](id);
      this.setState(ps => ({ page: ++ps.page, uri: images[ps.page] }));
    }
    if (this.state.page === 13) {
      _.log(t)
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Image source={this.state.uri} style={styles.bg_img}/>
        <TO onPress={() => this.click_event('left')} style={[styles.btn, styles.left_btn]}></TO>
        <TO onPress={() => this.click_event('right')} style={[styles.btn, styles.right_btn]}></TO>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bg_img: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    height: '100%',
    width: '100%'
  },
  btn: {
    position: 'absolute',
    borderColor: 'red',
    borderWidth: 2,
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
});
