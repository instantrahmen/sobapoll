import { setContext, getContext, hasContext } from 'svelte';

export type Store<T> = {
  state: T;
  key: string;
  reset: () => void;
};

/**
 * Creates a store with the provided start value and context.
 *
 * @param startValue - the initial value for the store
 * @param context - the context key for the store;
 * @param  subscribe - optional callback function for subscribing to state changes
 * @return A function that returns a store
 */
export const createStore = <T>(
  _startValue: T,
  _context: string,
  subscribe?: (state: T) => void,
  reset?: (state: T) => void
) => {
  return (startValue = _startValue, context = _context): Store<T> => {
    if (hasContext(context)) {
      return getContext(context);
    }

    let _state = $state(startValue);

    type SubscribeFunction = (state: T) => void;
    let subscribeFunctions: SubscribeFunction[] = [subscribe ? subscribe : () => {}];

    $effect(() => {
      // console.log('effect called')
      subscribeFunctions.forEach((fn) => fn(_state));
    })

    const _store = {
      get state(): T {
        return _state;
      },
      set state(v: T) {
        _state = v;
        console.log('updated state', _state);
        subscribeFunctions.forEach((fn) => fn(v));
      },
      key: context,
      reset: () => {
        if (reset) return reset(_state);
        console.log('resetting state', _startValue);
        _state = _startValue;
      },
    };
    setContext(context, _store);
    return _store;
  };
};