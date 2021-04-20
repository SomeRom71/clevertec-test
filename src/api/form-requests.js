import axios from 'axios';

export const getFormMeta = (source) => {
  return axios.get('http://cors-anywhere.herokuapp.com/http://test.clevertec.ru/tt/meta', {
    cancelToken: source.token
  }).catch(function (thrown) {
    if (axios.isCancel(thrown)) {
      console.log('Request canceled', thrown.message);
    } else {
      // handle error
    }
  });
}

export const sendFormData = (data) => {
  setTimeout(() => { return { result: 'Success!'} }, 5000)
}
