# XIXI Folk Atelier / 囍囍民俗手作

中英双语手工民俗产品网站，可直接上传到 GitHub，并通过 GitHub Pages 免费发布。

## 已包含的功能

- 中文 / English 一键切换
- 商品分类筛选
- 加入购物袋、移除商品及小计
- 品牌故事、手作志和邮件订阅界面
- 手机、平板和电脑响应式布局
- GitHub Pages 自动发布配置
- 可部署到 Vercel、Cloudflare Pages 或任意静态主机

> 当前商品名称、价格和图片仍是示意内容；购物袋在浏览器中运行，但尚未连接真实支付、订单、库存或邮件服务。

## 最简单的 GitHub 发布方法

1. 解压下载的 ZIP。
2. 登录 GitHub，点击 **New repository**，仓库名称可填写 `chenxixi-folk-atelier`。
3. 进入新仓库，点击 **Add file → Upload files**。
4. 将解压后 `chenxixi-folk-atelier` 文件夹里面的全部内容拖入上传区，然后提交。
5. 打开仓库的 **Settings → Pages**。
6. 在 **Build and deployment → Source** 中选择 **GitHub Actions**。
7. 等待仓库顶部 **Actions** 中的发布任务完成。

发布完成后，网址通常是：

```text
https://你的GitHub用户名.github.io/chenxixi-folk-atelier/
```

## 在电脑上预览

需要先安装 Node.js 22 或更新版本，然后在项目目录运行：

```bash
npm install
npm run dev
```

浏览器打开终端显示的本地网址即可。

正式打包：

```bash
npm run build
```

生成的 `dist/` 文件夹可以直接上传到普通静态网站主机。

## 替换成自己的商品

商品资料都集中在：

```text
src/App.tsx
```

搜索 `const products = [`，每件商品包含：

- `zh`：中文名称
- `en`：英文名称
- `zhMeta` / `enMeta`：中英文材质说明
- `price`：欧元价格，只填写数字
- `category`：`textile`、`clay` 或 `fiber`
- `image`：商品图片路径
- `badgeZh` / `badgeEn`：商品角标

将自己的图片放入：

```text
public/images/
```

然后把商品的 `image` 改成对应文件名，例如：

```ts
image: "images/my-product.jpg",
```

建议商品图使用竖版 4:5，单张压缩到 500 KB–1.5 MB，以兼顾画质和加载速度。

## 修改文字和品牌信息

- 中英文网站文案：`src/App.tsx` 中的 `ui` 对象
- 品牌名和页面标题：`index.html`
- 颜色、字体和版式：`src/styles.css`
- 网站图标：`public/favicon.svg`

## 绑定自己的域名

GitHub Pages 发布成功后，进入 **Settings → Pages → Custom domain**，填写域名，例如 `www.yourbrand.com`，再根据 GitHub 显示的提示到域名服务商添加 DNS 记录。

GitHub Pages 在中国大陆的访问速度和稳定性不作保证。如果中国大陆用户很重要，可以用同一份 `dist/` 部署到香港服务器或符合备案要求的中国大陆静态托管服务。

## 接入真实销售功能

这个版本适合作为店铺前台。正式收款前还需要接入：

- Stripe、Shopify Checkout 或其他收款服务
- 真实库存与订单系统
- 运费、配送地区及退换货规则
- 隐私政策、Cookie 说明及欧洲消费者条款
- 邮件订阅服务

## Project structure

```text
.
├── .github/workflows/deploy-pages.yml  # GitHub Pages 自动发布
├── public/                             # 图片和图标
├── src/App.tsx                         # 商品、双语内容和页面功能
├── src/main.tsx                        # 网站入口
├── src/styles.css                      # 全部视觉样式
├── index.html                          # 页面标题和描述
├── package.json                        # 项目依赖与运行命令
└── vite.config.ts                      # 构建配置
```
