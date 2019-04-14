import AsyncLoad from 'components/async_loader';
const Home = AsyncLoad(() => import('./home'));

export {
    Home
}
