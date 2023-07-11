import type { Image as EpisodeImage } from './Image'
import type { Rating as EpisodeRating } from './Rating'

export type episodeID = number
export type episodeUrl = string
export type episodeName = string
export type episodeSeason = number
export type episodeNumber = number
export type episodeType = string
export type episodeAirdate = string
export type episodeAirtime = string
export type episodeAirstamp = string
export type episodeRuntime = number
export type episodeSummary = string


export interface Episode {
	id: episodeID
	url: episodeUrl
	name: episodeName
	season: episodeSeason
	number: episodeNumber
	type: episodeType
	airdate: episodeAirdate
	airtime: episodeAirtime
	airstamp: episodeAirstamp
	runtime: episodeRuntime
	rating: EpisodeRating
	image: EpisodeImage
	summary: episodeSummary
	_links: {
		self: {
			href: string
		},
		show: {
			href: string
		}
	}
}
