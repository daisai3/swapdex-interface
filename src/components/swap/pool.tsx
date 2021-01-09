import React, { useContext, useMemo, useEffect } from 'react'
import { ThemeContext } from 'styled-components'
import { Pair } from '@uniswap/sdk'
import { Link } from 'react-router-dom'
import { SwapPoolTabs } from './NavigationTabs'

import Question from './QuestionHelper'
import FullPositionCard from './PositionCard'
import { useUserHasLiquidityInAllTokens } from './data/V1'
import { useTokenBalancesWithLoadingIndicator } from './state/wallet/hooks'
import { StyledInternalLink, TYPE } from './theme'
import { Text } from 'rebass'
import { LightCard } from './Card'
import { RowBetween } from './Row'
import { ButtonPrimary } from './Button'
import { AutoColumn } from './Column'

import { useActiveWeb3React } from './hooks'
import { usePairs } from './data/Reserves'
import { toV2LiquidityToken, useTrackedTokenPairs } from './state/user/hooks'
import {Dots, Wrapper} from './styleds'

import {InjectedConnector} from "@web3-react/injected-connector";
import {Web3Provider} from "@ethersproject/providers";
import {useWeb3React} from "@web3-react/core";

const injectedConnector = new InjectedConnector({
    supportedChainIds: [
        1, // Mainet
        3, // Ropsten
        4, // Rinkeby
        5, // Goerli
        42, // Kovan
    ],
})

export default function Pool() {
  const theme = useContext(ThemeContext)
  const { chainId, account, activate, active } = useWeb3React<Web3Provider>()

  useEffect(() => {
      if ( !account ) {
          activate(injectedConnector)
      }
  });

  // fetch the user's balances of all tracked V2 LP tokens
  const trackedTokenPairs = useTrackedTokenPairs()
  const tokenPairsWithLiquidityTokens = useMemo(
    () => trackedTokenPairs.map(tokens => ({ liquidityToken: toV2LiquidityToken(tokens), tokens })),
    [trackedTokenPairs]
  )
  const liquidityTokens = useMemo(() => tokenPairsWithLiquidityTokens.map(tpwlt => tpwlt.liquidityToken), [
    tokenPairsWithLiquidityTokens
  ])
  const [v2PairsBalances, fetchingV2PairBalances] = useTokenBalancesWithLoadingIndicator(
    account ?? undefined,
    liquidityTokens
  )

  // fetch the reserves for all V2 pools in which the user has a balance
  const liquidityTokensWithBalances = useMemo(
    () =>
      tokenPairsWithLiquidityTokens.filter(({ liquidityToken }) =>
        v2PairsBalances[liquidityToken.address]?.greaterThan('0')
      ),
    [tokenPairsWithLiquidityTokens, v2PairsBalances]
  )

  const v2Pairs = usePairs(liquidityTokensWithBalances.map(({ tokens }) => tokens))
  const v2IsLoading =
    fetchingV2PairBalances || v2Pairs?.length < liquidityTokensWithBalances.length || v2Pairs?.some(V2Pair => !V2Pair)

  const allV2PairsWithLiquidity = v2Pairs.map(([, pair]) => pair).filter((v2Pair): v2Pair is Pair => Boolean(v2Pair))

  const hasV1Liquidity = useUserHasLiquidityInAllTokens()

  return (
    <>
        <Wrapper id="pool-page" style={{ display: 'flex', flexDirection: 'column', width: '75%' }}>
          <SwapPoolTabs active={'pool'} />
          <AutoColumn gap="lg" justify="center">
            <ButtonPrimary id="join-pool-button" as={Link} style={{ padding: 16 }} to="/pool/add/ETH">
              <Text fontWeight={500} fontSize={20}>
                Add Liquidity
              </Text>
            </ButtonPrimary>

            <AutoColumn gap="12px" style={{ width: '100%' }}>
              <RowBetween padding={'0 8px'}>
                <Text color={theme.componentsTheme.backgroundTextColor} fontWeight={500}>
                  Your Liquidity
                </Text>
                <Question text="When you add liquidity, you are given pool tokens that represent your share. If you don’t see a pool you joined in this list, try importing a pool below." />
              </RowBetween>

              {!account ? (
                <LightCard padding="40px">
                  <TYPE.body color={theme.text3} textAlign="center">
                    Connect to a wallet to view your liquidity.
                  </TYPE.body>
                </LightCard>
              ) : v2IsLoading ? (
                <LightCard padding="40px">
                  <TYPE.body color={theme.text3} textAlign="center">
                    <Dots>Loading</Dots>
                  </TYPE.body>
                </LightCard>
              ) : allV2PairsWithLiquidity?.length > 0 ? (
                <>
                  {allV2PairsWithLiquidity.map(v2Pair => (
                    <FullPositionCard key={v2Pair.liquidityToken.address} pair={v2Pair} />
                  ))}
                </>
              ) : (
                <LightCard padding="40px">
                  <TYPE.body color={theme.text3} textAlign="center">
                    No liquidity found.
                  </TYPE.body>
                </LightCard>
              )}

              <div>
                <Text textAlign="center" color={theme.componentsTheme.backgroundTextColor} fontSize={14} style={{ padding: '.5rem 0 .5rem 0' }}>
                  {hasV1Liquidity ? 'Uniswap V1 liquidity found!' : "Don't see a pool you joined?"}{' '}
                  <StyledInternalLink id="import-pool-link" to={hasV1Liquidity ? '/pool/migrate/v1' : '/find'}>
                    {hasV1Liquidity ? 'Migrate now.' : 'Import it.'}
                  </StyledInternalLink>
                </Text>
              </div>
            </AutoColumn>
          </AutoColumn>
        </Wrapper>
    </>
  )
}
