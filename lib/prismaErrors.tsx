interface PrismaErrorsProps{ 
message: string | null;
name: string;
status: string | null
}

export function prismaErrors({ error }: {error: PrismaErrorsProps }) {
if(!error?.message) return null;
return <div className="text-red-500 text-xs italic mt-4">{error?.name}</div>
}

