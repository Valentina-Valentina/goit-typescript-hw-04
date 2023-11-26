import React, { useReducer } from "react";

type RequestStep = "idle" | "start" | "pending" | "finished";

type State = {
  isRequestInProgress: boolean;
  requestStep: RequestStep;
};

enum Actions {
  START_REQUEST = 'START_REQUEST',
  PENDING_REQUEST = 'PENDING_REQUEST',
  FINISH_REQUEST = 'FINISH_REQUEST',
  RESET_REQUEST = 'RESET_REQUEST',
};

type Action =
    { type: Actions.START_REQUEST }
  | { type: Actions.PENDING_REQUEST }
  | { type: Actions.FINISH_REQUEST }
  | { type: Actions.RESET_REQUEST };

const initialState: State = {
  isRequestInProgress: false,
  requestStep: 'idle',
};

function requestReducer(state: State, action: Action): State {
  switch (action.type) {
    case Actions.START_REQUEST:
      return { ...state, isRequestInProgress: true, requestStep: 'start' };
    case Actions.PENDING_REQUEST:
      return { ...state, isRequestInProgress: true, requestStep: 'pending' };
    case Actions.FINISH_REQUEST:
      return { ...state, isRequestInProgress: false, requestStep: 'finished' };
    case Actions.RESET_REQUEST:
      return { ...state, isRequestInProgress: false, requestStep: 'idle' };
    default:
      return state;
  }
}

export function RequestComponent() {
  const [requestState, requestDispatch] = useReducer(requestReducer, initialState);

  const startRequest = () => {
    requestDispatch({ type: Actions.START_REQUEST });
    // Імітуємо запит до сервера
    setTimeout(() => {
      requestDispatch({ type: Actions.PENDING_REQUEST });
      // Імітуємо отримання відповіді від сервера
      setTimeout(() => {
        requestDispatch({ type: Actions.FINISH_REQUEST });
      }, 2000);
    }, 2000);
  };

  const resetRequest = () => {
    requestDispatch({ type: Actions.RESET_REQUEST });
  };

  return (
    <div>
      <button onClick={startRequest}>Почати запит</button>
      <button onClick={resetRequest}>Скинути запит</button>
      <p>Стан запиту: {requestState.requestStep}</p>
    </div>
  );
}

export default RequestComponent;
