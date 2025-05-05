import { SignUp } from '@clerk/nextjs'

export default function SignUpPage() {
  return (
    <div className='flex min-h-screen'>
      {/* Left SignUp Form */}
      <div className='w-full lg:w-1/2 flex items-center justify-center p-6'>
        <SignUp />
      </div>

      {/* Right Background Image (hidden on small/medium) */}
      <div
        className='hidden lg:block lg:w-3/2 bg-cover bg-center'
        style={{ backgroundImage: "url('/assets/sign-up-image.jpg')" }} // Replace with your actual image path
      ></div>
    </div>
  )
}
