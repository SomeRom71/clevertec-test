import React from 'react';
import Popup from 'arui-feather/popup';
import Spin from 'arui-feather/spin';
import Button from 'arui-feather/button';

const Modal = ({onCancel, onClose, content}) => (
  <Popup
    target='screen'
    visible={true}
    className="modal"
  >
    {content ?? 
      <span>
        <Spin
          size="xl"
          visible={true}
        />
        Загрузка...
      </span>
    }
    {onCancel && 
      <Button
        size='m'
        onClick={onCancel}
      >
        Отмена
      </Button>
    }
    {onClose && 
      <Button
        size='m'
        onClick={onClose}
      >
        Закрыть
      </Button>
    }
  </Popup>
);

export default Modal;
