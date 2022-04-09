import { ActionCreatorWithPayload } from '@reduxjs/toolkit';

export type SagaPayload<T> = ReturnType<ActionCreatorWithPayload<T>>;

export interface SagaHelpers {
  onSuccess?: () => void;
  onError?: (e: any) => void;
  onFinal?: () => void;
}

export type WithSagaHelpers<T> = T & SagaHelpers;
