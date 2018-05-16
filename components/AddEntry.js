import React, { Component } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { getMetricMetaInfo, timeToString } from '../utils/helpers';
import UdacitySlider from './UdacitySlider';
import UdacitySteppers from './UdacitySteppers';
import DateHeader from './DateHeader';
import { Ionicons } from '@expo/vector-icons';

function SubmitButton({ onPress }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text>OnSubmit</Text>
    </TouchableOpacity>
  );
}
export default class AddEntry extends Component {
  state = {
    run: 0,
    bike: 0,
    swim: 0,
    sleep: 0,
    eat: 0
  };
  increment = metric => {
    const { max, step } = getMetricMetaInfo(metric);

    this.setState(state => {
      const count = state[metric] + step;

      return {
        ...state,
        [metric]: count > max ? max : count
      };
    });
  };
  decrement = metric => {
    const { step } = getMetricMetaInfo(metric);

    this.setState(state => {
      const count = state[metric] - step;

      return {
        ...state,
        [metric]: count < 0 ? 0 : count
      };
    });
  };
  slide = (metric, value) => {
    this.setState(() => ({
      [metric]: value
    }));
  };
  submit = () => {
    const key = timeToString();
    const entry = this.state;

    //update redux

    this.setState(() => ({
      run: 0,
      bike: 0,
      swim: 0,
      sleep: 0,
      eat: 0
    }));
    //Navigate to home

    //save to db

    //clear local notification
  };
  reset = () => {
    const key = timeToString();

    //Update Redux

    // Route to Home

    //Update "DB"
  };
  render() {
    const metaInfo = getMetricMetaInfo();

    if (this.props.alreadyLogged) {
      return (
        <View>
          <Ionicons name={'ios-happy-outline'} size={100} />
          <Text>You already logged your information for today</Text>
          <TextButton onPress={this.reset}>reset</TextButton>
        </View>
      );
    }
    return (
      <View>
        <DateHeader date={new Date().toLocaleDateString()} />
        {Object.keys(metaInfo).map(key => {
          const { getIcon, type, ...rest } = metaInfo[key];
          const value = this.state[key];
          console.log({ ...rest });

          return (
            <View key={key}>
              {type === 'slider' ? (
                <UdacitySlider value={value} onChange={value => this.slide(key, value)} />
              ) : (
                <UdacitySteppers
                  value={value}
                  onIncrement={() => this.increment(key)}
                  onDecrement={() => this.decrement(key)}
                />
              )}
            </View>
          );
        })}
        <SubmitButton onPress={this.submit} />
      </View>
    );
  }
}
