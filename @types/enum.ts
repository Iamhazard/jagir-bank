export enum AUTH_TYPE {
  SIGN_IN = "SIGN_IN",
  SIGN_UP = "SIGN_UP",
}

interface FreelancerProfile {
  id: string;
  userId: string;
  streetAddress: string;
  country: string;
  stateName: string;
  cityName: string;
  phoneNumber: number;
  postalCode: number;
  date: string;
  services: string;
  hourlyRate?: number;
  servicesFee?: number;
  estimatedAmount?: number;
  bio: string;
  language: string;
  educationCertificate?: string;
  experience?: string;
  profileImage?: string;
}

export default FreelancerProfile;
