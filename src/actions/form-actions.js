import { getFormMeta } from '../api/form-requests';

export const setFormMeta = (source) => {
  return async (dispatch) => {
    const metaData = await getFormMeta(source);
    dispatch({
      type: 'form',
      payload: metaData?.data
    })
  }
}
