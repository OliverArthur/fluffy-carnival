import type { RouteRecordRaw, RouteMeta } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import DetailsView from '@/views/DetailsView.vue'

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
	},
	{
		path: '/details/:name/:embed',
		name: 'details',
		component: DetailsView,
		meta: {
			layout: 'DetailsLayout',
			title: 'Details'
		},
		props: true
	}
]

export default routes
