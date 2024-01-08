import React from 'react';
import classes from './button.module.scss';

interface IProps {
   text: string
   disabled?: boolean
   action?: any
}

const Button: React.FC<IProps> = (props) => {
   const { text, disabled, action } = props;

   return (
      <button
         className={`${!disabled && classes.mainBtn} ${disabled && classes.disabledBtn}`}
         onClick={action}
         disabled={disabled}
      >
         {text}
      </button>
   )
};

export default Button;