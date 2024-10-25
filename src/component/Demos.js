import React from 'react'

import { Collapse } from 'antd';

const Demos = () => {
    const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

const itemsNest = [
    {
      key: '1',
      label: 'This is panel nest panel',
      children: <p>{text}</p>,
    },
  ];
  const items = [
    {
      key: '1',
      label: 'This is panel header 1',
      children: <Collapse defaultActiveKey="1" items={itemsNest} />,
    },
    {
      key: '2',
      label: 'This is panel header 2',
      children: <p>{text}</p>,
    },
    {
      key: '3',
      label: 'This is panel header 3',
      children: <p>{text}</p>,
    },
  ];
  const onChange = (key) => {
    console.log(key);
  };
  return (
    <div>
        
        <Collapse items={items} defaultActiveKey={['1']} onChange={onChange} />;
    </div>
       



  )
}

export default Demos