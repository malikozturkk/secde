export interface User {
  id: string;
  username: string;
  email: string;
  avatarCustomization: AvatarCustomization;
  country: string;
  city: string;
  madhab: "SHAFI" | "HANAFI";
  language: string;
  locationChangeCount?: number;
  madhabChangeCount?: number;
}

export interface AvatarCustomization {
  gender: Gender;
  colors: {
    iris: string;
    pupil: string;
    hair: string;
    skin: string;
    lips: string;
    nose: string;
    earInner: string;
    eyebrow: string;
    outfit: string;
    background: string;
  };
  accessories: Record<string, unknown>;
}

export interface UserDetail extends Omit<User, "madhab"> {
  madhab?: User["madhab"];
  followingCount: number;
  followerCount: number;
  isFollowing: boolean | null;
  mutualFollowers: {
    count: number;
    preview: {
      username: string;
      avatarCustomization: AvatarCustomization;
    }[];
  };
  createdAt: string;
  updatedAt?: string;
  avatarCustomization: AvatarCustomization;
}

interface AuthTokens {
  accessToken: string;
}

export interface AuthTokensWithUser extends AuthTokens {
  user: User;
}

export interface RegisterPayload {
  username: string;
  email: string;
  password: string;
  gender: "MALE" | "FEMALE";
  country: string;
  city: string;
  madhab: "SHAFI" | "HANAFI";
  language: string;
  termsAccepted: boolean;
  privacyPolicyAccepted: boolean;
  specialCategoryDataAccepted: boolean;
}

export interface LoginPayload {
  identifier: string;
  password: string;
}

export interface UpdateProfilePayload {
  username?: string;
  currentPassword?: string;
  newPassword?: string;
  language?: string;
  country?: string;
  city?: string;
  madhab?: string;
}

export interface ForgotPasswordPayload {
  email: string;
}

export interface ValidateResetTokenPayload {
  userId: string;
  token: string;
}

export interface ResetPasswordPayload {
  userId: string;
  token: string;
  newPassword: string;
  confirmPassword: string;
}

export interface RegisterResponseData {
  tempToken: string;
}

export type LoginResponseData = AuthTokensWithUser;
export type RefreshTokenResponseData = AuthTokensWithUser;

export type ProfileResponseData = UserDetail;
export type UpdateProfileResponseData = User & {
  tokens?: {
    accessToken: string;
  };
};

export enum Gender {
  MALE = "MALE",
  FEMALE = "FEMALE",
}

export interface ForgotPasswordResponseData {
  message: "FORGOT_PASSWORD_EMAIL_SENT";
}

export type ValidateResetTokenResponseData = boolean;

export interface FollowListParams {
  page?: number;
  pageSize?: number;
}

export interface FollowListItem {
  username: string;
  avatarCustomization: AvatarCustomization;
}

export interface PageMeta {
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
  hasNextPage: boolean;
}

export interface FollowListResponseData {
  items: FollowListItem[];
  meta: PageMeta;
}
