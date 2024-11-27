// import { createWebHashHistory, createRouter } from "vue-router";
import { createWebHistory, createRouter } from "vue-router";

//라우터들 임포트
import mainRoutes from "./routes/mainRouter";

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes: [
        // Default Path 설정
        {
            path: '/',
            redirect: '/main0001',
        },

        ...mainRoutes,


        // 404 Path 처리
        {
            path: '/:pathMatch(.*)*',
            redirect: '/main0001', // 선언되지 않은 Path릂 지정된 경로로 리다이렉트
        },
    ]
});
/* eslint-disable */
const isValidRandomCode = (randomCode) => {
    // 여기에 랜덤 코드의 유효성 검사 로직을 추가
    // 예를 들어:
    // 1. 특정 길이 체크
    // 2. 특정 패턴 매칭
    // 3. 허용된 문자 집합 체크 등
    
    // UUID 형식 체크 예시
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    return uuidRegex.test(randomCode);
};

// 네비게이션 가드 추가
router.beforeEach((to, from, next) => {
    // main0002 라우트인 경우
    if (to.name === 'main0002') {
        const randomCode = to.params.randomCode;
        
        if (!randomCode) {
            next('/main0001');
            return;
        }

        // if (!randomCode || !isValidRandomCode(randomCode)) {
        //     next('/main0001');
        //     return;
        // }
    }
    
    next();
});

export default router;