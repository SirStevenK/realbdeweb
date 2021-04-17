import { useEffect } from "react";
import Router from "next/router";
import useSWR from "swr";
import { Fetcher } from "swr/dist/types";
import { MagicUserMetadata } from "@magic-sdk/admin";

const fetcher: Fetcher<Record<string, unknown>> = (url: string) =>
  fetch(url)
    .then((r) => r.json())
    .then((data) => {
      return { user: data?.user || null };
    });

type useUserType = (props?: {
  redirectTo?: string;
  redirectIfFound?: string;
}) => {
  user: MagicUserMetadata | null;
  mutate: () => void;
};

export const useUser: useUserType = ({ redirectTo, redirectIfFound } = {}) => {
  const { data, error, mutate } = useSWR("/api/auth/user", fetcher);
  const user = data?.user;
  const finished = Boolean(data);
  const hasUser = Boolean(user);

  useEffect(() => {
    if (!redirectTo || !finished) return;
    if (
      // If redirectTo is set, redirect if the user was not found.
      (redirectTo && !redirectIfFound && !hasUser) ||
      // If redirectIfFound is also set, redirect if the user was found
      (redirectIfFound && hasUser)
    ) {
      Router.push(redirectTo);
    }
  }, [redirectTo, redirectIfFound, finished, hasUser]);

  return {
    mutate,
    user: error ? null : (user as MagicUserMetadata),
  };
};
