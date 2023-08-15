"use client";

import { useCardano } from "use-cardano";

const Stake = () => {
  const { walletProvider, setWalletProvider, account, lucid } = useCardano();
  //

  // return (
  //     <>
  //         <h1>enabledWallet</h1> :
  //     </>
  // )
  const handleRegister = async () => {
    if (lucid) {
      const rewardAddress = await lucid.wallet.rewardAddress();
      await (
        await (await lucid.newTx().registerStake(rewardAddress!).complete())
          .sign()
          .complete()
      ).submit();
    }
  };
  const handleStake = async () => {
    if (lucid) {
      const rewardAddress = await lucid.wallet.rewardAddress();
      await (
        await (
          await lucid
            .newTx()
            .delegateTo(
              rewardAddress!,
              "pool19ut4284xy9p82dd0cglzxweddfqw73yennkjk6mmp650chnr6lz"
            )
            .complete()
        )
          .sign()
          .complete()
      ).submit();
    }
  };

  return (
    <div className="flex flex-col items-center gap-3 sm:gap-6 lg:gap-8">
      <button className="btn btn-outline" onClick={handleRegister}>
        Register
      </button>
      <button className="btn btn-outline" onClick={handleStake}>
        Stake
      </button>
    </div>
  );
};

export default Stake;
