---
layout: default
title: コマンドリファレンス
---

# コマンドリファレンス

## pp init

記事ファイル一式を作成します。

### 使い方

```bash
# タイトル指定
pp init -t "記事タイトル"
pp init --title "記事タイトル"

# 対話形式
pp init
```

### 動作

1. ユーザー名+タイムスタンプからハッシュ値を生成
2. `/docs/username/hash/` フォルダを作成
3. `hash.md` と `meta.json` を生成
4. 新しいブランチ `article/hash` を作成
5. 初回コミットを実行

### 生成されるファイル

- `{hash}.md` - Markdown記事
- `meta.json` - メタデータ

---

## pp update

記事のメタデータを更新します。

### 使い方

```bash
# タイトル更新
pp update --title "新しいタイトル"

# タグ更新
pp update --tags "react,typescript,nextjs"

# 複数同時更新
pp update --title "新タイトル" --tags "react,typescript"

# 対話形式
pp update
```

### 注意

- 記事フォルダ内で実行してください
- 更新後は `pp pr` でPR作成が必要です

---

## pp pr

Pull Requestを作成します。

### 使い方

```bash
pp pr
```

### 動作

1. 現在のブランチの変更をプッシュ
2. GitHub APIでPRを作成
3. GitHub Actionsが自動実行
4. チェック通過後、自動マージ

### 表示される情報

```bash
✅ PR作成完了

• GitHub Actionsが自動チェックを実行中...
• 全チェック通過後、自動マージされます
• PR: https://github.com/user/repo/pull/123
```

---

## pp delete

記事を削除します（自動PR作成）。

### 使い方

```bash
# ハッシュ指定で削除
pp delete a1b2c3d4e5

# 現在のフォルダの記事を削除
pp delete .
```

### 動作

1. 確認プロンプト表示
2. ファイル・フォルダを削除
3. 削除コミットを作成
4. 自動プッシュ・PR作成
5. 即座に自動マージ

### 確認プロンプト

```bash
記事 'ReactでTodoアプリを作ってみた' を削除しますか？ (y/N)
```

---

## エラーハンドリング

### 権限エラー

```bash
❌ エラー: 権限がありません。user1フォルダのみ操作可能です
```

### ファイル構造エラー

```bash
❌ エラー: 記事フォルダ内で実行してください
❌ エラー: フォルダ名が変更されています
```

### Git設定エラー

```bash
❌ エラー: git config user.email が設定されていません
```

---

## オプション

### 共通オプション

- `--help, -h` - ヘルプ表示
- `--version, -v` - バージョン表示

### initオプション

- `--title, -t` - 記事タイトル指定

### updateオプション

- `--title` - タイトル更新
- `--tags` - タグ更新（カンマ区切り）