export default {
	clearMocks: true,
	coverageDirectory: 'coverage',
	testEnvironment: 'node',
	transform: {
		'^.+\\.ts?$': 'ts-jest'
	},
	testPathIgnorePatterns: ['/node_modules/', '/dist/'],
}
