"use server"

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { createClient } from '@/utils/supabase/server';
import { toastNotification } from '@/lib';

export async function emailLogin(formData: FormData) {
  const supabase = createClient();
  
  // Extract data from formData
  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  };

  // Authenticate with Supabase
  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    redirect('/auth/login?message=Could not authenticate user, please signup');
  }

  revalidatePath('/', 'layout');
   toastNotification("success", "top-right", undefined, {
      message: "Login successful!",
    });
  redirect('/products');
}

export async function signup(formData: FormData) {
  const supabase = createClient();
  
  // Extract data from formData
  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  };

  // Sign up with Supabase
  const { error } = await supabase.auth.signUp(data);

  if (error) {
    console.error('Error during sign up:', error.message);
    redirect('/auth/login?message=Error signing up');
  }

  revalidatePath('/', 'layout');
  redirect('/auth/login');
}
