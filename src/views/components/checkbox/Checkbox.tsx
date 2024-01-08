import React from 'react';
import classes from './checkbox.module.scss';

interface IProps {
   label: string;
   id: number;
   isChecked: boolean;
   saveResult: (id: number) => void;
}

const Checkbox: React.FC<IProps> = (props) => {
   const { label, id, isChecked, saveResult } = props;

   const handleCheckboxChange = () => {
      saveResult(id);
   };

   return (
      <div
         className={`${classes.customCheckbox} ${isChecked && classes.checked}`}
         onClick={handleCheckboxChange}
      >
         <div className={`${classes.checkboxOuter}`}>
            <div className={`${classes.checkboxInner} ${isChecked && classes.checked}`} />
         </div>
         <span>{label}</span>
      </div>
   );
};

export default Checkbox;
