const fs = require('fs')
const path = require('path')


const newVersion = process.env.npm_package_version
const name = process.env.npm_package_name

const readmePath = path.join(__dirname, 'README.md')
let readmeContent = fs.readFileSync(readmePath, 'utf-8')

// 替换readme.md中的版本号图片
readmeContent = readmeContent.replace(
    /https:\/\/img.shields.io\/badge\/[^ )]+/, 
    `https://img.shields.io/badge/${name.replace('-', ' ')}-v${newVersion}-blue`
)

fs.writeFileSync(readmePath, readmeContent)
