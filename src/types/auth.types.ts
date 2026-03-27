export interface User {
  id: string;
  username: string;
  email: string;
  avatar: string | null;
  avatarCustomization: AvatarCustomization;
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
    neck: string;
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

export interface AuthTokens {
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
export type UpdateProfileResponseData = User;

export enum Gender {
  MALE = "MALE",
  FEMALE = "FEMALE",
}

export interface ForgotPasswordResponseData {
  message: "FORGOT_PASSWORD_EMAIL_SENT";
}

export type ValidateResetTokenResponseData = boolean;
