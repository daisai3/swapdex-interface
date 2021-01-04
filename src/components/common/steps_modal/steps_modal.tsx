import React from 'react';
import Modal from 'react-modal';
import { connect } from 'react-redux';
import { useTheme, withTheme } from 'styled-components';

import { stepsModalReset } from '../../../store/actions';
import { getStepsModalCurrentStep, getStepsModalDoneSteps, getStepsModalPendingSteps } from '../../../store/selectors';
import { Theme } from '../../../themes/commons';
import { getStepTitle, isLongStep } from '../../../util/steps';
import { Step, StepKind, StoreState } from '../../../util/types';
import { CloseModalButton } from '../icons/close_modal_button';

import { BorrowTokenStepContainer } from './borrow_token_step';
import { BuySellCollectibleStepContainer } from './buy_sell_collectible_step';
import { BuySellTokenMatchingStepContainer } from './buy_sell_token_matching_step';
import { BuySellTokenStepContainer } from './buy_sell_token_step';
import { LendingTokenStepContainer } from './lending_token_step';
import { SignOrderStepContainer } from './sign_order_step';
import { ModalContent } from './steps_common';
import { StepItem } from './steps_progress';
import { SubmitConfigStepContainer } from './submit_config_step';
import { ToggleTokenLockStepContainer } from './toggle_token_lock_step';
import { TransferTokenStepContainer } from './transfer_token_step';
import { UnlockCollectiblesStepContainer } from './unlock_collectibles_step';
import { WrapEthStepContainer } from './wrap_eth_step';

interface StateProps {
    currentStep: Step | null;
    doneSteps: Step[];
    pendingSteps: Step[];
}


interface DispatchProps {
    reset: () => void;
}

type Props = StateProps & DispatchProps;

const StepsModal = props => {
        const { currentStep, doneSteps, pendingSteps, reset } = props;
        const theme=useTheme();
        const isOpen = currentStep !== null;

        const buildStepsProgress = (currentStepItem: StepItem): StepItem[] => [
            ...doneSteps.map(doneStep => ({
                title: getStepTitle(doneStep),
                progress: 100,
                active: false,
                isLong: isLongStep(doneStep),
            })),
            currentStepItem,
            ...pendingSteps.map(pendingStep => ({
                title: getStepTitle(pendingStep),
                progress: 0,
                active: false,
                isLong: isLongStep(pendingStep),
            })),
        ];

        // this is used to avoid an issue with two consecutive steps of the same kind
        const stepIndex = doneSteps.length;

        return (
            <Modal isOpen={isOpen} style={theme.modalTheme}>
                <CloseModalButton onClick={reset} />
                <ModalContent>
                    {currentStep && currentStep.kind === StepKind.ToggleTokenLock && (
                        <ToggleTokenLockStepContainer key={stepIndex} buildStepsProgress={buildStepsProgress} />
                    )}
                    {currentStep && currentStep.kind === StepKind.TransferToken && (
                        <TransferTokenStepContainer key={stepIndex} buildStepsProgress={buildStepsProgress} />
                    )}
                    {currentStep && currentStep.kind === StepKind.UnlockCollectibles && (
                        <UnlockCollectiblesStepContainer key={stepIndex} buildStepsProgress={buildStepsProgress} />
                    )}
                    {currentStep && currentStep.kind === StepKind.BuySellLimit && (
                        <SignOrderStepContainer key={stepIndex} buildStepsProgress={buildStepsProgress} />
                    )}
                    {currentStep && currentStep.kind === StepKind.BuySellLimitMatching && (
                        <BuySellTokenMatchingStepContainer key={stepIndex} buildStepsProgress={buildStepsProgress} />
                    )}
                    {currentStep && currentStep.kind === StepKind.BuySellMarket && (
                        <BuySellTokenStepContainer key={stepIndex} buildStepsProgress={buildStepsProgress} />
                    )}
                    {currentStep && currentStep.kind === StepKind.LendingToken && (
                        <LendingTokenStepContainer key={stepIndex} buildStepsProgress={buildStepsProgress} />
                    )}
                    {currentStep && currentStep.kind === StepKind.UnLendingToken && (
                        <LendingTokenStepContainer key={stepIndex} buildStepsProgress={buildStepsProgress} />
                    )}
                    {currentStep && currentStep.kind === StepKind.BorrowToken && (
                        <BorrowTokenStepContainer key={stepIndex} buildStepsProgress={buildStepsProgress} />
                    )}
                    {currentStep && currentStep.kind === StepKind.RepayToken && (
                        <BorrowTokenStepContainer key={stepIndex} buildStepsProgress={buildStepsProgress} />
                    )}
                    {currentStep && currentStep.kind === StepKind.SubmitConfig && (
                        <SubmitConfigStepContainer key={stepIndex} buildStepsProgress={buildStepsProgress} />
                    )}

                    {currentStep &&
                        (currentStep.kind === StepKind.SellCollectible ||
                            currentStep.kind === StepKind.BuyCollectible) && (
                            <BuySellCollectibleStepContainer
                                key={stepIndex}
                                buildStepsProgress={buildStepsProgress}
                                closeModal={reset}
                            />
                        )}
                    {currentStep && currentStep.kind === StepKind.WrapEth && (
                        <WrapEthStepContainer key={stepIndex} buildStepsProgress={buildStepsProgress} />
                    )}
                </ModalContent>
            </Modal>
        );
}

const mapStateToProps = (state: StoreState): StateProps => {
    return {
        currentStep: getStepsModalCurrentStep(state),
        doneSteps: getStepsModalDoneSteps(state),
        pendingSteps: getStepsModalPendingSteps(state),
    };
};

let StepsModalContainer = connect(mapStateToProps, { reset: stepsModalReset })(StepsModal); 

export { StepsModal, StepsModalContainer };
