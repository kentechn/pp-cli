---
layout: default
title: ルール・制約
---

# ルール・制約

## ⚠️ 重要: ファイル構造の厳守

`pp`コマンドを使用する場合は、以下を厳守してください。

## 許可される操作

### ✅ 変更OK

- **ファイル名変更**: `a1b2c3d4e5.md` → `my-article.md`
- **画像ファイル追加**: 同階層に配置
- **記事内容編集**: Markdownファイルの自由編集
- **手動Git操作**: 通常のcommit/push

### ✅ 推奨される構造

```
/posts/username/a1b2c3d4e5/
├── my-article.md      # ファイル名変更OK
├── meta.json          # メタデータ
├── screenshot.png     # 画像ファイル
└── diagram.svg        # 画像ファイル
```

## 禁止される操作

### ❌ 変更NG

- **フォルダ名変更**: `a1b2c3d4e5/` → `my-folder/`
- **フォルダ移動**: `user1/hash/` → `user2/hash/`
- **meta.json削除**: メタデータファイルの削除

### ❌ 禁止される構造

```
/posts/
├── user1/
│   └── my-folder/        # ❌ フォルダ名変更
└── user2/
    └── a1b2c3d4e5/       # ❌ 他ユーザーへ移動
```

## 権限管理

### ユーザー別フォルダ

```
/posts/
├── john/          # john@example.com → johnフォルダ
├── alice/         # alice@company.com → aliceフォルダ
└── bob/           # bob.smith@org.jp → bob.smithフォルダ
```

### アクセス制御

- **自分のフォルダ**: 自由に操作可能
- **他人のフォルダ**: 操作不可
- **GitHub Actions**: 全体をチェック

## ファイル命名規則

### ハッシュ生成

```javascript
// 生成ルール
const email = "user@example.com";       // Git設定から取得
const timestamp = Date.now();           // Unix timestamp
const input = `${email}${timestamp}`;   // 結合
const hash = crypto.createHash('md5')
  .update(input)
  .digest('hex')
  .substring(0, 10);                    // 先頭10文字
```

### フォルダ構造

```
/posts/{username}/{hash}/
├── {hash}.md     # 初期ファイル名（変更可能）
├── meta.json     # メタデータ（変更禁止）
└── *.*           # その他ファイル（自由）
```

## エラーと対処法

### 権限エラー

```bash
❌ エラー: 権限がありません。user1フォルダのみ操作可能です
```

**原因**: 他ユーザーのフォルダを操作しようとした  
**対処**: 自分のフォルダのみ操作する

### 構造エラー

```bash
❌ エラー: フォルダ名が変更されています
```

**原因**: ハッシュフォルダ名を変更した  
**対処**: 元のフォルダ名に戻すか、手動Git操作に切り替え

### 設定エラー

```bash
❌ エラー: git config user.email が設定されていません
```

**原因**: Git設定が不完全  
**対処**: `git config --global user.email "your@email.com"`

## GitHub Actions チェック

### 自動チェック項目

1. **権限チェック**: PRの作成者と変更パスの整合性
2. **構造チェック**: ファイル・フォルダ名の妥当性
3. **内容チェック**: Markdown形式、meta.json形式
4. **リンクチェック**: 画像ファイル存在確認

### チェック失敗例

```yaml
❌ PR Check Failed
user1さんは /docs/user2/ フォルダを変更する権限がありません。
変更可能なパス: /docs/user1/
```

## 運用ガイドライン

### 推奨ワークフロー

1. **記事作成**: `pp init` でベース作成
2. **内容編集**: ファイル名変更・画像追加・記事執筆
3. **PR作成**: `pp pr` で投稿
4. **自動マージ**: GitHub Actionsで自動処理

### 避けるべきパターン

- フォルダ名の手動変更
- 他ユーザーフォルダへの干渉  
- meta.jsonの直接削除
- 複数人での同一記事編集

**ルール違反時は手動Git操作での運用になります。**