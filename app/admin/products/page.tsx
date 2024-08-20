import { ClientProductPage } from '@/views';
import RootLayout from '../layout';

const ProductPage = () => {
  

  return(
    <RootLayout pageTitle="Products" showInputSearch={true}>
      <ClientProductPage />
    </RootLayout>
     
  )
};

export default ProductPage;
