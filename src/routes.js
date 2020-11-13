import Home from './components/Home'
import Login from './components/Login'
import Register from './components/Register'
import Dashboard from './components/Dashboard'

export const routes = [
   {
      path: '*',
      redirect: '/login'
   },{
      path: '/',
      name: 'Home',
      component: Home
   },{
      path: '/login',
      name: 'login',
      component: Login
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