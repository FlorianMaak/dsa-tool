[![Build Status](https://travis-ci.com/FlorianMaak/dsa-tool.svg?token=9EGyLHNBeWuwkrWi79zz&branch=master)](https://travis-ci.com/FlorianMaak/dsa-tool)
[![Greenkeeper badge](https://badges.greenkeeper.io/FlorianMaak/dsa-tool.svg)](https://greenkeeper.io/)
[![Known Vulnerabilities](https://snyk.io/test/github/FlorianMaak/dsa-tool/badge.svg)](https://snyk.io/test/github/FlorianMaak/dsa-tool)

# DSA Tool

## Requirements
* nodeJS version >= 11

## Installation
Clone this repository via git or download the provided zip-file.
After checkout run ```npm install``` and [npm](https://www.npmjs.com/) will install all needed dependencies and creates a new build in ```/dist```-Folder.
Now you have to rename ```.env.dist``` to ```.env``` and provide all needed config-values.
After that's done, run ´´´npm run build``` to build the project on base of the env values given.
If finished run the start.sh file and the server starts serving the page on the provided port.

## Missing Feature or found a bug?
Just open an issue and describe your request as accurately as possible. If you like to script it on your own, feel free to fork this repository and open a Pull Request.

## Contribution
Feel free to fork this project. If you like to contribute, please use [git-flow](https://github.com/nvie/gitflow)
branch-style and follow the commits [conventions](https://github.com/FlorianMaak/dsa-tool/wiki/Conventions). If your work is done, please submit a
pull request. All contributions **must** be released under [GPLv3 licence](https://github.com/FlorianMaak/p0weruser/blob/master/LICENSE).

## [Dev] Installation
After checkout run ```npm install``` and [npm](https://www.npmjs.com/) will install all needed dependencies and creates a new build in ```/dist```-Folder.
Now you have to rename ```.env.dist``` to ```.env``` and provide all needed config-values.
Branch 'develop' set up to track remote branch 'develop' from 'origin'. After installation run
```npm run dev``` to start filewatchers, which are starting a new build after each filechange. 
