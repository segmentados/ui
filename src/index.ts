/** Barrel público del Design System BI. Importar siempre desde '@ds'. */

// utils
export { cn } from './utils/cn';

// tokens
export * from './tokens/themes';
export * from './tokens/scale';

// theme
export { ThemeProvider, useTheme } from './theme/ThemeProvider';
export { applyThemeVars } from './theme/cssVars';

// primitives
export { Button, type ButtonProps, type ButtonVariant, type ButtonSize } from './primitives/Button';
export { Input, type InputProps } from './primitives/Input';
export { Textarea, type TextareaProps } from './primitives/Textarea';
export { Select, type SelectProps, type SelectOption } from './primitives/Select';
export { Card, CardHeader, CardTitle, CardDescription, type CardProps } from './primitives/Card';
export { Badge, type BadgeProps, type BadgeTone } from './primitives/Badge';
export { Chip, type ChipProps } from './primitives/Chip';
export { Alert, type AlertProps } from './primitives/Alert';
export { Typography, type TypographyProps } from './primitives/Typography';
export type { ColorVariant, SizeVariant, AlertVariant } from './primitives/types';
export { Spinner, PageLoader } from './primitives/Spinner';
export { Avatar, type AvatarProps } from './primitives/Avatar';
export { Kbd, modKey } from './primitives/Kbd';
export { Skeleton } from './primitives/Skeleton';
export { Modal, ModalHeader, ModalBody, ModalFooter, type ModalProps } from './primitives/Modal';
export { Menu, MenuItem, MenuSeparator, MenuLabel, type MenuProps, type MenuItemProps } from './primitives/Menu';
export { Tooltip, type TooltipProps } from './primitives/Tooltip';
export { EmptyState, type EmptyStateProps } from './primitives/EmptyState';

// feedback / toasts
export { Toaster } from './feedback/Toaster';
export { ConfirmDialog, type ConfirmDialogProps } from './feedback/ConfirmDialog';
export { toast, useToastStore, type Toast, type ToastTone } from './feedback/toastStore';

// shell (marca-agnóstico, reutilizable por app de la suite)
export { ContextSwitcher, type ContextOption } from './shell/ContextSwitcher';
export { EnvironmentSwitcher, type EnvironmentOption } from './shell/EnvironmentSwitcher';
export { BackToAppButton } from './shell/BackToAppButton';
export { LanguageMenu, type LanguageOption } from './shell/LanguageMenu';
export { PageHeader, type PageHeaderProps } from './shell/PageHeader';
export { AppSidebar, type AppSidebarProps, type SidebarNavItem, type SidebarNavSection, type SidebarIcon, type RenderLink } from './shell/AppSidebar';
