# 機械羊製造所 — CREATOR PAGE

Virtual Creator Community のクリエイター一覧ページです。

## フォルダ構成

```
kikaihitsuji/
├── index.html          # エントリーHTML
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── README.md
└── src/
    ├── main.jsx        # Reactエントリー
    ├── index.css       # Tailwindベース + グローバルスタイル
    ├── App.jsx         # メインコンポーネント（全ロジック）
    └── images.js       # base64画像 (自動生成、gitignore推奨)
```

## セットアップ

```bash
npm install
npm run dev       # 開発サーバー起動
npm run build     # dist/ にビルド
```

## GitHub Pages へのデプロイ

```bash
npm run build
# dist/ フォルダの中身を gh-pages ブランチにプッシュ
```

または `vite.config.js` の `base` を GitHub Pages のパスに合わせてください:

```js
base: '/リポジトリ名/',
```

## 画像の差し替え

`src/images.js` 内の各変数の `data:image/jpeg;base64,...` 部分を
ファイルパスの import に変更することでファイルサイズを削減できます:

```js
// images.js を使わず App.jsx 内で直接インポート
import imgHeroEli from '../public/images/hero_eli.jpg'
```

## クリエイターデータ

`src/App.jsx` の `MEMBERS` / `SUBMEMBERS` / `SUPPORT` 配列を編集してください。
各クリエイターの `nameStyle` プロパティでフォントを個別指定しています。
