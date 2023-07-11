import type { Country } from './Country'
import type { Image as ShowImage } from './Image'
import type { Rating as ShowRating } from './Rating'

export type showId = number
export type showUrl = string
export type showName = string
export type showType = string
export type showLanguage = string
export type showGenres = string
export type showStatus = string
export type showRuntime = number
export type showAverageRuntime = number
export type showPremiered = string
export type showEnded = string
export type showOfficialSite = string
export type showWeight = number
export type showWebChannel = string | null
export type showDvdCountry = string | null
export type showSummary = string | null
export type showUpdated = number

export interface showExternals {
	tvrage: number | null
	thetvdb: number | null
	imdb: string | null
}

export interface Schedule {
	time: string
	days: string[]
}

export interface showNetwork {
	id: number
	name: string
	country: Country
}

export interface Show {
	id: showId
	url: showUrl
	name: showName
	type: showType
	language: showLanguage
	genres: showGenres[]
	runtime: showRuntime
	averageRuntime: showAverageRuntime
	premiered: showPremiered
	ended: showEnded
	officialSite: showOfficialSite
	schedule: Schedule
	status: showStatus
	rating: ShowRating
	weight: showWeight
	network: showNetwork
	webChannel: showWebChannel
	dvdCountry: showDvdCountry
	externals: showExternals
	image: ShowImage
	summary: showSummary
	updated: showUpdated
	_links: {
		self: {
			href: string
		}
	}
	previousepisode: {
		href: string
	}
}


export interface ShowSearchResult {
	score: number
	show: Show
}
