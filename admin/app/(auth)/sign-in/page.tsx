// import LoginForm from "@/components/loginForm";
// import { Link } from "lucide-react";
// import React from "react";

// const SingIn = () => {
//   return (
//     <div>
//       <LoginForm />
//       <div className="mt-4 text-center">
//         <p>
//           Don&apos;t have an account?
//           <Link href="/register" className="text-blue-500 hover:underline">
//             Create one
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default SingIn;
import { SignIn } from "@clerk/nextjs";

const LoginPage = () => {
  return <SignIn />;
};

export default LoginPage;
