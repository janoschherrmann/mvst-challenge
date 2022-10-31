This is a small demo applicaton as part of the MVST application process. The app allows you to search through the GitHub repositories of any GitHub user using a simple text search.

The live version is available at [https://mvst-challenge-phi.vercel.app/](https://mvst-challenge-phi.vercel.app/)

To start the project on your local machine, clone the project and run `npm install` while in the root directory of the project.

To run it, you need to either use the Vercel CLI or the regular NextJS build command.

### Using the Vercel CLI

The advantage of using the Vercel CLI is that you don't need a local `.env` file to run the project.

Using the Vercel CLI, just run `vercel login` to login to the Vercel account. After login in, you might be asked to link your local repository to a Vercel project. Once that's done, you can use `vercel dev` to run the project as a dev server. All necessary env variables will be loaded from Vercel automatically.

### Using NEXTJS build command

If you want to use the regular `next dev` or `npm run dev`, you'll need to create a `.env` file in the root of the cloned repository first. In there, add any env variables that the project needs. You can get them from the Vercel dashboard.

After that, you're good to go and you can start the project with `npm run dev`.
