/* eslint-disable import/named */
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../index'
import { useCallback, useRef } from 'react';

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useScrollToElement = () => {
   const scrollRef = useRef<HTMLDivElement | null>(null);

   const scrollToElement = useCallback(() => {
      if (scrollRef.current) {
         console.log('1')
         scrollRef.current.scrollIntoView({
            behavior: 'smooth',
         });
      }
      console.log('2')
   }, []);

   return [scrollRef, scrollToElement] as const;
};


