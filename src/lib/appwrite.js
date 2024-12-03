import { Client, Account} from 'appwrite';

export const client = new Client();

client
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('674e04cb0027715e84a7'); 


    export async function logoutUser() {
        try {
          await account.deleteSession('current'); // Deletes the current session
          console.log("Logout successful");
        } catch (error) {
          console.error("Logout failed:", error.message);
        }
      }
export const account = new Account(client);
export { ID } from 'appwrite';
