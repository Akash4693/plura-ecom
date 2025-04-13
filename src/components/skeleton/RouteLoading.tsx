"use client";

import { useEffect, useState, useTransition } from "react";
import { usePathname } from "next/navigation";
import Loading from "./Loading";

export default function RouteLoadingIndicator() {
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);
  const [isPending] = useTransition();

  useEffect(() => {
    if (isPending) {
      setLoading(true);
    } else {
      const timeout = setTimeout(() => setLoading(false), 300);
      return () => clearTimeout(timeout);
    }
  }, [pathname, isPending]);

  if (!loading) return null;

  return loading ? <Loading /> : null;
}
