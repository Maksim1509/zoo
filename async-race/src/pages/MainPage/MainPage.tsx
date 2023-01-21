import { useState } from 'react';
import Car from './components/Car/Car';
import { useGetCarsQuery } from '../../slices/async-race-api/race.api';
import { ICar } from '../../types/types';
import CreateCar from './components/CreateCar/CreateCar';
import './assets/style.css';
import UpdateCar from './components/UpdateCar/UpdateCar';

const limit = 7;

const MainPage = () => {
  const [page, setPage] = useState(1);
  const { data, isLoading } = useGetCarsQuery(page);
  console.log(data);
  const prevHandler = () => {
    const prevPage = page - 1 < 1 ? 1 : page - 1;
    setPage(prevPage);
  };
  const nextHandler = () => {
    if (data) {
      const maxPage = Math.ceil(data.pages / limit);
      const nextPage = page + 1 > maxPage ? maxPage : page + 1;
      setPage(nextPage);
    }
  };

  const renderCarsList = (cars: ICar[]) =>
    cars.map((car) => (
      <li className='car' key={car.id}>
        <Car {...car} />
      </li>
    ));

  return (
    <>
      <h1>Main Page</h1>
      <span>Page#{page}</span>
      <CreateCar />
      <UpdateCar />
      {isLoading && <p>Loading</p>}
      <ol>{data && renderCarsList(data.cars)}</ol>
      <section className='pagination'>
        <button onClick={prevHandler}>prev</button>
        <button onClick={nextHandler}>next</button>
      </section>
    </>
  );
};

export default MainPage;
