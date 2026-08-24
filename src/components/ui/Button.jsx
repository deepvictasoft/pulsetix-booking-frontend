"use client"
import * as React from "react"
import { cva } from "class-variance-authority"
import { cn } from "@/lib/utils"
import Icon from "./Icon"

export const buttonVariants = cva(
    "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[40px] font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none cursor-pointer",
    {
        variants: {
            variant: {
                primary: "bg-gradient text-primary-text hover:bg-primary-hover",
                outline: "bg-transparent border border-primary text-gradient hover:bg-white/10",
                ghost: "bg-transparent border border-primary/50 text-primary hover:bg-primary/10",
            },
            size: {
                default: "h-10 px-4 text-sm",
                sm: "h-9 px-3 text-xs",
                lg: "h-11 px-6 text-sm",
            },
        },
        defaultVariants: {
            variant: "primary",
            size: "default",
        },
    }
)

/**
 * icon: name from icons/utils.js
 * iconPosition: "left" | "right" (default "right")
 */
const Button = ({
    children,
    variant = "primary",
    size = "default",
    icon,
    iconPosition = "right",
    className,
    iconClassName,
    ...props
}) => {
    return (
        <button className={cn(buttonVariants({ variant, size }), className)} {...props}>
            {icon && iconPosition === "left" && <Icon name={icon} width={16} height={16} className={cn("h-4 w-4", iconClassName)}/>}
            {children}
            {icon && iconPosition === "right" && <Icon name={icon} width={16} height={16}  className={cn("h-4 w-4", iconClassName)}/>}
        </button>
    )
}

export default Button