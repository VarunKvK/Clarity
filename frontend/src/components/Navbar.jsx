'use client'

import { MenuIcon, UserCircle2 } from 'lucide-react';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import Dropmenu from './mini_components/Dropmenu';
import Profile from './mini_components/Avatar';

import { SignInButton, SignUpButton, useAuth } from '@clerk/nextjs';

const Navbar = () => {
    const { isSignedIn, isLoaded } = useAuth();
    const [userId, setUserId] = useState();
    const [loading, setLoading] = useState(true);
    const [user,setUser]=useState();

    useEffect(() => {
        if (isSignedIn) {
            const fetchData = async () => {
                try {
                    const response = await fetch("/api/user", {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                            Accept: "application/json",
                        },
                    });

                    if (!response.ok) {
                        throw new Error("Failed to fetch user data.");
                    }
                    const data = await response.json();
                    setUserId(data.user._id);
                    setUser(data.user);
                } catch (error) {
                    console.error("Error fetching user data:", error);
                } finally {
                    setLoading(false);
                }
            };

            fetchData();
        } else if (isLoaded) {
            setLoading(false); // Stop loading if user is not signed in
        }
    }, [isSignedIn, isLoaded]);

    const navcomponents = [
        { name: "Why Clarity?", href: "#why" },
        { name: "Pricing", href: "/pricing" },
        { name: "Add Files", href: "/newuploads" },
        { name: "My Space", href: `/myspace/${userId}` },
        { name: "Terms & Condition", href: "/terms&conditions" },
    ];

    // Return null if loading is true
    if (loading) return null;

    return (
        <nav className="xl:max-w-6xl lg:max-w-4xl md:max-w-2xl max-w-2xl header font-medium flex items-center justify-between md:py-8 py-6 md:px-4 px-6 w-full relative z-20">
            <Link href="/" className="font-semibold text-lg hidden md:block">Clarity</Link>
            <Link href="/" className="font-semibold text-[1.8rem] md:hidden block">C</Link>

            <div className="items-center gap-4 hidden md:flex">
                {navcomponents.map((item) => (
                    <Link href={item.href} key={item.name} className="ml-4">{item.name}</Link>
                ))}
            </div>

            {!isSignedIn && <div className="items-center gap-4 hidden md:flex">
                <SignInButton className="bg-[#cf0] rounded-md px-6 py-2 text-[#111]" />
                <SignUpButton className="border border-[#cf0] rounded-md px-6 py-2 text-[#ffff]" />
            </div>}

            {isSignedIn && <Link href={`/myspace/${userId}`} className="hidden md:block">
                <Profile profileImage={user?.image} profileInitial={user?.name} className="h-8 w-8"/>
            </Link>}

            {isSignedIn && <div className="block md:hidden">
                <Dropmenu icon={<MenuIcon />} dropdownMenu={navcomponents} />
            </div>}

            {!isSignedIn && <div className="block md:hidden items-center gap-4">
                <SignInButton className="bg-[#cf0] rounded-md px-4 py-1.5 text-[#111]" />
            </div>}
        </nav>
    );
};

export default Navbar;
