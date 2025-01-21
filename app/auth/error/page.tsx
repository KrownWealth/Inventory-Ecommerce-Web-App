export default function ErrorPage({ error }: { error: string }) {
  return (
    <div>
      <h1>Authentication Error</h1>
      <p>{error}</p>
    </div>
  );
}
