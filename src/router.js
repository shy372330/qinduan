import Home from './pages/Home'
import device_company from './pages/company/device/device_company'
import device from './pages/enterprise/device/device'
import product from './pages/enterprise/product/product'
import  login  from './login'
/*import system_userInfo from './pages/system/system_userInfo'*/
let router = [
      {
        path:'/login',
        component:login
      }, {
        path:'/',
        component:login
      },{
        path:'/home',
        component:Home
      },
      {
      path: '/',
      name: '用户管理',
      component: Home,
	     children: [
    		/*{ path: '/system_userInfo', component: system_userInfo, name: '账户管理' },*/
    	/*	{ path: '/system_roleInfo', component: system_roleInfo, name: '角色管理' },
    		{ path: '/system_PerInfo', component: system_PerInfo, name: '权限管理' },*/
      ]
    }, {
      path: '/',
      name: '公司管理',
      component: Home,
	    children: [
    		{ path: '/company_device', component: device_company, name: '控制器管理' },
      ]
    },
    {
      path: '/',
      name: '企业管理',
      component: Home,
      children: [
        { path: '/enter_deviceInfo', component: device, name: '控制器管理' },
        { path: '/product', component: product, name: '产品管理' }
      ]
    }
];
export default router;
