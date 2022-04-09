import axios from 'axios';
import { call } from 'redux-saga/effects';

import { SagaPayload, WithSagaHelpers } from './types';

export const getErrorMessage = (e: any): string => {
  if (axios.isAxiosError(e)) {
    return e?.response?.data?.message || e.message;
  }
  if (e instanceof Error) {
    return e.message;
  }

  if (typeof e === 'string') {
    return e;
  }

  return 'Something went wrong';
};

export const withSagaHelpers = <T>(saga: (values: SagaPayload<T>) => void) =>
  function* ({ payload, type }: SagaPayload<WithSagaHelpers<T>>) {
    try {
      const { onSuccess, onError, onFinal, ...values } = payload;
      yield call(saga, { type, payload: values as T });
      onSuccess?.();
    } catch (e) {
      console.log('eeeror', e);
      payload.onError?.(getErrorMessage(e));
    } finally {
      payload.onFinal?.();
    }
  };
