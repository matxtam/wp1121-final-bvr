# Develop flow

### 下載到本機

1. `git clone https://github.com/matxtam/wp1121-final-bvr.git`

### 開branch

1. VScode 左下角會顯示你現在的位置，按下後可跳出create new branch
2. 輸入branch name - 統一格式:name\_[實作功能或檔案] (ex: amy_gameTime-setup)
3. enter 後應該會自動切過去新建的branch
4. 確定branch status
   -use `git remote -v` should show

```bash
origin  https://github.com/matxtam/wp1121-final-bvr.git (fetch)
origin  https://github.com/matxtam/wp1121-final-bvr.git (push)
```

### Update and switch branch

1. If you are on main locally
   use `git pull`
2. You are on other branch:

```bash
git checkout main
git pull
git checkout yourBranch
git merge origin
```

### push branch

```bash
git add .
git commit -m ‘commit message’
git push -u origin <branch-name>
```

然後去gitHub上的brach頁面應該可以看到
如果確定沒問題可以自己把自己的PR merge進去 (gitHub會有自動檢查有無conflict的功能)

### install package for login/logout
```bash
npm i bcryptjs
yarn add next-auth@beta
```
