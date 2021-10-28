import { Appear } from './types';

export const timeoutAppear = (
  setIsAppear: (callback: (prevState: Appear) => Appear) => void,
  changes: { title?: boolean; actions?: boolean },
  changeTime: number
): void => {
  setTimeout(
    () => setIsAppear((prevState) => ({ ...prevState, ...changes })),
    changeTime
  );
};
