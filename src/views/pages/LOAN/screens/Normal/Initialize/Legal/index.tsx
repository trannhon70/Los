import useBackdrop from 'app/hooks/useBackdrop';
import useNotify from 'app/hooks/useNotify';
import { fetchDataGuideState } from 'features/loan/normal';
import { getDeclareLegal } from 'features/loan/normal/storage/cic/selectors';
import {
  clearForm,
  onChangeBack,
  onChangeContinue,
  saveLegalBorrower,
  saveLegalCoBorrower,
  saveLegalContact,
  saveLegalCoPayer,
  saveLegalMarriage,
  saveLegalOther,
  saveLegalRelated,
} from 'features/loan/normal/storage/legal/actions';
import {
  getBlackListAlert,
  getFullLegalData,
  getIdentityLOANNormalStoredFull,
} from 'features/loan/normal/storage/legal/selectors';
import { getLOANNormalLOSId } from 'features/loan/normal/storage/selectors';
import {
  callApprovalApprove,
  callControlComfirm,
  callDisApproved,
  callDisConfirm,
} from 'features/loan/normal/storageControl/action';
import { ETypeButton } from 'features/loan/normal/storageControl/case';
import { generateTypeParams } from 'features/loan/normal/storageGuide/generateTypeStateGuide';
import {
  checkRoleButtonBar,
  getRuleDisbled,
} from 'features/loan/normal/storageGuide/selector';
import { FC, Fragment, useEffect, useMemo, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes, useNavigate, useParams } from 'react-router';
import { ILOANURLParams } from 'types/models/loan';
import { ILOANNormalStorageLegalDeclareState } from 'types/models/loan/normal/storage/Legal';
import { PREFIX_LOCAL } from 'utils';
import ButtonBarRole from 'views/components/layout/ButtonBarRole';
import Steps, { StepItem } from 'views/components/layout/Steps';
import {
  declareMapTypeUrl,
  DeclareName,
  pathNameLegalStoredToUrl,
  pathUrlToDeclareLegalStored,
} from 'views/pages/LOAN/utils';
import ModalAlertBlackList from 'views/pages/LOAN/widgets/ModalAlertBlackList';
import AttachmentModalServices from './AttachmentModalServices';
import Borrower, { IBorrowerRef } from './Borrower';
import LOANNormalLegalCoBorrower, {
  ILOANNormalLegalCoBorrowerRef,
} from './CoBorrower';
import LOANNormalLegalContact from './Contact';
import LOANNormalLegalCoPayer, { ILOANNormalLegalCoPayerRef } from './CoPayer';
import LOANNormalLegalLegalRelated from './LegalRelated';
import LOANNormalLegalMarriage, {
  ILOANNormalLegalMarriageRef,
} from './Marriage';
import LOANNormalLegalOther, { ILOANNormalLegalOtherRef } from './Other';
import useStorage from './useStorage';

