import { AvatarCustomization } from "./auth.types";

export interface UserSearchResult {
  username: string;
  avatar: string | null;
  avatarCustomization: AvatarCustomization;
  isFollowing: boolean;
  mutualFollowers: {
    count: number;
    preview: {
      username: string;
      avatar: string | null;
      avatarCustomization: AvatarCustomization;
    }[];
  };
}

export interface SearchUsersParams {
  query: string;
  pageSize: number;
  cursor?: number;
}

export interface SearchUsersResponse {
  users: UserSearchResult[];
  totalCount: number;
  nextCursor: number | null;
}
