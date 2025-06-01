# 🐕 PP CLI

GitHubリポジトリでブログ記事を効率的に管理するCLIツール

## ✨ 特徴

- **簡単な記事作成**: `pp init` で記事ファイル一式を自動生成
- **自動化されたワークフロー**: PR作成からマージまで自動化
- **権限管理**: ユーザー別フォルダで安全な共同管理
- **画像管理**: 記事と同階層で画像ファイルを簡単管理

## 📖 ドキュメント

**完全なドキュメントは GitHub Pages で公開中:**

### 🌐 [https://kentechn.github.io/pp-cli](https://kentechn.github.io/pp-cli)

- [使い方ガイド](https://kentechn.github.io/pp-cli/getting-started)
- [コマンドリファレンス](https://kentechn.github.io/pp-cli/prairie-post/commands)  
- [ルール・制約](https://kentechn.github.io/pp-cli/rules)

## 🚀 クイックスタート

```bash
# インストール
npm install -g prairie-post

# 新しい記事を作成
pp init -t "ReactでTodoアプリを作ってみた"

# PR作成
pp pr
```

## 📋 コマンド一覧

```bash
pp init                    # 記事作成
pp update                  # メタデータ更新
pp pr                      # PR作成
pp delete {hash|.}         # 記事削除
```

## 📁 フォルダ構造

```
/docs/
└── {username}/           # git config user.email の@より前
    └── {hash}/          # 10文字のMD5ハッシュ値
        ├── {hash}.md    # Markdown記事（ファイル名変更OK）
        ├── meta.json    # メタデータ
        └── *.png        # 画像ファイル（同階層）
```

## 📝 生成されるファイル

### meta.json
```json
{
  "title": "記事タイトル",
  "tags": []
}
```

### Markdown記事
```markdown
# 記事タイトル

![画像](./screenshot.png)

記事本文...
```

## 🔄 ワークフロー

### 記事作成フロー
1. **記事作成**: `pp init` でローカルに記事ファイルを生成
2. **記事編集**: 生成されたMarkdownファイルや画像を追加
3. **PR作成**: `pp pr` でPull Requestを作成
4. **自動チェック**: GitHub Actionsで品質・権限チェック
5. **自動マージ**: 全チェック通過で自動マージ

### 記事更新フロー
1. **メタデータ更新**: `pp update` または手動でmeta.json編集
2. **記事編集**: Markdownファイルを編集（必要に応じて）
3. **PR作成**: `pp pr` でPull Requestを作成
4. **自動マージ**: GitHub Actionsチェック後、自動マージ

### 記事削除フロー
1. **記事削除**: `pp delete` で即座に削除・PR作成・自動マージ

## ⚠️ 重要: ファイル構造の厳守

`pp`コマンドを使用する場合は、以下を厳守してください：

- **フォルダ名（ハッシュ値）**: 変更禁止 ❌
- **ファイル名**: 変更OK ✅ 
- **画像ファイル**: 同階層に配置 ✅
- **他ユーザーフォルダ**: 移動禁止 ❌

**違反した場合、ppコマンドは使用できません。**  
手動でのGit操作は引き続き可能です。

## 📋 コマンド一覧

```bash
pp init                    # 記事作成（ローカルコミットまで）
pp update                  # メタデータ更新（ローカルコミットまで） 
pp pr                      # PR作成
pp delete {hash}           # 指定記事を削除 + 自動PR
pp delete .                # 現在フォルダの記事を削除 + 自動PR
```

## 📦 開発

### セットアップ
```bash
git clone https://github.com/yourusername/prairie-post.git
cd prairie-post
npm install
npm run build
```

### 開発用コマンド
```bash
npm run dev     # 開発モード
npm run build   # ビルド
npm run test    # テスト実行
```

## 🤝 コントリビュート

Issues、Pull Requestsお待ちしています！

## 📄 ライセンス

MIT

---

Made with ❤️ by プレーリードッグ for efficient blog management