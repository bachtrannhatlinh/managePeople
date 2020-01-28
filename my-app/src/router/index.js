import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import View from '../views/View.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import FPassword from '../views/FPassword.vue'
import UnexpectedError from '../views/UnexpectedError.vue'
import Admin from '../components/Admin.vue'
import homeAdmin from '../components/HomeAdmin.vue'
import Accounts from '../components/accounts/AccountActive.vue'
import Account from '../components/accounts/Account.vue'
import AccoutBlock from "../components/accounts/AccountBlock.vue"
import StaffActive from '../components/manage_staff/StaffActive.vue'
import InternshipActive from '../components/manage_internship/InternshipActive.vue'
import Interships from '../components/manage_internship/Internship.vue'
import pushCV from '../components/manage_cv/pushCV.vue'
import PageNotFound from '../components/PageNotFound.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home    
  },
  {
    path: '/view',
    name: 'view',
    component: View,
    children: [
      {
        path: '/login',
        name: 'login',
        component: Login
      },
      {
        path: '/register',
        name: 'register',
        component: Register
      },
      {
        path: '/fpassword',
        name: 'fpassword',
        component: FPassword
      },
    ]
  },
  {
    path: '/unexpectederror',
    name: 'unexpectederror',
    component: UnexpectedError
  },
  {
    path: '/admin',
    name: 'admin',
    component: Admin,
    children: [
      {
        path: '/admin/homeAdmin',
        name: 'homeAdmin',
        component: homeAdmin
      },
      {
        path: '/admin/accounts',
        name: 'accounts',
        component: Accounts
      },
      {
        path: '/admin/account_block',
        name: 'accoutBlock',
        component: AccoutBlock
      },
      {
        path: '/admin/staff_active',
        name: 'staff_active',
        component: StaffActive
      },
      {
        path: '/admin/internship_active',
        name: 'internship_active',
        component: InternshipActive
      },
      {
        path: "/admin/pushCV",
        name: 'pushCV',
        component: pushCV
      }
    ]
  },
  {
    path: '/admin/accounts/:_id',
    name: 'account',
    props: true,
    component: Account
  },
  {
    path: '/admin/internships/:_id',
    name: 'interships',
    props: true,
    component: Interships
  },
  { path: "*", component: PageNotFound }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
