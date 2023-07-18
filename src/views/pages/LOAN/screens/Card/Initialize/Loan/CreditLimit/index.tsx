import { FC, useState } from 'react';
import { Grid } from '@mui/material';
import { Box } from "@mui/system";
import Radio, { RadioOption } from 'views/components/base/Radio';
import Select from 'views/components/base/Select';
// import clsx from 'clsx';
import Input from 'views/components/base/Input';
import TextArea from 'views/components/base/TextArea';
import CardInside from 'views/components/layout/CardInside';
// import { RiErrorWarningFill } from 'react-icons/ri';
// import { FaIdCard } from "react-icons/fa";
// import { useTranslation } from 'react-i18next';
import creditLimitStyle from './style';
// import ObjectList from 'views/components/layout/ObjectList';

const AnalysisData: RadioOption[] = [
	{ value: "yes", label: "Đã thẩm định thực tế và Khách hàng đủ khả năng thanh toán nợ, chi phí sinh hoạt và chi phí khác" },
	{ value: "no", label: "Đã thẩm định thực tế và Khách hàng không đủ khả năng thanh toán nợ, chi phí sinh hoạt và chi phí khác" },
  ];

const CreditLimit: FC = () => {
	const classes = creditLimitStyle();
	// const { t } = useTranslation();

	const [hasDetail, setHasDetail] = useState(true);
	const [isSelect, setIsSelect] = useState(false);

	// const BootstrapTooltip = styled(({ className, ...props }: TooltipProps) => (
	// 	<Tooltip {...props} arrow classes={{ popper: className }} />
	//   ))(({ theme }) => ({
	// 	[`& .${tooltipClasses.arrow}`]: {
	// 	  color: theme.palette.common.black,
	// 	},
	// 	[`& .${tooltipClasses.tooltip}`]: {
	// 	  backgroundColor: theme.palette.common.black,
	// 	},
	//   }));

	const handleTargetChange = () => {
		// Insert value change condition of target group credit limit here
		setHasDetail(false);
		setIsSelect(true);
	}

	return <Box className="pt-5">
		<Grid container columnSpacing='20px'>
			<Grid item xl={3} md={6} sm={12} className={classes.inputLabel}>
				<Input 
					label="1. Hạn mức thẻ theo nhóm đối tượng"
					required
					disabled
					onChange={handleTargetChange}
					value='Khách hàng nhận lương qua tài khoản SCB'
					className='inputDisabled'
				/>
			</Grid>
			{
				hasDetail ?
					isSelect 
					?
					<Grid item xl={3} md={6} sm={12} className={classes.inputLabel}>
					<Select 
						label="2. Chi tiết đối tượng" 
						options={[]}
					/>
					</Grid>
					:
					<Grid item xl={3} md={6} sm={12} className={classes.inputLabel}>
					<Input 
						label="2. Chi tiết đối tượng" 
						required
						disabled
						value='Theo lương'
						className='inputDisabled'
					/>
					</Grid>
				: <></>
			}
		</Grid>
		<Grid container columnSpacing='20px'>
			<Grid item xl={6} md={12} xs={12}>
				<CardInside title="I. Thông tin chi tiết" className={classes.root}>
					<Grid container columnSpacing="20" rowSpacing="20">
						<Grid item xl={6} md={6} sm={12} className={`${classes.inputLabel} text-danger`}>
							<Input 
								label="1. Hạn mức tối đa theo đối tượng (VND)" 
								value='200.000.000'
								disabled
								className='inputDisabled-red'
							/>
						</Grid>
						<Grid item xl={6} md={6} sm={12} className={classes.inputLabel}>
							<Input 
								label="2. Lương bình quân 03 tháng gần nhất (A) (VND)" 
								value='100.000.000'
							/>
						</Grid>
						<Grid item xl={6} md={6} sm={12} className={classes.inputLabel}>
							<Select
								label="3. Hệ số xét cấp thẻ theo lương (B)"
								options={[]}
							/>
						</Grid>
						<Grid item xl={6} md={6} sm={12} className={`${classes.inputLabel} text-danger`}>
							<Input 
								label="4. Hạn mức tối đa theo công thức (A) * (B) (VND)" 
								disabled
								value='200.000.000'
								className='inputDisabled-red hasException'
							/>
						</Grid>
						<Grid item xl={6} md={6} sm={12} className={classes.inputLabel}>
							<Input 
								label="5. Hạn mức tổng đơn vị đề xuất (VND)" 
								value='200.000.000'
							/>
						</Grid>
					</Grid>
				</CardInside>
			</Grid>
			<Grid item xl={6} md={12} xs={12}>
				<CardInside title="II. Phân tích / đánh giá" className={classes.root}>
					<Grid container columnSpacing="20" rowSpacing="20">
						<Grid item xs={12} className={classes.inputLabel}>
							<Radio
								variant="checkbox"
								name="analysis"
								options={AnalysisData}
								required={true}
								className="radio-analysis"
							/>
						</Grid>
						<Grid item xs={12} className={classes.inputLabel} style={{paddingTop: '10px'}}>
							<Select
								label="1. Đánh giá về phương án và nhu cầu vay vốn"
								options={[]}
							/>
						</Grid>
						<Grid item xs={12} className={classes.inputLabel}>
							<TextArea
								label="2. Nhận xét"
								className={classes.textarea}
							/>
						</Grid>
					</Grid>
				</CardInside>
			</Grid>
		</Grid>
	</Box>

}

export default CreditLimit;