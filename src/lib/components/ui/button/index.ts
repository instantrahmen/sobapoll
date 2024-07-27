import { type VariantProps, tv } from 'tailwind-variants';
import type { Button as ButtonPrimitive } from 'bits-ui';
import Root from './button.svelte';

const glassBaseClasses =
  'glass card tracking-wider border border-1 bg-glass hover:bg-glass-lighter';
const buttonVariants = tv({
  base: 'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  variants: {
    variant: {
      default: 'bg-primary text-primary-foreground hover:bg-primary/90 tracking-wider',
      destructive:
        'bg-destructive text-destructive-foreground hover:bg-destructive/90 tracking-wider',
      outline:
        'border border-input bg-background hover:bg-accent hover:text-accent-foreground tracking-wider',
      secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80 tracking-wider',
      ghost: 'hover:bg-accent hover:text-accent-foreground tracking-wider',
      link: 'text-primary underline-offset-4 hover:underline',
      glass: `${glassBaseClasses}`,
      'glass-primary': `${glassBaseClasses} bg-primary/40 hover:bg-primary/50`,
      'glass-secondary': `${glassBaseClasses} bg-secondary/40 hover:bg-secondary/50`,
      'glass-accent': `${glassBaseClasses} bg-accent/40 hover:bg-accent/50`,
      'glass-destructive': `${glassBaseClasses} bg-destructive/40 hover:bg-destructive/50`,
      'glass-neutral': `${glassBaseClasses} bg-white/40 dark:bg-black/40 hover:bg-white/50 dark:hover:bg-black/50`,
    },
    size: {
      default: 'h-10 px-4 py-2',
      sm: 'h-9 rounded-md px-3',
      lg: 'h-11 rounded-md px-8',
      icon: 'h-10 w-10',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'default',
  },
});

type Variant = VariantProps<typeof buttonVariants>['variant'];
type Size = VariantProps<typeof buttonVariants>['size'];

type Props = ButtonPrimitive.Props & {
  variant?: Variant;
  size?: Size;
};

type Events = ButtonPrimitive.Events;

export {
  Root,
  type Props,
  type Events,
  //
  Root as Button,
  type Props as ButtonProps,
  type Events as ButtonEvents,
  buttonVariants,
};
