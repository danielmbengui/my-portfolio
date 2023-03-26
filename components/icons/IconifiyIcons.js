import { Icon } from '@iconify/react';

export function SunIcon({size = 24, color = 'var(--text)', ...props}) {
    return(
        <Icon icon="ph:sun-bold" {...props} color={color} width={size} />
    )
}

export function MoonIcon({size = 24, color = 'var(--text)', ...props}) {
    return(
        <Icon icon="ph:moon-fill" {...props} color={color} width={size} />
    )
}