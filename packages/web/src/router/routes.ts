import type { RouteRecordRaw, RouteMeta } from 'vue-router'
import HomeView from '@/views/HomeView.vue'

import layouts from '@/components/layouts'

interface CustomRouteMeta extends RouteMeta {
	layout?: keyof typeof layouts
	title?: string
}

type CustomRouteRecordRaw = RouteRecordRaw & {
	meta?: CustomRouteMeta
}

const routes: CustomRouteRecordRaw[] = [
	{
		path: '/',
		name: 'home',
		component: HomeView,
		meta: {
			layout: 'MainLayout',
			title: 'Home'
		}
	}
]

export default routes
