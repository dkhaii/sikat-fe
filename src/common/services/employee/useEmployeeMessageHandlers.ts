import { message } from 'antd';

export const useMessageHandlers = () => {
  const [messageApi, contextHolder] = message.useMessage();

  const success = () => {
    messageApi.open({
      type: 'success',
      content:
        'Success. Added employee will not shown until the setted effective date',
    });
  };

  const error = () => {
    messageApi.open({
      type: 'error',
      content: 'Error. There is an error occured',
    });
  };

  return { success, error, contextHolder };
};
