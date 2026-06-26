"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AdminLayout({ children }: any) {
  const router = useRouter();

  useEffect(() => {
    fetch("/api/me")
      .then((res) => res.json())
      .then((user) => {
        if (user.role !== "ADMIN") {
          router.push("/dashboard");
        }
      });
  }, []);

  return children;
}