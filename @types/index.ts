/* eslint-disable no-unused-vars */

import { UseFormSetValue } from "react-hook-form";

export declare type SearchParamProps = {
  params: { [key: string]: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

// ========================================
export declare type SignUpParams = {
  firstName: string;
  lastName: string;
  address1: string;
  city: string;
  state: string;
  postalCode: string;
  dateOfBirth: string;
  ssn: string;
  email: string;
  password: string;
};


// export declare type SignUpParams = {
//   userId?: string;
//   address1: string;
//   city: string;
//   state: string;
//   postalCode: string;
//   dateOfBirth: string;
//   ssn: string;
//   password: string;
// };

declare type LoginUser = {
  email: string;
  password: string;
};

export type Profile = {
  id: string;
  userId: string;
  userName: string | null;
  userImage: string | null;
  userBio: string | null;
  userSkills: string | null;
  Education: string;
  Language: string;
  dwollaCustomerUrl: string;

  dwollaCustomerId: string;

}
export declare type User = {
  id: string;
  $id: string;
  email: string | null;
  userId: string;
  dwollaCustomerUrl: string;
  dwollaCustomerId: string;
  firstName: string;
  lastName: string;
  name: string;
  address1: string;
  city: string;
  state: string;
  postalCode: string;
  dateOfBirth: string;
  ssn: string;
};

declare type NewUserParams = {
  userId: string;
  email: string;
  name: string;
  password: string;
};

export declare type Account = {
  id: string;
  availableBalance: number;
  currentBalance: number;
  officialName: string;
  mask: string;
  institutionId: string;
  name: string;
  type: string;
  subtype: string;
  appwriteItemId: string;
  sharaebleId: string;
};

export declare type Transaction = {
  id: string;
  $id: string;
  name: string;
  paymentChannel: string;
  type: string;
  accountId: string;
  amount: number;
  pending: boolean;
  category: string;
  date: string;
  image: string;
  $createdAt: string;
  channel: string;
  senderBankId: string;
  receiverBankId: string;
};

export declare type Bank = {
  $id: string;
  accountId: string;
  bankId: string;
  accessToken: string;
  fundingSourceUrl: string;
  userId: string;
  shareableId: string;
};

export declare type AccountTypes =
  | "depository"
  | "credit"
  | "loan "
  | "investment"
  | "other";

declare type Category = "Food and Drink" | "Travel" | "Transfer";

export declare type CategoryCount = {
  name: string;
  count: number;
  totalCount: number;
};

declare type Receiver = {
  firstName: string;
  lastName: string;
};

export declare type TransferParams = {
  sourceFundingSourceUrl: string;
  destinationFundingSourceUrl: string;
  amount: string;
};

export declare type AddFundingSourceParams = {
  dwollaCustomerId: string;
  processorToken: string;
  bankName: string;
};

export declare type NewDwollaCustomerParams = {
  firstName: string;
  lastName: string;
  email: string;
  type: string;
  address1: string;
  city: string;
  state: string;
  postalCode: string;
  dateOfBirth: string;
  ssn: string;
};

export declare interface CreditCardProps {
  account: Account;
  userName: string;
  showBalance?: boolean;
}

export declare interface BankInfoProps {
  account: Account;
  appwriteItemId?: string;
  type: "full" | "card";
}

export declare interface HeaderBoxProps {
  type?: "title" | "greeting";
  title: string;
  subtext: string;
  user?: string;
}

export declare interface MobileNavProps {
  user: User;
}

declare interface PageHeaderProps {
  topTitle: string;
  bottomTitle: string;
  topDescription: string;
  bottomDescription: string;
  connectBank?: boolean;
}

export declare interface PaginationProps {
  page: number;
  totalPages: number;
}
export declare interface PlaidLinkProps {
  user: User;
  variant?: "primary" | "ghost";
  dwollaCustomerId?: string;
}
// // export declare interface PlaidLinkProps {
//   profile: Profile;
//   variant?: "primary" | "ghost";
//   dwollaCustomerId?: string;
// }

// declare type User = sdk.Models.Document & {
//   accountId: string;
//   email: string;
//   name: string;
//   items: string[];
//   accessToken: string;
//   image: string;
// };

declare interface AuthFormProps {
  type: "sign-in" | "sign-up";
}

export declare interface BankDropdownProps {
  accounts: Account[];
  setValue?: UseFormSetValue<any>;
  otherStyles?: string;
}

export declare interface BankTabItemProps {
  account: Account;
  appwriteItemId?: string;
}

export declare interface TotalBalanceBoxProps {
  accounts: Account[];
  totalBanks: number;
  totalCurrentBalance: number;
}

export declare interface FooterProps {
  user: User;
  type?: 'mobile' | 'desktop'
}

export declare interface RightSidebarProps {
  user: User;
  transactions: Transaction[];
  banks: Bank[] & Account[];
}

export declare interface SiderbarProps {
  user: User;
}

export declare interface RecentTransactionsProps {
  accounts: Account[];
  transactions: Transaction[];
  appwriteItemId: string;
  page: number;
}

declare interface TransactionHistoryTableProps {
  transactions: Transaction[];
  page: number;
}

export declare interface CategoryBadgeProps {
  category: string;
}

export declare interface TransactionTableProps {
  transactions: Transaction[];
}

export declare interface CategoryProps {
  category: CategoryCount;
}

export declare interface DoughnutChartProps {
  accounts: Account[];
}

export declare interface PaymentTransferFormProps {
  accounts: Account[];
}

// Actions
export declare interface getAccountsProps {
  userId: string;
}

export declare interface getAccountProps {
  appwriteItemId: string;
}

export declare interface getInstitutionProps {
  institutionId: string;
}

export declare interface getTransactionsProps {
  accessToken: string;
}

export declare interface CreateFundingSourceOptions {
  customerId: string; // Dwolla Customer ID
  fundingSourceName: string; // Dwolla Funding Source Name
  plaidToken: string; // Plaid Account Processor Token
  _links: object; // Dwolla On Demand Authorization Link
}

export declare interface CreateTransactionProps {
  name: string;
  amount: string;
  senderId: string;
  senderBankId: string;
  receiverId: string;
  receiverBankId: string;
  email: string;
}

export declare interface getTransactionsByBankIdProps {
  bankId: string;
}

export declare interface signInProps {
  email: string;
  password: string;
}

export declare interface getUserInfoProps {
  userId: string;
}

export declare interface exchangePublicTokenProps {
  publicToken: string;
  user: User;
}

export declare interface createBankAccountProps {
  accessToken: string;
  userId: string;
  accountId: string;
  bankId: string;
  fundingSourceUrl: string;
  shareableId: string;
}

export declare interface getBanksProps {
  userId: string;
}

export declare interface getBankProps {
  documentId: string;
}

export declare interface getBankByAccountIdProps {
  accountId: string;
}