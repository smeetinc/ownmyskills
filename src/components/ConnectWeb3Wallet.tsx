import { ConnectKitButton } from "connectkit";

const ConnectWalletButton = () => {
  return (
    <ConnectKitButton.Custom>
      {({ show, isConnected, truncatedAddress }) => (
        <button
          onClick={show}
          className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors duration-200 ease-in-out cursor-pointer"
        >
          {isConnected ? truncatedAddress : "Connect Wallet"}
        </button>
      )}
    </ConnectKitButton.Custom>
  );
};

export default ConnectWalletButton;
