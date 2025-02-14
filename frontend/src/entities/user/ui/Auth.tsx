import styles from './Auth.module.scss'
import { Button } from '@/shared/ui/ui/button'

export const Auth = () => {
  // const transition = useTransition();

  // const [isLogin, setIsLogin] = useState(
  //   actionData && actionData?.fields?.action === "login"
  //     ? true
  //     : !actionData
  //     ? true
  //     : false
  // );

  // const usernameRef = useRef<HTMLInputElement>(null);
  // const passwordRef = useRef<HTMLInputElement>(null);

  // useEffect(() => {
  //   if (actionData?.errors?.username) {
  //     usernameRef.current?.focus();
  //   }
  //   if (actionData?.errors?.password) {
  //     passwordRef.current?.focus();
  //   }
  // }, [actionData]);

  // const isLoginning = transition.submission?.formData.get("action") === "login";
  // const isRegistering =
  //   transition.submission?.formData.get("action") === "register";
  // const submitLoginText = isLoginning ? "Signing in..." : "Sign in";
  // const submitRegisterText = isRegistering ? "Signing up..." : "Sign up";

  return (
    <div className="h-[100vh] p-8 flex flex-col items-center justify-center">
      <div className={styles.SignUp}>
        <Button variant={'primaryOutline'}>Sign up</Button>
      </div>
      <form action="/" method="POST" className="relative text-center w-[375px]">
        <h1 className="mt-3 mb-4" style={{ fontSize: '26px', fontWeight: 700 }}>
          Log in
        </h1>
        <div className="flex flex-col w-full">
          <input
            data-test="email-input"
            autocomplete="email"
            placeholder="Email or username"
            className="w-full py-2 px-[14px] mt-4"
            style={{
              caretColor: '#1cb0f6',
              color: '#4b4b4b',
              fontSize: '1.25rem',
              border: '2px solid #e5e5e5',
              background: '#f7f7f7',
              borderRadius: '12px',
              overflow: 'hidden'
            }}
            id="web-ui16"
            type="text"
            value=""
          />
          <input
            data-test="password-input"
            autocomplete="current-password"
            placeholder="Password"
            className="w-full py-2 px-[14px] mt-4"
            style={{
              caretColor: '#1cb0f6',
              color: '#4b4b4b',
              fontSize: '1.25rem',
              border: '2px solid #e5e5e5',
              background: '#f7f7f7',
              borderRadius: '12px',
              overflow: 'hidden'
            }}
            id="web-ui17"
            type="password"
            value=""
          />
        </div>
        <Button variant={'primary'} className="w-full text-white mt-5">
          LOG IN
        </Button>
      </form>
    </div>
  )
}
