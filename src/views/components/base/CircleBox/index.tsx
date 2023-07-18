
import clsx from 'clsx';
import CircleBoxStyle from './style';
interface CircleProps {
    className?: string
    size?: "xl" | "lg" | "md" | "sm" | "xs"
    onClick?: (e: React.MouseEvent<HTMLElement>) => void;
}

const CircleBox: React.FunctionComponent<CircleProps> = (props) => {
    const classes = CircleBoxStyle();
    const { className, children, size, onClick } = props;
    const clClass = clsx(
        classes.root,
        "mscb-circle-box",
        className, size);

    return <div className={clClass} onClick={onClick}>{children}</div>
}

export default CircleBox