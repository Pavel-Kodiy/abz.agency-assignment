import React from 'react';
import classes from './header.module.scss';
import Button from '../button/Button';
import { LogoIcon } from '../../../assets/icons/LogoIcon';

const Header: React.FC = () => {
   return (
      <header className={classes.header}>
         <div className={classes.logo}>
            <LogoIcon width={104} height={26} />
         </div>

         <div className={classes.buttonsGroup}>
            <Button text='Users' />
            <Button text='Sign up' />
         </div>
      </header>
   )
};

export default Header;