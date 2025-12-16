import React, { useState } from "react";
import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import AuthLayout from '@/layouts/auth-layout';
import { register } from '@/routes';
import { store } from '@/routes/login';
import { request } from '@/routes/password';
import { Form, Head } from '@inertiajs/react';
import { FaEye, FaEyeSlash } from "react-icons/fa6";

const ImageSignin = '/assets/AboutImage.jpg'; 
const Logo = '/logo/footer-logo.svg'; 

interface LoginProps {
    status?: string;
    canResetPassword: boolean;
    canRegister: boolean;
}

export default function Login({
    status,
    canResetPassword,
    canRegister,
}: LoginProps) {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="container-fluid mx-auto ">
            <div className="row min-h-screen flex flex-wrap md:p-0 p-10">
                {/* Left side with image */}
                <div className="col-6 hidden md:block md:w-[50%]">
                    <img 
                        src={ImageSignin} 
                        className="h-full w-full object-cover" 
                        alt="Login background"
                    />
                </div>

                {/* Right side with form */}
                <div className="col-6 flex flex-col flex-1 justify-center items-center">
                    <div className="flex flex-col justify-center w-full max-w-md mx-auto">
                        {/* Logo */}
                        <img 
                            src={Logo} 
                            className="object-contain h-48 pb-10" 
                            alt="Atrix IT Solutions Logo"
                        />

                        {/* Welcome text */}
                        <div className="flex justify-center pb-10">
                            <h3 className="text-[28px] font-extrabold text-center">
                                Welcome to Atrix IT Solutions
                            </h3>
                        </div>

                        {/* Status message */}
                        {status && (
                            <div className="mb-4 p-3 bg-green-100 text-green-700 rounded">
                                {status}
                            </div>
                        )}

                        <Head title="Log in" />

                        <Form
                            {...store.form()}
                            resetOnSuccess={['password']}
                            className="space-y-6"
                        >
                            {({ processing, errors }) => (
                                <>
                                    {/* Email field */}
                                    <div>
                                        <Label htmlFor="email" className="mb-2 block">
                                            Email <span className="text-error-500">*</span>
                                        </Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            name="email"
                                            required
                                            autoFocus
                                            autoComplete="email"
                                            placeholder="info@gmail.com"
                                            className="w-full"
                                        />
                                        <InputError message={errors.email} />
                                    </div>

                                    {/* Password field */}
                                    <div>
                                        <div className="flex items-center mb-2">
                                            <Label htmlFor="password">
                                                Password <span className="text-error-500">*</span>
                                            </Label>
                                            {canResetPassword && (
                                                <TextLink
                                                    href={request()}
                                                    className="ml-auto text-sm"
                                                >
                                                    Forgot password?
                                                </TextLink>
                                            )}
                                        </div>
                                        <div className="relative">
                                            <Input
                                                id="password"
                                                type={showPassword ? "text" : "password"}
                                                name="password"
                                                required
                                                autoComplete="current-password"
                                                placeholder="Enter your password"
                                                className="w-full pr-10"
                                            />
                                            <span
                                                onClick={() => setShowPassword(!showPassword)}
                                                className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2"
                                            >
                                                {showPassword ? (
                                                    <FaEye className="fill-gray-400 size-5" />
                                                ) : (
                                                    <FaEyeSlash className="fill-gray-400 size-5" />
                                                )}
                                            </span>
                                        </div>
                                        <InputError message={errors.password} />
                                    </div>

                                    {/* Remember me checkbox */}
                                    <div className="flex items-center space-x-3">
                                        <Checkbox
                                            id="remember"
                                            name="remember"
                                        />
                                        <Label htmlFor="remember" className="cursor-pointer">
                                            Remember me
                                        </Label>
                                    </div>

                                    {/* Login button */}
                                    <div className="mt-10">
                                        <Button
                                            type="submit"
                                            className="w-full gradient-button"
                                            disabled={processing}
                                        >
                                            {processing ? (
                                                <>
                                                    <Spinner className="mr-2" />
                                                    Logging in...
                                                </>
                                            ) : (
                                                "Log in"
                                            )}
                                        </Button>
                                    </div>

                                    {/* Sign up link */}
                                    {canRegister && (
                                        <div className="text-center text-sm text-muted-foreground pt-4">
                                            Don't have an account?{' '}
                                            <TextLink 
                                                href={register()} 
                                                className="text-primary hover:underline"
                                            >
                                                Sign up
                                            </TextLink>
                                        </div>
                                    )}
                                </>
                            )}
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    );
}