import type {
	ButtonSize,
	ButtonTheme,
	ButtonVariant
} from './types'

export const buttonThemeClasses: Record<ButtonTheme, string> = {
	primary: 'button--primary',
	secondary: 'button--secondary',
	danger: 'button--danger',
}

export const buttonSizeClasses: Record<ButtonSize, string> = {
	sm: 'button--sm',
	md: 'button--md',
	lg: 'button--lg'
}

export const buttonVariantClasses: Record<ButtonVariant, string> = {
	solid: 'button--solid',
	plain: 'button--plain',
	icon: 'button--icon',
	link: 'button--link',
	outline: 'button--outline'
}
