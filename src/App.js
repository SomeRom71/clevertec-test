import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { setFormMeta } from './actions/form-actions';
import axios from 'axios';
import GridCol from 'arui-feather/grid-col';
import GridRow from 'arui-feather/grid-row';
import FormField from 'arui-feather/form-field';
import Input from 'arui-feather/input';
import Button from 'arui-feather/button';
import Select from 'arui-feather/select';
import Popup from 'arui-feather/popup';
import Heading from 'arui-feather/heading';
import Spin from 'arui-feather/spin';
import { sendFormData } from './api/form-requests';

import './assets/style.scss';

const App = () => {
  
  const dispatch = useDispatch();
  const { handleSubmit, setValue } = useForm();
  const [isModalShow, setIsModalShow] = useState(false);

  const CancelToken = axios.CancelToken;
  const source = CancelToken.source();

  useEffect(async () => {
    setIsModalShow(true);
    await dispatch(setFormMeta(source));
    setIsModalShow(false);
  }, []);

  const {title, image, fields} = useSelector(state => state.form);

  const formattedFields = fields?.map((item) => 
    item.type === 'LIST'
      ? {...item, values: Object.keys(item.values).map(key => ({value: key, text: item.values[key]}))} 
      : item
  );

  const onSubmit = async (data) => {
    const res = await sendFormData({form: data});
  }

  return (
    <div className='app'>
      <Heading size='l'>
        {title}
      </Heading>
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        {formattedFields?.map(item => (
          <GridRow key={item.name} gutter={{desktop:{m: 12}}}>
            <GridCol width='6' align="middle">
              <div>{item.title}</div>
            </GridCol>
            <GridCol width='6' align="middle">
              {item.type === 'LIST'
                ? <Select
                  name={item.name}
                  mode='radio'
                  options={item.values}
                  onChange={val => setValue(item.name, ...val)}
                />
                : <Input 
                  name={item.name} 
                  onChange={val => setValue(item.name, val)} 
                  type={item.type === 'NUMERIC' ? 'number' : item.type}
                />
              }
            </GridCol>
          </GridRow>
        ))}
        <FormField>
          <Button view='extra' type='submit'>Отправить</Button>
        </FormField>
      </form>
      <img src={image} alt='form-image' />
      <Popup
        target='screen'
        visible={isModalShow}
        className="popup"
      >
        <Spin
          size="xl"
          visible={true}
        />
        <Button
          size='m'
          onClick={() => source.cancel('Operation canceled by the user')}
        >
          Отмена
        </Button>
      </Popup>
    </div>
  );
};

export default App;