const LegalRoute: FC = () => {
  const params = useParams() as ILOANURLParams;
  const navigate = useNavigate();
  const notify = useNotify();
  const dispatch = useDispatch();
  const current = DeclareName.indexOf(params['*']);
  const [isOpen, setOpenAttachment] = useState<boolean>(false);
  const ruleDisabled = useSelector(getRuleDisbled);
  const [userAttach, setUserAttachment] = useState<{
    declare: string;
    uuid: string;
  }>({ declare: '', uuid: '' });
  const los_id = useSelector(getLOANNormalLOSId);

  const declareLegalList = useSelector(getDeclareLegal);
  const validateBorrowerRef = useRef<IBorrowerRef>(null);
  const validateMarriageRef = useRef<ILOANNormalLegalMarriageRef>(null);
  const validateCoBorrowerRef = useRef<ILOANNormalLegalCoBorrowerRef>(null);
  const validateCoPayerRef = useRef<ILOANNormalLegalCoPayerRef>(null);
  const validateOtherRef = useRef<ILOANNormalLegalOtherRef>(null);
  const { allIdentity } = useStorage('BORROWER');
  const { valueList } = useStorage('BORROWER');
  const dataFull = useSelector(getIdentityLOANNormalStoredFull);
  const blacklistAlert = useSelector(getBlackListAlert);
  const dataLegalFull = useSelector(getFullLegalData);
  const valueIndenNum = allIdentity.map((item) => {
    return item.num;
  });
  const { showBackdrop } = useBackdrop();
  const currentStateGuide = useSelector(checkRoleButtonBar);
  const checkDuplicateIdentity = valueIndenNum.some((val, idx) => {
    if (val === '') {
      return false;
    }
    return valueIndenNum.indexOf(val) !== idx;
  });

  const attachFileData = useMemo(() => {
    // 'BORROWER'
    // 'MARRIAGE'
    // 'CO_BRW'
    // 'CO_PAYER'
    // 'LAW_RLT'
    // 'RELATED'
    // 'OTHER'
    const countAttachFile = (infos: ILOANNormalStorageLegalDeclareState[]) => {
      let count = 0;
      infos?.forEach((info) => {
        info?.document_info_list?.forEach((doc) => {
          count += doc?.child_files?.filter(
            (item) => !item.uuid.startsWith(`${PREFIX_LOCAL}`)
          ).length;
        });
      });
      return count;
    };
    return {
      BORROWER: countAttachFile(dataLegalFull['BORROWER'].info),
      MARRIAGE: countAttachFile(dataLegalFull['MARRIAGE'].info),
      CO_BRW: countAttachFile(dataLegalFull['CO_BRW'].info),
      CO_PAYER: countAttachFile(dataLegalFull['CO_PAYER'].info),
      LAW_RLT: countAttachFile(dataLegalFull['LAW_RLT'].info),
      RELATED: countAttachFile(dataLegalFull['RELATED'].info),
      OTHER: countAttachFile(dataLegalFull['OTHER'].info),
    };
  }, [dataLegalFull]);

  const dataPosition = generateTypeParams(`legal/${params['*']}`) ?? '';
  useEffect(() => {
    params.stage === 'init' &&
      dispatch(fetchDataGuideState({ los_id, position: dataPosition }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params['*']]);

  const checkValidateForm = () => {
    let isCheckValid: boolean = true;
    const declareStored = pathUrlToDeclareLegalStored(
      DeclareName[current]?.replaceAll('-', '_')
    );

    switch (declareStored) {
      case declareMapTypeUrl.borrower:
        if (checkDuplicateIdentity) {
          notify(
            'Giấy tờ định danh đã tồn tại vui lòng kiểm tra lại',
            'warning'
          );
          isCheckValid = false;
          return;
        }
        const isValidateAddressBorrwer =
          validateBorrowerRef.current?.validate() ?? true;
        isCheckValid = isValidateAddressBorrwer;
        break;

      case declareMapTypeUrl.marriage:
        if (checkDuplicateIdentity) {
          notify(
            'Giấy tờ định danh đã tồn tại vui lòng kiểm tra lại',
            'warning'
          );
          isCheckValid = false;
          return;
        }
        const isValidateAddressMarriage =
          validateMarriageRef.current?.validate() ?? true;
        isCheckValid = isValidateAddressMarriage;
        break;

      case declareMapTypeUrl.co_borrower:
        if (checkDuplicateIdentity) {
          notify(
            'Giấy tờ định danh đã tồn tại vui lòng kiểm tra lại',
            'warning'
          );
          isCheckValid = false;
          return;
        }
        const isCheckValidCoBorrower =
          validateCoBorrowerRef.current?.validate() ?? true;
        isCheckValid = isCheckValidCoBorrower;
        break;

      case declareMapTypeUrl.co_payer:
        if (checkDuplicateIdentity) {
          notify(
            'Giấy tờ định danh đã tồn tại vui lòng kiểm tra lại',
            'warning'
          );
          isCheckValid = false;
          return;
        }
        const isCheckValidCoPayer =
          validateCoPayerRef.current?.validate() ?? true;
        isCheckValid = isCheckValidCoPayer;
        break;

      case declareMapTypeUrl.legal_related:
        if (checkDuplicateIdentity) {
          notify(
            'Giấy tờ định danh đã tồn tại vui lòng kiểm tra lại',
            'warning'
          );
          isCheckValid = false;
          return;
        }
        isCheckValid = true;
        break;

      case declareMapTypeUrl.contact:
        if (checkDuplicateIdentity) {
          notify(
            'Giấy tờ định danh đã tồn tại vui lòng kiểm tra lại',
            'warning'
          );
          isCheckValid = false;
          return;
        } else if (valueList.length > 2) {
          notify('Vui lòng chọn tối đa 2 người liên hệ', 'warning');
          isCheckValid = false;
          return;
        } else {
          isCheckValid = true;
        }
        break;

      case declareMapTypeUrl.other:
        if (checkDuplicateIdentity) {
          notify(
            'Giấy tờ định danh đã tồn tại vui lòng kiểm tra lại',
            'warning'
          );
          isCheckValid = false;
          return;
        }
        const isCheckValidOther = validateOtherRef.current?.validate() ?? true;
        isCheckValid = isCheckValidOther;
        break;
    }

    return isCheckValid;
  };
  const onSave = () => {
    const current = DeclareName.indexOf(params['*']);
    if (DeclareName[current] !== 'borrower' && dataFull?.borrower === null) {
      notify('Người vay chính chưa được khởi tạo', 'error');
      return;
    }
    switch (DeclareName[current]) {
      case 'borrower':
        if (checkDuplicateIdentity) {
          notify(
            'Giấy tờ định danh đã tồn tại vui lòng kiểm tra lại',
            'warning'
          );
          return;
        }
        const isValidateAddressBorrwer =
          validateBorrowerRef.current?.validate() ?? true;

        if (!isValidateAddressBorrwer) {
          return;
        } else {
          // dispatch(saveLegalBorrower(DeclareName[current]));
          dispatch(saveLegalBorrower(true));
        }
        break;
      case 'marriage':
        if (checkDuplicateIdentity) {
          notify(
            'Giấy tờ định danh đã tồn tại vui lòng kiểm tra lại',
            'warning'
          );
          return;
        }

        const isValidateAddressMarriage =
          validateMarriageRef.current?.validate() ?? true;
        if (!isValidateAddressMarriage) {
          return;
        } else {
          dispatch(saveLegalMarriage(true));
        }
        break;

      case 'co-borrower':
        const isCheckValidCoBorrower =
          validateCoBorrowerRef.current?.validate() ?? true;

        if (!isCheckValidCoBorrower) {
          return;
        }
        if (checkDuplicateIdentity) {
          notify(
            'Giấy tờ định danh đã tồn tại vui lòng kiểm tra lại',
            'warning'
          );
          return;
        }

        dispatch(saveLegalCoBorrower(true));
        break;
      case 'co-payer':
        const isCheckValid = validateCoPayerRef.current?.validate() ?? true;

        if (!isCheckValid) {
          return;
        }
        if (checkDuplicateIdentity) {
          notify(
            'Giấy tờ định danh đã tồn tại vui lòng kiểm tra lại',
            'warning'
          );
          return;
        }

        dispatch(saveLegalCoPayer(true));
        break;
      case 'legal-related':
        if (checkDuplicateIdentity) {
          notify(
            'Giấy tờ định danh đã tồn tại vui lòng kiểm tra lại',
            'warning'
          );
          return;
        }

        dispatch(saveLegalRelated(true));
        break;
      case 'contact':
        if (checkDuplicateIdentity) {
          notify(
            'Giấy tờ định danh đã tồn tại vui lòng kiểm tra lại',
            'warning'
          );
          return;
        }
        if (valueList.length > 2) {
          notify('Vui lòng chọn tối đa 2 người liên hệ', 'warning');
          return;
        }

        dispatch(saveLegalContact(true));
        break;
      case 'other':
        if (checkDuplicateIdentity) {
          notify(
            'Giấy tờ định danh đã tồn tại vui lòng kiểm tra lại',
            'warning'
          );
          return;
        }

        const isCheckValidOther = validateOtherRef.current?.validate() ?? true;
        if (!isCheckValidOther) {
          return;
        }

        dispatch(saveLegalOther(true));
        break;
      default:
        break;
    }
  };

  const onChange = (_: number, next: number) => {
    navigate(`/loan/normal/init/${params.id}/legal/${DeclareName[next]}`);
    return true;
  };

  const onContinue = () => {
    const current = DeclareName.indexOf(params['*']);
    if (DeclareName[current] !== 'borrower' && dataFull?.borrower === null) {
      notify('Người vay chính chưa được khởi tạo', 'error');
      return;
    }
    const backPosition = current + 1;
    if (backPosition < 0) {
      navigate(`/loan/normal/init/${params.id}/product`);
      return;
    }
    if (!ruleDisabled) {
      const isValid = checkValidateForm();
      isValid && dispatch(onChangeContinue(backPosition));
    } else {
      // fix continue ruleDisabled
      const declareSteptLegal = [
        'BORROWER',
        'MARRIAGE',
        'CO_BRW',
        'CO_PAYER',
        'LAW_RLT',
        'RELATED',
        'OTHER',
      ];
      const currentStepName = declareSteptLegal[current];
      const indexCurrentStepName = declareLegalList.indexOf(currentStepName);
      const declareLegalContinue = pathNameLegalStoredToUrl(
        currentStepName === 'BORROWER'
          ? declareLegalList[0]
          : declareLegalList[indexCurrentStepName + 1]
      );
      if (declareLegalList[declareLegalList.length - 1] === currentStepName) {
        navigate(`/loan/normal/init/${params.id}/cic/other/borrower`);
      } else {
        navigate(
          `/loan/normal/init/${params.id}/legal/${declareLegalContinue}`
        );
      }
    }
  };

  const onBack = () => {
    const backPosition = current - 1;
    if (backPosition < 0) {
      navigate(`/loan/normal/init/${params.id}/product`);
      return;
    }
    dispatch(onChangeBack(backPosition));
  };

  const onExit = () => navigate('/');

  const handleOpenAttach = (step: StepItem) => {
    const value = String(step.value ?? '');
    if (value.includes('BORROWER') || value.includes('MARRIAGE')) {
      const [declare = '', uuid = ''] = value.split('<uuid>');
      if (!uuid) {
        notify('Vui lòng khởi tạo đối tượng', 'warning');
        return;
      }
      setUserAttachment({ declare, uuid });
      setOpenAttachment(true);
    }
  };

  const onDelete = () => {
    const current = DeclareName.indexOf(params['*']);
    switch (DeclareName[current]) {
      case 'borrower':
        dispatch(clearForm('BORROWER'));
        break;
      case 'marriage':
        dispatch(clearForm('MARRIAGE'));
        break;
      case 'co-borrower':
        dispatch(clearForm('CO_BRW'));
        break;
      case 'co-payer':
        dispatch(clearForm('CO_PAYER'));
        break;
      case 'legal-related':
        dispatch(clearForm('LAW_RLT'));
        break;
      case 'contact':
        dispatch(clearForm('RELATED'));
        break;
      case 'other':
        dispatch(clearForm('OTHER'));
        break;
      default:
        break;
    }
  };

  const onSaveMenu = (item: string) => {
    switch (item) {
      case ETypeButton.confirm:
        showBackdrop(true);
        dispatch(callControlComfirm({ title: '', position: dataPosition }));
        break;
      case ETypeButton.approve:
        showBackdrop(true);
        dispatch(callApprovalApprove({ title: '', position: dataPosition }));
        break;
      case ETypeButton.disconfirm:
        showBackdrop(true);
        dispatch(callDisConfirm({ title: '', position: dataPosition }));
        break;
      case ETypeButton.disapprove:
        showBackdrop(true);
        dispatch(callDisApproved({ title: '', position: dataPosition }));
        break;
      case ETypeButton.save:
        onSave();
        break;
    }
  };

  return (
    <Fragment>
      <Steps
        current={!!~current ? current : 0}
        attachLabel="tập tin"
        onChange={onChange}
        className="my-6 mscb-loan-normal-legal"
        // sx={SxSteps}
        onAttach={handleOpenAttach}
        steps={[
          {
            node: 'A',
            label: 'NGƯỜI VAY CHÍNH',
            hasSub: false,
            attachment: attachFileData.BORROWER ?? 0,
            completed: dataFull?.borrower !== null ? true : false,
            value: `BORROWER<uuid>${
              dataFull?.borrower?.basic_info?.uuid ?? ''
            }`,
          },
          {
            node: 'B',
            label: 'NGƯỜI HÔN PHỐI',
            attachment: attachFileData.MARRIAGE ?? 0,
            hasSub: false,
            disabled: !declareLegalList.find((x) => x === 'MARRIAGE'),
            completed:
              declareLegalList.find((x) => x === 'MARRIAGE') &&
              dataFull?.marriage !== null
                ? true
                : false,
            value: `MARRIAGE<uuid>${
              dataFull?.marriage?.basic_info?.uuid ?? ''
            }`,
          },
          {
            node: 'C',
            label: 'NGƯỜI ĐỒNG VAY',
            hasSub: false,
            disabled: !declareLegalList.find((x) => x === 'CO_BRW'),
            completed:
              declareLegalList.find((x) => x === 'CO_BRW') &&
              dataFull &&
              dataFull?.co_brw?.length > 0
                ? true
                : false,
            value: 'CO_BRW',
          },
          {
            node: 'D',
            label: 'NGƯỜI ĐỒNG TRẢ NỢ',
            hasSub: false,
            disabled: !declareLegalList.find((x) => x === 'CO_PAYER'),
            completed:
              declareLegalList.find((x) => x === 'CO_PAYER') &&
              dataFull &&
              dataFull?.co_payer?.length > 0
                ? true
                : false,
            value: 'CO_PAYER',
          },
          {
            node: 'E',
            label: 'NGƯỜI LIÊN QUAN THEO QĐPL',
            hasSub: false,
            disabled: !declareLegalList.find((x) => x === 'LAW_RLT'),
            completed:
              declareLegalList.find((x) => x === 'LAW_RLT') &&
              dataFull &&
              dataFull?.law_rlt?.length > 0
                ? true
                : false,
            value: 'LAW_RLT',
          },
          {
            node: 'F',
            label: 'NGƯỜI LIÊN HỆ',
            hasSub: false,
            isRequiredStepLabel: true,
            completed:
              dataFull &&
              (dataFull?.related?.other_person?.length ||
                dataFull?.related?.person_los?.length) > 0
                ? true
                : false,
            value: 'RELATED',
          },
          {
            node: 'G',
            label: 'ĐỐI TƯỢNG KHÁC',
            hasSub: false,
            disabled: !declareLegalList.find((x) => x === 'OTHER'),
            completed:
              declareLegalList.find((x) => x === 'OTHER') &&
              dataFull &&
              dataFull?.others?.length > 0
                ? true
                : false,
            value: 'OTHER',
          },
        ]}
      >
        <Routes>
          <Route
            path="borrower"
            element={<Borrower ref={validateBorrowerRef} />}
          />
        </Routes>
        <Routes>
          <Route
            path="marriage"
            element={<LOANNormalLegalMarriage ref={validateMarriageRef} />}
          />
        </Routes>
        <Routes>
          <Route
            path="co-borrower"
            element={<LOANNormalLegalCoBorrower ref={validateCoBorrowerRef} />}
          />
        </Routes>
        <Routes>
          <Route
            path="co-payer"
            element={<LOANNormalLegalCoPayer ref={validateCoPayerRef} />}
          />
        </Routes>
        <Routes>
          <Route
            path="legal-related"
            element={<LOANNormalLegalLegalRelated />}
          />
        </Routes>
        <Routes>
          <Route path="contact" element={<LOANNormalLegalContact />} />
        </Routes>
        <Routes>
          <Route
            path="other"
            element={<LOANNormalLegalOther ref={validateOtherRef} />}
          />
        </Routes>
      </Steps>
      {/* <Divider className="my-6" /> */}

      <ButtonBarRole
        className="mb-6"
        onSave={onSave}
        onBack={onBack}
        onExit={onExit}
        isApply={true}
        hideDelete={!ruleDisabled}
        hideSave={false}
        onDelete={onDelete}
        onBtnMenu={(val) => onSaveMenu(val)}
        onContinue={onContinue}
        positionCode={dataPosition}
        hideContinue={false}
      />

      {isOpen && (
        <AttachmentModalServices
          open={Boolean(isOpen)}
          onClose={() => setOpenAttachment(false)}
          uuidActive={userAttach.uuid}
        />
      )}
      <ModalAlertBlackList open={!!blacklistAlert} data={blacklistAlert} />
    </Fragment>
  );
};

export default LegalRoute;
