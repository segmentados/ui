/** Barrel público del Design System BI. Importar siempre desde '@ds'. */

// utils
export { cn } from './utils/cn';

// tokens
export * from './tokens/themes';
export * from './tokens/scale';

// theme
export { ThemeProvider, useTheme } from './theme/ThemeProvider';
export { applyThemeVars, themeCssText } from './theme/cssVars';
export { getPortalHost } from './theme/portalHost';

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
export { Checkbox, type CheckboxProps } from './primitives/Checkbox';
export { Switch, type SwitchProps } from './primitives/Switch';
export { Progress, type ProgressProps } from './primitives/Progress';
export { Divider, type DividerProps } from './primitives/Divider';
export { PasswordInput, type PasswordInputProps } from './primitives/PasswordInput';

// patrones Data Cloud — mid-level, construidos sobre los primitives
export { StatCard, StatGrid, type StatCardProps, type StatGridProps, type StatSize } from './patterns/StatCard';
export { StatusBadge, statusTone, type StatusBadgeProps, type StatusTone } from './patterns/StatusBadge';
export { WizardSteps, type WizardStep, type WizardStepsProps } from './patterns/WizardSteps';
export { WizardSummarySidebar, type WizardSummarySidebarProps } from './patterns/WizardSummarySidebar';
export { SelectableCard, type SelectableCardProps } from './patterns/SelectableCard';
export { KeyValue, type KeyValueItem, type KeyValueProps } from './patterns/KeyValue';
export { Collapsible, Accordion, TreeNode, type CollapsibleProps, type AccordionItem, type AccordionProps, type TreeNodeProps } from './patterns/Collapsible';
export { SegmentedToggle, type SegmentedOption, type SegmentedToggleProps } from './patterns/SegmentedToggle';
export { SearchBar, FilterBar, type SearchBarProps, type FilterBarProps } from './patterns/SearchBar';
export { ListItemRow, NavigationCard, type ListItemRowProps, type NavigationCardProps } from './patterns/ListItemRow';
export { Pagination, type PaginationProps } from './patterns/Pagination';
export { DataTable, type DataTableProps, type DataTableColumn } from './patterns/DataTable';

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
// iconografía canónica de Data Cloud
export { Icon, iconNames, isIconName, type IconName, type IconProps } from './icons/Icon';

export { AppSidebar, type AppSidebarProps, type SidebarNavItem, type SidebarNavSection, type SidebarIcon, type RenderLink } from './shell/AppSidebar';
