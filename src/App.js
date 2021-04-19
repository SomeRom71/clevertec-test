import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { setFormMeta } from './actions/form-actions';
import GridCol from 'arui-feather/grid-col';
import GridRow from 'arui-feather/grid-row';
import FormField from 'arui-feather/form-field';
import Input from 'arui-feather/input';
import Button from 'arui-feather/button';
import Select from 'arui-feather/select';
import { sendFormData } from './api/form-requests';

import './assets/style.css';

const App = () => {
  
  const dispatch = useDispatch();
  const { handleSubmit, setValue } = useForm();

  useEffect(() => {
    dispatch(setFormMeta());
  }, []);

  const {title, image, fields} = useSelector(state => state.form);

  const formattedFields = fields?.map((item) => 
    item.type === 'LIST'
      ? {...item, values: Object.keys(item.values).map(key => ({value: key, text: item.values[key]}))} 
      : item
  );

  const onSubmit = async (data) => {
    await sendFormData({form: data});
  }

  return (
    <div className='app'>
      <span className="title">{title}</span>
      <form onSubmit={handleSubmit(onSubmit)}>
        {formattedFields?.map(item => (
          <GridRow key={item.name} gutter={{desktop:{m: 12}}}>
            <GridCol width='6'>
              <div>{item.title}</div>
            </GridCol>
            <GridCol width='6'>
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
    </div>
  );
};

export default App;
