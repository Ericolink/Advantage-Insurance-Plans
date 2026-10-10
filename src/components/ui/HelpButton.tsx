"use client";

import type { ReactNode } from "react";
import type { ServiceId } from "@/config/types";
import { buttonClass } from "./Button";

export const HELP_EVENT = "lead:help";

/**
 * Link to the contact form that also preselects the kind of help.
 * Without JavaScript it is a plain link to #contact.
 */
export function HelpButton({
  help,
  children,
  variant = "brand",
  className = "",
}: {
  help?: ServiceId;
  children: ReactNode;
  variant?: "primary" | "secondary" | "brand";
  className?: string;
}) {
  return (
    <a
      href="#contact"
      className={buttonClass(variant, className)}
      onClick={() => {
        if (help) window.dispatchEvent(new CustomEvent(HELP_EVENT, { detail: help }));
      }}
    >
      {children}
    </a>
  );
}
