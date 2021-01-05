import Home from './components/Home'
import Login from './components/Login'
import Register from './components/Register'
import Dashboard from './components/Dashboard'
import Pseudo from './components/Pseudo'

export const routes = [
   {
      path: '/:catchAll(.*)',
      redirect: '/dashboard'
   },{
      path: '/',
      name: 'Dashboard',
      component: Dashboard
   },{
      path: '/home',
      name: 'Home',
      component: Home
   },{
      path: '/login',
      name: 'login',
      component: Login
   },{
      path: '/pseudo',
      name: 'pseudo',
      component: Pseudo
   },{
      path: '/dashboard',
      name: 'Dashboard',
      component: Dashboard,
      meta: {
         requiresAuth: true
      }
   },{
      path: '/register',
      name: 'register',
      component: Register
   }
];