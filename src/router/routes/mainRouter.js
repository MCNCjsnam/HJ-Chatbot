const mainRoutes = [
    {
        path: '/main0001',
        name: 'mainN0001',
        props: true,
        component: () => import(/* webpackChunkName: "main" */ '@/views/main/main0001.vue')
    },
    {
        path: '/main0002',
        name: 'main0002',
        props: true,
        component: () => import(/* webpackChunkName: "main" */ '@/views/main/main0002.vue')
    },
];
export default mainRoutes;