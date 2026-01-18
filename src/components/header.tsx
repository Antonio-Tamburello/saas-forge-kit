'use client'

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ThemeToggle } from '@/components/theme-toggle';
import { Code2 } from 'lucide-react';
import { authClient } from '@/lib/auth-client';

export function Header() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const session = await authClient.getSession();
        if (session?.data) {
          setUser(session.data.user || null);
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error('Error checking auth:', error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  return (
    <header className="border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Code2 className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-bold text-xl">SaaS Forge Kit</span>
          </div>
          <nav className="flex items-center gap-6">
            <a href="#features" className="text-sm font-medium hover:text-primary transition-colors">
              Features
            </a>
            <a href="#pricing" className="text-sm font-medium hover:text-primary transition-colors">
              Pricing
            </a>
            <div className="flex items-center gap-2">
              <ThemeToggle />
              {loading ? (
                <div className="h-9 w-20 bg-muted animate-pulse rounded"></div>
              ) : user ? (
                <div className="flex items-center gap-2">
                  <a href="/dashboard">
                    <Button size="sm">Dashboard</Button>
                  </a>
                </div>
              ) : (
                <>
                  <a href="/auth/sign-in">
                    <Button variant="ghost" size="sm">Sign in</Button>
                  </a>
                  <a href="/auth/sign-up">
                    <Button size="sm">Get Started</Button>
                  </a>
                </>
              )}
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}