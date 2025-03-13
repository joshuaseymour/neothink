"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { User, Shield, Settings } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import type { WithProfileProps } from "@/types/component-props"

export function DashboardContent({ user, profile }: WithProfileProps) {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card hoverable>
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <User className="h-5 w-5 text-primary" />
            <CardTitle>Profile</CardTitle>
          </div>
          <CardDescription>Manage your personal information</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Update your profile information, change your avatar, and manage your account settings.
          </p>
        </CardContent>
        <CardFooter>
          <Button asChild variant="outline">
            <Link href="/profile">View Profile</Link>
          </Button>
        </CardFooter>
      </Card>

      <Card hoverable>
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary" />
            <CardTitle>Security</CardTitle>
          </div>
          <CardDescription>Manage your account security</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Update your password, enable two-factor authentication, and review your recent login activity.
          </p>
        </CardContent>
        <CardFooter>
          <Button asChild variant="outline">
            <Link href="/settings/security">Security Settings</Link>
          </Button>
        </CardFooter>
      </Card>

      <Card hoverable className="md:col-span-2">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <Settings className="h-5 w-5 text-primary" />
            <CardTitle>Account Settings</CardTitle>
          </div>
          <CardDescription>Manage your account preferences</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Configure your notification preferences, privacy settings, and other account options.
          </p>
        </CardContent>
        <CardFooter>
          <Button asChild variant="outline">
            <Link href="/settings/account">Account Settings</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

