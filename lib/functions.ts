'use server';

import { ProductsType } from "@/types";
import { ProductsData } from "@/json";




import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { createClient } from '@/utils/supabase/server';

export async function login(formData: FormData) {
  const supabase = createClient();
  
  // Extract data from formData
  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  };

  // Authenticate with Supabase
  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    redirect('/error');
  }

  revalidatePath('/', 'layout');
  redirect('/account');
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
    redirect('/error');
  }

  revalidatePath('/', 'layout');
  redirect('/account');
}


export async function fetchProductsPages({ query, page }: { query: string; page: number }) {
  const allProducts: ProductsType[] = ProductsData;


  const filteredProducts = allProducts.filter(product => {
    return product.name.toLowerCase().includes(query.toLowerCase()) ||
           product.category.toLowerCase().includes(query.toLowerCase());
  });

  
  const itemsPerPage = 10;
  const startIndex = (page - 1) * itemsPerPage;
  const paginatedProducts = filteredProducts.slice(startIndex, startIndex + itemsPerPage);

  // Return paginated products and total pages
  return {
    data: paginatedProducts,
    pages: Math.ceil(filteredProducts.length / itemsPerPage),
  };
}




