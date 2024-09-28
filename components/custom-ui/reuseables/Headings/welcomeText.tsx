interface WelcomeProps {
  authType: string;
}

export const WelcomeText: React.FC<WelcomeProps> = ({ authType }) => {
  return (
    <div>
      <h2 className="text-xl font-semibold text-black">
        Hi, <span className="text-2xl">{authType}</span> to PriceMarkup
      </h2>
      {/* <p className="text-pricesageBlack">Create an account and start enjoying PriceMarkup</p> */}
    </div>
  );
};
