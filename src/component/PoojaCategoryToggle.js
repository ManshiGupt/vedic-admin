import React from 'react'
import { Switch } from 'antd';

const PoojaCategoryToggle = () => {
  const onChange = (checked) => {
    console.log(`switch to ${checked}`);
  };
  return (
    <div>
        <Switch defaultChecked onChange={onChange} />
    </div>
  )
}

export default PoojaCategoryToggle