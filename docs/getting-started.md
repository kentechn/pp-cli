---
layout: default
title: 使い方ガイド
---

# 使い方ガイド

## 前提条件

- **Node.js**: v18以降
- **Git**: インストール済み
- **GitHub CLI**: 認証設定済み（推奨）

## インストール

```bash
npm install -g pp-cli
```

## 基本的な使い方

### 1. 記事作成

```bash
# タイトル指定で作成
pp init -t "ReactでTodoアプリを作ってみた"

# または対話形式で作成
pp init
```

**生成されるファイル:**
```
/posts/username/a1b2c3d4e5/
├── a1b2c3d4e5.md    # Markdown記事
└── meta.json        # メタデータ
```

### 2. 記事編集

```bash
# 記事本文を編集
vim posts/username/a1b2c3d4e5/a1b2c3d4e5.md

# 画像を追加（同階層に配置）
cp screenshot.png posts/username/a1b2c3d4e5/

# メタデータを更新
pp update --title "新しいタイトル" --tags "react,typescript"
```

### 3. PR作成

```bash
pp pr
```

記事がGitHub Actionsでチェックされ、問題なければ自動マージされます。

### 4. 記事削除

```bash
# ハッシュ指定で削除
pp delete a1b2c3d4e5

# 現在のフォルダの記事を削除
pp delete .
```

削除時は自動的にPRが作成され、即座にマージされます。

## フォルダ構造

```
/posts/
└── username/             # git config user.email の@より前
    └── a1b2c3d4e5/      # 10文字のMD5ハッシュ
        ├── a1b2c3d4e5.md # Markdown記事（ファイル名変更OK）
        ├── meta.json     # メタデータ
        └── *.png         # 画像ファイル（同階層）
```

## 生成されるファイル例

**meta.json:**
```json
{
  "title": "ReactでTodoアプリを作ってみた",
  "tags": ["react", "typescript"]
}
```

**Markdown記事:**
```markdown
# ReactでTodoアプリを作ってみた

![スクリーンショット](./screenshot.png)

記事本文...
```

## トラブルシューティング

### よくあるエラー

**権限エラー:**
```bash
❌ エラー: user1フォルダのみ操作可能です
```
→ 他ユーザーのフォルダを操作しようとしています

**ファイル構造エラー:**
```bash
❌ エラー: フォルダ名を変更した場合はppコマンドは使用できません
```
→ ハッシュフォルダ名が変更されています

詳しくは[ルール・制約](./rules)をご確認ください。