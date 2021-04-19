import axios from 'axios';

export const getFormMeta = () => {
  return axios.get('http://cors-anywhere.herokuapp.com/http://test.clevertec.ru/tt/meta');
}

export const sendFormData = (data) => {
  return axios.post('http://cors-anywhere.herokuapp.com/http://test.clevertec.ru/tt', data);
}
