import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

interface RouteModule {
  default: RouteRecordRaw;
}

let status: Boolean = false;

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'login',
      component: () => import('@/views/login.vue'),
      meta: {
        title: '登录',
      },
    },
  ],
});

/**
 * 直接读取所有配置路由文件
 */
const routes: Array<RouteRecordRaw> = [];

const routeFiles: Record<string, RouteModule> = import.meta.glob('@/router/*.ts', { eager: true });

Object.keys(routeFiles).forEach(async (routePath) => {
  if (routePath) {
    const fileModule = await routeFiles[routePath].default;
    routes.push(fileModule);
  }
});

/**
 * 页面跳转取消axios的请求
 */
router.beforeEach((to, from, next) => {
  console.log(`------------${from.path}------------`);
  // 页面跳转取消axios的请求
  window.__axiosPromiseArr.forEach((ele: any, idx: number) => {
    ele.cancel();
    delete window.__axiosPromiseArr[idx];
  });
  if (!status) {
    routes.forEach((item) => router.addRoute(item));
    status = true;
    next({ ...to, replace: true }); // 这里相当于push到一个页面 不在进入路由拦截
  } else {
    next();
  }
});

export default router;
