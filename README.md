# Next.js Auth.js JWT Demo

このプロジェクトは、Next.jsとAuth.jsを使用したJWT認証のデモアプリケーションです。

## 認証フローの概要

### 1. ログインフロー
1. ユーザーが `/login` ページにアクセス
2. メールアドレスとパスワードを入力
3. フォーム送信時に `signIn()` 関数が呼び出される
4. Auth.jsの内部処理:
   - `authorize()` 関数でクレデンシャルを検証
   - 認証成功時にJWTトークンを生成
   - セッションにユーザー情報とトークンを保存
5. ダッシュボードページ（`/dashboard`）にリダイレクト

### 2. 認証状態の管理
- JWTトークンはブラウザのクッキーに保存
- `useSession()` フックで現在の認証状態を取得
- セッション情報には以下が含まれる:
  ```typescript
  {
    user: {
      email: string;
      token: string;
    }
  }
  ```

### 3. 保護されたルート
- `useSession()` フックを使用して認証状態をチェック
- 未認証ユーザーは自動的にログインページにリダイレクト
- 例: `/dashboard` は認証が必要なページ

### 4. ログアウトフロー
1. ユーザーがログアウトボタンをクリック
2. `signOut()` 関数が呼び出される
3. Auth.jsの内部処理:
   - セッションを破棄
   - JWTトークンを削除
4. ログインページにリダイレクト

## 実装の詳細

### NextAuth設定 (`/app/api/auth/[...nextauth]/route.ts`)
```typescript
export const authOptions: NextAuthOptions = {
  providers: [CredentialsProvider],
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token, user }) {
      // JWTトークンにユーザー情報を追加
    },
    async session({ session, token }) {
      // セッションにトークン情報を追加
    }
  }
}
```

### 認証状態の確認例 (`/app/dashboard/page.tsx`)
```typescript
const { data: session, status } = useSession();
useEffect(() => {
  if (status === 'unauthenticated') {
    router.push('/login');
  }
}, [status, router]);
```

## セキュリティ考慮事項

### 本番環境での実装時の注意点
1. **環境変数の管理**
   - `NEXTAUTH_SECRET`: 安全な乱数を使用
   - `NEXTAUTH_URL`: 正しい本番URLを設定

2. **認証ロジック**
   - 本デモではダミー認証を使用
   - 実際の実装では:
     - パスワードのハッシュ化
     - データベースでのユーザー検証
     - レート制限の実装

3. **JWTセキュリティ**
   - トークンの有効期限設定
   - 適切な署名アルゴリズムの使用
   - トークンの安全な保存

## テスト用アカウント
- Email: test@example.com
- Password: password

## 技術スタック
- Next.js 14
- Auth.js (NextAuth.js)
- TypeScript
- Tailwind CSS
