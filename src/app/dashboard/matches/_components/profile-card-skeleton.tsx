'use client';

import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent, CardFooter } from '@/components/ui/card';

export function ProfileCardSkeleton() {
  return (
    <Card className="flex flex-col">
      <CardContent className="p-6 flex-1">
        <div className="flex flex-col items-center text-center">
            <Skeleton className="h-24 w-24 rounded-full" />
            <Skeleton className="h-6 w-32 mt-4" />
            <Skeleton className="h-4 w-24 mt-2" />
            <Skeleton className="h-4 w-20 mt-2" />
        </div>
        <div className="mt-4 text-center">
          <div className="flex flex-wrap justify-center gap-2">
            <Skeleton className="h-5 w-16 rounded-full" />
            <Skeleton className="h-5 w-20 rounded-full" />
            <Skeleton className="h-5 w-14 rounded-full" />
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex gap-2 p-4 pt-0">
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
      </CardFooter>
    </Card>
  );
}
