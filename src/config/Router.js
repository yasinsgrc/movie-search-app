import Home from '../pages/Home';
import Favorite from '../pages/Favorite';
import Detail from '../pages/Detail';

export const routes = [
  {
    path: '/',
    exact: true,
    component: <Home />,
    title: 'Home',
    isHeaderElement: true,
  },
  {
    path:'/favorites/:id',
    exact:false,
    component:<Favorite/>,
    title:'Favorites',
    isHeaderElement:false,
  },
  {
    path: '/movies/:id',
    exact: false,
    component: <Detail />,
    title: 'Detail',
    isHeaderElement: false,
  },
];
