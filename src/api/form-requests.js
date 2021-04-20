import axios from 'axios';

export const getFormMeta = (source) => {
  // IMPORTANT
  // don't look at this adress. I paste this because i get cors error when send request from localhost 
  // by the way: if it's don't work and you see 'see /corsdemo' in console - just go to 
  // http://cors-anywhere.herokuapp.com/corsdemo and press 'Request temporary access to the demo server' button
  // then all gonna be fine :)
  return axios.get('http://cors-anywhere.herokuapp.com/http://test.clevertec.ru/tt/meta', { cancelToken: source.token })
    .catch(function (thrown) {
      if (axios.isCancel(thrown)) {
        throw new Error(thrown.message)
      }
    });
}

// imitation request to server because post request to api doesn't work
export const sendFormData = async (data) => {
  return await new Promise((resolve, reject) => {
    setTimeout(() => {
      // just for show you that data is normal
      console.log(data); 
      data ? resolve({ result: 'Success!'}) : reject('Wrong data!')
    }, 5000)
  })
}
