# Run the project

1. clone the app
    ```bash
    git clone https://github.com/matxtam/wp1121-final-bvr.git
    ```

2. Install dependencies
   ```bash
   yarn
   ```
3. Copy the `.env.local.example` file and rename it as `.env.local
    ```bash 
    cp .env.local.example .env.local
    ```
    And adding the following contents to `.env.local` file in the project root:
   ```text
   AUTH_SECRET=<this can be any random string>
   AUTH_GITHUB_ID=
   AUTH_GITHUB_SECRET=
   ```
   - If there's some problem for not knowing what to paste, go to the bottom of this Readme, "Next Auth Setup" will tell you what to do.

5. Start the database
   ```bash
   docker compose up -d
   ```
6. Run migrations
   ```bash
   yarn migrate
   ```
7. Start the development server
   ```bash
   yarn dev
   ```
8. Open http://localhost:3000 in your browser
9. 每位組員之負責項目：
   - 謝函蓁：
         - 負責處理
         *folder: HomePage、History
   - 陳郁玲：
         - 
         *folder: GamePage
   - 陳千蕙：
         -
         *folder: SettingPage、auth
11. Appendix

   ## NextAuth Setup

    1. Install next-auth

       ```bash
       yarn add next-auth@beta
       ```

    2. Get Github OAuth credentials

       - Go to `Settings` tab of your Github account
       - Click `Developer settings` on the left sidebar
       - Click `OAuth Apps` on the left sidebar
       - Click `New OAuth App` or `Registr a new application`
       - Enter the following information:
         - `Application name`: `BATRA` (or any name you like)
         - `Homepage URL`: `http://localhost:3000`
         - `Authorization callback URL`: `http://localhost:3000/api/auth/callback/github`
       - Click `Register application`
       - Copy the `Client ID` and `Client Secret` to your `.env.local` file:

         ```text
         AUTH_GITHUB_ID=<Client ID>
         AUTH_GITHUB_SECRET=<Client Secret>
         ```

         Before copying the Clinet Secret, you may need to click on `Generate a new client secret` first.

         Note that in NextAuth v5, the prefix `AUTH_` is required for the env variables.

         Note that you do not have to add those keys to `src/lib/env/private.ts` since they are automatically handled by NextAuth.

    3. Add `AUTH_SECRET` to `.env.local`:

       ```text
       AUTH_SECRET=any-random-string
       ```

