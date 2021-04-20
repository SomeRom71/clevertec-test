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
import Heading from 'arui-feather/heading';
import Modal from './components/modal';
import { sendFormData } from './api/form-requests';

import './assets/style.scss';

const source = axios.CancelToken.source();

const App = () => {
  
  const dispatch = useDispatch();
  const { handleSubmit, setValue } = useForm();
  const [isContentLoaded, setIsContentLoaded] = useState(false);
  const [modalState, setModalState] = useState(null);

  useEffect(async () => {
    try {
      setModalState({
        onCancel: () => source.cancel('Operation cancelled by user!'),
      });
      await dispatch(setFormMeta(source));
      setIsContentLoaded(true);
      setModalState(null);
    } catch (e) {
      setModalState({
        onClose: () => setModalState(null),
        content: <>{e.message}</>,
      });
    }
  }, []);

  const {title, image, fields} = useSelector(state => state.form);

  const formattedFields = fields?.map((item) => 
    item.type === 'LIST'
      ? {...item, values: Object.keys(item.values).map(key => ({value: key, text: item.values[key]}))} 
      : item
  );

  const onSubmit = async (data) => {
    setModalState({
      onCancel: () => alert('The post api did not work, so the request method was mocked :)))'),
    });
    const { result } = await sendFormData({form: data});
    setModalState({
      onClose: () => setModalState(null),
      content: result,
    });
  }

  return (
    <div className='app'>
      {isContentLoaded ? 
        <>
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
        </> : 
          <Heading size='l'>
            Нет данных
          </Heading>
      }
      {modalState && <Modal {...modalState} />}
    </div>
  );
};

export default App;
