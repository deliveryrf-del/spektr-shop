import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

const COOKIE = 'spektr_admin';

export function isAdminAuthed(): boolean {
  return cookies().get(COOKIE)?.value === '1';
}

export async function requireAdmin(): Promise<void> {
  if (!isAdminAuthed()) {
    redirect('/admin');
  }
}
