# CLAUDE.md

このファイルは、Claude Code (claude.ai/code) がこのリポジトリで作業する際のガイダンスを提供します。

## プロジェクト概要

PP CLI (Prairie Post CLI) は、GitHubリポジトリでブログ記事を管理するためのTypeScriptベースのコマンドラインツールです。記事は特定のフォルダ構造（`/posts/{username}/{hash}/`）に保存され、GitHub Actionsを使用した自動PR作成・マージのワークフローを採用しています。

詳細な機能と使用方法については、[README.md](./README.md) を参照してください。

## 開発コマンド

現在、プロジェクトは初期開発段階にあり、package.jsonには以下のみ定義されています：

```bash
npm test           # 現在はエラーで終了（テスト未実装）
npm install        # 依存関係のインストール（TypeScript, ts-node, @types/node）
```

READMEに記載されている将来実装予定のコマンド：
```bash
npm run dev        # 開発モード
npm run build      # プロジェクトのビルド
```

## プロジェクト構造

```
/docs/              # ドキュメント（GitHub Pages）
  ├── index.md      # メインドキュメントページ
  ├── getting-started.md
  ├── command.md    # コマンドリファレンス
  └── rules.md      # ルールと制約

/src/               # ソースコードディレクトリ
  ├── index.ts      # CLIエントリーポイント
  ├── commands/     # CLIコマンドの実装
  │   ├── init.ts   # pp initコマンド
  │   ├── update.ts # pp updateコマンド
  │   ├── pr.ts     # pp prコマンド
  │   └── delete.ts # pp deleteコマンド
  ├── services/     # ビジネスロジック層
  │   ├── articleService.ts  # 記事の作成・更新・削除
  │   ├── gitService.ts      # Git操作のラッパー
  │   └── githubService.ts   # GitHub API操作
  ├── utils/        # ユーティリティ関数
  │   ├── logger.ts         # ログ出力
  │   ├── hashGenerator.ts  # ハッシュ生成
  │   ├── fileManager.ts    # ファイル操作
  │   └── exec.ts           # コマンド実行
  ├── types/        # TypeScript型定義
  │   └── index.ts  # 共通型定義
  └── config/       # 設定定数
      └── constants.ts # アプリケーション定数

package.json        # Node.jsプロジェクト設定
tsconfig.json       # TypeScript設定
README.md          # プロジェクトドキュメント
CLAUDE.md          # Claude Code用ガイダンス
.gitignore         # Gitの無視パターン
```

## アーキテクチャ設計

### レイヤー構成

1. **コマンド層 (`commands/`)**
   - Commander.jsを使用したCLIコマンドの定義
   - ユーザー入力の処理とバリデーション
   - サービス層の呼び出し

2. **サービス層 (`services/`)**
   - ビジネスロジックの実装
   - `articleService`: 記事の作成・更新・削除のロジック
   - `gitService`: Git操作のラッパー（add, commit, push等）
   - `githubService`: GitHub API操作（PR作成等）

3. **ユーティリティ層 (`utils/`)**
   - 共通機能の提供
   - ログ出力、ファイル操作、ハッシュ生成等
   - 再利用可能な汎用関数

4. **型定義 (`types/`)**
   - TypeScriptの型定義を集約
   - インターフェースと型エイリアスの管理

5. **設定 (`config/`)**
   - アプリケーション全体で使用する定数
   - 環境変数の管理（将来的に追加予定）

### 設計原則

- **単一責任の原則**: 各モジュールは単一の責任を持つ
- **依存性の注入**: テストしやすい設計
- **エラーハンドリング**: 適切なエラーメッセージとログ出力
- **非同期処理**: async/awaitを使用した統一的な非同期処理

## 主要なアーキテクチャ概念

1. **記事管理システム**：
   - 記事は `/posts/{username}/{hash}/` 構造で保存
   - 各記事は Markdownファイル、meta.json、画像で構成
   - ハッシュはユーザー名＋タイムスタンプから生成（10文字のMD5）

2. **権限モデル**：
   - ユーザーは自分のフォルダのみ変更可能（git emailベース）
   - フォルダ名（ハッシュ値）は変更不可
   - フォルダ内のファイル名は変更可能

3. **自動化ワークフロー**：
   - `pp init`: ローカルファイル作成とコミット
   - `pp pr`: GitHub Actionsチェック付きPR作成
   - `pp delete`: 即座にPR作成と自動マージ

4. **CLIコマンド**（実装予定）：
   - `pp init [-t "title"]`: 新規記事作成
   - `pp update [--title] [--tags]`: メタデータ更新
   - `pp pr`: プルリクエスト作成
   - `pp delete {hash|.}`: 記事削除

## 実装状況

- ドキュメント: 完成
- TypeScriptセットアップ: 設定済み
- ソースコード: 未実装
- テスト: 未実装
- ビルドシステム: 未設定
- CLIエントリーポイント: 未作成

## 重要な注意事項

- npmパッケージ名は "pp-cli" として公開予定
- GitHub Actions統合による自動PRチェックとマージを計画
- `/docs/coomand.md` のタイポは `command.md` にリネームすべき