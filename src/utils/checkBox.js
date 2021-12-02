import * as React from 'react';
import Checkbox from '@mui/material/Checkbox';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

const checkBox=()=> {
  return (
    <div>
      <Checkbox {...label} defaultChecked />
      </div>
  );
}
export default checkBox;