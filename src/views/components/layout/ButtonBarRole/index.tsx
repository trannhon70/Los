import Button from '@mui/material/Button';
import Skeleton from '@mui/material/Skeleton';
import clsx from 'clsx';
import { getCurrentUser } from 'features/auth/store/slice';
import { ETypeButton } from 'features/loan/normal/storageControl/case';
import { FC } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { ILOANURLParams } from 'types/models/loan';
import { AppraisalNormalAA } from 'views/pages/LOAN/utils';
import {
  checkRoleButtonBar,
  fetchingLOANStateGuideData,
  getRuleDisbled,
} from '../../../../features/loan/normal/storageGuide/selector';
import { generateTitleButton } from './handleDataBtn';
import { SxStyleSkelekon } from './style';
export interface ButtonBarProps {
  className?: string;
  onExit?(): void;
  onBack?(): void;
  onSave?(): void;
  onBtnMenu?(item: string): void;
  onContinue?(): void;
  onDelete?(): void;
  onDecision?(): void;
  disableExit?: boolean;
  hideContinue?: boolean;
  hideDelete?: boolean;
  hideBack?: boolean;
  hideExit?: boolean;
  hideDecision?: boolean;
  disableBack?: boolean;
  disableSave?: boolean;
  disableContinue?: boolean;
  disableDelete?: boolean;
  isApply?: boolean;
  isCloseDocument?: boolean;
  isNotForm?: boolean;
  hideSave?: boolean;
  positionCode?: string;
}
export interface ITypeBtn {
  title: string;
  color: string;
}

