import { useState, useRef, useEffect } from 'react';
import { HandySvg } from 'handy-svg';
import carIcon from '../../assets/car-icon.svg';
import { selectCar } from '../../../../slices/selectCarSlice/selectCarSlice';
import { ICar, IRaceData } from '../../../../types/types';
import { useAppDispatch } from '../../../../hooks/redux';
import {
  useRemoveCarMutation,
  useStartStopRequestMutation,
  useDriveREquestMutation,
} from '../../../../slices/async-race-api/race.api';
import './style.css';
import useRequestAnimationFrame from 'use-request-animation-frame';

const Car = ({ id, name, color }: ICar) => {
  const [dis, setDis] = useState(0);
  const [duration, setDuration] = useState(0);
  const [shouldAnimate, setShouldAnimate] = useState(false);
  const dispatch = useAppDispatch();
  const [removeCar] = useRemoveCarMutation();
  const [startStopRequest] = useStartStopRequestMutation();
  const [driveRequest, { isError }] = useDriveREquestMutation();
  const selectHandler = () => {
    dispatch(selectCar({ id, name, color }));
  };
  const containerRef = useRef<HTMLElement>(null);
  const carRef = useRef<HTMLDivElement>(null);

  // 100 - 1300;
  // 3 - x;

  const nextAnimationFrameHandler = (progress: number) => {
    if (carRef.current) {
      const value = dis * progress;
      carRef.current.style.left = value + 'px';
    }
  };

  useRequestAnimationFrame(nextAnimationFrameHandler, {
    duration,
    shouldAnimate,
  });

  const removeHandler = () => {
    removeCar(id);
  };

  const start = async (id: number) => {
    const width = containerRef.current?.getBoundingClientRect().width as number;
    try {
      const data = await startStopRequest({ id, status: 'started' }).unwrap();
      const duration = data.distance / data.velocity;
      setDuration(Number(duration.toFixed(2)));
      setDis(width);
      setShouldAnimate(true);
      driveRequest(id)
        .unwrap()
        .catch(async (e: { originalStatus: number }) => {
          if (e.originalStatus === 500) {
            setShouldAnimate(false);
            await startStopRequest({ id, status: 'stopped' });
          }
        });
    } catch (e) {
      console.log(e);
    }
  };
  const stop = async (id: number) => {
    await startStopRequest({ id, status: 'stopped' });
    setShouldAnimate(false);
    if (carRef.current) {
      carRef.current.style.left = '0px';
    }
  };
  return (
    <section ref={containerRef} className='car' id={String(id)}>
      <h4>{name}</h4>
      <div ref={carRef} className={'car__icon'}>
        <HandySvg src={carIcon} fill={color} width='48' height='48' />
      </div>
      <button onClick={() => start(id)}>A</button>
      <button onClick={() => stop(id)}>B</button>
      <button onClick={selectHandler}>Select</button>
      <button onClick={removeHandler}>Remove</button>
    </section>
  );
};

export default Car;
