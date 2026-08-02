export interface User {
  id: string;
  username: string;
  email: string;
  avatar: string | null;
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

export interface UserDetail extends User {
  followingCount: number;
  followerCount: number;
  isFollowing: boolean | null;
  mutualFollowers: {
    count: number;
    preview: {
      username: string;
      avatar: string | null;
      avatarCustomization: AvatarCustomization;
    }[];
  };
  createdAt: string;
  updatedAt?: string;
  avatarCustomization: AvatarCustomization;
}

interface AuthTokens {
  accessToken: string;
  refreshToken: string;
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
  latitude: number;
  longitude: number;
  madhab: "SHAFI" | "HANAFI";
  language: string;
  termsAccepted: boolean;
  privacyPolicyAccepted: boolean;
}

export interface LoginPayload {
  identifier: string;
  password: string;
}

export interface RefreshTokenPayload {
  refreshToken: string;
}

export interface UpdateProfilePayload {
  username?: string;
  avatar?: string;
  currentPassword?: string;
  newPassword?: string;
  language?: string;
  country?: string;
  city?: string;
  latitude?: number;
  longitude?: number;
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

export interface LogoutPayload {
  refreshToken: string;
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
    refreshToken: string;
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
