import { useState } from 'react';

export const useToggle = (initialState = false): [boolean, () => void] => {
  const [state, setState] = useState<boolean>(initialState);
  const toggle = () => setState((prevState) => !prevState);
  return [state, toggle];
};
