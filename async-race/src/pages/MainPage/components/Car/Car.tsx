import { useState, useRef, useEffect } from 'react';
import { HandySvg } from 'handy-svg';
import carIcon from '../../assets/car-icon.svg';
import { selectCar } from '../../../../slices/selectCarSlice/selectCarSlice';
import { ICar, IRaceData } from '../../../../types/types';
import { useAppDispatch } from '../../../../hooks/redux';
import {
  useRemoveCarMutation,
  useStartRequestMutation,
} from '../../../../slices/async-race-api/race.api';
import './style.css';

const Car = ({ id, name, color }: ICar) => {
  const [dis, setDis] = useState(0);
  const [duration, setDuration] = useState('0');
  const dispatch = useAppDispatch();
  const [removeCar] = useRemoveCarMutation();
  const [startRequest] = useStartRequestMutation();
  const selectHandler = () => {
    dispatch(selectCar({ id, name, color }));
  };
  const containerRef = useRef<HTMLElement>(null);
  const carRef = useRef<HTMLDivElement>(null);
  const width = containerRef.current?.getBoundingClientRect().width as number;
  useEffect(() => {
    const car = carRef.current as HTMLDivElement;
    car.style.transform = `translateX(${Math.floor(dis)}px)`;
    console.log(width);
    car.style.transitionDuration = `${duration}s`;
  }, [duration, dis, width]);

  const removeHandler = () => {
    removeCar(id);
  };

  const start = async (id: number) => {
    try {
      const data = await startRequest(id).unwrap();

      const duration = data.distance / data.velocity;
      setDuration((duration / 1000).toFixed(2));
      setDis(width);
    } catch (e) {
      console.log(e);
    }
  };

  const stop = (id: number) => {
    console.log('stop');
    // car.style.transform = `translateX(0)`;
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
