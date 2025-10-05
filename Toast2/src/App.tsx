import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProfiles } from './context/ProfileContext';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';


export default function LandingPage() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();
  const { signupName, setSignupName } = useProfiles();

  const handleSubmit = () => {
    // You can keep your form logic here if needed
    // signupName is already stored in context
    navigate('/dashboard');
  };

  return (
  <div className="min-h-screen flex items-center justify-center p-8 bg-gradient-to-br from-amber-100 via-orange-50 to-blue-200 font-[PP Fragment Text Regular]">
      <div className="w-full max-w-6xl flex flex-col lg:flex-row items-center justify-between gap-12">
        
        {/* Left Side - Branding */}
        <div className="flex-1 space-y-6 text-center lg:text-left">
          <h1 className="text-7xl font-bold text-[#28272E]">Toast</h1>
          <p className="text-xl leading-relaxed max-w-md text-[#28272E]">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </div>

        {/* Right Side - Login/Signup Card */}
        <div className="flex-1 w-full max-w-md">
          <Card className="border-0 shadow-xl rounded-[4rem] bg-[#FFFDF7]">
            <CardHeader className="space-y-1 pb-4">
              <div className="text-center mb-2">
                <span className="text-[#28272E] opacity-60">
                  {isSignUp ? "Already have an account? " : "Don't have an account? "}
                </span>
                <button
                  onClick={() => setIsSignUp(!isSignUp)}
                  className="font-medium transition-colors hover:opacity-80 text-[#6092B6]"
                >
                  {isSignUp ? "Sign In" : "Sign Up"}
                </button>
              </div>
            </CardHeader>
            
            <CardContent>
              <div className="space-y-6">
                {isSignUp && (
                  <div className="space-y-2">
                    <Label htmlFor="name" className="font-bold text-[#28272E] text-[1.3rem]">
                      Name
                    </Label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="Your name"
                      value={signupName}
                      onChange={(e) => setSignupName(e.target.value)}
                      className="border-0 rounded-2xl h-14 text-lg bg-white text-[#28272E]"
                    />
                  </div>
                )}
                <div className="space-y-2">
                  <Label htmlFor="email" className="font-bold text-[#28272E] text-[1.3rem]">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="toasttogether@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="border-0 rounded-2xl h-14 text-lg bg-white text-[#28272E]"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="font-bold text-[#28272E] text-[1.3rem]">
                    Password
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="toa$t1234"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="border-0 rounded-2xl h-14 text-lg bg-white text-[#28272E]"
                  />
                </div>

                {!isSignUp && (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="remember"
                        checked={rememberMe}
                        onCheckedChange={(checked) => setRememberMe(checked === true)}
                        className="border-[#28272E]"
                      />
                      <label
                        htmlFor="remember"
                        className="text-sm cursor-pointer text-[#28272E] opacity-70"
                      >
                        Remember me
                      </label>
                    </div>
                    <button
                      type="button"
                      className="text-sm transition-colors hover:opacity-80 text-[#6092B6]"
                    >
                      Forgot Password?
                    </button>
                  </div>
                )}

                <Button
                  onClick={handleSubmit}
                  className="w-full h-14 text-white text-xl font-medium rounded-3xl transition-colors hover:opacity-90 bg-[#6092B6]"
                >
                  {isSignUp ? "Sign Up" : "Sign In"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}