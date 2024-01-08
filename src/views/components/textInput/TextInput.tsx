import React, { useEffect, useState } from 'react';
import classes from './text.input.module.scss';
import { useAppDispatch } from '../../../redux/hooks';

interface IProps {
   label: string
   hint?: string
   errorHint?: string
   saveResult: any
   regExp?: any
}

const TextInput: React.FC<IProps> = (props) => {
   const { label, hint, saveResult, regExp, errorHint } = props;

   const dispatch = useAppDispatch();

   const [inputValue, setInputValue] = useState('');
   const [isError, setIsError] = useState(false);

   useEffect(() => {
      if (inputValue === '' || regExp.test(inputValue)) {
         dispatch(saveResult(inputValue));
         setIsError(false);
      } else {
         dispatch(saveResult(inputValue));
         setIsError(true)
      }
   }, [inputValue]);

   return (
      <div className={`${classes.inputContainer} ${(hint || !isError) && classes.extraMargin}`}>
         <input
            className={`${isError && classes.inputError}`}
            type="text"
            id={`${label}Id`}
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
         />
         <label
            htmlFor={`${label}Id`}
            className={`${inputValue && classes.active} ${isError && classes.labelError}`}>
            {label}
         </label>
         {(hint && !isError) &&
            <div className={classes.hint}>
               {hint}
            </div>
         }
         {isError &&
            <div className={classes.errorHint}>
               {errorHint}
            </div>
         }
      </div>
   );
};

export default TextInput;
