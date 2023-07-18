import { FC, useState } from 'react';
import { Grid, Typography, IconButton, styled, Tooltip, tooltipClasses, TooltipProps } from '@mui/material';
import Radio from 'views/components/base/Radio';
import Select from 'views/components/base/Select';
// import clsx from 'clsx';
import Input from 'views/components/base/Input';
import { RiErrorWarningFill } from 'react-icons/ri';
import ObjectList from 'views/components/layout/ObjectList';
import { FaIdCard } from "react-icons/fa";
// import { useTranslation } from 'react-i18next';
import DetailInfoStyle from './style';
import { FiEdit } from 'react-icons/fi';

const DetailInfo: FC = () => {
	const classes = DetailInfoStyle();
	// const { t } = useTranslation();

	// const [hasDetail, setHasDetail] = useState(true);
    const [currentTarget, setCurrentTarget] = useState<string>('DT1');

    const BootstrapTooltip = styled(({ className, ...props }: TooltipProps) => (
		<Tooltip {...props} arrow classes={{ popper: className }} />
	  ))(({ theme }) => ({
		[`& .${tooltipClasses.arrow}`]: {
		  color: theme.palette.common.black,
		},
		[`& .${tooltipClasses.tooltip}`]: {
		  backgroundColor: theme.palette.common.black,
		},
	  }));

    const renderByTarget = () => {
        switch (currentTarget) {
            // Khách hàng nhận lương qua tài khoản SCB - Theo lương
            case "DT1":
                return (
					<Grid container columnSpacing="20" rowSpacing="20">
						<Grid item xl={6} md={12} sm={12} className={`${classes.inputLabel}`}>
							<Input 
								label="1. Tổ chức/Công ty/Đơn vị công tác hiện tại" 
								disabled
							/>
						</Grid>
						<Grid item xl={6} md={12} sm={12} className={`${classes.inputLabel} text-danger`}>
							<Input 
								label="2. Hạn mức tối đa theo đối tượng (VND)" 
								className='inputDisabled-red'
							/>
						</Grid>
						<Grid item xl={6} md={12} sm={12} className={classes.inputLabel}>
							<Select
								label="3. Lương bình quân 03 tháng gần nhất (A) (VND)"
								options={[]}
							/>
						</Grid>
						<Grid item xl={6} md={12} sm={12} className={`${classes.inputLabel}`}>
							<Input 
								label="4. Hệ số xét cấp thẻ theo lương (B)" 
								disabled
							/>
						</Grid>
						<Grid item xl={6} md={12} sm={12} className={`${classes.inputLabel} text-danger`}>
							<Input 
								label="5. Hạn mức tối đa theo quy định (VND)"
								className='inputDisabled-red'
							/>
						</Grid>
                        <Grid item xl={6} md={12} sm={12} className={`${classes.inputLabel} text-danger`}>
							<Input 
								label="6. Hạn mức tổng đơn vị đề xuất (VND)" 
							/>
						</Grid>
					</Grid>
                )
            // Khách hàng là Lãnh đạo/ Cán bộ Nhà nước cao cấp - Theo Chức danh
            case "DT2":
                return (
                    <Grid container columnSpacing="20" rowSpacing="20">
                        <Grid item xl={6} md={6} sm={12} className={classes.inputLabel}>
                            <Input 
                                label="1. Tên cơ quan/tổ chức công tác" 
                            />
                        </Grid>
                        <Grid item xl={6} md={6} sm={12} className={classes.inputLabel}>
                            <Input 
                                label="2. Chức danh" 
                            />
                        </Grid>
                        <Grid item xl={6} md={6} sm={12} className={classes.inputLabel}>
                            <Input
                                label="3. Hạn mức thẻ theo đối tượng (VND)"
                                disabled
                                className='inputDisabled-red'
                            />
                        </Grid>
                        <Grid item xl={6} md={6} sm={12} className={classes.inputLabel}>
                            <Input 
                                label="4. Hạn mức tổng đơn vị đề xuất (VND)" 
                            />
                        </Grid>
                    </Grid>
                )
            // KHCN đang có quan hệ tiền gửi tại SCB - Tiền gửi có kỳ hạn
            case "DT3A":
                return (
                    <Grid container columnSpacing="20" rowSpacing="20">
                        <Grid item xl={6} md={6} sm={12} className={classes.inputLabel}>
                            <Input 
                                label="1. Hạn mức tối đa theo đối tượng (VND)"
                                disabled
                                className='inputDisabled-red'
                            />
                        </Grid>
                        <Grid item xl={6} md={6} sm={12} className={classes.inputLabel}>
                            <Input 
                                label="2. Số dư tiền gửi hiện tại (A) (VND)" 
                            />
                        </Grid>
                        <Grid item xl={6} md={6} sm={12} className={classes.inputLabel}>
                            <Input
                                label="3. Số dư tiền gửi bình quân 06 tháng gần nhất (B) (VND)"
                            />
                        </Grid>
                        <Grid item xl={6} md={6} sm={12} className={classes.inputLabel}>
                            <Input 
                                label="4. Số dư cầm cố/phong tỏa hiện tại (C) (VND)" 
                            />
                        </Grid>
                        <Grid item xl={6} md={6} sm={12} className={classes.inputLabel}>
                            <Input 
                                label="5. Số dư tiền gửi cầm cố BT 6T gần nhất (D) (VND)" 
                            />
                        </Grid>
                        <Grid item xl={6} md={6} sm={12} className={classes.inputLabel}>
                            <Input 
                                label="6. Số dư tiền gửi hiện tại trừ khoản cầm cố (VND)"
                                disabled
                                className='inputDisabled-red hasException'
                                suffix={
									<BootstrapTooltip title="Ngoại lệ">
										<IconButton>
											<RiErrorWarningFill/>
										</IconButton>
									</BootstrapTooltip>
							  	}
                            />
                        </Grid>
                        <Grid item xl={6} md={6} sm={12} className={classes.inputLabel}>
                            <Input
                                label="7. Hạn mức tối đa theo công thức (VND)"
                                disabled
                                className='inputDisabled-red'
                            />
                        </Grid>
                        <Grid item xl={6} md={6} sm={12} className={classes.inputLabel}>
                            <Input 
                                label="8. Hạn mức tổng đơn vị đề xuất (VND)" 
                            />
                        </Grid>
                    </Grid>
                )
            // KHCN đang có quan hệ tiền gửi tại SCB - CASA
            case "DT3B":
                return (
                    <Grid container columnSpacing="20" rowSpacing="20">
                        <Grid item xl={6} md={6} sm={12} className={classes.inputLabel}>
                            <Input 
                                label="1. Hạn mức tối đa theo đối tượng (VND)"
                                disabled
                                className='inputDisabled-red'
                            />
                        </Grid>
                        <Grid item xl={6} md={6} sm={12} className={classes.inputLabel}>
                            <Input 
                                label="2. Số dư bình quân CASA 06 tháng gần nhất (A) (VND)" 
                            />
                        </Grid>
                        <Grid item xl={6} md={6} sm={12} className={`${classes.inputLabel} edit-casa `}>
                            <div className='edit'>
                                <FiEdit />
                                <span> Chỉnh sửa</span>
                            </div>
                            <Input
                                label="3. Hạn mức tối đa theo công thức (VND)"
                                disabled
                                className='inputDisabled-red'
                            />
                        </Grid>
                        <Grid item xl={6} md={6} sm={12} className={classes.inputLabel}>
                            <Input 
                                label="4. Hạn mức tổng đơn vị đề xuất (VND)" 
                            />
                        </Grid>
                    </Grid>
                )
            // Khách hàng cá nhân nắm giữ Trái phiếu
            case "DT4":
                return (
                    <Grid container columnSpacing="20" rowSpacing="20">
                        <Grid item xl={6} md={6} sm={12} className={classes.inputLabel}>
                            <Input 
                                label="1. Hạn mức tối đa theo đối tượng (VND)"
                                disabled
                                className='inputDisabled-red'
                            />
                        </Grid>
                        <Grid item xl={6} md={6} sm={12} className={classes.inputLabel}>
                            <Input 
                                label="2. Số dư trái phiếu hiện tại (VND)" 
                                disabled
                                className='inputDisabled-red hasException'
                                suffix={
									<BootstrapTooltip title="Ngoại lệ">
										<IconButton>
											<RiErrorWarningFill/>
										</IconButton>
									</BootstrapTooltip>
							  	}
                            />
                        </Grid>
                        <Grid item xl={6} md={6} sm={12} className={classes.inputLabel}>
                            <Input
                                label="3. Số dư bình quân 06 tháng gần nhất (A) (VND)"
                            />
                        </Grid>
                        <Grid item xl={6} md={6} sm={12} className={classes.inputLabel}>
                            <Input 
                                label="4. Hạn mức tối đa theo công thức (VND)"
                                disabled
                                className='inputDisabled-red'
                            />
                        </Grid>
                        <Grid item xl={6} md={6} sm={12} className={classes.inputLabel}>
                            <Input 
                                label="5. Hạn mức tổng đơn vị đề xuất (VND)" 
                            />
                        </Grid>
                    </Grid>
                )
            // KHCN được đánh giá là KHCN Premier của SCB - CASA
            case "DT5":
                return (
                    <Grid container columnSpacing="20" rowSpacing="20">
                        <Grid item sm={12} className={classes.inputLabel}>
							<Typography component="h3" className="text-14 mb-2 font-medium w-full">
								1. Đơn vị mở thẻ có cùng Đơn vị quản lý KH Premier hay không? <span style={{color: 'var(--mscb-danger)'}}>(*)</span>
							</Typography>
                            <Radio
                                variant="checkbox"
                                name="loanPremier"
                                options={[
                                    { value: "yes", label: "Có" },
                                    { value: "no", label: "Không" },
                                ]}
                            />
                        </Grid>
                        <Grid item xl={6} md={6} sm={12} className={classes.inputLabel}>
                            <Select 
                                label="2. Đơn vị quản lý khách hàng" 
                                options={[]}
                                disabled
                                className='inputDisabled'
                            />
                        </Grid>
                        <Grid item xl={6} md={6} sm={12} className={classes.inputLabel}>
                            <Input
                                label="3. Loại khách hàng Premier"
                                disabled
                                className='inputDisabled'
                            />
                        </Grid>
                        <Grid item xl={6} md={6} sm={12} className={classes.inputLabel}>
                            <Select 
                                label="4. Loại KH Premier dùng để xét cấp hạn mức thẻ"
                                options={[]}
                            />
                        </Grid>
                        <Grid item xl={6} md={6} sm={12} className={`${classes.inputLabel} text-danger`}>
                            <Input 
                                label="5. Hạn mức tối đa theo đối tượng (VND)"
                                disabled
                                className='inputDisabled-red'
                            />
                        </Grid>
                        <Grid item sm={12} className={classes.inputLabel}>
                            <i className="tio-square fa-xs" style={{ color: "#1825aa" }}></i>
                            <span style={{fontWeight: '500', color: 'var(--mscb-primary)'}}> THÔNG TIN TIÊU CHÍ</span>
                        </Grid>
                        <Grid item xl={6} md={6} sm={12} className={`${classes.inputLabel} text-danger`}>
                            <Input 
                                label="1. Số dư bình quân CASA 06 tháng gần nhất (VND)"
                                disabled
                                className='inputDisabled-red'
                            />
                        </Grid>
                        <Grid item xl={6} md={6} sm={12} className={`${classes.inputLabel} text-danger`}>
                            <Input 
                                label="2. 50% số dư bình quân CASA 06 tháng gần nhất (VND)"
                                disabled
                                className='inputDisabled-red'
                            />
                        </Grid>
                        <Grid item xl={6} md={6} sm={12} className={classes.inputLabel}>
                            <Input 
                                label="3. Kết quả theo tiêu chí CASA" 
                                disabled
                                className='inputDisabled'
                            />
                        </Grid>
                        <Grid item xl={6} md={6} sm={12} className={classes.inputLabel}>
                            <Input 
                                label="4. Hạn mức tổng đơn vị đề xuất (VND)" 
                            />
                        </Grid>
                    </Grid>
                )
            // KHCN được đánh giá là KHCN Premier của SCB - Tổng tài sản
            case "DT5B":
                return (
                    <Grid container columnSpacing="20" rowSpacing="20">
                        <Grid item sm={12} className={classes.inputLabel}>
							<Typography component="h3" className="text-14 mb-2 font-medium w-full">
								1. Đơn vị mở thẻ có cùng Đơn vị quản lý KH Premier hay không? <span style={{color: 'var(--mscb-danger)'}}>(*)</span>
							</Typography>
                            <Radio
                                variant="checkbox"
                                name="loanPremier"
                                options={[
                                    { value: "yes", label: "Có" },
                                    { value: "no", label: "Không" },
                                ]}
                            />
                        </Grid>
                        <Grid item xl={6} md={6} sm={12} className={classes.inputLabel}>
                            <Select 
                                label="2. Đơn vị quản lý khách hàng" 
                                options={[]}
                                disabled
                                className='inputDisabled'
                            />
                        </Grid>
                        <Grid item xl={6} md={6} sm={12} className={classes.inputLabel}>
                            <Input
                                label="3. Loại khách hàng Premier"
                                disabled
                                className='inputDisabled'
                            />
                        </Grid>
                        <Grid item xl={6} md={6} sm={12} className={classes.inputLabel}>
                            <Select 
                                label="4. Loại KH Premier dùng để xét cấp hạn mức thẻ"
                                options={[]}
                            />
                        </Grid>
                        <Grid item xl={6} md={6} sm={12} className={`${classes.inputLabel} text-danger`}>
                            <Input 
                                label="5. Hạn mức tối đa theo đối tượng (VND)"
                                disabled
                                className='inputDisabled-red'
                            />
                        </Grid>
                        <Grid item sm={12} className={classes.inputLabel}>
                            <i className="tio-square fa-xs" style={{ color: "#1825aa" }}></i>
                            <span style={{fontWeight: '500', color: 'var(--mscb-primary)'}}> THÔNG TIN TIÊU CHÍ</span>
                        </Grid>
                        <Grid item xl={6} md={6} sm={12} className={`${classes.inputLabel} text-danger`}>
                            <Input 
                                label="1. Tổng tài sản BQ 03 tháng gần nhất (VND)"
                                disabled
                                className='inputDisabled-red'
                            />
                        </Grid>
                        <Grid item xl={6} md={6} sm={12} className={`${classes.inputLabel} text-danger`}>
                            <Input 
                                label="2. Số dư tổng tài sản hiện tại (VND)"
                                disabled
                                className='inputDisabled-red'
                            />
                        </Grid>
                        <Grid item xl={6} md={6} sm={12} className={classes.inputLabel}>
                            <Input 
                                label="3. Kết quả theo tiêu chí tổng tài sản" 
                                disabled
                                className='inputDisabled'
                            />
                        </Grid>
                        <Grid item xl={6} md={6} sm={12} className={classes.inputLabel}>
                            <Input 
                                label="4. Hạn mức tổng đơn vị đề xuất (VND)" 
                            />
                        </Grid>
                    </Grid>
                )
            // KHCN được đánh giá là KHCN Premier của SCB - TOI
            case "DT5C":
                return (
                    <Grid container columnSpacing="20" rowSpacing="20">
                        <Grid item sm={12} className={classes.inputLabel}>
							<Typography component="h3" className="text-14 mb-2 font-medium w-full">
								1. Đơn vị mở thẻ có cùng Đơn vị quản lý KH Premier hay không? <span style={{color: 'var(--mscb-danger)'}}>(*)</span>
							</Typography>
                            <Radio
                                variant="checkbox"
                                name="loanPremier"
                                options={[
                                    { value: "yes", label: "Có" },
                                    { value: "no", label: "Không" },
                                ]}
                            />
                        </Grid>
                        <Grid item xl={6} md={6} sm={12} className={classes.inputLabel}>
                            <Select 
                                label="2. Đơn vị quản lý khách hàng"
                                options={[]}
                            />
                        </Grid>
                        <Grid item xl={6} md={6} sm={12} className={classes.inputLabel}>
                            <Input
                                label="3. Loại khách hàng Premier"
                                disabled
                                className='inputDisabled'
                            />
                        </Grid>
                        <Grid item xl={6} md={6} sm={12} className={classes.inputLabel}>
                            <Select 
                                label="4. Loại KH Premier dùng để xét cấp hạn mức thẻ"
                                options={[]}
                            />
                        </Grid>
                        <Grid item xl={6} md={6} sm={12} className={`${classes.inputLabel} text-danger`}>
                            <Input 
                                label="5. Hạn mức tối đa theo đối tượng (VND)"
                                disabled
                                className='inputDisabled-red'
                            />
                        </Grid>
                        <Grid item sm={12} className={classes.inputLabel}>
                            <i className="tio-square fa-xs" style={{ color: "#1825aa" }}></i>
                            <span style={{fontWeight: '500', color: 'var(--mscb-primary)'}}> THÔNG TIN TIÊU CHÍ</span>
                        </Grid>
                        <Grid item xl={6} md={6} sm={12} className={`${classes.inputLabel} text-danger`}>
                            <Input 
                                label="1. TOI bình quân 03 tháng gần nhất (VND)"
                                disabled
                                className='inputDisabled-red'
                            />
                        </Grid>
                        <Grid item xl={6} md={6} sm={12} className={`${classes.inputLabel} text-danger`}>
                            <Input 
                                label="2. Số dư tổng tài sản hiện tại (VND)"
                                disabled
                                className='inputDisabled-red'
                            />
                        </Grid>
                        <Grid item xl={6} md={6} sm={12} className={classes.inputLabel}>
                            <Input 
                                label="3. Kết quả theo tiêu chí TOI" 
                                disabled
                                className='inputDisabled'
                            />
                        </Grid>
                        <Grid item xl={6} md={6} sm={12} className={classes.inputLabel}>
                            <Input 
                                label="4. Hạn mức tổng đơn vị đề xuất (VND)" 
                            />
                        </Grid>
                    </Grid>
                )
            // Khách hàng là cổ đông SCB
            case "DT6":
                return (
                    <Grid container columnSpacing="20" rowSpacing="20">
                        <Grid item xl={6} md={6} sm={12} className={classes.inputLabel}>
                            <Input 
                                label="1. Hạn mức tối đa theo đối tượng (VND)"
                                disabled
                                className='inputDisabled-red'
                            />
                        </Grid>
                        <Grid item xl={6} md={6} sm={12} className={classes.inputLabel}>
                            <Input 
                                label="2. Tổng số cổ phần của KH (A) (VND)" 
                            />
                        </Grid>
                        <Grid item xl={6} md={6} sm={12} className={classes.inputLabel}>
                            <Input
                                label="3. Tổng mệnh giá cổ phần (B) (VND)"
                                disabled
                                className='inputDisabled-red'
                            />
                        </Grid>
                        <Grid item xl={6} md={6} sm={12} className={classes.inputLabel}>
                            <Input 
                                label="4. Hạn mức tối đa theo công thức (VND)"
                                disabled
                                className='inputDisabled-red'
                            />
                        </Grid>
                        <Grid item xl={6} md={6} sm={12} className={classes.inputLabel}>
                            <Input 
                                label="5. Hạn mức tổng đơn vị đề xuất (VND)" 
                            />
                        </Grid>
                    </Grid>
                )
            // Khách hàng cá nhân quan hệ tín dụng tại SCB
            case "DT7":
                return (
                    <Grid container columnSpacing="20" rowSpacing="20">
                        <Grid item xl={6} md={6} sm={12} className={classes.inputLabel}>
                            <Input 
                                label="1. Hạn mức tối đa theo đối tượng (VND)"
                                disabled
                                className='inputDisabled-red'
                            />
                        </Grid>
                        <Grid item xl={6} md={6} sm={12} className={classes.inputLabel}>
                            <Input 
                                label="2. Tỷ lệ chấp nhận tối đa theo quy định (A)"
                            />
                        </Grid>
                        <Grid item xl={6} md={6} sm={12} className={classes.inputLabel}>
                            <Input
                                label="3. Hạn mức tín dụng SCB đã cấp/sắp cấp (B) (VND)"
                            />
                        </Grid>
                        <Grid item xl={6} md={6} sm={12} className={classes.inputLabel}>
                            <Select 
                                label="4. Loại tài sản bảo đảm của khoản vay (*)"
                                options={[]}
                                required
                            />
                        </Grid>
                        <Grid item xl={6} md={6} sm={12} className={classes.inputLabel}>
                            <Input 
                                label="5. Hạn mức tối đa theo công thức (A*B) (VND)"
                                disabled
                                className='inputDisabled-red'
                            />
                        </Grid>
                        <Grid item xl={6} md={6} sm={12} className={classes.inputLabel}>
                            <Input 
                                label="6. Hạn mức tổng đơn vị đề xuất (VND)" 
                            />
                        </Grid>
                        <Grid item xl={6} md={6} sm={12} className={classes.inputLabel}>
                            <Select 
                                label="7. Đơn vị quản lý khách hàng"
                                options={[]}
                            />
                        </Grid>
                    </Grid>
                )
            // KH đã được thẩm định thẻ bởi các Ngân hàng uy tín
            case "DT8":
                return (
                    <Grid container columnSpacing="20" rowSpacing="20">
                        <Grid item xl={6} md={6} sm={12} className={classes.inputLabel}>
                            <Select 
                                label="1. Thẻ KH đang sở hữu của ngân hàng khác"
                                options={[]}
                            />
                        </Grid>
                        <Grid item xl={6} md={6} sm={12} className={classes.inputLabel}>
                            <Input 
                                label="2. Hạn mức tối đa theo đối tượng (VND)" 
                                disabled
                                className='inputDisabled-red'
                            />
                        </Grid>
                        <Grid item xl={6} md={6} sm={12} className={classes.inputLabel}>
                            <Input
                                label="3. Hạn mức thẻ đang sở hữu (A) (VND)"
                            />
                        </Grid>
                        <Grid item xl={6} md={6} sm={12} className={classes.inputLabel}>
                            <Select 
                                label="4. Thời gian sử dụng/sở hữu thẻ"
                                options={[]}
                            />
                        </Grid>
                        <Grid item xl={6} md={6} sm={12} className={classes.inputLabel}>
                            <Select 
                                label="5. Thời gian còn lại của thẻ"
                                options={[]}
                            />
                        </Grid>
                        <Grid item xl={6} md={6} sm={12} className={classes.inputLabel}>
                            <Select 
                                label="6. Số lượng tổ chức tín dụng khách hàng đang có thẻ"
                                options={[]}
                            />
                        </Grid>
                        <Grid item xl={6} md={6} sm={12} className={classes.inputLabel}>
                            <Input 
                                label="7. Hạn mức tối đa theo công thức (VND)"
                                disabled
                                className='inputDisabled-red'
                            />
                        </Grid>
                        <Grid item xl={6} md={6} sm={12} className={classes.inputLabel}>
                            <Input 
                                label="8. Hạn mức tổng đơn vị đề xuất (VND)" 
                            />
                        </Grid>
                    </Grid>
                )
            // Khách hàng là hội viên gia đình của KH Premier - TOI
            case "DT9":
                return (
                    <Grid container columnSpacing="20" rowSpacing="20">
                        <Grid item sm={12} className={classes.inputLabel}>
							<Typography component="h3" className="text-14 mb-2 font-medium w-full">
								1. Đơn vị mở thẻ có cùng Đơn vị quản lý KH Premier hay không? <span style={{color: 'var(--mscb-danger)'}}>(*)</span>
							</Typography>
                            <Radio
                                variant="checkbox"
                                name="loanPremier"
                                options={[
                                    { value: "yes", label: "Có" },
                                    { value: "no", label: "Không" },
                                ]}
                            />
                        </Grid>
                        <Grid item xl={6} md={6} sm={12} className={classes.inputLabel}>
                            <Select 
                                label="2. Đơn vị quản lý khách hàng" 
                                options={[]}
                                disabled
                                className='inputDisabled'
                            />
                        </Grid>
                        <Grid item xl={6} md={6} sm={12} className={classes.inputLabel}>
                            <Input
                                label="3. Số CIF người giới thiệu"
                                disabled
                                className='inputDisabled'
                            />
                        </Grid>
                        <Grid item xl={6} md={6} sm={12} className={classes.inputLabel}>
                            <Input
                                label="4. Họ tên người giới thiệu"
                                disabled
                                className='inputDisabled'
                            />
                        </Grid>
                        <Grid item xl={6} md={6} sm={12} className={classes.inputLabel}>
                            <Select 
                                label="5. Hạng hội viên xét cấp thẻ của người giới thiệu"
                                options={[]}
                            />
                        </Grid>
                        <Grid item xl={12} md={12} sm={12} className={`${classes.inputLabel} text-danger`}>
                            <Input 
                                label="6. Hạn mức tối đa theo đối tượng (VND)"
                                disabled
                                className='inputDisabled-red'
                            />
                        </Grid>
                        <Grid item xl={12} md={12} sm={12} className={`${classes.inputLabel} text-danger`}>
                            <Input 
                                label="7. Tổng HM thẻ tối đa của KH Premier và KH Premier Family"
                                disabled
                                className='inputDisabled-red'
                            />
                        </Grid>
                        <Grid item xl={12} md={12} sm={12} className={`${classes.inputLabel}`}>
                            <Input 
                                label="8. Tổng HM thẻ của KH Premier và KH Premier Family đã cấp"
                                disabled
                            />
                        </Grid>
                        <Grid item sm={12} className={classes.inputLabel}>
                            <i className="tio-square fa-xs" style={{ color: "#1825aa" }}></i>
                            <span style={{fontWeight: '500', color: 'var(--mscb-primary)'}}> THÔNG TIN TIÊU CHÍ</span>
                        </Grid>
                        <Grid item sm={12} className={`${classes.inputLabel} text-danger`}>
                            <Input 
                                label="1. TOI bình quân 3 tháng gần nhất (VND)"
                                disabled
                                className='inputDisabled-red'
                            />
                        </Grid>
                        <Grid item sm={12} className={`${classes.inputLabel} text-danger`}>
                            <Input 
                                label="2. Số dư Tổng tài sản hiện tại (không bao gồm các khoản cầm cố/phong tỏa)"
                                disabled
                                className='inputDisabled-red'
                            />
                        </Grid>
                        <Grid item xl={6} md={6} sm={12} className={classes.inputLabel}>
                            <Input 
                                label="3. Kết quả theo tiêu chí TOI" 
                                disabled
                                className='inputDisabled'
                            />
                        </Grid>
                        <Grid item xl={6} md={6} sm={12} className={classes.inputLabel}>
                            <Input 
                                label="4. Hạn mức tổng đơn vị đề xuất (VND)" 
                            />
                        </Grid>
                    </Grid>
                )
            // Khách hàng là hội viên gia đình của KH Premier - CASA
            case "DT9B":
                return (
                    <Grid container columnSpacing="20" rowSpacing="20">
                        <Grid item sm={12} className={classes.inputLabel}>
							<Typography component="h3" className="text-14 mb-2 font-medium w-full">
								1. Đơn vị mở thẻ có cùng Đơn vị quản lý KH Premier hay không? <span style={{color: 'var(--mscb-danger)'}}>(*)</span>
							</Typography>
                            <Radio
                                variant="checkbox"
                                name="loanPremier"
                                options={[
                                    { value: "yes", label: "Có" },
                                    { value: "no", label: "Không" },
                                ]}
                            />
                        </Grid>
                        <Grid item xl={6} md={6} sm={12} className={classes.inputLabel}>
                            <Select 
                                label="2. Đơn vị quản lý khách hàng" 
                                options={[]}
                                disabled
                                className='inputDisabled'
                            />
                        </Grid>
                        <Grid item xl={6} md={6} sm={12} className={classes.inputLabel}>
                            <Input
                                label="3. Số CIF người giới thiệu"
                                disabled
                                className='inputDisabled'
                            />
                        </Grid>
                        <Grid item xl={6} md={6} sm={12} className={classes.inputLabel}>
                            <Input
                                label="4. Họ tên người giới thiệu"
                                disabled
                                className='inputDisabled'
                            />
                        </Grid>
                        <Grid item xl={6} md={6} sm={12} className={classes.inputLabel}>
                            <Select 
                                label="5. Hạng hội viên xét cấp thẻ của người giới thiệu"
                                options={[]}
                            />
                        </Grid>
                        <Grid item xl={6} md={6} sm={12} className={`${classes.inputLabel} text-danger`}>
                            <Input 
                                label="6. Hạn mức tối đa theo đối tượng (VND)"
                                disabled
                                className='inputDisabled-red'
                            />
                        </Grid>
                        <Grid item xl={12} md={12} sm={12} className={`${classes.inputLabel} text-danger`}>
                            <Input 
                                label="7. Tổng HM thẻ tối đa của KH Premier và KH Premier Family"
                                disabled
                                className='inputDisabled-red'
                            />
                        </Grid>
                        <Grid item xl={12} md={12} sm={12} className={`${classes.inputLabel}`}>
                            <Input 
                                label="8. Tổng HM thẻ của KH Premier và KH Premier Family đã cấp"
                                disabled
                            />
                        </Grid>
                        <Grid item sm={12} className={classes.inputLabel}>
                            <i className="tio-square fa-xs" style={{ color: "#1825aa" }}></i>
                            <span style={{fontWeight: '500', color: 'var(--mscb-primary)'}}> THÔNG TIN TIÊU CHÍ</span>
                        </Grid>
                        <Grid item sm={12} className={`${classes.inputLabel} text-danger`}>
                            <Input 
                                label="1. Số dư bình quân CASA 06 tháng gần nhất (VND)"
                                disabled
                                className='inputDisabled-red'
                            />
                        </Grid>
                        <Grid item sm={12} className={classes.inputLabel}>
                            <Input 
                                label="2. Kết quả theo tiêu chí CASA"
                                disabled
                                className='inputDisabled'
                            />
                        </Grid>
                        <Grid item xl={6} md={6} sm={12} className={classes.inputLabel}>
                            <Input 
                                label="3. Hạn mức tổng đơn vị đề xuất (VND)" 
                            />
                        </Grid>
                    </Grid>
                )
            // Khách hàng là hội viên gia đình của KH Premier - Tổng tài sản
            case "DT9C":
                return (
                    <Grid container columnSpacing="20" rowSpacing="20">
                        <Grid item sm={12} className={classes.inputLabel}>
							<Typography component="h3" className="text-14 mb-2 font-medium w-full">
								1. Đơn vị mở thẻ có cùng Đơn vị quản lý KH Premier hay không? <span style={{color: 'var(--mscb-danger)'}}>(*)</span>
							</Typography>
                            <Radio
                                variant="checkbox"
                                name="loanPremier"
                                options={[
                                    { value: "yes", label: "Có" },
                                    { value: "no", label: "Không" },
                                ]}
                            />
                        </Grid>
                        <Grid item xl={6} md={6} sm={12} className={classes.inputLabel}>
                            <Select 
                                label="2. Đơn vị quản lý khách hàng" 
                                options={[]}
                                disabled
                            />
                        </Grid>
                        <Grid item xl={6} md={6} sm={12} className={classes.inputLabel}>
                            <Input
                                label="3. Số CIF người giới thiệu"
                                disabled
                                className='inputDisabled'
                            />
                        </Grid>
                        <Grid item xl={6} md={6} sm={12} className={classes.inputLabel}>
                            <Input
                                label="4. Họ tên người giới thiệu"
                                disabled
                                className='inputDisabled'
                            />
                        </Grid>
                        <Grid item xl={6} md={6} sm={12} className={classes.inputLabel}>
                            <Select 
                                label="5. Hạng hội viên xét cấp thẻ của người giới thiệu"
                                options={[]}
                            />
                        </Grid>
                        <Grid item xl={6} md={6} sm={12} className={`${classes.inputLabel} text-danger`}>
                            <Input 
                                label="6. Hạn mức tối đa theo đối tượng (VND)"
                                disabled
                                className='inputDisabled-red'
                            />
                        </Grid>
                        <Grid item xl={12} md={12} sm={12} className={`${classes.inputLabel} text-danger`}>
                            <Input 
                                label="7. Tổng HM thẻ tối đa của KH Premier và KH Premier Family"
                                disabled
                                className='inputDisabled-red'
                            />
                        </Grid>
                        <Grid item xl={12} md={12} sm={12} className={`${classes.inputLabel}`}>
                            <Input 
                                label="8. Tổng HM thẻ của KH Premier và KH Premier Family đã cấp"
                                disabled
                            />
                        </Grid>
                        <Grid item sm={12} className={classes.inputLabel}>
                            <i className="tio-square fa-xs" style={{ color: "#1825aa" }}></i>
                            <span style={{fontWeight: '500', color: 'var(--mscb-primary)'}}> THÔNG TIN TIÊU CHÍ</span>
                        </Grid>
                        <Grid item sm={12} className={`${classes.inputLabel} text-danger`}>
                            <Input 
                                label="1. Tổng tài sản bình quân 03 tháng gần nhất (VND)"
                                disabled
                                className='inputDisabled-red'
                            />
                        </Grid>
                        <Grid item sm={12} className={`${classes.inputLabel} text-danger`}>
                            <Input 
                                label="2. Số dư Tổng tài sản hiện tại (không bao gồm các khoản cầm cố/phong tỏa)"
                                disabled
                                className='inputDisabled-red'
                            />
                        </Grid>
                        <Grid item xl={6} md={6} sm={12} className={classes.inputLabel}>
                            <Input 
                                label="3. Kết quả theo tiêu chí tổng tài sản" 
                                disabled
                                className='inputDisabled'
                            />
                        </Grid>
                        <Grid item xl={6} md={6} sm={12} className={classes.inputLabel}>
                            <Input 
                                label="4. Hạn mức tổng đơn vị đề xuất (VND)" 
                            />
                        </Grid>
                    </Grid>
                )
            // Đối tượng liên kết Showroom ô tô
            case "DT10":
                return (
                    <Grid container columnSpacing="20" rowSpacing="20">
                        <Grid item xl={6} md={6} sm={12} className={`${classes.inputLabel} text-danger`}>
                            <Input 
                                label="1. Hạn mức tối đa theo đối tượng (VND)"
                                disabled
                                className='inputDisabled-red'
                            />
                        </Grid>
                        <Grid item xl={6} md={6} sm={12} className={classes.inputLabel}>
                            <Input 
                                label="2. Tên đối tác liên kết" 
                            />
                        </Grid>
                        <Grid item xl={6} md={6} sm={12} className={classes.inputLabel}>
                            <Input
                                label="3. Giá trị ô tô (VND)"
                            />
                        </Grid>
                        <Grid item xl={6} md={6} sm={12} className={`${classes.inputLabel} text-danger`}>
                            <Input 
                                label="4. Hạn mức tối đa theo công thức (VND)"
                                disabled
                                className='inputDisabled-red'
                            />
                        </Grid>
                        <Grid item xl={6} md={6} sm={12} className={classes.inputLabel}>
                            <Input 
                                label="5. Hạn mức tổng đơn vị đề xuất (VND)" 
                            />
                        </Grid>
                    </Grid>
                )
            // ĐTLK thuộc lĩnh vực thẩm mỹ có xâm lấn
            case "DT11":
                return (
                    <Grid container columnSpacing="20" rowSpacing="20">
                        <Grid item xl={6} md={6} sm={12} className={`${classes.inputLabel} text-danger`}>
                            <Input 
                                label="1. Hạn mức tối đa theo đối tượng (VND)"
                                disabled
                                className='inputDisabled-red'
                            />
                        </Grid>
                        <Grid item xl={6} md={6} sm={12} className={classes.inputLabel}>
                            <Input 
                                label="2. Đối tác liên kết" 
                            />
                        </Grid>
                        <Grid item xl={6} md={6} sm={12} className={classes.inputLabel}>
							<Typography component="h3" className="text-14 mb-2 font-medium w-full">
                                3. KH có phải là KH hiện hữu của đối tác hay không?
							</Typography>
                            <Radio
                                variant="checkbox"
                                name="loanPartnerCurrentClient"
                                options={[
                                    { value: "yes", label: "Có" },
                                    { value: "no", label: "Không" },
                                ]}
                            />
                        </Grid>
                        <Grid item xl={6} md={6} sm={12} className={classes.inputLabel}>
                            <Input
                                label="4. Tổng giá trị hóa đơn KH đã thanh toán (A) (VND)"
                            />
                        </Grid>
                        <Grid item xl={6} md={6} sm={12} className={`${classes.inputLabel} text-danger`}>
                            <Input 
                                label="5. Hạn mức tối đa theo công thức (VND)"
                                disabled
                                className='inputDisabled-red'
                            />
                        </Grid>
                        <Grid item xl={6} md={6} sm={12} className={classes.inputLabel}>
                            <Input 
                                label="6. Hạn mức tổng đơn vị đề xuất (VND)" 
                            />
                        </Grid>
                    </Grid>
                )
            // Khách hàng tham gia các sản phẩm bảo hiểm - Bảo hiểm Manulife tại SCB
            case "DT12":
                return (
                    <Grid container columnSpacing="20" rowSpacing="20">
                        <Grid item xl={6} md={6} sm={12} className={`${classes.inputLabel} text-danger`}>
                            <Input 
                                label="1. Hạn mức tối đa theo đối tượng (VND)"
                                disabled
                                className='inputDisabled-red'
                            />
                        </Grid>
                        <Grid item xl={6} md={6} sm={12} className={classes.inputLabel}>
                            <Input 
                                label="2. Phí đóng bảo hiểm Manulife theo năm (A) (VND)" 
                            />
                        </Grid>
                        <Grid item xl={6} md={6} sm={12} className={`${classes.inputLabel} text-danger`}>
                            <Input 
                                label="3. Hạn mức tối đa theo công thức (VND)"
                                disabled
                                className='inputDisabled-red'
                            />
                        </Grid>
                        <Grid item xl={6} md={6} sm={12} className={classes.inputLabel}>
                            <Input 
                                label="4. Hạn mức tổng đơn vị đề xuất (VND)" 
                            />
                        </Grid>
                    </Grid>
                )
            // Khách hàng tham gia các sản phẩm bảo hiểm - Bảo hiểm xe ô tô Bảo Long
            case "DT13":
                return (
                    <Grid container columnSpacing="20" rowSpacing="20">
                        <Grid item xl={6} md={6} sm={12} className={`${classes.inputLabel} text-danger`}>
                            <Input 
                                label="1. Hạn mức tối đa theo đối tượng (VND)"
                                disabled
                                className='inputDisabled-red'
                            />
                        </Grid>
                        <Grid item xl={6} md={6} sm={12} className={classes.inputLabel}>
                            <Input 
                                label="2. Giá trị bảo hiểm xe ô tô Bảo Long (VND)" 
                            />
                        </Grid>
                        <Grid item xl={6} md={6} sm={12} className={`${classes.inputLabel} text-danger`}>
                            <Input 
                                label="3. Hạn mức tối đa theo công thức (VND)"
                                disabled
                                className='inputDisabled-red'
                            />
                        </Grid>
                        <Grid item xl={6} md={6} sm={12} className={classes.inputLabel}>
                            <Input 
                                label="4. Hạn mức tổng đơn vị đề xuất (VND)" 
                            />
                        </Grid>
                    </Grid>
                )
            // Khách hàng tham gia các sản phẩm bảo hiểm - Bảo hiểm sức khỏe Bảo Long
            case "DT13B":
                return (
                    <Grid container columnSpacing="20" rowSpacing="20">
                        <Grid item xl={6} md={6} sm={12} className={`${classes.inputLabel} text-danger`}>
                            <Input 
                                label="1. Hạn mức tối đa theo đối tượng (VND)"
                                disabled
                                className='inputDisabled-red'
                            />
                        </Grid>
                        <Grid item xl={6} md={6} sm={12} className={`${classes.inputLabel} text-danger`}>
                            <Input 
                                label="2. Hạn mức tối đa theo công thức (VND)"
                                disabled
                                className='inputDisabled-red'
                            />
                        </Grid>
                        <Grid item xl={6} md={6} sm={12} className={classes.inputLabel}>
                            <Input 
                                label="3. Hạn mức tổng đơn vị đề xuất (VND)" 
                            />
                        </Grid>
                    </Grid>
                )
            // Khách hàng có con đi du học nước ngoài/con học ...
            case "DT14":
                return (
                    <Grid container columnSpacing="20" rowSpacing="20">
                        <Grid item xl={6} md={6} sm={12} className={`${classes.inputLabel} text-danger`}>
                            <Input 
                                label="1. Hạn mức tối đa theo đối tượng (VND)"
                                disabled
                                className='inputDisabled-red'
                            />
                        </Grid>
                        <Grid item xl={6} md={6} sm={12} className={classes.inputLabel}>
                            <Input 
                                label="2. Tổng học phí năm (A) (VND)"
                            />
                        </Grid>
                        <Grid item xl={6} md={6} sm={12} className={classes.inputLabel}>
							<Typography component="h3" className="text-14 mb-2 font-medium w-full">
                                3. Đã thanh toán học phí cho kỳ học gần nhất?	
							</Typography>
                            <Radio
                                variant="checkbox"
                                name="schoolFeePaid"
                                options={[
                                    { value: "yes", label: "Có" },
                                    { value: "no", label: "Không" },
                                ]}
                            />
                        </Grid>
                        <Grid item xl={6} md={6} sm={12} className={classes.inputLabel}>
                            <Input 
                                label="4. Hạn mức tối đa theo công thức (VND)"
                            />
                        </Grid>
                        <Grid item xl={6} md={6} sm={12} className={classes.inputLabel}>
                            <Input 
                                label="5. Hạn mức tổng đơn vị đề xuất (VND)" 
                            />
                        </Grid>
                        <Grid item sm={12} className={classes.inputLabel}>
                            <i className="tio-square fa-xs" style={{ color: "#1825aa" }}></i>
                            <span style={{fontWeight: '500', color: 'var(--mscb-primary)'}}> THÔNG TIN CON KHÁCH HÀNG</span>
                        </Grid>
                        <Grid item xs={12} className='pt-0'>
                            <ObjectList
                                labelLength="Số lượng:"
                                options={[
                                { label: 'Nguyễn Nhi' },
                                { label: 'Nguyễn Sang' },
                                ]}
								className={`${classes.objectListClass}  `}
                                enableMenu={false}
                                onAdd={() => { }}
                            />
                        </Grid>
                        <Grid item xl={6} md={6} sm={12} className={classes.inputLabel}>
                            <Input 
                                label="1. Tên con khách hàng" 
                            />
                        </Grid>
                        <Grid item xl={6} md={6} sm={12} className={classes.inputLabel}>
                            <Input 
                                label="2. Trường học của con" 
                            />
                        </Grid>
                    </Grid>
                )
            // Khách hàng phong tỏa tiền gửi có kỳ hạn
            case "DT15":
                return (
                    <Grid container columnSpacing="20" rowSpacing="20">
                        <Grid item xl={6} md={6} sm={12} className={`${classes.inputLabel} text-danger`}>
                            <Input 
                                label="1. Hạn mức tối đa theo đối tượng (VND)"
                                disabled
                                className='inputDisabled-red'
                            />
                        </Grid>
                        <Grid item xl={6} md={6} sm={12} className={`${classes.inputLabel} text-danger`}>
                            <Input 
                                label="2. Tổng giá trị sổ tiết kiệm phong tỏa (A) (VND)"
                                disabled
                                className='inputDisabled-red'
                            />
                        </Grid>
                        <Grid item xl={6} md={6} sm={12} className={`${classes.inputLabel} text-danger`}>
                            <Input 
                                label="3. Hạn mức tối đa theo công thức (VND)"
                                disabled
                                className='inputDisabled-red'
                            />
                        </Grid>
                        <Grid item xl={6} md={6} sm={12} className={classes.inputLabel}>
                            <Input 
                                label="4. Hạn mức tổng đơn vị đề xuất (VND)" 
                            />
                        </Grid>
                        <Grid item sm={12} className={classes.inputLabel}>
                            <i className="tio-square fa-xs" style={{ color: "#1825aa" }}></i>
                            <span style={{fontWeight: '500', color: 'var(--mscb-primary)'}}> THÔNG TIN SỔ TIẾT KIỆM</span>
                        </Grid>
                        <Grid item xs={12} className='pt-0'>
                            <ObjectList
                                labelLength="Số lượng:"
                                options={[
                                { label: 'STK 01', circle: <FaIdCard /> },
                                { label: 'STK 02', circle: <FaIdCard /> },
                                ]}
								className={`${classes.objectListClass}  `}
                                enableMenu={false}
                                onAdd={() => { }}
                            />
                        </Grid>
                        <Grid item xl={6} md={6} sm={12} className={classes.inputLabel}>
                            <Input 
                                label="1. Số tài khoản tiết kiệm dùng để phong tỏa"
                                type="number"
                            />
                        </Grid>
                        <Grid item xl={6} md={6} sm={12} className={classes.inputLabel}>
                            <Input 
                                label="2. Mệnh giá sổ tiết kiệm (VND)" 
                            />
                        </Grid>
                    </Grid>
                )
            // Khách hàng thực hiện ký quỹ
            case "DT16":
                return (
                    <Grid container columnSpacing="20" rowSpacing="20">
                        <Grid item xl={6} md={6} sm={12} className={`${classes.inputLabel} text-danger`}>
                            <Input 
                                label="1. Hạn mức tối đa theo đối tượng (VND)"
                                disabled
                                className='inputDisabled-red'
                            />
                        </Grid>
                        <Grid item xl={6} md={6} sm={12} className={`${classes.inputLabel} text-danger`}>
                            <Input 
                                label="2. Tổng số tiền thực hiện ký quỹ (A) (VND)"
                                disabled
                                className='inputDisabled-red'
                            />
                        </Grid>
                        <Grid item xl={6} md={6} sm={12} className={`${classes.inputLabel} text-danger`}>
                            <Input 
                                label="3. Hạn mức tối đa theo công thức (VND)"
                                disabled
                                className='inputDisabled-red'
                            />
                        </Grid>
                        <Grid item xl={6} md={6} sm={12} className={classes.inputLabel}>
                            <Input 
                                label="4. Hạn mức tổng đơn vị đề xuất (VND)" 
                            />
                        </Grid>
                        <Grid item sm={12} className={classes.inputLabel}>
                            <i className="tio-square fa-xs" style={{ color: "#1825aa" }}></i>
                            <span style={{fontWeight: '500', color: 'var(--mscb-primary)'}}> THÔNG TIN SỐ TÀI KHOẢN</span>
                        </Grid>
                        <Grid item xs={12} className='pt-0'>
                            <ObjectList
                                labelLength="Số lượng:"
                                options={[
                                    { label: 'STK 01', circle: <FaIdCard /> },
                                    { label: 'STK 02', circle: <FaIdCard /> },
                                ]}
								className={`${classes.objectListClass}  `}
                                enableMenu={false}
                                onAdd={() => { }}
                            />
                        </Grid>
                        <Grid item xl={6} md={6} sm={12} className={classes.inputLabel}>
                            <Input 
                                label="1. Số tài khoản ký quỹ"
                                type="number"
                            />
                        </Grid>
                        <Grid item xl={6} md={6} sm={12} className={classes.inputLabel}>
                            <Input 
                                label="2. Số dư tài khoản ký quỹ (VND)" 
                            />
                        </Grid>
                    </Grid>
                )
            // Khách hàng cầm cố tiền gửi có kỳ hạn mở tại SCB
            case "DT17":
                return (
                    <Grid container columnSpacing="20" rowSpacing="20">
                        <Grid item xl={6} md={6} sm={12} className={`${classes.inputLabel} text-danger`}>
                            <Input 
                                label="1. Hạn mức tối đa theo đối tượng (VND)"
                                disabled
                                className='inputDisabled-red'
                            />
                        </Grid>
                        <Grid item xl={6} md={6} sm={12} className={`${classes.inputLabel} text-danger`}>
                            <Input 
                                label="2. Tổng số dư tiền gửi dùng để cầm cố (A) (VND)"
                                disabled
                                className='inputDisabled-red'
                            />
                        </Grid>
                        <Grid item xl={6} md={6} sm={12} className={`${classes.inputLabel} text-danger`}>
                            <Input 
                                label="3. Hạn mức tối đa theo công thức (VND)"
                                disabled
                                className='inputDisabled-red'
                            />
                        </Grid>
                        <Grid item xl={6} md={6} sm={12} className={classes.inputLabel}>
                            <Input 
                                label="4. Hạn mức tổng đơn vị đề xuất (VND)" 
                            />
                        </Grid>
                        <Grid item sm={12} className={classes.inputLabel}>
                            <i className="tio-square fa-xs" style={{ color: "#1825aa" }}></i>
                            <span style={{fontWeight: '500', color: 'var(--mscb-primary)'}}> THÔNG TIN SỔ TÀI KHOẢN</span>
                        </Grid>
                        <Grid item xs={12} className='pt-0'>
                            <ObjectList
                                labelLength="Số lượng:"
                                options={[
                                    { label: 'STK 01', circle: <FaIdCard /> },
                                    { label: 'STK 02', circle: <FaIdCard /> },
                                ]}
								className={`${classes.objectListClass}  `}
                                enableMenu={false}
                                onAdd={() => { }}
                            />
                        </Grid>
                        <Grid item xl={6} md={6} sm={12} className={classes.inputLabel}>
                            <Input 
                                label="1. Số tài khoản tiết kiệm dùng để cầm cố"
                                type="number"
                            />
                        </Grid>
                        <Grid item xl={6} md={6} sm={12} className={classes.inputLabel}>
                            <Input 
                                label="2. Mệnh giá sổ tiết kiệm (VND)" 
                            />
                        </Grid>
                        <Grid item xl={6} md={6} sm={12} className={classes.inputLabel}>
                            <Input 
                                label="3. Họ tên chủ sổ tiết kiệm" 
                            />
                        </Grid>
                    </Grid>
                )
            // Khách hàng do lãnh đạo SCB giới thiệu
            case "DT18":
                return (
                    <Grid container columnSpacing="20" rowSpacing="20">
                        <Grid item xl={6} md={6} sm={12} className={`${classes.inputLabel} text-danger`}>
                            <Input 
                                label="1. Hạn mức tối đa theo đối tượng (VND)"
                                disabled
                                className='inputDisabled-red'
                            />
                        </Grid>
                        <Grid item xl={6} md={6} sm={12} className={classes.inputLabel}>
                            <Input 
                                label="2. Họ tên lãnh đạo giới thiệu"
                            />
                        </Grid>
                        <Grid item xl={6} md={6} sm={12} className={classes.inputLabel}>
                            <Input 
                                label="3. Email người giới thiệu"
                            />
                        </Grid>
                        <Grid item xl={6} md={6} sm={12} className={classes.inputLabel}>
                            <Input 
                                label="4. Chức danh lãnh đạo giới thiệu"
                            />
                        </Grid>
                        <Grid item xl={6} md={6} sm={12} className={classes.inputLabel}>
                            <Input 
                                label="5. Hạn mức tổng đơn vị đề xuất (VND)" 
                            />
                        </Grid>
                    </Grid>
                )
            // Khách hàng thế chấp bất động sản 
            case "DT19":
                return (
                    <Grid container columnSpacing="20" rowSpacing="20">
                        <Grid item xl={6} md={6} sm={12} className={`${classes.inputLabel} text-danger`}>
                            <Input 
                                label="1. Hạn mức tối đa theo đối tượng (VND)"
                                disabled
                                className='inputDisabled-red'
                            />
                        </Grid>
                        <Grid item xl={6} md={6} sm={12} className={classes.inputLabel}>
                            <Input 
                                label="2. Tỷ lệ chấp nhận tối đa theo quy định (%)"
                            />
                        </Grid>
                        <Grid item xl={6} md={6} sm={12} className={classes.inputLabel}>
                            <Input 
                                label="3. Giá trị tài sản bảo đảm theo định giá (VND)"
                            />
                        </Grid>
                        <Grid item xl={6} md={6} sm={12} className={classes.inputLabel}>
                            <Input 
                                label="4. Tổng giá trị dư nợ do tài sản bảo đảm đảm bảo (VND)"
                            />
                        </Grid>
                        <Grid item xl={6} md={6} sm={12} className={classes.inputLabel}>
                            <Input 
                                label="5. Tỷ lệ cho vay tối đa/Giá trị TSBĐ (%) (LTV MAX)"
                            />
                        </Grid>
                        <Grid item xl={6} md={6} sm={12} className={classes.inputLabel}>
                            <Input 
                                label="6. Giá trị TSBĐ cho hạn mức thẻ tín dụng (VND)"
                            />
                        </Grid>
                        <Grid item xl={6} md={6} sm={12} className={`${classes.inputLabel} text-danger`}>
                            <Input 
                                label="7. Hạn mức tối đa theo công thức (VND)"
                                disabled
                                className='inputDisabled-red'
                            />
                        </Grid>
                        <Grid item xl={6} md={6} sm={12} className={classes.inputLabel}>
                            <Input 
                                label="8. Hạn mức tổng đơn vị đề xuất (VND)" 
                            />
                        </Grid>
                    </Grid>
                )
            // Đối tác liên kết còn lại
            case "DT20":
                return (
                    <Grid container columnSpacing="20" rowSpacing="20">
                        <Grid item xl={6} md={6} sm={12} className={`${classes.inputLabel} text-danger`}>
                            <Input 
                                label="1. Hạn mức tối đa theo đối tượng (VND)"
                                disabled
                                className='inputDisabled-red'
                            />
                        </Grid>
                        <Grid item xl={6} md={6} sm={12} className={classes.inputLabel}>
                            <Input 
                                label="2. Đối tác liên kết" 
                            />
                        </Grid>
                        <Grid item xl={6} md={6} sm={12} className={classes.inputLabel}>
							<Typography component="h3" className="text-14 mb-2 font-medium w-full">
                                3. KH có phải là KH hiện hữu của đối tác hay không?
							</Typography>
                            <Radio
                                variant="checkbox"
                                name="loanPartnerCurrentClient"
                                options={[
                                    { value: "yes", label: "Có" },
                                    { value: "no", label: "Không" },
                                ]}
                            />
                        </Grid>
                        <Grid item xl={6} md={6} sm={12} className={classes.inputLabel}>
                            <Input
                                label="4. Tổng giá trị hóa đơn KH đã thanh toán (VND) (A)"
                            />
                        </Grid>
                        <Grid item xl={6} md={6} sm={12} className={`${classes.inputLabel} text-danger`}>
                            <Input 
                                label="5. Hạn mức tối đa theo công thức (VND)"
                                disabled
                                className='inputDisabled-red'
                            />
                        </Grid>
                        <Grid item xl={6} md={6} sm={12} className={classes.inputLabel}>
                            <Input 
                                label="6. Hạn mức tổng đơn vị đề xuất (VND)" 
                            />
                        </Grid>
                    </Grid>
                )
            // Khách hàng là cán bộ nhân viên SCB
            case "DT21":
                return (
                    <Grid container columnSpacing="20" rowSpacing="20">
                        <Grid item xl={6} md={6} sm={12} className={classes.inputLabel}>
                            <Input
                                label="1. Chức danh"
                            />
                        </Grid>
                        <Grid item xl={6} md={6} sm={12} className={`${classes.inputLabel} text-danger`}>
                            <Input 
                                label="2. Hạn mức tối đa theo đối tượng (VND)"
                                disabled 
                                className='inputDisabled-red'
                            />
                        </Grid>
                        <Grid item xl={6} md={6} sm={12} className={classes.inputLabel}>
                            <Input 
                                label="3. Hạn mức tổng đơn vị đề xuất (VND)" 
                            />
                        </Grid>
                    </Grid>
                )
            // KH là CBNV thuộc các Đơn vị có 50% vốn nhà nước - Theo lương
            case "DT22A":
                return (
                    <Grid container columnSpacing="20" rowSpacing="20">
                        <Grid item xl={6} md={6} sm={12} className={`${classes.inputLabel} text-danger`}>
                            <Input 
                                label="1. Hạn mức tối đa theo đối tượng (VND)"
                                disabled
                                className='inputDisabled-red'
                            />
                        </Grid>
                        <Grid item xl={6} md={6} sm={12} className={classes.inputLabel}>
                            <Input 
                                label="2. Lương bình quân 03 tháng gần nhất (A) (VND)"
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
                                className='inputDisabled-red'
                            />
                        </Grid>
                        <Grid item xl={6} md={6} sm={12} className={classes.inputLabel}>
                            <Input 
                                label="5. Hạn mức tổng đơn vị đề xuất (VND)" 
                            />
                        </Grid>
                    </Grid>
                )
            // KH là CBNV thuộc các Đơn vị có 50% vốn nhà nước - Theo chức danh
            case "DT22B":
                return (
                    <Grid container columnSpacing="20" rowSpacing="20">
                        <Grid item xl={6} md={6} sm={12} className={classes.inputLabel}>
                            <Input 
                                label="1. Tên cơ quan/tổ chức công tác"
                            />
                        </Grid>
                        <Grid item xl={6} md={6} sm={12} className={classes.inputLabel}>
                            <Input 
                                label="2. Chức danh"
                            />
                        </Grid>
                        <Grid item xl={6} md={6} sm={12} className={`${classes.inputLabel} text-danger`}>
                            <Input 
                                label="3. Hạn mức thẻ theo đối tượng (VND)"
                                disabled
                                className='inputDisabled-red'
                            />
                        </Grid>
                        <Grid item xl={6} md={6} sm={12} className={classes.inputLabel}>
                            <Input 
                                label="4. Hạn mức tổng đơn vị đề xuất (VND)" 
                            />
                        </Grid>
                    </Grid>
                )
            // KH đang làm việc tại các Ngân hàng - Theo lương
            case "DT23A":
                return (
                    <Grid container columnSpacing="20" rowSpacing="20">
                        <Grid item xl={6} md={6} sm={12} className={`${classes.inputLabel} text-danger`}>
                            <Input 
                                label="1. Hạn mức tối đa theo đối tượng (VND)"
                                disabled
                                className='inputDisabled-red'
                            />
                        </Grid>
                        <Grid item xl={6} md={6} sm={12} className={classes.inputLabel}>
                            <Input 
                                label="2. Lương bình quân 03 tháng gần nhất (A) (VND)"
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
                                className='inputDisabled-red'
                            />
                        </Grid>
                        <Grid item xl={6} md={6} sm={12} className={classes.inputLabel}>
                            <Input 
                                label="5. Hạn mức tổng đơn vị đề xuất (VND)" 
                            />
                        </Grid>
                    </Grid>
                )
            // KH đang làm việc tại các Ngân hàng - Theo chức danh
            case "DT23B":
                return (
                    <Grid container columnSpacing="20" rowSpacing="20">
                        <Grid item xl={6} md={6} sm={12} className={classes.inputLabel}>
                            <Input 
                                label="1. Tên cơ quan/tổ chức công tác"
                            />
                        </Grid>
                        <Grid item xl={6} md={6} sm={12} className={classes.inputLabel}>
                            <Input 
                                label="2. Chức danh"
                            />
                        </Grid>
                        <Grid item xl={6} md={6} sm={12} className={`${classes.inputLabel} text-danger`}>
                            <Input 
                                label="3. Hạn mức thẻ theo đối tượng (VND)"
                                disabled
                                className='inputDisabled-red'
                            />
                        </Grid>
                        <Grid item xl={6} md={6} sm={12} className={classes.inputLabel}>
                            <Input 
                                label="4. Hạn mức tổng đơn vị đề xuất (VND)" 
                            />
                        </Grid>
                    </Grid>
                )
            // KH nhận lương qua tài khoản tại các Ngân hàng khác - Theo lương
            case "DT24":
                return (
                    <Grid container columnSpacing="20" rowSpacing="20">
                        <Grid item xl={6} md={6} sm={12} className={`${classes.inputLabel} text-danger`}>
                            <Input 
                                label="1. Hạn mức tối đa theo đối tượng (VND)"
                                disabled
                                className='inputDisabled-red'
                            />
                        </Grid>
                        <Grid item xl={6} md={6} sm={12} className={classes.inputLabel}>
                            <Input 
                                label="2. Lương bình quân 03 tháng gần nhất (A) (VND)"
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
                                className='inputDisabled-red'
                            />
                        </Grid>
                        <Grid item xl={6} md={6} sm={12} className={classes.inputLabel}>
                            <Input 
                                label="5. Hạn mức tổng đơn vị đề xuất (VND)" 
                            />
                        </Grid>
                    </Grid>
                )
            // Payroll - Plus Nhóm A - Theo chức danh
            case "DT25A":
                return (
                    <Grid container columnSpacing="20" rowSpacing="20">
                        <Grid item xl={6} md={6} sm={12} className={classes.inputLabel}>
                            <Input 
                                label="1. Tên cơ quan/tổ chức công tác"
                            />
                        </Grid>
                        <Grid item xl={6} md={6} sm={12} className={classes.inputLabel}>
                            <Input 
                                label="2. Chức danh"
                            />
                        </Grid>
                        <Grid item xl={6} md={6} sm={12} className={`${classes.inputLabel} text-danger`}>
                            <Input 
                                label="3. Hạn mức thẻ theo đối tượng (VND)"
                                disabled
                                className='inputDisabled-red'
                            />
                        </Grid>
                        <Grid item xl={6} md={6} sm={12} className={classes.inputLabel}>
                            <Input 
                                label="4. Hạn mức tổng đơn vị đề xuất (VND)" 
                            />
                        </Grid>
                    </Grid>
                )
            // Payroll - Plus Nhóm A - Theo lương
            case "DT25B":
                return (
                    <Grid container columnSpacing="20" rowSpacing="20">
                        <Grid item xl={6} md={6} sm={12} className={`${classes.inputLabel} text-danger`}>
                            <Input 
                                label="1. Hạn mức tối đa theo đối tượng (VND)"
                                disabled
                                className='inputDisabled-red'
                            />
                        </Grid>
                        <Grid item xl={6} md={6} sm={12} className={classes.inputLabel}>
                            <Input 
                                label="2. Lương bình quân 03 tháng gần nhất (A) (VND)"
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
                                className='inputDisabled-red'
                            />
                        </Grid>
                        <Grid item xl={6} md={6} sm={12} className={classes.inputLabel}>
                            <Input 
                                label="5. Hạn mức tổng đơn vị đề xuất (VND)" 
                            />
                        </Grid>
                    </Grid>
                )
            // Payroll - Plus Nhóm B - Theo chức danh
            case "DT26A":
                return (
                    <Grid container columnSpacing="20" rowSpacing="20">
                        <Grid item xl={6} md={6} sm={12} className={classes.inputLabel}>
                            <Input 
                                label="1. Tên cơ quan/tổ chức công tác"
                            />
                        </Grid>
                        <Grid item xl={6} md={6} sm={12} className={classes.inputLabel}>
                            <Input 
                                label="2. Chức danh"
                            />
                        </Grid>
                        <Grid item xl={6} md={6} sm={12} className={`${classes.inputLabel} text-danger`}>
                            <Input 
                                label="3. Hạn mức thẻ theo đối tượng (VND)"
                                disabled
                                className='inputDisabled-red'
                            />
                        </Grid>
                        <Grid item xl={6} md={6} sm={12} className={classes.inputLabel}>
                            <Input 
                                label="4. Hạn mức tổng đơn vị đề xuất (VND)" 
                            />
                        </Grid>
                    </Grid>
                )
                // Payroll - Plus Nhóm B - Theo lương
                case "DT26B":
                    return (
                        <Grid container columnSpacing="20" rowSpacing="20">
                            <Grid item xl={6} md={6} sm={12} className={`${classes.inputLabel} text-danger`}>
                                <Input 
                                    label="1. Hạn mức tối đa theo đối tượng (VND)"
                                    disabled
                                    className='inputDisabled-red'
                                />
                            </Grid>
                            <Grid item xl={6} md={6} sm={12} className={classes.inputLabel}>
                                <Input 
                                    label="2. Lương bình quân 03 tháng gần nhất (A) (VND)"
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
                                    className='inputDisabled-red'
                                />
                            </Grid>
                            <Grid item xl={6} md={6} sm={12} className={classes.inputLabel}>
                                <Input 
                                    label="5. Hạn mức tổng đơn vị đề xuất (VND)" 
                                />
                            </Grid>
                        </Grid>
                    )
                // Payroll - Plus Nhóm C - Theo chức danh
                case "DT27A":
                    return (
                        <Grid container columnSpacing="20" rowSpacing="20">
                            <Grid item xl={6} md={6} sm={12} className={classes.inputLabel}>
                                <Input 
                                    label="1. Tên cơ quan/tổ chức công tác"
                                />
                            </Grid>
                            <Grid item xl={6} md={6} sm={12} className={classes.inputLabel}>
                                <Input 
                                    label="2. Chức danh"
                                />
                            </Grid>
                            <Grid item xl={6} md={6} sm={12} className={`${classes.inputLabel} text-danger`}>
                                <Input 
                                    label="3. Hạn mức thẻ theo đối tượng (VND)"
                                    disabled
                                    className='inputDisabled-red'
                                />
                            </Grid>
                            <Grid item xl={6} md={6} sm={12} className={classes.inputLabel}>
                                <Input 
                                    label="4. Hạn mức tổng đơn vị đề xuất (VND)" 
                                />
                            </Grid>
                        </Grid>
                    )
                // Payroll - Plus Nhóm C - Theo lương
                case "DT27B":
                    return (
                        <Grid container columnSpacing="20" rowSpacing="20">
                            <Grid item xl={6} md={6} sm={12} className={`${classes.inputLabel} text-danger`}>
                                <Input 
                                    label="1. Hạn mức tối đa theo đối tượng (VND)"
                                    disabled
                                    className='inputDisabled-red'
                                />
                            </Grid>
                            <Grid item xl={6} md={6} sm={12} className={classes.inputLabel}>
                                <Input 
                                    label="2. Lương bình quân 03 tháng gần nhất (A) (VND)"
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
                                    className='inputDisabled-red'
                                />
                            </Grid>
                            <Grid item xl={6} md={6} sm={12} className={classes.inputLabel}>
                                <Input 
                                    label="5. Hạn mức tổng đơn vị đề xuất (VND)" 
                                />
                            </Grid>
                        </Grid>
                    )
                // CBNV công ty con/công ty liên kết - Theo chức danh
                case "DT28A":
                    return (
                        <Grid container columnSpacing="20" rowSpacing="20">
                            <Grid item xl={6} md={6} sm={12} className={classes.inputLabel}>
                                <Input 
                                    label="1. Tên cơ quan/tổ chức công tác"
                                />
                            </Grid>
                            <Grid item xl={6} md={6} sm={12} className={classes.inputLabel}>
                                <Input 
                                    label="2. Chức danh"
                                />
                            </Grid>
                            <Grid item xl={6} md={6} sm={12} className={`${classes.inputLabel} text-danger`}>
                                <Input 
                                    label="3. Hạn mức thẻ theo đối tượng (VND)"
                                    disabled
                                    className='inputDisabled-red'
                                />
                            </Grid>
                            <Grid item xl={6} md={6} sm={12} className={classes.inputLabel}>
                                <Input 
                                    label="4. Hạn mức tổng đơn vị đề xuất (VND)" 
                                />
                            </Grid>
                        </Grid>
                    )
                    // CBNV công ty con/công ty liên kết - Theo lương
                    case "DT28B":
                        return (
                            <Grid container columnSpacing="20" rowSpacing="20">
                                <Grid item xl={6} md={6} sm={12} className={classes.inputLabel}>
                                    <Input 
                                        label="1. Lương bình quân 03 tháng gần nhất (A) (VND)"
                                    />
                                </Grid>
                                <Grid item xl={6} md={6} sm={12} className={classes.inputLabel}>
                                    <Select 
                                        label="2. Hệ số xét cấp thẻ theo lương (B)"
                                        options={[]}
                                    />
                                </Grid>
                                <Grid item xl={6} md={6} sm={12} className={`${classes.inputLabel} text-danger`}>
                                    <Input 
                                        label="3. Hạn mức tối đa theo công thức (A) * (B) (VND)"
                                        disabled
                                        className='inputDisabled-red'
                                    />
                                </Grid>
                                <Grid item xl={6} md={6} sm={12} className={classes.inputLabel}>
                                    <Input 
                                        label="4. Hạn mức tổng đơn vị đề xuất (VND)" 
                                    />
                                </Grid>
                            </Grid>
                        )
            default:
                break;
        }
    }


	return (
        <>
        {renderByTarget()}
        </>
    )
}

export default DetailInfo;