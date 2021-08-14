# Watch Store 購物車電商網站

使用 Nuxt2 及 Nuxt Composition API 串接 Firebase Database、Auth REST API，透過 pm2 及 nginx 將網站架設在 Google GCP 上

## Website
- GCP  
  http://34.80.229.168
- Heroku (Backup)  
  https://kenge-watch-store.herokuapp.com

## Skill
Nuxt2、Nuxt Composition API、Tailwind CSS、Firebase

## Mockup  
https://reurl.cc/dGV2M6

## 手動部署流程
```
git push -u origin master
ssh -i ~/.ssh/gcp pgkusntwo@34.80.229.168
cd /home/pgkusntwo/watch-store-nuxt/
git pull
npm run build
pm2 reload <id>
```
