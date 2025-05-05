import { SignIn } from '@clerk/nextjs'

export default function SignInPage() {
  return (
    <div className='flex min-h-screen'>
      {/* Left Background Image (hidden on small/medium) */}
      <div
        className='hidden lg:block lg:w-3/2 bg-cover bg-center'
        style={{ backgroundImage: "url('/assets/sign-in-image.jpg')" }} // Replace with your actual image path
      ></div>

      {/* Right SignIn Form */}
      <div className='w-full lg:w-1/2 flex items-center justify-center p-6'>
        <SignIn />
      </div>
    </div>
  )
}
