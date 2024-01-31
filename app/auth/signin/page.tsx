"use client";
import { useEffect, useState } from "react";
export default function SignIn() {
  const [csrfToken, setCsrfToken] = useState<any>();
  useEffect(() => {
    (async () => {
      const response = await fetch("http://localhost:3000/api/auth/csrf");
      const { csrfToken } = await response.json();
      console.log(csrfToken, 17);
      setCsrfToken(csrfToken);
    })();
  }, []);

  return (
    <form method="post" action="http://localhost:3000/api/auth/callback/credentials">
      <input type="hidden" name="csrfToken" value={csrfToken || ''} />
      <label>
        Username
        <input name="username" type="text" />
      </label>
      <label>
        Password
        <input name="password" type="password" />
      </label>
      <button type="submit">Sign in</button>
    </form>
  );
}
