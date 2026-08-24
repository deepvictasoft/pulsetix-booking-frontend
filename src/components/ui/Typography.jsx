import React from 'react'
import { cn } from "@/lib/utils"
import { cva } from "class-variance-authority"

export const typographyVariants = cva("", {
    variants: {
        variant: {
            heading: "font-bold leading-[1.1] text-[2rem] md:text-[2.5rem] xl:text-[3rem] text-foreground-text",
            heading2: "text-2xl sm:text-3xl font-semibold text-foreground-text leading-tight",
            sectionTitle: "text-lg sm:text-xl font-semibold text-foreground-text",
            title: "text-lg font-semibold text-foreground-text",
            subtitle: "font-normal text-secondary-text text-sm leading-relaxed",
            body: "text-foreground-text text-[12px] sm:text-base leading-relaxed",
            body2: "text-muted-text text-[13px] leading-relaxed",
            list: "list-disc list-outside pl-6 text-muted-text text-base leading-relaxed",
            list2: "list-decimal list-outside pl-6 text-muted-text text-base leading-relaxed",
        },
    },
    defaultVariants: {
        variant: "body",
    },
})

// default tag per variant, override anytime with the `as` prop
const DEFAULT_TAG = {
    heading: "h1",
    heading2: "h2",
    sectionTitle: "h2",
    title: "h3",
    subtitle: "p",
    body: "p",
    body2: "p",
    list: "ul",
    list2: "ol",
}

const Typography = ({ as, variant = "body", className, children, ...props }) => {
    const Tag = as || DEFAULT_TAG[variant] || "span"

    return (
        <Tag className={cn(typographyVariants({ variant }), className)} {...props}>
            {children}
        </Tag>
    )
}

export default Typography

/**
    <Typography variant="heading">Your city. Your events.</Typography>
    <Typography variant="sectionTitle">Hot Right <span className="text-primary">Now</span></Typography>
    <Typography variant="subtitle">Search or browse events you'll love</Typography>
    <Typography variant="body">Some muted helper text</Typography>
*/