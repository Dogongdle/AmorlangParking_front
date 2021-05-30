//홈스크린의 무게를 덜기 위해 만들어낸 컴포넌트. 유저가 예약한 상태일 경우에는 stopwatch 컴포넌트를 그 반대의 경우에는 stateArea 컴포넌트를 보여준다.

import React from 'react';
import {AppStopWatch} from './AppStopWatch';
import {StateArea} from './StateArea';

const Conditional = ({condition, time, visible}) => (
  <>
    {condition == true ? (
      <AppStopWatch time={time} />
    ) : (
      <StateArea visible={visible} />
    )}
  </>
);

export default Conditional;
