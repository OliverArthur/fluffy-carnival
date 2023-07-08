export type countryID = number
export type countryName = string
export type countryCode = string
export type countryTimezone = string

export interface Country {
	id: countryID
	name: countryName
	code: countryCode
	timezone: countryTimezone
}
