import React from 'react';
import classes from './userCard.module.scss';

interface IProps {
   name: string
   position: string
   email: string
   phone: string
   img: string
}

const UserCard: React.FC<IProps> = (props) => {
   const {
      name,
      position,
      email,
      phone,
      img
   } = props;

   const truncate = (input: string, lengthParam: number, truncateParam: number) => {
      return input?.length > lengthParam ? `${input.substring(0, truncateParam)}...` : input;
   }

   return (
      <div className={classes.cardWrapper}>
         <img className={classes.cardImage} src={img} alt="User" />
         <p className={classes.name}>{truncate(name, 20, 20)}</p>
         <p>{truncate(position, 20, 20)}</p>
         <p>{truncate(email, 20, 20)}</p>
         <p>{truncate(phone, 20, 20)}</p>
      </div>
   )
};

export default UserCard;