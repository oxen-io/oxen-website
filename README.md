This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/zeit/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Setting up your environment

- Install NVM following the guide at nvm.sh
- Navigate to project directory
- Set your NVM version

  ```bash
  nvm install 14.15.0
  nvm use 14.15.0
  ```

- Install `yarn`
  ```bash
  npm i -g yarn
  ```

## Steps to Build to Production

- Make your local changes
- Build locally; ensure everything is working

  ```bash
  yarn build
  yarn start
  ```

- Commit and push your changes

  ```bash
      git add .
      git commit -m 'My changes'
      git push -u origin
  ```

- SSH into the box
  ```bash
  ssh root@116.203.145.108
  ```
- Navigate to the directory of the project
  ```bash
  cd /home/ubuntu/oxen.io/
  ```
- Pull changes

  ```bash
  git pull origin
  ```

- Build on the server

  ```bash
  yarn build
  ```

- Restart NGinx and PM2

  ```bash
  systemctl restart nginx && pm2 restart /home/ubuntu/ecosystem.config.js
  ```

---

## Notes

You can check the status of the server by running

```bash
pm2 status
```
