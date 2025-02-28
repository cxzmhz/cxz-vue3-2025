import type { Component } from 'vue';
import {
  createRouter,
  createWebHistory,
  type RouteRecordRaw,
  type RouterHistory,
} from 'vue-router';

function createR({
  pages,
  pathMatchReg = /^\/src\/views\/(((.*)\/.*)|(.*))\.vue$/,
}: {
  pages: Record<string, () => Promise<Record<string, Component>>>;
  pathMatchReg?: RegExp;
}) {
  const routerData: { history: RouterHistory; routes: RouteRecordRaw[] } = {
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [],
  };
  console.log('..........', pages);
  Object.keys(pages).forEach(async (path) => {
    const match = pathMatchReg.exec(path);
    console.log('.........match', match);
    if (match) {
      let routerPath = match[1].toLocaleLowerCase().split('/')[0];
      console.log('...........routerPath', routerPath);
      const name = routerPath;
      if (routerPath === 'home') {
        routerPath = '';
      }
      // const Comp = (await (pages[path])) as unknown as {default: any};
      routerData.routes.push({
        path: `/${routerPath}`,
        name,
        component: pages[path],
      });
    }
  });
  // console.log('........routerData', routerData)

  return createRouter(routerData);
}

const router = createR({
  // @ts-ignore
  pages: import.meta.glob('/src/views/**/*.vue') as Record<
    string,
    () => Promise<Record<string, Component>>
  >,
});

// const router = createRouter({
//   history: createWebHistory(import.meta.env.BASE_URL),
//   routes: [
//     {
//       path: '/',
//       name: 'home',
//       component: Home,
//     },
//     {
//       path: '/about',
//       name: 'about',
//       // route level code-splitting
//       // this generates a separate chunk (About.[hash].js) for this route
//       // which is lazy-loaded when the route is visited.
//       component: () => import('../views/About.vue'),
//     },
//   ],
// })

export default router;
