import React, { useEffect, useState } from 'react';
import classes from './dashboard.module.scss';
import Button from '../../components/button/Button';
import UserCard from '../../components/userCard/UserCard';
import TextInput from '../../components/textInput/TextInput';
import Checkbox from '../../components/checkbox/Checkbox';
import { useAddNewUserMutation, useGetPositionsQuery, useGetTokenQuery, useGetUsersQuery } from '../../../api/userApi';
import { useAppDispatch, useAppSelector, useScrollToElement } from '../../../redux/hooks';
import { userSlice } from '../../../redux/slices/userSlice';
import { emailRegexp, nameRegexp, phoneRegexp } from '../../../helpers/regexp';
import { SuccessImage } from '../../../assets/icons/SuccessImage';

const Dashboard: React.FC = () => {
   const dispatch = useAppDispatch();

   const { pageCounter, userPersonalData } = useAppSelector(state => state.userSlice);
   const {
      setPageCounter,
      setUserName,
      setUserEmail,
      setUserPhone,
      setUserPosition,
   } = userSlice.actions;

   const { data: userToken } = useGetTokenQuery('');
   const { data: usersData } = useGetUsersQuery({ page: 1, offset: 1, count: pageCounter });
   const { data: positionsData } = useGetPositionsQuery('');
   const [createNewUser, { isSuccess }] = useAddNewUserMutation();

   const [fileName, setFileName] = useState('');
   const [file, setFile] = useState<any>(null);
   const [activeCheckbox, setActiveCheckbox] = useState<number | null>(null);
   const [isFileTooLarge, setIsFileTooLarge] = useState(false);
   const [isSubmitAvailable, setIsSubmitAvailable] = useState(false);

   useEffect(() => {
      const isValid =
         userPersonalData.name.length > 0 && nameRegexp.test(userPersonalData.name) &&
         userPersonalData.email.length > 0 && emailRegexp.test(userPersonalData.email) &&
         userPersonalData.phone.length > 0 && phoneRegexp.test(userPersonalData.phone) &&
         userPersonalData.position !== 0 &&
         file !== null;

      setIsSubmitAvailable(isValid);
   }, [userPersonalData, file]);


   useEffect(() => {
      if (userToken) {
         localStorage.setItem('userToken', userToken.token)
      }
   }, [userToken])

   const handleCheckboxChange = (id: number) => {
      setActiveCheckbox(id);
      dispatch(setUserPosition(id));
   };

   const handleShowMoreUsers = () => {
      dispatch(setPageCounter(6))
   }

   const handleChangeNameInput = (event: React.ChangeEvent<HTMLInputElement>) => {
      const inputValue = event.target.value;
      setFileName(inputValue);
   };

   const handleFileUpload = (files: FileList) => {
      const selectedFile = files?.[0];
      if (selectedFile) {
         const maxSizeInBytes = 5 * 1024 * 1024;
         if (selectedFile.size > maxSizeInBytes) {
            console.log('File size exceeds the maximum limit of 5 MB.');
            setIsFileTooLarge(true)
            return;
         } else {
            setIsFileTooLarge(false)
         }

         setFileName(selectedFile.name);

         const reader = new FileReader();
         reader.onload = () => {
            const arrayBuffer = reader.result as ArrayBuffer;
            const blob = new Blob([arrayBuffer], { type: selectedFile.type });
            setFile(blob);
         };

         reader.readAsArrayBuffer(selectedFile);
      }
   };

   const openFileDialog = (event: any) => {
      event.preventDefault();

      const inputElement = document.createElement('input');
      inputElement.type = 'file';
      inputElement.accept = ".jpg,.jpeg";
      inputElement.addEventListener('change', (e: any) => {
         handleFileUpload(e.target.files);
      });
      inputElement.click();
   };

   const handleSubmitClick = (event: any) => {
      event.preventDefault()
      const formData = new FormData();

      formData.set('name', userPersonalData.name);
      formData.set('email', userPersonalData.email);
      formData.set('phone', userPersonalData.phone);
      formData.set('position_id', String(userPersonalData.position));
      formData.set('photo', file, fileName);

      createNewUser(formData);
   };
   const [formBoxRef, scrollToForm] = useScrollToElement();

   return (
      <main className={classes.wrapper}>
         <div className={classes.infoBox}>
            <div className={classes.infoBox_container}>
               <h1>Test assignment for front-end developer</h1>
               <p>What defines a good front-end developer is one that has skilled knowledge of HTML, CSS, JS with a vast understanding of User design thinking as they'll be building web interfaces with accessibility in mind. They should also be excited to learn, as the world of Front-End Development keeps evolving.</p>
               <Button action={scrollToForm} text='Sign up' />
            </div>
         </div>

         <div className={classes.usersBox}>
            <h2>Working with GET request</h2>

            <div className={classes.usersBox_container}>
               {usersData?.users.map((user: any) => (
                  <UserCard
                     key={user.id}
                     name={user.name}
                     position={user.position}
                     email={user.email}
                     phone={user.phone}
                     img={user.photo}
                  />
               ))}
            </div>

            {usersData?.total_users >= pageCounter &&
               <Button
                  text='Show more'
                  action={handleShowMoreUsers}
               />
            }
         </div>

         {!isSuccess &&
            <div className={classes.formBox} ref={formBoxRef}>
               <h2>Working with POST request</h2>

               <form action="#">
                  <div className={classes.inputsGroup}>
                     <TextInput
                        label={'Your name'}
                        saveResult={setUserName}
                        regExp={nameRegexp}
                        errorHint='should be 2-60 characters'
                     />
                     <TextInput
                        label={'Email'}
                        saveResult={setUserEmail}
                        regExp={emailRegexp}
                        errorHint='incorrect email'
                     />
                     <TextInput
                        label={'Phone'}
                        hint='+38 (XXX) XXX - XX - XX'
                        saveResult={setUserPhone}
                        regExp={phoneRegexp}
                        errorHint='incorrect phone number'
                     />
                  </div>

                  <div className={classes.selectBox}>
                     <p>Select your position</p>

                     <div className={classes.checkboxGroup}>
                        {positionsData?.positions.map((position: any) => (
                           <Checkbox
                              key={position.id}
                              id={position.id}
                              label={position.name}
                              isChecked={position.id === activeCheckbox}
                              saveResult={handleCheckboxChange}
                           />
                        ))}
                     </div>
                  </div>

                  <div className={classes.uploadBox}>
                     <div className={classes.fileNameBox}>
                        <button
                           className={`${classes.browseBtn} ${isFileTooLarge && classes.errorBrowseBtn}`}
                           onClick={openFileDialog}
                        >
                           Upload
                        </button>

                        <div className={classes.selectedFile}>
                           <div className={classes.fileName}>
                              <input
                                 id='value'
                                 autoComplete='off'
                                 placeholder='Upload your photo'
                                 className={`${classes.fileNameInput} ${isFileTooLarge && classes.errorBrowseBtn}`}
                                 value={fileName}
                                 onChange={handleChangeNameInput}
                              />
                           </div>
                        </div>

                     </div>
                  </div>

                  <div className={classes.submitBtn}>
                     <Button
                        text='Sign up'
                        disabled={!isSubmitAvailable}
                        action={handleSubmitClick}
                     />
                  </div>

               </form>
            </div>
         }

         {isSuccess &&
            <div className={classes.successMessage}>
               <h2>User successfully registered</h2>
               <SuccessImage width={328} height={290} />
            </div>
         }
      </main>
   )
};

export default Dashboard;