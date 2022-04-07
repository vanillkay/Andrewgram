import { Dispatch, SetStateAction } from 'react';

import { Appear } from './types';

export const timeoutAppear = (
  setIsAppear: Dispatch<SetStateAction<Appear>>,
  changes: { title?: boolean; actions?: boolean },
  changeTime: number
): void => {
  setTimeout(
    () => setIsAppear((prevState) => ({ ...prevState, ...changes })),
    changeTime
  );
};
