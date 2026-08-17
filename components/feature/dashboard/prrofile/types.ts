export interface NotificationSetting {
  id: number;
  title: string;
  description: string;
  enabled: boolean;
}

export interface UserProfile {
  fullName: string;
  email: string;
  phone: string;
  birthday: string;
  occupation: string;
  emergencyContact: string;
  address: string;

  sessions: number;
  memberSince: string;
  therapist: string;
}
