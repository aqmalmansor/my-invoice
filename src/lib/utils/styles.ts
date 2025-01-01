import { cn } from "./tailwind-merge";

export const getErrorInputStyle = (isError: boolean): string =>
  cn([
    "border rounded-md p-2",
    isError
      ? cn([
          "shadow-none",
          "border-red-300",
          "focus-within:shadow-sm",
          "focus-within:shadow-red-500/50 ",
          "focus-within:outline-none",
          "focus-within:outline-color-red-500",
          "focus:shadow-sm",
          "focus:shadow-red-500/50 ",
          "focus:outline-none",
          "focus:outline-color-red-500",
          "focus-visible:shadow-sm",
          "focus-visible:shadow-red-500/50 ",
          "focus-visible:outline-none",
          "focus-visible:outline-color-red-500",
          "transition-shadow duration-200",
          "focus-visible:[box-shadow:inset_0_0_0_1.5px_rgb(300_100_100_/_var(--tw-bg-opacity,_1))]",
          "focus-within:[box-shadow:inset_0_0_0_1.5px_rgb(300_100_100_/_var(--tw-bg-opacity,_1))]",
          "focus:[box-shadow:inset_0_0_0_1.5px_rgb(300_100_100_/_var(--tw-bg-opacity,_1))]",
        ])
      : "border-gray-300",
  ]);

export const getErrorMessageStyle = (isError: boolean): string =>
  cn([isError ? "text-red-500" : "text-gray-600"]);

export const getErrorLabelStyle = (isError: boolean): string =>
  cn([isError ? "text-red-500" : ""]);
