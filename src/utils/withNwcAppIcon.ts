/**
 * SDK 8.0.3 does not serialize options.icon, but preserves base URL parameters.
 */
export function withNwcAppIcon(
  authorizationBasePath: string,
  appIcon?: string
): string {
  if (!appIcon) {
    return authorizationBasePath;
  }
  const url = new URL(authorizationBasePath);
  url.searchParams.set('icon', appIcon);
  return url.toString();
}
