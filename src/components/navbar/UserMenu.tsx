'use client'

import React from 'react'
import {Session} from "next-auth";
import {Avatar, Dropdown, DropdownItem, DropdownMenu, DropdownSection, DropdownTrigger} from "@nextui-org/react";
import Link from "next/link";
import {signOutUser} from "@/app/actions/authActions";
import {transformImageUrl} from "@/lib/utils";

type UserMenuProps = {
    userInfo: {name: string | null; image: string | null} | null;
}

export default function UserMenu({userInfo}: UserMenuProps) {
    return (
        <Dropdown placement="bottom-end">
            <DropdownTrigger>
                <Avatar isBordered as="button" className="transition-transform"
                        color="secondary" name={userInfo?.name || 'user avatar'}
                        size="sm" src={transformImageUrl(userInfo?.image) || '/images/user.png'}
                />

            </DropdownTrigger>
            <DropdownMenu variant="flat" aria-label="User actions menu">
                <DropdownSection showDivider>
                    <DropdownItem key='signInAs ' isReadOnly as="span"  className="h-14 flex flex-row" aria-label="username">
                        Signed in as {userInfo?.name}
                    </DropdownItem>

                </DropdownSection>
                <DropdownItem key='editProfile' as={Link} href="/members/edit">
                    Edit profile
                </DropdownItem>
                <DropdownItem
                    key="logOut"
                    color="danger"
                    onPress={async () => {
                        try {
                            await signOutUser();
                        } catch (err: any) {
                            // Silently ignore expected NEXT_REDIRECT error
                            if (err.digest !== "NEXT_REDIRECT") {
                                console.error(err);
                            }
                        }
                    }}
                >
                    Log out
                </DropdownItem>

            </DropdownMenu>

        </Dropdown>
    )
}
