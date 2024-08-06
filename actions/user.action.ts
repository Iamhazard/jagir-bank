import { revalidatePath } from "next/cache";
import { createBankAccountProps, exchangePublicTokenProps } from "@/@types";
import { plaidClient } from "@/lib/plaid";
import { encryptId, parseStringify } from "@/lib/utils";
import { User } from "@prisma/client";
import { CountryCode, ProcessorTokenCreateRequest, ProcessorTokenCreateRequestProcessorEnum, Products } from "plaid";
import { db } from "@/lib/db";
import { addFundingSource } from "@/lib/dwolla.actions";



// export const getProfileInfo=async(userId: string |undefined) => {
//   try {
//     const profile = await db.profile.findUnique({
//       where: {
//         userId: userId
//       },
//     });
    
//     return profile;
//   } catch (error) {
//     console.error('Error fetching profile:', error);
//     throw new Error('Could not fetch profile');
//   }
// };

export const createLinkToken = async (user: User) => {
  try {
    const tokenParams = {
      user: {
        client_user_id: user.id
      },
      client_name: `${user.name} ${user.lastName}`,
      products: ['auth'] as Products[],
      language: 'en',
      country_codes: ['US'] as CountryCode[],
    }

    const response = await plaidClient.linkTokenCreate(tokenParams);
    return { linkToken: response.data.link_token };
  } catch (error) {
    console.error("Error creating link token:", error);
    throw new Error("Failed to create link token");
  }
}

export const createBankAccount = async ({
  userId,
  bankId,
  accountId,
  accessToken,
  fundingSourceUrl,
  shareableId,
}: createBankAccountProps) => {
  try {
    const bankAccount = await db.bankAccount.create({
      data: {
        userId,
        bankId,
        accountId,
        accessToken,
        fundingSourceUrl,
        shareableId,
      }
    });

    return bankAccount;
  } catch (error) {
    console.error("Error creating bank account:", error);
    throw new Error("Failed to create bank account");
  }
}

export const exchangePublicToken = async ({
  publicToken,
  user,
}: exchangePublicTokenProps) => {
  try {
    const exchangeResponse = await plaidClient.itemPublicTokenExchange({
      public_token: publicToken,
    });

    const accessToken = exchangeResponse.data.access_token;
    const itemId = exchangeResponse.data.item_id;

    const accountsResponse = await plaidClient.accountsGet({
      access_token: accessToken,
    });

    const accountData = accountsResponse.data.accounts[0];

    const processorTokenRequest: ProcessorTokenCreateRequest = {
      access_token: accessToken,
      account_id: accountData.account_id,
      processor: ProcessorTokenCreateRequestProcessorEnum.Dwolla,
    };

    const processorTokenResponse = await plaidClient.processorTokenCreate(processorTokenRequest);
    const processorToken = processorTokenResponse.data.processor_token;

    const fundingSourceUrl = await addFundingSource({
      dwollaCustomerId: user.dwollaCustomerId,
      processorToken,
      bankName: accountData.name,
    });

    if (!fundingSourceUrl) {
      throw new Error("Failed to create funding source URL");
    }

    await createBankAccount({
      userId: user.id,
      bankId: itemId,
      accountId: accountData.account_id,
      accessToken,
      fundingSourceUrl,
      shareableId: encryptId(accountData.account_id),
    });

    revalidatePath("/");

    return { publicTokenExchange: "complete" };
  } catch (error) {
    console.error("Error exchanging public token:", error);
    throw new Error("Failed to exchange public token");
  }
}