const ButtonBarRole: FC<ButtonBarProps> = (props) => {
  const {
    className,
    onExit,
    disableExit,
    onBack,
    positionCode,
    disableBack,
    disableSave,
    onSave,
    disableContinue,
    onContinue,
    onDelete,
    onDecision,
    hideContinue = true,
    hideSave = true,
    hideDelete = true,
    hideBack = true,
    hideExit = true,
    hideDecision = false,
    disableDelete,
    isApply,
    onBtnMenu,
  } = props;

  const onClickExit = () => !disableExit && onExit && onExit();
  const onClickBack = () => !disableBack && onBack && onBack();
  const onClickSave = () => !disableSave && onSave && onSave();
  const onClickContinue = () => !disableContinue && onContinue && onContinue();
  const onClickBtnMenu = (item: string) => onBtnMenu && onBtnMenu(item);
  const onClickDelete = () => !disableDelete && onDelete && onDelete();
  const onClickDecision = () => !disableDelete && onDecision && onDecision();

  const dataRole = useSelector(checkRoleButtonBar);
  const fetchingData = useSelector(fetchingLOANStateGuideData);
  const dataBtnTitle = Object.keys(dataRole?.guide ?? '');
  const ruleDisabled = useSelector(getRuleDisbled);
  const user = useSelector(getCurrentUser);
  // const disablePosition = disablePassPositionLog(dataRole?.last_log.passed_positions ?? [], positionCode ?? "")
  const params = useParams() as ILOANURLParams;
  const current = AppraisalNormalAA.indexOf(params['*']);

  return (
    <div className={clsx('text-right', className)}>
      {!!hideExit && fetchingData && ruleDisabled ? (
        <Button sx={SxStyleSkelekon} className="ml-4">
          <Skeleton />
        </Button>
      ) : (
        <Button
          id="exit"
          variant="contained"
          className="ml-4 rounded-0 font-medium"
          disabled={disableExit}
          onClick={onClickExit}
          sx={{ minWidth: '100px', bgcolor: '#7d7d7d' }}
        >
          Thoát
        </Button>
      )}
      {!!hideBack && fetchingData && ruleDisabled ? (
        <Button sx={SxStyleSkelekon} className="ml-4">
          <Skeleton />
        </Button>
      ) : (
        <Button
          variant="contained"
          className="ml-4 rounded-0 btn-black"
          disabled={disableBack}
          id="back"
          onClick={onClickBack}
          sx={{ minWidth: '100px' }}
        >
          Quay lại
        </Button>
      )}
      {hideDelete === true ? (
        fetchingData && ruleDisabled ? (
          <Button sx={SxStyleSkelekon} className="ml-4">
            <Skeleton />
          </Button>
        ) : (
          <Button
            variant="contained"
            className="ml-4 rounded-0"
            disabled={disableDelete}
            id="delete"
            color="error"
            onClick={onClickDelete}
            sx={{ minWidth: '100px' }}
          >
            Xóa
          </Button>
        )
      ) : null}
      {isApply === false
        ? dataBtnTitle
            ?.filter(
              (ii) =>
                ii !== ETypeButton.save &&
                ii !== ETypeButton.accept_official && // tạm ẩn chờ luồng
                ii !== ETypeButton.deny_official && // tạm ẩn chờ luồng
                ii !== ETypeButton.accept_unofficial &&
                ii !== ETypeButton.deny_unofficial
            )
            .map((item, i) => {
              // bieu mau
              return fetchingData && ruleDisabled ? (
                <Button
                  sx={{
                    width: generateTitleButton(item)?.checkWidth,
                    height: '36px',
                    '& .MuiSkeleton-root': {
                      height: '60px',
                      width: generateTitleButton(item)?.checkWidth,
                    },
                  }}
                  className="ml-4"
                >
                  <Skeleton />
                </Button>
              ) : (
                <Button
                  variant="contained"
                  className="ml-4 rounded-0 font-medium"
                  // disabled={ruleDisabled && (dataRole?.current_state_group === "CONTROLLER_BRANCH" ||
                  // dataRole?.current_state_group === "APPROVER_BRANCH")}
                  // dataRole?.current_state_group === "APPROVER_BRANCH") && disablePosition}
                  key={i.toString()}
                  id={generateTitleButton(item)?.id}
                  onClick={() => onClickBtnMenu(item)}
                  sx={{
                    minWidth: '100px',
                    bgcolor: generateTitleButton(item)?.color,
                  }}
                >
                  {generateTitleButton(item)?.title}
                </Button>
              );
            })
        : dataBtnTitle
            ?.filter(
              (i) =>
                i !== ETypeButton.apply && // tạm thời chờ BE filter
                i !== ETypeButton.close &&
                i !== ETypeButton.accept_official &&
                i !== ETypeButton.deny_official &&
                i !== ETypeButton.accept_unofficial &&
                i !== ETypeButton.deny_unofficial &&
                i !== ETypeButton.apply_approve_hq &&
                i !== ETypeButton.return_pre_control &&
                i !== ETypeButton.apply_headquarter_official &&
                // && i !== ETypeButton.apply_headquarter_unofficial
                i !== ETypeButton.apply_approve &&
                i !== ETypeButton.reject &&
                i !== ETypeButton.apply_control &&
                i !== ETypeButton.return_init
            )
            .map((btn, i) => {
              return fetchingData && ruleDisabled ? (
                <Button
                  sx={{
                    width: `${generateTitleButton(btn)?.checkWidth} !important`,
                    height: '36px',
                    '& .MuiSkeleton-root': {
                      height: '62px',
                      width: `${
                        generateTitleButton(btn)?.checkWidth
                      } !important`,
                    },
                  }}
                  className="ml-4"
                >
                  <Skeleton />
                </Button>
              ) : (
                <Button
                  variant="contained"
                  className="ml-4 rounded-0 font-medium"
                  // disabled={ruleDisabled && (dataRole?.current_state_group === "CONTROLLER_BRANCH" ||
                  // dataRole?.current_state_group === "APPROVER_BRANCH")}
                  // dataRole?.current_state_group === "APPROVER_BRANCH") && disablePosition}
                  // disabled={true}
                  key={i.toString()}
                  id={generateTitleButton(btn)?.id}
                  onClick={() => onClickBtnMenu(btn)}
                  sx={{
                    minWidth: '100px',
                    bgcolor: generateTitleButton(btn)?.color,
                  }}
                >
                  {generateTitleButton(btn)?.title}
                </Button>
              );
            })}
      {!!hideSave && (
        <Button
          variant="contained"
          className="ml-4 rounded-0"
          color="success"
          id="save"
          onClick={onClickSave}
          disabled={disableSave}
          sx={{ minWidth: '100px' }}
        >
          Lưu
        </Button>
      )}
      {hideContinue === false ? (
        fetchingData && ruleDisabled ? (
          <Button sx={SxStyleSkelekon} className="ml-4">
            <Skeleton />
          </Button>
        ) : current === 2 ? null : (
          <Button
            // disabled={dataRuleInit} // check continue
            disabled={disableContinue}
            variant="contained"
            className="ml-4 rounded-0"
            color="primary"
            id="continue"
            onClick={onClickContinue}
            sx={{ minWidth: '100px' }}
          >
            Tiếp tục
          </Button>
        )
      ) : null}
      {/* {chờ confirm từ a Long } dataRole?.is_satisfied && */}

      {!isApply &&
      (dataRole?.current_state_group === 'APPROVER_BRANCH' ||
        dataRole?.current_state_group === 'APPROVER_HEADQUARTER') &&
      !hideDecision ? (
        user?.user_name === dataRole?.roles?.approver_branch?.username ||
        user?.user_name === dataRole?.roles?.approver_headquarter?.username ? (
          fetchingData && ruleDisabled ? (
            <Button sx={SxStyleSkelekon} className="ml-4">
              <Skeleton />
            </Button>
          ) : (
            <Button
              variant="contained"
              className="ml-4 rounded-0"
              color="primary"
              id="continue"
              onClick={onClickDecision}
              sx={{ minWidth: '100px' }}
            >
              Quyết Định
            </Button>
          )
        ) : null
      ) : null}
    </div>
  );
};
export default ButtonBarRole;
