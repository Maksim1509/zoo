import Car from './components/Car/Car';
import { useGetCarsQuery } from '../../slices/async-race-api/race.api';
import { ICar } from '../../types/types';
import CreateCar from './components/CreateCar/CreateCar';
import './assets/style.css';
import UpdateCar from './components/UpdateCar/UpdateCar';
import GenerateCar from './components/GenerateCar/GenerateCar';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { changePage } from '../../slices/paginationSlice/paginationSlice';

const limit = 7;

const MainPage = () => {
  const dispatch = useAppDispatch();
  const { page } = useAppSelector((state) => state.pagination);
  const { data, isLoading } = useGetCarsQuery(page);

  const prevHandler = () => {
    const prevPage = page - 1 < 1 ? 1 : page - 1;
    dispatch(changePage({ page: prevPage }));
  };
  const nextHandler = () => {
    if (data) {
      const maxPage = Math.ceil(data.count / limit);
      const nextPage = page + 1 > maxPage ? maxPage : page + 1;
      dispatch(changePage({ page: nextPage }));
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
      <h1>Garage ({data && data.count})</h1>
      <span>Page#{page}</span>
      <CreateCar />
      <UpdateCar />
      <GenerateCar />
      {isLoading && <p>Loading</p>}
      <ul>{data && renderCarsList(data.cars)}</ul>
      <section className='pagination'>
        <button onClick={prevHandler}>prev</button>
        <button onClick={nextHandler}>next</button>
      </section>
    </>
  );
};

export default MainPage;
