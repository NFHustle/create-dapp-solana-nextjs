import Link from "next/link";
import { FC, useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useWalletNfts, NftTokenAccount } from "@nfteyez/sol-rayz-react";
import { useConnection } from "@solana/wallet-adapter-react";

import { Loader, SolanaLogo, SelectAndConnectWalletButton } from "components";
import { NftCard } from "./NftCard";
import styles from "./index.module.css";
const walletPublicKey = "DymaKtdMDzXiiCdJynDUWdEe25gKK1amrE3QSNweKUqR";

export const GalleryView: FC = ({}) => {
  const { connection } = useConnection();
  const [walletToParsePublicKey, setWalletToParsePublicKey] =
    useState<string>(walletPublicKey);
  const { publicKey } = useWallet();

  const { nfts, isLoading, error } = useWalletNfts({
    publicAddress: walletToParsePublicKey,
    connection,
  });

  console.log("nfts", nfts);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setWalletToParsePublicKey(value.trim());
  };

  const onUseWalletClick = () => {
    if (publicKey) {
      setWalletToParsePublicKey(publicKey?.toBase58());
    }
  };

  return (
    <div className="container mx-auto max-w-6xl p-8 2xl:px-0">
      <div className={styles.container}>
        <div className="navbar mb-2 shadow-lg bg-neutral text-neutral-content rounded-box">
          <div className="flex-none">
            <button className="btn btn-square btn-ghost">
              <span className="text-4xl">🏞</span>
            </button>
          </div>
          <div className="flex-1 px-2 mx-2">
            <div className="text-sm breadcrumbs">
              <ul className="text-xl">
                <li>
                  <span className="opacity-40">NF Hustle</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="flex-none">
            <WalletMultiButton className="btn btn-ghost" />
          </div>
        </div>

        <div className="text-center pt-2">
          <div className="hero min-h-16 p-0 pt-10">
            <div className="text-center hero-content w-full">
              <div className="w-full">
                <h1 className="mb-5 text-5xl">
                  Augie's World<SolanaLogo />
                </h1>

                <div className="w-full min-w-full">
                  <p className="mb-5">
                  I’m 100% degen diamond fisting TombstonedHS 
Looties pays my groceries <br />
                    My Socials{" "}
                    <a
                      href="https://twitter.com/ideliverpizza2u"
                      target="_blank"
                      className="link font-bold"
                      rel="noreferrer"
                    >
                      @ideliverpizza2u
                    </a>{" "}
                   <em>Discord:</em>augieofearth🪦🍃#2082
                  </p>
                  <div>
                  </div>
                </div>
                <div className="my-10">
                  {error ? (
                    <div>
                      <h1>Error Occures</h1>
                      {(error as any)?.message}
                    </div>
                  ) : null}

                  {!error && isLoading ? (
                    <div>
                      <Loader />
                    </div>
                  ) : (
                    <NftList nfts={nfts} error={error} />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

type NftListProps = {
  nfts: NftTokenAccount[];
  error?: Error;
};

const NftList = ({ nfts, error }: NftListProps) => {
  if (error) {
    return null;
  }

  if (!nfts?.length) {
    return (
      <div className="text-center text-2xl pt-16">
        No NFTs found in this wallet
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 items-start">
      {nfts?.map((nft) => (
        <NftCard key={nft.mint} details={nft} onSelect={() => {}} />
      ))}
    </div>
  );
};
