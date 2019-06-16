import Vue from 'vue'
import Router from 'vue-router'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import DashboardWrapper from '@/components/Admin/DashboardWrapper'
import DashView from '@/components/DashView';
import Login from '@/components/auth/Login'
import Register from '@/components/auth/Register'
import LandingPage from '@/components/FrontEnd/LandingPage';

// Admin Component
import DashboardAdmin from '@/components/Admin/DashboardAdmin'
import Doctor from '@/components/Admin/Doctor/Doctor'
import Patient from '@/components/Admin/Patient/Patient'
import Nurse from '@/components/Admin/Nurse/Nurse'
import Medicine from '@/components/Admin/Medicine/Medicine'
import Appointment from '@/components/Admin/Appointment/Appointment'
import Procedure from '@/components/Admin/Appointment/Procedure/Procedure';
import ViewMedicalRecord from '@/components/Admin/Appointment/Procedure/MedicalRecord/ViewMedicalRecord';

Vue.use(Router)
Vue.use(BootstrapVue)

const router = new Router({
  routes: [{
      path: '/',
      component: DashView,
      children: [{
        path: '',
        name: 'LandingPage',
        component: LandingPage
      }]
      // meta: {
      //   auth: true
      // }
    },
    {
      path: '/dashboard/',
      component: DashboardWrapper,
      children: [{
        path: '',
        name: 'DashboardAdmin',
        component: DashboardAdmin
      }, {
        path: 'doctors',
        name: 'Doctors',
        component: Doctor
      }, {
        path: 'patients',
        name: 'Patients',
        component: Patient
      }, {
        path: 'nurses',
        name: 'Nurses',
        component: Nurse
      }, {
        path: 'medicines',
        name: 'Medicines',
        component: Medicine
      }, {
        path: 'appointments',
        name: 'Appointment',
        component: Appointment
      }, {
        path: 'procedures/:id/:_mongoID',
        name: 'Procedure',
        component: Procedure
      }, {
        path: 'medical-records/:id',
        name: 'MedicalRecordView',
        component: ViewMedicalRecord
      }]
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    }
  ]
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.auth)) {
    let token = localStorage.getItem('usertoken');
    if (token) {
      next();
    } else {
      // next('/login');
      next();
    }
  } else {
    next();
  }
})

export default router;
