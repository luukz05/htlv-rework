"use client";

import { useEffect } from "react";
import { SITE_NAME } from "./page-title";

export function usePageTitle(title: string) {
  useEffect(() => {
    document.title = `${title} | ${SITE_NAME}`;
  }, [title]);
}
