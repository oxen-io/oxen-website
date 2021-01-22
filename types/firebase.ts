export enum UserData {
  RECENT_SEARCHES = 'recentSearches',
  REFERRED_FROM = 'referredFrom',
  USER_SESSIONS = 'userSessions',
  USER_DEVICE = 'userDevice',
}

export interface IUserSession {
  device: 'mobile' | 'tablet' | 'desktop';
  sessionStartTimestamp: number;
  sessionEndTimestamp: number;
}

export interface IRecentSearch {
  query: string;
  timestamp: number;
}
