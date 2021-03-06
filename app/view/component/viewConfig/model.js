import * as service from './service'

export default {
  namespace: 'viewConfig',
  state: {
    list: [],
    total: null,
  },
  reducers: {
    save(
      state,
      {
        payload: { data: list, total, page },
      },
    ) {
      return {
        ...state, list, total, page,
      }
    },
    findAllReducer(state, { payload }) {
      return {
        ...state,
        list: payload,
      }
    },
  },
  effects: {
    select(
      {
        payload,
      },
      { call, put },
    ) {
      put({
        type: 'chooseItem',
        payload,
      })
    },
    *findAll(
      {
        payload,
      },
      { call, put },
    ) {
      const data = yield call(service.findAll, payload)
      yield put({
        type: 'findAllReducer',
        payload: data.items,
      })
    },
    *remove(
      {
        payload,
      },
      { call, put },
    ) {
      yield call(service.remove, payload)
      yield put({
        type: 'findAll',
        payload: {},
      })
    },

  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen((a) => {
        // if (pathname === '/users') {
        //   dispatch({ type: 'fetch', payload: query })
        // }
      })
    },
  },
}
