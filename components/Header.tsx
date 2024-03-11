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
      <button {...props}>Sign In</button>
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
      <button {...props}>Sign Out</button>
    </form>
  );
}

export default async function Header() {
  const session = await auth();
  console.log(session, 35);
  return (
    <header style={{ display: "flex", justifyContent: "space-around" }}>
      <Link href="/client">Client Side Component</Link>
      {session?.user ? (
        <span style={{ display: "flex", alignItems: "center" }}>
          {session?.user.name}
          <SignOut />
        </span>
      ) : (
        <SignIn />
      )}
    </header>
  );
}