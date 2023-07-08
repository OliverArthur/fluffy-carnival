import type { RouteRecordRaw, RouteMeta } from 'vue-router'


interface CustomRouteMeta extends RouteMeta {
	layout?: keyof typeof import('@/components/layouts')
	title?: string
}

type CustomRouteRecordRaw = RouteRecordRaw & {
  meta?: CustomRouteMeta
}

const routes: CustomRouteRecordRaw[] = [
	{
		path: '/',
		name: 'home',
		component: () => import('@/views/HomeView.vue'),
		meta: {
			layout: 'ladingPage',
			title: 'Home'
		}
	}
]

export default routes
