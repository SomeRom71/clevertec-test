import { getFormMeta } from '../api/form-requests';

export const setFormMeta = () => {
  return async (dispatch) => {
    const metaData = await getFormMeta();
    dispatch({
      type: 'form',
      payload: metaData.data
    })
  }
}
