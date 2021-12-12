<img src="public/logo.png" width="300px">
<br>

## Getting Started

This project is built with [Contentful](https://www.contentful.com), [Next.js](https://nextjs.org/), [Tailwind CSS](https://tailwindcss.com/) & [Typescript](https://www.typescriptlang.org/).

### System Requirements

- [Node.js 14.15.0](https://nodejs.org/) or later

### Setup

1. Install `nvm`

Follow nvm setup instructions [here](https://github.com/nvm-sh/nvm/blob/master/README.md).

2. Install Node.js locally

```
nvm install 14.15.0
nvm use 14.15.0
```

3. Install `yarn`

```
npm install yarn -g
```

4. Install dependencies

```
yarn install
```

5. Signup for a free [Contentful](https://www.contentful.com/) account and create an organisation and within that create a space.

   We called our organization **Oxen** and the space **Website**.

   - For the site to build correctly you need to import our Content models and assets into your Contentful space. We have created some example content so you can get comfortable with our Contentful setup.

     **NOTE: Not all pages will load correctly because our Content is stored on Contentful.**

   - Add your `space ID` and `content management token` inside of [contentful/config.json](contentful/config.json)

   - Run this command inside the root of this project

   ```
     npx contentful space import --config contentful/config.json
   ```

   - For more information about importing/exporting in Contentful see [here](https://www.contentful.com/developers/docs/tutorials/cli/import-and-export/).

6. Setup your environment file. See our [.env.example](.env.example) as a guide. Make sure to call the file `.env.local`.
   - You can leave the [Campaign Monitor](https://www.campaignmonitor.com/) keys empty unless you are interested in how we handle mailing list subscriptions.

## Developing

- For accessbility testing we use the [axe-react](https://github.com/dequelabs/axe-core-npm/blob/develop/packages/react/README.md) plugin.
- We use the [Headwind](https://github.com/heybourn/headwind) VSCode extension for sorting TailwindCSS classes.
- We use [classnames](https://www.npmjs.com/package/classnames) to organise our classes into groups that combine at build time.

If you are new to Next.js, this is a helpful introduction: https://nextjs.org/docs

Now you can run the development server:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the Session homepage.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

### Contentful

- Use the `Link Preview` and `Media` content models for embedding content into blog posts.
- If linking content that is on the site itself try to omit omit https://getsession.org.
  e.g. `https://getsession.org/blog/onion-requests-session-new-message-routing-solution/` => `/blog/onion-requests-session-new-message-routing-solution/`.
- To use <sup>superscript</sup>, <sub>subscript</sub>, ~~strikethroughs~~ or <span style="background-color: #3a3a3a; color: white;">style</span> <span style="color: #00f782;">text</span> use the `Markup` content model.

### Next.js

- Try to use the [next/image](https://nextjs.org/docs/api-reference/next/image) component in place of `img` tags where possible.
- If you want to make a link to a location on the website use the [next/link](https://nextjs.org/docs/api-reference/next/link) component with a relative path. i.e. `https://getsession.org/blog -> /blog`

### TailwindCSS

#### Class organisation

This helps with readability and is encouraged. Consider it to be a guideline and not a set of rules.

##### React Component

```
  <div className={classNames(
    "general classes here - colors, fonts, padding, margin etc",
    "responsive class changes should have it's own string md: lg: etc."
    "placeholder classes",
    "animations, transforms, effect",
    "pseudo classes i.e hover, focus, active, etc.",
    "toggling classes i.e. NavMenu isExpanded"
  )}></div>
```

##### Custom CSS Class

```
.custom-class {
  @apply general classes here - colors, fonts, padding, margin etc;
  @apply responsive class changes should have it's own string md: lg: etc.;
  @apply placeholder classes;
  @apply animations, transforms, effect;
  @apply pseudo classes i.e hover, focus, active, etc.;
  @apply toggling classes i.e. NavMenu isExpanded;
}
```

#### Issues with Tailwind

We can't use template literals with classes if we want to purge (shrink) the CSS files at build time.

```
<div className="hover:bg-black hover:text-${bgColor}"></div> // Won't work in production
```

- https://github.com/tailwindlabs/tailwindcss/issues/2209#issuecomment-677855297
- https://tailwindcss.com/docs/optimizing-for-production#writing-purgeable-html

## Deploying to Production

You can run the project in a production environment by running:

```
yarn run build && yarn run start
```

**Make sure to do this locally and check for errors before pushing any code changes to your hosted repository**

Any changes made on Contentful will be reflected on the production server **hourly**.

If you want to see your Contentful changes faster while using a production server you can use the Staging Environement.

### Staging Environment

You can test the project in a staging environment by running:

```
yarn run build:staging && yarn run start:staging
```

Staging environments are password protected using the password you assign to `STAGING_SECRET` in `.env.local`.

To unlock the staging environment go to [http://localhost:3000/login?secret=YOUR_PASSWORD_HERE](http://localhost:3000/login?secret=YOUR_PASSWORD_HERE)

System environment variables and page metadata will also be updated to show it's a staging website.

Any changes made on Contentful will be reflected on the staging server **every 30 seconds**.

## License

Distributed under the GNU GPLv3 License. See [LICENSE](LICENSE) for more information.
