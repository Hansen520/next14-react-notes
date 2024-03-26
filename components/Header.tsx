/*
 * @Date: 2024-01-29 16:38:04
 * @Description: description
 */
import { signIn, signOut, auth } from "auth";
import Link from 'next/link'

function SignIn({ provider, ...props }: { provider?: any }) {
  return (
    <form
      action={async () => {
        "use server";
        await signIn(provider);
      }}
    >
      <button style={{ border: 'none', cursor: 'pointer' }} {...props}>登录</button>
    </form>
  );
}

function SignOut(props: any) {
  return (
    <form
      action={async () => {
        "use server";
        await signOut();
      }}
    >
      <button style={{ border: 'none', cursor: 'pointer' }} {...props}>退出</button>
    </form>
  );
}

export default async function Header() {
  const session = await auth();
  console.log(session, 35);
  return (
    <header style={{ display: "flex", justifyContent: "space-between", padding: '0 40px 0 18px', background: 'var(--gray-10)', height: '30px', borderBottom: '1px solid #e4e6eb' }}>
      <Link href="/">微风吹皱了湖面，波光粼粼，风景宜人</Link>
      {session?.user ? (
        <span style={{ display: "flex", alignItems: "center" }}>
          {session?.user.name}
          <SignOut  />
        </span>
      ) : (
        <SignIn  />
      )}
    </header>
  );
}
