import { ActionCreatorWithPayload } from '@reduxjs/toolkit';

export type SagaPayload<T> = ReturnType<ActionCreatorWithPayload<T>>;
