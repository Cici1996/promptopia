'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { signOut, signIn, getProviders, LiteralUnion, ClientSafeProvider, useSession } from 'next-auth/react';
import { BuiltInProviderType } from 'next-auth/providers/index';

const Nav = () => {
  const { data: session } = useSession();
  const [providers, setProviders] = useState<Record<LiteralUnion<BuiltInProviderType, string>, ClientSafeProvider> | null>(null);
  const [toggleDropdown, setToggleDropdown] = useState(false)
  useEffect(() => {
    const setProvidersData = async () => {
      const response = await getProviders()
      setProviders(response)
    }

    setProvidersData()
  }, [])


  return (
    <nav className="flex-between w-full mb-16 pt-3">
      <Link href={"/"} className="flex gap-2 flex-center">
        <Image src="/assets/images/logo.svg" alt='Logo Image' width={30} height={30} className='object-contain' />
        <p className='logo_text'>Promptopia</p>
      </Link>
      {/* Desktop nav */}
      <div className="sm:flex hidden">
        {session?.user ?
          (<div className='flex gap-3 md:gap-5'>
            <Link href={"/create-prompt"} className='black_btn'>Create Post</Link>
            <button type='button' onClick={() => {
              signOut()
            }} className='outline_btn'>Sign Out</button>
            <Link href={"/profile"}>
              <Image
                src={session?.user?.image ?? ""}
                width={37}
                height={37}
                className='rounded-full'
                alt='Profile' />
            </Link>
          </div>)
          : <>{providers && Object.values(providers).map((provider) => (
            <button type='button'
              key={provider?.name}
              onClick={() => signIn(provider?.id)}
              className='black_btn'
            >
              Sign in
            </button>
          ))}</>}
      </div>

      <div className='sm:hidden flex relative'>
        {session?.user ? (
          <div className='flex'>
            <Image
              src={session?.user?.image ?? ""}
              width={37}
              height={37}
              className='rounded-full'
              alt='Profile'
              onClick={() => setToggleDropdown(!toggleDropdown)}
            />

            {toggleDropdown && (
              <div className="dropdown">
                <Link href={"/profile"}
                  className='dropdown_link'
                  onClick={() => setToggleDropdown(false)}
                >My Profile</Link>
                <Link href={"/create-prompt"}
                  className='dropdown_link'
                  onClick={() => setToggleDropdown(false)}
                >Create Prompt</Link>
                <button
                  className='mt-5 w-full black_btn'
                  type='button'
                  onClick={() => {
                    setToggleDropdown(false)
                    signOut()
                  }}
                >Sign Out</button>
              </div>
            )}
          </div>
        ) : (<>{providers && Object.values(providers).map((provider) => (
          <button type='button'
            key={provider?.name}
            onClick={() => signIn(provider?.id)}
            className='black_btn'
          >
            Sign in
          </button>
        ))}</>)}
      </div>
    </nav>
  )
}

export default Nav