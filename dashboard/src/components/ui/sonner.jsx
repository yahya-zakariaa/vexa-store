"use client";

import { useTheme } from "next-themes";
import { Toaster as Sonner } from "sonner";
import { CheckCircle, AlertTriangle, XCircle, Info } from "lucide-react"; // أيقونات من Lucide

const iconVariants = {
  success: { icon: CheckCircle, className: "text-green-500" },
  warning: { icon: AlertTriangle, className: "text-yellow-500" },
  error: { icon: XCircle, className: "text-red-500" },
  default: { icon: Info, className: "text-blue-500" },
};

const Toaster = ({ ...props }) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast flex items-center gap-2 group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-muted-foreground",
          actionButton:
            "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground font-medium",
          cancelButton:
            "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground font-medium",
        },
        icon: ({ variant }) => {
          const { icon: Icon, className } = iconVariants[variant] || iconVariants.default;
          return <Icon className={`text-red-500 w-5 h-5`} />;
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
