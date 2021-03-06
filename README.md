<h1 align="center">
  <br>
  <a href="#"><img src="./icon.png" alt="WebTorrent" width="200"></a>
  <br>
  Deployer
  <br>
  <br>
</h1>

<h4 align="center">Simple deployment tool, that works. <br />
Deploy your apps painlessly with GUI, no more vim's and ssh clients</h4>
<br />


![alt text](./screenshots/demo.png)


## Description
Deployer is built with Node.js, Vue.js and Github Electron. You can add servers and create jobs per repository you want to deploy to your server. 


### Features

- **Servers - Basic crud operations on Servers**
- **Jobs - Basic crud operations on Servers**
  - Job Desciption - Name your jobs
  - Source - Add repository from Github or Bitbucket
  - Build - Enter job build targte on server and apply post-build executive command (Like npm i, bower i, php artisan migrate, pm2 reload all and etc.)
  - Slack - Enter slack token and channel id to receive message after job is completed

<br />

### Installation
Download repo and install dependencies with

```bash
yarn install
```

### Usage
You must run vue with
```bash
npm run serve
```
And also is required to run node.js server by
```bash
npm run server
```

### Packaging and Distribution
    TODO

### Credits
App logo - [David Robertson](https://www.iconfinder.com/hooktraffic)

### Contribution
Contributions are more than


### License

MIT. Copyright (c) [Shalva Gegia](http://gegia.me).