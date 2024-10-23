interface ZodErrorsProps {
  error: string[] | undefined; 
}

export const ZodErrors: React.FC<ZodErrorsProps> = ({ error }) => {
  if (!error || error.length === 0) return null;
  return <p className="text-red-500 text-xs italic mt-1">{error[0]}</p>; 
};
