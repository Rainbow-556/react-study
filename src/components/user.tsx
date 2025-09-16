import { usePageContext } from '@/contexts/pageContext';
import { memo } from 'react';

const User = function () {
  console.log('User');
  const { isLoading, showLoading, hideLoading } = usePageContext();
  const onClick = () => {
    if (isLoading) {
      hideLoading();
    } else {
      showLoading();
    }
  };
  return (
    <div>
      User:{isLoading + ''}
      <button onClick={onClick}>{isLoading ? 'hide' : 'show'}</button>
    </div>
  );
};

export default memo(User);
